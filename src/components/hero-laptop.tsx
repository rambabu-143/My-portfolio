'use client';
import { useEffect, useRef } from "react";
import { experiences } from "./experience";

const MONO = "ui-monospace, Menlo, monospace";
const NAMES = ["code", "voice", "music", "game", "experience"];
const CYCLE = 4; // the first four screens rotate; "experience" only shows while the camera zooms into the screen
const SECONDS = [13, 9, 9, 9, Infinity]; // how long each screen stays before the laptop moves on to the next
const CODE = [
  "import asyncio",
  "from livekit.agents import Agent, tool",
  "",
  "# voice agent: STT -> LLM -> TTS in under 400ms",
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
const tri = (x: number) => { const m = ((x % 2) + 2) % 2; return m < 1 ? m : 2 - m; }; // 0..1..0 bounce

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
  if (zaya && ph < 5.4) { ctx.fillStyle = "#e3b341"; ctx.fillText("reply in 312 ms", W - 260, 98); }
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

// music player: spinning vinyl, equalizer, moving progress bar
function paintMusic(ctx: CanvasRenderingContext2D, t: number) {
  const cx = 200, cy = 280;
  const bg = ctx.createLinearGradient(cx - 150, cy - 150, cx + 150, cy + 150);
  bg.addColorStop(0, "#7c3aed"); bg.addColorStop(1, "#ec4899");
  ctx.fillStyle = bg; ctx.fillRect(cx - 150, cy - 150, 300, 300);
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 2.2);
  ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(0, 0, 128, 0, 7); ctx.fill();
  ctx.strokeStyle = "#2a2a2a"; ctx.lineWidth = 2;
  for (let r = 40; r < 126; r += 12) { ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); }
  ctx.fillStyle = "#58a6ff"; ctx.beginPath(); ctx.arc(0, 0, 34, 0, 7); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.fillRect(-4, -34, 8, 16); // marker so the spin is visible
  ctx.restore();
  ctx.font = `bold 40px ${MONO}`; ctx.fillStyle = "#e6edf3"; ctx.fillText("Lo-fi Coding Beats", 400, 160);
  ctx.font = `24px ${MONO}`; ctx.fillStyle = "#8b949e"; ctx.fillText("focus · now playing", 400, 200);
  for (let i = 0; i < 24; i++) { // equalizer
    const h = 14 + (0.5 + 0.5 * Math.sin(t * 7 + i * 0.9) * Math.sin(t * 2.3 + i * 0.4)) * 150;
    ctx.fillStyle = i % 2 ? "#ec4899" : "#7c3aed"; ctx.fillRect(400 + i * 25, 400 - h, 16, h);
  }
  const p = (t * 0.06) % 1;
  ctx.fillStyle = "#30363d"; ctx.fillRect(60, 500, 904, 8);
  ctx.fillStyle = "#58a6ff"; ctx.fillRect(60, 500, 904 * p, 8); ctx.beginPath(); ctx.arc(60 + 904 * p, 504, 11, 0, 7); ctx.fill();
  const sec = Math.floor(p * 187);
  ctx.font = `20px ${MONO}`; ctx.fillStyle = "#8b949e"; ctx.fillText(`${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`, 60, 540); ctx.fillText("3:07", 905, 540);
  ctx.fillStyle = "#e6edf3"; ctx.fillRect(485, 560, 12, 40); ctx.fillRect(515, 560, 12, 40); // pause icon
  ctx.beginPath(); ctx.moveTo(420, 580); ctx.lineTo(450, 562); ctx.lineTo(450, 598); ctx.fill();
  ctx.beginPath(); ctx.moveTo(590, 580); ctx.lineTo(560, 562); ctx.lineTo(560, 598); ctx.fill();
}

