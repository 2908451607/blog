
const explore=document.getElementById('explore');
const main=document.getElementById('main');
const background=document.getElementById('background');
const introduce=document.getElementById('introduce');
const image=document.getElementsByTagName('img');
const developer = [
  {"saying": "嵩高维岳，峻极于天。——《诗经·大雅·嵩高》"},        //蹑景
  {"saying": "珠露春华返，璇霜秋照晚。——王融《青青河畔草》"},     //白何乐
  {"saying": "浩浩洪流，带我邦畿。——嵇康《赠秀才入军》"},        //寰辰
  {"saying": "风驰电逝，蹑景追飞。——嵇康《赠秀才入军》"},        //蹑景
  {"saying": "八戒夜持香火印，三光朝念蕊珠篇。——白居易《白发》"},  //LaoIn
  {"saying": "金阙明光后圣君，流津焕彩结丹云。——宋佶《太清乐》"},  //desc
  {"saying": "涛声夜入伍员庙，柳色春藏苏小家。——白居易《杭州春望》"}//'风屿'
];

explore.addEventListener('click',function(){
  main.style.top='-100%';
  main.style.opacity='0';
  background.style.backgroundImage="url('mount.jpg')";
  background.style.opacity=0;
  setTimeout(()=>{
    introduce.style.opacity=1;
    introduce.style.overflow='unset';
  },500);
});
