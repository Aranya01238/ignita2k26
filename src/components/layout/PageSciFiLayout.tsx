import { ReactNode, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import ShootingStars from "@/components/ShootingStars";
import SciFiUniverseBackground from "@/components/background/SciFiUniverseBackground";
import type { SciFiVariant } from "@/components/background/SciFiScene3D";

type Props = {
  children: ReactNode;
  variant?: SciFiVariant;
  className?: string;
};

const PageSciFiLayout = ({ children, variant = "default", className = "" }: Props) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          const x = `${(e.clientX / window.innerWidth) * 100}%`;
          const y = `${(e.clientY / window.innerHeight) * 100}%`;
          spotlightRef.current.style.setProperty("--spot-x", x);
          spotlightRef.current.style.setProperty("--spot-y", y);
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <PageTransition>
      <div
        className={`min-h-screen text-gray-200 scanline-overlay relative overflow-x-hidden ${className}`}
        style={{ background: "var(--void-black)" }}
      >
        <SciFiUniverseBackground variant={variant} />
        <ShootingStars />
        <div ref={spotlightRef} className="scifi-dual-spotlight pointer-events-none fixed inset-0 z-[2]" />
        <ScrollProgress />
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default PageSciFiLayout;
