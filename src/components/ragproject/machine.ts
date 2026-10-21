import * as k from "../iso/iso-kit";
import type { Plan } from "../iso/iso-kit";
import { clamp, drawKit, ease, lerp, seg } from "../machine/draw";
import type { Item, Machine, Tick } from "../machine/engine";

const WIDTH = 760;
const HEIGHT = 440;
const AZIMUTH = 55;

// ---------------------------------------------------------------- the real pipeline's numbers
// Embeddings are invented 5-d vectors [returns, shipping, warranty, account, other]; chunk lengths follow the 1000-character splitter.
const CHUNKS = [
  { id: "c1", v: [0.95, 0.05, 0.2, 0.1, 0.05], chars: 1000 },
  { id: "c2", v: [0.85, 0.3, 0.1, 0.2, 0.05], chars: 1000 },
  { id: "c3", v: [0.1, 0.95, 0.05, 0.1, 0.05], chars: 640 },
  { id: "c4", v: [0.05, 0.8, 0.05, 0.5, 0.05], chars: 1000 },
  { id: "c5", v: [0.3, 0.05, 0.9, 0.1, 0.05], chars: 820 },
  { id: "c6", v: [0.1, 0.1, 0.85, 0.45, 0.05], chars: 1000 },
  { id: "c7", v: [0.6, 0.1, 0.05, 0.6, 0.05], chars: 1000 },
  { id: "c8", v: [0.05, 0.15, 0.2, 0.95, 0.05], chars: 430 },
  { id: "c9", v: [0.05, 0.05, 0.05, 0.9, 0.1], chars: 1000 },
  { id: "c10", v: [0.1, 0.05, 0.15, 0.8, 0.15], chars: 760 },
];
const QUESTIONS = [
  { name: "how do I get a refund?", v: [0.9, 0.1, 0.1, 0.1, 0] },
  { name: "where is my order?", v: [0.1, 0.9, 0.05, 0.2, 0] },
  { name: "is my phone under warranty?", v: [0.2, 0.05, 0.95, 0.15, 0] },
  { name: "who founded the company?", v: [0, 0, 0, 0, 1] },
];
const K = 5;
const dot = (a: number[], b: number[]) => a.reduce((sum, x, i) => sum + x * b[i]!, 0);
const cosine = (a: number[], b: number[]) => dot(a, b) / Math.sqrt(dot(a, a) * dot(b, b));
const RETRIEVALS = QUESTIONS.map((q) => {
  const scores = CHUNKS.map((c) => cosine(q.v, c.v));
  const top = scores.map((_, i) => i).sort((a, b) => scores[b]! - scores[a]! || a - b).slice(0, K);
  return { scores, top, chars: top.reduce((sum, i) => sum + CHUNKS[i]!.chars, 0), unknown: scores[top[0]!]! < 0.5 };
});
const score2 = (v: number) => v.toFixed(2).replace(/^0/, "");
const COUNT = CHUNKS.length;

// ---------------------------------------------------------------- layout
const BASE: Plan = { x: -182, y: -110, w: 412, d: 206, r: 9 };
const BASE_H = 9;
const FOOT_H = 5;
const PITCH = 16;
const PX0 = -146;
const px = (i: number) => PX0 + i * PITCH;
const SHELF_Y = -64; // books sit with their spines at y = SHELF_Y + 24 when pushed in
const BOOK = { w: 11, d: 24, h: 30 };
const SHELF_Z = 6;
const PULL = 3; // how far a book with no match sticks out
const PULL_SPAN = 15; // extra for a perfect match
const LIFT = 6;
const CASE: Plan = { x: -166, y: -78, w: 180, d: 36, r: 2 };
const CASE_H = 52;
const RAIL: Plan = { x: -170, y: -34, w: 188, d: 5, r: 1.2 };
const RAIL_Z = 60;
const X_HOME = -160;
const X_END = 6;
const LAMP_Z = 50;
const SWEEP = 270;
const DESK: Plan = { x: 44, y: -36, w: 172, d: 72, r: 3 };
const DESK_Z = 20;
const DESK_H = 4;
const DESK_TOP = DESK_Z + DESK_H;
const SLOT_X = [72, 100, 128, 156, 184];
const SLOT_Y = -14;
const BK = { w: 22, d: 16, h: 3 };
const TYPE_X = 132;
const TYPE_Y = 16;
const PAPER = { w: 26, len: 30 };
const GAUGE = { x: 204, y: -26 };
const KNOB = { x: -132, y: 56 };

