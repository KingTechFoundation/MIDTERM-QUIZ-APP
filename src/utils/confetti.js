export function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#00C9B1', '#FF6B4A', '#023430', '#F4F1EA', '#FFD700'];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.r = Math.random() * 6 + 4;
      this.d = Math.random() * 10;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.tilt = Math.random() * 10 - 10;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.lineWidth = this.r / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
      ctx.stroke();
    }

    update() {
      this.tiltAngle += this.tiltAngleIncremental;
      this.y += (Math.cos(this.d) + 3 + this.r / 2) / 2;
      this.x += Math.sin(this.d) * 2;
      this.tilt = Math.sin(this.tiltAngle) * 15;
    }
  }

  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.draw();
      p.update();
      if (p.y > height) {
        particles[i] = new Particle();
        particles[i].y = -10;
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(render);
    }
  }

  render();

  // Cleanup after 5 seconds
  setTimeout(() => {
    particles.length = 0;
    document.body.removeChild(canvas);
  }, 5000);
}
