import React, { useState, useEffect, useMemo } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Linkedin, Instagram, Scan, ShieldCheck, Fingerprint } from "lucide-react";

export type Member = {
  name: string;
  role: string;
  initials: string;
  linkedin: string;
  instagram: string;
  class: string;
};

const classConfig: Record<string, { color: string; border: string; glow: string; text: string }> = {
  LEGENDARY: { 
    color: "#FFD700", 
    border: "bg-[conic-gradient(from_0deg,transparent_0_300deg,#FFD700_360deg)]",
    glow: "bg-yellow-500/40",
    text: "text-yellow-400"
  },
  EPIC: { 
    color: "#9D00FF", 
    border: "bg-[conic-gradient(from_0deg,transparent_0_300deg,#9D00FF_360deg)]",
    glow: "bg-purple-600/40",
    text: "text-purple-400"
  },
  RARE: { 
    color: "#0088FF", 
    border: "bg-[conic-gradient(from_0deg,transparent_0_300deg,#0088FF_360deg)]",
    glow: "bg-blue-600/40",
    text: "text-blue-400"
  },
  TBA: { 
    color: "#6B7280", 
    border: "bg-[conic-gradient(from_0deg,transparent_0_300deg,#6B7280_360deg)]",
    glow: "bg-gray-600/40",
    text: "text-gray-400"
  },
};

