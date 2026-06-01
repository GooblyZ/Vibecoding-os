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

function GalleryVisual({ accent }: { accent: string }) {
  // Masonry-style layout — varied heights for spatial interest
  const frames = [
    { x: 12,  y: 8,  w: 72, h: 52, featured: false },
    { x: 88,  y: 8,  w: 52, h: 30, featured: false },
    { x: 88,  y: 41, w: 52, h: 38, featured: false },
    { x: 144, y: 8,  w: 86, h: 72, featured: true  }, // tall center — modal trigger
    { x: 234, y: 8,  w: 72, h: 33, featured: false },
    { x: 234, y: 44, w: 72, h: 33, featured: false },
    { x: 12,  y: 63, w: 122, h: 47, featured: false },
    { x: 234, y: 80, w: 72, h: 30, featured: false },
  ];
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {frames.map((f, i) => (
        <g key={i}>
          <rect
            x={f.x} y={f.y} width={f.w} height={f.h} rx={2}
            fill={f.featured ? accent : "rgba(255,255,255,0.02)"}
            stroke={f.featured ? accent : "rgba(255,255,255,0.07)"}
            strokeWidth={f.featured ? 1 : 0.75}
            opacity={f.featured ? 0.14 : 1}
          />
          {/* Subtle internal image hint — horizontal bands */}
          {!f.featured && (
            <>
              <line x1={f.x + 4} y1={f.y + f.h * 0.40} x2={f.x + f.w - 4} y2={f.y + f.h * 0.40}
                stroke="rgba(255,255,255,0.035)" strokeWidth={0.5} />
              <line x1={f.x + 4} y1={f.y + f.h * 0.65} x2={f.x + f.w - 4} y2={f.y + f.h * 0.65}
                stroke="rgba(255,255,255,0.025)" strokeWidth={0.5} />
            </>
          )}
          {/* Frame index */}
          <text x={f.x + 5} y={f.y + 10}
            fill={accent} fontSize={6} fontFamily="monospace"
            opacity={f.featured ? 0.55 : 0.14}>
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}

      {/* Modal hint overlay on featured frame */}
      <rect x={144} y={8} width={86} height={72} rx={2}
        stroke={accent} strokeWidth={1} strokeOpacity={0.45} fill="none" />
      {/* Expand icon */}
      <text x={187} y={50} fill={accent} fontSize={9} fontFamily="monospace"
        opacity={0.40} textAnchor="middle">⊞</text>
      <text x={187} y={62} fill={accent} fontSize={6} fontFamily="monospace"
        opacity={0.22} textAnchor="middle">VIEW</text>

      <ellipse cx="160" cy="60" rx="90" ry="40" fill={accent} opacity={0.04} />
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
  "digital-gallery": (a) => <GalleryVisual accent={a} />,
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