const P = k.fitProjection(
  [...k.boxCorners(BASE, -BASE_H - FOOT_H, 0), ...k.boxCorners(CASE, 0, CASE_H + 4), ...k.boxCorners(DESK, 0, 70)],
  WIDTH,
  HEIGHT,
  { pad: 12, azimuth: AZIMUTH },
);
const d = drawKit(P);
const { S, L, D, slab, cyl, ring, at, depth } = d;
const ground = (n: number) => -1e6 + n;
const TOP = 1e4;

// ---------------------------------------------------------------- timeline
const T = {
  paperIn: [0, 0.6], back: 0.5, lower: [1.9, 2.3], morph: [2.2, 3.0], scan: [3.0, 5.6], park: [5.6, 6.4],
  select: [6.4, 6.9], fly: 6.9, write: [9.0, 10.2],
} as const;
const END = 10.6;
const FLY = 0.8;
const STAGGER = 0.3;
const BACK = 0.7;
const span = ([a, b]: readonly [number, number]) => (t: number) => ease(seg(t, a, b));
const pullOf = (score: number) => PULL + PULL_SPAN * clamp(score);
const bump = (dist: number) => ease(seg(10 - dist, 0, 5));

interface Card { x: number; y: number; z: number; visible: boolean }
interface Scene {
  pull: number[];
  selected: boolean[];
  scanX: number;
  dip: number;
  reading: number;
  cards: Card[];
  context: number;
  paper: number;
  unknown: boolean;
  reading2: boolean;
  knob: number;
}

function probe(x: number, pulls: number[]) {
  let best = PULL;
  for (let i = 0; i < COUNT; i++) best = Math.max(best, PULL + (pulls[i]! - PULL) * bump(Math.abs(x - px(i))));
  return best;
}

function cardOf(q: number, rank: number, p: number, lifted: number, pulls: number[]): Card {
  const book = RETRIEVALS[q]!.top[rank]!;
  const from = { x: px(book), y: SHELF_Y + 12 + pulls[book]! + LIFT * lifted, z: SHELF_Z + BOOK.h };
  const to = { x: SLOT_X[rank]!, y: SLOT_Y, z: DESK_TOP };
  const e = ease(p);
  return { x: lerp(from.x, to.x, e), y: lerp(from.y, to.y, e), z: lerp(from.z, to.z, e) + 16 * Math.sin(Math.PI * e), visible: true };
}

const nearest = (x: number) => {
  let best = 0;
  for (let i = 1; i < COUNT; i++) if (Math.abs(x - px(i)) < Math.abs(x - px(best))) best = i;
  return best;
};

