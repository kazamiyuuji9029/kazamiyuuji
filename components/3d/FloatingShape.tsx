"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGlobalMouse } from "./HeroScene";

interface FloatingShapeProps {
  color?: string;
  size?: number;
}

export default function FloatingShape({
  color = "#1A365D",
  size = 1.8,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useGlobalMouse();

  // Icosahedron — facets make rotation clearly visible
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(size, 1);
  }, [size]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.2,
      metalness: 0.85,
      flatShading: true,
    });
  }, [color]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const { clock } = state;
    const mesh = meshRef.current;
    const t = clock.elapsedTime;

    // Continuous rotation — clearly visible on icosahedron
    mesh.rotation.x = Math.sin(t * 0.5) * 0.4;
    mesh.rotation.y += 0.01;
    mesh.rotation.z = Math.cos(t * 0.3) * 0.2;

    // Floating bob
    const floatY = Math.sin(t * 0.8) * 0.15;

    // Mouse follow — shape moves toward cursor globally
    const targetX = mouse.x * 1.2;
    const targetY = floatY + mouse.y * 0.6;
    mesh.position.x += (targetX - mesh.position.x) * 0.025;
    mesh.position.y += (targetY - mesh.position.y) * 0.025;

    // Scale pulse based on mouse activity
    const dist = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
    const targetScale = 1 + dist * 0.1;
    const s = mesh.scale.x + (targetScale - mesh.scale.x) * 0.04;
    mesh.scale.set(s, s, s);
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
    />
  );
}
