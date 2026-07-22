"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import FloatingShape from "./FloatingShape";

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

function Fallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse" />
    </div>
  );
}

export default function HeroScene() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "auto" }}
    >
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
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "auto";
        }}
      >
        <Suspense fallback={null}>
          <HeroSceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