// pong that plays itself: ball and paddles are pure functions of time
function paintGame(ctx: CanvasRenderingContext2D, t: number) {
  const L = 70, R = W - 70, T = 110, B = H - 50, tt = t + 16;
  const ball = (u: number) => [L + 16 + tri(u * 0.5) * (R - L - 32), T + 8 + tri(u * 0.83 + 0.2) * (B - T - 16)];
  ctx.strokeStyle = "#7ee787"; ctx.lineWidth = 4; ctx.strokeRect(L - 20, T - 16, R - L + 40, B - T + 32);
  ctx.setLineDash([14, 14]); ctx.beginPath(); ctx.moveTo(W / 2, T - 16); ctx.lineTo(W / 2, B + 16); ctx.stroke(); ctx.setLineDash([]);
  const [bx, by] = ball(tt);
  for (let i = 5; i > 0; i--) { const [x, y] = ball(tt - i * 0.04); ctx.fillStyle = `rgba(126,231,135,${0.1 * (6 - i)})`; ctx.fillRect(x - 8, y - 8, 16, 16); }
  ctx.fillStyle = "#fff"; ctx.fillRect(bx - 8, by - 8, 16, 16);
  const pad = (x: number, phase: number) => { const y = Math.min(B - 45, Math.max(T + 45, by + Math.sin(tt * 3 + phase) * 26)); ctx.fillStyle = "#58a6ff"; ctx.fillRect(x, y - 45, 14, 90); };
  pad(L - 18, 0); pad(R + 4, 2);
  ctx.font = `bold 56px ${MONO}`; ctx.fillStyle = "#e6edf3";
  ctx.fillText(String(Math.floor((tt * 0.5 + 1) / 2)), W / 2 - 110, 90); ctx.fillText(String(Math.floor(tt * 0.5 / 2)), W / 2 + 70, 90);
  ctx.font = `20px ${MONO}`; ctx.fillStyle = "#484f58"; ctx.fillText("PONG · auto-play", 30, 98);
}

