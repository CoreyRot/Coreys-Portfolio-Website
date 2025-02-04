import React, { useEffect, useRef } from "react";

const CanvasBackground = () => {
  const canvasRef = useRef(null);
  const mouse = { x: null, y: null };
  let particles = [];
  const particleCount = 200;
  const connectionDistance = 200;
  const cascadeDistance = 100;

  // Keep branding colors for particles
  const randomColor = () => {
    const colors = ["#228b22", "#6a0dad", "#001f3f", "#ffd700"]; // Forest Green, Purple, Navy Blue, Gold
    return colors[Math.floor(Math.random() * colors.length)];
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 1.5 + 0.5;
      this.color = randomColor();
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = (Math.random() - 0.5) * 1;
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x <= 0 || this.x >= window.innerWidth) this.vx *= -1;
      if (this.y <= 0 || this.y >= window.innerHeight) this.vy *= -1;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 3;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  const createParticles = () => {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
    }
  };

  const drawLines = (ctx) => {
    if (window.innerWidth <= 1024) return; // Disable connections on mobile

    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.lineWidth = 1;

    particles.forEach((particle) => {
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();

        // Enable cascading effect: Connect nearby particles
        particles.forEach((otherParticle) => {
          const cascadeDx = otherParticle.x - particle.x;
          const cascadeDy = otherParticle.y - particle.y;
          const cascadeDistanceCalc = Math.sqrt(cascadeDx * cascadeDx + cascadeDy * cascadeDy);

          if (cascadeDistanceCalc < cascadeDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = "rgba(255, 255, 255, 1)";
            ctx.stroke();
            ctx.closePath();
          }
        });
      }
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.move();
      particle.draw(ctx);
    });

    drawLines(ctx);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
    animate();

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background"></canvas>;
};

export default CanvasBackground;
