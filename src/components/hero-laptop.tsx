'use client';
import { useEffect, useRef } from "react";

import { paintAtmosphere } from "./atmosphere-painter";

const MONO = "ui-monospace, Menlo, monospace";
const NAMES = ["code", "voice", "GraphRAG", "MCP CLI"];
const CYCLE = NAMES.length; // Exactly four screens at every scroll position.
const SECONDS = [13, 9, 9, 9]; // how long each screen stays before the laptop moves on to the next
const CODE = [
  "import asyncio",
  "from livekit.agents import Agent, tool",
  "",
  "# voice agent: real-time STT -> LLM -> TTS",
  "class Zaya(Agent):",
  "    @tool",
  "    async def book_service(self, slot: str):",
  '        """Book a dealership service slot."""',
  "        return await dms.create(slot)",
  "",
  "    async def on_turn(self, text: str):",
  "        reply = await self.llm.chat(text)",
  "        await self.tts.say(reply)",
];
const TOKEN = /(#.*$|"""[^"]*"""|"[^"]*"|\b(?:import|from|class|async|def|await|return)\b|@\w+|\bself\b|\b\w+(?=\())/g;
const colorOf = (t: string) =>
  t.startsWith("#") ? "#6e7681" : t.startsWith('"') ? "#a5d6ff" : t.startsWith("@") ? "#d2a8ff"
  : t === "self" ? "#ffa657" : /^(import|from|class|async|def|await|return)$/.test(t) ? "#ff7b72" : "#79c0ff";
const TOTAL = CODE.reduce((n, l) => n + l.length + 1, 0);
const W = 1024, H = 640;

function chrome(ctx: CanvasRenderingContext2D, tab: number) {
  ctx.fillStyle = "#0d1117"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#161b22"; ctx.fillRect(0, 0, W, 56);
  ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(34 + i * 30, 28, 9, 0, 7); ctx.fill(); });
  ctx.font = `24px ${MONO}`;
  NAMES.forEach((name, i) => {
    const x = 150 + i * 130;
    ctx.fillStyle = i === tab ? "#e6edf3" : "#6e7681"; ctx.fillText(name, x, 36);
    if (i === tab) { ctx.fillStyle = "#58a6ff"; ctx.fillRect(x, 50, ctx.measureText(name).width, 4); }
  });
}

function paintCode(ctx: CanvasRenderingContext2D, n: number) {
  ctx.font = `30px ${MONO}`;
  let left = n;
  for (let i = 0; i < CODE.length && left >= 0; i++) {
    const y = 110 + i * 43, line = CODE[i].slice(0, left);
    ctx.fillStyle = "#484f58"; ctx.fillText(String(i + 1).padStart(2, " "), 20, y);
    let x = 80, last = 0;
    const draw = (str: string, c: string) => { ctx.fillStyle = c; ctx.fillText(str, x, y); x += ctx.measureText(str).width; };
    for (const m of Array.from(line.matchAll(TOKEN))) {
      draw(line.slice(last, m.index), "#e6edf3");
      draw(m[0], colorOf(m[0]));
      last = m.index! + m[0].length;
    }
    draw(line.slice(last), "#e6edf3");
    left -= CODE[i].length + 1;
    if (left < 0) { ctx.fillStyle = "#58a6ff"; ctx.fillRect(x + 2, y - 28, 16, 34); } // cursor
  }
}

