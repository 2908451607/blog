const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const start=document.getElementById('start');
const show_protect_time=document.getElementById('protect-time');
const white_weight=document.getElementById('weight-length');
const ending=document.getElementById('endingtext-area');
const savedata=localStorage.getItem('history-memor');
const headImage=document.getElementById('head-image');
if(savedata!=null)document.getElementById('history').innerHTML=savedata;
const g=0.05;
var second=0,minute=0;
var settime,timelen,action=1;
var start_juge=1;
var give_pro,give_nor;
start.addEventListener('click',function(){
    if(start_juge){
        const temp=String(minute).padStart(2,'0')+':'+String(second).padStart(2,'0');
        document.getElementById('text1').innerHTML=temp;
        give_nor=setInterval(give_normal, 100);
        give_pro=setInterval(give_protect, 15000);
        const timelenth=setInterval(memortime,1000);
        timelen=timelenth;
        start_juge=0;
    }
},{once:true});
var juge=1;
var protect_time=1;
var temp;
let centry = {
    x:450,
    y:575,
    size: 25,
    speed: 5,
    color: 'white'
};
let protectcircle={
    x:centry.x,
    y:centry.y,
    r:centry.size+20,
    color:'rgba(140, 253, 255, 0.3)'
}
//给小球样式
let eats=[];
function give_normal(){
    //id为1为普通球，1以上为技能球
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
function give_protect(){
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
const keys = {
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
    if(keys.Enter){
        if(start_juge){
            const temp=String(minute).padStart(2,'0')+':'+String(second).padStart(2,'0');
            document.getElementById('text1').innerHTML=temp;
            give_nor=setInterval(give_normal, 100);
            give_pro=setInterval(give_protect, 15000);
            const timelenth=setInterval(memortime,1000);
            timelen=timelenth;
            start_juge=0;
        }
    }
}


function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = centry.color;
        ctx.beginPath();
        ctx.arc(centry.x, centry.y, centry.size, 0, Math.PI*2);
        ctx.fill(); 
        ctx.fillText('白何乐',centry.x,centry.y-centry.size-10);
        ctx.textAlign='center';
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
//整体动画
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
                    centry.size+=3;
                    centry.speed-=0.4;
                }
            }
            else if(eat.id==2){
                eats[index]={};
                protect_time+=1000;
                if(protect_time>1000) protect_time=1000;
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
            document.getElementById('endingtext-area').innerHTML='游戏结束';
            alert('白何乐吃的走不动了！');
        },2000);
        juge=0;
        eats.length=0;
        if(savedata<temp||savedata===null){
            localStorage.setItem('history-memor',temp);
        }
        clearInterval(give_nor);
        clearInterval(give_pro);
        clearInterval(timelen);
    }
    //数值刷新
    const weightlenth=(5-centry.speed)*20+'%';
    const length=protect_time/10+'%';
    white_weight.style.width=weightlenth;
    show_protect_time.style.width=length;
    protectcircle.r=centry.size+10;
    if(protect_time>0)protect_time--;
    requestAnimationFrame(gameLoop);
}
gameLoop();




