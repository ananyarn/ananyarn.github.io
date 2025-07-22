const canvas = document.getElementById('blobs-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const isDark = () => document.body.classList.contains('dark');

let mouse = { x: width / 2, y: height / 2 };

// Track mouse movement
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Blob constructor
class Blob {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = 40 + Math.random() * 60;
    this.dx = -0.5 + Math.random();
    this.dy = -0.5 + Math.random();
    this.opacity = 0.1 + Math.random() * 0.2;
    this.color = isDark() ? 'rgba(88, 166, 255,' : 'rgba(243, 191, 176,';
  }

  draw() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const hoverEffect = Math.max(0, 1 - dist / 200); // proximity to mouse

    ctx.beginPath();
    ctx.fillStyle = `${this.color}${this.opacity + hoverEffect * 0.2})`;
    ctx.arc(this.x, this.y, this.radius + hoverEffect * 10, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < -this.radius || this.x > width + this.radius || this.y < -this.radius || this.y > height + this.radius) {
      this.reset();
    }

    this.draw();
  }
}

// Initialize blobs
const blobs = Array.from({ length: 20 }, () => new Blob());

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);
  blobs.forEach(blob => blob.update());
  requestAnimationFrame(animate);
}

// Handle theme change dynamically
const observer = new MutationObserver(() => {
  blobs.forEach(b => b.color = isDark() ? 'rgba(88, 166, 255,' : 'rgba(232, 160, 144,');
});
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

animate();
