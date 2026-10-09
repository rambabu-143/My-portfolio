'use client';

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !dark;
    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
      setDark(next);
    };

    const doc = document as any; // ponytail: TS 5.x lib lacks startViewTransition typing
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ponytail: no View Transitions (older Firefox) -> instant switch, no fallback animation
    if (calm || !doc.startViewTransition) return apply();

    const { clientX: x, clientY: y } = e;
    const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) * 1.15;

    // 1) a drop falls onto the button
    const drop = document.createElement("span");
    drop.className = "theme-drop";
    drop.style.cssText = `left:${x}px;top:${y}px`;
    document.body.appendChild(drop);
    drop.addEventListener("animationend", () => drop.remove());

    // 2) on impact: splash rings + liquid spread (round, soft wobble that settles)
    setTimeout(() => {
      [0, 130, 260].forEach((delay) => {
        const ring = document.createElement("span");
        ring.className = "theme-ring";
        ring.style.cssText = `left:${x}px;top:${y}px;animation-delay:${delay}ms`;
        document.body.appendChild(ring);
        ring.addEventListener("animationend", () => ring.remove());
      });
      const N = 96, F = 50;
      const frames = Array.from({ length: F + 1 }, (_, f) => {
        const t = f / F;
        const r = R * (1 - Math.pow(1 - t, 3));
        const wob = Math.pow(1 - t, 1.5) * 0.16;
        const pts = Array.from({ length: N }, (_, i) => {
          const a = (i / N) * Math.PI * 2;
          const k = 1 + wob * (Math.sin(3 * a + t * 10) + 0.5 * Math.sin(5 * a - t * 14));
          return `${x + Math.cos(a) * r * k}px ${y + Math.sin(a) * r * k}px`;
        });
        return `polygon(${pts.join(",")})`;
      });
      doc.startViewTransition(apply).ready.then(() =>
        document.documentElement.animate(
          { clipPath: frames },
          { duration: 1300, easing: "linear", pseudoElement: "::view-transition-new(root)" }
        )
      );
    }, 300);
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="liquid-orb grid place-items-center size-9 rounded-full text-foreground active:scale-90 transition-transform duration-100"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default ThemeToggle;
