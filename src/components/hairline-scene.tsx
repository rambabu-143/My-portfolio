'use client';

import { useEffect, useRef, useState } from 'react';

type Kind = 'voice' | 'knowledge' | 'mcp';
type Figure = {
  name: string;
  means: string;
  range: number[];
  tour: ([number, number] | null)[];
  mount: (context: { stage: HTMLElement; svg: SVGElement; read: { textContent: string } }, value: number) => { destroy: () => void };
};
type Runtime = {
  engine: {
    inject: (root: Document) => void;
    mk: (tag: string, attrs: Record<string, string>, parent: HTMLElement) => SVGElement;
    tour: (stage: HTMLElement, stops: Figure['tour']) => { stop: () => void };
    setReducedMotion: (on: boolean) => void;
    register: (stage: HTMLElement, tick: (dt: number, now: number) => boolean) => { wake: () => void; unregister: () => void };
    spring: (value: number) => { x: number; t: number };
    stepS: (spring: { x: number; t: number }, dt: number) => boolean;
    pointer: (stage: HTMLElement, handlers: { move: (point: [number, number]) => void; leave: () => void }) => () => void;
  };
  figures: Record<string, Figure>;
};

declare global { interface Window { portfolioHairline?: Runtime } }
let loading: Promise<Runtime> | undefined;
export function loadHairlineRuntime() {
  if (window.portfolioHairline) return Promise.resolve(window.portfolioHairline);
  if (!loading) loading = new Promise<Runtime>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/hairline/runtime.js`;
    script.onload = () => window.portfolioHairline ? resolve(window.portfolioHairline) : reject(new Error('Hairline did not initialize'));
    script.onerror = () => { script.remove(); loading = undefined; reject(new Error('Unable to load Hairline')); };
    document.head.appendChild(script);
  });
  return loading;
}

const names: Record<Kind, string> = { voice: 'microphone', knowledge: 'documents', mcp: 'server-kit' };
const hints: Record<Kind, string> = {
  voice: 'Move over the microphone to explore its response',
  knowledge: 'Move across the documents to lift related context',
  mcp: 'Move across the kit to reveal the server components',
};

export default function HairlineScene({ kind, compact = false, paused = false }: { kind: Kind; compact?: boolean; paused?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    loadHairlineRuntime().then(({ engine, figures }) => {
      if (disposed || !host.current) return;
      const stage = host.current, figure = figures[names[kind]];
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      engine.inject(document);
      engine.setReducedMotion(media.matches);
      stage.setAttribute('data-hairline', figure.name);
      stage.setAttribute('aria-label', figure.means);
      const svg = engine.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage);
      const read = {
        get textContent() { return readout.current?.textContent ?? 'rest'; },
        set textContent(text: string) { if (readout.current) readout.current.textContent = text; },
      };
      read.textContent = 'rest';
      const handle = figure.mount({ stage, svg, read }, figure.range[1]);
      let tour: { stop: () => void } | undefined;
      let visible = false;
      const sync = () => {
        tour?.stop(); tour = undefined;
        engine.setReducedMotion(media.matches);
        if (visible && !document.hidden && !media.matches && !paused) tour = engine.tour(stage, figure.tour);
      };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
      observer.observe(stage);
      media.addEventListener('change', sync);
      document.addEventListener('visibilitychange', sync);
      cleanup = () => {
        observer.disconnect(); tour?.stop(); handle.destroy(); stage.replaceChildren();
        media.removeEventListener('change', sync);
        document.removeEventListener('visibilitychange', sync);
      };
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => { disposed = true; cleanup(); };
  }, [kind, paused]);

  return (
    <div className="hairline-preview">
      <div ref={host} role="img" aria-label={`${names[kind]} project illustration`} className="hairline-stage" />
      <div className="flex items-center justify-between gap-3 px-4 pb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground" aria-hidden="true">
        <span>{failed ? 'Preview unavailable' : 'Interactive study'}</span><span ref={readout}>rest</span>
      </div>
      {!compact && <p className="px-4 pb-4 text-xs text-muted-foreground">{hints[kind]}. Illustrative · no client data.</p>}
    </div>
  );
}
