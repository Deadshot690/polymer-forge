import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { transformationPhase, PHASE_COLORS } from "@/lib/transformation-phase";

const wasteColor = new THREE.Color(PHASE_COLORS.waste);
const recyclingColor = new THREE.Color(PHASE_COLORS.recycling);
const productColor = new THREE.Color(PHASE_COLORS.product);
const tmpColor = new THREE.Color();

function phaseColor(p: number) {
  // 0..0.5 waste -> recycling, 0.5..1 recycling -> product
  if (p <= 0.5) return tmpColor.copy(wasteColor).lerp(recyclingColor, p / 0.5);
  return tmpColor.copy(recyclingColor).lerp(productColor, (p - 0.5) / 0.5);
}

function Particles({ count = 1800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const material = useRef<THREE.PointsMaterial>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const blue = new THREE.Color("#2563EB");
    const cyan = new THREE.Color("#38BDF8");
    const green = new THREE.Color("#22C55E");
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
      positions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(ph);
      const t = Math.random();
      const c = t < 0.5 ? blue : t < 0.85 ? cyan : green;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const p = transformationPhase.get();
    // Speed up rotation during the recycling phase, slow as it settles
    const speed = 0.04 + Math.sin(p * Math.PI) * 0.18;
    points.current.rotation.y += delta * speed;
    points.current.rotation.x = mouse.current.y * 0.2;
    points.current.rotation.z = mouse.current.x * 0.1;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    if (material.current) {
      const c = phaseColor(p);
      material.current.color.lerp(c, 0.08);
      // Tighten cloud as it transforms into uniform product granules
      points.current.scale.setScalar(1 - p * 0.18);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        size={0.07}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Crystal() {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null!);
  useFrame((_, d) => {
    if (!mesh.current) return;
    const p = transformationPhase.get();
    mesh.current.rotation.y += d * (0.1 + p * 0.4);
    mesh.current.rotation.x += d * 0.05;
    if (mat.current) {
      mat.current.color.lerp(phaseColor(p), 0.08);
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshPhysicalMaterial
        ref={mat}
        color="#2563EB"
        transmission={0.85}
        thickness={1.2}
        roughness={0.05}
        metalness={0.1}
        ior={1.4}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export default function ParticleField({ withCrystal = true, count = 1800 }: { withCrystal?: boolean; count?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#38BDF8" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#22C55E" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#2563EB" />
      <Particles count={count} />
      {withCrystal && <Crystal />}
    </Canvas>
  );
}
