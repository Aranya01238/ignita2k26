import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Lightbulb,
  Code,
  Brain,
  Gamepad2,
  HelpCircle,
  Music,
  Cpu,
  ArrowRight,
  Trophy,
  Users,
  Clock,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParticleField from "@/components/ParticleField";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ScrollProgress from "@/components/ScrollProgress";

const events = [
  {
    icon: Cpu,
    title: "Hackathon",
    prize: "₹35,000",
    teamSize: "2-4",
    duration: "10 Hours - Day 1",
    color: "from-primary to-neon-cyan",
    description: "Build innovative software from scratch.",
    overview: "A thrilling 10-hour hackathon where teams must design and develop a functional prototype.",
    rules: ["Teams of 2-4 members", "Any tech stack allowed", "Must be built during the event", "Assets can be pre-made"],
    criteria: ["Innovation", "Technical Execution", "Impact", "Presentation Quality"],
  },
  {
    icon: Gamepad2,
    title: "Gaming Tournament",
    prize: "₹30,000",
    teamSize: "1-5",
    duration: "Day 2",
    color: "from-neon-cyan to-secondary",
    description: "Compete in intense esports battles.",
    overview: "The ultimate gaming showdown featuring popular esports titles.",
    rules: ["Own devices for mobile games", "PCs provided for PC games", "Standard tournament bracket", "Fair play policy enforced"],
    criteria: ["Tournament Placement", "Sportsmanship"],
  },
  {
    icon: HelpCircle,
    title: "Guess Who",
    prize: "₹10,000",
    teamSize: "2-4",
    duration: "Day 2",
    color: "from-secondary to-neon-pink",
    description: "A mystery event full of surprises.",
    overview: "A mysterious event that blends puzzles, riddles, and unexpected challenges.",
    rules: ["Teams of 2-4", "Clues are provided at each stage", "No internet usage allowed", "Time-based scoring"],
    criteria: ["Problem Solving", "Teamwork", "Creative Thinking"],
  },
  {
    icon: Code,
    title: "Blind Coding",
    prize: "₹15,000",
    teamSize: "1",
    duration: "Day 2",
    color: "from-neon-pink to-primary",
    description: "Code without screen visibility.",
    overview: "Test your coding muscle memory and logical flow by programming with the monitor turned off.",
    rules: ["Individual participation", "Standard IDE provided", "Monitor is turned off", "Syntax must be exact"],
    criteria: ["Correctness", "Syntax Accuracy", "Logic", "Speed"],
  },
  {
    icon: Users,
    title: "Debates",
    prize: "₹15,000",
    teamSize: "2",
    duration: "Day 1",
    color: "from-primary to-secondary",
    description: "Argue for or against trending tech topics.",
    overview: "A passionate battle of words focusing on modern technology ethics and progress.",
    rules: ["Teams of 2", "Topics assigned 15 mins prior", "Time strictly enforced", "Respectful conduct required"],
    criteria: ["Argument Quality", "Rebuttal", "Confidence", "Relevance"],
  },
  {
    icon: Brain,
    title: "Quiz",
    prize: "₹15,000",
    teamSize: "2-3",
    duration: "Day 1",
    color: "from-neon-cyan to-neon-pink",
    description: "Test your knowledge across tech, science, pop culture.",
    overview: "A multi-round quiz spanning technology, science, current affairs, and general knowledge.",
    rules: ["Teams of 2-3 members", "Multiple elimination rounds", "No electronic devices", "Time-limited answers"],
    criteria: ["Accuracy", "Speed", "Team Coordination"],
  },
];

const EventCard = ({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof events)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [10, 0]), {
    stiffness: 80,
    damping: 20,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, rotateX, opacity, transformPerspective: 1000 }}
      className="glass-card bg-card/75 backdrop-blur-2xl overflow-hidden shimmer-card animated-border-glow"
    >
      <motion.div
        className="p-6 cursor-pointer"
        onClick={onToggle}
        whileHover={{ backgroundColor: "hsla(240,15%,10%,0.3)" }}
      >
        <div className="flex items-start gap-4">
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shrink-0`}
            whileHover={{ scale: 1.15, rotate: 5 }}
          >
            <event.icon size={28} className="text-foreground" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-xl font-bold text-foreground">
                {event.title}
              </h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-muted-foreground" />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1 text-xs text-primary">
                <Trophy size={12} /> {event.prize}
              </span>
              <span className="flex items-center gap-1 text-xs text-neon-cyan">
                <Users size={12} /> {event.teamSize}
              </span>
              <span className="flex items-center gap-1 text-xs text-secondary">
                <Clock size={12} /> {event.duration}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-glass-border pt-4 space-y-4">
              <div>
                <h4 className="font-heading text-sm font-semibold text-primary mb-2">
                  Overview
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {event.overview}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-heading text-sm font-semibold text-primary mb-2">
                    Rules
                  </h4>
                  <ul className="space-y-1">
                    {event.rules.map((rule, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">▸</span> {rule}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-primary mb-2">
                    Judging Criteria
                  </h4>
                  <ul className="space-y-1">
                    {event.criteria.map((c, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-neon-cyan mt-1">◆</span> {c}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="glow-button inline-flex items-center gap-2 text-sm !px-6 !py-2"
              >
                Register Now <ArrowRight size={14} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Events = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background scanline-overlay">
        <ParticleField />
        <AnimatedBlobs />
        <ScrollProgress />
        <Navbar />

        <section className="relative min-h-[60vh] flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-primary uppercase tracking-[0.3em] mb-4"
            >
              Compete & Create
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="font-heading text-5xl md:text-7xl font-bold mb-4"
            >
              All <span className="gradient-text glitch-text">Events</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Seven thrilling competitions across tech, gaming, creativity, and
              culture.
            </motion.p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto max-w-4xl space-y-6">
            {events.map((event, i) => (
              <EventCard
                key={event.title}
                event={event}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
              />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Events;
