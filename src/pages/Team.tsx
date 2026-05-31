import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import PageSciFiLayout from "@/components/layout/PageSciFiLayout";
import CelestialStarfield from "@/components/background/CelestialStarfield";
import { useScrollReveal, useTypewriter } from "@/hooks/useScrollReveal";
import { EnergySymbol } from "@/components/FloatingTechElements";

const teamSections = [
  {
    title: "Convenor",
    role_color: "from-red-500 to-orange-500",
    members: [
      {
        name: "Priyanshu",
        role: "Convenor",
        initials: "P",
        linkedin: "#",
        instagram: "#",
        class: "LEGENDARY",
      },
    ],
  },
  {
    title: "Event Heads",
    role_color: "from-red-600 to-red-400",
    members: [
      {
        name: "Aranya Rath",
        role: "Event Head",
        initials: "AR",
        linkedin: "#",
        instagram: "#",
        class: "EPIC",
      },
      {
        name: "Soumalika Chakraborty",
        role: "Event Head",
        initials: "SC",
        linkedin: "#",
        instagram: "#",
        class: "EPIC",
      },
    ],
  },
  {
    title: "Core Team",
    role_color: "from-orange-600 to-red-500",
    members: [
      {
        name: "Anamika",
        role: "Core Team",
        initials: "A",
        linkedin: "#",
        instagram: "#",
        class: "RARE",
      },
      {
        name: "Subhamita",
        role: "Core Team",
        initials: "S",
        linkedin: "#",
        instagram: "#",
        class: "RARE",
      },
      {
        name: "Pratistha",
        role: "Core Team",
        initials: "P",
        linkedin: "#",
        instagram: "#",
        class: "RARE",
      },
      {
        name: "Salmoli",
        role: "Core Team",
        initials: "S",
        linkedin: "#",
        instagram: "#",
        class: "RARE",
      },
      {
        name: "Tanisha",
        role: "Core Team",
        initials: "T",
        linkedin: "#",
        instagram: "#",
        class: "RARE",
      },
    ],
  },
  {
    title: "Domain Lead",
    role_color: "from-red-700 to-red-500",
    members: [
      {
        name: "To Be Added",
        role: "Domain Lead",
        initials: "?",
        linkedin: "#",
        instagram: "#",
        class: "TBA",
      },
    ],
  },
  {
    title: "Coordinator",
    role_color: "from-red-800 to-orange-600",
    members: [
      {
        name: "To Be Added",
        role: "Coordinator",
        initials: "?",
        linkedin: "#",
        instagram: "#",
        class: "TBA",
      },
    ],
  },
];

type Member = {
  name: string;
  role: string;
  initials: string;
  linkedin: string;
  instagram: string;
  class: string;
};

const classAccentMap: Record<string, "cyan" | "red" | "blue"> = {
  LEGENDARY: "cyan",
  EPIC: "red",
  RARE: "blue",
  TBA: "cyan",
};

const MemberCard = ({
  member,
  index,
}: {
  member: Member;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.9, 1]), {
    stiffness: 120,
    damping: 20,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      whileHover={{ y: -8 }}
      className="char-select-card group relative w-full max-w-[280px] cursor-pointer"
    >
      <CornerBracket className="absolute top-0 left-0 opacity-35 group-hover:opacity-80 transition-opacity duration-300" />
      <CornerBracket
        flip
        className="absolute bottom-0 right-0 opacity-35 group-hover:opacity-80 transition-opacity duration-300"
      />

      {/* Class badge top-right */}
      <span
        className={`absolute top-2 right-2 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${classColors[member.class] || classColors.RARE}`}
      >
        {member.class}
      </span>

      {/* Hover selection overlay */}
      <div className="selection-indicator rounded-xl" />

      <div className="relative z-10 flex flex-col items-center p-5 text-center">
        <div className="relative mb-4 h-20 w-20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/25 via-secondary/15 to-black flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-primary/35">
            <span className="font-heading text-xl font-bold text-red-300">
              {member.initials}
            </span>
          </div>
          <div className="absolute inset-0 rounded-full border border-primary/0 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(24_100%_58%/0.22)]" />
          <div className="absolute -bottom-1 -right-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <EnergySymbol size={16} />
          </div>
        </div>
      </div>

        <h3 className="font-heading text-base font-semibold text-foreground">
          {member.name}
        </h3>
        <p className="mt-1 mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {member.role}
        </p>

        <div className="flex items-center justify-center gap-3">
          <motion.a
            href={member.linkedin}
            whileHover={{ scale: 1.12, y: -1 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded border border-[var(--card-accent)]/30 flex items-center justify-center text-[var(--card-accent)] hover:bg-[var(--card-accent)] hover:text-black transition-all"
          >
            <Linkedin size={14} />
          </a>
          <a
            href={member.instagram}
            whileHover={{ scale: 1.12, y: -1 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded border border-[var(--card-accent)]/30 flex items-center justify-center text-[var(--card-accent)] hover:bg-[var(--card-accent)] hover:text-black transition-all"
          >
            <Instagram size={14} />
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-4 mb-3 h-0.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
          initial={{ width: "0%" }}
          whileInView={{
            width:
              member.class === "LEGENDARY"
                ? "100%"
                : member.class === "EPIC"
                  ? "82%"
                  : member.class === "RARE"
                    ? "62%"
                    : "34%",
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const Team = () => {
  const { ref: introRef, visible: introVisible } = useScrollReveal(0.25);
  const eyebrow = useTypewriter("> ORCHESTRATION_CORE.exe — LOADING PROFILES", introVisible, 28);

      <section className="relative flex items-center justify-center overflow-hidden pt-20 pb-10 md:pt-24 md:pb-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, hsl(24 100% 58% / 0.10) 0%, hsl(0 95% 60% / 0.06) 18%, transparent 40%)",
            filter: "blur(45px)",
            zIndex: 0,
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-3 text-xs uppercase tracking-[0.32em] text-primary md:text-sm"
          >
            The People Behind IGNITIA '26
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5, ease: "easeOut" }}
            className="font-heading text-4xl font-bold md:text-6xl lg:text-7xl"
          >
            Our <span className="gradient-text">Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            A focused group of students and coordinators working together to shape a
            polished, high-energy experience across every track.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-6xl space-y-16 md:space-y-20">
          {teamSections.map((section) => (
            <section key={section.title} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-end gap-4"
              >
                <div className="min-w-[180px]">
                  <p className="mb-1 text-xs uppercase tracking-[0.28em] text-primary md:text-sm">
                    {section.title}
                  </p>
                  <div className={`h-[2px] w-20 bg-gradient-to-r ${section.role_color}`} />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              </motion.div>

              <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.members.map((member, i) => (
                  <MemberCard key={member.name + i} member={member} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </PageSciFiLayout>
  );
};

export default Team;
