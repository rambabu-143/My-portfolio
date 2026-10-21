import * as k from "../iso/iso-kit";
import type { Plan, Projection, Tone } from "../iso/iso-kit";

export const rad = (deg: number) => (deg * Math.PI) / 180;
export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const ease = (u: number) => u * u * (3 - 2 * u);
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

export function drawKit(P: Projection) {
  const S = (paths: k.SolidPaths, tone: Tone = "mid", o: { crease?: Tone | "none"; lit?: boolean; inner?: string; halo?: boolean } = {}) => k.solidSvg(paths, { tone, ...o });
  const L = (d: string, tone: k.LineTone = "lo", free = false) => (d ? k.lineSvg(d, { tone, free }) : "");
  const D = (points: k.Flat[], size = 0.5, tone: Tone = "mid") => (points.length ? k.dotsSvg(points, { size, tone }) : "");
  const slab = (plan: Plan, z: number, h: number, steps = 4, bevel = 0) => k.slabOf(plan, z, h, P, steps, bevel);
  const cyl = (cx: number, cy: number, r: number, z: number, h: number, steps = 28, bevel = 0) => k.cylinder(cx, cy, r, z, h, P, steps, bevel);
  const ring = (cx: number, cy: number, r: number, z: number, steps = 32) => k.ring(cx, cy, r, z, P, steps);
  const at = (x: number, y: number, z: number) => k.iso([x, y, z], P);
  const depth = (x: number, y: number, z: number) => k.depthOf([x, y, z], P);
  const byDepth = (points: k.Plane[]) => [...points].sort((a, b) => depth(a[0], a[1], 0) - depth(b[0], b[1], 0));
  const screws = (plan: Plan, inset: number, z: number, size = 0.5) => D(k.corners(plan, inset).map(([x, y]) => at(x, y, z)), size);
  const halo = (plan: Plan, z: number, h: number) => `<path class="iso-halo" d="${k.haloOf(plan, z, h, P)}"/>`;

  /** A heavy base plate on four feet, with a groove and corner screws. */
  const basePlate = (plan: Plan, h: number, footH: number) =>
    [
      halo(plan, -h - footH, h),
      ...byDepth(k.corners(plan, 16)).map(([x, y]) => S(cyl(x, y, 7, -h - footH, 1.6), "lo") + S(cyl(x, y, 5.5, -h - footH + 1.6, footH - 1.6), "mid")),
      S(slab(plan, -h, h, 8, 1.6), "mid"),
      L(k.planOutline(k.insetPlan(plan, 5), 0, P), "lo"),
      k.corners(plan, 10).map(([x, y]) => L(ring(x, y, 2.2, 0, 16), "lo")).join(""),
      screws(plan, 10, 0),
    ].join("");

  /** An engraved label plate with three rule lines. */
  const labelPlate = (plan: Plan, z = 0) =>
    [
      S(slab(plan, z, 0.8, 4), "lo", { crease: "none" }),
      L(k.planOutline(k.insetPlan(plan, 1.6), z + 0.8, P), "faint"),
      [0, 1, 2].map((row) => L(k.lineOnTop([plan.x + 7, plan.y + 4 + row * 3], [plan.x + (row === 1 ? plan.w * 0.55 : plan.w * 0.75), plan.y + 4 + row * 3], z + 0.8, P), "lo", true)).join(""),
      D([at(plan.x + 3.2, plan.y + plan.d / 2, z + 0.8), at(plan.x + plan.w - 3.2, plan.y + plan.d / 2, z + 0.8)], 0.45),
    ].join("");

  /** A dial face: ring, ticks over a sweep, optional red zone from `red` to 1 of the sweep. */
  const dialFace = (cx: number, cy: number, r: number, z: number, sweep: number, count: number, every: number, red?: number) => {
    const ticks = k.radialTicks(cx, cy, r - 1.2, count, every, z, [1.2, 2.4], P, rad(-sweep / 2), rad(sweep));
    let zone = "";
    if (red !== undefined) {
      const pts: k.Plane[] = [];
      for (let i = 0; i <= 12; i++) {
        const a = rad(-sweep / 2 + (red + (1 - red) * (i / 12)) * sweep);
        pts.push([cx + Math.sin(a) * (r - 3.4), cy - Math.cos(a) * (r - 3.4)]);
      }
      zone = L(k.onTop(pts, z, P), "red");
    }
    return [L(ring(cx, cy, r - 0.5, z, 40), "lo"), L(ticks.minor, "lo"), L(ticks.major, "mid"), zone].join("");
  };

  const needle = (cx: number, cy: number, z: number, r: number, reading: number, sweep: number) => {
    const a = rad(-sweep / 2 + clamp(reading) * sweep);
    return k.lineOnTop([cx, cy], [cx + Math.sin(a) * (r - 2), cy - Math.cos(a) * (r - 2)], z, P);
  };

  /** A post with a foot plate, standing at (x, y). */
  const post = (x: number, y: number, w: number, d: number, h: number, tone: Tone = "mid") => {
    const plan: Plan = { x: x - w / 2, y: y - d / 2, w, d, r: 1.5 };
    return S(slab(k.insetPlan(plan, -2.5), 0, 2, 4), "lo") + S(slab(plan, 2, h - 2, 4, 0.5), tone) + L(k.segment([plan.x + w, plan.y + d, 6], [plan.x + w, plan.y + d, h - 3], P), "faint");
  };

  /** A box with a selector knob and one lamp per choice. `dynamic` takes the knob as a float choice index. */
  const selector = (cx: number, cy: number, count: number) => {
    const plan: Plan = { x: cx - 20, y: cy - 18, w: 40, d: 36, r: 4 };
    const top = 6;
    const angles = Array.from({ length: count }, (_, i) => (count === 1 ? 0 : -50 + (100 * i) / (count - 1)));
    const lamp = (i: number): k.Flat => at(cx + Math.sin(rad(angles[i]!)) * 17, cy - Math.cos(rad(angles[i]!)) * 17, top);
    const ticks = k.radialTicks(cx, cy, 14.5, count - 1, 1, top, [2, 2], P, rad(-50), rad(100));
    const fixed = [
      halo(plan, 0, 6),
      S(slab(plan, 0, top, 5, 0.8), "mid"),
      L(k.planOutline(k.insetPlan(plan, 2.5), top, P, 5), "faint"),
      screws(plan, 5, top),
      L(ticks.major, "mid"),
      S(cyl(cx, cy, 11, top, 1.6, 36), "lo"),
      S(cyl(cx, cy, 9, top + 1.6, 5, 36, 0.5), "hi"),
      L(k.knurl(cx, cy, 9, top + 1.6, top + 6.6, 40, P, 0.3), "faint"),
      L(k.sideArc(cx, cy, 9, top + 3, P, 24), "faint"),
    ].join("");
    const dynamic = (knob: number) => {
      const a = rad(count === 1 ? 0 : -50 + (100 * knob) / (count - 1));
      const on = Math.round(knob);
      const tip: k.Plane = [cx + Math.sin(a) * 7.4, cy - Math.cos(a) * 7.4];
      return [
        L(k.lineOnTop([cx, cy], tip, top + 6.8, P), "lit"),
        D(angles.map((_, i) => i).filter((i) => i !== on).map(lamp), 0.5, "lo"),
        D([lamp(on)], 0.9, "hi"),
      ].join("");
    };
    return { fixed, dynamic };
  };

  return { selector, S, L, D, slab, cyl, ring, at, depth, byDepth, screws, halo, basePlate, labelPlate, dialFace, needle, post, P };
}
