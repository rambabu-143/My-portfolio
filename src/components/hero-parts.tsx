// Top-down drawings of laptop parts (hardware) and glass UI panes (software), all in a 440x280 box.
import type { ReactNode } from "react";

const S = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 440 280" width="100%" height="100%" aria-hidden="true" style={{ display: "block" }}>{children}</svg>
);
const Screw = ({ x, y, r = 4 }: { x: number; y: number; r?: number }) => (
  <g><circle cx={x} cy={y} r={r} fill="#5d636c" stroke="#2b2e33" strokeWidth="1" /><path d={`M${x - r + 1} ${y}H${x + r - 1}M${x} ${y - r + 1}V${y + r - 1}`} stroke="#2b2e33" strokeWidth="1" /></g>
);

export const Chassis = () => (
  <S>
    <rect x="2" y="2" width="436" height="276" rx="16" fill="#9ba1aa" stroke="#6b7078" strokeWidth="2" />
    <rect x="14" y="14" width="412" height="252" rx="10" fill="#858b94" stroke="#6b7078" />
    {Array.from({ length: 16 }, (_, i) => <rect key={i} x={120 + i * 12} y="20" width="5" height="16" rx="2.5" fill="#444850" />)}
    {[0, 1].map((s) => <g key={s}>{Array.from({ length: 7 }, (_, i) => <rect key={i} x={s ? 394 : 26} y={90 + i * 11} width="20" height="4" rx="2" fill="#444850" />)}</g>)}
    <rect x="30" y="2" width="70" height="12" rx="3" fill="#5d636c" /><rect x="340" y="2" width="70" height="12" rx="3" fill="#5d636c" />
    <circle cx="300" cy="150" r="34" fill="#6d737c" stroke="#555a62" strokeWidth="2" /><circle cx="300" cy="150" r="22" fill="#4a4e56" />
    {[[34, 34], [406, 34], [34, 246], [406, 246]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="11" fill="#1d1e21" />)}
    {[[70, 60], [370, 60], [70, 220], [370, 220], [220, 250], [220, 62], [150, 150], [440 - 150, 190]].map(([x, y]) => <Screw key={`${x}${y}`} x={x} y={y} />)}
    <text x="220" y="262" textAnchor="middle" fontSize="8" fill="#555a62" fontFamily="monospace" letterSpacing="2">BOTTOM CASE · ALUMINIUM</text>
  </S>
);

export const Battery = () => (
  <S>
    <rect x="30" y="30" width="360" height="220" rx="12" fill="#27304a" stroke="#4b5878" strokeWidth="2" />
    {[0, 1, 2].map((c) => [0, 1].map((r) => (
      <g key={`${c}${r}`}>
        <rect x={44 + c * 113} y={44 + r * 100} width="104" height="88" rx="14" fill="#171d2f" stroke="#3a4766" />
        <rect x={54 + c * 113} y={54 + r * 100} width="84" height="68" rx="10" fill="#222b44" />
        <text x={96 + c * 113} y={96 + r * 100} textAnchor="middle" fontSize="20" fill="#7fa0ff" fontFamily="monospace">+ −</text>
      </g>
    )))}
    <rect x="130" y="120" width="160" height="40" rx="6" fill="#e8a33b" />
    <text x="210" y="138" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#2a1a00" fontWeight="700">Li-ion · 11.4 V · 56 Wh</text>
    <text x="210" y="152" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#2a1a00">DO NOT PUNCTURE</text>
    <path d="M390 140H414" stroke="#cf2f2f" strokeWidth="4" /><path d="M390 156H414" stroke="#111" strokeWidth="4" />
    <rect x="410" y="128" width="26" height="36" rx="3" fill="#e9e6df" stroke="#9a968c" />
    {[0, 1, 2, 3].map((i) => <rect key={i} x="426" y={132 + i * 8} width="8" height="4" fill="#d6a53a" />)}
  </S>
);

