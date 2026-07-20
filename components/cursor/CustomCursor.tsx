"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);

    const addHoverListeners = () => {
      const els = document.querySelectorAll("a, button, [role='button']");
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return els;
    };

    let elements = addHoverListeners();
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      elements = addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "white",
          transition: "transform 0.1s",
          transform: isHovering ? "scale(2)" : "scale(1)",
        }}
      />
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.5)",
          transition: "transform 0.15s ease-out",
          transform: isHovering ? "scale(1.5)" : "scale(1)",
        }}
      />
    </>
  );
}
