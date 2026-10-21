import * as k from "../iso/iso-kit";
import { drawKit } from "../machine/draw";

export const OBJECT_W = 300;
export const OBJECT_H = 230;

const P = k.fitProjection(k.boxCorners({ x: -66, y: -66, w: 132, d: 132, r: 0 }, -4, 78), OBJECT_W, OBJECT_H, { pad: 6, azimuth: 45 });
const d = drawKit(P);
const { S, L, D, slab, cyl, ring, at } = d;

export type Mode = "idle" | "listen" | "think" | "tool" | "speak" | "late" | "person";

const circle = (r: number, z: number, from: number, to: number, n = 18) => {
  const pts: k.Plane[] = [];
  for (let i = 0; i <= n; i++) {
    const a = from + ((to - from) * i) / n;
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  return k.onTop(pts, z, P);
};
const fade = (o: number, inner: string) => `<g opacity="${Math.max(0, Math.min(1, o)).toFixed(2)}">${inner}</g>`;

const STATIC = [
  d.halo({ x: -58, y: -58, w: 116, d: 116, r: 16 }, -4, 4),
  S(slab({ x: -58, y: -58, w: 116, d: 116, r: 16 }, -4, 4, 8, 1), "lo"),
  L(k.planOutline({ x: -52, y: -52, w: 104, d: 104, r: 12 }, 0, P, 8), "faint"),
  d.screws({ x: -58, y: -58, w: 116, d: 116, r: 0 }, 8, 0, 0.5),
  S(cyl(0, 0, 30, 0, 4, 44), "lo"),
  S(cyl(0, 0, 25, 4, 32, 44, 0.6), "hi"),
  L(k.knurl(0, 0, 25, 7, 34, 56, P, 0.5), "faint"),
  L(k.sideArc(0, 0, 25, 12, P, 28), "faint"),
  L(k.sideArc(0, 0, 25, 28, P, 28), "faint"),
  S(cyl(0, 0, 26, 36, 3.4, 44, 0.4), "mid"),
].join("");

/** A small desk speaker. Its ring and waves show what the voice agent is doing. */
export function objectSvg(mode: Mode, t: number): string {
  const lit = mode !== "idle";
  const tone: k.LineTone = mode === "late" ? "red" : mode === "person" ? "green" : lit ? "lit" : "lo";
  const z = 39.5;
  const parts: string[] = [STATIC];

  // sound waves on the desk
  if (mode === "listen" || mode === "speak") {
    const out = mode === "speak";
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.9 + i / 3) % 1;
      const r = out ? 34 + ph * 26 : 60 - ph * 26;
      parts.push(fade(Math.sin(Math.PI * ph) * 0.9, L(k.onTop(Array.from({ length: 41 }, (_, j) => [Math.cos((j / 40) * Math.PI * 2) * r, Math.sin((j / 40) * Math.PI * 2) * r] as k.Plane), 0.2, P, true), "hi")));
    }
  }
  // the light ring on top
  parts.push(L(ring(0, 0, 20, z, 40), tone));
  parts.push(L(ring(0, 0, 13, z, 32), lit ? tone : "faint"));
  if (mode === "think" || mode === "tool" || mode === "late") {
    const a = t * 3.2;
    parts.push(L(circle(16.5, z, a, a + 1.2), "lit"), L(circle(16.5, z, a + 2.1, a + 3.3), "lit"), L(circle(16.5, z, a + 4.2, a + 5.4), "lit"));
  }
  if (mode === "listen") parts.push(D([at(0, 22.5, 30)], 1.3, "hi"));
  if (mode === "speak") parts.push(fade(0.6 + 0.4 * Math.sin(t * 9), L(ring(0, 0, 6 + 3 * Math.sin(t * 9), z, 24), "lit")));
  // an antenna that reaches for the dealership's system while a tool runs
  const reach = mode === "tool" || mode === "late" ? 1 : 0;
  parts.push(S(cyl(14, -14, 1.2, 39.4, 8 + reach * 10, 10), "mid", { crease: "none" }), S(cyl(14, -14, 2.6, 47.4 + reach * 10, 2.6, 14), "hi", { lit: reach > 0 }));
  if (reach) parts.push(D([0, 1, 2].map((i) => at(14, -14, 54 + ((t * 1.4 + i / 3) % 1) * 16)), 1.1, "hi"));
  if (mode === "person") parts.push(D([at(0, 0, 40)], 1.6, "hi"));
  return parts.join("");
}
