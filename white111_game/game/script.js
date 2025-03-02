const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const start=document.getElementById('start');
const show_protect_time=document.getElementById('protect-time');
const white_weight=document.getElementById('weight-length');
const ending=document.getElementById('endingtext-area');
const savedata=localStorage.getItem('history-memor');
const headImage=document.getElementById('head-image');
const countDown=document.getElementById('count-down');
//若记录不为空则写入历史记录
if(savedata!=null)document.getElementById('history').innerHTML=savedata;


const g=0.05;
var second=0,minute=0;
var timelen;
var start_juge=1;
var give_pro,give_nor,give_redu;
var juge=1;
var protect_time=1;
var temp;


//开始按钮
start.addEventListener('click',function(){
    startaction();
},{once:true});


//白何乐头像中心
let centry = {
    x:450,
    y:575,
    size: 25,
    speed: 5,
    color: 'white'
};



//保护罩样式
let protectcircle={
    x:centry.x,
    y:centry.y,
    r:centry.size+20,
    color:'rgba(140, 253, 255, 0.3)'
}





//给小球样式
let eats=[];
//普通球
function give_normal(){
        eats.push({
            x:Math.random()*900,
            y:0,
            vy:Math.random()*3+3,
            vx:0,
            size:3,
            color:'rgb(246, 255, 0)',
            id:1
        });
    }
//护盾球
function give_protect(){
    if(Math.random()>=0.5){
        eats.push({
            x:Math.random()*800,
            y:0,
            vy:2,
            vx:0,
            size:6,
            color:'rgba(140, 253, 255, 1)',
            id:2
        });
    }
}
//减肥球
function give_reduce(){
    if(Math.random()>=0.5){
        eats.push({
            x:Math.random()*800,
            y:0,
            vy:2,
            vx:0,
            size:10,
            color:'rgba(255, 0, 149, 0.8)',
            id:3
        });
    }
}




  
//存储游戏进行的时间
function memortime(){
    temp=String(minute).padStart(2,'0')+':'+String(second).padStart(2,'0');
    document.getElementById('text1').innerHTML=temp;
    second++;
    if(second==59){
        minute++;
        second=0;
    }
};





//键盘监视
var keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    a:false,
    w:false,
    s:false,
    d:false,
    Enter:false,
    space:false
};
document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
    }
});
document.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});
function update() {
    if(!start_juge){

        if (keys.ArrowUp&& centry.y- centry.size> 0) {
            centry.y-=centry.speed;
        }
        if (keys.ArrowDown && centry.y + centry.size < canvas.height) {
            centry.y+=centry.speed;
        }
        if (keys.ArrowLeft&& centry.x- centry.size > 0) {
            centry.x-=centry.speed;
        }
        if (keys.ArrowRight&& centry.x + centry.size < canvas.width) {
            centry.x+=centry.speed;
        }
    }
    if(keys.Enter){
        startaction();
    }
}



function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //绘画头像上方字样
    ctx.fillStyle = centry.color;
    ctx.fillText('林玉婷',centry.x,centry.y-centry.size-10);
    ctx.textAlign='center';
    //绘画豆子（普通豆和技能豆）
    eats.forEach((eat,index) => {
        ctx.fillStyle = eat.color;
        ctx.beginPath();
        ctx.arc(eat.x, eat.y, eat.size, 0, Math.PI*2);
        ctx.fill(); 
    });
    if(protect_time>0){
        //绘画保护罩
        ctx.fillStyle = protectcircle.color;
        ctx.beginPath();
        ctx.arc(centry.x, centry.y,protectcircle.r, 0, Math.PI*2);
        ctx.fill(); 
    }
    //绘画头像
    const imagex=centry.x+'px';
    const imagey=centry.y+'px';
    const imageR=centry.size*2+'px';
    headImage.style.left=imagex;
    headImage.style.top=imagey;
    headImage.style.height=imageR;
    headImage.style.width=imageR;
}



