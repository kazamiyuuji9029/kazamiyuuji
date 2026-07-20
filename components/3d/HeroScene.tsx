"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import FloatingShape from "./FloatingShape";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#6DB3F2" />
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <FloatingShape
          color="#6DB3F2"
          wireframe
          scale={1.6}
          speed={0.4}
        />
      </Float>
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#6DB3F2" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

interface HeroSceneProps {
  className?: string;
}

export default function HeroScene({ className = "" }: HeroSceneProps) {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
