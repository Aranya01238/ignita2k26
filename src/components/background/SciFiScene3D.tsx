import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

export type SciFiVariant = "default" | "events" | "schedule" | "team" | "gallery";

const RED = "#e8000d";
const CYAN = "#00f5ff";

const FloatingRing = ({
  color,
  position,
  scale = 1,
}: {
  color: string;
  position: [number, number, number];
  scale?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.4;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[2.2, 0.04, 16, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
    </Float>
  );
};

const EnergyCore = ({
  color,
  emissive,
  position,
}: {
  color: string;
  emissive: string;
  position: [number, number, number];
}) => {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.35;
      group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.15;
    }
  });
  return (
    <group ref={group} position={position}>
      <Float speed={2} floatIntensity={1.5}>
        <mesh>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={1.4}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh scale={0.65}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshBasicMaterial
            color={emissive}
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
    </group>
  );
};

const DataMotes = ({ count = 120 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color={CYAN} transparent opacity={0.65} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
};

const SceneContent = ({
  mouseRef,
  variant,
  reduced,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  variant: SciFiVariant;
  reduced: boolean;
}) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mouse = mouseRef.current;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 1.8, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.2 + mouse.y * 0.8 + Math.sin(t * 0.3) * 0.15, 0.04);
    state.camera.lookAt(0, -1, 0);
    if (group.current) group.current.rotation.y = t * 0.015;
  });

  const starsOnly = variant === "events";
  const fogNear = variant === "gallery" ? 10 : starsOnly ? 18 : 12;
  const starCount = starsOnly ? (reduced ? 4000 : 8000) : reduced ? 1200 : 3500;

  return (
    <>
      <fog attach="fog" args={["#020408", fogNear, starsOnly ? 48 : 32]} />
      {!starsOnly && (
        <>
          <ambientLight intensity={0.35} />
          <pointLight position={[8, 6, 6]} intensity={1.8} color={RED} />
          <pointLight position={[-8, 4, 4]} intensity={1.4} color={CYAN} />
        </>
      )}
      {starsOnly && <ambientLight intensity={0.15} />}

      <Stars radius={starsOnly ? 120 : 80} depth={starsOnly ? 60 : 40} count={starCount} factor={starsOnly ? 4.5 : 3} saturation={starsOnly ? 0.15 : 0} fade speed={starsOnly ? 0.35 : 0.6} />

      {starsOnly && (
        <Stars radius={60} depth={30} count={reduced ? 800 : 2000} factor={2} saturation={0.4} fade speed={0.2} />
      )}

      <group ref={group}>
        {!reduced && !starsOnly && (
          <>
            <EnergyCore color={RED} emissive={RED} position={[-5, 0, -6]} />
            <EnergyCore color={CYAN} emissive={CYAN} position={[6, -1, -8]} />
            <FloatingRing color={RED} position={[4, 2, -10]} scale={1.2} />
            <FloatingRing color={CYAN} position={[-4, -2, -9]} scale={0.9} />
            <DataMotes count={140} />
          </>
        )}
        {variant === "team" && !reduced && (
          <>
            <pointLight position={[0, 0, 0]} intensity={0.8} color={CYAN} />
            <pointLight position={[0, 0, 0]} intensity={0.8} color={RED} />
          </>
        )}
      </group>
    </>
  );
};

const SciFiScene3D = ({ variant = "default", className = "" }: { variant?: SciFiVariant; className?: string }) => {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className={`scifi-3d-canvas ${className}`}>
      <Canvas
        camera={{ position: [0, 1.2, 12], fov: 52 }}
        dpr={reduced ? [1, 1.5] : [1, 2]}
        gl={{ alpha: true, antialias: !reduced, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <SceneContent mouseRef={mouseRef} variant={variant} reduced={reduced} />
      </Canvas>
    </div>
  );
};

export default SciFiScene3D;
