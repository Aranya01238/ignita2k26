import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import Tilt from "react-parallax-tilt";
import PageSciFiLayout from "@/components/layout/PageSciFiLayout";
import EkgCanvas from "@/components/sections/EkgCanvas";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type ScheduleItem = {
  time: string;
  ampm: string;
  title: string;
  node: string;
  status: "EXECUTING" | "PENDING";
};

const schedule: Record<string, ScheduleItem[]> = {
  "CYCLE_01 — AUG 1": [
    { time: "09:00", ampm: "AM", title: "Main Boot - Inauguration", node: "MAIN_AUD", status: "PENDING" },
    { time: "10:30", ampm: "AM", title: "CODE MATRIX Round 1", node: "LAB_COMPLEX", status: "EXECUTING" },
    { time: "12:00", ampm: "PM", title: "G.ONE ARENA Qualifiers", node: "GAMING_ZONE", status: "PENDING" },
    { time: "02:00", ampm: "PM", title: "HACKSTORM Launch", node: "INNOVATION_LAB", status: "PENDING" },
    { time: "04:30", ampm: "PM", title: "QUIZ_CORE Prelims", node: "HALL_B", status: "PENDING" },
    { time: "07:00", ampm: "PM", title: "NEON STAGE Night Show", node: "OPEN_STAGE", status: "PENDING" },
  ],
  "CYCLE_02 — AUG 2": [
    { time: "09:00", ampm: "AM", title: "Cycle 2 Boot", node: "MAIN_AUD", status: "PENDING" },
    { time: "10:00", ampm: "AM", title: "ROBO WARS Combat", node: "COMBAT_PIT", status: "PENDING" },
    { time: "12:00", ampm: "PM", title: "CODE MATRIX Finals", node: "LAB_COMPLEX", status: "PENDING" },
    { time: "02:30", ampm: "PM", title: "HACKSTORM Presentations", node: "HALL_A", status: "PENDING" },
    { time: "05:00", ampm: "PM", title: "QUIZ_CORE Finals", node: "HALL_B", status: "PENDING" },
    { time: "07:30", ampm: "PM", title: "System Shutdown Ceremony", node: "MAIN_AUD", status: "PENDING" },
  ],
};

const revealEase = [0.16, 1, 0.3, 1] as const;

const HudCorners = () => (
  <>
    <span className="hc-tl" />
    <span className="hc-tr" />
    <span className="hc-bl" />
    <span className="hc-br" />
  </>
);

const TimelineCard = ({ item, side, unlocked }: { item: ScheduleItem; side: "left" | "right"; unlocked: boolean }) => {
  const isCyan = side === "left";
  const cardClass = isCyan ? "schedule-card-cyan" : "schedule-card-red";
  const executing = item.status === "EXECUTING" && unlocked;

  return (
    <div className={`group flex items-center gap-4 md:gap-8 ${side === "left" ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>
      <div className={`flex-1 ${side === "left" ? "md:text-right" : "md:text-left"}`}>
        <Tilt tiltMaxAngleX={unlocked ? 8 : 0} tiltMaxAngleY={unlocked ? 8 : 0} glareEnable={unlocked} scale={unlocked ? 1.02 : 1} transitionSpeed={1400}>
          <motion.div className={`schedule-card hud-corners p-5 relative holo-card-glow ${cardClass} ${unlocked ? "is-unlocked" : "is-locked-slot"}`} animate={{ filter: unlocked ? "blur(0px)" : "blur(3px)", opacity: unlocked ? 1 : 0.45 }} transition={{ duration: 0.65 }}>
            <HudCorners />
            <div className="scan-line" style={{ animationDuration: "3.5s" }} />
            <AnimatePresence>
              {!unlocked && (
                <motion.div exit={{ opacity: 0 }} className="schedule-lock-overlay">
                  <Lock size={22} className="text-[var(--gone-cyan)] mb-2" />
                  <span className="font-hud text-[9px] tracking-[0.25em] text-gray-400">SCROLL_TO_DECRYPT</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 ${side === "left" ? "md:flex-row-reverse" : ""}`}>
              <div className={`flex items-baseline gap-2 ${side === "left" ? "md:justify-end" : ""}`}>
                <span className="text-2xl md:text-3xl font-hud font-bold tracking-wider" style={{ color: isCyan ? "var(--gone-cyan)" : "var(--raone-red)" }}>{item.time}</span>
                <span className="text-xs font-hud font-bold text-gray-400">{item.ampm}</span>
              </div>
              {executing && (
                <span className="status-tag text-[var(--raone-red)] border-[var(--raone-red)] flex items-center gap-2 w-max">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--raone-red)] animate-blink" />
                  EXECUTING
                </span>
              )}
              {unlocked && !executing && (
                <span className="status-tag text-[var(--gone-cyan)] border-[var(--gone-cyan)]/40 flex items-center gap-1.5 w-max">
                  <Unlock size={10} />
                  UNLOCKED
                </span>
              )}
            </div>
            <h3 className={`font-hud text-base md:text-lg font-bold text-white uppercase tracking-wider mb-2 glitch-text ${side === "left" ? "md:text-right" : "md:text-left"}`} data-text={item.title}>{item.title}</h3>
            <p className={`font-hud text-[10px] text-gray-500 uppercase tracking-[0.2em] ${side === "left" ? "md:text-right" : "md:text-left"}`}>NODE: {item.node}</p>
          </motion.div>
        </Tilt>
      </div>
      <motion.div className="relative flex flex-col items-center shrink-0" animate={{ scale: unlocked ? 1 : 0.85, opacity: unlocked ? 1 : 0.5 }}>
        <div className={`timeline-node ${executing ? "is-active arc-pulse" : ""} ${unlocked ? "is-unlocked-node" : ""}`}>
          <motion.div className="absolute inset-[3px] rounded-full" animate={{ background: unlocked ? (executing ? "var(--raone-red)" : "var(--gone-cyan)") : "rgba(255,255,255,0.1)" }} />
        </div>
      </motion.div>
      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const TimelineRevealRow = ({ item, side, index, unlocked, onUnlock }: { item: ScheduleItem; side: "left" | "right"; index: number; unlocked: boolean; onUnlock: (i: number) => void }) => (
  <motion.div
    className="timeline-reveal-row"
    initial="hidden"
    whileInView="visible"
    onViewportEnter={() => onUnlock(index)}
    viewport={{ once: true, amount: 0.4, margin: "0px 0px -60px 0px" }}
    variants={{
      hidden: { opacity: 0, x: side === "left" ? -64 : 64, y: 28 },
      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: revealEase, delay: index * 0.05 } },
    }}
  >
    <TimelineCard item={item} side={side} unlocked={unlocked} />
  </motion.div>
);

