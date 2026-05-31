import { useEffect, useRef } from "react";

const MouseSpotlight = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const handler = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (divRef.current) {
          divRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsl(199 89% 48% / 0.06), transparent 40%)`;
        }
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
    />
  );
};

export default MouseSpotlight;
