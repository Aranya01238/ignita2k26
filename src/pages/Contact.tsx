import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ParticleField from "@/components/ParticleField";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import ScrollProgress from "@/components/ScrollProgress";

const mapHref =
  "https://www.google.com/maps/place/University+of+Engineering+%26+Management,+Kolkata+(UEM)/@22.5599202,88.4899014,17z/data=!3m1!4b1!4m6!3m5!1s0x3a020b267a3cdc13:0xb3b21d652126f40!8m2!3d22.5599202!4d88.4899014!16s%2Fg%2F11c4pg5gwf?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D";
const mapEmbedSrc =
  "https://www.google.com/maps?q=University+of+Engineering+%26+Management,+Kolkata+(UEM)&z=17&output=embed";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background scanline-overlay overflow-x-hidden">
        <ParticleField />
        <AnimatedBlobs />
        <ScrollProgress />
        <Navbar />

        <main className="flex-1">
          <section className="relative pt-28 pb-12 overflow-hidden w-full">
            {/* Radial purple ambient glow behind title */}
            <div
              className="absolute inset-x-0 top-0 h-[500px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 60% 40%, rgba(139,92,246,0.18) 0%, transparent 70%)",
              }}
            />

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-[11px] md:text-xs text-primary uppercase tracking-[0.45em] mb-5 font-semibold font-mono flex items-center justify-center gap-2"
            >
              <Mail size={14} className="text-primary" /> COMMUNICATION LINK
            </motion.p>

            {/* Main Title — full-width, centered, perspective tilt */}
            <div className="relative w-full" style={{ perspective: "800px" }}>
              <motion.div
                initial={{ opacity: 0, rotateX: 12, y: 30 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Shadow/depth clone */}
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                  style={{ transform: "translateZ(-40px) translateY(12px)" }}
                >
                  <span
                    className="font-heading font-black uppercase leading-none tracking-tight text-center w-full"
                    style={{
                      fontSize: "clamp(2.5rem, 10vw, 5.5rem)",
                      color: "rgba(88,28,235,0.25)",
                      filter: "blur(8px)",
                    }}
                  >
                    GET IN TOUCH
                  </span>
                </div>

                {/* Actual title */}
                <h1
                  className="font-heading font-black uppercase leading-none tracking-tight w-full text-center relative"
                  style={{ fontSize: "clamp(2.5rem, 10vw, 5.5rem)", transformStyle: "preserve-3d" }}
                >
                  {/* GET IN — dimmer, lighter weight */}
                  <span
                    className="inline-block mr-[0.15em]"
                    style={{
                      color: "rgba(255,255,255,0.28)",
                      fontWeight: 300,
                      textShadow: "0 2px 20px rgba(139,92,246,0.1)",
                    }}
                  >
                    GET IN
                  </span>

                  {/* TOUCH — full white with 3D purple bloom */}
                  <span
                    className="inline-block relative"
                    style={{
                      color: "#ffffff",
                      textShadow: [
                        "0 0 60px rgba(139,92,246,0.9)",
                        "0 0 120px rgba(139,92,246,0.5)",
                        "0 2px 0 rgba(88,28,235,0.6)",
                        "0 4px 0 rgba(68,14,180,0.4)",
                        "0 8px 20px rgba(0,0,0,0.6)",
                      ].join(", "),
                    }}
                  >
                    TOUCH
                  </span>
                </h1>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-10 text-muted-foreground text-base md:text-lg font-medium text-center relative z-10 px-4"
            >
              We're here to help — for general enquiries, partnerships, or media requests, drop us a message.
            </motion.p>
          </section>

          <section className="section-padding">
            <div className="container mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-5">
                  <div className="rounded-2xl border border-white/8 bg-card/45 p-5 md:p-6 transition-all duration-200 hover:border-primary/20 hover:bg-card/55">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                        <Mail size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Email</div>
                        <a
                          href="mailto:ignitia@uem.edu.in"
                          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                        >
                          ignitia@uem.edu.in
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-card/45 p-5 md:p-6 transition-all duration-200 hover:border-primary/20 hover:bg-card/55">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105">
                        <Phone size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Phone</div>
                        <a
                          href="tel:+919876543210"
                          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                        >
                          +91 98765 43210
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-card/45 p-5 md:p-6 transition-all duration-200 hover:border-primary/20 hover:bg-card/55">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Venue</div>
                        <a
                          href={mapHref}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                        >
                          UEM Kolkata, New Town, Kolkata 700160
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="group relative mt-4 hidden overflow-hidden rounded-2xl border border-white/8 bg-card/45 h-64 transition-all duration-200 hover:border-primary/25 hover:shadow-[0_20px_60px_rgba(255,83,48,0.12)] lg:block">
                    <iframe
                      src={mapEmbedSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                      loading="lazy"
                      title="UEM Kolkata Location"
                    />
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open UEM Kolkata map"
                      className="absolute right-3 top-3 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur-md transition-colors hover:bg-primary hover:text-white"
                    >
                      Open Maps
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-card/45 p-6 md:p-8 lg:min-h-[100%]">
                  <h2 className="font-heading text-xl font-semibold mb-5">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Full name</label>
                      <input className="w-full mt-1 px-4 py-3 rounded-xl bg-background/40 border border-white/8 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Email</label>
                      <input type="email" className="w-full mt-1 px-4 py-3 rounded-xl bg-background/40 border border-white/8 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Message</label>
                      <textarea rows={6} className="w-full mt-1 px-4 py-3 rounded-xl bg-background/40 border border-white/8 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                    </div>
                    <button type="submit" className="glow-button inline-flex items-center gap-2 px-6 py-3">
                      <Send size={14} /> {submitted ? "Sent" : "Send Message"}
                    </button>
                  </form>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/45 h-64 transition-all duration-200 hover:border-primary/25 hover:shadow-[0_20px_60px_rgba(255,83,48,0.12)] lg:hidden">
                    <iframe
                      src={mapEmbedSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                      loading="lazy"
                      title="UEM Kolkata Location"
                    />
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open UEM Kolkata map"
                    className="absolute right-3 top-3 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-[11px] font-semibold text-primary backdrop-blur-md transition-colors hover:bg-primary hover:text-white"
                  >
                    Open Maps
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
