import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "> INITIALIZING IGNITIA_CORE...",
  "> LOADING STARFIELD_BUFFER...",
  "> SYNCING RA.ONE_PROTOCOLS...",
  "> ARMING NEON_SUBSYSTEMS...",
  "> SYSTEM READY",
];

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const doneRef = { current: false };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setExiting(true);
      window.setTimeout(() => {
        setLoading(false);
        window.dispatchEvent(new CustomEvent("ignitia:loader-complete"));
      }, 650);
    };

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 12 + 4, 100);
        if (next >= 100) {
          clearInterval(interval);
          finish();
          return 100;
        }
        return next;
      });
    }, 70);

    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, BOOT_LINES.length - 1));
    }, 380);

    const safety = window.setTimeout(finish, 4500);

    return () => {
      clearInterval(interval);
      clearInterval(lineTimer);
      clearTimeout(safety);
    };
  }, []);

  const activeLine = BOOT_LINES[lineIndex];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          style={{ background: "radial-gradient(circle at 20% 20%, rgba(255,94,38,0.18), transparent 25%), radial-gradient(circle at 80% 20%, rgba(255,44,84,0.16), transparent 22%), #050406" }}
        >
          {/* Animated grid bg */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,94,38,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,94,38,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Glow orbs */}
          <div className="absolute top-1/3 left-1/3 w-44 md:w-64 h-44 md:h-64 rounded-full bg-primary/15 blur-[75px] md:blur-[100px] animate-pulse-glow" />
          <div
            className="absolute bottom-1/3 right-1/3 w-36 md:w-48 h-36 md:h-48 rounded-full bg-secondary/12 blur-[60px] md:blur-[80px] animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          />

          {/* Neon spinner ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: isMobile ? 2.6 : 2, repeat: Infinity, ease: "linear" }}
            className="w-20 md:w-24 h-20 md:h-24 rounded-full border-2 border-transparent mb-8"
            style={{
              borderTopColor: "hsl(24 100% 58%)",
              borderRightColor: "hsl(12 95% 60% / 0.55)",
              boxShadow:
                "0 0 30px hsl(24 100% 58% / 0.3), inset 0 0 30px hsl(24 100% 58% / 0.12)",
            }}
          />

          {/* Logo reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-heading text-4xl md:text-6xl font-bold gradient-text mb-6 relative z-10"
            style={{ textShadow: "0 0 24px hsl(24 100% 58% / 0.35)" }}
          >
            IGNITIA '26
          </motion.h1>

          {/* Loading bar */}
          <div className="w-48 h-1 rounded-full bg-muted/30 overflow-hidden relative z-10">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background:
                  "linear-gradient(90deg, hsl(24 100% 58%), hsl(12 95% 60% / 0.55))",
                boxShadow: "0 0 10px hsl(24 100% 58% / 0.5)",
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            />
            <motion.div
              className="loader-ring-inner"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-hud text-4xl md:text-5xl font-bold tracking-[0.2em] loader-title"
            >
              IGNITIA&apos;26
            </motion.h1>

            <p className="font-hud text-[10px] text-[var(--gone-cyan)] tracking-[0.3em] mt-2 mb-8 uppercase">
              System Boot Sequence
            </p>

            <div className="loader-progress-track w-56 md:w-72">
              <motion.div className="loader-progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
              <div className="loader-progress-glow" style={{ left: `${Math.min(progress, 100)}%` }} />
            </div>

            <div className="flex justify-between w-56 md:w-72 mt-2 font-hud text-[9px] text-gray-500 tracking-widest">
              <span>BOOT</span>
              <span className="text-[var(--gone-cyan)] tabular-nums">{Math.floor(progress)}%</span>
              <span>READY</span>
            </div>

            <motion.p
              key={activeLine}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 0.75 }}
              className="font-hud text-[10px] text-gray-400 mt-6 tracking-wide min-h-[1rem]"
            >
              {activeLine}
              <span className="animate-blink text-[var(--gone-cyan)]">█</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
