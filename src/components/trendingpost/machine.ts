import * as k from "../iso/iso-kit";
import type { Plan } from "../iso/iso-kit";
import { clamp, drawKit, ease, lerp, rad, seg } from "../machine/draw";
import type { Item, Machine, Tick } from "../machine/engine";

const WIDTH = 760;
const HEIGHT = 460;
const AZIMUTH = 55;

const BASE: Plan = { x: -206, y: -118, w: 416, d: 234, r: 10 };
const BASE_H = 9;
const FOOT_H = 5;

// the day's stations, left to right
const CLOCK = { x: -176, y: 6 };
const CRATE_X = [-118, -96, -74, -52, -30];
const CRATE_H = [12, 20, 28, 16, 24]; // a repo's height = its stars, so the tallest is the most popular
const RACK_Y = -80;
const BELT: Plan = { x: -62, y: -9, w: 148, d: 18, r: 2 };
const BELT_H = 6;
const BELT_TOP = BELT_H;
const ENTRY_X = -40;
const PRESS = { x: 24, y: 0 };
const PRESS_W = 44;
const PRINT = { x: 82, y: 0 };
const BOX = { x: 164, y: 0 };
const SEL = { x: -110, y: 70 };
const CRANE_Z = 84;
const CR_X = [-136, -22];
const CR_Y = [-100, 28];
const TRAVEL = 56;
const PICK = [2, 4, 1]; // which repo is trending on each of the three days
const END = 15.2;
const LEAD = 0.8;
const CARD = { w: 14, d: 10, h: 1.2 };

const P = k.fitProjection(
  [...k.boxCorners(BASE, -BASE_H - FOOT_H, 0), ...k.boxCorners({ x: -150, y: -104, w: 340, d: 150, r: 0 }, 0, CRANE_Z + 18)],
  WIDTH,
  HEIGHT,
  { pad: 12, azimuth: AZIMUTH },
);
const d = drawKit(P);
const { S, L, D, slab, cyl, ring, at, depth } = d;
const ground = (n: number) => -1e6 + n;

interface Scene {
  hand: number; // clock hand, 0..1 of a turn
  bell: number;
  trolleyX: number;
  bridgeY: number;
  hook: number;
  pick: number; // index of the carried crate, -1 for none
  crate: { x: number; y: number; z: number };
  taken: boolean; // the crate has left the rack
  belt: number; // belt scroll
  press: number; // 0 open .. 1 closed
  squash: number; // 0 whole repo .. 1 summary card
  dial: number;
  cardX: number;
  cardOn: boolean;
  sheet: number; // printer sheet height
  lamp: boolean;
  flag: number;
  sent: number;
  knob: number;
  choice: number;
}

const blank = (choice: number): Scene => ({
  hand: 0, bell: 0, trolleyX: -76, bridgeY: -40, hook: TRAVEL, pick: -1,
  crate: { x: 0, y: 0, z: 0 }, taken: false, belt: 0, press: 0, squash: 0, dial: 0,
  cardX: 0, cardOn: false, sheet: 0, lamp: false, flag: 0, sent: 0, knob: choice, choice,
});

