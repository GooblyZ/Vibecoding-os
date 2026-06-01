// Server component — pure SVG + CSS animations, no React state needed.
// Animations are CSS-only; prefers-reduced-motion is handled globally in globals.css.

const BLUE = "#00d4ff";
const ORANGE = "#ff6b35";
const CX = 200;
const CY = 200;

// Tick marks at 45-degree diagonals on the outer ring
const diagonalTicks = [45, 135, 225, 315].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x1: CX + 152 * Math.cos(rad),
    y1: CY + 152 * Math.sin(rad),
    x2: CX + 168 * Math.cos(rad),
    y2: CY + 168 * Math.sin(rad),
    key: deg,
  };
});

// Static info panels — positioned at cardinal edges
const panels = [
  { x: 144, y: 12,  w: 112, h: 22, key: "PROJECTS", value: "05",     blinkClass: "anim-blink",   dot: BLUE },
  { x: 268, y: 144, w: 112, h: 22, key: "MOTION",   value: "ONLINE", blinkClass: "anim-blink-2", dot: BLUE },
  { x: 144, y: 366, w: 112, h: 22, key: "ARCHIVE",  value: "SYNCED", blinkClass: "anim-blink-3", dot: ORANGE },
  { x: 20,  y: 144, w: 112, h: 22, key: "SYSTEMS",  value: "ACTIVE", blinkClass: "anim-blink",   dot: BLUE },
];

