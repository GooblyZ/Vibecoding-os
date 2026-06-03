import type { ReactElement } from "react";
import type { Project } from "../lib/data";

// Abstract system visuals — pure CSS/SVG, no external images.
// Each renders a thematic preview that feels intentional, not placeholder.

function BookingVisual({ accent }: { accent: string }) {
  const days = ["SUN", "MON", "TUE", "WED"];
  const times = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00"];
  const selRow = 2; // 11:00 highlighted
  const selCol = 1; // MON selected
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Service header bar */}
      <rect x={12} y={6} width={296} height={15} rx={2}
        fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth={0.75} />
      <text x={18} y={16.5} fill={accent} fontSize={6.5} fontFamily="monospace" opacity={0.5} letterSpacing={0.6}>
        Haircut + Beard  ·  30 min  ·  ₪80
      </text>
      <text x={266} y={16.5} fill={accent} fontSize={6.5} fontFamily="monospace" opacity={0.28}>SELECT</text>

      {/* Day headers */}
      {days.map((day, i) => (
        <text key={day} x={86 + i * 54} y={32} fill={accent}
          fontSize={6.5} fontFamily="monospace" opacity={i === selCol ? 0.70 : 0.22} textAnchor="middle">
          {day}
        </text>
      ))}

      {/* Time rows × 4 day columns */}
      {times.map((t, row) => (
        <g key={t}>
          <text x={12} y={46 + row * 13} fill={accent} fontSize={6.5} fontFamily="monospace"
            opacity={row === selRow ? 0.80 : 0.28}>
            {t}
          </text>
          {days.map((_, col) => {
            const isSel    = row === selRow && col === selCol;
            const isBooked = !isSel && (row * 3 + col * 2) % 5 === 0;
            return (
              <rect key={col}
                x={63 + col * 54} y={39 + row * 13}
                width={44} height={9} rx={2}
                fill={isSel ? accent : isBooked ? "rgba(255,255,255,0.015)" : "transparent"}
                stroke={isSel ? accent : isBooked ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)"}
                strokeWidth={0.75}
                opacity={isSel ? 0.88 : 1}
              />
            );
          })}
        </g>
      ))}

      {/* Confirmation strip */}
      <rect x={12} y={107} width={296} height={10} rx={2}
        fill={accent} fillOpacity={0.08} stroke={accent} strokeWidth={0.5} strokeOpacity={0.30} />
      <text x={20} y={114.5} fill={accent} fontSize={6.5} fontFamily="monospace" opacity={0.55}>
        ✓  11:00 · Monday — awaiting confirmation
      </text>

      <ellipse cx="160" cy="68" rx="88" ry="36" fill={accent} opacity={0.04} />
    </svg>
  );
}

function MotionVisual({ accent }: { accent: string }) {
  // Cinematic speed streaks — increasing weight toward center
  const streaks = [
    { y: 20, x1: 30,  w: 0.6, o: 0.15 },
    { y: 29, x1: 55,  w: 0.9, o: 0.24 },
    { y: 38, x1: 20,  w: 1.4, o: 0.38 },
    { y: 47, x1: 70,  w: 2.0, o: 0.52 },
    { y: 56, x1: 10,  w: 2.8, o: 0.72 }, // hotline
    { y: 65, x1: 50,  w: 2.0, o: 0.55 },
    { y: 74, x1: 25,  w: 1.4, o: 0.38 },
    { y: 83, x1: 80,  w: 0.9, o: 0.22 },
    { y: 92, x1: 40,  w: 0.6, o: 0.13 },
    { y: 101,x1: 100, w: 0.5, o: 0.10 },
  ];
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="neovolt-vel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={accent} stopOpacity="0"    />
          <stop offset="65%"  stopColor={accent} stopOpacity="0.07" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.26" />
        </linearGradient>
        <radialGradient id="neovolt-lead" cx="96%" cy="47%" r="28%">
          <stop offset="0%"   stopColor={accent} stopOpacity="0.60" />
          <stop offset="100%" stopColor={accent} stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Velocity atmosphere */}
      <rect width={320} height={120} fill="url(#neovolt-vel)" />
      <rect width={320} height={120} fill="url(#neovolt-lead)" />

      {/* Speed streaks — all end at x=310 */}
      {streaks.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y} x2={310} y2={s.y}
          stroke={accent} strokeWidth={s.w} opacity={s.o} />
      ))}

      {/* Leading edge — bright focal point */}
      <circle cx={310} cy={56} r={4.5} fill={accent} opacity={0.95} />
      <circle cx={310} cy={56} r={11}  fill={accent} opacity={0.20} />
      <circle cx={310} cy={56} r={22}  fill={accent} opacity={0.07} />

      {/* Speed label */}
      <text x={14} y={113} fill={accent} fontSize={7.5} fontFamily="monospace"
        opacity={0.20} letterSpacing={1.5}>
        NEOVOLT · 0 – 100 IN 2.8s
      </text>

      {/* Telemetry ticks */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i}
          x1={8 + i * 22} y1={108}
          x2={8 + i * 22} y2={i % 4 === 0 ? 98 : 104}
          stroke={accent} strokeWidth={0.75} opacity={0.16} />
      ))}
    </svg>
  );
}

function ScrollVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bat-atmo" cx="50%" cy="48%" r="42%">
          <stop offset="0%"   stopColor={accent} stopOpacity="0.11" />
          <stop offset="100%" stopColor={accent} stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Atmospheric depth glow */}
      <rect width={320} height={120} fill="url(#bat-atmo)" />

      {/* Scroll flight path — dramatic arc */}
      <path d="M 16 92 Q 55 28 118 56 Q 182 84 244 36 Q 278 16 304 26"
        stroke={accent} strokeWidth={0.75} opacity={0.22} strokeDasharray="3 8" />

      {/* Depth particles along path */}
      {[[55, 36], [118, 56], [182, 70], [244, 38]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.5 - i * 0.15}
          fill={accent} opacity={0.20 - i * 0.04} />
      ))}

      {/* BAT — recognizable silhouette centered at (170, 54) */}
      {/* Left wing */}
      <path
        d="M 170 54 C 157 43 142 39 130 47 C 126 50 126 55 133 56 C 142 57 156 53 170 54Z"
        fill={accent} opacity={0.72}
      />
      {/* Left wing membrane veins */}
      <path d="M 170 54 C 158 51 146 51 138 54"
        stroke={accent} strokeWidth={0.6} strokeOpacity={0.38} fill="none" />
      <path d="M 163 50 C 152 49 142 50 135 53"
        stroke={accent} strokeWidth={0.4} strokeOpacity={0.22} fill="none" />

      {/* Right wing */}
      <path
        d="M 170 54 C 183 43 198 39 210 47 C 214 50 214 55 207 56 C 198 57 184 53 170 54Z"
        fill={accent} opacity={0.72}
      />
      {/* Right wing membrane veins */}
      <path d="M 170 54 C 182 51 194 51 202 54"
        stroke={accent} strokeWidth={0.6} strokeOpacity={0.38} fill="none" />
      <path d="M 177 50 C 188 49 198 50 205 53"
        stroke={accent} strokeWidth={0.4} strokeOpacity={0.22} fill="none" />

      {/* Body */}
      <ellipse cx={170} cy={55} rx={5.5} ry={4.5} fill={accent} opacity={0.90} />
      {/* Eyes — subtle */}
      <circle cx={168} cy={53.5} r={1.2} fill="rgba(0,0,0,0.85)" />
      <circle cx={172} cy={53.5} r={1.2} fill="rgba(0,0,0,0.85)" />

      {/* Scroll progress track */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={304} y={8 + i * 10} width={8} height={6} rx={1.5}
          fill={i === 5 ? accent : "white"}
          opacity={i === 5 ? 0.70 : 0.05} />
      ))}

      {/* Caption */}
      <text x={14} y={112} fill={accent} fontSize={6.5} fontFamily="monospace"
        opacity={0.24} letterSpacing={1}>
        scroll → drives motion
      </text>
    </svg>
  );
}

