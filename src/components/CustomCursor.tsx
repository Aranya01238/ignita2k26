import { useEffect, useRef } from "react";

const CURSOR_SIZE = 32;
const HOTSPOT_X = 5;
const HOTSPOT_Y = 5;

const CustomCursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const visibleRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const root = rootRef.current;
    const img = imgRef.current;
    if (!root || !img) return;

    document.documentElement.classList.add("custom-cursor-active");

    const paint = () => {
      rafRef.current = 0;
      const { x, y } = posRef.current;
      root.style.transform = `translate3d(${x - HOTSPOT_X}px, ${y - HOTSPOT_Y}px, 0)`;
      if (!visibleRef.current) {
        visibleRef.current = true;
        root.classList.add("is-visible");
      }
    };

    const schedulePaint = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      posRef.current = { x: e.clientX, y: e.clientY };
      schedulePaint();
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      img.classList.add("is-pressing");
    };

    const onUp = () => img.classList.remove("is-pressing");

    const onLeave = () => {
      visibleRef.current = false;
      root.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", schedulePaint);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      img.classList.add("has-glow");
    }

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", schedulePaint);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor-root" aria-hidden>
      <img
        ref={imgRef}
        src="/mouse-32.png"
        srcSet="/mouse-32.png 1x, /mouse-48.png 2x"
        width={CURSOR_SIZE}
        height={CURSOR_SIZE}
        alt=""
        draggable={false}
        className="custom-cursor-img"
      />
    </div>
  );
};

export default CustomCursor;
