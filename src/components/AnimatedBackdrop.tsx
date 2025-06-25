import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.02, 0.05, 0.03, 0.01]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.03, 0.08, 0.05, 0.02]);
  const particleCount = useTransform(scrollYProgress, [0, 0.5, 1], [8, 15, 6]);

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const opacity2 = useTransform(scrollYProgress, [0, 1], [0.01, 0.03]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const opacity3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.005, 0.015, 0.008]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseOpacity = Math.random() * 0.1 + 0.02;
        this.opacity = this.baseOpacity;
      }

      update(scrollProgress: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.opacity = this.baseOpacity * (1 + Math.sin(Date.now() * 0.001 + scrollProgress * 10) * 0.3);
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#39FF14';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawGrid = (scrollProgress: number) => {
      const gridSize = 80;
      const opacity = 0.02 + scrollProgress * 0.03;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = '#39FF14';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawSubtleShapes = (scrollProgress: number) => {
      ctx.save();
      ctx.globalAlpha = 0.01 + scrollProgress * 0.02;
      ctx.strokeStyle = '#39FF14';
      ctx.lineWidth = 1;

      const time = Date.now() * 0.0005;

      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3) + Math.sin(time + i) * 30;
        const y = canvas.height * (0.3 + Math.sin(time * 0.7 + i) * 0.2);
        const size = 40 + Math.sin(time * 2 + i) * 10;

        ctx.beginPath();
        if (i % 2 === 0) {
          ctx.rect(x - size / 2, y - size / 2, size, size);
        } else {
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        }
        ctx.stroke();
      }

      ctx.restore();
    };

    let currentScrollProgress = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid(currentScrollProgress);

      particles.forEach(particle => {
        particle.update(currentScrollProgress);
        particle.draw();
      });

      drawSubtleShapes(currentScrollProgress);

      animationId = requestAnimationFrame(animate);
    };

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      currentScrollProgress = latest;
    });

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ 
          background: 'linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 50%, #0A0A0A 100%)',
          opacity: 0.25
        }}
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-neon rounded-full filter blur-3xl"
          style={{ opacity: backgroundOpacity, x: x1, y: y1 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 bg-neon rounded-full filter blur-3xl"
          style={{ opacity: opacity2, x: x2, y: y2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full filter blur-3xl"
          style={{ opacity: opacity3, x: x3, y: y3 }}
        />
      </div>

      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
    </>
  );
}
