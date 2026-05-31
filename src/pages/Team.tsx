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
  const accent = classAccentMap[member.class] || "cyan";

  return (
    <motion.article 
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bento-level-card group" 
      data-accent={accent}
    >
      <span className="bento-lvl-badge">CLASS_{member.class}</span>
      <div className="bento-media">
        <img 
          src="/team-avatar-placeholder.png" 
          alt={member.name} 
          loading="lazy" 
          className="mix-blend-screen opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="bento-media-gradient" />
        <div className="bento-media-scan" />
        
        {/* Color tint overlay based on class inside media */}
        <div className={`absolute inset-0 mix-blend-overlay opacity-60 ${
          member.class === "LEGENDARY" ? "bg-cyan-500" : 
          member.class === "EPIC" ? "bg-red-500" : 
          member.class === "RARE" ? "bg-blue-500" : "bg-gray-500"
        }`} />
      </div>
      
      <div className="bento-card-head mb-4">
        <div>
          <h3 className="bento-card-title glitch-text" data-text={member.name}>{member.name}</h3>
          <p className="bento-card-prompt uppercase tracking-widest">{member.role}</p>
        </div>
      </div>

      <div className="bento-prize-row !border-none !pb-0 !mb-0">
        <span className="bento-prize-label">CONNECT_UPLINK</span>
        <div className="flex items-center gap-3 relative z-10">
          <a
            href={member.linkedin}
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded border border-[var(--card-accent)]/30 flex items-center justify-center text-[var(--card-accent)] hover:bg-[var(--card-accent)] hover:text-black transition-all"
          >
            <Linkedin size={14} />
          </a>
          <a
            href={member.instagram}
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded border border-[var(--card-accent)]/30 flex items-center justify-center text-[var(--card-accent)] hover:bg-[var(--card-accent)] hover:text-black transition-all"
          >
            <Instagram size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Team = () => {
  const { ref: introRef, visible: introVisible } = useScrollReveal(0.25);
  const eyebrow = useTypewriter("> ORCHESTRATION_CORE.exe — LOADING PROFILES", introVisible, 28);

  return (
    <PageSciFiLayout variant="team">
      <section className="section-redesign relative pt-24 pb-8 md:pb-12">
        <div className="section-redesign-bg section-noise">
          <div className="events-celestial-bg">
            <CelestialStarfield density={1.2} />
          </div>
          <span className="section-watermark">ORCHESTRATION_CORE</span>
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
              <span className="bracket-l">[</span> THE SQUAD <span className="bracket-r">]</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={introVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-xl mx-auto font-hud text-[10px] tracking-widest uppercase"
          >
            The masterminds behind IGNITIA'26
          </motion.p>
        </div>
      </section>

      <section className="section-redesign pb-24 px-4 relative z-10">
        <div className="section-redesign-bg">
          <CelestialStarfield density={0.8} />
        </div>
        <div className="container mx-auto space-y-20 relative z-10 max-w-7xl">
          {teamSections.map((section) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8 flex items-center gap-4"
              >
                <div>
                  <p className="font-hud text-[10px] text-[var(--gone-cyan)] uppercase tracking-[0.2em] mb-1">
                    [ SECTOR: {section.title.toUpperCase()} ]
                  </p>
                  <div className={`h-[2px] w-16 bg-gradient-to-r ${section.role_color}`} />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--gone-cyan)]/20 to-transparent" />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {section.members.map((member, i) => (
                  <MemberCard key={member.name + i} member={member} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageSciFiLayout>
  );
};

export default Team;
