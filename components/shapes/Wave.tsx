import React from "react";

interface WaveProps {
  color?: string;
  className?: string;
  flip?: boolean;
}

export default function Wave({
  color = "rgba(109, 179, 242, 0.15)",
  className = "",
  flip = false,
}: WaveProps) {
  return (
    <div
      className={`shape-wave ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