function RoomPlannerVisual({ accent }: { accent: string }) {
  // 2D floor plan — walls, furniture, selected object with handles
  const handles: [number, number][] = [[21, 54], [63, 54], [21, 75], [63, 75]];
  const sofaCushions = [171, 202, 233];
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* ── Room boundary ── */}
      <rect x={14} y={8} width={292} height={104} rx={1.5}
        stroke={accent} strokeWidth={2.2} strokeOpacity={0.55} fill="none" />

      {/* Interior dividing wall */}
      <line x1={158} y1={8}  x2={158} y2={50} stroke={accent} strokeWidth={1.4} strokeOpacity={0.32} />
      <line x1={158} y1={62} x2={158} y2={112} stroke={accent} strokeWidth={1.4} strokeOpacity={0.32} />
      {/* Door arc hint */}
      <path d="M 158 50 Q 144 50 144 62" stroke={accent} strokeWidth={0.75} strokeOpacity={0.22}
        strokeDasharray="2 2" fill="none" />

      {/* ── LEFT ROOM (bedroom) ── */}

      {/* Bed */}
      <rect x={22} y={14} width={52} height={34} rx={2}
        fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={0.75} strokeOpacity={0.26} />
      {/* Headboard */}
      <rect x={22} y={14} width={52} height={8} rx={1.5}
        fill={accent} fillOpacity={0.12} stroke={accent} strokeWidth={0.5} strokeOpacity={0.34} />
      {/* Pillows */}
      <rect x={28} y={26} width={16} height={9} rx={2}
        fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={0.4} strokeOpacity={0.18} />
      <rect x={50} y={26} width={16} height={9} rx={2}
        fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={0.4} strokeOpacity={0.18} />
      <text x={48} y={43} textAnchor="middle" fill={accent} fontSize={5.5} fontFamily="monospace" opacity={0.18}>BED</text>

      {/* Wardrobe */}
      <rect x={22} y={55} width={30} height={22} rx={1.5}
        fill={accent} fillOpacity={0.05} stroke={accent} strokeWidth={0.75} strokeOpacity={0.22} />
      <line x1={37} y1={55} x2={37} y2={77} stroke={accent} strokeWidth={0.5} strokeOpacity={0.16} />
      <text x={37} y={68} textAnchor="middle" fill={accent} fontSize={4.5} fontFamily="monospace" opacity={0.18}>WRD</text>

      {/* Nightstand */}
      <rect x={80} y={14} width={14} height={14} rx={1.5}
        fill={accent} fillOpacity={0.04} stroke={accent} strokeWidth={0.5} strokeOpacity={0.18} />

      {/* Desk — SELECTED */}
      <rect x={24} y={84} width={42} height={21} rx={1.5}
        fill={accent} fillOpacity={0.13} stroke={accent} strokeWidth={1} strokeOpacity={0.78} />
      {/* Dashed selection box */}
      <rect x={21} y={81} width={48} height={27} rx={2}
        stroke={accent} strokeWidth={0.75} strokeOpacity={0.58} strokeDasharray="3 2" fill="none" />
      {/* Corner handles */}
      {handles.map(([x, y], i) => (
        <rect key={i} x={x - 2.5} y={y - 2.5} width={5} height={5} rx={0.75}
          fill={accent} opacity={0.68} />
      ))}
      <text x={45} y={96} textAnchor="middle" fill={accent} fontSize={5.5} fontFamily="monospace" opacity={0.52}>DESK</text>

      {/* Chair */}
      <rect x={74} y={87} width={16} height={16} rx={8}
        fill={accent} fillOpacity={0.05} stroke={accent} strokeWidth={0.5} strokeOpacity={0.18} />

      {/* ── RIGHT ROOM (living) ── */}

      {/* Sofa */}
      <rect x={166} y={14} width={110} height={24} rx={3}
        fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={0.75} strokeOpacity={0.26} />
      {sofaCushions.map((x) => (
        <rect key={x} x={x} y={18} width={28} height={13} rx={2}
          fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={0.4} strokeOpacity={0.16} />
      ))}

      {/* Coffee table */}
      <rect x={188} y={47} width={64} height={26} rx={2}
        fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={0.75} strokeOpacity={0.24} />
      <text x={220} y={62} textAnchor="middle" fill={accent} fontSize={5} fontFamily="monospace" opacity={0.20}>TABLE</text>

      {/* TV unit */}
      <rect x={166} y={86} width={110} height={10} rx={1.5}
        fill={accent} fillOpacity={0.04} stroke={accent} strokeWidth={0.5} strokeOpacity={0.22} />
      <text x={221} y={93} textAnchor="middle" fill={accent} fontSize={4.5} fontFamily="monospace" opacity={0.18}>TV UNIT</text>

      {/* ── Status / label bar ── */}
      <rect x={108} y={104} width={104} height={9} rx={1.5}
        fill="rgba(0,0,0,0.32)" stroke={accent} strokeWidth={0.5} strokeOpacity={0.30} />
      <text x={160} y={110.5} textAnchor="middle" fill={accent} fontSize={5.5} fontFamily="monospace" opacity={0.55}>
        ● DESK SELECTED
      </text>

      {/* Soft glow on selected area */}
      <ellipse cx="45" cy="92" rx="32" ry="16" fill={accent} opacity={0.05} />
    </svg>
  );
}

