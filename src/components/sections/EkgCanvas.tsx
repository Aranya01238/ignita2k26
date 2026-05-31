import { useEffect, useRef } from "react";

const EkgCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(232, 0, 13, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(232, 0, 13, 0.6)";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const t = (x + offset) * 0.04;
        let y = h / 2;
        if (Math.sin(t) > 0.92) y -= 18;
        else if (Math.sin(t * 2.3) > 0.97) y += 10;
        else y += Math.sin(t * 0.8) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      offset += 2;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="section-ekg-canvas" aria-hidden />;
};

export default EkgCanvas;
