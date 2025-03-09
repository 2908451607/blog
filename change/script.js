
const explore=document.getElementById('explore');
const main=document.getElementById('main');
const background=document.getElementById('background');
const introduce=document.getElementById('introduce');
const image=document.getElementsByTagName('img');
//const time=document.getElementById('time');
/* const says=document.getElementById('saying'); */
const wife=document.getElementsByClassName('wife');
const introtext=document.getElementById('intro');
const high=900;
var id=0;
var wifePositions=[];
for(var i=0;i<3;i++){
  wifePositions.push({
    centerx:50,
  centery:20,
  x:50,
  y:40,
  angle:0,
  speed:0.01,
  r:15
  })
}
const developer = [
  {"saying": "嵩高维岳，峻极于天。——《诗经·大雅·嵩高》"},        //蹑景
  {"saying": "珠露春华返，璇霜秋照晚。——王融《青青河畔草》"},     //白何乐
  {"saying": "浩浩洪流，带我邦畿。——嵇康《赠秀才入军》"},        //寰辰
  {"saying": "风驰电逝，蹑景追飞。——嵇康《赠秀才入军》"},        //蹑景
  {"saying": "八戒夜持香火印，三光朝念蕊珠篇。——白居易《白发》"},  //LaoIn
  {"saying": "金阙明光后圣君，流津焕彩结丹云。——宋佶《太清乐》"},  //desc
  {"saying": "涛声夜入伍员庙，柳色春藏苏小家。——白居易《杭州春望》"}//风屿
];
explore.addEventListener('click',function(){
  main.style.top='-100%';
  main.style.opacity=0;
  background.style.backgroundImage="url('mount.jpg')";
  background.style.opacity=0;
  setTimeout(()=>{
    introduce.style.opacity=1;
    introduce.style.overflow='unset'; 
  },500);
});
/* showsaying();
setInterval(showsaying,5000); */
setInterval(wifeMove,10);
window.addEventListener('scroll',()=>{
  const scrollY=window.scrollY;
  if(scrollY!=0){
    introtext.style.backgroundPositionX=scrollY+'px';
    introtext.style.backgroundPositionY=scrollY*0.5+'px';
  }
  if(scrollY>=high){

  }
})

function wifeMove(){
  wifePositions.forEach((wifePosition,index)=>{
    wifePosition.angle+=wifePosition.speed;
    const theta=wifePosition.angle+Math.PI*2/3*(index+1);
    wifePosition.x=wifePosition.centerx+(wifePosition.r*Math.cos(theta))*0.6;
    wifePosition.y=wifePosition.centery+(wifePosition.r*Math.sin(theta));
    wife[index].style.left=wifePosition.x+'%';
    wife[index].style.top=wifePosition.y+'%';
  })
}
/* function showsaying(){
  setTimeout(()=>{
    document.getElementById('saying').innerHTML=developer[id++].saying;
    if(id==7) id=0;
  },500);
  says.style.opacity=0;
  setTimeout(()=>{
    says.style.opacity=1;
  },1000);
}; */





/* 
function getdata(){
  const now=new Date();
  const year=now.getFullYear();
  const month=now.getMonth();
  const day=now.getDay();
  document.getElementById('time').innerHTML=year+'.'+String(month).padStart(2,'0')+'.'+String(day).padStart(2,'0');
  } 
  getdata();
  */