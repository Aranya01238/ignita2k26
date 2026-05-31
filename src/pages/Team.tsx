import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import PageSciFiLayout from "@/components/layout/PageSciFiLayout";
import { useScrollReveal, useTypewriter } from "@/hooks/useScrollReveal";
import { EnergySymbol } from "@/components/FloatingTechElements";
import { HolographicDossierCard } from "@/components/HolographicDossierCard";

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



const Team = () => {
  const { ref: introRef, visible: introVisible } = useScrollReveal(0.25);
  const eyebrow = useTypewriter("> ORCHESTRATION_CORE.exe — LOADING PROFILES", introVisible, 28);

  return (
    <PageSciFiLayout variant="team">
      <section className="section-redesign relative pt-24 pb-8 md:pb-12">
        <div className="section-redesign-bg section-noise">
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
                  <HolographicDossierCard key={member.name + i} member={member} index={i} />
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
