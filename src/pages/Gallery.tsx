import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParticleField from "@/components/ParticleField";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ScrollProgress from "@/components/ScrollProgress";

const galleryItems = [
  {
    title: "Opening Ceremony 2025",
    category: "Events",
    color: "from-primary/40 to-neon-cyan/40",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Hackathon in Progress",
    category: "Coding",
    color: "from-secondary/40 to-neon-pink/40",
    span: "",
  },
  {
    title: "Gaming Tournament",
    category: "Gaming",
    color: "from-neon-pink/40 to-primary/40",
    span: "",
  },
  {
    title: "Cultural Night",
    category: "Cultural",
    color: "from-neon-cyan/40 to-secondary/40",
    span: "md:col-span-2",
  },
  {
    title: "Prize Distribution",
    category: "Events",
    color: "from-primary/40 to-secondary/40",
    span: "",
  },
  {
    title: "Workshop Session",
    category: "Coding",
    color: "from-secondary/40 to-neon-cyan/40",
    span: "",
  },
  {
    title: "Team Spirit",
    category: "Cultural",
    color: "from-neon-pink/40 to-neon-cyan/40",
    span: "",
  },
  {
    title: "Audience at Main Stage",
    category: "Events",
    color: "from-primary/40 to-neon-pink/40",
    span: "md:col-span-2",
  },
];

const categories = ["All", "Events", "Coding", "Gaming", "Cultural"];

const GalleryCard = ({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.75, 1]), {
    stiffness: 80,
    damping: 20,
  });
  const rotateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -8 : 8, 0]),
    { stiffness: 80, damping: 20 },
  );

  return (
    <motion.div
      ref={ref}
      style={{ scale, rotateY, transformPerspective: 800 }}
      onClick={onClick}
      className={`glass-card overflow-hidden cursor-pointer group relative ${item.span} min-h-[200px] shimmer-card`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
      <div className="absolute inset-0 bg-card/60 group-hover:bg-card/30 transition-colors duration-300" />
      <div className="relative z-10 h-full flex flex-col justify-end p-5">
        <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
          {item.category}
        </span>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {item.title}
        </h3>
      </div>
      <motion.div className="absolute inset-0 flex items-center justify-center bg-card/70 opacity-0 group-hover:opacity-100 transition-opacity">
        <ZoomIn size={32} className="text-primary" />
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<(typeof galleryItems)[0] | null>(
    null,
  );

  const filtered =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.category === filter);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background scanline-overlay">
        <ParticleField />
        <AnimatedBlobs />
        <ScrollProgress />
        <Navbar />

        <section className="relative min-h-[50vh] flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              className="font-heading text-5xl md:text-7xl font-bold mb-4"
            >
              <span className="gradient-text">Gallery</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground"
            >
              Moments from previous editions of IGNITIA.
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto">
            {/* Filter */}
            <div className="flex justify-center flex-wrap gap-3 mb-12">
              {categories.map((c) => (
                <motion.button
                  key={c}
                  onClick={() => setFilter(c)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === c
                      ? "glow-button"
                      : "glass-card text-muted-foreground"
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>

            {/* Masonry grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <GalleryCard
                    key={item.title}
                    item={item}
                    index={i}
                    onClick={() => setSelected(item)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex items-center justify-center p-8"
            >
              <motion.div
                initial={{ scale: 0.7, rotateX: 10 }}
                animate={{ scale: 1, rotateX: 0 }}
                exit={{ scale: 0.7, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card p-8 max-w-lg w-full text-center relative"
                style={{ transformPerspective: 800 }}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
                <div
                  className={`w-full h-48 rounded-lg bg-gradient-to-br ${selected.color} mb-4`}
                />
                <span className="text-xs text-primary uppercase tracking-wider">
                  {selected.category}
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground mt-1">
                  {selected.title}
                </h2>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Gallery;
