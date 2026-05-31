import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  twinkle: number;
  twinkleSpeed: number;
  hue: number;
};

const CelestialStarfield = ({ density = 1 }: { density?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let stars: Star[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 2800) * density;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1.5 + 0.2,
        r: Math.random() * 1.8 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.008 + Math.random() * 0.02,
        hue: Math.random() > 0.85 ? 185 : Math.random() > 0.92 ? 0 : 210,
      }));
    };

    const draw = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      for (const s of stars) {
        s.twinkle += s.twinkleSpeed;
        const pulse = 0.45 + Math.sin(s.twinkle) * 0.55;
        const driftY = Math.sin(t * 0.15 + s.x * 0.002) * 0.3 * s.z;
        const driftX = Math.cos(t * 0.12 + s.y * 0.002) * 0.2 * s.z;
        const alpha = pulse * (0.35 + s.z * 0.45);
        const size = s.r * (0.8 + s.z * 0.6);

        ctx.beginPath();
        ctx.arc(s.x + driftX, s.y + driftY, size, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === 0
            ? `rgba(232, 0, 13, ${alpha * 0.7})`
            : s.hue === 185
              ? `rgba(0, 245, 255, ${alpha})`
              : `rgba(220, 235, 255, ${alpha})`;
        ctx.fill();

        if (s.z > 1 && pulse > 0.75) {
          ctx.beginPath();
          ctx.moveTo(s.x + driftX - size * 3, s.y + driftY);
          ctx.lineTo(s.x + driftX + size * 3, s.y + driftY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
};

export default CelestialStarfield;
