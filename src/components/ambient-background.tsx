'use client';
import { useEffect, useRef, useState } from 'react';

export default function AmbientBackground() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const clock = useRef(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el=canvas.current, ctx=el?.getContext('2d');
    if(!el||!ctx)return;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0,last=0,painted=0,w=innerWidth,h=innerHeight,scroll=0;
    const draw=()=>{
      const dark=document.documentElement.classList.contains('dark'),t=clock.current;
      ctx.clearRect(0,0,w,h);
      const rgb=dark?'52,211,153':'5,115,93';
      const cyan=dark?'34,211,238':'14,116,144';
      // Edge-lit emerald haze keeps the hacker palette quiet behind the copy.
      for(let i=0;i<3;i++) {
        const x=i%2?w*.95:w*.03,y=h*(.15+i*.35)+Math.sin(t*.1+i)*50;
        const r=Math.max(w*.3,h*.4),g=ctx.createRadialGradient(x,y,0,x,y,r);
        g.addColorStop(0,`rgba(${i===1?cyan:rgb},${dark?.1:.085})`);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);
      }
      // Deterministic code streams, concentrated at the edges rather than over the text.
      const glyphs='01{}[]<>/+=:;ABCDEF',size=w<640?21:25;
      ctx.font='11px ui-monospace, Menlo, monospace';ctx.textAlign='left';
      for(let c=0;c<Math.ceil(w/size);c++) {
        if(c%3===1)continue;
        const x=c*size+7,edge=Math.abs(x/w-.5)*2;
        const strength=.025+Math.pow(edge,3)*.22;
        const head=((t*(19+(c*13)%24)+c*173.4+scroll*.04)%(h+260))-50;
        for(let k=0;k<10;k++) {
          const y=head-k*18;if(y<0||y>h)continue;
          ctx.fillStyle=`rgba(${k===0?cyan:rgb},${strength*(1-k/11)})`;
          ctx.fillText(glyphs[(c*17+k*7+Math.floor(t*2))%glyphs.length],x,Math.floor(y/18)*18);
        }
      }
      // Sparse circuit traces carry a packet of light down either side.
      for(let i=0;i<4;i++) {
        const left=i%2===0,x=left?20+i*11:w-20-i*11,y=70+i*95;
        ctx.strokeStyle=`rgba(${cyan},${dark?.12:.1})`;ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+55);ctx.lineTo(x+(left?24:-24),y+79);ctx.lineTo(x+(left?24:-24),h-60);ctx.stroke();
        const py=y+((t*28+i*75)%Math.max(1,h-y-70));
        ctx.fillStyle=`rgba(${rgb},.45)`;ctx.fillRect(x-1,py,2,8);
      }
      // A slow scan passes through the scene without flashing.
      const sy=(t*24)%(h+120)-60,scan=ctx.createLinearGradient(0,sy-40,0,sy+3);
      scan.addColorStop(0,'transparent');scan.addColorStop(.95,`rgba(${cyan},${dark?.025:.018})`);scan.addColorStop(1,'transparent');
      ctx.fillStyle=scan;ctx.fillRect(0,sy-40,w,44);
      if(w>1000) {
        ctx.save();ctx.translate(w-24,h*.38);ctx.rotate(-Math.PI/2);
        ctx.fillStyle=`rgba(${rgb},.35)`;ctx.font='10px ui-monospace, Menlo, monospace';
        const status=['SYSTEM ONLINE / AGENT WORKFLOWS','MCP CONNECTED / TOOLS READY','RETRIEVAL ACTIVE / CONTEXT FOUND'][Math.floor(t/9)%3];
        ctx.fillText(status,0,0);ctx.restore();
      }
    };
    const tick=(now:number)=>{
      if(document.hidden||paused||media.matches)return;
      clock.current+=Math.min((now-last)/1000,.06);last=now;
      if(now-painted>40){draw();painted=now;}
      frame=requestAnimationFrame(tick);
    };
    const sync=()=>{cancelAnimationFrame(frame);draw();if(!document.hidden&&!paused&&!media.matches){last=performance.now();frame=requestAnimationFrame(tick);}};
    const resize=()=>{w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);el.width=w*dpr;el.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw();};
    const onScroll=()=>{scroll=scrollY;};
    const theme=new MutationObserver(sync);theme.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    resize();sync();addEventListener('resize',resize);addEventListener('scroll',onScroll,{passive:true});document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);
    return ()=>{cancelAnimationFrame(frame);theme.disconnect();removeEventListener('resize',resize);removeEventListener('scroll',onScroll);document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync);};
  },[paused]);
  return <>
    <canvas ref={canvas} aria-hidden="true" className="fixed inset-0 w-full h-full pointer-events-none -z-[8]" />
    <button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused} className="fixed bottom-3 right-3 z-40 rounded-full border border-border bg-background/80 px-3 py-2 text-[10px] text-muted-foreground backdrop-blur-md hover:text-foreground">{paused?'Play background':'Pause background'}</button>
  </>;
}
