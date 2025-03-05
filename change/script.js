const saying_html=document.getElementById('saying');
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var id=0;
var particleCount=20;
const radius =30;
const speed =0.005;
var particles = [];
var angle = 0;
var tarx=100,tary=50;
var colors=[
    '#00FF00',
    '#7700FF',
    '#FFBB00',
    '#AA0000',
    '#0000FF'
];
let c={};
    for (var i = 0; i < particleCount; i++) {
        particles[i]={
            size:Math.random()*0.5+0.9,
            color:"#000000", 
            r:radius*Math.random()+30,
            an:angle,
            spe:speed*Math.random()+0.01,
            cenx:100,
            ceny:50,
            move:Math.random()*0.007+0.008,
            color:colors[Math.floor(Math.random()*7)]
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


const toggleSwitch = document.getElementById('toggleSwitch');
const savedata=localStorage.getItem('switchstatus');
if (savedata=== 'on') {
    toggleSwitch.checked = true;
    particleCount=20;
  } else {
    toggleSwitch.checked = false;
    particleCount=0;
  }
toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    particleCount=20;
    localStorage.setItem('switchstatus','on');
    let c={};
    
  } else {
    particleCount=0;
    localStorage.setItem('switchstatus','off');
  }
});

const developer = [
  {"saying": "嵩高维岳，峻极于天。——《诗经·大雅·嵩高》"},        //蹑景
  {"saying": "珠露春华返，璇霜秋照晚。——王融《青青河畔草》"},     //白何乐
  {"saying": "浩浩洪流，带我邦畿。——嵇康《赠秀才入军》"},        //寰辰
  {"saying": "风驰电逝，蹑景追飞。——嵇康《赠秀才入军》"},        //蹑景
  {"saying": "八戒夜持香火印，三光朝念蕊珠篇。——白居易《白发》"},  //LaoIn
  {"saying": "金阙明光后圣君，流津焕彩结丹云。——宋佶《太清乐》"},  //desc
  {"saying": "涛声夜入伍员庙，柳色春藏苏小家。——白居易《杭州春望》"}//'风屿'
]

function showSaying() {
  misstext();
  setTimeout(()=>{
    const randomIndex = Math.floor(Math.random() * developer.length);
    const selectedQuote = developer[id++];
    if(id==7)id=0;
    document.getElementById('saying').innerHTML = selectedQuote.saying;
  },1000)
}
function misstext(){
  saying_html.style.color='white';
  setTimeout(()=>{
    saying_html.style.color='black';
  },1000);
};
showSaying();
const showsaying=setInterval(showSaying,5000);