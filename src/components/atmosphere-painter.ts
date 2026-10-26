export type SceneKind = "voice" | "knowledge" | "mcp";
const TAU = Math.PI * 2;
const mono = 'ui-monospace, Menlo, monospace';
function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color); g.addColorStop(1, 'transparent');
  ctx.fillStyle = g; ctx.fillRect(x-r, y-r, r*2, r*2);
}
function card(ctx: CanvasRenderingContext2D, x: number, y: number, title: string, sub: string, color: string, width = 170) {
  ctx.fillStyle = '#101c30ee'; ctx.strokeStyle = color;
  ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(x-width/2, y-34, width, 68, 12); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#eef6ff'; ctx.font = `16px ${mono}`; ctx.textAlign = 'center'; ctx.fillText(title, x, y-3);
  ctx.fillStyle = '#91a7c3'; ctx.font = `12px ${mono}`; ctx.fillText(sub, x, y+18);
}
export function paintAtmosphere(ctx: CanvasRenderingContext2D, kind: SceneKind, t: number, width: number, height: number) {
  ctx.save(); ctx.scale(width/900, height/450);
  ctx.fillStyle = '#070d19'; ctx.fillRect(0,0,900,450);
  const color = kind === 'voice' ? '#67e8f9' : kind === 'knowledge' ? '#c4b5fd' : '#6ee7b7';
  // Soft fog lives behind all labels and geometry.
  for (let i=0;i<4;i++) {
    const x=150+i*210+Math.sin(t*.18+i*2)*85, y=240+Math.cos(t*.22+i)*85;
    glow(ctx,x,y,230,kind==='knowledge' ? '#7654b52b' : kind==='mcp' ? '#148b8528' : '#237aad30');
  }
  for(let i=0;i<38;i++) {
    const x=(i*149.7+t*(3+i%4))%900, y=40+(i*73.3)%370+Math.sin(t*.3+i)*9;
    ctx.globalAlpha=.15+.25*(.5+.5*Math.sin(t+i)); ctx.fillStyle=color;
    ctx.beginPath();ctx.arc(x,y,i%5===0?1.7:1,0,TAU);ctx.fill();
  }
  ctx.globalAlpha=1;
  if(kind==='voice') {
    const cx=450,cy=205;
    glow(ctx,cx,cy,150,'#38bdf843');
    for(let j=0;j<4;j++) {
      ctx.strokeStyle=color;ctx.globalAlpha=.8-j*.16;ctx.lineWidth=j===0?2:1;
      ctx.beginPath();
      for(let i=0;i<=180;i++) {
        const a=i/180*TAU, r=65+j*14+Math.sin(a*5+t*2.2+j)*5+Math.sin(a*9-t)*3;
        const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }ctx.stroke();
    }
    ctx.globalAlpha=1;card(ctx,185,210,'Caller','Streaming speech', '#34546e',170);card(ctx,715,210,'Zaya','Tools + voice', '#34546e',170);
    for(let i=0;i<45;i++) {
      const h=7+(1+Math.sin(i*.6+t*4))*14*(.5+.5*Math.sin(i*.18));
      ctx.fillStyle=color;ctx.fillRect(290+i*7,355-h/2,3,h);
    }
    ctx.fillStyle='#a4bad4';ctx.font=`13px ${mono}`;ctx.textAlign='center';
    ctx.fillText(Math.floor(t/4)%2===0?'“Can I book a service?”':'“Let me check the available slots.”',450,405);
  } else if(kind==='knowledge') {
    // A question illuminates a route through a document graph, then resolves an answer.
    const cycle=t%10;
    const nodes=[{x:300,y:105},{x:440,y:80},{x:555,y:145},{x:350,y:235},{x:490,y:255},{x:600,y:320},{x:310,y:355},{x:435,y:365}];
    const edges=[[0,1],[1,2],[0,3],[3,4],[2,4],[4,5],[3,6],[6,7],[7,5],[1,4]];
    const route=[[0,3],[3,4],[4,5]];
    edges.forEach(([a,b])=>{
      const on=route.some(([u,v])=>u===a&&v===b)&&cycle>2;
      ctx.strokeStyle=on?'#c4b5fd':'#66638655';ctx.lineWidth=on?2:1;
      ctx.beginPath();ctx.moveTo(nodes[a].x,nodes[a].y);ctx.lineTo(nodes[b].x,nodes[b].y);ctx.stroke();
    });
    route.forEach(([a,b],i)=>{
      if(cycle<2+i*.8)return;
      const f=Math.min(1,((cycle-2-i*.8)%2)/2),x=nodes[a].x+(nodes[b].x-nodes[a].x)*f,y=nodes[a].y+(nodes[b].y-nodes[a].y)*f;
      glow(ctx,x,y,25,'#c4b5fd88');ctx.fillStyle='#ede9fe';ctx.beginPath();ctx.arc(x,y,4,0,TAU);ctx.fill();
    });
    nodes.forEach((p,i)=>{
      const active=[0,3,4,5].includes(i)&&cycle>2;
      glow(ctx,p.x,p.y,active?35:18,active?'#a78bfa44':'#a78bfa11');
      ctx.fillStyle=active?'#c4b5fd':'#43425f';ctx.beginPath();ctx.arc(p.x,p.y,active?9:6,0,TAU);ctx.fill();
      ctx.textAlign='center';ctx.font=`11px ${mono}`;ctx.fillStyle='#aeb5ce';ctx.fillText(['Policy','Product','Team','Entity','Context','Evidence','Guide','Notes'][i],p.x,p.y+25);
    });
    card(ctx,120,220,'Question','Find related context','#8b7eb388',180);
    ctx.strokeStyle='#c4b5fd66';ctx.setLineDash([3,6]);ctx.beginPath();ctx.moveTo(210,220);ctx.lineTo(300,105);ctx.moveTo(600,320);ctx.lineTo(690,220);ctx.stroke();ctx.setLineDash([]);
    card(ctx,785,220,cycle>6?'Answer ready':'Assembling…',cycle>6?'Connected evidence':'Following relationships','#c4b5fd88',190);
    ctx.fillStyle='#c4b5fd';ctx.textAlign='center';ctx.font=`13px ${mono}`;ctx.fillText(cycle<2?'01 / retrieve':cycle<6?'02 / traverse relationships':'03 / assemble context',450,425);
  } else {
    // A terminal types the command while a generated project tree builds beside it.
    const cycle=t%12;
    ctx.fillStyle='#0b1526ee';ctx.strokeStyle='#42697b';ctx.beginPath();ctx.roundRect(55,65,790,325,16);ctx.fill();ctx.stroke();
    ctx.strokeStyle='#31485c';ctx.beginPath();ctx.moveTo(55,105);ctx.lineTo(845,105);ctx.moveTo(470,105);ctx.lineTo(470,390);ctx.stroke();
    ctx.textAlign='left';ctx.fillStyle='#8ba6c3';ctx.font=`12px ${mono}`;ctx.fillText('TERMINAL / illustrative command',78,90);ctx.fillText('GENERATED PROJECT',495,90);
    const command='$ scaffold dealership';
    ctx.fillStyle='#6ee7b7';ctx.font=`18px ${mono}`;ctx.fillText(command.slice(0,Math.floor(cycle*12)),80,155);
    if(cycle<2){ctx.fillRect(80+Math.min(command.length,Math.floor(cycle*12))*10.8,139,9,20);}
    const logs=['Creating project structure','Registering tools & resources','Wiring configuration','Runnable baseline ready'];
    logs.forEach((line,i)=>{
      if(cycle<2+i*1.1)return;
      ctx.fillStyle=i===3?'#6ee7b7':'#b8cce0';ctx.font=`14px ${mono}`;ctx.fillText('✓ '+line,80,210+i*36);
    });
    const files=['dealership/','  tools/','    inventory.go','  resources/','    documents.go','  config/','    server.json','  main.go'];
    files.forEach((line,i)=>{
      const enter=Math.max(0,Math.min(1,(cycle-1.8-i*.45)*3));if(!enter)return;
      ctx.globalAlpha=enter;ctx.fillStyle=i===0?'#6ee7b7':line.includes('.')?'#b7cde1':'#7da6c4';ctx.font=`15px ${mono}`;
      ctx.fillText(line,498+(1-enter)*18,145+i*28);ctx.globalAlpha=1;
    });
    glow(ctx,750,355,90,cycle>6?'#34d39933':'#34d39911');
    ctx.fillStyle='#7fa6bc';ctx.textAlign='center';ctx.font=`12px ${mono}`;ctx.fillText('Go → MCP scaffolding → integration-specific logic',450,425);
  }
  ctx.restore();
}