// voice agent: a caller speaks, then Zaya answers; orb + waveform follow whoever talks
function paintVoice(ctx: CanvasRenderingContext2D, t: number) {
  const ph = t % 6, zaya = ph > 2.5;
  const col = zaya ? "#58a6ff" : "#7ee787";
  const amp = (0.55 + 0.45 * Math.sin(t * 13) * Math.sin(t * 5.3)) * (zaya ? 1 : 0.55);
  ctx.font = `22px ${MONO}`; ctx.fillStyle = "#7ee787"; ctx.fillText("● live call", 30, 98);
  ctx.fillStyle = "#8b949e"; ctx.fillText("Zaya · voice agent", 190, 98);
  if (zaya && ph < 5.4) { ctx.fillStyle = "#e3b341"; ctx.fillText("illustrative call", W - 260, 98); }
  const cx = W / 2, cy = 275;
  for (let i = 0; i < 3; i++) { // expanding rings
    const f = ((t * 0.7 + i / 3) % 1);
    ctx.strokeStyle = col; ctx.globalAlpha = (1 - f) * 0.5; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(cx, cy, 70 + f * 90 * (0.5 + amp), 0, 7); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const r = 62 + amp * 26, g = ctx.createRadialGradient(cx, cy, 4, cx, cy, r);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.35, col); g.addColorStop(1, "rgba(13,17,23,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
  ctx.fillStyle = col;
  for (let i = 0; i < 44; i++) { // waveform
    const h = 8 + (0.5 + 0.5 * Math.sin(t * 9 + i * 0.6)) * 70 * amp * (0.5 + 0.5 * Math.sin(i * 0.3 + t));
    ctx.fillRect(110 + i * 19.5, 455 - h / 2, 11, h);
  }
  const who = zaya ? "Zaya" : "Caller", text = zaya ? "Sure! Does Thursday at 10 AM work for you?" : "Hi, I need to book a service for Thursday.";
  const k = zaya ? (ph - 2.5) / 2.6 : ph / 2.2;
  ctx.font = `bold 24px ${MONO}`; ctx.fillStyle = col; ctx.fillText(who, 50, 548);
  ctx.font = `28px ${MONO}`; ctx.fillStyle = "#e6edf3"; ctx.fillText(text.slice(0, Math.max(0, Math.floor(Math.min(1, k) * text.length))), 50, 592);
}

// Schematic screens keep the laptop focused on the work rather than employment history.
function panel(ctx: CanvasRenderingContext2D, title: string, subtitle: string) {
  ctx.fillStyle = "#0d1117"; ctx.fillRect(0, 56, W, H - 56);
  ctx.fillStyle = "#e6edf3"; ctx.font = `bold 40px ${MONO}`; ctx.fillText(title, 45, 125);
  ctx.fillStyle = "#8b949e"; ctx.font = `20px ${MONO}`; ctx.fillText(subtitle, 45, 165);
}
function paintGraph(ctx: CanvasRenderingContext2D, t: number) {
  panel(ctx, "Connected knowledge", "GraphRAG · vector search + entity relationships");
  ctx.save(); ctx.translate(0,185); paintAtmosphere(ctx,"knowledge",t,W,400); ctx.restore();
  ctx.fillStyle="#8b949e";ctx.font=`16px ${MONO}`;ctx.fillText("Illustrative · RAGAS + DeepEval evaluation",45,620);
}
function paintMcp(ctx: CanvasRenderingContext2D, t: number) {
  panel(ctx, "Tools that connect", "Go · Model Context Protocol · DeepEval");
  ctx.save(); ctx.translate(0,185); paintAtmosphere(ctx,"mcp",t,W,400);ctx.restore();
  ctx.fillStyle="#8b949e";ctx.font=`16px ${MONO}`;ctx.fillText("Illustrative · a runnable integration baseline",45,620);
}
type Scr = { tab: number; n: number; t: number; t0?: number }; // which screen, typed chars, seconds since it appeared
const content = (ctx: CanvasRenderingContext2D, s: Scr) =>
  [() => paintCode(ctx, s.n), () => paintVoice(ctx, s.t), () => paintGraph(ctx, s.t), () => paintMcp(ctx, s.t)][s.tab]();

// tab bar stays put; the content area slides the old screen out left while the new one comes in from the right
function paint(ctx: CanvasRenderingContext2D, cur: Scr, prev: Scr | null = null, p = 1) {
  ctx.save(); ctx.scale(2, 2); // texture is 2048x1280 so the full-screen zoom stays sharp
  chrome(ctx, cur.tab);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 56, W, H - 56); ctx.clip();
  if (prev && p < 1) {
    ctx.save(); ctx.translate(-p * W, 0); content(ctx, prev); ctx.restore();
    ctx.save(); ctx.translate((1 - p) * W, 0); content(ctx, cur); ctx.restore();
  } else content(ctx, cur);
  ctx.restore();
  ctx.restore();
}

// keyboard texture with one highlighted key
const UP = 54, LEFT = 67, DOWN = 68, RIGHT = 69; // arrow cluster: bottom-right inverted T
const GAPS = [53, 55];
const TYPING_KEYS = Array.from({ length: 70 }, (_, i) => i).filter((i) => !GAPS.includes(i) && i < UP);
const rndKey = () => TYPING_KEYS[Math.floor(Math.random() * TYPING_KEYS.length)];

