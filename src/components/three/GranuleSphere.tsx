import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Granules({ color = "#2563EB" }: { color?: string }) {
  const group = useRef<THREE.Group>(null!);
  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 60; i++) {
      const r = 0.9 + Math.random() * 0.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr.push([
        r * Math.sin(ph) * Math.cos(th),
        r * Math.sin(ph) * Math.sin(th),
        r * Math.cos(ph),
      ]);
    }
    return arr;
  }, []);

  useFrame((_, d) => { if (group.current) group.current.rotation.y += d * 0.4; });

  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} emissive={color} emissiveIntensity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

export default function GranuleSphere({ color }: { color?: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <pointLight position={[-2, -2, 2]} intensity={0.8} color="#22C55E" />
      <Granules color={color} />
    </Canvas>
  );
}
