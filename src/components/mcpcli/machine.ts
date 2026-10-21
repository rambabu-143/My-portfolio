import * as k from "../iso/iso-kit";
import type { Plan } from "../iso/iso-kit";
import { clamp, drawKit, ease, lerp, seg } from "../machine/draw";
import type { Item, Machine, Tick } from "../machine/engine";

const WIDTH = 760;
const HEIGHT = 460;
const AZIMUTH = 55;

export const KINDS = ["a tool", "a resource", "a prompt"];

const BASE: Plan = { x: -206, y: -118, w: 416, d: 234, r: 10 };
const BASE_H = 9;
const FOOT_H = 5;
const MOD = { w: 34, h: 12 };
const STACK_Z = 4;
const PAL_X = [-60, -20, 20, 60];
const PAL_Y = -76;
const PAL_TOP = 4;
const CRANE_X = 76;
const CRANE_Z = 84;
const HOME = { x: 0, y: -40 };
const TRAVEL_Z = 56;
const FOUND: Plan = { x: -21, y: -21, w: 42, d: 42, r: 3 };
const DOOR_X = MOD.w / 2;
const TERM: Plan = { x: -190, y: 14, w: 40, d: 32, r: 3 };
const TERM_H = 14;
const ROBOT_STOP = 54;
const ROBOT_FAR = 150;
const SEL = { x: -110, y: 60 };
const FIRST = 1.0;
const CYCLE = 1.9;
const END = 14.4;
const LEAD = 0.8;

const P = k.fitProjection(
  [...k.boxCorners(BASE, -BASE_H - FOOT_H, 0), ...k.boxCorners({ x: -84, y: -104, w: 168, d: 142, r: 0 }, 0, CRANE_Z + 18)],
  WIDTH,
  HEIGHT,
  { pad: 12, azimuth: AZIMUTH },
);
const d = drawKit(P);
const { S, L, D, slab, cyl, ring, at, depth } = d;
const ground = (n: number) => -1e6 + n;

interface Scene {
  craneX: number;
  craneY: number;
  hook: number;
  carried: number;
  placed: number;
  pallets: number;
  building: number;
  scaffold: number;
  robot: number;
  plug: number;
  lit: boolean;
  demo: number;
  key: number;
  kind: number;
  knob: number;
}
const blank = (): Scene => ({ craneX: HOME.x, craneY: HOME.y, hook: TRAVEL_Z, carried: -1, placed: 0, pallets: 1, building: 1, scaffold: 1, robot: ROBOT_FAR, plug: 0, lit: false, demo: 0, key: 0, kind: 0, knob: 0 });

