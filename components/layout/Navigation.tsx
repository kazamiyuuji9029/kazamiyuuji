"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import GlassPanel from "@/components/glass/GlassPanel";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Close on Escape key — WCAG 2.1.1 (Keyboard)
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  // Close on route change (window popstate)
  useEffect(() => {
    const handlePopState = () => closeMenu();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeMenu]);

  return (
    <GlassPanel
      variant="nav"
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between" aria-label="Main navigation">
        <Link
          href="/"
          className="text-xl font-bold gradient-primary bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Kazami Yuuji
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-surface/70 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-surface/70 hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu with focus management */}
      {isOpen && (
        <div id="mobile-menu" role="dialog" aria-label="Navigation menu">
          <ul className="md:hidden mt-4 flex flex-col gap-4" role="list">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-surface/70 hover:text-primary transition-colors font-medium py-2"
                  onClick={closeMenu}
                  tabIndex={0}
                  // Auto-focus first item when menu opens
                  ref={index === 0 ? (el) => el?.focus() : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassPanel>
  );
}
