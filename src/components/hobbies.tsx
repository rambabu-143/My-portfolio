'use client';
import Reveal from "./reveal";
import { Laptop, Phone, Turntable } from "./ui/hairline";

const hobbies = [
  { Figure: Turntable, title: "Singing", body: "I sing for the love of it. Music is how I switch off after a long day of debugging." },
  { Figure: Phone, title: "Mobile hardware", body: "I like learning what's inside a phone: the glass, board, battery and shell, and how the layers fit together." },
  { Figure: Laptop, title: "Laptop hardware & repairs", body: "I read up on laptop internals and take on hardware repairs now and then. Fixing real machines keeps my debugging instincts sharp." },
];

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
      {hobbies.map(({ Figure, title, body }, i) => (
        <Reveal key={title} delay={i * 0.08} className="h-full">
          <div className="glass rounded-3xl p-6 h-full flex flex-col">
            <div className="w-full mb-5" aria-hidden="true"><Figure /></div>
            <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

export default Hobbies;
