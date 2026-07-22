"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  color?: string;
  distort?: number;
  speed?: number;
  size?: number;
}

export default function FloatingShape({
  color = "#4A9BD9",
  distort = 0.3,
  speed = 2,
  size = 1.5,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Memoize geometry to avoid recreation
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(size, 256, 256);
  }, [size]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}
