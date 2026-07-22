"use client";

import { useEffect, useRef } from "react";

interface FocusTrapProps {
  isActive: boolean;
  children: React.ReactNode;
  onEscape?: () => void;
}

/**
 * Traps keyboard focus inside a container when active.
 * Used for modals, mobile menus, and dialogs.
 * WCAG 2.1.2 (No Keyboard Trap) — Escape key always exits.
 */
export default function FocusTrap({
  isActive,
  children,
  onEscape,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Remember who had focus before trapping
    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // Focus the first focusable element inside the trap
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        onEscape();
        return;
      }

      if (e.key !== "Tab") return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        // Tab: if on last, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus to the element that had it before the trap
      previousFocusRef.current?.focus();
    };
  }, [isActive, onEscape]);

  return (
    <div ref={containerRef} role="dialog" aria-modal={isActive ? "true" : undefined}>
      {children}
    </div>
  );
}
