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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={`loader-screen ${exiting ? "is-exiting" : ""}`}
        >
          <div className="loader-stars" aria-hidden>
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                className="loader-star"
                style={{
                  left: `${(i * 17 + 7) % 100}%`,
                  top: `${(i * 23 + 11) % 100}%`,
                  animationDelay: `${(i % 12) * 0.15}s`,
                  opacity: 0.2 + (i % 5) * 0.15,
                }}
              />
            ))}
          </div>

          <div className="loader-hud-frame">
            <span className="loader-corner tl" />
            <span className="loader-corner tr" />
            <span className="loader-corner bl" />
            <span className="loader-corner br" />

            <motion.div
              className="loader-ring-outer"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
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
