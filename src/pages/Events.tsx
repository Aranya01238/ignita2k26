import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Gamepad2,
  FlaskConical,
  Music2,
  Brain,
  Bot,
  ArrowRight,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import PageSciFiLayout from "@/components/layout/PageSciFiLayout";
import CelestialStarfield from "@/components/background/CelestialStarfield";
import { useScrollReveal, useTypewriter } from "@/hooks/useScrollReveal";

type EventCategory = "TECH" | "GAME" | "CULT" | "HACK";
type CardAccent = "cyan" | "blue" | "red";

type EventItem = {
  level: string;
  title: string;
  prompt: string;
  description: string;
  briefing: string;
  prize: string;
  prizeNum: number;
  difficulty: string;
  category: EventCategory;
  status: "ACTIVE" | "LOCKED";
  accent: CardAccent;
  image: string;
  imageAlt: string;
  Icon: LucideIcon;
};

const events: EventItem[] = [
  {
    level: "01",
    title: "CODE MATRIX",
    prompt: "PROMPT: BREAK_THE_FIREWALL",
    description: "Algorithmic warfare. Break Ra.One's firewall.",
    briefing: "Deploy your logic against encrypted challenge nodes. Solo or duo.",
    prize: "₹50,000",
    prizeNum: 50000,
    difficulty: "◆◆◆◆◇",
    category: "TECH",
    status: "ACTIVE",
    accent: "cyan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwufKDY9ZVQL4t12Zza17PENxSqBcp5ElAX9L2DtdeeOxNQouoUerhxNW3GGhqdT-dOPr-BaeFUPaw9zaR2JWpqBqlDKnaIEZi8fVgevzU-pkie6Mzyafa4-xvCTF9wiWRjfmY0Zw0qPlMR9L5Un3Ny3WG9mU3Ag8tA0d5CVMafzvwq0A5ORscVrHiZE8-tQCSUboDhnKjg5sOQKGTespxcQ-iAdOQGqxTl1GFC62q8weFPJeiOyOriiDUJsEDg0qeXS6DEsMELqII",
    imageAlt: "Cyberpunk coding terminal",
    Icon: Terminal,
  },
  {
    level: "02",
    title: "G.ONE ARENA",
    prompt: "ARENA: NEON_VALOR",
    description: "Squad-based combat in Ra.One's virtual world.",
    briefing: "5v5 tactical rounds across neon arenas. Qualifiers on Day 1.",
    prize: "₹1,00,000",
    prizeNum: 100000,
    difficulty: "◆◆◆◆◆",
    category: "GAME",
    status: "ACTIVE",
    accent: "blue",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJAUbFCJrgVTFPyhzVBjjRjq33-iFr7fJdfJxqWgViStDlury3jN_8jAN7AK6jmQpsXoVDdFXDe-_PngPawONRrREjwKzZ0Sr5MQCE3HtTY13AiaaVrGdMIdzGv6eClA7ofvZjTgi6U1Xf8p0VR12XicB7g9Uay1kTbSYk6xx6byQLizsOwuW546LSSWufHoNB3GrT1VGAWBEna_DJ4DqJmZUJqVlb3YV65H4691UkL5KAc4suYDe_E2yiaesJNwF_7gqJJEk9z-je",
    imageAlt: "Esports arena",
    Icon: Gamepad2,
  },
  {
    level: "03",
    title: "HACKSTORM",
    prompt: "MODE: 24HR_OVERRIDE",
    description: "24hr system override across 3 domains.",
    briefing: "24-hour build sprint. Web, AI, and IoT tracks.",
    prize: "₹1,50,000",
    prizeNum: 150000,
    difficulty: "◆◆◆◆◆",
    category: "HACK",
    status: "ACTIVE",
    accent: "cyan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBT8XzQrheLs1o09XbG6LbgEyF1zbjCEsMbqlFDEKNTPZVn72KjEZDKRLiKquW05XPSBwhhTGBBZ4UeEewk3H0PB5lsO7JrmjrALq_v4loCrvlgsN1luaDkXbxC11BK5hSLTDtI5fGo-XsQqyU2f0TMV-s0PRx9L8UXXoQt0ecrFAGfCqtYMitenjuI3LHkVFxHUfMjjoI326kBhl3oGgVeZujkVjMHk4uVbfsXU7GIYnL5z5RXCrIjVF15cYjFFcZpoxKOzIfnWa96",
    imageAlt: "Neural network",
    Icon: FlaskConical,
  },
  {
    level: "04",
    title: "NEON STAGE",
    prompt: "STAGE: RA_ONE_CORE",
    description: "Cultural showdown powered by Ra.One's core.",
    briefing: "Music, dance, and performance protocols on the main stage.",
    prize: "₹30,000",
    prizeNum: 30000,
    difficulty: "◆◆◆◇◇",
    category: "CULT",
    status: "ACTIVE",
    accent: "blue",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsCy4NoAM4UvQgljZddPNZlbXrtj-BcBNgbUuvpQTS7s2mgS9rrxdHGO3W7M9rs9_dHuxi3lStIgTX99tNGC-UCB02l8xBc8S9W9iEE1uyQ-b_q1PlhX8ychFDy1j8UI9ywmgMF6-T_s_ZAAh-2j4jiFby4Dp-g6lsGWbptwTK-xtL9UM1A-EU9bU8fgrOpuk2ijdXRCKZ-5lhPqIcGo7UfeikGdwbS1qbKosBMyhX7N2hER2fi2d18H7RKn68ibkapItPHCDZ0ki9",
    imageAlt: "Neon stage",
    Icon: Music2,
  },
  {
    level: "05",
    title: "QUIZ_CORE",
    prompt: "LOGIC: SYNAPTIC_WAR",
    description: "Interface with Ra.One's knowledge mainframe.",
    briefing: "Rapid-fire synaptic rounds across tech and logic clusters.",
    prize: "₹20,000",
    prizeNum: 20000,
    difficulty: "◆◆◆◇◇",
    category: "TECH",
    status: "ACTIVE",
    accent: "cyan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBT8XzQrheLs1o09XbG6LbgEyF1zbjCEsMbqlFDEKNTPZVn72KjEZDKRLiKquW05XPSBwhhTGBBZ4UeEewk3H0PB5lsO7JrmjrALq_v4loCrvlgsN1luaDkXbxC11BK5hSLTDtI5fGo-XsQqyU2f0TMV-s0PRx9L8UXXoQt0ecrFAGfCqtYMitenjuI3LHkVFxHUfMjjoI326kBhl3oGgVeZujkVjMHk4uVbfsXU7GIYnL5z5RXCrIjVF15cYjFFcZpoxKOzIfnWa96",
    imageAlt: "Quiz core",
    Icon: Brain,
  },
  {
    level: "06",
    title: "ROBO WARS",
    prompt: "MODE: COMBAT_UNIT",
    description: "Deploy your combat unit vs Ra.One's army.",
    briefing: "Autonomous combat units in the arena pit. Weight-class brackets.",
    prize: "₹80,000",
    prizeNum: 80000,
    difficulty: "◆◆◆◆◇",
    category: "TECH",
    status: "LOCKED",
    accent: "red",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeeJyX0UVrZXFCL61IcBSUWHUa3NZufk37tU4FAjLQhvd21v0b9KdOtKtGMvSCxyDLxJP3IFqzuRz3Ex7bkWqLPh6htdpqU9TlwmXPMJ0lhXREnOlVLrDC8eBLpa1D8hQWP7krZx3u-1iRwnWadcOuM8YCvBagLB_D5yAHoOmyqxaL1CG_uCvaVfnqv2iuwt1rKzYZHC8mCvz1HcAerspc65-ha_hu46JPylELTshgLw3eXfnrbQhwwe_Eia-BWYrysCqOF0oVAR8S",
    imageAlt: "Robo wars",
    Icon: Bot,
  },
];