const DataStreamBackground = ({ active, color }: { active: boolean, color: string }) => {
  // Generate random binary strings
  const streams = useMemo(() => Array.from({ length: 15 }, () => {
    let str = "";
    for(let i=0; i<40; i++) str += Math.random() > 0.5 ? "1" : "0";
    return str;
  }), []);

  return (
    <div className={`absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-700 pointer-events-none z-0 ${active ? 'opacity-30' : ''}`} style={{ transform: "translateZ(5px)" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-10" />
      <div className="flex justify-between w-full h-[200%] absolute top-0 left-0 animate-[scroll-up_20s_linear_infinite]">
        {streams.map((stream, i) => (
          <div key={i} className="font-mono text-[8px] leading-[10px] break-all w-2 opacity-50" style={{ color }}>
            {stream}
          </div>
        ))}
      </div>
    </div>
  );
};

export const HolographicDossierCard = ({ member, index }: { member: Member; index: number }) => {
  const config = classConfig[member.class] || classConfig.TBA;
  const [isHovered, setIsHovered] = useState(false);
  const [scanStatus, setScanStatus] = useState(0); // 0: idle, 1: scanning, 2: verified

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  // Extremely dramatic tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    if (isHovered) {
      setScanStatus(1);
      timeout1 = setTimeout(() => {
        setScanStatus(2);
      }, 800); // Deliberate scanning time
    } else {
      setScanStatus(0);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Generate fake agent ID based on name length and index
  const agentId = `AG-${(member.name.length * 13 + index * 7).toString().padStart(4, '0')}`;
  const clearance = member.class === "LEGENDARY" ? "OMEGA" : member.class === "EPIC" ? "SIGMA" : "DELTA";

  return (
    <motion.article 
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 80 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative transform-gpu hover:z-50 w-full h-full cursor-crosshair"
    >
      {/* Dynamic Aura Frame */}
      <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden blur-[2px]`}>
        <div className={`absolute inset-[-150%] animate-[spin_3s_linear_infinite] ${config.border}`} />
      </div>
      
      {/* Deep Background Glow */}
      <div className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 blur-3xl ${config.glow}`} style={{ transform: "translateZ(-40px)" }} />
      
      <div className="relative h-full w-full bg-[#03060a]/90 border border-white/5 rounded-xl shadow-2xl backdrop-blur-xl flex flex-col transition-colors duration-500 overflow-hidden" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        
        {/* Animated Data Stream Background Layer */}
        <DataStreamBackground active={isHovered} color={config.color} />

        {/* HUD Overlay layer */}
        <div className="absolute inset-0 pointer-events-none z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(30px)" }}>
           {/* Corner Brackets */}
           <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${config.text} transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-150'}`} />
           <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${config.text} transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-150'}`} />
           <div className={`absolute bottom-[40%] left-2 w-4 h-4 border-b-2 border-l-2 ${config.text} transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-150'}`} />
           <div className={`absolute bottom-[40%] right-2 w-4 h-4 border-b-2 border-r-2 ${config.text} transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-150'}`} />
        </div>

        {/* Biometric Image Scanner */}
        <div className="relative overflow-hidden h-[240px] w-full" 
             style={{ 
               transform: "translateZ(10px)",
               WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
               maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
             }}>
          
          <img 
            src="/team-avatar-placeholder.png" 
            alt={member.name} 
            loading="lazy" 
            className={`w-full h-full object-cover mix-blend-lighten opacity-60 transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Glitch / Chromatic Aberration overlay */}
          <div className={`absolute inset-0 bg-[url('/team-avatar-placeholder.png')] bg-cover opacity-0 mix-blend-screen transition-opacity ${isHovered ? 'animate-glitch opacity-50' : ''}`} style={{ filter: 'hue-rotate(90deg) translate(-2px, 2px)' }} />
          <div className={`absolute inset-0 bg-[url('/team-avatar-placeholder.png')] bg-cover opacity-0 mix-blend-screen transition-opacity ${isHovered ? 'animate-glitch opacity-50' : ''}`} style={{ filter: 'hue-rotate(-90deg) translate(2px, -2px)', animationDelay: '0.1s' }} />

          <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-500" />
          
          <div className={`absolute inset-0 mix-blend-color opacity-30 group-hover:opacity-60 transition-opacity duration-500`} style={{ backgroundColor: config.color }} />
        </div>
      
        {/* Classified Data Panel (Typography & Names) */}
        <div className="p-5 pb-2 relative z-20 flex-1 flex flex-col justify-end" style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
          
          <div className="mb-2 font-mono text-[10px] tracking-[0.2em] flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-gray-400">ID: {agentId}</span>
            <span className={config.text}>CLR: {clearance}</span>
          </div>

          <div className="transform transition-transform duration-500 group-hover:translate-y-[-2px]">
            <h3 className="text-2xl font-bold tracking-widest text-white uppercase group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300">
              {member.name}
            </h3>
            
            <p className={`font-mono text-xs mt-1 uppercase tracking-[0.3em] font-semibold flex items-center gap-2 ${config.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.glow.replace('/40', '')} animate-pulse shadow-[0_0_8px_currentColor]`} />
              {member.role}
            </p>
          </div>
        </div>

        {/* Floating Actions & Biometric Status */}
        <div className="p-5 pt-3 relative z-30 flex justify-between items-end bg-black/40 backdrop-blur-sm border-t border-white/5" style={{ transform: "translateZ(70px)" }}>
          
          <div className="flex flex-col gap-1 h-8 justify-end">
            {scanStatus === 0 && (
              <span className="font-mono text-[9px] text-gray-500 tracking-widest flex items-center gap-1"><Scan size={10}/> STANDBY</span>
            )}
            {scanStatus === 1 && (
              <span className={`font-mono text-[9px] tracking-widest flex items-center gap-1 animate-pulse ${config.text}`}>
                <Fingerprint size={10} className="animate-spin-slow"/> SCANNING...
              </span>
            )}
            {scanStatus === 2 && (
              <span className="font-mono text-[9px] text-green-400 tracking-widest flex items-center gap-1">
                <ShieldCheck size={10}/> VERIFIED ✓
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a href={member.linkedin} onClick={(e) => e.stopPropagation()} className={`group/btn relative flex items-center justify-center h-8 w-8 hover:w-24 rounded border border-white/10 text-gray-400 hover:${config.text} hover:border-current hover:bg-current/10 transition-all duration-300 overflow-hidden bg-black shadow-lg`}>
              <Linkedin size={12} className="absolute left-2.5 group-hover/btn:left-2.5 transition-all duration-300" />
              <span className="absolute left-7 opacity-0 group-hover/btn:opacity-100 font-mono text-[9px] font-bold tracking-wider transition-opacity duration-300 delay-100">UPLINK</span>
            </a>
            <a href={member.instagram} onClick={(e) => e.stopPropagation()} className={`group/btn relative flex items-center justify-center h-8 w-8 hover:w-24 rounded border border-white/10 text-gray-400 hover:${config.text} hover:border-current hover:bg-current/10 transition-all duration-300 overflow-hidden bg-black shadow-lg`}>
              <Instagram size={12} className="absolute left-2.5 group-hover/btn:left-2.5 transition-all duration-300" />
              <span className="absolute left-7 opacity-0 group-hover/btn:opacity-100 font-mono text-[9px] font-bold tracking-wider transition-opacity duration-300 delay-100">COMMS</span>
            </a>
          </div>
        </div>

        {/* Highest Z-Index Holographic Badge */}
        <div style={{ transform: "translateZ(100px)" }} className="absolute top-4 right-4 z-50 pointer-events-none">
          <div className={`font-mono text-[10px] font-bold px-2 py-1 bg-black/80 backdrop-blur-md border border-current ${config.text} shadow-[0_0_15px_currentColor] transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100 opacity-80'}`}>
            [{member.class}]
          </div>
        </div>

      </div>
    </motion.article>
  );
};
