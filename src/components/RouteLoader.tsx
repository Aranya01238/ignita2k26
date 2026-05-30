import { motion } from "framer-motion";

const RouteLoader = () => (
  <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 backdrop-blur-xl">
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-card/70 px-8 py-7 text-center shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-10 w-10 rounded-full border-2 border-white/10 border-t-primary border-r-secondary"
      />
      <div>
        <p className="font-heading text-lg font-semibold gradient-text">IGNITIA '26</p>
        <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Loading section
        </p>
      </div>
    </motion.div>
  </div>
);

export default RouteLoader;