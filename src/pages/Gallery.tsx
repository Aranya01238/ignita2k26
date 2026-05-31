import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import PageSciFiLayout from "@/components/layout/PageSciFiLayout";
import { useScrollReveal, useTypewriter } from "@/hooks/useScrollReveal";

type GalleryCategory = "EVENTS.dat" | "GAME_MODE.dat" | "TECH.dat" | "CULT.dat" | "ENTITIES.log" | "ENVIRON.dat";

type GalleryItem = {
  id: string;
  file: GalleryCategory;
  icon: string;
  label: string;
  span: string;
  accent: "cyan" | "red";
};

const galleryItems: GalleryItem[] = [
  { id: "0001", file: "EVENTS.dat", icon: "⚡", label: "Opening Ceremony", span: "md:col-span-2 md:row-span-2", accent: "cyan" },
  { id: "0002", file: "GAME_MODE.dat", icon: "🎮", label: "Arena Finals", span: "", accent: "red" },
  { id: "0003", file: "TECH.dat", icon: "🔬", label: "Hackathon Sprint", span: "md:col-span-2", accent: "cyan" },
  { id: "0004", file: "CULT.dat", icon: "🎭", label: "Neon Stage", span: "", accent: "red" },
  { id: "0005", file: "ENTITIES.log", icon: "👥", label: "Team Portraits", span: "", accent: "cyan" },
  { id: "0006", file: "ENVIRON.dat", icon: "🏛️", label: "Campus Core", span: "md:row-span-2", accent: "cyan" },
  { id: "0007", file: "EVENTS.dat", icon: "🏆", label: "Victory Podium", span: "", accent: "red" },
  { id: "0008", file: "TECH.dat", icon: "💻", label: "Code Matrix", span: "md:col-span-2", accent: "cyan" },
  { id: "0009", file: "GAME_MODE.dat", icon: "🎯", label: "Qualifier Round", span: "", accent: "red" },
  { id: "0010", file: "ENVIRON.dat", icon: "🌐", label: "Night Ambience", span: "", accent: "cyan" },
  { id: "0011", file: "CULT.dat", icon: "🎵", label: "Sound Check", span: "md:row-span-2", accent: "red" },
  { id: "0012", file: "ENTITIES.log", icon: "🤖", label: "Robo Wars Pit", span: "", accent: "cyan" },
];

const filters: { label: string; value: "ALL" | GalleryCategory }[] = [
  { label: "[ALL_DATA]", value: "ALL" },
  { label: "[EVENTS.dat]", value: "EVENTS.dat" },
  { label: "[GAME_MODE.dat]", value: "GAME_MODE.dat" },
  { label: "[TECH.dat]", value: "TECH.dat" },
  { label: "[CULT.dat]", value: "CULT.dat" },
  { label: "[ENTITIES.log]", value: "ENTITIES.log" },
  { label: "[ENVIRON.dat]", value: "ENVIRON.dat" },
];

const TICKER = "◈ IGNITIA'26 ARCHIVES ◈ UEM KOLKATA ◈ MEMORY FRAGMENTS: 12 ◈ AUG 1-2, 2026 ◈ ";