function paintKeys(ctx: CanvasRenderingContext2D, hot: number[]) {
  ctx.fillStyle = "#0b0d12"; ctx.fillRect(0, 0, 512, 320);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 14; c++) {
    const k = r * 14 + c;
    if (GAPS.includes(k)) continue;
    const x = 10 + c * 35.5, y = 14 + r * 46, arrow = k >= UP && !GAPS.includes(k) && (k === UP || k >= LEFT);
    ctx.fillStyle = hot.includes(k) ? "#58a6ff" : "#1b2030";
    ctx.fillRect(x, y, 31, 40);
    if (arrow) { // little triangle on arrow keys
      const cx = x + 15.5, cy = y + 20, d = k === UP ? [0, -1] : k === DOWN ? [0, 1] : k === LEFT ? [-1, 0] : [1, 0];
      ctx.fillStyle = hot.includes(k) ? "#0b0d12" : "#6e7681";
      ctx.beginPath();
      ctx.moveTo(cx + d[0] * 9, cy + d[1] * 9);
      ctx.lineTo(cx - d[1] * 8 - d[0] * 7, cy + d[0] * 8 - d[1] * 7);
      ctx.lineTo(cx + d[1] * 8 - d[0] * 7, cy - d[0] * 8 - d[1] * 7);
      ctx.fill();
    }
  }
}

