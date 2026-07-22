"use client";

import React, { Suspense, createContext, useContext, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import FloatingShape from "./FloatingShape";

// Global mouse context — tracks cursor across the whole viewport
interface MouseCtx {
  x: number;
  y: number;
}

const MouseContext = createContext<MouseCtx>({ x: 0, y: 0 });

export function useGlobalMouse() {
  return useContext(MouseContext);
}

function HeroSceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#87CEEB" />

      <FloatingShape
        color="#1A365D"
        size={1.8}
      />

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.3}
        scale={10}
        blur={2}
        far={4}
      />

      <Environment preset="city" />
    </>
  );
}

export default function HeroScene() {
  const [mouse, setMouse] = useState<MouseCtx>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Normalize to -1..1 range centered on viewport
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <MouseContext.Provider value={mouse}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        // Canvas does NOT block page interactions
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <HeroSceneContent />
        </Suspense>
      </Canvas>
    </MouseContext.Provider>
  );
}