const GalleryCard = ({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div ref={ref} layout initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: (index % 4) * 0.06 }} className={item.span}>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable scale={1.03} className="w-full h-full">
        <button type="button" onClick={onClick} className={`memory-card hud-corners holo-card-glow group w-full h-full text-left memory-card--${item.accent}`} style={{ minHeight: item.span.includes("row-span-2") ? 420 : 200 }}>
          <div className="memory-card-holo" />
          <span className="memory-card-icon">{item.icon}</span>
          <span className="hc-tl" style={{ borderColor: "var(--gone-cyan)" }} />
          <span className="hc-tr" style={{ borderColor: "var(--gone-cyan)" }} />
          <span className="hc-bl" style={{ borderColor: "var(--gone-cyan)" }} />
          <span className="hc-br" style={{ borderColor: "var(--gone-cyan)" }} />
          <div className="relative z-10 p-4 flex flex-col justify-between h-full">
            <div>
              <span className="font-hud text-[10px] text-[var(--gone-cyan)]">#{item.id}</span>
              <p className="font-hud text-sm text-white mt-2 uppercase memory-rgb-title">{item.file}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-[var(--panel-border)]">
              <div className="h-1 bg-gray-900 overflow-hidden mb-2">
                <motion.div className="h-full bg-gradient-to-r from-[var(--raone-red)] to-[var(--gone-cyan)]" initial={{ width: 0 }} animate={inView ? { width: "78%" } : {}} transition={{ duration: 0.8 }} />
              </div>
              <span className="font-hud text-[9px] text-[var(--raone-red)] group-hover:text-[var(--gone-cyan)]">DECRYPT →</span>
            </div>
          </div>
        </button>
      </Tilt>
    </motion.div>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState<"ALL" | GalleryCategory>("ALL");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const subtitle = useTypewriter("> Accessing archived simulations... [CLASSIFIED]", headerVisible, 32);

  const filtered = useMemo(() => (filter === "ALL" ? galleryItems : galleryItems.filter((i) => i.file === filter)), [filter]);
  const selected = selectedIndex !== null ? filtered[selectedIndex] : null;

  const goPrev = () => selectedIndex !== null && setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
  const goNext = () => selectedIndex !== null && setSelectedIndex((selectedIndex + 1) % filtered.length);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((p) => (p === null || !filtered.length ? null : (p - 1 + filtered.length) % filtered.length));
      if (e.key === "ArrowRight") setSelectedIndex((p) => (p === null || !filtered.length ? null : (p + 1) % filtered.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedIndex, filtered.length]);

  return (
    <PageSciFiLayout variant="gallery">
      <section className="section-redesign relative pt-24 pb-6">
        <div className="section-redesign-bg section-noise">
          <div className="gallery-atmo" />
          <span className="section-watermark">MEMORY_CORE</span>
        </div>
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: -16 }} animate={headerVisible ? { opacity: 1, y: 0 } : {}} className="font-hud text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--raone-red)] to-[var(--gone-cyan)]">MEMORY_CORE</motion.h1>
          <p className="font-hud text-xs text-[var(--gone-cyan)] mt-4 uppercase tracking-widest min-h-[1.25rem]">{subtitle}</p>
        </div>
      </section>
      <div className="relative z-10 border-y border-[var(--raone-red)]/40 bg-[rgba(232,0,13,0.12)] py-2 overflow-hidden">
        <div className="gallery-ticker-track font-hud text-[10px] text-[var(--gone-cyan)] uppercase">
          <span className="px-4">{TICKER}</span>
          <span className="px-4">{TICKER}</span>
        </div>
      </div>
      <section className="section-padding relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((c) => (
              <button key={c.value} type="button" onClick={() => { setFilter(c.value); setSelectedIndex(null); }} className={`terminal-chip ${filter === c.value ? "is-active" : ""}`}>{c.label}</button>
            ))}
          </div>
          <motion.div layout className="gallery-mosaic-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} onClick={() => setSelectedIndex(filtered.findIndex((f) => f.id === item.id))} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="memory-lightbox-backdrop flex items-center justify-center p-4" onClick={() => setSelectedIndex(null)}>
            <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} onClick={(e) => e.stopPropagation()} className="memory-lightbox-panel is-open hud-corners">
              <div className="flex justify-between p-3 border-b border-[var(--panel-border)]">
                <span className="font-hud text-xs text-[var(--gone-cyan)]">[ {selectedIndex + 1}/{filtered.length} ]</span>
                <button type="button" onClick={() => setSelectedIndex(null)} className="font-hud text-xs text-[var(--raone-red)]">[ ESC ] CLOSE</button>
              </div>
              <div className="relative aspect-video bg-[var(--deep-space)] flex flex-col items-center justify-center">
                <span className="text-7xl opacity-25">{selected.icon}</span>
                <span className="font-hud text-xl text-white mt-2">{selected.file}</span>
                <span className="font-hud text-sm text-[var(--gone-cyan)]">{selected.label}</span>
              </div>
              <div className="p-4 font-hud text-xs text-[var(--gone-cyan)] space-y-1">
                <p><span className="text-gray-500">FRAGMENT:</span> #{selected.id}</p>
                <p><span className="text-gray-500">TYPE:</span> {selected.file}</p>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
                <button type="button" onClick={goPrev} className="pointer-events-auto font-hud text-[10px] px-3 py-2 border border-[var(--raone-red)] text-[var(--raone-red)] bg-black/80">◀ PREV</button>
                <button type="button" onClick={goNext} className="pointer-events-auto font-hud text-[10px] px-3 py-2 border border-[var(--raone-red)] text-[var(--raone-red)] bg-black/80">NEXT ▶</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageSciFiLayout>
  );
};

export default Gallery;