function play(t: number, choice: number): { s: Scene; text: string; step: number } {
  const s = blank(choice);
  const idx = PICK[choice]!;
  let text = "waiting for the daily timer";
  let step = 1;

  // 1. the launchd clock runs round to the set time and rings
  s.hand = ease(seg(t, 0, 1.6)) * 0.97;
  s.bell = Math.sin(Math.PI * 6 * seg(t, 1.5, 2.3)) * (1 - seg(t, 1.5, 2.3));
  if (t >= 0.2) text = "the daily timer counts down, no one is at the keyboard";
  if (t >= 1.5) text = "it's time · the timer fires on its own";

  // 2-3. the crane looks along the shelf of trending repos and takes one
  const cx = CRATE_X[idx]!;
  const homeX = -76;
  const homeY = -40;
  s.trolleyX = homeX;
  s.bridgeY = homeY;
  const find = ease(seg(t, 2.3, 3.4));
  const lift = ease(seg(t, 3.4, 4.0));
  const carry = ease(seg(t, 4.0, 5.2));
  const lower = ease(seg(t, 5.2, 5.7));
  const top = CRATE_H[idx]!;
  if (t >= 2.3) {
    step = 2;
    text = "the bot looks along today's trending repos on GitHub";
    s.trolleyX = lerp(homeX, cx, find);
    s.bridgeY = lerp(homeY, RACK_Y, find);
    s.hook = TRAVEL;
  }
  if (t >= 3.4) {
    step = 3;
    text = "it picks one repo";
    s.pick = idx;
    s.taken = true;
    s.hook = lerp(TRAVEL, top + 4, lift);
    s.crate = { x: cx, y: RACK_Y, z: 0 };
  }
  if (t >= 4.0) {
    s.trolleyX = lerp(cx, ENTRY_X, carry);
    s.bridgeY = lerp(RACK_Y, 0, carry);
    s.hook = lerp(top + 4, TRAVEL * 0.5, carry);
    s.crate = { x: s.trolleyX, y: s.bridgeY, z: s.hook - top - 4 };
  }
  if (t >= 5.2) {
    s.hook = lerp(TRAVEL * 0.5, BELT_TOP + top + 4, lower);
    s.crate = { x: ENTRY_X, y: 0, z: s.hook - top - 4 };
  }
  if (t >= 5.7) {
    s.pick = -1;
    s.hook = TRAVEL;
    s.trolleyX = lerp(ENTRY_X, homeX, ease(seg(t, 5.7, 6.4)));
    s.bridgeY = lerp(0, homeY, ease(seg(t, 5.7, 6.4)));
  }

  // 4. the belt feeds it into the local model on my own machine, which squeezes it down to a short summary
  const ride = ease(seg(t, 5.8, 7.0));
  const crush = ease(seg(t, 7.0, 8.4));
  const out = ease(seg(t, 8.6, 9.4));
  if (t >= 5.8) {
    step = 4;
    text = "the belt feeds the repo into the model running on my own machine";
    s.belt = (t - 5.8) * 14;
    s.crate = { x: lerp(ENTRY_X, PRESS.x, ride), y: 0, z: BELT_TOP };
    s.taken = true;
  }
  if (t >= 7.0) {
    text = "the local Ollama model reads it and writes a short summary";
    s.press = Math.sin(Math.PI * crush);
    s.squash = crush;
    s.dial = crush;
  }
  if (t >= 8.4) { s.press = 0; s.dial = 1; s.crate = { x: PRESS.x, y: 0, z: -99 }; }
  if (t >= 8.6) {
    s.cardOn = true;
    s.cardX = lerp(PRESS.x, PRINT.x, out);
    s.belt = (t - 5.8) * 14;
  }

  // 5. the printer lays it out as a LinkedIn post
  const print = ease(seg(t, 9.6, 11.0));
  if (t >= 9.4) { step = 5; text = "the summary is laid out as a LinkedIn post"; s.cardX = PRINT.x; }
  if (t >= 9.6) { s.cardOn = false; s.sheet = print; s.lamp = true; }

  // 6. it goes to LinkedIn through its API, the flag goes up
  const send = ease(seg(t, 11.2, 12.8));
  if (t >= 11.2) {
    step = 6;
    text = "it posts to LinkedIn through the API";
    s.sheet = 1 - send;
    s.sent = send;
    s.lamp = true;
  }
  s.flag = ease(seg(t, 12.8, 13.4));
  if (t >= 12.8) text = "posted · the timer will run again tomorrow";
  return { s, text, step };
}

function frame(t: number, choice: number, prev: number | null, knob: number): Tick<Scene> {
  if (prev !== null && t < LEAD) {
    const old = play(99, prev).s;
    const q = ease(seg(t, 0, LEAD));
    return { scene: { ...old, knob, choice: prev, hand: old.hand * (1 - q), flag: old.flag * (1 - q), sent: old.sent * (1 - q), sheet: 0, lamp: false }, text: "next day", step: 1 };
  }
  const lt = t - (prev === null ? 0 : LEAD);
  const { s, text, step } = play(lt, choice);
  s.knob = knob;
  return { scene: s, text, step };
}

const settled = (() => {
  const { s, text, step } = play(99, 0);
  return { scene: s, text, step } as Tick<Scene>;
})();

// ---------------------------------------------------------------- parts
const items: Item<Scene>[] = [];
const add = (id: string, key: Item<Scene>["key"], html: Item<Scene>["html"]) => items.push({ id, key, html });

add("base", ground(0), d.basePlate(BASE, BASE_H, FOOT_H) + d.labelPlate({ x: -60, y: 74, w: 52, d: 16, r: 2 }));

