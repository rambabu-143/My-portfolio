'use client';
import { useEffect, useState } from "react";

// Faint line-art hardware drifting in the page margins. Plain SVG + CSS keyframes (no JS per frame),
// fades in once the hero is behind you, shows fewer pieces on phones, stills under reduced motion.
const css = `
.hw{position:fixed;inset:0;z-index:-8;pointer-events:none;overflow:hidden;color:hsl(var(--foreground));opacity:0;transition:opacity 1.2s ease}
.hw.on{opacity:.09}
.hw svg{position:absolute;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;animation:hw-float var(--d,18s) ease-in-out var(--s,0s) infinite alternate;will-change:transform}
.hw .trace{stroke-dasharray:6 10;animation:hw-flow 14s linear infinite}
.hw .dot{fill:currentColor;stroke:none}
@keyframes hw-float{from{transform:translateY(-10px) rotate(var(--r0,-2deg))}to{transform:translateY(12px) rotate(var(--r1,2deg))}}
@keyframes hw-flow{to{stroke-dashoffset:-64}}
@media (prefers-reduced-motion:reduce){.hw svg,.hw .trace{animation:none}}
@media (max-width:767px){.hw .md-only{display:none}.hw svg{max-width:20vw;height:auto}.hw.on{opacity:.07}}
`;

const Phone = () => (
  <>
    <rect x="2" y="2" width="76" height="152" rx="12" />
    <rect x="8" y="8" width="64" height="140" rx="7" />
    <rect x="28" y="12" width="24" height="6" rx="3" />
    <path d="M30 144h20" />
    <path d="M14 30h52M14 40h34M14 62h52v40H14zM14 112h22M44 112h22" />
    <circle cx="66" cy="15" r="1.6" className="dot" />
  </>
);

const Laptop = () => (
  <>
    <rect x="22" y="2" width="156" height="100" rx="7" />
    <rect x="29" y="9" width="142" height="86" rx="3" />
    <path d="M2 108h196l-10 14H12z" />
    <path d="M80 108h40M36 22h30M36 32h52M36 42h22M104 24h56v34h-56zM36 68h70M36 78h46" />
    <circle cx="100" cy="5.5" r="1.4" className="dot" />
  </>
);

const Chip = () => (
  <>
    <rect x="16" y="16" width="68" height="68" rx="6" />
    <rect x="30" y="30" width="40" height="40" rx="3" />
    <path d="M38 50h24M50 38v24" />
    {[26, 38, 50, 62, 74].map((p) => (
      <path key={p} d={`M${p} 16V4M${p} 84v12M16 ${p}H4M84 ${p}h12`} />
    ))}
    <circle cx="24" cy="24" r="1.6" className="dot" />
  </>
);

const Board = () => (
  <>
    <path className="trace" d="M4 20H60L76 36H140" />
    <path className="trace" d="M4 52H44L60 68H100L116 52H140" />
    <path className="trace" d="M4 84H84L100 100H140" />
    {[[60, 20], [76, 36], [44, 52], [100, 68], [84, 84]].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="3" />
    ))}
    <circle cx="140" cy="36" r="2.4" className="dot" />
    <circle cx="140" cy="52" r="2.4" className="dot" />
    <circle cx="140" cy="100" r="2.4" className="dot" />
  </>
);

const HardwareBg = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const work = document.getElementById("work");
    if (!work) return;
    // on once the Work section has reached the viewport or been scrolled past
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting || e.boundingClientRect.top < 0), { rootMargin: "0px 0px -20% 0px" });
    io.observe(work);
    return () => io.disconnect();
  }, []);

  return (
    <div className={on ? "hw on" : "hw"} aria-hidden="true">
      <style>{css}</style>
      <svg viewBox="0 0 80 156" width="92" style={{ left: "2%", top: "14%", ["--d" as string]: "19s", ["--r0" as string]: "-4deg", ["--r1" as string]: "1deg" }}><Phone /></svg>
      <svg viewBox="0 0 200 124" width="210" style={{ right: "2%", top: "42%", ["--d" as string]: "23s", ["--s" as string]: "-6s" }}><Laptop /></svg>
      <svg className="md-only" viewBox="0 0 100 100" width="120" style={{ right: "8%", top: "8%", ["--d" as string]: "17s", ["--s" as string]: "-3s" }}><Chip /></svg>
      <svg className="md-only" viewBox="0 0 144 104" width="190" style={{ left: "3%", bottom: "12%", ["--d" as string]: "26s", ["--s" as string]: "-9s" }}><Board /></svg>
      <svg viewBox="0 0 80 156" width="70" style={{ right: "6%", bottom: "6%", ["--d" as string]: "21s", ["--s" as string]: "-12s", ["--r0" as string]: "3deg", ["--r1" as string]: "-3deg" }}><Phone /></svg>
      <svg className="md-only" viewBox="0 0 200 124" width="150" style={{ left: "6%", top: "52%", ["--d" as string]: "28s", ["--s" as string]: "-15s" }}><Laptop /></svg>
    </div>
  );
};

export default HardwareBg;
