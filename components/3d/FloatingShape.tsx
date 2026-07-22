"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  color?: string;
  size?: number;
}

export default function FloatingShape({
  color = "#1A365D",
  size = 1.8,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(size, 256, 256);
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const { clock } = state;
    const mesh = meshRef.current;

    // Smooth rotation
    mesh.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    mesh.rotation.y += 0.005;

    // Interactive: move toward mouse position with smooth lerp
    const targetX = mouseRef.current.x * 0.5;
    const targetY = mouseRef.current.y * 0.5;
    mesh.position.x += (targetX - mesh.position.x) * 0.05;
    mesh.position.y += (targetY - mesh.position.y) * 0.05;

    // Slight scale pulse when mouse moves
    const speed = Math.abs(mouseRef.current.x) + Math.abs(mouseRef.current.y);
    const scale = 1 + speed * 0.05;
    mesh.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerMove={(e) => {
          // Get mouse position relative to center (-1 to 1)
          mouseRef.current.x = e.point.x * 0.3;
          mouseRef.current.y = e.point.y * 0.3;
        }}
        onPointerLeave={() => {
          // Return to center when mouse leaves
          mouseRef.current.x = 0;
          mouseRef.current.y = 0;
        }}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}