const filters: { label: string; value: "ALL" | EventCategory }[] = [
  { label: "[ALL_SIM]", value: "ALL" },
  { label: "[TECH.exe]", value: "TECH" },
  { label: "[GAME_MODE]", value: "GAME" },
  { label: "[CULT.dat]", value: "CULT" },
  { label: "[HACK.run]", value: "HACK" },
];

const EventLevelModal = ({ event, onClose }: { event: EventItem; onClose: () => void }) => {
  const { Icon } = event;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="event-level-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="event-level-modal-panel hud-corners"
      >
        <CelestialStarfield density={0.6} />
        <span className="hc-tl" style={{ borderColor: "var(--gone-cyan)" }} />
        <span className="hc-tr" style={{ borderColor: "var(--gone-cyan)" }} />
        <span className="hc-bl" style={{ borderColor: "var(--raone-red)" }} />
        <span className="hc-br" style={{ borderColor: "var(--raone-red)" }} />
        <button type="button" onClick={onClose} className="event-level-modal-close" aria-label="Close">
          <X size={18} />
        </button>
        <div className="event-level-modal-hero">
          <img src={event.image} alt={event.imageAlt} />
          <div className="event-level-modal-hero-overlay" />
          <div className="event-level-modal-hero-meta">
            <span className="font-hud text-[10px] text-[var(--gone-cyan)] tracking-widest">
              LVL_{event.level} — {event.category}
            </span>
            <h2 className="font-hud text-2xl md:text-3xl font-bold text-white mt-1 glitch-text" data-text={event.title}>
              {event.title}
            </h2>
          </div>
          <Icon className="event-level-modal-icon" size={48} strokeWidth={1} />
        </div>
        <div className="event-level-modal-body">
          <p className="font-hud text-[10px] text-[var(--gone-cyan)] tracking-widest mb-2">{event.prompt}</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{event.briefing}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="event-level-stat">
              <span className="label">PRIZE_POOL</span>
              <span className="value text-[var(--gone-cyan)]">{event.prize}</span>
            </div>
            <div className="event-level-stat">
              <span className="label">DIFFICULTY</span>
              <span className="value">{event.difficulty}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/contact" className="event-level-cta-primary font-hud">
              <Zap size={14} />
              INITIATE_REGISTRATION
            </a>
            <button type="button" onClick={onClose} className="event-level-cta-secondary font-hud">
              RETURN_TO_GRID
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BentoLevelCard = ({ event, onEnter }: { event: EventItem; onEnter: (e: EventItem) => void }) => {
  const locked = event.status === "LOCKED";
  const { Icon } = event;

  return (
    <article className={`bento-level-card group ${locked ? "is-locked" : ""}`} data-accent={event.accent}>
      <span className="bento-lvl-badge">LVL_{event.level}</span>
      <div className="bento-media">
        <img src={event.image} alt={event.imageAlt} loading="lazy" />
        <div className="bento-media-gradient" />
        <div className="bento-media-scan" />
      </div>
      <div className="bento-card-head">
        <div>
          <h3 className="bento-card-title glitch-text" data-text={event.title}>{event.title}</h3>
          <p className="bento-card-prompt">{event.prompt}</p>
        </div>
        <Icon className="bento-card-icon" size={28} strokeWidth={1.5} />
      </div>
      <div className="bento-prize-row">
        <span className="bento-prize-label">PRIZE_POOL</span>
        <span className="bento-prize-value">{event.prize}</span>
      </div>
      <p className="bento-difficulty">{event.difficulty}</p>
      <button type="button" disabled={locked} onClick={() => !locked && onEnter(event)} className="bento-enter-btn glitch-skew">
        {locked ? "LEVEL_LOCKED" : "ENTER_LEVEL"}
        {!locked && <ArrowRight size={14} />}
      </button>
    </article>
  );
};

const Events = () => {
  const [activeFilter, setActiveFilter] = useState<"ALL" | EventCategory>("ALL");
  const [livePrize, setLivePrize] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const { ref: introRef, visible: introVisible } = useScrollReveal(0.25);
  const eyebrow = useTypewriter("> SIMULATION_CORE.exe — LOADING PROTOCOLS", introVisible, 28);

  const filteredEvents = activeFilter === "ALL" ? events : events.filter((e) => e.category === activeFilter);
  const basePrizeTotal = useMemo(() => events.reduce((sum, e) => sum + e.prizeNum, 0), []);

  useEffect(() => {
    setLivePrize(basePrizeTotal);
    const id = window.setInterval(() => setLivePrize((p) => p + Math.floor(Math.random() * 120)), 2500);
    return () => clearInterval(id);
  }, [basePrizeTotal]);

  return (
    <PageSciFiLayout variant="events">
      <section className="section-redesign relative pt-24 pb-8 md:pb-12">
        <div className="section-redesign-bg section-noise">
          <div className="events-celestial-bg">
            <CelestialStarfield density={1.2} />
          </div>
          <span className="section-watermark">SIMULATION_CORE</span>
        </div>
        <div ref={introRef as React.RefObject<HTMLDivElement>} className="container mx-auto px-4 text-center relative z-10">
          <p className="font-hud text-xs md:text-sm text-[var(--gone-cyan)] uppercase tracking-[0.25em] mb-4 min-h-[1.25rem]">
            {eyebrow}
            {introVisible && eyebrow.length < 42 && <span className="animate-blink text-[var(--gone-cyan)]">█</span>}
          </p>
          <div className="relative inline-block mb-10">
            <div className="section-title-ring" aria-hidden />
            <motion.h1
              initial={{ opacity: 0, x: -48 }}
              animate={introVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`events-title-bracket font-hud text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider relative z-10 ${introVisible ? "is-visible" : ""}`}
            >
              <span className="bracket-l">[</span> MISSION PROTOCOLS <span className="bracket-r">]</span>
            </motion.h1>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {filters.map((filter) => (
              <button key={filter.value} type="button" onClick={() => setActiveFilter(filter.value)} className={`terminal-chip ${activeFilter === filter.value ? "is-active" : ""}`}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-redesign pb-24 px-4 relative z-10">
        <div className="section-redesign-bg">
          <CelestialStarfield density={0.8} />
        </div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <header className="mb-8">
            <p className="font-hud text-[10px] text-[var(--gone-cyan)] uppercase tracking-[0.2em] mb-2">[ SECTOR: EVENT_LEVELS ]</p>
            <h2 className="font-hud text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">CHOOSE_YOUR_CHALLENGE</h2>
            <div className="h-1 w-32 bg-[var(--gone-cyan)] mt-4" />
          </header>
          <div className="relative mb-12 p-6 md:p-8 rounded-2xl border border-[var(--gone-cyan)]/30 bg-[var(--void-black)]/60 backdrop-blur-md overflow-hidden group">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--gone-cyan)]/10 via-transparent to-[var(--raone-red)]/10" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--gone-cyan)] to-[var(--raone-red)] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-xl" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gone-cyan)] to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--raone-red)] to-transparent opacity-50" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-hud text-xs md:text-sm text-[var(--gone-cyan)] uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--raone-red)] animate-pulse" />
                  TOTAL_PRIZE_POOL_ESTIMATE
                </p>
                <p className="text-gray-400 text-sm max-w-md hidden md:block">
                  Compete across all protocols to secure your share of the massive prize pool. Rewards subject to real-time simulation scaling.
                </p>
              </div>
              <div className="text-center md:text-right">
                <h2 className="font-hud text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gone-cyan)] to-white tracking-wider tabular-nums drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  ₹{livePrize.toLocaleString("en-IN")}
                </h2>
                <p className="font-mono text-xs text-[var(--raone-red)] mt-2 uppercase tracking-widest">+ EXP & MERCH</p>
              </div>
            </div>
            
            {/* Corner decorations */}
            <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--gone-cyan)]/50" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--raone-red)]/50" />
          </div>
          <AnimatePresence mode="popLayout">
            <motion.div key={activeFilter} className="events-bento-grid" initial="hidden" animate="visible" exit="hidden" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
              {filteredEvents.map((event) => (
                <motion.div key={event.level} layout variants={{ hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } } }}>
                  <BentoLevelCard event={event} onEnter={setSelectedEvent} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence>{selectedEvent && <EventLevelModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}</AnimatePresence>
    </PageSciFiLayout>
  );
};

export default Events;
