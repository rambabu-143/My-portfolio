'use client';
import { useEffect, useRef, useState } from 'react';
import { paintAtmosphere, type SceneKind } from './atmosphere-painter';

export default function AtmosphereScene({ kind, compact = false, paused = false }: { kind: SceneKind; compact?: boolean; paused?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [stopped, setStopped] = useState(false);
  useEffect(() => {
    const el=canvas.current;
    if(!el) return;
    const ctx=el.getContext('2d'); if(!ctx) return;
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf=0, active=false, last=0, time=2;
    const draw=()=>paintAtmosphere(ctx,kind,time,900,450);
    const tick=(now:number)=>{
      if(!active || document.hidden || media.matches || paused || stopped) return;
      time+=Math.min((now-last)/1000,.05); last=now; draw(); raf=requestAnimationFrame(tick);
    };
    const sync=()=>{cancelAnimationFrame(raf);draw();if(active&&!document.hidden&&!media.matches&&!paused&&!stopped){last=performance.now();raf=requestAnimationFrame(tick);}};
    const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;sync();});
    observer.observe(el);media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);draw();
    return ()=>{cancelAnimationFrame(raf);observer.disconnect();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};
  },[kind,paused,stopped]);
  return <div className="atmosphere-scene">
    <canvas ref={canvas} width={900} height={450} aria-hidden="true" className="block w-full h-auto rounded-2xl" />
    {!compact && <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs text-muted-foreground">
      <p>Illustrative {kind==='voice'?'voice conversation':kind==='knowledge'?'knowledge retrieval':'server scaffolding'} · no client data</p>
      <button type="button" onClick={()=>setStopped(!stopped)} className="chip px-3 py-2 rounded-full">{stopped?'Play animation':'Pause animation'}</button>
    </div>}
  </div>;
}
