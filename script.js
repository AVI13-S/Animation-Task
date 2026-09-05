/*const canvas = document.getElementById("Canvas");
const context = canvas.getContext("2d");
let w, h;
function BoxSize(){
  const width=700;
  const height=window.innerHeight;
  canvas.width=width;
  canvas.height=height;
  context.fillStyle="white";
  context.fillRect(0,0,width,height);
  return {width,height};
}
BoxSize();*/

const fullScreen = document.getElementById("fullScreen");
const bgContext = fullScreen.getContext("2d");

 fullScreen.width=window.innerWidth;
fullScreen.height=window.innerHeight;
let stars=[];
for(let i=0;i<200;i++){
  let starTwinkle={
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    radius:Math.random()*2+1,
    speed:Math.random()*0.02+0.005,
    alpha:Math.random()

  };
  stars.push(starTwinkle)
}
let shootingStars=[];
function ShootingStar(){
  if(Math.random()<0.02){

    let xStar=Math.random()*(window.innerWidth*0.8);
    let yStar=Math.random()*(window.innerHeight*0.4);
    let lengthStar=Math.random()*200;
    let speedStar=Math.random()*30;
    let newStar={
x:xStar,
y:yStar,
length:lengthStar,
speed:speedStar,
alpha:1
    };
    shootingStars.push(newStar);
  }
}
function updateStars(){
  for(let i=shootingStars.length-1;i>=0;i--){
    let star=shootingStars[i];
    star.x=star.x+star.speed;
    star.y=star.y+star.speed/2;
    star.alpha=star.alpha-0.02;
    bgContext.beginPath();
    bgContext.moveTo(star.x,star.y);
   let xTail=star.x-star.length;
  let yTail=star.y-star.length/2;
  bgContext.lineTo(xTail,yTail);
  bgContext.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
  bgContext.lineWidth = 1;
  bgContext.stroke();
if(star.alpha<=0){
  shootingStars.splice(0,i);
}
  }
}
function animateStars(){
  bgContext.clearRect(0,0,fullScreen.width,fullScreen.height);
  for(let i=0;i<stars.length;i++){
    let bright=stars[i];
    bright.alpha=bright.alpha+bright.speed;
    if (bright.alpha > 1 || bright.alpha < 0) {
      bright.speed = -bright.speed;
    }
    let opacity=Math.abs(bright.alpha);
    bgContext.beginPath();
  
    
    bgContext.arc(bright.x, bright.y, bright.radius, 0, Math.PI * 2);
     bgContext.fillStyle=`rgba(255, 255, 255, ${opacity})`;
    bgContext.fill();
  }
  ShootingStar();
  updateStars();
  requestAnimationFrame(animateStars);
}
animateStars();

