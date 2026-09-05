const canvas = document.getElementById("Canvas");
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
BoxSize();
const fullScreen = document.getElementById("fullScreen");
const bgContext = fullScreen.getContext("2d");
fullScreen.width=window.innerWidth;
fullScreen.height=window.innerHeight;
let stars=[];
for(let i=0;i<200;i++){
  let starTwinkle={
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius:Math.random()*2+1,
    speed:Math.random()*0.02+0.005,
    alpha:Math.random()

  };
  stars.push(starTwinkle)
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
  requestAnimationFrame(animateStars);
}
animateStars();