function play(t: number, kind: number): { s: Scene; text: string; step: number } {
  const s = blank();
  s.kind = kind;
  s.knob = kind;
  let text = "a developer is about to run one command";
  let step = 1;
  s.key = Math.sin(Math.PI * seg(t, 0, 0.7));
  if (t < 0.9) text = t < 0.7 ? "a developer runs one command" : "the standard modules are ready";
  if (t >= 0.9) { step = 2; text = "the crane picks up the standard modules"; }

  // the crane stacks the four modules onto the scaffold
  const cycles = 4;
  const built = FIRST + CYCLE * cycles;
  if (t >= FIRST) {
    const c = Math.min(cycles - 1, Math.floor((t - FIRST) / CYCLE));
    const u = t - FIRST - CYCLE * c;
    const from = c === 0 ? HOME : { x: 0, y: 0 };
    const to = { x: PAL_X[c]!, y: PAL_Y };
    if (t >= built) {
      s.craneX = lerp(0, HOME.x, ease(seg(t, built, built + 0.6)));
      s.craneY = lerp(0, HOME.y, ease(seg(t, built, built + 0.6)));
      s.hook = TRAVEL_Z;
      s.placed = cycles;
    } else {
      const go = ease(seg(u, 0, 0.4));
      const carry = ease(seg(u, 1.0, 1.6));
      const gx = u < 1.0 ? lerp(from.x, to.x, go) : lerp(to.x, 0, carry);
      const gy = u < 1.0 ? lerp(from.y, to.y, go) : lerp(to.y, 0, carry);
      s.craneX = gx;
      s.craneY = gy;
      s.hook = u < 0.4 ? TRAVEL_Z : u < 0.7 ? lerp(TRAVEL_Z, PAL_TOP, ease(seg(u, 0.4, 0.7))) : u < 1.0 ? lerp(PAL_TOP, TRAVEL_Z, ease(seg(u, 0.7, 1.0))) : u < 1.6 ? TRAVEL_Z : lerp(TRAVEL_Z, STACK_Z + MOD.h * c, ease(seg(u, 1.6, 1.9)));
      s.carried = u >= 0.7 && u < 1.9 ? c : -1;
      s.placed = c + (u >= 1.9 ? 1 : 0);
      step = 3;
      text = ["the crane lifts the structure module onto the scaffold", "next: the tool and resource registration module", "next: the config module", "last: the module that makes it run"][c]!;
    }
  }
  s.pallets = 1;

  // scaffold comes down, a working server stands
  s.scaffold = 1 - ease(seg(t, built + 0.2, built + 1.0));
  s.lit = t >= built + 1.0;
  if (t >= built + 0.2) { step = 4; text = "the scaffold comes down · a working server stands"; }

  // an AI agent walks up and plugs into the standard door
  const walk = built + 1.2;
  s.robot = lerp(ROBOT_FAR, ROBOT_STOP, ease(seg(t, walk, walk + 1.2)));
  s.plug = ease(seg(t, walk + 1.3, walk + 1.9));
  if (t >= walk) { step = 5; text = t < walk + 1.3 ? "an AI agent walks up to the server's door" : "it plugs in · the standard MCP socket"; }

  // and uses what the server offers
  const use = walk + 2.1;
  s.demo = ease(seg(t, use, use + 1));
  if (t >= use) {
    step = 6;
    text = kind === 0 ? "the agent uses the server's tool" : kind === 1 ? "the agent reads a document the server offers" : "the agent picks up a ready-made prompt";
  }
  return { s, text, step };
}

function frame(t: number, kind: number, prev: number | null, knob: number): Tick<Scene> {
  if (prev !== null && t < LEAD) {
    const old = play(99, prev).s;
    const q = ease(seg(t, 0, LEAD));
    return { scene: { ...old, kind: prev, knob, building: 1 - q, scaffold: 0, pallets: 0, robot: lerp(old.robot, ROBOT_FAR, q), plug: old.plug * (1 - clamp(q * 2)), demo: old.demo * (1 - q), lit: old.lit && q < 0.5 }, text: "next server", step: 1 };
  }
  const lt = t - (prev === null ? 0 : LEAD);
  const { s, text, step } = play(lt, kind);
  s.knob = knob;
  if (prev !== null) s.pallets = ease(seg(lt, 0, 0.5));
  return { scene: s, text, step };
}

const settled = (() => {
  const { s, text, step } = play(99, 0);
  return { scene: s, text, step } as Tick<Scene>;
})();

// ---------------------------------------------------------------- parts
const items: Item<Scene>[] = [];
const add = (id: string, key: Item<Scene>["key"], html: Item<Scene>["html"]) => items.push({ id, key, html });
const fade = (o: number, inner: string) => (o >= 0.99 ? inner : o <= 0.01 ? "" : `<g opacity="${o.toFixed(2)}">${inner}</g>`);

add("base", ground(0), d.basePlate(BASE, BASE_H, FOOT_H) + d.labelPlate({ x: -60, y: 70, w: 52, d: 16, r: 2 }));

