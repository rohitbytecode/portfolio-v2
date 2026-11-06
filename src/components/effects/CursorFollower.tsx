"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorFollower() {
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [x, y, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] h-5 w-5 rounded-full"
      style={{
        x,
        y,
        background: "radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(239,68,68,0) 70%)",
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}
