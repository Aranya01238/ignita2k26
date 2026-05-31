import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Highlights from "@/components/Highlights";
import FeaturedEvents from "@/components/FeaturedEvents";
import WhyAttend from "@/components/WhyAttend";
import Sponsors from "@/components/Sponsors";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ParallaxSection from "@/components/ParallaxSection";
import PageTransition from "@/components/PageTransition";
import { useIsMobile } from "@/hooks/use-mobile";

const HomeEffects = lazy(() => import("@/components/HomeEffects"));
const mapHref =
  "https://www.google.com/maps/place/University+of+Engineering+%26+Management,+Kolkata+(UEM)/@22.5599202,88.4899014,17z/data=!3m1!4b1!4m6!3m5!1s0x3a020b267a3cdc13:0xb3b21d652126f40!8m2!3d22.5599202!4d88.4899014!16s%2Fg%2F11c4pg5gwf?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D";
const mapEmbedSrc =
  "https://www.google.com/maps?q=University+of+Engineering+%26+Management,+Kolkata+(UEM)&z=17&output=embed";

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onLoaderComplete = () => setIsLoaded(true);
    window.addEventListener("ignitia:loader-complete", onLoaderComplete);

    const fallbackId = window.setTimeout(() => {
      setIsLoaded(true);
    }, 2600);

    return () => {
      window.removeEventListener("ignitia:loader-complete", onLoaderComplete);
      window.clearTimeout(fallbackId);
    };
  }, []);

  return (
    <>
      <PageTransition>
        <div className="min-h-screen flex flex-col bg-background scanline-overlay">
          {/* Fixed layers */}
          <Suspense fallback={null}>
            {isLoaded && !isMobile && <HomeEffects />}
          </Suspense>
          <ScrollProgress />

          {/* Page content */}
          <Navbar />

          <main className="flex-1">
            <HeroSection />
            <Highlights centerOnMobile />
            <WhyAttend />
            <FAQSection />
            <ParallaxSection offset={isMobile ? 10 : 25}>
              <Sponsors centerOnMobile />
            </ParallaxSection>
            <CTABanner />

            {/* Embedded map copied from Contact — displayed below CTA and above footer */}
            <section className="section-padding">
              <div className="container mx-auto max-w-5xl">
                <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/45 h-72 transition-all duration-200 hover:border-primary/25 hover:shadow-[0_20px_60px_rgba(255,83,48,0.12)]">
                  <iframe
                    src={mapEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: "none" }}
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
            </section>
          </main>

          <Footer />
        </div>
      </PageTransition>

      {/* Sticky bottom announcement bar — outside PageTransition so it's always on top */}
      <AnnouncementBar />
    </>
  );
};

export default Index;
