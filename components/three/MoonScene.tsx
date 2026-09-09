"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function Rig() {
  const g = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime();
    g.current.rotation.y = t * 0.18 + pointer.x * 0.35;
    g.current.rotation.x = 0.35 + pointer.y * 0.2;
  });
  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[1.35, 0.055, 24, 96]} />
        <meshStandardMaterial color="#c56a2d" metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0.2]}>
        <torusGeometry args={[1.35, 0.02, 12, 80]} />
        <meshStandardMaterial color="#e8e0d4" metalness={0.4} roughness={0.45} />
      </mesh>
      <Crescent />
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 2.1, Math.cos(i * 1.7) * 0.9, Math.cos(i) * 1.4]} >
          <octahedronGeometry args={[0.045, 0]} />
          <meshStandardMaterial color={i % 3 ? "#e8e0d4" : "#c56a2d"} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Crescent() {
  const m = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (m.current) m.current.rotation.z = clock.getElapsedTime() * -0.12;
  });
  return (
    <mesh ref={m}>
      <sphereGeometry args={[0.72, 48, 48]} />
      <meshStandardMaterial color="#2a2620" metalness={0.2} roughness={0.7} />
    </mesh>
  );
}

export default function MoonScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#090807"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 2, 4]} intensity={1.4} color="#f0e6d8" />
      <directionalLight position={[-3, -1, -2]} intensity={0.45} color="#c56a2d" />
      <Rig />
    </Canvas>
  );
}
