import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(24 100% 58%), hsl(12 95% 60%), hsl(0 92% 56%))",
      }}
    />
  );
};

export default ScrollProgress;