const Schedule = () => {
  const days = Object.keys(schedule);
  const [activeDay, setActiveDay] = useState(days[0]);
  const [unlockedByDay, setUnlockedByDay] = useState<Record<string, Set<number>>>(() => {
    const init: Record<string, Set<number>> = {};
    for (const day of days) init[day] = new Set();
    return init;
  });
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const timelineRef = useRef<HTMLDivElement>(null);
  const items = schedule[activeDay];
  const unlockedSet = unlockedByDay[activeDay] ?? new Set();

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.9", "end 0.25"] });
  const spineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 50, damping: 22 });

  const handleUnlock = useCallback((index: number) => {
    setUnlockedByDay((prev) => {
      const current = prev[activeDay] ?? new Set();
      if (current.has(index)) return prev;
      const next = new Set(current);
      next.add(index);
      return { ...prev, [activeDay]: next };
    });
  }, [activeDay]);

  useEffect(() => {
    document.documentElement.classList.add("schedule-page-smooth");
    return () => document.documentElement.classList.remove("schedule-page-smooth");
  }, []);

  return (
    <PageSciFiLayout variant="schedule">
      <section className="section-redesign relative pt-24 pb-8">
        <div className="section-redesign-bg section-noise">
          <div className="schedule-atmo" />
          <span className="section-watermark">EXECUTION SEQUENCE</span>
        </div>
        <div ref={headerRef as React.RefObject<HTMLDivElement>} className="container mx-auto px-4 text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={headerVisible ? { opacity: 1 } : {}} className="font-hud text-xs text-[var(--gone-cyan)] uppercase tracking-[0.35em] mb-4">[ BIOMECHANICAL TIMELINE ]</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={headerVisible ? { opacity: 1, y: 0 } : {}} className="font-hud text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider">
            <span className="text-white">EXECUTION </span>
            <span className="text-[var(--raone-red)]">SEQUENCE</span>
          </motion.h1>
          <p className="font-hud text-[10px] text-gray-500 mt-4 tracking-widest uppercase">Scroll to decrypt each timeline node</p>
        </div>
      </section>
      <section className="section-redesign section-padding relative z-10 pb-32 schedule-timeline-scroll">
        <div className="section-redesign-bg"><EkgCanvas /></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex justify-center gap-0 mb-12 border-b border-gray-800/80">
            {days.map((day) => (
              <button key={day} type="button" onClick={() => setActiveDay(day)} className={`schedule-tab ${activeDay === day ? "is-active" : ""}`}>{day}</button>
            ))}
          </div>
          <p className="text-center font-hud text-[10px] text-gray-500 mb-6">
            <span className="text-[var(--gone-cyan)]">{unlockedSet.size}/{items.length}</span> NODES_DECRYPTED
          </p>
          <div ref={timelineRef} className="relative min-h-[200px]">
            <div className="timeline-spine md:left-1/2">
              <motion.div className="timeline-spine-glow" style={{ height: spineHeight }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeDay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10 md:space-y-14">
                {items.map((item, i) => (
                  <TimelineRevealRow key={`${activeDay}-${item.title}`} item={item} side={i % 2 === 0 ? "left" : "right"} index={i} unlocked={unlockedSet.has(i)} onUnlock={handleUnlock} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageSciFiLayout>
  );
};

export default Schedule;
