import { useEffect, useRef } from "react";

const SciFiParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 55 : 110;

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      hue: "red" | "cyan";
      opacity: number;
    };

    const particles: P[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.6,
        hue: Math.random() > 0.5 ? "cyan" : "red",
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x * canvas.width;
      const my = mouseRef.current.y * canvas.height;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          p.x -= dx * 0.002;
          p.y -= dy * 0.002;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "cyan"
            ? `rgba(0, 245, 255, ${p.opacity})`
            : `rgba(232, 0, 13, ${p.opacity * 0.85})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 130) continue;
          const alpha = (1 - d / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle =
            a.hue === b.hue
              ? a.hue === "cyan"
                ? `rgba(0, 245, 255, ${alpha})`
                : `rgba(232, 0, 13, ${alpha})`
              : `rgba(180, 200, 220, ${alpha * 0.6})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="scifi-particle-network" />;
};

export default SciFiParticleNetwork;
