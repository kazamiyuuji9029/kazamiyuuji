"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

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

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function HeroSceneLoader({ children }: { children?: ReactNode }) {
  return (
    <>
      {/* Screen reader description for 3D scene — WCAG 1.1.1 */}
      <span className="sr-only">
        Interactive 3D scene with floating geometric shapes in blue and green colors
      </span>
      {/* 3D scene — wrapped in error boundary so a Three.js failure doesn't kill the page */}
      <SceneErrorBoundary>
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <HeroScene />
        </div>
      </SceneErrorBoundary>
      {/* Page content — always renders regardless of 3D scene status */}
      {children}
    </>
  );
}