function GameVisual({ accent }: { accent: string }) {
  const coins = [
    { cx: 44,  cy: 40, r: 11, o: 0.78 },
    { cx: 84,  cy: 60, r:  8, o: 0.55 },
    { cx: 126, cy: 34, r: 13, o: 0.85 },
    { cx: 160, cy: 74, r:  6, o: 0.42 },
    { cx: 196, cy: 44, r: 10, o: 0.66 },
    { cx: 232, cy: 28, r:  9, o: 0.52 },
    { cx: 268, cy: 64, r: 14, o: 0.76 },
    { cx: 296, cy: 34, r:  6, o: 0.36 },
  ];
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Score HUD — left */}
      <rect x={8} y={7} width={98} height={17} rx={3}
        fill="rgba(0,0,0,0.30)" stroke={accent} strokeWidth={0.75} strokeOpacity={0.24} />
      <text x={15} y={19.5} fill={accent} fontSize={7.5} fontFamily="monospace" opacity={0.55} letterSpacing={0.4}>
        SCORE  1,240
      </text>

      {/* Level badge — right */}
      <rect x={214} y={7} width={98} height={17} rx={3}
        fill="rgba(0,0,0,0.25)" stroke={accent} strokeWidth={0.75} strokeOpacity={0.18} />
      <text x={222} y={19.5} fill={accent} fontSize={7.5} fontFamily="monospace" opacity={0.40}>
        LVL 04  EASY
      </text>

      {/* Achievement notification banner */}
      <rect x={90} y={88} width={140} height={20} rx={3}
        fill="rgba(0,0,0,0.50)" stroke={accent} strokeWidth={0.75} strokeOpacity={0.42} />
      <text x={160} y={101.5} fill={accent} fontSize={7} fontFamily="monospace"
        opacity={0.72} textAnchor="middle" letterSpacing={0.5}>
        ✦ ACHIEVEMENT UNLOCKED
      </text>

      {/* XP bar */}
      <rect x={8}  y={110} width={215} height={5} rx={2.5} fill="rgba(255,255,255,0.05)" />
      <rect x={8}  y={110} width={140} height={5} rx={2.5} fill={accent} opacity={0.30} />
      <text x={228} y={116} fill={accent} fontSize={6} fontFamily="monospace" opacity={0.26}>
        140/215 XP
      </text>

      {/* Coins */}
      {coins.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={c.r}   fill={accent} opacity={c.o * 0.18} />
          <circle cx={c.cx} cy={c.cy} r={c.r}   stroke={accent} strokeWidth={0.85} opacity={c.o * 0.50} />
          <text x={c.cx} y={c.cy + 3.5} textAnchor="middle"
            fill={accent} fontSize={c.r * 0.85} fontFamily="monospace" fontWeight="bold"
            opacity={c.o * 0.75}>$</text>
        </g>
      ))}

      {/* Sparkles */}
      {[[66, 90], [148, 85], [220, 92]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fill={accent} fontSize={9} opacity={0.22}>✦</text>
      ))}
    </svg>
  );
}

const VISUALS: Record<string, (accent: string) => ReactElement> = {
  "barber-booking":  (a) => <BookingVisual accent={a} />,
  "neovolt":         (a) => <MotionVisual  accent={a} />,
  "obsidian":        (a) => <ScrollVisual  accent={a} />,
  "room-planner-2d": (a) => <RoomPlannerVisual accent={a} />,
  "useless-daily":   (a) => <GameVisual    accent={a} />,
};

export function CardVisual({ project }: { project: Project }) {
  const render = VISUALS[project.id];
  return (
    <div
      className="relative w-full overflow-hidden flex-shrink-0 flex flex-col"
      style={{ background: project.bgColor, height: "180px" }}
      aria-hidden="true"
    >
      {/* ── Window title bar ─────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-3 flex-shrink-0 border-b border-white/[0.06] relative z-10"
        style={{ height: "28px", background: "rgba(0,0,0,0.22)" }}
      >
        {/* Traffic light dots */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: project.accentColor + "55" }}
          />
        </div>
        {/* Project path */}
        <span
          className="font-mono flex-1 truncate"
          style={{ fontSize: "8px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.22)" }}
        >
          ~/vc/{project.id}
        </span>
        {/* Live status dot */}
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: project.accentColor, opacity: 0.55 }}
        />
      </div>

      {/* ── SVG visual area ──────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* the actual visual */}
        <div className="absolute inset-0">
          {render ? render(project.accentColor) : (
            <div className="w-full h-full flex items-center justify-center opacity-10">
              <div className="w-8 h-8 border border-current rounded-sm" />
            </div>
          )}
        </div>
        {/* bottom fade into card body */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10"
          style={{ background: "linear-gradient(to bottom, transparent, #080a0f)" }}
        />
      </div>
    </div>
  );
}