export function OSCoreVisual() {
  return (
    <div
      className="relative w-full max-w-[600px] aspect-square select-none"
      aria-hidden="true"
      role="presentation"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle grid tile */}
          <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>

          {/* Radial glow gradient */}
          <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={BLUE} stopOpacity="0.30" />
            <stop offset="50%"  stopColor={BLUE} stopOpacity="0.11" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </radialGradient>

          {/* Wide outer atmospheric haze */}
          <radialGradient id="hero-haze" cx="50%" cy="50%" r="50%">
            <stop offset="30%"  stopColor={BLUE} stopOpacity="0" />
            <stop offset="80%"  stopColor={BLUE} stopOpacity="0.05" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </radialGradient>

          {/* Panel background */}
          <linearGradient id="panel-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.06" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* ── Background ─────────────────────────────────────────── */}
        <rect width="400" height="400" fill="url(#hero-grid)" />
        <circle cx={CX} cy={CY} r="200" fill="url(#hero-haze)" />
        <circle cx={CX} cy={CY} r="195" fill="url(#hero-glow)" />

        {/* ── Outer ring (rotates CW) ───────────────────────────── */}
        <g
          className="anim-ring-cw"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <circle
            cx={CX} cy={CY} r="160"
            stroke={BLUE}
            strokeWidth="0.75"
            strokeDasharray="3 10"
            opacity="0.25"
          />
          {/* Cardinal node diamonds (rotate with ring) */}
          <polygon points={`${CX},33  ${CX+5},41  ${CX},49   ${CX-5},41`}  fill={BLUE} opacity="0.65" />
          <polygon points={`${CX+351},${CY-5} ${CX+359},${CY} ${CX+351},${CY+5} ${CX+343},${CY}`} fill={BLUE} opacity="0.65" />
          <polygon points={`${CX},351 ${CX+5},359 ${CX},367  ${CX-5},359`} fill={BLUE} opacity="0.45" />
          <polygon points="33,195 41,200 33,205 25,200" fill={BLUE} opacity="0.45" />
        </g>

        {/* ── Diagonal tick marks (static — not part of rotating group) */}
        {diagonalTicks.map((t) => (
          <line
            key={t.key}
            x1={t.x1} y1={t.y1}
            x2={t.x2} y2={t.y2}
            stroke={BLUE}
            strokeWidth="1"
            opacity="0.18"
          />
        ))}

        {/* ── Middle ring (rotates CCW) ─────────────────────────── */}
        <g
          className="anim-ring-ccw"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <circle
            cx={CX} cy={CY} r="118"
            stroke={`rgba(0,212,255,0.1)`}
            strokeWidth="1"
            strokeDasharray="1 16"
          />
          {/* Orange accent nodes on middle ring (top + bottom) */}
          <circle cx={CX}   cy={CY - 118} r="3" fill={ORANGE} opacity="0.5" />
          <circle cx={CX}   cy={CY + 118} r="3" fill={ORANGE} opacity="0.4" />
          <circle cx={CX + 118} cy={CY}   r="2" fill={BLUE}   opacity="0.3" />
          <circle cx={CX - 118} cy={CY}   r="2" fill={BLUE}   opacity="0.3" />
        </g>

        {/* ── Inner ring (static, pulses) ───────────────────────── */}
        <circle
          cx={CX} cy={CY} r="76"
          stroke={`rgba(0,212,255,0.28)`}
          strokeWidth="1"
          className="anim-core"
        />

        {/* ── Crosshair spokes (static, dashed) ────────────────── */}
        <line x1={CX} y1={CY - 124} x2={CX} y2={CY - 78}   stroke="rgba(0,212,255,0.1)" strokeWidth="1" strokeDasharray="2 5" />
        <line x1={CX} y1={CY + 78}  x2={CX} y2={CY + 124}  stroke="rgba(0,212,255,0.1)" strokeWidth="1" strokeDasharray="2 5" />
        <line x1={CX - 124} y1={CY} x2={CX - 78} y2={CY}   stroke="rgba(0,212,255,0.1)" strokeWidth="1" strokeDasharray="2 5" />
        <line x1={CX + 78}  y1={CY} x2={CX + 124} y2={CY}  stroke="rgba(0,212,255,0.1)" strokeWidth="1" strokeDasharray="2 5" />

        {/* ── Core ─────────────────────────────────────────────── */}
        <circle cx={CX} cy={CY} r="44" fill="rgba(0,212,255,0.07)" />
        <circle cx={CX} cy={CY} r="28" fill="rgba(0,212,255,0.11)" />
        <circle
          cx={CX} cy={CY} r="8"
          fill={BLUE}
          opacity="0.62"
          className="anim-core"
        />
        <circle cx={CX} cy={CY} r="3.5" fill={BLUE} opacity="0.9" />

        {/* Core label */}
        <text
          x={CX} y={CY - 14}
          textAnchor="middle"
          fill={BLUE}
          fontSize="7"
          fontFamily="monospace"
          letterSpacing="2"
          opacity="0.60"
        >
          VC
        </text>
        <text
          x={CX} y={CY - 5}
          textAnchor="middle"
          fill={BLUE}
          fontSize="7"
          fontFamily="monospace"
          letterSpacing="2"
          opacity="0.60"
        >
          OS
        </text>
        <text
          x={CX} y={CY + 10}
          textAnchor="middle"
          fill={BLUE}
          fontSize="5.5"
          fontFamily="monospace"
          opacity="0.25"
          letterSpacing="1"
        >
          v2.0.1
        </text>

        {/* ── Info panels ──────────────────────────────────────── */}
        {panels.map((p) => (
          <g key={p.key}>
            <rect
              x={p.x} y={p.y}
              width={p.w} height={p.h}
              rx="2"
              fill="url(#panel-fill)"
              stroke={`rgba(0,212,255,0.18)`}
              strokeWidth="0.5"
            />
            {/* Status dot */}
            <circle
              cx={p.x + 10}
              cy={p.y + p.h / 2}
              r="2.5"
              fill={p.dot}
              className={p.blinkClass}
            />
            {/* Key label */}
            <text
              x={p.x + 18}
              y={p.y + p.h / 2 + 3}
              fill={`rgba(0,212,255,0.4)`}
              fontSize="6.5"
              fontFamily="monospace"
              letterSpacing="1.2"
            >
              {p.key}
            </text>
            {/* Value */}
            <text
              x={p.x + p.w - 8}
              y={p.y + p.h / 2 + 3}
              textAnchor="end"
              fill={BLUE}
              fontSize="6.5"
              fontFamily="monospace"
              fontWeight="bold"
              opacity="0.85"
            >
              {p.value}
            </text>
          </g>
        ))}

        {/* ── Ambient corner accents ────────────────────────────── */}
        <line x1="0"   y1="0"   x2="24" y2="0"   stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
        <line x1="0"   y1="0"   x2="0"  y2="24"  stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
        <line x1="400" y1="0"   x2="376" y2="0"  stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
        <line x1="400" y1="0"   x2="400" y2="24" stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
        <line x1="0"   y1="400" x2="24"  y2="400" stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
        <line x1="0"   y1="400" x2="0"   y2="376" stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
        <line x1="400" y1="400" x2="376" y2="400" stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
        <line x1="400" y1="400" x2="400" y2="376" stroke={`rgba(0,212,255,0.14)`} strokeWidth="1" />
      </svg>
    </div>
  );
}
