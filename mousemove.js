const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const particleCount = 20;
const radius =30;
const speed =0.005;
var particles = [];
var angle = 0;
var tarx=canvas.width / 2,tary=canvas.height / 2;
let c={};
    for (var i = 0; i < particleCount; i++) {
        particles[i]={
            size:Math.random()*0.5+0.7,
            color:"#000000", 
            r:radius*Math.random()+30,
            an:angle,
            spe:speed*Math.random()+0.05,
            cenx:canvas.width / 2,
            ceny:canvas.height / 2,
            move:Math.random()*0.005+0.01
        };
    }
window.addEventListener("mousemove",function laoin(a){
    tarx=a.x;
    tary=a.y;
})
function circle(){
    for (var i = 0; i < particleCount; i++) {
        particles[i].cenx+=(tarx-particles[i].cenx)*particles[i].move;
        particles[i].ceny+=(tary-particles[i].ceny)*particles[i].move;
        };
 drawParticles();
}
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.an+=particle.spe*particle.r/50;
        const theta = particle.an + index * (2 * Math.PI / particleCount);
        particle.x =particle.cenx+ particle.r* Math.cos(theta)- particle.size / 2;
        particle.y =particle.ceny+ particle.r* Math.sin(theta) - particle.size / 2;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI*2);
        ctx.fill();
    });
}
setInterval(circle,1);
let person={
    head,
    body,
    hands,
    legs,
    foots,
};
//
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                           O\  =  /O
//                        ____/`---'\____
//                      .'  \\|     |//  `.
//                     /  \\|||  :  |||//  \
//                    /  _||||| -:- |||||-  \
//                    |   | \\\  -  /// |   |
//                    | \_|  ''\---/''  |   |
//                    \  .-\__  `-`  ___/-. /
//                  ___`. .'  /--.--\  `. . __
//               ."" '<  `.___\_<|>_/___.'  >'"".
//              | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//              \  \ `-.   \_ __\ /__ _/   .-` /  /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//                            牢印出品
