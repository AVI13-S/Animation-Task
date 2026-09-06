const fullScreen = document.getElementById("fullScreen");
const bgContext = fullScreen.getContext("2d");
let w = fullScreen.width = window.innerWidth;
let h = fullScreen.height = window.innerHeight;
let isPlaying = true;
let speed = 1;
let mouse = { x: w / 2, y: h / 2 };
const playBtn = document.getElementById("playButton");
const pauseIcon = document.getElementById("pause");
const playIcon = document.getElementById("play");
const speedSlider = document.getElementById("slide");
const speedTxt = document.getElementById("speedTxt");
playBtn.onclick = function() {
  isPlaying = !isPlaying;
  pauseIcon.style.display = isPlaying ? "block" : "none";
  playIcon.style.display = isPlaying ? "none" : "block";
};
speedSlider.oninput = function() {
  speed = parseFloat(this.value);
  speedTxt.textContent = speed.toFixed(1) + "x";
};
    window.addEventListener("resize", function() {
  w = fullScreen.width = window.innerWidth;
  h = fullScreen.height = window.innerHeight;
  sun.x = w - 80;
});
window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
const sun = {
  x: w - 80,
  y: 80,
  radius: 100,
  pulse: 0
};

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.02 + 0.005,
    alpha: Math.random()
  });
}
let shootingStars = [];
function ShootingStar() {
  if (isPlaying && Math.random() < 0.02) {
    shootingStars.push({
      x: Math.random() * (window.innerWidth * 0.8),
      y: Math.random() * (window.innerHeight * 0.4),
      length: Math.random() * 200,
      speed: Math.random() * 30,
      alpha: 1
    });
  }
}
function updateStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let star = shootingStars[i];
    if (isPlaying) {
      star.x += star.speed * speed;
      star.y += (star.speed / 2) * speed;
      star.alpha -= 0.02;
    }
   bgContext.beginPath();
    bgContext.moveTo(star.x, star.y);
    bgContext.lineTo(star.x - star.length, star.y - star.length / 2);
    bgContext.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
    bgContext.lineWidth = 1;
    bgContext.stroke();
    if (star.alpha <= 0) {
      shootingStars.splice(i, 1);
    }
  }
}
function animate() {
  bgContext.fillStyle = 'rgba(1, 1, 3, 0.3)';
  bgContext.fillRect(0, 0, w, h);
  for (let i = 0; i < stars.length; i++) {
    let bright = stars[i];
    if (isPlaying) {
      bright.alpha += bright.speed * speed;
      if (bright.alpha > 1 || bright.alpha < 0) {
        bright.speed = -bright.speed;
      }
    }
    bgContext.beginPath();
    bgContext.arc(bright.x, bright.y, bright.radius, 0, Math.PI * 2);
    bgContext.fillStyle = `rgba(255, 255, 255, ${Math.abs(bright.alpha)})`;
    bgContext.fill();
  }
  ShootingStar();
  updateStars();
  if (isPlaying) {
    sun.pulse = (sun.pulse + 0.008 * speed) % 1;
  }
  const pulseRate = sun.radius + sun.pulse * 150;
  const rAlpha = (Math.sin((1 - sun.pulse) * Math.PI) / 2);
  const sg = bgContext.createRadialGradient(
    sun.x, sun.y, sun.radius * 0.3,
    sun.x, sun.y, pulseRate
  );
  sg.addColorStop(0, 'rgba(255, 230, 0, 0.8)');
  sg.addColorStop(0.3, `rgba(255, 140, 0, ${rAlpha})`);
  sg.addColorStop(1, 'transparent');
  bgContext.fillStyle = sg;
  bgContext.beginPath();
  bgContext.arc(sun.x, sun.y, pulseRate, 0, Math.PI * 2);
  bgContext.fill();

  bgContext.fillStyle = '#fffbeb';
  bgContext.beginPath();
  bgContext.arc(sun.x, sun.y, sun.radius * 0.6, 0, Math.PI * 2);
  bgContext.fill();
  const dx = sun.x - mouse.x;
  const dy = sun.y - mouse.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
if (dist < 800) {
    bgContext.strokeStyle = `rgba(230, 197, 148, ${(1 - dist / 800) * 0.45})`;
    bgContext.lineWidth = 1.2;
    bgContext.beginPath();
    bgContext.moveTo(mouse.x, mouse.y);
    bgContext.lineTo(sun.x, sun.y);
    bgContext.stroke();
  }
  requestAnimationFrame(animate);
}
animate();