//整体数值变化及监测
function gameLoop() {
    update();
    draw();
    eats.forEach((eat,index) => {
        eat.y+=eat.vy;
        eat.x+=eat.vx;
        if(eat.id==1)eat.vy+=g;
        //吃豆机制
        if(Math.abs(eat.x-centry.x)<centry.size&&Math.abs(eat.y-centry.y)<centry.size&&centry.speed){
            if(eat.id==1){
                if(!protect_time){
                    eats[index]={};
                    centry.size+=5;
                    centry.speed-=0.4;
                }
            }
            else if(eat.id==2){
                eats[index]={};
                protect_time+=1000;
                if(protect_time>1000) protect_time=1000;
            }
            else if(eat.id==3){
                eats[index]={};
                centry.size-=10;
                centry.speed+=0.8;
                if(centry.speed>5){
                    centry.speed=5;
                    centry.size=25;
                }
            }
        }
        if(protect_time>0){
            //保护罩碰撞机制
            const a=centry.x-eat.x;
            const b=centry.y-eat.y;
            const l=Math.sqrt(a*a+b*b);
            if(l<protectcircle.r&&eat.id==1){
                const v=eat.vx*a/l+eat.vy*b/l;
                if(v>0){
                    eat.vx=-v*a/l*0.8;
                    eat.vy=-v*b/l*0.8;
                }
            }
        }
        //防止速度为负反着走
        if(centry.speed<0){
            centry.speed=0;
        }
    });
    //胖的走不动路了，游戏结束
    if(centry.speed<=0.1&&juge) {
        setTimeout(() => {
            ending.style.width='100%';
            ending.style.height='100%';
            document.getElementById('endingtext-area').innerHTML='游戏结束<br>你未能拯救林玉婷！';
            alert('林玉婷吃的走不动了！');
        },2000);
        juge=0;
        eats.length=0;
        if(savedata<temp||savedata===null){
            localStorage.setItem('history-memor',temp);
        }
        clearInterval(give_nor);
        clearInterval(give_pro);
        clearInterval(give_redu);
        clearInterval(timelen);
    }
    //撑到三分钟了，胜利
    if(minute>=3&&juge&&second>=1){
        setTimeout(()=>{
            ending.style.width='100%';
            ending.style.height='100%';
            document.getElementById('endingtext-area').innerHTML='Congratulations!<br>你成功拯救了林玉婷！';
        },2000);
        keys={};
        juge=0;
        eats.length=0;
        localStorage.setItem('03:00',temp);
        clearInterval(give_nor);
        clearInterval(give_pro);
        clearInterval(give_redu);
        clearInterval(timelen);
    }
    //数值刷新
    const weightlenth=(5-centry.speed)*20+'%';
    const length=protect_time/10+'%';
    white_weight.style.width=weightlenth;
    show_protect_time.style.width=length;
    //始终保持保护罩比头像半径长10px
    protectcircle.r=centry.size+10;
    if(protect_time>0)protect_time--;
    requestAnimationFrame(gameLoop);
}
gameLoop();



//开始按钮触发的操作
function startaction(){
    if(start_juge){
        var audio=document.getElementById('background-music');
        audio.play();
        document.getElementById('count-down').innerHTML=3;
        setTimeout(()=>{
            document.getElementById('count-down').innerHTML=2;
        },1000);
        setTimeout(()=>{
            document.getElementById('count-down').innerHTML=1;
        },2000);
        setTimeout(()=>{
            document.getElementById('count-down').innerHTML='';
        },3000);
        setTimeout(()=>{
            if(start_juge){
                const temp=String(minute).padStart(2,'0')+':'+String(second).padStart(2,'0');
                document.getElementById('text1').innerHTML=temp;
                give_nor=setInterval(give_normal, 100);
                give_pro=setInterval(give_protect,7000);
                give_redu=setInterval(give_reduce,10000);
                const timelenth=setInterval(memortime,1000);
                timelen=timelenth;
                start_juge=0;
            }
        },3000)
    }
}
