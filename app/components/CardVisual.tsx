import type { ReactElement } from "react";
import type { Project } from "../lib/data";

// Abstract system visuals — pure CSS/SVG, no external images.
// Each renders a thematic preview that feels intentional, not placeholder.

function BookingVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Calendar grid */}
      {Array.from({ length: 5 }).map((_, col) =>
        Array.from({ length: 4 }).map((_, row) => {
          const booked = (col + row) % 3 === 0;
          const dimmed = (col * 2 + row) % 5 === 0;
          return (
            <rect
              key={`${col}-${row}`}
              x={32 + col * 54}
              y={14 + row * 26}
              width={44}
              height={18}
              rx={2}
              fill={booked ? accent : "transparent"}
              stroke={booked ? accent : dimmed ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)"}
              strokeWidth={1}
              opacity={booked ? 0.25 : 1}
            />
          );
        })
      )}
      {/* Booked label */}
      <text x="32" y="10" fill={accent} fontSize="7" fontFamily="monospace" opacity={0.4}>
        MON  TUE  WED  THU  FRI
      </text>
      {/* Vertical rule */}
      <line x1="10" y1="8" x2="10" y2="112" stroke={accent} strokeWidth={1} opacity={0.15} />
      {/* Glow */}
      <ellipse cx="160" cy="60" rx="80" ry="40" fill={accent} opacity={0.04} />
    </svg>
  );
}

function MotionVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Speed streaks */}
      {[
        { y: 18, w: 180, o: 0.5 },
        { y: 30, w: 240, o: 0.35 },
        { y: 42, w: 200, o: 0.6 },
        { y: 54, w: 280, o: 0.25 },
        { y: 66, w: 160, o: 0.45 },
        { y: 78, w: 220, o: 0.55 },
        { y: 90, w: 140, o: 0.3 },
        { y: 102, w: 260, o: 0.4 },
      ].map((line, i) => (
        <line
          key={i}
          x1={320 - line.w}
          y1={line.y}
          x2={320}
          y2={line.y}
          stroke={accent}
          strokeWidth={1}
          opacity={line.o * 0.6}
        />
      ))}
      {/* Leading dot — the "vehicle" */}
      <circle cx={290} cy={60} r={3} fill={accent} opacity={0.8} />
      <circle cx={290} cy={60} r={8} fill={accent} opacity={0.08} />
      {/* Core glow */}
      <ellipse cx="280" cy="60" rx="60" ry="30" fill={accent} opacity={0.06} />
      {/* Ticker marks */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={20 + i * 24} y1={110} x2={20 + i * 24} y2={i % 3 === 0 ? 100 : 106}
          stroke={accent} strokeWidth={1} opacity={0.15} />
      ))}
    </svg>
  );
}

function ScrollVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bat path arc */}
      <path
        d="M 20 80 Q 80 20 160 60 Q 240 100 300 40"
        stroke={accent}
        strokeWidth={1}
        opacity={0.2}
        strokeDasharray="4 6"
      />
      {/* Bat silhouette — simplified */}
      <path
        d="M160 55 C150 48 138 44 130 50 C126 52 124 56 130 58 C138 60 148 56 160 55Z"
        fill={accent}
        opacity={0.5}
      />
      <path
        d="M160 55 C170 48 182 44 190 50 C194 52 196 56 190 58 C182 60 172 56 160 55Z"
        fill={accent}
        opacity={0.5}
      />
      <circle cx={160} cy={57} r={3} fill={accent} opacity={0.8} />
      {/* Scroll indicators */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={295} y={10 + i * 13} width={6} height={4} rx={1}
          fill={i === 4 ? accent : "white"} opacity={i === 4 ? 0.6 : 0.06} />
      ))}
      {/* Glow */}
      <ellipse cx="160" cy="60" rx="50" ry="30" fill={accent} opacity={0.05} />
    </svg>
  );
}