function frame(t: number, query: number, prev: number | null, knob: number): Tick<Scene> {
  const now = RETRIEVALS[query]!;
  const was = RETRIEVALS[prev ?? query]!;
  const rewinding = prev !== null && t < T.lower[1];
  const morph = prev === null ? 1 : span(T.morph)(t);
  const base = CHUNKS.map((_, i) => lerp(pullOf(was.scores[i]!), pullOf(now.scores[i]!), morph));
  const wasLift = prev === null ? 0 : 1 - span(T.lower)(t);
  const nowLift = span(T.select)(t);
  const lift = (i: number) => clamp((now.top.includes(i) ? nowLift : 0) + (prev !== null && was.top.includes(i) ? wasLift : 0));
  const pull = base.map((h, i) => h + LIFT * lift(i));
  const selected = CHUNKS.map((_, i) => (now.top.includes(i) && nowLift > 0.5) || (rewinding && was.top.includes(i) && wasLift > 0.5));

  const cards: Card[] = [];
  if (rewinding) was.top.forEach((_, rank) => cards.push(cardOf(prev!, rank, 1 - ease(seg(t, T.back + 0.1 * rank + 0.3, T.back + 0.1 * rank + 0.3 + BACK)), wasLift, was.scores.map(pullOf))));
  else if (nowLift > 0) now.top.forEach((_, rank) => cards.push(cardOf(query, rank, ease(seg(t, T.fly + STAGGER * rank, T.fly + STAGGER * rank + FLY)), nowLift, now.scores.map(pullOf))));

  const scanning = seg(t, T.scan[0], T.scan[1]);
  const scanX = t < T.scan[0] ? X_HOME : t < T.scan[1] ? lerp(X_HOME, X_END, scanning) : lerp(X_END, X_HOME, span(T.park)(t));
  const down = ease(seg(t, T.scan[0] - 0.1, T.scan[0] + 0.2)) * (1 - ease(seg(t, T.scan[1] - 0.2, T.scan[1] + 0.1)));
  const touching = probe(scanX, base);
  const reading = down > 0.5 ? (touching - PULL) / PULL_SPAN : 0;

  const landed = (rewinding ? was : now).top.filter((_, r) => (rewinding ? 1 - ease(seg(t, T.back + 0.1 * r + 0.3, T.back + 0.1 * r + 0.3 + BACK)) : ease(seg(t, T.fly + STAGGER * r, T.fly + STAGGER * r + FLY))) > 0.98).length;
  const chars = (rewinding ? was : now).top.slice(0, landed).reduce((sum, i) => sum + CHUNKS[i]!.chars, 0);
  const context = chars / 5000;
  const paper = PAPER.len * (rewinding ? 1 - span(T.paperIn)(t) : span(T.write)(t));
  const reading2 = !rewinding && nowLift > 0 && t < T.write[1];

  const q = `“${QUESTIONS[query]!.name}”`;
  let text: string;
  if (rewinding || t < T.morph[1]) text = prev !== null ? `${q} · turning the words into numbers` : q;
  else if (t < T.scan[0]) text = `${q} · ${COUNT} books on the shelf`;
  else if (t < T.scan[1]) {
    const i = nearest(scanX);
    text = Math.abs(scanX - px(i)) < 7 ? `book ${CHUNKS[i]!.id} · match ${score2(now.scores[i]!)}` : `${q} · checking every book`;
  } else if (t < T.write[0] - 0.1) text = now.unknown ? "no book matches well · taking the best 5 anyway" : `the closest ${K} books · ${now.top.map((i) => `${CHUNKS[i]!.id} ${score2(now.scores[i]!)}`).join(" ")}`;
  else if (t < T.write[1]) text = `the AI is reading ${chars.toLocaleString("en-US")} letters`;
  else text = now.unknown ? "the books don't say · “I don't know, contact support”" : `answer written only from ${now.top.map((i) => CHUNKS[i]!.id).join(" ")}`;

  const step = rewinding ? 1 : t < T.scan[0] ? 2 : t < T.select[0] ? 3 : t < T.fly + 0.9 ? 4 : t < T.write[1] ? 5 : now.unknown ? 7 : 6;
  return { scene: { pull, selected, scanX, dip: down, reading, cards, context, paper, unknown: now.unknown, reading2, knob }, text, step };
}

const settled = frame(END, 0, null, 0);

// ---------------------------------------------------------------- parts
const items: Item<Scene>[] = [];
const add = (id: string, key: Item<Scene>["key"], html: Item<Scene>["html"]) => items.push({ id, key, html });

add("base", ground(0), d.basePlate(BASE, BASE_H, FOOT_H) + d.labelPlate({ x: -96, y: 52, w: 52, d: 16, r: 2 }));

