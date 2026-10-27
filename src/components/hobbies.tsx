'use client';
import type { CSSProperties } from "react";
import Reveal from "./reveal";
import { Exploded, Keyboard, Laptop, Phone, Phosphor, Turntable } from "./ui/hairline";

// Each hobby gets its own hue; it tints the Hairline figures, the glow and the tags.
const hobbies = [
  { Figure: Turntable, Detail: Phosphor, hue: 330, title: "Singing", body: "I sing for the love of it. Music is how I switch off after a long day of debugging.", tags: ["Vocals", "Melody", "Live jams"] },
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
              <Figure style={palette(hue)} />
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