function GalleryVisual({ accent }: { accent: string }) {
  // Masonry-like grid of image frames
  const frames = [
    { x: 16,  y: 10, w: 68, h: 48 },
    { x: 92,  y: 10, w: 48, h: 28 },
    { x: 92,  y: 42, w: 48, h: 36 },
    { x: 148, y: 10, w: 80, h: 68 },
    { x: 236, y: 10, w: 68, h: 32 },
    { x: 236, y: 46, w: 68, h: 32 },
    { x: 16,  y: 64, w: 120, h: 46 },
    { x: 236, y: 82, w: 68, h: 28 },
  ];
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {frames.map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={2}
            fill={i % 5 === 0 ? accent : "rgba(255,255,255,0.02)"}
            stroke={i % 5 === 0 ? accent : "rgba(255,255,255,0.07)"}
            strokeWidth={1}
            opacity={i % 5 === 0 ? 0.15 : 1}
          />
          {/* inner crosshair */}
          <line x1={f.x + f.w * 0.5 - 4} y1={f.y + f.h * 0.5} x2={f.x + f.w * 0.5 + 4} y2={f.y + f.h * 0.5}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <line x1={f.x + f.w * 0.5} y1={f.y + f.h * 0.5 - 4} x2={f.x + f.w * 0.5} y2={f.y + f.h * 0.5 + 4}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        </g>
      ))}
      <ellipse cx="160" cy="60" rx="70" ry="35" fill={accent} opacity={0.03} />
    </svg>
  );
}

function GameVisual({ accent }: { accent: string }) {
  const coins = [
    { cx: 40,  cy: 35, r: 10, o: 0.7 },
    { cx: 80,  cy: 55, r:  7, o: 0.5 },
    { cx: 120, cy: 30, r: 12, o: 0.8 },
    { cx: 155, cy: 70, r:  6, o: 0.4 },
    { cx: 190, cy: 40, r: 10, o: 0.6 },
    { cx: 230, cy: 25, r:  8, o: 0.5 },
    { cx: 265, cy: 60, r: 14, o: 0.7 },
    { cx: 295, cy: 30, r:  6, o: 0.35 },
  ];
  return (
    <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Score counter */}
      <rect x={8} y={8} width={80} height={20} rx={3} stroke={accent} strokeWidth={1} opacity={0.2} />
      <text x={16} y={22} fill={accent} fontSize={8} fontFamily="monospace" opacity={0.5}>
        SCORE: 1,240
      </text>
      {/* Achievement bar */}
      <rect x={8} y={100} width={200} height={6} rx={3} fill="rgba(255,255,255,0.05)" />
      <rect x={8} y={100} width={130} height={6} rx={3} fill={accent} opacity={0.3} />

      {/* Coins */}
      {coins.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill={accent} opacity={c.o * 0.2} />
          <circle cx={c.cx} cy={c.cy} r={c.r} stroke={accent} strokeWidth={1} opacity={c.o * 0.5} />
          <text x={c.cx} y={c.cy + 3} textAnchor="middle" fill={accent} fontSize={c.r * 0.9} fontFamily="monospace" opacity={c.o * 0.7}>$</text>
        </g>
      ))}

      {/* Sparkles */}
      {[[60, 90], [140, 85], [220, 95]].map(([x, y], i) => (
        <text key={i} x={x} y={y} fill={accent} fontSize={8} opacity={0.3}>✦</text>
      ))}
    </svg>
  );
}

const VISUALS: Record<string, (accent: string) => ReactElement> = {
  "barber-booking": (a) => <BookingVisual accent={a} />,
  "neovolt":        (a) => <MotionVisual  accent={a} />,
  "obsidian":       (a) => <ScrollVisual  accent={a} />,
  "digital-gallery":(a) => <GalleryVisual accent={a} />,
  "useless-daily":  (a) => <GameVisual    accent={a} />,
};

export function CardVisual({ project }: { project: Project }) {
  const render = VISUALS[project.id];
  return (
    <div
      className="relative w-full h-[120px] overflow-hidden flex-shrink-0"
      style={{ background: project.bgColor }}
      aria-hidden="true"
    >
      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
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
        className="absolute bottom-0 left-0 right-0 h-8"
        style={{ background: "linear-gradient(to bottom, transparent, #080a0f)" }}
      />
    </div>
  );
}