// the developer's hut: one key is the command
add("terminal", depth(TERM.x + 20, TERM.y + 16, 8), (s) => {
  const screen = [at(TERM.x + 6, TERM.y + TERM.d, 11), at(TERM.x + 34, TERM.y + TERM.d, 11), at(TERM.x + 34, TERM.y + TERM.d, 4), at(TERM.x + 6, TERM.y + TERM.d, 4)];
  return [
    d.halo(TERM, 0, TERM_H),
    S(slab(TERM, 0, TERM_H, 5, 0.8), "mid", { inner: L(k.sideSeam(TERM, 7, P, 5), "faint") }),
    L(k.planOutline(k.insetPlan(TERM, 3), TERM_H, P, 5), "faint"),
    L(k.pathOf(screen as k.Flat[], true), s.key > 0.3 ? "lit" : "lo"),
    d.screws(TERM, 5, TERM_H),
    S(slab({ x: TERM.x + 12, y: TERM.y + 9, w: 16, d: 8, r: 1.5 }, TERM_H, 1.2, 3, 0.3), "lo"),
    S(slab({ x: TERM.x + 14, y: TERM.y + 10.4, w: 12, d: 5.2, r: 1.2 }, TERM_H + 1.2 - s.key * 1.4, 1.2, 3, 0.3), "hi", { lit: s.key > 0.3 }),
  ].join("");
});

// the materials yard: four pallets, each with a standard module
function block(i: number, x: number, y: number, z: number, kind: number, lit: boolean, running: boolean) {
  const plan: Plan = { x: x - MOD.w / 2, y: y - MOD.w / 2, w: MOD.w, d: MOD.w, r: 2 };
  const top = z + MOD.h;
  const body = S(slab(plan, z, MOD.h, 4, 0.6), "hi", { lit, inner: L(k.sideSeam(plan, z + 6, P, 4), "faint") });
  const rim = L(k.planOutline(k.insetPlan(plan, 3), top, P, 4), "faint");
  const crew = d.screws(plan, 3.4, top, 0.45);
  let deco = "";
  if (i === 0) deco = [-8, 0, 8].map((dx) => L(k.lineOnTop([x + dx, y - 12], [x + dx, y + 12], top, P), "lo")).join("") + [-8, 0, 8].map((dy) => L(k.lineOnTop([x - 12, y + dy], [x + 12, y + dy], top, P), "lo")).join("");
  if (i === 1) {
    if (kind === 0) deco = S(cyl(x, y, 6, top, 5, 22, 0.4), "mid") + L(k.knurl(x, y, 6, top, top + 5, 18, P, 0.3), "lo") + L(ring(x, y, 3.2, top + 5, 14), "lo");
    else if (kind === 1) deco = L(k.planOutline({ x: x - 11, y: y - 8, w: 22, d: 16, r: 2 }, top, P, 4), "lo") + [0, 1, 2].map((r) => L(k.lineOnTop([x - 8, y - 4 + r * 4], [x + (r === 1 ? 2 : 7), y - 4 + r * 4], top, P), "lo", true)).join("");
    else deco = S(slab({ x: x - 11, y: y - 2, w: 22, d: 4, r: 1 }, top, 1.4, 3), "mid") + L(k.lineOnTop([x - 8, y], [x + 8, y], top + 1.4, P), "lo", true);
  }
  if (i === 2) deco = [-9, 0, 9].map((dx) => S(cyl(x + dx, y, 2.6, top, 2.4, 14), "mid") + L(ring(x + dx, y, 4, top, 14), "faint")).join("") + D([-9, 0, 9].map((dx) => at(x + dx, y + 9, top)), 0.55, "mid");
  if (i === 3) deco = S(cyl(x, y, 6, top, 3.4, 22, 0.4), "hi", { lit: running }) + L(ring(x, y, 8, top, 22), running ? "lit" : "lo") + D([at(x, y, top + 3.4)], running ? 1.2 : 0.7, running ? "hi" : "mid");
  return body + rim + crew + deco;
}
add("pallets", ground(1), PAL_X.map((x) => S(slab({ x: x - 20, y: PAL_Y - 20, w: 40, d: 40, r: 2 }, 0, PAL_TOP, 3, 0.4), "lo") + [-12, 0, 12].map((dx) => L(k.segment([x + dx, PAL_Y + 20, 0.6], [x + dx, PAL_Y + 20, PAL_TOP - 0.6], P), "faint")).join("")).join(""));
for (let i = 0; i < 4; i++) {
  add(`stock${i}`, depth(PAL_X[i]!, PAL_Y, 14), (s) => {
    const picked = s.carried === i || s.placed > i;
    return picked ? "" : fade(s.pallets, block(i, PAL_X[i]!, PAL_Y, PAL_TOP, s.kind, false, false));
  });
}