export const Mainboard = () => (
  <S>
    <rect x="4" y="4" width="432" height="272" rx="14" fill="#0f4a3a" stroke="#1d7a60" strokeWidth="2" />
    {[[150, 135, 100, 135], [150, 150, 60, 150, 60, 215], [240, 120, 270, 120, 270, 70], [240, 165, 330, 165, 330, 210], [195, 90, 195, 40, 300, 40], [170, 180, 170, 240, 260, 240]].map((p, i) => (
      <polyline key={i} points={p.join(" ")} fill="none" stroke="#d4ab5a" strokeOpacity=".55" strokeWidth="2" />
    ))}
    {Array.from({ length: 28 }, (_, i) => <circle key={i} cx={30 + (i % 14) * 14} cy={i < 14 ? 250 : 264} r="2" fill="#d4ab5a" opacity=".7" />)}
    <rect x="148" y="88" width="94" height="94" rx="6" fill="#2d3138" stroke="#555b66" strokeWidth="2" />
    <rect x="160" y="100" width="70" height="70" rx="4" fill="#a2a8b1" stroke="#7d838c" />
    <text x="195" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill="#2d3138">CPU</text>
    <text x="195" y="148" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#2d3138">8 CORE · NPU</text>
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x="270" y={38 + i * 28} width="140" height="22" rx="2" fill="#1a1a1d" stroke="#d4ab5a" />
        {[0, 1, 2, 3].map((c) => <rect key={c} x={282 + c * 30} y={42 + i * 28} width="22" height="14" rx="1.5" fill="#0c0c0e" stroke="#444" />)}
      </g>
    ))}
    <rect x="270" y="196" width="136" height="30" rx="3" fill="#202228" stroke="#d4ab5a" />
    {[0, 1, 2].map((c) => <rect key={c} x={290 + c * 36} y="201" width="28" height="20" rx="2" fill="#0c0c0e" stroke="#555" />)}
    <circle cx="276" cy="211" r="4" fill="#d4ab5a" />
    <circle cx="86" cy="196" r="46" fill="#14171b" stroke="#444a53" strokeWidth="2" />
    {Array.from({ length: 7 }, (_, i) => <path key={i} d="M86 196 Q104 168 92 152 Q78 170 86 196Z" fill="#2a2f36" stroke="#4d545e" transform={`rotate(${i * (360 / 7)} 86 196)`} />)}
    <circle cx="86" cy="196" r="9" fill="#555b64" />
    <path d="M118 172 L148 150" stroke="#b87333" strokeWidth="9" strokeLinecap="round" />
    {[60, 90, 120].map((y) => <rect key={y} x="4" y={y - 8} width="22" height="16" rx="2" fill="#2b2e33" stroke="#d4ab5a" />)}
    {[[24, 24], [416, 24], [24, 256], [416, 256], [248, 20]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#d4ab5a" stroke="#6b5420" />)}
    {[[110, 50], [124, 50], [138, 50], [320, 250], [334, 250]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#a5adb8" stroke="#333" />)}
  </S>
);

const fnRow = Array(14).fill(15 / 14);
const rows: number[][] = [
  [...Array(13).fill(1), 2],
  [1.5, ...Array(12).fill(1), 1.5],
  [1.8, ...Array(11).fill(1), 2.2],
  [2.3, ...Array(10).fill(1), 2.7],
  [1.1, 1.1, 1.1, 1.3, 5.2, 1.3, 1.1, 2.8],
];
export const Keyboard = () => {
  const x0 = 52, u = 336 / 15;
  const keyRows = [{ w: fnRow, y: 16, h: 16 }, ...rows.map((w, i) => ({ w, y: 38 + i * 31, h: 27 }))];
  return (
    <S>
      <defs><linearGradient id="hxdeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d3d7de" /><stop offset="1" stopColor="#b9bec7" /></linearGradient></defs>
      <rect x="2" y="2" width="436" height="276" rx="16" fill="url(#hxdeck)" stroke="#8d939c" strokeWidth="2" />
      <rect x="22" y="2" width="396" height="7" rx="3.5" fill="#33363c" />
      {[0, 1].map((side) => Array.from({ length: 6 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
        <circle key={`${side}${r}${c}`} cx={(side ? 396 : 18) + c * 6} cy={50 + r * 20} r="1.3" fill="#5d636c" />
      ))))}
      {keyRows.map((row, r) => {
        let x = x0;
        return row.w.map((w, k) => {
          const kx = x; x += w * u;
          return <rect key={`${r}-${k}`} x={kx} y={row.y} width={w * u - 3} height={row.h} rx="4" fill="#111214" stroke="#2c2e33" />;
        });
      })}
      <rect x="112" y="204" width="216" height="68" rx="8" fill="#c4c9d1" stroke="#9aa0a9" strokeWidth="1.5" />
    </S>
  );
};

const scene = (n: number) => ({ className: `hx-scene hx-s${n}` });
const sans = "system-ui, sans-serif";
const mono = "ui-monospace, monospace";
const Screen = () => (
  <g>
    <rect x="9" y="9" width="422" height="262" rx="6" fill="url(#hxscr)" />
    <rect x="9" y="9" width="422" height="15" fill="#000" fillOpacity=".35" />
    {[["#ff5f57", "×"], ["#febc2e", "−"], ["#28c840", "+"]].map(([c, g], i) => (
      <g key={c}><circle cx={21 + i * 14} cy="16.5" r="4.6" fill={c} /><text x={21 + i * 14} y="19" textAnchor="middle" fontSize="7" fontWeight="700" fill="#3a2a00" fillOpacity=".7" fontFamily={sans}>{g}</text></g>
    ))}
    {/* Zaya: a call in progress */}
    <g {...scene(1)}>
      <text x="26" y="48" fontSize="11" fontWeight="700" fill="#fff" fontFamily={sans}>Zaya · voice agent on a live call</text>
      <g className="hx-line" style={{ animationDelay: ".5s" }}><rect x="26" y="60" width="200" height="24" rx="12" fill="#2b3f73" /><text x="38" y="76" fontSize="9" fill="#dce8ff" fontFamily={sans}>Do you have a 2024 Camry in stock?</text></g>
      <g className="hx-line" style={{ animationDelay: "1.4s" }}><rect x="170" y="92" width="238" height="24" rx="12" fill="#4f8cff" /><text x="182" y="108" fontSize="9" fill="#fff" fontFamily={sans}>Checking inventory… 3 available today.</text></g>
      <g className="hx-line" style={{ animationDelay: "2.4s" }}><rect x="26" y="124" width="170" height="24" rx="12" fill="#2b3f73" /><text x="38" y="140" fontSize="9" fill="#dce8ff" fontFamily={sans}>Book a test drive Saturday?</text></g>
      {Array.from({ length: 40 }, (_, i) => <rect key={i} className="hx-bar" x={50 + i * 8.6} y="196" width="4" height="50" rx="2" fill="#8db4ff" style={{ animationDelay: `${-((i * 37) % 10) / 10}s` }} />)}
    </g>
    {/* GraphRAG: traversal across connected sources */}
    <g {...scene(2)}>
      <text x="26" y="48" fontSize="11" fontWeight="700" fill="#fff" fontFamily={sans}>GraphRAG · multi-hop retrieval</text>
      {[[60, 110, 150, 85], [150, 85, 230, 140], [230, 140, 330, 100], [330, 100, 385, 170], [150, 85, 210, 200], [230, 140, 210, 200], [60, 110, 100, 190], [210, 200, 330, 215]].map(([x1, y1, x2, y2], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6f8fd6" strokeOpacity=".55" strokeWidth="1.5" />)}
      <polyline className="hx-trace" points="60,110 150,85 230,140 330,100 385,170" fill="none" stroke="#7dffc8" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" pathLength="600" strokeDasharray="600" />
      {[[60, 110], [150, 85], [230, 140], [330, 100], [385, 170], [210, 200], [100, 190], [330, 215]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" fill="#0b1328" stroke="#9fc0ff" strokeWidth="2" />)}
      <text x="26" y="252" fontSize="9" fill="#cfe0ff" fontFamily={mono}>question → vector hit → entity → related source → answer</text>
    </g>
    {/* MCP CLI: scaffold in one command */}
    <g {...scene(3)}>
      <rect x="22" y="36" width="396" height="222" rx="8" fill="#06090f" fillOpacity=".85" stroke="#8db4ff" strokeOpacity=".4" />
      {["$ mcp-cli init inventory-server", "✓ scaffolded project layout", "✓ registered tools", "✓ wrote config", "✓ server ready on :8080"].map((t, i) => (
        <text key={t} className="hx-line" x="38" y={62 + i * 26} fontSize="11" fontFamily={mono} fill={i ? "#7dffc8" : "#e8f0ff"} style={{ ["--l" as string]: `${0.4 + i * 0.6}s` }}>{t}</text>
      ))}
      <rect className="hx-caret" x="38" y="196" width="7" height="13" fill="#e8f0ff" />
    </g>
  </g>
);

export const Display = () => (
  <S>
    <defs>
      <linearGradient id="hxscr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0b1328" /><stop offset="1" stopColor="#1b3f8f" /></linearGradient>
    </defs>
    <rect x="2" y="2" width="436" height="276" rx="14" fill="#060607" stroke="#2a2c31" strokeWidth="2" />
    <Screen />
    <path d="M9 9H300L170 271H9Z" fill="#fff" opacity=".04" />
    <path d="M190 2H250V6Q250 17 239 17H201Q190 17 190 6Z" fill="#060607" />
    <circle cx="220" cy="8" r="2.2" fill="#1b2a44" />
  </S>
);

const Glass = ({ children }: { children: ReactNode }) => (
  <S>
    <rect x="3" y="3" width="434" height="274" rx="16" fill="#4f8cff" fillOpacity=".13" stroke="#8db4ff" strokeOpacity=".8" strokeWidth="1.5" />
    {children}
  </S>
);
const t = { fontFamily: "ui-monospace, monospace", fill: "#dbe7ff" } as const;

export const OsPane = () => (
  <Glass>
    <rect x="3" y="3" width="434" height="20" rx="14" fill="#8db4ff" fillOpacity=".2" />
    <rect x="50" y="44" width="250" height="150" rx="10" fill="#0b1328" fillOpacity=".75" stroke="#8db4ff" strokeOpacity=".7" />
    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <circle key={c} cx={66 + i * 16} cy="60" r="4.5" fill={c} />)}
    <text x="66" y="92" fontSize="12" {...t}>$ ssh prod-agent</text><text x="66" y="112" fontSize="12" {...t} opacity=".7">processes · files · network</text>
    <rect x="320" y="60" width="86" height="110" rx="8" fill="#0b1328" fillOpacity=".6" stroke="#8db4ff" strokeOpacity=".5" />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={110 + i * 34} y="224" width="26" height="26" rx="7" fill="#8db4ff" fillOpacity={0.25 + (i % 3) * 0.12} stroke="#8db4ff" strokeOpacity=".6" />)}
  </Glass>
);
export const LanguagesPane = () => (
  <Glass>
    {[["Python", 40, "#ffd45e"], ["Go", 118, "#6fe3ff"], ["TypeScript", 196, "#7fa8ff"]].map(([n, y, c]) => (
      <g key={n as string}>
        <rect x="26" y={y as number} width="388" height="64" rx="9" fill="#0b1328" fillOpacity=".7" stroke={c as string} strokeOpacity=".55" />
        <text x="40" y={(y as number) + 22} fontSize="12" fontWeight="700" fontFamily="ui-monospace, monospace" fill={c as string}>{n as string}</text>
        {[110, 160, 70].map((w, i) => <rect key={i} x={40 + (i === 1 ? 16 : 0)} y={(y as number) + 32 + i * 9} width={w} height="4" rx="2" fill={c as string} opacity=".6" />)}
      </g>
    ))}
  </Glass>
);
export const FrameworksPane = () => (
  <Glass>
    <path d="M110 100L220 160M330 100L220 160M110 100H330" stroke="#8db4ff" strokeOpacity=".7" strokeWidth="2" strokeDasharray="5 5" fill="none" />
    {[["FastAPI", 70, 70], ["Next.js", 290, 70], ["LiveKit", 180, 140]].map(([n, x, y]) => (
      <g key={n as string}>
        <rect x={x as number} y={y as number} width="80" height="60" rx="12" fill="#0b1328" fillOpacity=".8" stroke="#8db4ff" />
        <text x={(x as number) + 40} y={(y as number) + 35} textAnchor="middle" fontSize="12" {...t}>{n as string}</text>
      </g>
    ))}
    <text x="220" y="250" textAnchor="middle" fontSize="10" {...t} opacity=".7">API · UI · realtime voice</text>
  </Glass>
);
export const AiPane = () => (
  <Glass>
    <path d="M220 140L100 70M220 140L340 70M220 140L100 210M220 140L340 210" stroke="#8db4ff" strokeWidth="2" strokeOpacity=".8" fill="none" />
    <circle cx="220" cy="140" r="30" fill="#4f8cff" fillOpacity=".5" stroke="#cfe0ff" strokeWidth="2" />
    <text x="220" y="144" textAnchor="middle" fontSize="12" fontWeight="700" {...t}>LLM</text>
    {[["MCP", 100, 70], ["GraphRAG", 340, 70], ["RAGAS", 100, 210], ["DeepEval", 340, 210]].map(([n, x, y]) => (
      <g key={n as string}>
        <circle cx={x as number} cy={y as number} r="30" fill="#0b1328" fillOpacity=".85" stroke="#8db4ff" strokeWidth="1.5" />
        <text x={x as number} y={(y as number) + 4} textAnchor="middle" fontSize="10" {...t}>{n as string}</text>
      </g>
    ))}
  </Glass>
);

const LidShell = () => (
  <S>
    <defs><linearGradient id="hxlid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c9cdd5" /><stop offset="1" stopColor="#9097a1" /></linearGradient></defs>
    <rect x="2" y="2" width="436" height="276" rx="14" fill="url(#hxlid)" stroke="#6b7078" strokeWidth="2" />
    <path transform="translate(190 100) scale(2.5)" fill="#eef0f3" stroke="#7b818b" strokeWidth=".3" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </S>
);

// Two faces on one lid: the aluminium shell (with the logo) faces up when closed; the screen faces you when open.
export const Lid = () => (
  <>
    <div className="hx-face"><LidShell /></div>
    <div className="hx-face hx-back"><Display /></div>
  </>
);