const HeroLaptop = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const requested = useRef<number | null>(null);
  const frozen = useRef(false);
  const activeScreen = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !window.matchMedia("(min-width: 1024px)").matches) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const [{ Engine }, { Scene }, { FreeCamera }, { Vector3, Color3, Color4 }, { TransformNode }, { MeshBuilder }, { StandardMaterial }, { HemisphericLight }, { DirectionalLight }, { DynamicTexture }, { PointerEventTypes }] =
        await Promise.all([
          import("@babylonjs/core/Engines/engine"),
          import("@babylonjs/core/scene"),
          import("@babylonjs/core/Cameras/freeCamera"),
          import("@babylonjs/core/Maths/math"),
          import("@babylonjs/core/Meshes/transformNode"),
          import("@babylonjs/core/Meshes/meshBuilder"),
          import("@babylonjs/core/Materials/standardMaterial"),
          import("@babylonjs/core/Lights/hemisphericLight"),
          import("@babylonjs/core/Lights/directionalLight"),
          import("@babylonjs/core/Materials/Textures/dynamicTexture"),
          import("@babylonjs/core/Events/pointerEvents"),
          import("@babylonjs/core/Culling/ray"),
        ]);
      if (disposed) return;

      const engine = new Engine(canvas, true, { alpha: true, powerPreference: "high-performance" }, false);
      const scene = new Scene(engine);
      engine.setHardwareScalingLevel(1 / Math.min(window.devicePixelRatio || 1, 2));
      scene.clearColor = new Color4(0, 0, 0, 0);
      // start pose: laptop sits on the right of a full-window canvas; scrolling flies the camera into its screen
      const S0 = new Vector3(-2.9, 1.8, -7.8), T0 = new Vector3(-2.9, 0.5, 0);
      const cam = new FreeCamera("cam", S0.clone(), scene);
      cam.setTarget(T0);
      new HemisphericLight("h", new Vector3(0, 1, -0.4), scene).intensity = 0.9;
      new DirectionalLight("d", new Vector3(-0.4, -1, 0.6), scene).intensity = 0.6;

      const metal = new StandardMaterial("metal", scene);
      metal.diffuseColor = new Color3(0.5, 0.52, 0.58); metal.specularColor = new Color3(0.6, 0.6, 0.7);
      const dark = new StandardMaterial("dark", scene);
      dark.diffuseColor = new Color3(0.06, 0.07, 0.09);

      // keyboard texture: grid of keys
      const kt = new DynamicTexture("kb", { width: 512, height: 320 }, scene);
      const kc = kt.getContext() as unknown as CanvasRenderingContext2D;
      paintKeys(kc, []); kt.update();
      const kbMat = new StandardMaterial("kbm", scene);
      kbMat.emissiveTexture = kt; kbMat.disableLighting = true;

      const world = new TransformNode("world", scene);
      const laptop = new TransformNode("laptop", scene);
      laptop.parent = world;
      const base = MeshBuilder.CreateBox("base", { width: 4, height: 0.14, depth: 2.7 }, scene);
      base.material = metal; base.parent = laptop;
      const keys = MeshBuilder.CreatePlane("keys", { width: 3.5, height: 1.5 }, scene);
      keys.material = kbMat; keys.parent = laptop; keys.rotation.x = Math.PI / 2; keys.position.set(0, 0.075, -0.2);
      const pad = MeshBuilder.CreateBox("pad", { width: 1.2, height: 0.01, depth: 0.6 }, scene);
      pad.material = dark; pad.parent = laptop; pad.position.set(0, 0.075, -0.95);
      const rim = MeshBuilder.CreateBox("rim", { width: 3.9, height: 0.02, depth: 2.6 }, scene);
      const rimMat = new StandardMaterial("rim", scene);
      rimMat.emissiveColor = new Color3(0.2, 0.45, 1); rimMat.disableLighting = true; rimMat.alpha = 0.9;
      rim.material = rimMat; rim.parent = laptop; rim.position.y = -0.09;

      // lid hinged at the back edge
      const hinge = new TransformNode("hinge", scene);
      hinge.parent = laptop; hinge.position.set(0, 0.07, 1.3);
      const lid = MeshBuilder.CreateBox("lid", { width: 4, height: 2.6, depth: 0.1 }, scene);
      lid.material = metal; lid.parent = hinge; lid.position.y = 1.3;
      const st = new DynamicTexture("scr", { width: 2048, height: 1280 }, scene);
      const sc = st.getContext() as unknown as CanvasRenderingContext2D;
      paint(sc, { tab: 0, n: 0, t: 0 }); st.update();
      const sm = new StandardMaterial("sm", scene);
      sm.emissiveTexture = st; sm.disableLighting = true;
      const screen = MeshBuilder.CreatePlane("screen", { width: 3.7, height: 2.3 }, scene);
      screen.material = sm; screen.parent = lid; screen.position.set(0, 0, -0.06);
      laptop.position.y = -0.5;

      // scroll through the pinned hero drives the zoom (zt = target, z = smoothed) and --hp for the text fade
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hero = document.getElementById("hero");
      let zt = 0, z = 0, progress = 0;
      const onScroll = () => {
        if (!hero || reduce) return;
        const r = hero.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        progress = p;
        hero.style.setProperty("--hp", String(p));
        const copy = hero.querySelector<HTMLElement>(".hero-copy");
        if (copy) copy.style.pointerEvents = p > 0.2 ? "none" : "";
        const x = Math.min(1, Math.max(0, (p - 0.04) / 0.85));
        zt = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // click the screen to switch tab
      let shown = -1, tab = 0, t0 = 0, time = 0, typedNow = 0;
      let prev: Scr | null = null;
      const SLIDE = 0.55;
      const pressed: { k: number; until: number }[] = [];
      let band = 0;
      const go = (next: number) => {
        if (next === tab) return;
        prev = { tab, n: typedNow, t: 0, t0 }; tab = next; t0 = time;
        shown = -1; activeScreen.current = next;
        canvas.dataset.activeTab = NAMES[next];
      };
      canvas.dataset.activeTab = NAMES[0];
      scene.onPointerObservable.add((pi) => {
        // where on the screen texture (logical 1024x640) is the pointer? null if it is not over the screen
        const at = (info: typeof pi.pickInfo) => {
          if (!info?.hit || info.pickedMesh !== screen) return null;
          const uv = info.getTextureCoordinates();
          return uv ? { x: uv.x * 1024, y: (1 - uv.y) * 640 } : null;
        };
        const tabAt = (q: { x: number; y: number } | null) => (q && q.y < 56 && q.x >= 140 && q.x < 140 + CYCLE * 130 ? Math.floor((q.x - 140) / 130) : -1); // The same four tabs remain available when zoomed in.
        if (pi.type === PointerEventTypes.POINTERMOVE) {
          const q = at(scene.pick(scene.pointerX, scene.pointerY));
          canvas.style.cursor = q && (tabAt(q) >= 0 || q.y >= 56) ? "pointer" : "default";
        } else if (pi.type === PointerEventTypes.POINTERPICK) {
          const q = at(pi.pickInfo), i = tabAt(q);
          if (i >= 0) { if (i !== tab) go(i); } // tab bar: jump straight to that screen
          else if (q && q.y >= 56) go((tab + 1) % CYCLE); // elsewhere on the screen: next screen
        }
      });

      let mx = 0, my = 0;
      const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
      window.addEventListener("pointermove", onMove, { passive: true });

      scene.onBeforeRenderObservable.add(() => {
        const dt = Math.min(engine.getDeltaTime() / 1000, 0.05);
        if (!frozen.current && !reduce) time += dt;
        else if (reduce) time = 6;
        if (requested.current !== null) { go(requested.current); requested.current = null; }
        const nextBand = Math.min(CYCLE - 1, Math.floor(progress * CYCLE));
        if (nextBand !== band) { band = nextBand; go(band); }
        const open = reduce ? 1 : Math.min(1, time / 1.4);
        const e = 1 - Math.pow(1 - open, 3);
        hinge.rotation.x = -1.55 + (0.3 + 1.55) * e; // closed flat over keyboard -> open, leaning back
        const t = reduce ? 0 : Math.sin(time * 0.9) * 0.12;
        z += (zt - z) * Math.min(1, dt * 6);
        laptop.position.y = -0.5 + t * (1 - z) + Math.sin(progress * Math.PI) * .3;
        world.rotation.z = reduce ? 0 : Math.sin(progress * Math.PI * 2) * .055;
        world.rotation.y += ((-0.35 + (reduce ? 0 : mx * 0.3) + Math.sin(progress * Math.PI) * .4) * (1 - z) - world.rotation.y) * Math.min(1, dt * 3);
        world.rotation.x += ((reduce ? 0 : my * 0.12 - Math.sin(progress * Math.PI) * .12) * (1 - z) - world.rotation.x) * Math.min(1, dt * 3);
        // camera flies from the start pose to a spot straight in front of the screen
        screen.computeWorldMatrix(true);
        const sp = screen.getAbsolutePosition(), nrm = Vector3.TransformNormal(new Vector3(0, 0, -1), screen.getWorldMatrix()).normalize();
        const half = 2 * Math.tan(cam.fov / 2), dist = Math.max(2.3 / half, 3.7 / (half * engine.getAspectRatio(cam))) * 1.16; // whole screen visible at any window shape
        cam.position.copyFrom(Vector3.Lerp(S0, sp.add(nrm.scale(dist)), z));
        cam.setTarget(Vector3.Lerp(T0, sp, z));

        // screens follow each other automatically (click also advances); code types out, the rest animate
        if (!reduce && !frozen.current && progress < .015 && time - t0 > SECONDS[tab]) go((tab + 1) % CYCLE);
        const typeFrom = Math.max(t0 + (t0 > 0 ? SLIDE : 0), 1.4);
        const typed = reduce ? TOTAL : Math.min(TOTAL, Math.max(0, Math.floor((time - typeFrom) * 35)));
        const sliding = prev !== null && time - t0 < SLIDE;
        const f = Math.floor(time * 30);
        const still = !sliding && ((tab === 0 && typed === TOTAL) || reduce || frozen.current);
        if (f !== shown && !(still && shown === -2)) {
          if (tab === 0 && typed !== typedNow) { // code: a random key lands per typed char (sometimes two)
            pressed.push({ k: rndKey(), until: time + 0.14 });
            if (Math.random() < 0.3) pressed.push({ k: rndKey(), until: time + 0.14 });
          }
          typedNow = typed;
          shown = still ? -2 : f;
          const p = sliding ? (() => { const x = (time - t0) / SLIDE; return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; })() : 1;
          const pv = prev as Scr | null;
          paint(sc, { tab, n: typed, t: time - t0 }, pv && { ...pv, t: time - pv.t0! }, p);
          st.update();
          for (let i = pressed.length - 1; i >= 0; i--) if (pressed[i].until < time) pressed.splice(i, 1);
          paintKeys(kc, pressed.map((x) => x.k)); kt.update();
        }
      });

      let running = false;
      const loop = () => scene.render();
      const set = (on: boolean) => { if (on !== running) { running = on; on ? engine.runRenderLoop(loop) : engine.stopRenderLoop(loop); } };
      set(!document.hidden);
      const onVis = () => set(!document.hidden);
      const onResize = () => engine.resize();
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("resize", onResize);

      cleanup = () => {
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
        engine.stopRenderLoop();
        scene.dispose();
        engine.dispose();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return <canvas
    ref={ref}
    tabIndex={0}
    role="img"
    aria-label="Interactive laptop with Code, Voice, GraphRAG and MCP CLI screens. Scroll to explore. Use left and right arrow keys to change screens and Space to pause motion."
    onKeyDown={(event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        requested.current = (activeScreen.current + (event.key === 'ArrowRight' ? 1 : CYCLE - 1)) % CYCLE;
      } else if (event.code === 'Space') {
        event.preventDefault(); frozen.current = !frozen.current;
      }
    }}
    className="hidden lg:block absolute inset-0 h-full w-full"
  />;
};

export default HeroLaptop;
