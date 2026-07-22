# Task 10: Update 3D Hero Scene

**Files:**
- Modify: `components/3d/FloatingShape.tsx`
- Modify: `components/3d/HeroScene.tsx`

**Interfaces:**
- Consumes: None
- Produces: Updated 3D scene for light theme

## Steps

### Step 1: Update FloatingShape to use sphere

Replace `components/3d/FloatingShape.tsx` with:

```tsx
"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
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

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}
```

### Step 2: Update HeroScene for light theme

Replace `components/3d/HeroScene.tsx` with:

```tsx
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
        color="#4A9BD9" 
        size={1.8} 
        distort={0.4} 
        speed={1.5} 
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
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <HeroSceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Step 3: Verify 3D scene compiles

Run: `npm run build`
Expected: Build succeeds

### Step 4: Commit

```bash
git add components/3d/FloatingShape.tsx components/3d/HeroScene.tsx
git commit -m "feat(3d): update hero scene with sphere and light theme"
```