// the launchd clock: a tall post, a round face with ticks, a hand and a bell
add("clock", depth(CLOCK.x, CLOCK.y, 40), (s) => {
  const x = CLOCK.x;
  const y = CLOCK.y;
  const fz = 58;
  const a = rad(-180 + s.hand * 360);
  const hand = k.lineOnTop([x, y], [x + Math.sin(a) * 10, y - Math.cos(a) * 10], fz + 6, P);
  const ticks = k.radialTicks(x, y, 13, 12, 3, fz + 6, [1.6, 3], P);
  const plan: Plan = { x: x - 16, y: y - 16, w: 32, d: 32, r: 3 };
  return [
    d.halo(plan, 0, 4),
    S(slab(plan, 0, 4, 4, 0.8), "lo"),
    d.screws(plan, 4, 4),
    d.post(x, y, 8, 8, 52),
    S(cyl(x, y, 16, fz, 6, 36, 0.6), "mid"),
    L(ring(x, y, 14, fz + 6, 36), "lo"),
    L(ticks.minor, "lo"),
    L(ticks.major, "mid"),
    L(hand, s.hand > 0.9 ? "lit" : "hi"),
    D([at(x, y, fz + 6)], 1, "hi"),
    S(cyl(x, y, 6, fz + 6, 2, 20), "lo"),
    // the bell hangs from a bracket beside the face and swings when it rings
    L(k.segment([x + 14, y + 12, fz + 6], [x + 14 + s.bell * 4, y + 12, fz - 6], P), "mid"),
    S(cyl(x + 14 + s.bell * 4, y + 12, 4, fz - 12, 6, 16, 0.4), "hi", { lit: Math.abs(s.bell) > 0.05 }),
  ].join("");
});

// the shelf of trending repos: five crates, taller = more stars
add("shelf", ground(1), S(slab({ x: -130, y: RACK_Y - 14, w: 112, d: 28, r: 2 }, 0, 3, 4, 0.4), "lo") + L(k.planOutline(k.insetPlan({ x: -130, y: RACK_Y - 14, w: 112, d: 28, r: 2 }, 2), 3, P, 4), "faint"));
const crate = (x: number, y: number, z: number, h: number, i: number, lit: boolean, squash = 0) => {
  const hh = lerp(h, 2, squash);
  const ww = lerp(18, CARD.w, squash);
  const plan: Plan = { x: x - ww / 2, y: y - ww / 2, w: ww, d: ww, r: 1.4 };
  const top = z + hh;
  return [
    S(slab(plan, z, hh, 4, 0.5), "hi", { lit, inner: L(k.sideSeam(plan, z + Math.min(5, hh / 2), P, 4), "faint") }),
    squash < 0.5 ? L(k.planOutline(k.insetPlan(plan, 2.4), top, P, 4), "faint") : "",
    // stars: a row of dots on top, one per ten stars
    D(Array.from({ length: Math.round(h / 4) }, (_, n) => at(x - ww / 2 + 3 + (n % 3) * 4.2, y - ww / 2 + 4 + Math.floor(n / 3) * 4, top)).slice(0, squash < 0.5 ? 9 : 0), 0.5, "mid"),
    squash < 0.5 && i >= 0 ? d.screws(plan, 2.2, top, 0.4) : "",
  ].join("");
};
for (let i = 0; i < 5; i++) {
  add(`crate${i}`, depth(CRATE_X[i]!, RACK_Y, 10 + CRATE_H[i]!), (s) => (s.taken && PICK[s.choice] === i ? "" : crate(CRATE_X[i]!, RACK_Y, 3, CRATE_H[i]!, i, false)));
}

// the belt: a flat bed with rollers
add("belt", ground(2), (s) => {
  const rollers: string[] = [];
  const phase = ((s.belt % 8) + 8) % 8;
  for (let x = BELT.x + 2 + phase; x < BELT.x + BELT.w - 2; x += 8) rollers.push(L(k.segment([x, BELT.y + 1.5, BELT_TOP], [x, BELT.y + BELT.d - 1.5, BELT_TOP], P), "faint"));
  return [
    d.halo(BELT, 0, BELT_H),
    S(slab(BELT, 0, BELT_H, 4, 0.6), "mid", { inner: L(k.sideSeam(BELT, 3, P, 4), "faint") }),
    L(k.planOutline(k.insetPlan(BELT, 1.6), BELT_TOP, P, 4), "lo"),
    ...rollers,
    d.screws(BELT, 4, BELT_TOP),
  ].join("");
});
add("belt-legs", ground(3), [BELT.x + 10, BELT.x + BELT.w - 10].map((x) => S(slab({ x: x - 3, y: BELT.y + 4, w: 6, d: BELT.d - 8, r: 1 }, -BASE_H + 0.2, 1, 3), "lo")).join(""));

