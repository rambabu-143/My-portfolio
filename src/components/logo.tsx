// Shared logo geometry — used by the animated splash (herosection.tsx) and the static nav mark below.
// Each entry: [x1, y1, x2, y2] — derived by parsing the original SVG paths
export const P1: [number, number, number, number][] = [
  [125, 101.5, 125,  35.5 ],
  [125,  35.5,  58.5, 0   ],
  [ 58.5,  0,    0,  35.5 ],
  [  0,   35.5, 125, 101.5],
  [125, 101.5,  98, 122.5 ],
  [ 98, 122.5, 146, 152   ],
  [146, 152,   114, 173   ],
  [114, 173,    58.5, 144.5],
  [ 58.5, 144.5, 0,  181.5],
  [  0,  181.5,  0,  110  ],
  [  0,  110,   31.5, 88  ],
  [ 31.5,  88,  98,  122.5],
];

export const P2: [number, number, number, number][] = [
  [ 27,  86,   27,  152   ],
  [ 27, 152,   93.5, 187.5],
  [ 93.5, 187.5, 152, 152 ],
  [152, 152,   27,   86   ],
  [ 27,  86,   54,   65   ],
  [ 54,  65,    6,   35.5 ],
  [  6,  35.5, 38,   14.5 ],
  [ 38,  14.5, 93.5, 43   ],
  [ 93.5, 43,  152,   6   ],
  [152,   6,   152,  77.5 ],
  [152,  77.5, 120.5, 99.5],
  [120.5, 99.5, 54,  65   ],
];

const toPath = (segs: [number, number, number, number][]) =>
  `M ${segs[0][0]} ${segs[0][1]} ` + segs.map(([, , x2, y2]) => `L ${x2} ${y2}`).join(" ");

// Static (non-animated) mark for persistent placement, e.g. the nav bar.
export function Logo({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * (188 / 152)}
      viewBox="0 0 152 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="nav_g1" x1="0" y1="0" x2="152" y2="188" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#cccccc" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
        <linearGradient id="nav_g2" x1="152" y1="0" x2="0" y2="188" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#aaaaaa" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>
      </defs>
      <path d={toPath(P1)} stroke="url(#nav_g1)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={toPath(P2)} stroke="url(#nav_g2)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