// the bookcase: plinth, back, two sides, a shelf board
add("case-back", ground(1), [
  d.halo(CASE, 0, 4),
  S(slab({ x: CASE.x, y: CASE.y, w: CASE.w, d: 3, r: 0.6 }, 0, CASE_H, 3, 0.5), "mid"),
  Array.from({ length: 5 }, (_, i) => L(k.segment([CASE.x + 3 + i * 36, CASE.y + 3, 2], [CASE.x + 3 + i * 36, CASE.y + 3, CASE_H - 2], P), "faint")).join(""),
  S(slab({ x: CASE.x, y: CASE.y + 3, w: CASE.w, d: CASE.d - 3, r: 1 }, 0, SHELF_Z, 3, 0.5), "lo"),
].join(""));
add("case-left", depth(CASE.x + 2, -60, 20), S(slab({ x: CASE.x, y: CASE.y, w: 4, d: CASE.d, r: 0.8 }, 0, CASE_H, 3, 0.5), "mid") + d.screws({ x: CASE.x, y: CASE.y, w: 4, d: CASE.d, r: 0 }, 1.6, CASE_H, 0.45));
add("case-right", depth(CASE.x + CASE.w - 2, -60, 20), S(slab({ x: CASE.x + CASE.w - 4, y: CASE.y, w: 4, d: CASE.d, r: 0.8 }, 0, CASE_H, 3, 0.5), "mid") + d.screws({ x: CASE.x + CASE.w - 4, y: CASE.y, w: 4, d: CASE.d, r: 0 }, 1.6, CASE_H, 0.45));
// the rail the ladder rolls on, with its two posts
add("rail", ground(2), [
  [-172, 16].map((x) => d.post(x, RAIL.y + 2.5, 8, 8, RAIL_Z)).join(""),
  S(slab(RAIL, RAIL_Z, 5, 3, 0.6), "mid"),
  L(k.sideTicks(-150, 8, 8, 4, RAIL.y + RAIL.d, RAIL_Z + 5, [2, 3.4], P, "x").minor, "lo"),
].join(""));

// the books
for (let i = 0; i < COUNT; i++) {
  add(`book${i}`, depth(px(i), SHELF_Y + 20, 10), (s) => {
    const y0 = SHELF_Y + s.pull[i]!;
    const h = BOOK.h - (i % 3) * 2;
    const plan: Plan = { x: px(i) - BOOK.w / 2, y: y0, w: BOOK.w, d: BOOK.d, r: 1 };
    const spineY = y0 + BOOK.d;
    const bands = [0.2, 0.34, 0.8].map((f) => L(k.segment([px(i) - BOOK.w / 2 + 0.6, spineY, SHELF_Z + h * f], [px(i) + BOOK.w / 2 - 0.6, spineY, SHELF_Z + h * f], P), "faint")).join("");
    const label = L(k.segment([px(i) - 3.6, spineY, SHELF_Z + h * 0.52], [px(i) + 3.6, spineY, SHELF_Z + h * 0.52], P) + k.segment([px(i) - 3.6, spineY, SHELF_Z + h * 0.62], [px(i) + 2, spineY, SHELF_Z + h * 0.62], P), "lo", true);
    return S(slab(plan, SHELF_Z, h, 3, 0.4), "hi", { lit: s.selected[i], inner: bands }) + label;
  });
}

// the rolling ladder, with a lamp that looks at each book in turn
const LAD_Y = RAIL.y;
add("ladder", (s) => depth(s.scanX, -30, 10) + 0.01, (s) => {
  const x = s.scanX;
  const lampZ = LAMP_Z - s.dip * 8;
  const gaugeZ = lampZ + 14 + 0.2;
  const beam = k.segment([x, -46, lampZ - 2], [x, -46 + 0, lampZ - 2], P);
  void beam;
  return [
    S(slab({ x: x - 9, y: LAD_Y - 2, w: 18, d: 9, r: 1.5 }, RAIL_Z + 5, 4, 3, 0.4), "mid"),
    [-7, 7].map((dx) => S(slab({ x: x + dx - 1, y: -30, w: 2, d: 2, r: 0.5 }, 0, RAIL_Z + 8, 2), "mid", { crease: "none" })).join(""),
    [10, 20, 30, 40, 50].map((z) => L(k.segment([x - 6, -30, z], [x + 6, -30, z], P), "lo")).join(""),
    S(slab({ x: x - 2, y: -44, w: 4, d: LAD_Y - -44 + 4, r: 1 }, RAIL_Z + 1, 3, 3, 0.3), "mid"),
    S(cyl(x, -46, 5.5, lampZ, 10, 24, 0.5), "hi"),
    L(k.sideArc(x, -46, 5.5, lampZ + 5, P, 14), "faint"),
    S(cyl(x, -46, 7.4, lampZ + 10, 4, 28, 0.4), "hi"),
    d.dialFace(x, -46, 7.4, lampZ + 14, SWEEP, 18, 3),
    `<path data-needle class="iso-line" data-tone="lit" d="${d.needle(x, -46, gaugeZ, 7.4, s.reading, SWEEP)}"/>`,
    L(ring(x, -46, 1, gaugeZ, 12), "lo"),
  ].join("");
});