// final screen: the zoom lands here. Each job is a dropdown: click a row to open it (one open at a time).
const exOpen = experiences.map(() => 1); // 0..1 openness per job, animated; all open on first visit
const exWant = experiences.map(() => true); // which jobs are open; click toggles one
let exScale = 1; // content is shrunk to fit when several jobs are open
let exRows: [number, number][] = []; // y-range of each row in the last paint (in scaled content space), for click hit-testing
const EX_TOP = 116;
const exSettled = () => exOpen.every((v, i) => Math.abs(v - (exWant[i] ? 1 : 0)) < 0.01);
const wrapCache: string[][] = [];
function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number) {
  const out: string[] = []; let line = "";
  for (const w of text.split(" ")) {
    if (ctx.measureText(line + w).width > maxW && line) { out.push(line.trimEnd()); line = ""; }
    line += w + " ";
  }
  out.push(line.trimEnd());
  if (out.length > maxLines) { out.length = maxLines; out[maxLines - 1] = out[maxLines - 1].replace(/.{0,2}$/, "…"); }
  return out;
}
// the page's dark-mode glass: a black field with soft, low colour behind frosted cards (same tokens as .glass in globals.css)
function glassBg(ctx: CanvasRenderingContext2D, t: number) {
  const d = Math.min(t, 3) / 3; // drifts while the zoom lands, then holds (the screen stops repainting once settled)
  ctx.fillStyle = "#000"; ctx.fillRect(0, 56, W, H - 56);
  const blob = (x: number, y: number, r: number, c: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, c); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 56, W, H - 56);
  };
  blob(90 + d * 60, 200 + d * 80, 460, "rgba(30,90,200,0.2)");
  blob(940 - d * 70, 360 - d * 60, 480, "rgba(110,60,190,0.16)");
  blob(320 + d * 80, 620 - d * 70, 440, "rgba(10,120,150,0.15)");
}
function glassCard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const r = 18;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.65)"; ctx.shadowBlur = 28; ctx.shadowOffsetY = 12; // drop shadow under the glass
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.fill();
  ctx.restore();
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  const sheen = ctx.createLinearGradient(x, y, x + w * 0.5, y + h * 0.9); // diagonal sheen fading out by 45%
  sheen.addColorStop(0, "rgba(255,255,255,0.1)"); sheen.addColorStop(0.45, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1.2; ctx.stroke();
  // bright top edge, like the inset highlight on .glass
  ctx.beginPath(); ctx.moveTo(x + r, y + 0.8); ctx.lineTo(x + w - r, y + 0.8);
  ctx.strokeStyle = "rgba(255,255,255,0.28)"; ctx.lineWidth = 1.2; ctx.stroke();
}
function paintExperience(ctx: CanvasRenderingContext2D, t: number) {
  glassBg(ctx, t);
  const TX = 290, ROW = 62, LH = 20; // text column x, closed-row height, bullet line height
  ctx.font = `bold 40px ${MONO}`; ctx.fillStyle = "#e6edf3"; ctx.fillText("Experience", 40, 92);
  ctx.font = `20px ${MONO}`; ctx.fillStyle = "#484f58"; ctx.fillText("01", W - 70, 92);
  ctx.font = `16px ${MONO}`;
  exOpen.forEach((v, i) => { exOpen[i] += ((exWant[i] ? 1 : 0) - v) * 0.22; });
  const heights = experiences.map((e, i) => ROW + (22 + (wrapCache[i] ??= e.bullets.flatMap((b) => wrap(ctx, b, 670, 9).map((l, k) => (k === 0 ? "▸ " : "   ") + l))).length * LH) * exOpen[i]);
  const total = heights.reduce((a, h) => a + h + 10, 0);
  exScale = Math.min(1, (H - EX_TOP - 14) / total); // shrink so every open dropdown stays on the screen
  ctx.save(); ctx.translate(0, EX_TOP); ctx.scale(exScale, exScale);
  let y = 0; exRows = []; const Wl = W / exScale; // content space is shrunk, so rows are drawn wider to still span the screen
  experiences.forEach((e, i) => {
    ctx.font = `16px ${MONO}`;
    const bl = wrapCache[i], o = exOpen[i], h = heights[i];
    const a = Math.min(1, Math.max(0, (t - 0.1 - i * 0.15) / 0.35));
    exRows.push([y, y + h]);
    ctx.globalAlpha = a;
    glassCard(ctx, 30, y, Wl - 60, h);
    ctx.font = `16px ${MONO}`; ctx.fillStyle = "#8b949e"; ctx.fillText(e.duration, 50, y + 36);
    ctx.font = `bold 24px ${MONO}`; ctx.fillStyle = "#e6edf3"; ctx.fillText(e.company, TX, y + 28);
    ctx.font = `16px ${MONO}`; ctx.fillStyle = "#8b949e"; ctx.fillText(e.role, TX, y + 50);
    ctx.save(); ctx.translate(Wl - 62, y + 31); ctx.rotate(o * Math.PI / 2); // chevron turns down when open
    ctx.fillStyle = "#58a6ff"; ctx.beginPath(); ctx.moveTo(-6, -9); ctx.lineTo(8, 0); ctx.lineTo(-6, 9); ctx.fill(); ctx.restore();
    if (o > 0.02) {
      ctx.save(); ctx.beginPath(); ctx.roundRect(30, y + ROW, Wl - 60, h - ROW, 18); ctx.clip();
      ctx.globalAlpha = a * o; ctx.fillStyle = "#79c0ff"; ctx.font = `16px ${MONO}`;
      bl.forEach((l, k) => ctx.fillText(l, TX, y + ROW + 18 + k * LH));
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    y += h + 10;
  });
  ctx.restore();
}

type Scr = { tab: number; n: number; t: number; t0?: number }; // which screen, typed chars, seconds since it appeared
const content = (ctx: CanvasRenderingContext2D, s: Scr) =>
  [() => paintCode(ctx, s.n), () => paintVoice(ctx, s.t), () => paintMusic(ctx, s.t), () => paintGame(ctx, s.t), () => paintExperience(ctx, s.t)][s.tab]();

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
      let zt = 0, z = 0, zin = false;
      const onScroll = () => {
        if (!hero || reduce) return;
        const r = hero.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        hero.style.setProperty("--hp", String(p));
        const copy = hero.querySelector<HTMLElement>(".hero-copy");
        if (copy) copy.style.pointerEvents = p > 0.2 ? "none" : "";
        const x = Math.min(1, Math.max(0, (p - 0.08) / 0.62));
        zt = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // click the screen to switch tab
      let shown = -1, tab = 0, t0 = 0, time = 0, typedNow = 0;
      let prev: Scr | null = null;
      const SLIDE = 0.55;
      const pressed: { k: number; until: number }[] = [];
      const go = (next: number) => { prev = { tab, n: typedNow, t: 0, t0 }; tab = next; t0 = time; };
      scene.onPointerObservable.add((pi) => {
        // where on the screen texture (logical 1024x640) is the pointer? null if it is not over the screen
        const at = (info: typeof pi.pickInfo) => {
          if (!info?.hit || info.pickedMesh !== screen) return null;
          const uv = info.getTextureCoordinates();
          return uv ? { x: uv.x * 1024, y: (1 - uv.y) * 640 } : null;
        };
        const rowAt = (q: { x: number; y: number } | null) => (q && tab === 4 && !(prev && time - t0 < SLIDE) ? exRows.findIndex(([a, b]) => (q.y - EX_TOP) / exScale >= a && (q.y - EX_TOP) / exScale <= b) : -1);
        const tabAt = (q: { x: number; y: number } | null) => (q && !(z > 0.05 || tab === 4) && q.y < 56 && q.x >= 140 && q.x < 140 + CYCLE * 130 ? Math.floor((q.x - 140) / 130) : -1); // locked on the experience screen; experience tab itself is never a click target
        if (pi.type === PointerEventTypes.POINTERMOVE) {
          const q = at(scene.pick(scene.pointerX, scene.pointerY));
          canvas.style.cursor = q && (tabAt(q) >= 0 || rowAt(q) >= 0 || z < 0.05) ? "pointer" : "default";
        } else if (pi.type === PointerEventTypes.POINTERPICK) {
          const q = at(pi.pickInfo), i = tabAt(q);
          if (i >= 0) { if (i !== tab) go(i); } // tab bar: jump straight to that screen
          else if (rowAt(q) >= 0) exWant[rowAt(q)] = !exWant[rowAt(q)]; // job row: open / close its dropdown (several can be open)
          else if (q && tab !== 4 && z < 0.05) go((tab + 1) % CYCLE); // elsewhere on the screen: next screen
        }
      });

      let mx = 0, my = 0;
      const onMove = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
      window.addEventListener("pointermove", onMove, { passive: true });

      scene.onBeforeRenderObservable.add(() => {
        const dt = Math.min(engine.getDeltaTime() / 1000, 0.05);
        time += dt;
        const open = reduce ? 1 : Math.min(1, time / 1.4);
        const e = 1 - Math.pow(1 - open, 3);
        hinge.rotation.x = -1.55 + (0.3 + 1.55) * e; // closed flat over keyboard -> open, leaning back
        const t = reduce ? 0 : Math.sin(time * 0.9) * 0.12;
        z += (zt - z) * Math.min(1, dt * 6);
        laptop.position.y = -0.5 + t * (1 - z);
        world.rotation.y += ((-0.35 + mx * 0.6) * (1 - z) - world.rotation.y) * Math.min(1, dt * 3);
        world.rotation.x += (my * 0.25 * (1 - z) - world.rotation.x) * Math.min(1, dt * 3);
        // camera flies from the start pose to a spot straight in front of the screen
        screen.computeWorldMatrix(true);
        const sp = screen.getAbsolutePosition(), nrm = Vector3.TransformNormal(new Vector3(0, 0, -1), screen.getWorldMatrix()).normalize();
        const half = 2 * Math.tan(cam.fov / 2), dist = Math.max(2.3 / half, 3.7 / (half * engine.getAspectRatio(cam))) * 1.04; // whole screen visible at any window shape
        cam.position.copyFrom(Vector3.Lerp(S0, sp.add(nrm.scale(dist)), z));
        cam.setTarget(Vector3.Lerp(T0, sp, z));

        // screens follow each other automatically (click also advances); code types out, the rest animate
        if (z > 0.2 && !zin) { zin = true; go(4); }
        else if (z < 0.1 && zin) { zin = false; if (tab === 4) go(0); }
        else if (!reduce && z < 0.05 && time - t0 > SECONDS[tab]) go((tab + 1) % CYCLE);
        const typeFrom = Math.max(t0 + (t0 > 0 ? SLIDE : 0), 1.4);
        const typed = reduce ? TOTAL : Math.min(TOTAL, Math.max(0, Math.floor((time - typeFrom) * 35)));
        const sliding = prev !== null && time - t0 < SLIDE;
        const f = Math.floor(time * 30);
        const still = tab === 4 && !sliding && time - t0 > 1.6 && exSettled(); // experience screen is static once its rows have faded in
        if (f !== shown && !(still && shown === -2)) {
          if (tab === 0 && typed !== typedNow) { // code: a random key lands per typed char (sometimes two)
            pressed.push({ k: rndKey(), until: time + 0.14 });
            if (Math.random() < 0.3) pressed.push({ k: rndKey(), until: time + 0.14 });
          } else if (tab === 3 && !sliding) { // game: only arrow keys; up/down held to match the paddle, left/right flicked now and then
            const dn = ((((time - t0 + 16) * 0.83 + 0.2) % 2) + 2) % 2 < 1;
            pressed.push({ k: dn ? DOWN : UP, until: time + 0.05 });
            if (Math.random() < 0.04) pressed.push({ k: Math.random() < 0.5 ? LEFT : RIGHT, until: time + 0.14 });
          } // voice and music: no key presses
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

  return <canvas ref={ref} aria-hidden="true" className="hidden lg:block absolute inset-0 h-full w-full outline-none" />;
};

export default HeroLaptop;