// the building site: foundation, floors, scaffold
add("foundation", ground(2), S(slab(FOUND, 0, STACK_Z, 4, 0.5), "lo") + L(k.planOutline(k.insetPlan(FOUND, 3), STACK_Z, P, 4), "faint"));
for (let i = 0; i < 4; i++) {
  add(`floor${i}`, depth(0, 0, 8 + MOD.h * i), (s) => (s.placed > i ? fade(s.building, block(i, 0, 0, STACK_Z + MOD.h * i, s.kind, false, s.lit && i === 3)) : ""));
}
add("door", depth(0, 0, 8 + MOD.h * 0) + 0.5, (s) => {
  if (s.placed < 1) return "";
  const face = DOOR_X;
  return fade(s.building, [-6, 6].map((dy) => L(k.sideRing([face, dy, STACK_Z + 6], 2.2, "x", P, 14), s.plug > 0.9 ? "lit" : "lo")).join("") + L(k.pathOf([at(face, -11, STACK_Z + 1), at(face, 11, STACK_Z + 1), at(face, 11, STACK_Z + 11), at(face, -11, STACK_Z + 11)] as k.Flat[], true), "lo"));
});
const POLES: [number, number][] = [[-24, -24], [24, -24], [-24, 24], [24, 24]];
const scaffold = (back: boolean) => (o: number) => {
  const poles = POLES.filter(([, y]) => (back ? y < 0 : y > 0));
  const parts: string[] = [];
  for (const [x, y] of poles) parts.push(S(cyl(x, y, 1.1, 0, 60, 10), "mid", { crease: "none" }));
  for (const z of [16, 28, 40, 52]) {
    parts.push(S(slab({ x: -24, y: (back ? -24 : 24) - 0.6, w: 48, d: 1.2, r: 0.3 }, z, 1.2, 2), "mid", { crease: "none" }));
    parts.push(S(slab({ x: (back ? -24 : 24) - 0.6, y: -24, w: 1.2, d: 48, r: 0.3 }, z, 1.2, 2), "mid", { crease: "none" }));
  }
  for (let z = 4; z < 52; z += 12) parts.push(L(k.segment([-24, back ? -24 : 24, z], [24, back ? -24 : 24, z + 12], P), "faint"));
  return fade(o, parts.join(""));
};
add("scaffold-back", depth(0, -24, 30), (s) => scaffold(true)(s.scaffold));
add("scaffold-front", depth(0, 30, 30), (s) => scaffold(false)(s.scaffold));

// the crane
for (const [x, y] of [[-CRANE_X, -100], [CRANE_X, -100]]) add(`crane-post-${x}`, depth(x, y, 40), d.post(x, y, 8, 8, CRANE_Z));
for (const [x, y] of [[-CRANE_X, 34], [CRANE_X, 34]]) add(`crane-post-front-${x}`, depth(x, y, 40), d.post(x, y, 8, 8, CRANE_Z));
for (const x of [-CRANE_X, CRANE_X]) add(`crane-rail-${x}`, depth(x, -30, CRANE_Z + 4), S(slab({ x: x - 3, y: -104, w: 6, d: 142, r: 1 }, CRANE_Z, 5, 3, 0.4), "mid"));
add("bridge", (s) => depth(0, s.craneY, CRANE_Z + 6), (s) => {
  const y = s.craneY;
  const beam = S(slab({ x: -CRANE_X - 4, y: y - 3.4, w: CRANE_X * 2 + 8, d: 6.8, r: 1 }, CRANE_Z + 5, 5, 3, 0.4), "hi");
  const trolley = S(slab({ x: s.craneX - 5, y: y - 5, w: 10, d: 10, r: 1.5 }, CRANE_Z + 10, 4, 3, 0.4), "mid");
  const topZ = s.hook + MOD.h + 4;
  const cable = [-3, 3].map((dx) => L(k.segment([s.craneX + dx, y, CRANE_Z + 10], [s.craneX + dx, y, topZ], P), "mid")).join("");
  const hook = S(slab({ x: s.craneX - 5, y: y - 3, w: 10, d: 6, r: 1 }, topZ - 1, 3.4, 3, 0.3), "hi", { lit: s.carried >= 0 });
  return beam + trolley + cable + hook;
});
add("carried", (s) => depth(s.craneX, s.craneY, s.hook + 8), (s) => (s.carried >= 0 ? block(s.carried, s.craneX, s.craneY, s.hook, s.kind, true, false) : ""));

