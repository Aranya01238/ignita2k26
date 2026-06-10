import MouseSpotlight from "@/components/MouseSpotlight";
import ParticleField from "@/components/ParticleField";
import ShootingStars from "@/components/ShootingStars";
import CursorTrail from "@/components/CursorTrail";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import { useIsMobile } from "@/hooks/use-mobile";

const HomeEffects = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <>
      <MouseSpotlight />
      <CursorTrail />
      <ShootingStars />
    </>
  );
};

export default HomeEffects;