const SEL = d.selector(KNOB.x, KNOB.y, 4);
add("selector", depth(KNOB.x, KNOB.y, 4), (s) => SEL.fixed + SEL.dynamic(s.knob));

// the reading desk
add("desk-legs", ground(4), [[DESK.x + 6, DESK.y + 6], [DESK.x + DESK.w - 6, DESK.y + 6]].map(([x, y]) => d.post(x!, y!, 7, 7, DESK_Z)).join(""));
add("desk-front-legs", depth(DESK.x + DESK.w - 6, DESK.y + DESK.d - 6, 10), [[DESK.x + 6, DESK.y + DESK.d - 6], [DESK.x + DESK.w - 6, DESK.y + DESK.d - 6]].map(([x, y]) => d.post(x!, y!, 7, 7, DESK_Z)).join(""));
add("desk", ground(5), [
  d.halo(DESK, DESK_Z, DESK_H),
  S(slab(DESK, DESK_Z, DESK_H, 5, 0.8), "lo", { inner: L(k.sideSeam(DESK, DESK_Z + 2, P, 5), "faint") }),
  L(k.planOutline(k.insetPlan(DESK, 3), DESK_TOP, P, 5), "faint"),
  SLOT_X.map((x) => L(k.planOutline({ x: x - BK.w / 2 - 1.5, y: SLOT_Y - BK.d / 2 - 1.5, w: BK.w + 3, d: BK.d + 3, r: 2 }, DESK_TOP, P, 5), "lo")).join(""),
  d.screws(DESK, 4.5, DESK_TOP, 0.45),
].join(""));

const bookCard = (c: Card) =>
  c.visible
    ? S(slab({ x: c.x - BK.w / 2, y: c.y - BK.d / 2, w: BK.w, d: BK.d, r: 1.5 }, c.z, BK.h, 3, 0.3), "hi", { lit: true }) +
      [0, 1, 2].map((row) => L(k.lineOnTop([c.x - BK.w / 2 + 3, c.y - 3.4 + row * 3.4], [c.x - BK.w / 2 + (row === 1 ? 12 : 17), c.y - 3.4 + row * 3.4], c.z + BK.h, P), "lo", true)).join("") +
      L(k.segment([c.x - 0.3, c.y - BK.d / 2 + 1, c.z + BK.h], [c.x - 0.3, c.y + BK.d / 2 - 1, c.z + BK.h], P), "faint")
    : "";
add("books-on-desk", TOP, (s) => [...s.cards].sort((a, b) => depth(a.x, a.y, a.z) - depth(b.x, b.y, b.z)).map(bookCard).join(""));

// the desk lamp lights while the AI reads
const LAMP = { x: 206, y: 6 };
add("lamp", TOP + 1, (s) => [
  S(cyl(LAMP.x, LAMP.y, 6, DESK_TOP, 2, 20), "lo"),
  S(cyl(LAMP.x, LAMP.y, 1.4, DESK_TOP + 2, 26, 12), "mid", { crease: "none" }),
  S(cyl(LAMP.x, LAMP.y, 6.4, DESK_TOP + 24, 6, 24, 0.5), "hi", { lit: s.reading2 }),
  L(ring(LAMP.x, LAMP.y, 7.6, DESK_TOP + 24, 24), s.reading2 ? "lit" : "faint"),
].join(""));

