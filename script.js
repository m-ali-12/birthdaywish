const celebrateBtn = document.getElementById('celebrateBtn');
const cutCakeBtn = document.getElementById('cutCakeBtn');
const cakeScene = document.getElementById('cakeScene');
const overlay = document.getElementById('celebrationOverlay');
const floatingElements = document.getElementById('floatingElements');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

let confettiPieces = [];
let confettiActive = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createConfettiBurst(count = 180) {
  confettiPieces = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: Math.random() * 7 + 4,
    h: Math.random() * 12 + 6,
    speed: Math.random() * 3 + 2,
    drift: Math.random() * 2 - 1,
    rotation: Math.random() * Math.PI,
    rotationSpeed: Math.random() * 0.2 - 0.1,
    color: ['#ff79b0', '#ffd36b', '#9bf6ff', '#ffffff', '#ffc6e2'][Math.floor(Math.random() * 5)]
  }));
  confettiActive = true;
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach(piece => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.rotationSpeed;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter(piece => piece.y < canvas.height + 40);

  if (confettiPieces.length && confettiActive) {
    requestAnimationFrame(drawConfetti);
  } else {
    confettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function spawnFloatingIcons(total = 22) {
  const icons = ['💖', '🎉', '✨', '🎂', '💐', '🌟'];

  for (let i = 0; i < total; i++) {
    const el = document.createElement('div');
    el.className = 'floaty';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.bottom = `-${Math.random() * 60}px`;
    el.style.animationDuration = `${5 + Math.random() * 4}s`;
    el.style.animationDelay = `${Math.random() * 0.6}s`;
    floatingElements.appendChild(el);
    setTimeout(() => el.remove(), 9500);
  }
}

function showOverlay() {
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 2800);
}

celebrateBtn.addEventListener('click', () => {
  createConfettiBurst(220);
  spawnFloatingIcons(28);
  showOverlay();
});

cutCakeBtn.addEventListener('click', () => {
  cakeScene.classList.add('cut');
  createConfettiBurst(260);
  spawnFloatingIcons(32);
  showOverlay();

  setTimeout(() => {
    cakeScene.classList.remove('cut');
  }, 4200);
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('show');
});
