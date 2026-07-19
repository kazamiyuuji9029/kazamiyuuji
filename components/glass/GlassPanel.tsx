import React from "react";

type Variant = "default" | "hero" | "nav" | "card";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  default: "glass-panel",
  hero: "glass-panel glass-panel--hero",
  nav: "glass-panel glass-panel--nav",
  card: "glass-panel glass-panel--card",
};

export default function GlassPanel({
  variant = "default",
  className = "",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
