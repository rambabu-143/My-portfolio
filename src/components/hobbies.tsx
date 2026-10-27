'use client';
import type { CSSProperties } from "react";
import Reveal from "./reveal";
import { Phone } from "./ui/hairline";

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

const OpenLaptop = ({ style }: { style?: CSSProperties }) => (
  <svg viewBox="22 16 236 198" className="w-full h-auto" style={style} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      .ol-cover{animation:ol-cover 5s ease-in-out infinite}
      .ol-fan{transform-origin:196px 78px;animation:ol-fan 1.2s linear infinite}
      @keyframes ol-cover{0%,15%{transform:translate(0,0);opacity:.85}45%,70%{transform:translate(34px,-30px);opacity:0}100%{transform:translate(0,0);opacity:.85}}
      @keyframes ol-fan{to{transform:rotate(360deg)}}
      @media (prefers-reduced-motion:reduce){.ol-cover,.ol-fan{animation:none}.ol-cover{opacity:0}}
    `}</style>
    <rect x="30" y="24" width="220" height="182" rx="14" fill="var(--hairline-plate)" stroke="var(--hairline-hi)" strokeWidth="2" />
    <rect x="46" y="40" width="112" height="70" rx="6" stroke="var(--hairline-edge)" strokeWidth="1.5" />
    <rect x="58" y="52" width="30" height="24" rx="3" stroke="var(--hairline-hi)" strokeWidth="1.5" />
    <rect x="98" y="52" width="16" height="16" rx="2" stroke="var(--hairline-mid)" strokeWidth="1.5" />
    <rect x="120" y="52" width="26" height="12" rx="2" stroke="var(--hairline-mid)" strokeWidth="1.5" />
    <path d="M58 92h86M58 100h60" stroke="var(--hairline-lo)" strokeWidth="1.5" />
    <circle cx="196" cy="78" r="30" stroke="var(--hairline-edge)" strokeWidth="1.5" />
    <g className="ol-fan" stroke="var(--hairline-hi)" strokeWidth="2.5"><path d="M196 78v-24M196 78l21 12M196 78l-21 12" /></g>
    <circle cx="196" cy="78" r="4" fill="var(--hairline-hi)" />
    <rect x="46" y="126" width="188" height="64" rx="8" stroke="var(--hairline-hi)" strokeWidth="2" />
    {[1, 2, 3, 4, 5].map((i) => <line key={i} x1={46 + i * 31.3} x2={46 + i * 31.3} y1="126" y2="190" stroke="var(--hairline-mid)" strokeWidth="1.5" />)}
    <text x="140" y="164" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--hairline-edge)" stroke="none">BATTERY</text>
    <g className="ol-cover"><rect x="30" y="24" width="220" height="182" rx="14" fill="var(--hairline-mid)" stroke="var(--hairline-hi)" strokeWidth="2" /><circle cx="52" cy="46" r="4" fill="var(--hairline-hi)" /><circle cx="228" cy="184" r="4" fill="var(--hairline-hi)" /></g>
  </svg>
);

const Flash = ({ style }: { style?: CSSProperties }) => (
  <svg viewBox="0 0 280 230" className="w-full h-auto" style={style} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <style>{`
      .fl-bar{transform-box:fill-box;transform-origin:left;animation:fl-bar 4s ease-in-out infinite}
      .fl-cur{animation:fl-cur 1s steps(1) infinite}
      @keyframes fl-bar{0%{transform:scaleX(.04)}80%,100%{transform:scaleX(1)}}
      @keyframes fl-cur{50%{opacity:0}}
      @media (prefers-reduced-motion:reduce){.fl-bar,.fl-cur{animation:none}}
    `}</style>
    <rect x="22" y="20" width="96" height="190" rx="16" fill="var(--hairline-plate)" stroke="var(--hairline-hi)" strokeWidth="2" />
    <rect x="31" y="34" width="78" height="162" rx="8" stroke="var(--hairline-mid)" strokeWidth="1.5" />
    <path d="M56 84a15 15 0 0 1 30 0z" fill="var(--hairline-hi)" stroke="none" />
    <path d="M59 70l-4-6M83 70l4-6" stroke="var(--hairline-hi)" strokeWidth="2" />
    <text x="70" y="110" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--hairline-edge)" stroke="none">RECOVERY</text>
    <rect x="43" y="130" width="54" height="7" rx="3.5" stroke="var(--hairline-edge)" strokeWidth="1.5" />
    <rect className="fl-bar" x="43" y="130" width="54" height="7" rx="3.5" fill="var(--hairline-hi)" stroke="none" />
    <text x="70" y="156" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--hairline-edge)" stroke="none">flashing ROM…</text>
    <rect x="136" y="26" width="126" height="86" rx="8" fill="var(--hairline-plate)" stroke="var(--hairline-edge)" strokeWidth="1.5" />
    <circle cx="148" cy="38" r="2.5" fill="var(--hairline-hi)" stroke="none" /><circle cx="158" cy="38" r="2.5" fill="var(--hairline-mid)" stroke="none" /><circle cx="168" cy="38" r="2.5" fill="var(--hairline-mid)" stroke="none" />
    <g fontSize="8.5" fontFamily="monospace" fill="var(--hairline-hi)" stroke="none">
      <text x="146" y="58">$ adb reboot recovery</text>
      <text x="146" y="74">$ fastboot flash</text>
      <text x="146" y="90">$ root: granted</text>
      <rect className="fl-cur" x="146" y="95" width="6" height="9" />
    </g>
    <rect x="136" y="130" width="52" height="30" rx="8" stroke="var(--hairline-mid)" strokeWidth="1.5" />
    <text x="162" y="149" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--hairline-edge)" stroke="none">v8</text>
    <path d="M194 145h20m-7-6 7 6-7 6" stroke="var(--hairline-hi)" strokeWidth="2" />
    <rect x="220" y="130" width="42" height="30" rx="8" fill="var(--hairline-mid)" stroke="var(--hairline-hi)" strokeWidth="2" />
    <text x="241" y="149" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="var(--hairline-hi)" stroke="none">v14</text>
    <text x="199" y="188" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--hairline-edge)" stroke="none">old phone, new Android</text>
  </svg>
);

// Each hobby gets its own hue; it tints the Hairline figures, the glow and the tags.
const hobbies = [
  { Figures: [Mic], hue: 330, title: "Singing", body: "I sing for the love of it. Music is how I switch off after a long day of debugging.", tags: ["Vocals", "Melody", "Live jams"] },
  { Figures: [Phone, OpenLaptop], hue: 200, title: "Hardware & repairs", body: "I learn what's inside phones and laptops: glass, boards, batteries, fans and shells. I open them up and take on repairs now and then.", tags: ["Teardowns", "Repairs", "Upgrades"] },
  { Figures: [Flash], hue: 150, title: "Custom ROMs & recovery", body: "I love giving older Android phones a second life: unlocking the bootloader, flashing a custom recovery and a newer ROM, and rooting.", tags: ["Custom ROMs", "Recovery", "Rooting"] },
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
      {hobbies.map(({ Figures, hue, title, body, tags }, i) => (
        <Reveal key={title} delay={i * 0.08} className="h-full">
          <div
            className="glass rounded-3xl p-6 h-full flex flex-col"
            style={{ backgroundImage: `radial-gradient(120% 70% at 50% 0%, hsl(${hue} 90% 60% / 0.18), transparent 70%)`, borderColor: `hsl(${hue} 80% 60% / 0.35)` }}
          >
            <div className="relative w-full mb-5 rounded-2xl p-3 min-h-[236px] flex flex-col justify-center" style={{ background: `hsl(${hue} 60% 8% / 0.55)`, boxShadow: `inset 0 0 0 1px hsl(${hue} 80% 60% / 0.25), 0 12px 40px -18px hsl(${hue} 90% 55% / 0.7)` }} aria-hidden="true">
              <div className={Figures.length > 1 ? "grid grid-cols-[1fr_1.5fr] items-center gap-1" : ""}>
                {Figures.map((F, k) => <div key={k} className={Figures.length > 1 && k === 0 ? "scale-[1.6]" : ""}><F style={palette(hue)} /></div>)}
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
