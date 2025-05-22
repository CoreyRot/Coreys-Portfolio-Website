import React, { useEffect, useRef } from "react";

const CanvasBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null);

  const particleCount = window.innerWidth > 1024 ? 200 : 100; // Reduce count on mobile
  const connectionDistance = 200;
  const cascadeDistance = 100;

  // ✅ Branding colors for particles
  const randomColor = () => {
    const colors = ["#228b22", "#6a0dad", "#001f3f", "#ffd700"]; // Forest Green, Purple, Navy Blue, Gold
    return colors[Math.floor(Math.random() * colors.length)];
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 0.5 + 0.5;
      this.color = randomColor();
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
    }

    move(canvasWidth, canvasHeight) {
      this.x += this.vx;
      this.y += this.vy;

      // ✅ Prevent particles from getting stuck on edges
      if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
      if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
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

  // ✅ Create particles once instead of recreating on each resize
  const createParticles = (canvasWidth, canvasHeight) => {
    particlesRef.current = Array.from({ length: particleCount }, () => 
      new Particle(Math.random() * canvasWidth, Math.random() * canvasHeight)
    );
  };

  const drawLines = (ctx, canvasWidth) => {
    if (canvasWidth <= 1024) return; // Disable connections on mobile

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    particlesRef.current.forEach((particle) => {
      const dx = particle.x - mouse.current.x;
      const dy = particle.y - mouse.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.current.x, mouse.current.y);
        ctx.stroke();
        ctx.closePath();

        // ✅ Cascading effect: Connect nearby particles
        particlesRef.current.forEach((otherParticle) => {
          const cascadeDx = otherParticle.x - particle.x;
          const cascadeDy = otherParticle.y - particle.y;
          const cascadeDistanceCalc = Math.sqrt(cascadeDx * cascadeDx + cascadeDy * cascadeDy);

          if (cascadeDistanceCalc < cascadeDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
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

    particlesRef.current.forEach((particle) => {
      particle.move(canvas.width, canvas.height);
      particle.draw(ctx);
    });

    drawLines(ctx, canvas.width);

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    animate();

    // ✅ Handle Mouse Movement
    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background"></canvas>;
};

export default CanvasBackground;