// the context gauge: how much text is on the desk
add("gauge", depth(GAUGE.x, GAUGE.y, 12), (s) => [
  S(cyl(GAUGE.x, GAUGE.y, 7, DESK_TOP, 2, 24), "lo"),
  S(cyl(GAUGE.x, GAUGE.y, 2.4, DESK_TOP + 2, 10, 14), "mid", { crease: "none" }),
  S(cyl(GAUGE.x, GAUGE.y, 10, DESK_TOP + 11, 5, 36, 0.5), "hi"),
  L(k.sideArc(GAUGE.x, GAUGE.y, 10, DESK_TOP + 12.2, P, 28), "faint"),
  d.dialFace(GAUGE.x, GAUGE.y, 10, DESK_TOP + 16, SWEEP, 20, 5),
  `<path data-needle class="iso-line" data-tone="lit" d="${d.needle(GAUGE.x, GAUGE.y, DESK_TOP + 16.2, 10, s.context, SWEEP)}"/>`,
  L(ring(GAUGE.x, GAUGE.y, 1, DESK_TOP + 16.2, 12), "lo"),
].join(""));

// the typewriter: the AI writes the answer, and the paper rises out of it
const TW: Plan = { x: TYPE_X - 20, y: TYPE_Y - 12, w: 40, d: 24, r: 3 };
const keysAt = () => {
  const pts: k.Flat[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) pts.push(at(TYPE_X - 14 + c * 4, TYPE_Y + 2 + r * 3.4, DESK_TOP + 9 + r * 0.6));
  return pts;
};
add("typewriter", TOP + 2, [
  d.halo(TW, DESK_TOP, 2),
  S(slab(TW, DESK_TOP, 9, 5, 0.8), "mid", { inner: L(k.sideSeam(TW, DESK_TOP + 4, P, 5), "faint") }),
  L(k.planOutline(k.insetPlan(TW, 2.4), DESK_TOP + 9, P, 5), "faint"),
  D(keysAt(), 0.7, "mid"),
  S(slab({ x: TYPE_X - 16, y: TYPE_Y - 11, w: 32, d: 5, r: 1.5 }, DESK_TOP + 9, 5, 3, 0.4), "hi"),
  S(cyl(TYPE_X - 19, TYPE_Y - 9, 2.4, DESK_TOP + 9, 5, 14), "mid"),
  S(cyl(TYPE_X + 19, TYPE_Y - 9, 2.4, DESK_TOP + 9, 5, 14), "mid"),
].join(""));
add("paper", TOP + 3, (s) => {
  if (s.paper < 0.5) return "";
  const y = TYPE_Y - 10;
  const z0 = DESK_TOP + 13;
  const rules = [5, 10, 15, 20, 25].filter((h) => h < s.paper - 2).map((h, row) => L(k.segment([TYPE_X - 9, y + 0.8, z0 + h], [TYPE_X - 9 + (s.unknown ? 7 : row % 2 ? 14 : 18), y + 0.8, z0 + h], P), s.unknown && row === 0 ? "red" : "lo", true));
  return S(slab({ x: TYPE_X - PAPER.w / 2, y, w: PAPER.w, d: 0.8, r: 0.3 }, z0, s.paper, 2), "hi", { lit: true }) + rules.join("");
});

export const ragProject: Machine<Scene> = {
  width: WIDTH,
  height: HEIGHT,
  label:
    "A small library. Ten books stand on a shelf, and each one is pulled out toward you by how closely it matches the question. A rolling ladder with a lamp scans along the shelf and a dial reads each match. The five best books jump onto a reading desk, a gauge shows how much text is on the desk, and a typewriter writes the answer only from those open books. For a question the books cannot answer, the typed line says it does not know.",
  items,
  settled,
  end: END,
  hold: 3.4,
  choices: QUESTIONS.length,
  frame,
};
