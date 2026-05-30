import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollControls = () => {
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowButton(window.scrollY > 480);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-glass-border bg-card/85 text-foreground shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-primary/40 hover:text-primary md:bottom-8 md:right-8"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollControls;