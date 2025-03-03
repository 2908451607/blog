const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
ctx.translate(0,700);
ctx.scale(1,-1);
const g=0.05;
var balls=[];

balls.push({
    x:50,
    y:50, 
    vx:5,
    vy:0,
    r:50,
    m:100,
    color:'rgb(255, 30, 30)'
});
balls.push({
    x:1000,
    y:50,
    vx:0,
    vy:0,
    r:50,
    m:50,
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
        ball.vy=-ball.vy*0.8;
        ball.y+=ball.r-ball.y;
        ball.vy-=g;
    }
    if(ball.y+ball.r>=700){
        ball.vy=-ball.vy*0.8;
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
                ball.x+=(ball.r+ball1.r-l)*a/l+2;
                ball.y+=(ball.r+ball1.r-l)*b/l+2;
                
                    const ballback=(ball.m-ball1.m)/(ball.m+ball1.m)*vball-ball1.m*2/(ball.m+ball1.m)*vball1;
                    ball.vx=-ballback*a/l;
                    ball.vy=-ballback*b/l;
                    const ball1back=ball.m*2/(ball.m+ball1.m)*vball-(ball1.m-ball.m)/(ball.m+ball1.m)*vball1;
                    ball1.vx=ball1back*a/l;
                    ball1.vy=ball1back*b/l;
                
                
            }
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
