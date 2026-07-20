"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapeProps {
  color?: string;
  wireframe?: boolean;
  scale?: number;
  speed?: number;
}

export default function FloatingShape({
  color = "#6DB3F2",
  wireframe = true,
  scale = 1,
  speed = 0.5,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.4;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.3;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}
