import SciFiScene3D, { type SciFiVariant } from "./SciFiScene3D";
import SciFiParticleNetwork from "./SciFiParticleNetwork";

type Props = { variant?: SciFiVariant };

const SciFiUniverseBackground = ({ variant = "default" }: Props) => {
  const starsOnly = variant === "events";

  return (
    <div className={`scifi-universe-bg ${starsOnly ? "scifi-universe-stars-only" : ""}`} aria-hidden>
      <div className="scifi-universe-void" />
      <SciFiScene3D variant={variant} />
      {!starsOnly && <SciFiParticleNetwork />}
      <div className="scifi-universe-vignette" />
      <div className="scifi-universe-horizon" />
      {!starsOnly && <div className="scifi-universe-scan" />}
    </div>
  );
};

export default SciFiUniverseBackground;
