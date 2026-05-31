import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParticleField from "@/components/ParticleField";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ScrollProgress from "@/components/ScrollProgress";

const schedule = {
  "Day 1 — Aug 1": [
    {
      time: "09:00 AM",
      title: "Opening Ceremony",
      venue: "Main Auditorium",
      color: "bg-primary",
    },
    {
      time: "10:00 AM",
      title: "Ideathon Kickoff",
      venue: "Hall A",
      color: "bg-neon-cyan",
    },
    {
      time: "10:30 AM",
      title: "Coding Quest — Round 1",
      venue: "Lab Complex",
      color: "bg-secondary",
    },
    {
      time: "12:00 PM",
      title: "Quiz — Prelims",
      venue: "Hall B",
      color: "bg-neon-pink",
    },
    {
      time: "02:00 PM",
      title: "Gaming Arena Opens",
      venue: "Gaming Zone",
      color: "bg-primary",
    },
    {
      time: "03:00 PM",
      title: "Game Dev Hackathon Starts",
      venue: "Innovation Lab",
      color: "bg-neon-cyan",
    },
    {
      time: "05:00 PM",
      title: "Cultural Performances",
      venue: "Open Stage",
      color: "bg-secondary",
    },
    {
      time: "07:00 PM",
      title: "Day 1 Wrap-up",
      venue: "Main Auditorium",
      color: "bg-neon-pink",
    },
  ],
  "Day 2 — Aug 2": [
    {
      time: "09:00 AM",
      title: "Coding Quest — Finals",
      venue: "Lab Complex",
      color: "bg-primary",
    },
    {
      time: "10:00 AM",
      title: "Ideathon Presentations",
      venue: "Hall A",
      color: "bg-neon-cyan",
    },
    {
      time: "11:00 AM",
      title: "Quiz — Finals",
      venue: "Hall B",
      color: "bg-secondary",
    },
    {
      time: "12:00 PM",
      title: "Guess Who",
      venue: "Mystery Zone",
      color: "bg-neon-pink",
    },
    {
      time: "02:00 PM",
      title: "Gaming Finals",
      venue: "Gaming Zone",
      color: "bg-primary",
    },
    {
      time: "03:00 PM",
      title: "Game Dev Submissions",
      venue: "Innovation Lab",
      color: "bg-neon-cyan",
    },
    {
      time: "04:00 PM",
      title: "Cultural Finale",
      venue: "Open Stage",
      color: "bg-secondary",
    },
    {
      time: "06:00 PM",
      title: "Closing Ceremony & Prizes",
      venue: "Main Auditorium",
      color: "bg-neon-pink",
    },
  ],
};

const TimelineItem = ({
  item,
  index,
  isLeft,
}: {
  item: { time: string; title: string; venue: string; color: string };
  index: number;
  isLeft: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [isLeft ? -80 : 80, 0]),
    { stiffness: 80, damping: 20 },
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.85, 1]), {
    stiffness: 100,
    damping: 20,
  });

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, scale }}
      className={`flex items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <motion.div
          whileHover={{ scale: 1.04, y: -4 }}
          className="glass-card p-4 md:p-5 shimmer-card animated-border-glow cursor-pointer"
        >
          <div
            className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}
          >
            <Clock size={14} className="text-primary" />
            <span className="text-xs text-primary font-semibold">
              {item.time}
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            {item.title}
          </h3>
          <div
            className={`flex items-center gap-1 text-xs text-muted-foreground ${isLeft ? "md:justify-end" : ""}`}
          >
            <MapPin size={12} /> {item.venue}
          </div>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, type: "spring" }}
          className={`w-4 h-4 rounded-full ${item.color} shadow-lg shadow-primary/30 z-10`}
        />
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const Schedule = () => {
  const days = Object.keys(schedule);
  const [activeDay, setActiveDay] = useState(days[0]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 40, damping: 15 },
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background scanline-overlay">
        <ParticleField />
        <AnimatedBlobs />
        <ScrollProgress />
        <Navbar />

        <section className="relative min-h-[50vh] flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-primary uppercase tracking-[0.3em] mb-4"
            >
              Plan Your Day
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading text-5xl md:text-7xl font-bold mb-6"
            >
              Event <span className="gradient-text">Schedule</span>
            </motion.h1>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto max-w-4xl">
            {/* Day tabs */}
            <div className="flex justify-center gap-4 mb-12">
              {days.map((day) => (
                <motion.button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg font-heading font-semibold text-sm transition-all ${
                    activeDay === day
                      ? "glow-button"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calendar size={14} className="inline mr-2" />
                  {day}
                </motion.button>
              ))}
            </div>

            {/* Timeline */}
            <div ref={timelineRef} className="relative">
              {/* Animated center line */}
              <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-[2px] bg-muted">
                <motion.div
                  className="w-full bg-gradient-to-b from-primary via-neon-cyan to-secondary"
                  style={{ height: lineHeight }}
                />
              </div>

              <div className="space-y-6 md:space-y-8">
                {schedule[activeDay as keyof typeof schedule].map((item, i) => (
                  <TimelineItem
                    key={item.title}
                    item={item}
                    index={i}
                    isLeft={i % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Schedule;