// the model station: a press with a piston and a progress dial
add("press", depth(PRESS.x, PRESS.y, 40), (s) => {
  const plan: Plan = { x: PRESS.x - PRESS_W / 2, y: PRESS.y - 24, w: PRESS_W, d: 48, r: 4 };
  const top = 38;
  const piston = 26 - s.press * 16;
  return [
    d.halo(plan, 0, top),
    S(slab({ x: plan.x, y: plan.y, w: plan.w, d: 12, r: 3 }, BELT_TOP, top - BELT_TOP, 4, 0.7), "mid"),
    // the piston comes down through the roof onto whatever is on the belt
    S(cyl(PRESS.x, PRESS.y, 3.4, BELT_TOP + piston, 40 - piston, 18), "mid", { crease: "none" }),
    S(cyl(PRESS.x, PRESS.y, 11, BELT_TOP + piston - 3, 3, 24, 0.4), "hi", { lit: s.press > 0.1 }),
    S(slab({ x: plan.x, y: plan.y + 36, w: plan.w, d: 12, r: 3 }, BELT_TOP, top - BELT_TOP, 4, 0.7), "mid"),
    S(slab({ x: plan.x, y: plan.y, w: plan.w, d: 48, r: 4 }, top, 8, 4, 0.8), "hi", { lit: s.press > 0.1, inner: L(k.sideSeam(plan, top + 4, P, 4), "faint") }),
    L(k.planOutline(k.insetPlan(plan, 3), top + 8, P, 4), "faint"),
    d.screws(plan, 5, top + 8),
    S(cyl(PRESS.x, PRESS.y + 14, 6, top + 8, 10, 22, 0.4), "lo"),
    // progress dial on the front
    L(ring(PRESS.x, plan.y + 48 - 0.1, 0.1, top + 8, 4), "faint"),
    d.dialFace(PRESS.x, PRESS.y, 9, top + 8, 270, 20, 5),
    L(d.needle(PRESS.x, PRESS.y, top + 8, 9, s.dial, 270), "lit"),
    D([at(PRESS.x, PRESS.y, top + 8)], 0.9, "hi"),
  ].join("");
});

// whatever is on the belt: the repo crate, then the summary card
add("onbelt", (s) => depth(s.crate.x, s.crate.y, 10 + s.crate.z), (s) => {
  if (s.pick >= 0 || s.crate.z === -99 || (!s.taken && !s.cardOn)) return "";
  if (s.pick < 0 && s.crate.x === 0 && s.crate.y === 0 && s.crate.z === 0) return "";
  const idx = PICK[s.choice]!;
  return crate(s.crate.x, s.crate.y, s.crate.z, CRATE_H[idx]!, idx, true, s.squash);
});
add("carried", (s) => depth(s.crate.x, s.crate.y, 10 + s.crate.z + 20), (s) => (s.pick >= 0 ? crate(s.crate.x, s.crate.y, s.crate.z, CRATE_H[s.pick]!, s.pick, true) : ""));

// the summary card on the way to the printer
add("card", (s) => depth(s.cardX, 0, 12), (s) => {
  if (!s.cardOn) return "";
  const plan: Plan = { x: s.cardX - CARD.w / 2, y: -CARD.d / 2, w: CARD.w, d: CARD.d, r: 1 };
  return S(slab(plan, BELT_TOP, CARD.h, 3, 0.2), "hi", { lit: true }) + [0, 1, 2].map((r) => L(k.lineOnTop([s.cardX - 5, -3 + r * 3], [s.cardX + (r === 1 ? 1 : 5), -3 + r * 3], BELT_TOP + CARD.h, P), "lo", true)).join("");
});

// the printer: lays out the post
add("printer", depth(PRINT.x, PRINT.y, 20), (s) => {
  const plan: Plan = { x: PRINT.x - 16, y: -22, w: 32, d: 44, r: 4 };
  const top = 18;
  const sheet = s.sheet;
  return [
    d.halo(plan, 0, top),
    S(slab(plan, 0, top, 4, 0.8), "mid", { inner: L(k.sideSeam(plan, 7, P, 4), "faint") }),
    L(k.planOutline(k.insetPlan(plan, 3), top, P, 4), "faint"),
    d.screws(plan, 4.5, top),
    S(slab({ x: PRINT.x - 11, y: -12, w: 22, d: 24, r: 2 }, top, 3, 4, 0.4), "lo"),
    // the sheet rises out of the slot as the post is laid out
    sheet > 0.02 ? S(slab({ x: PRINT.x - 8, y: -9, w: 16, d: 18, r: 1 }, top + 3, 1.4 + sheet * 5, 3, 0.2), "hi", { lit: true }) : "",
    sheet > 0.3 ? [0, 1, 2, 3].map((r) => L(k.lineOnTop([PRINT.x - 5, -6 + r * 4], [PRINT.x + (r === 2 ? 1 : 5), -6 + r * 4], top + 4.4 + sheet * 5, P), "lo", true)).join("") : "",
    D([at(PRINT.x - 11, -18, top), at(PRINT.x - 6, -18, top)], 0.7, s.lamp ? "hi" : "lo"),
  ].join("");
});