// the AI agent: a small robot that walks up and plugs in
add("agent", (s) => depth(s.robot, 0, 12), (s) => {
  const x = s.robot;
  const body: Plan = { x: x - 12, y: -13, w: 24, d: 26, r: 3 };
  const reach = 20 * s.plug;
  return [
    d.halo(body, 0, 2),
    S(slab({ x: x - 10, y: -11, w: 20, d: 6, r: 1 }, 0, 4, 3), "lo"),
    S(slab({ x: x - 10, y: 5, w: 20, d: 6, r: 1 }, 0, 4, 3), "lo"),
    S(slab(body, 4, 18, 5, 0.7), "mid", { inner: L(k.sideSeam(body, 12, P, 5), "faint") }),
    S(cyl(x, 0, 8, 22, 9, 24, 0.5), "hi", { lit: s.lit }),
    [-3.4, 3.4].map((dy) => L(k.sideRing([x - 8, dy, 27], 1.4, "x", P, 10), s.plug > 0.9 ? "lit" : "lo")).join(""),
    D(s.plug > 0.9 ? [-3.4, 3.4].map((dy) => at(x - 8, dy, 27)) : [], 0.9, "hi"),
    S(cyl(x, 0, 1.2, 31, 7, 10), "mid", { crease: "none" }) + S(cyl(x, 0, 2.4, 38, 2.4, 14), "hi", { lit: s.plug > 0.9 }),
    S(slab({ x: x - 12 - reach, y: -2, w: reach + 1, d: 4, r: 1.6 }, 9, 4, 3, 0.2), "mid"),
    S(slab({ x: x - 18 - reach, y: -5, w: 7, d: 10, r: 1.4 }, 7.4, 8, 3, 0.4), "hi", { lit: s.plug > 0.9 }),
  ].join("");
});

// what the server offers once the agent is plugged in
add("offer", depth(0, 0, 70), (s) => {
  if (s.demo <= 0 || s.placed < 4) return "";
  const top = STACK_Z + MOD.h * 4 + 3.4;
  if (s.kind === 0) {
    const rise = s.demo * 12;
    return S(cyl(0, 0, 3.4, top, rise, 20, 0.3), "hi", { lit: true }) + S(cyl(0, 0, 5.6, top + rise - 1.6, 1.6, 22), "mid");
  }
  if (s.kind === 1) {
    const y = s.demo * 4;
    return S(slab({ x: -9, y: -7 - y, w: 18, d: 14, r: 1.2 }, top + s.demo * 8, 1.6, 3, 0.2), "hi", { lit: true }) + [0, 1, 2].map((r) => L(k.lineOnTop([-6, -4 - y + r * 3.6], [r === 1 ? 2 : 6, -4 - y + r * 3.6], top + s.demo * 8 + 1.6, P), "lo", true)).join("");
  }
  const grow = s.demo * 15;
  return S(slab({ x: -9, y: -0.8, w: 18, d: 1.6, r: 0.6 }, top, grow, 3, 0.2), "hi", { lit: true });
});

const SELECTOR = d.selector(SEL.x, SEL.y, 3);
add("selector", depth(SEL.x, SEL.y, 4), (s) => SELECTOR.fixed + SELECTOR.dynamic(s.knob));

export const mcpCli: Machine<Scene> = {
  width: WIDTH,
  height: HEIGHT,
  label:
    "A construction site. A developer presses one key on a hut. A gantry crane lifts four standard modules, one after another, from pallets onto a scaffold: structure, tool and resource registration, configuration, and the part that makes it run. The scaffold comes down and a working server stands with a standard door. A small robot, the AI agent, walks up and plugs into the door, and the server offers a tool, a resource or a prompt.",
  items,
  settled,
  end: END,
  hold: 3.4,
  choices: 3,
  frame,
};
