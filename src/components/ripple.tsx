'use client';

import { useEffect } from "react";

// water-drop ring on every button press + cursor-tracked specular light on glass
const Ripple = () => {
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("button, .btn-primary, .btn-secondary");
      if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const b = el.getBoundingClientRect();
      const d = Math.hypot(b.width, b.height) * 2;
      const ring = document.createElement("span");
      ring.className = "water-ring";
      ring.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - b.left - d / 2}px;top:${e.clientY - b.top - d / 2}px`;
      el.appendChild(ring);
      ring.addEventListener("animationend", () => ring.remove());
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".glass, .glass-tight, .btn-secondary");
      if (!el) return;
      const b = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - b.left}px`);
      el.style.setProperty("--my", `${e.clientY - b.top}px`);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
  return null;
};

export default Ripple;
