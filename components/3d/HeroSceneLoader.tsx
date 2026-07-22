"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-24 h-24 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(109,179,242,0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  ),
});

export default function HeroSceneLoader() {
  return (
    <>
      {/* Screen reader description for 3D scene — WCAG 1.1.1 (Non-text Content) */}
      <span className="sr-only">
        Interactive 3D scene with floating geometric shapes in blue and green colors
      </span>
      <HeroScene aria-hidden="true" />
    </>
  );
}
