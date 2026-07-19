import React from "react";

interface EllipseProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Ellipse({
  color = "rgba(0, 206, 209, 0.1)",
  width = 600,
  height = 300,
  className = "",
}: EllipseProps) {
  return (
    <div
      className={`shape-ellipse ${className}`}
      style={{
        width,
        height,
        background: color,
      }}
      aria-hidden="true"
    />
  );
}
