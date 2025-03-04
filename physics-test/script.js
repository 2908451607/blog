const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
ctx.translate(0,700);
ctx.scale(1,-1);
const g=0.05;
var balls=[];
const count=20;
/*
for(var i=0;i<count;i++){
    balls.push({
        x:1200*Math.random()+100,
        y:500*Math.random()+100, 
        vx:10*Math.random(),
        vy:10*Math.random(),
        r:5,
        m:1,
        color:'rgb(42, 42, 42)'
    });
}
    */

let keys={

}
balls.push({
    x:20,
    y:20, 
    vx:5,
    vy:0,
    r:20,
    m:3,
    color:'rgb(255, 30, 30)'
});
balls.push({
    x:500,
    y:20,
    vx:1,
    vy:0,
    r:20,
    m:1,
    color:'rgb(50, 231, 255)'
})

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    balls.forEach((ball,index)=>{
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x,ball.y,ball.r, 0, Math.PI*2);
        ctx.fill();
    });
}
function updata(){
    balls.forEach((ball,index)=>{
        ball.x+=ball.vx;
        ball.y+=ball.vy;
        ball.vy-=g;
        if(ball.x-ball.r<0){
            ball.vx=-ball.vx;
            ball.x+=ball.r-(ball.x-0);
        };
        if(ball.x+ball.r>1400){
            ball.vx=-ball.vx;
            ball.x-=ball.r-(1400-ball.x);
        };
        if(ball.y-ball.r<=0){
            ball.vy=-ball.vy;
            ball.y+=ball.r-ball.y;
            ball.vy-=g;
        }
        if(ball.y+ball.r>=700){
            ball.vy=-ball.vy;
            ball.y-=ball.r-(700-ball.y);
            ball.vy-=g;
        }
        //处理互相间碰撞
        balls.forEach((ball1,index1)=>{
            if(index1!=index){
                
                const a=ball.x-ball1.x;
                const b=ball.y-ball1.y;
                const l=Math.sqrt(a*a+b*b);
                if(l<ball.r+ball1.r){
                    const vball=ball.vx*a/l+ball.vy*b/l;
                    const vball1=ball1.vx*a/l+ball1.vy*b/l;
                    ball.x+=(ball.r+ball1.r-l)*a/l*(ball1.m/(ball.m+ball1.m));
                    ball.y+=(ball.r+ball1.r-l)*b/l*(ball1.m/(ball.m+ball1.m));
                    ball1.x-=(ball.r+ball1.r-l)*a/l*(ball.m/(ball.m+ball1.m));
                    ball.y-=(ball.r+ball1.r-l)*b/l*(ball.m/(ball.m+ball1.m));
                    const ballback=(ball.m-ball1.m)/(ball.m+ball1.m)*vball-ball1.m*2/(ball.m+ball1.m)*vball1;
                    ball.vx=ballback*a/l;
                    ball.vy=ballback*b/l;
                    const ball1back=ball.m*2/(ball.m+ball1.m)*vball-(ball1.m-ball.m)/(ball.m+ball1.m)*vball1;
                    ball1.vx=ball1back*a/l;
                    ball1.vy=ball1back*b/l;
                    
                }
                document.getElementById('red').innerHTML='总动能:'+(ball1.vx*ball1.vx*ball1.m+ball.vx*ball.vx*ball.m);
                document.getElementById('blue').innerHTML='总动量:'+(ball1.vx*ball1.m+ball.vx*ball.m);
                
            }
        })
    })
}
function gameloop(){
    draw();
    updata();
    requestAnimationFrame(gameloop);
}
gameloop();
document.getElementById('weight').innerHTML='质量比:'+balls[0].m+':'+balls[1].m;