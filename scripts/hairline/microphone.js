const {Cam,fit,proj,facing,rings,prism,solid,put,mk,seg,poly,rrect,spring,stepS,pointer,register,disposer,clamp} = HL;
function mount({stage,svg,read},value) {
  const bag=disposer(), C=Cam(45,.5,1.8);
  fit(C,[[-35,-28,0],[35,28,0],[-25,-18,110],[25,18,135]],200,166);
  const P=proj(C), front=facing(C), g=mk('g',{},svg);
  const box=(x0,y0,x1,y1,r,z0,z1)=>{const [a,b]=rings(x0,y0,x1,y1,r,.8),el=solid(g);put(el,prism(P,front,a,b,z0,z1));return el;};
  box(-32,-24,32,24,12,0,5);box(-4,-4,4,4,3,5,38);
  // A rounded capsule, its suspension shoulders, and a physical grille.
  box(-24,-13,-19,13,2,36,75);box(19,-13,24,13,2,36,75);
  box(-22,-13,22,13,3,34,39);
  box(-18,-12,18,12,11,46,113);
  const slots=[];
  for(let i=0;i<9;i++) slots.push({el:mk('path',{class:'nf lo'},g),sp:spring(0),last:NaN});
  const button=mk('path',{class:'nf hi',d:poly(rrect(-4,57,4,65,3,6).map(q=>P(q.u,12.1,q.v)))},g);
  let strength=value, over=null;
  const draw=()=>slots.forEach((s,i)=>{if(s.last===s.sp.x)return;s.last=s.sp.x;const z=73+i*4;const width=10+s.sp.x;s.el.setAttribute('d',seg(P(-width,12.2,z),P(width,12.2,z)));});
  const B=register(stage,dt=>{let moving=false;slots.forEach(s=>{if(stepS(s.sp,dt))moving=true;});draw();return moving;});bag.add(B.unregister);
  function target(p){over=p;const center=p?clamp((215-p[1])/7,0,8):4;slots.forEach((s,i)=>{s.sp.t=p?strength*Math.max(0,1-Math.abs(i-center)/4):0;s.el.classList.toggle('hi',!!p&&i===Math.round(center));});button.classList.toggle('hi',!p);read.textContent=p?'listening':'rest';B.wake();}
  bag.add(pointer(stage,{move:target,leave:()=>target(null)}));bag.add(()=>svg.replaceChildren());draw();
  return {set:v=>{strength=v;target(over);},destroy:bag.dispose};
}
hairline({name:'microphone',means:'A desk microphone opens its grille around your voice, represented by the pointer.',rules:[1,3,4,7,9],range:[1,4,6],tour:[[185,120],[220,155],[195,195],null],mount});
