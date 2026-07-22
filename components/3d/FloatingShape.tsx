"use client";

import React, { useRef, useMemo, useCallback } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
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
  const targetRef = useRef({ x: 0, y: 0 });

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

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    targetRef.current.x = e.point.x * 1.0;
    targetRef.current.y = e.point.y * 1.0;
    mouseRef.current.x = 1;
  }, []);

  const onPointerLeave = useCallback(() => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
    mouseRef.current.x = 0;
  }, []);

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
    mesh.position.y = Math.sin(t * 0.8) * 0.15;

    // Mouse follow — smooth lerp toward target
    const tx = targetRef.current.x;
    const ty = targetRef.current.y;
    mesh.position.x += (tx - mesh.position.x) * 0.03;
    // Only apply vertical mouse offset on top of the float
    const currentFloatY = Math.sin(t * 0.8) * 0.15;
    const desiredY = currentFloatY + ty * 0.3;
    mesh.position.y += (desiredY - mesh.position.y) * 0.03;

    // Scale pulse when mouse is over
    const isActive = mouseRef.current.x > 0;
    const targetScale = isActive ? 1.12 : 1.0;
    const s = mesh.scale.x + (targetScale - mesh.scale.x) * 0.05;
    mesh.scale.set(s, s, s);
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    />
  );
}
