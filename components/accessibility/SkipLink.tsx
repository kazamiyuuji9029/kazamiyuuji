"use client";

import { useState } from "react";

/**
 * Skip navigation link — allows keyboard users to bypass navigation
 * and jump directly to main content. Hidden until focused via Tab.
 * WCAG 2.4.1 (Bypass Blocks)
 */
export default function SkipLink() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <a
      href="#main-content"
      className={`fixed top-4 left-4 z-[9999] px-6 py-3 rounded-[var(--radius-button)] bg-primary text-white font-semibold shadow-lg transition-transform duration-200 ${
        isFocused
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to main content
    </a>
  );
}
