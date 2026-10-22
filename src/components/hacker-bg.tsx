'use client';
import { useEffect, useRef, useState } from "react";

// Hacker-style background: falling hex/binary code on a canvas plus two terminals typing commands.
// Only runs once the Work section is reached and the tab is visible; one still frame under reduced motion.
const GLYPHS = "01{}<>/\\|=+*#$%&0123456789ABCDEF";
const FPS = 22;

const SCRIPTS = [
  ["$ nmap -sV 10.0.0.12", "22/tcp   open  ssh", "443/tcp  open  https", "$ ssh -i key.pem root@10.0.0.12", "[+] access granted", "$ python exploit.py --target api", "[*] payload sent... ok"],
  ["$ curl -s api/v1/agents | jq", "{ \"status\": \"online\" }", "$ docker compose up -d", "[+] 4 containers started", "$ tail -f agent.log", "[voice] latency 372ms", "[rag] 5 chunks retrieved"],
];

function Terminal({ lines, className }: { lines: string[]; className: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(lines.join("\n")); return; }
    let i = 0;
    const all = lines.join("\n");
    const id = setInterval(() => {
      i = (i + 1) % (all.length + 40); // brief pause at the end, then it starts over
      setText(all.slice(0, Math.min(i, all.length)));
    }, 70);
    return () => clearInterval(id);
  }, [lines]);
  return (
    <pre className={`hk-term ${className}`}>
      <span className="hk-bar"><i /><i /><i /></span>
      {text}
      <span className="hk-caret">▌</span>
    </pre>
  );
}

const css = `
.hk{position:fixed;inset:0;z-index:-8;pointer-events:none;overflow:hidden;opacity:0;transition:opacity 1.2s ease}
.hk.on{opacity:1}
.hk canvas{position:absolute;inset:0;width:100%;height:100%;opacity:.5}
.hk-term{position:absolute;margin:0;width:290px;padding:34px 14px 14px;border-radius:14px;font:12px/1.55 ui-monospace,Menlo,monospace;white-space:pre-wrap;color:#67e8f9;background:rgba(6,12,24,.55);border:1px solid rgba(103,232,249,.28);box-shadow:0 0 30px rgba(34,211,238,.12);min-height:150px;overflow:hidden}
:root:not(.dark) .hk-term{color:#1d4ed8;background:rgba(255,255,255,.55);border-color:rgba(37,99,235,.3)}
.hk-a{right:2%;top:16%}
.hk-b{left:2%;bottom:10%}
.hk-bar{position:absolute;left:12px;top:11px;display:flex;gap:6px}
.hk-bar i{width:8px;height:8px;border-radius:9999px;background:currentColor;opacity:.5}
.hk-caret{animation:hk-blink 1s steps(2) infinite}
@keyframes hk-blink{50%{opacity:0}}
@media (max-width:767px){.hk-term{display:none}.hk canvas{opacity:.4}}
@media (prefers-reduced-motion:reduce){.hk-caret{animation:none}}
`;

const HackerBg = () => {
  const [on, setOn] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const work = document.getElementById("work");
    if (!work) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting || e.boundingClientRect.top < 0), { rootMargin: "0px 0px -20% 0px" });
    io.observe(work);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!on || !cv || !ctx) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cols = 0, size = 16, heads: number[] = [], speeds: number[] = [];
    const resize = () => {
      cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
      size = innerWidth < 768 ? 22 : 18;
      cols = Math.ceil(innerWidth / size);
      heads = Array.from({ length: cols }, () => Math.random() * (innerHeight / size + 10)); // spread over the screen so it is already full on arrival
      speeds = Array.from({ length: cols }, () => 0.25 + Math.random() * 0.6);
    };
    resize();
    addEventListener("resize", resize);
    const TRAIL = innerWidth < 768 ? 9 : 16;
    const draw = () => {
      const dark = document.documentElement.classList.contains("dark");
      const rgb = dark ? "34,211,238" : "37,99,235";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.font = `${size - 4}px ui-monospace, Menlo, monospace`;
      for (let c = 0; c < cols; c++) {
        if (c % 2 && innerWidth < 768) continue; // every other column on phones
        const head = heads[c]!;
        for (let k = 0; k < TRAIL; k++) {
          const row = Math.floor(head) - k;
          if (row < 0) continue;
          ctx.fillStyle = k === 0 ? `rgba(${dark ? "207,250,254" : "30,64,175"},0.95)` : `rgba(${rgb},${(1 - k / TRAIL) * 0.8})`;
          ctx.fillText(GLYPHS[(((c * 73856093) ^ (row * 19349663)) >>> 0) % GLYPHS.length]!, c * size, row * size);
        }
        if (!calm) {
          heads[c]! += speeds[c]!;
          if (heads[c]! * size > innerHeight + TRAIL * size && Math.random() > 0.97) heads[c] = Math.random() * -20;
        }
      }
    };
    draw();
    if (calm) return () => removeEventListener("resize", resize);
    let last = 0, frame = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (document.hidden || now - last < 1000 / FPS) return;
      last = now;
      draw();
    };
    frame = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); };
  }, [on]);

  return (
    <div className={on ? "hk on" : "hk"} aria-hidden="true">
      <style>{css}</style>
      <canvas ref={canvas} />
      <Terminal lines={SCRIPTS[0]!} className="hk-a" />
      <Terminal lines={SCRIPTS[1]!} className="hk-b" />
    </div>
  );
};

export default HackerBg;
