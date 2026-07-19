import React from "react";

interface BlobProps {
  color?: string;
  size?: number;
  className?: string;
  blur?: number;
}

export default function Blob({
  color = "rgba(109, 179, 242, 0.2)",
  size = 400,
  className = "",
  blur = 1,
}: BlobProps) {
  return (
    <div
      className={`shape-blob ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
      }}
      aria-hidden="true"
    />
  );
}
