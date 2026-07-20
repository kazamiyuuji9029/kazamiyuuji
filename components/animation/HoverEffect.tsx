"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverEffectProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  glow?: boolean;
}

export default function HoverEffect({
  children,
  className = "",
  scale = 1.05,
  glow = false,
}: HoverEffectProps) {
  return (
    <motion.div
      className={`${className} ${glow ? "hover:shadow-[var(--shadow-glow-primary)]" : ""}`}
      whileHover={{ scale, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
