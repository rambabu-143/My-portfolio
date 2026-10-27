'use client';
import { useEffect, useRef, useState } from "react";
import { AiPane, Battery, Chassis, Lid, FrameworksPane, Keyboard, LanguagesPane, Mainboard, OsPane } from "./hero-parts";

// Bottom to top. k = stacking index inside its group.
const HW = [
  { name: "Chassis", Art: Chassis },
  { name: "Battery", Art: Battery },
  { name: "Mainboard", Art: Mainboard },
  { name: "Keyboard", Art: Keyboard },
  { name: "Display", Art: Lid },
];
const SW = [
  { name: "Operating system", note: "macOS and Linux. Processes, files, networking and permissions.", Art: OsPane },
  { name: "Languages", note: "Python, Go and TypeScript.", Art: LanguagesPane },
  { name: "Frameworks", note: "FastAPI, Next.js and LiveKit Agents.", Art: FrameworksPane },
  { name: "AI layer", note: "MCP tooling, GraphRAG retrieval, and evaluation with RAGAS and DeepEval.", Art: AiPane },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => { const x = clamp(v); return x * x * (3 - 2 * x); };

const HeroTeardown = () => {
  const [active, setActive] = useState<number>(-1); // 0-4 hardware, 5-8 software, -1 intro
  const last = useRef(-2);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = hero.getBoundingClientRect();
      const p = reduce ? 0 : clamp(-r.top / Math.max(1, r.height - window.innerHeight));
      const s = hero.style;
      s.setProperty("--hp", String(p));
      s.setProperty("--zoom", String(1 + 0.15 * smooth(p / 0.55) - 0.36 * smooth((p - 0.5) / 0.3)));
      s.setProperty("--shift", String(1 - smooth(p / 0.2)));
      s.setProperty("--open", String(1 - smooth(p / 0.14)));
      s.setProperty("--spin", String(smooth(p / 0.9)));
      s.setProperty("--ex", String(smooth((p - 0.16) / 0.34)));
      s.setProperty("--sw", String(smooth((p - 0.5) / 0.3)));
      const a = p < 0.18 ? -1 : p < 0.55 ? Math.min(4, Math.floor(((p - 0.18) / 0.37) * 5)) : 5 + Math.min(3, Math.floor(((p - 0.55) / 0.4) * 4));
      if (a !== last.current) { last.current = a; setActive(a); }
      const copy = hero.querySelector<HTMLElement>(".hero-copy");
      if (copy) { copy.style.pointerEvents = p > 0.1 ? "none" : ""; copy.toggleAttribute("inert", p > 0.1); }
    };
    const onScroll = () => { raf ||= requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const info = active < 0 ? null : active < 5 ? { phase: `Hardware · ${HW[active].name}`, name: "I take these apart for fun.", note: "" } : { phase: "Software", ...SW[active - 5] };

  return (
    <>
      <div className="hx-stage" aria-hidden="true">
        <div className="hx-float"><div className="hx-world">
          {HW.map((l, i) => (
            <div key={l.name} className={`hx-plate hx-hw hx-${i}${active === i ? " on" : ""}`} style={{ ["--k" as string]: i }}><l.Art /></div>
          ))}
          {SW.map((l, j) => (
            <div key={l.name} className={`hx-plate hx-sw${active === 5 + j ? " on" : ""}`} style={{ ["--j" as string]: j + 1 }}><l.Art /></div>
          ))}
        </div></div>
      </div>
      <div className="hx-caption" aria-live="polite">
        {info && (
          <div key={active}>
            <span className="eyebrow">{info.phase} · {String(active + 1).padStart(2, "0")} / 09</span>
            <h3 className="font-display font-semibold text-2xl mt-1">{info.name}</h3>
            {info.note && <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-xs">{info.note}</p>}
          </div>
        )}
        <div className="hx-dots">{Array.from({ length: 9 }, (_, i) => <i key={i} className={i === active ? "on" : i < active ? "done" : ""} />)}</div>
      </div>
    </>
  );
};

export default HeroTeardown;