// the LinkedIn mailbox with its flag
add("box", depth(BOX.x, BOX.y, 24), (s) => {
  const plan: Plan = { x: BOX.x - 20, y: -18, w: 40, d: 36, r: 5 };
  const top = 26;
  const flagUp = s.flag;
  return [
    d.halo(plan, 0, top),
    S(slab(plan, 0, top, 5, 0.9), "mid", { inner: L(k.sideSeam(plan, 13, P, 5), "faint") }),
    S(slab(k.insetPlan(plan, -1.4), top, 2.4, 5, 0.5), "lo"),
    L(k.planOutline(k.insetPlan(plan, 4), top + 2.4, P, 5), "faint"),
    d.screws(plan, 6, top + 2.4),
    // the slot in the roof and the card sliding into it
    S(slab({ x: BOX.x - 10, y: -2, w: 20, d: 4, r: 1 }, top + 2.4, 0.6, 3), "lo", { crease: "none" }),
    s.sent > 0 && s.sent < 1 ? S(slab({ x: BOX.x - 7, y: -4, w: 14, d: 8, r: 1 }, top + 2.4 + 8 * (1 - s.sent) , 1.2, 3, 0.2), "hi", { lit: true }) : "",
    // the flag on a post
    S(cyl(BOX.x + 20, 12, 1.6, top - 6, 18, 12), "mid", { crease: "none" }),
    S(slab({ x: BOX.x + 20, y: 10, w: 10, d: 4, r: 0.6 }, top + 4 + flagUp * 6, 5, 3, 0.2), "hi", { lit: flagUp > 0.5 }),
    D([at(BOX.x - 14, -18, 8), at(BOX.x - 8, -18, 8)], 0.7, flagUp > 0.5 ? "hi" : "lo"),
  ].join("");
});

// the crane over the shelf and the belt entry
for (const x of CR_X) for (const y of CR_Y) add(`post-${x}-${y}`, depth(x, y, 40), d.post(x, y, 8, 8, CRANE_Z));
for (const x of CR_X) add(`rail-${x}`, depth(x, -36, CRANE_Z + 4), S(slab({ x: x - 3, y: CR_Y[0]! - 4, w: 6, d: CR_Y[1]! - CR_Y[0]! + 8, r: 1 }, CRANE_Z, 5, 3, 0.4), "mid"));
add("bridge", (s) => depth(0, s.bridgeY, CRANE_Z + 6), (s) => {
  const y = s.bridgeY;
  const beam = S(slab({ x: CR_X[0]! - 4, y: y - 3.4, w: CR_X[1]! - CR_X[0]! + 8, d: 6.8, r: 1 }, CRANE_Z + 5, 5, 3, 0.4), "hi");
  const trolley = S(slab({ x: s.trolleyX - 5, y: y - 5, w: 10, d: 10, r: 1.5 }, CRANE_Z + 10, 4, 3, 0.4), "mid");
  const topZ = s.hook + (s.pick >= 0 ? CRATE_H[s.pick]! : 8) + 6;
  const cable = [-3, 3].map((dx) => L(k.segment([s.trolleyX + dx, y, CRANE_Z + 10], [s.trolleyX + dx, y, topZ], P), "mid")).join("");
  const hook = S(slab({ x: s.trolleyX - 5, y: y - 3, w: 10, d: 6, r: 1 }, topZ - 1, 3.4, 3, 0.3), "hi", { lit: s.pick >= 0 });
  return beam + trolley + cable + hook;
});

const SELECTOR = d.selector(SEL.x, SEL.y, 3);
add("selector", depth(SEL.x, SEL.y, 4), (s) => SELECTOR.fixed + SELECTOR.dynamic(s.knob));

export const trendingPost: Machine<Scene> = {
  width: WIDTH,
  height: HEIGHT,
  label:
    "A small factory that runs once a day. A round clock rings a bell when the set time comes. A gantry crane looks along a shelf of five crates, each as tall as a repository's stars, and lifts one onto a belt. The belt feeds it into a press, the local model, which squeezes it into a short card. A printer lays the card out as a post, and it slides into a mailbox, the LinkedIn slot, whose flag goes up.",
  items,
  settled,
  end: END,
  hold: 3.4,
  choices: 3,
  frame,
};
