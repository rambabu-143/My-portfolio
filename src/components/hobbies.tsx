'use client';
import type { CSSProperties } from "react";
import Reveal from "./reveal";
import { Exploded, Keyboard, Laptop, Phone } from "./ui/hairline";

// Custom figures for singing: Hairline has no microphone, so draw one.
const Mic = ({ style }: { style?: CSSProperties }) => (
  <svg viewBox="0 0 280 230" className="w-full h-auto" style={style} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      .sg-ring{transform-origin:140px 92px;animation:sg-ring 2.6s ease-out infinite;opacity:0}
      .sg-note{animation:sg-note 3.2s ease-in infinite;opacity:0}
      @keyframes sg-ring{0%{transform:scale(.55);opacity:.9}100%{transform:scale(1.5);opacity:0}}
      @keyframes sg-note{0%{transform:translateY(14px);opacity:0}25%{opacity:1}100%{transform:translateY(-34px);opacity:0}}
      @media (prefers-reduced-motion:reduce){.sg-ring,.sg-note{animation:none;opacity:.6}}
    `}</style>
    {[0, 0.87, 1.74].map((d) => <circle key={d} className="sg-ring" cx="140" cy="92" r="52" stroke="var(--hairline-edge)" strokeWidth="1.5" style={{ animationDelay: `${d}s` }} />)}
    <rect x="112" y="40" width="56" height="84" rx="28" fill="var(--hairline-plate)" stroke="var(--hairline-hi)" strokeWidth="2" />
    {[58, 70, 82, 94, 106].map((y) => <line key={y} x1="120" x2="160" y1={y} y2={y} stroke="var(--hairline-mid)" strokeWidth="1.5" />)}
    <line x1="140" x2="140" y1="40" y2="124" stroke="var(--hairline-mid)" strokeWidth="1.5" />
    <path d="M98 100v10a42 42 0 0 0 84 0v-10" stroke="var(--hairline-edge)" strokeWidth="2.5" />
    <line x1="140" x2="140" y1="152" y2="196" stroke="var(--hairline-edge)" strokeWidth="2.5" />
    <path d="M104 204h72" stroke="var(--hairline-hi)" strokeWidth="3" />
    <path d="M114 204l26-10 26 10" stroke="var(--hairline-edge)" strokeWidth="2" />
    <g stroke="var(--hairline-hi)" strokeWidth="2" fill="var(--hairline-hi)">
      <g className="sg-note" style={{ animationDelay: "0s" }}><circle cx="52" cy="84" r="5" /><path d="M57 84V62l12 4" fill="none" /></g>
      <g className="sg-note" style={{ animationDelay: "1.1s" }}><circle cx="222" cy="68" r="5" /><path d="M227 68V46l12 4" fill="none" /></g>
      <g className="sg-note" style={{ animationDelay: "2.1s" }}><circle cx="236" cy="132" r="4" /><path d="M240 132v-18l10 3" fill="none" /></g>
    </g>
  </svg>
);

const Eq = ({ style }: { style?: CSSProperties }) => (
  <svg viewBox="0 0 80 60" className="w-full h-auto" style={style}>
    <style>{`.sg-bar{transform-box:fill-box;transform-origin:bottom;animation:sg-bar 1s ease-in-out infinite alternate}@keyframes sg-bar{from{transform:scaleY(.25)}to{transform:scaleY(1)}}@media (prefers-reduced-motion:reduce){.sg-bar{animation:none}}`}</style>
    {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} className="sg-bar" x={8 + i * 11} y={8} width="7" height="44" rx="3" fill="var(--hairline-hi)" style={{ animationDelay: `${i * 0.17}s`, animationDuration: `${0.7 + (i % 3) * 0.25}s` }} />)}
  </svg>
);

// Each hobby gets its own hue; it tints the Hairline figures, the glow and the tags.
const hobbies = [
  { Figure: Mic, Detail: Eq, hue: 330, title: "Singing", body: "I sing for the love of it. Music is how I switch off after a long day of debugging.", tags: ["Vocals", "Melody", "Live jams"] },
  { Figure: Phone, Detail: Exploded, hue: 200, title: "Mobile hardware", body: "I like learning what's inside a phone: the glass, board, battery and shell, and how the layers fit together.", tags: ["Screens", "Batteries", "Boards"] },
  { Figure: Laptop, Detail: Keyboard, hue: 150, title: "Laptop hardware & repairs", body: "I read up on laptop internals and take on hardware repairs now and then. Fixing real machines keeps my debugging instincts sharp.", tags: ["Teardowns", "Repairs", "Upgrades"] },
];

const palette = (hue: number) => ({
  "--hairline-hi": `hsl(${hue} 95% 68%)`,
  "--hairline-edge": `hsl(${hue} 80% 62%)`,
  "--hairline-mid": `hsl(${hue} 55% 38%)`,
  "--hairline-lo": `hsl(${hue} 45% 26%)`,
  "--hairline-plate": `hsl(${hue} 50% 10%)`,
}) as CSSProperties;

const Hobbies = () => (
  <div className="w-full">
    <div className="flex items-baseline justify-between mb-4">
      <h2 className="font-display font-semibold text-3xl sm:text-4xl">Beyond code</h2>
      <span className="eyebrow hidden sm:block">05</span>
    </div>
    <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
      Away from the keyboard: music, and taking hardware apart to see how it works. Move your pointer over each figure.
    </p>
    <div className="grid gap-5 md:grid-cols-3">
      {hobbies.map(({ Figure, Detail, hue, title, body, tags }, i) => (
        <Reveal key={title} delay={i * 0.08} className="h-full">
          <div
            className="glass rounded-3xl p-6 h-full flex flex-col"
            style={{ backgroundImage: `radial-gradient(120% 70% at 50% 0%, hsl(${hue} 90% 60% / 0.18), transparent 70%)`, borderColor: `hsl(${hue} 80% 60% / 0.35)` }}
          >
            <div className="relative w-full mb-5 rounded-2xl p-3" style={{ background: `hsl(${hue} 60% 8% / 0.55)`, boxShadow: `inset 0 0 0 1px hsl(${hue} 80% 60% / 0.25), 0 12px 40px -18px hsl(${hue} 90% 55% / 0.7)` }} aria-hidden="true">
              <div className="py-2"><Figure style={palette(hue)} /></div>
              <div className="absolute right-3 bottom-3 w-20 rounded-xl p-1.5" style={{ background: `hsl(${hue} 60% 6% / 0.85)`, boxShadow: `inset 0 0 0 1px hsl(${hue} 80% 60% / 0.35)` }}>
                <Detail style={palette(hue)} />
              </div>
            </div>
            <h3 className="font-display font-semibold text-xl mb-2" style={{ color: `hsl(${hue} 90% 72%)` }}>{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{body}</p>
            <ul className="mt-auto flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t} className="rounded-full px-3 py-1 text-xs" style={{ color: `hsl(${hue} 90% 75%)`, background: `hsl(${hue} 80% 60% / 0.12)`, boxShadow: `inset 0 0 0 1px hsl(${hue} 80% 60% / 0.3)` }}>{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

export default Hobbies;
