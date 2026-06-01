"use client";

import { useEffect, useRef } from "react";
import { OSCoreVisual } from "./OSCoreVisual";
import { usePremiumButton } from "../lib/hooks";

// ── Object system ─────────────────────────────────────────────────────────────
// 9 designed objects — right-side biased (x: 54–92 %), around the OSCoreVisual.
// z: CSS perspective depth (px) — positive = closer, negative = farther back.
// mass: cursor force divisor — heavier = less reactive.
// seed: unique noise-drift phase.

type ObjKind =
  | "glass-slab" | "chrome-strip" | "os-panel" | "code-panel"
  | "glass-orb"  | "frame"        | "shard"    | "ring"  | "tile";

interface ObjDef {
  id: number; x: number; y: number; z: number;
  mass: number; seed: number; kind: ObjKind;
}

const OBJS: ObjDef[] = [
  { id: 1, x: 62, y: 20,  z:  80, mass: 1.6, seed: 0.00, kind: "glass-slab"   },
  { id: 2, x: 72, y: 57,  z:  40, mass: 1.2, seed: 1.30, kind: "chrome-strip" },
  { id: 3, x: 80, y:  8,  z: -30, mass: 1.4, seed: 2.70, kind: "os-panel"     },
  { id: 4, x: 57, y: 67,  z:  10, mass: 1.0, seed: 4.10, kind: "code-panel"   },
  { id: 5, x: 91, y: 37,  z: 110, mass: 0.8, seed: 5.50, kind: "glass-orb"    },
  { id: 6, x: 67, y: 83,  z: -70, mass: 1.3, seed: 0.90, kind: "frame"        },
  { id: 7, x: 87, y: 66,  z:  50, mass: 0.9, seed: 3.40, kind: "shard"        },
  { id: 8, x: 54, y: 11,  z: -50, mass: 1.5, seed: 2.10, kind: "ring"         },
  { id: 9, x: 77, y: 89,  z:  20, mass: 1.1, seed: 6.20, kind: "tile"         },
];

interface Phys { px: number; py: number; vx: number; vy: number; rz: number; avz: number; }

// ── Object renders (pure CSS/SVG — no images) ─────────────────────────────────

const B = "#00d4ff";

function GlassSlab() {
  return (
    <div style={{
      position: "relative", width: 158, height: 94,
      background: "linear-gradient(180deg, rgba(0,212,255,0.07) 0%, rgba(0,212,255,0.03) 100%)",
      border: "1px solid rgba(0,212,255,0.22)",
      borderRadius: 3,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 28px rgba(0,212,255,0.06)",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(0,212,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.045) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />
    </div>
  );
}

function ChromeStrip() {
  return (
    <div style={{
      width: 118, height: 24,
      background: "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(0,212,255,0.09) 50%, rgba(255,255,255,0.03) 100%)",
      border: "1px solid rgba(255,255,255,0.13)",
      borderRadius: 2,
      clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
    }} />
  );
}

function OSPanel() {
  return (
    <div style={{
      width: 126, height: 68,
      background: "rgba(0,0,0,0.30)",
      border: "1px solid rgba(0,212,255,0.18)",
      borderRadius: 3, overflow: "hidden",
    }}>
      <div style={{
        height: 20, background: "rgba(0,212,255,0.06)",
        borderBottom: "1px solid rgba(0,212,255,0.12)",
        display: "flex", alignItems: "center", gap: 4, padding: "0 7px",
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: `${B}55` }} />
        <span style={{ fontFamily: "monospace", fontSize: 6, color: "rgba(255,255,255,0.22)", letterSpacing: "0.12em", marginLeft: 4 }}>~/vc/os</span>
      </div>
      <div style={{ padding: "7px 8px", display: "flex", flexDirection: "column", gap: 5 }}>
        {([75, 52, 63] as number[]).map((w, i) => (
          <div key={i} style={{ height: 4, background: B, opacity: [0.55, 0.30, 0.42][i], borderRadius: 1, width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

function CodePanel() {
  const lines = ["const build = async () => {", "  await deploy(config);", "  return { status: 'live' };", "};"];
  return (
    <div style={{
      width: 178, height: 70,
      background: "rgba(0,0,0,0.36)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 3, padding: "8px 10px", overflow: "hidden",
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{
          fontFamily: "monospace", fontSize: 7,
          color: i === 0 || i === 3 ? B : "rgba(255,255,255,0.28)",
          opacity: 1 - i * 0.11, lineHeight: "16px", whiteSpace: "nowrap",
        }}>{line}</div>
      ))}
    </div>
  );
}

function GlassOrb() {
  return (
    <div style={{
      width: 70, height: 70, borderRadius: "50%",
      background: "radial-gradient(circle at 35% 30%, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.04) 55%, transparent 100%)",
      border: "1px solid rgba(0,212,255,0.24)",
      boxShadow: "0 0 24px rgba(0,212,255,0.07)",
    }} />
  );
}

function FrameOutline() {
  const corners = [{ l: -2, t: -2 }, { l: 56, t: -2 }, { l: -2, t: 56 }, { l: 56, t: 56 }];
  return (
    <div style={{ position: "relative", width: 60, height: 60, border: "1px solid rgba(0,212,255,0.22)", borderRadius: 2 }}>
      {corners.map((c, i) => (
        <div key={i} style={{
          position: "absolute", left: c.l, top: c.t,
          width: 5, height: 5, background: `rgba(0,212,255,0.50)`, borderRadius: 1,
        }} />
      ))}
    </div>
  );
}

function Shard() {
  return (
    <div style={{
      width: 86, height: 22,
      background: "linear-gradient(135deg, rgba(255,107,53,0.22) 0%, rgba(255,107,53,0.07) 60%, rgba(255,255,255,0.03) 100%)",
      border: "1px solid rgba(255,107,53,0.26)",
      borderRadius: 2,
      clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
    }} />
  );
}

function TargetRing() {
  return (
    <svg width={52} height={52} viewBox="0 0 52 52" fill="none">
      <circle cx={26} cy={26} r={24} stroke={B} strokeWidth={0.8} opacity={0.28} />
      <circle cx={26} cy={26} r={15} stroke={B} strokeWidth={0.5} opacity={0.16} />
      <line x1={26} y1={0}  x2={26} y2={8}  stroke={B} strokeWidth={0.8} opacity={0.38} />
      <line x1={26} y1={44} x2={26} y2={52} stroke={B} strokeWidth={0.8} opacity={0.38} />
      <line x1={0}  y1={26} x2={8}  y2={26} stroke={B} strokeWidth={0.8} opacity={0.38} />
      <line x1={44} y1={26} x2={52} y2={26} stroke={B} strokeWidth={0.8} opacity={0.38} />
    </svg>
  );
}

function CornerTile() {
  return (
    <div style={{
      width: 44, height: 44,
      background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.20)",
      borderRadius: 2, overflow: "hidden",
    }}>
      <svg width={44} height={44} viewBox="0 0 44 44" fill="none">
        <line x1={0} y1={44} x2={44} y2={0} stroke={B} strokeWidth={0.7} opacity={0.22} />
        <circle cx={22} cy={22} r={3} fill={B} opacity={0.28} />
      </svg>
    </div>
  );
}

function renderObjKind(kind: ObjKind) {
  switch (kind) {
    case "glass-slab":   return <GlassSlab />;
    case "chrome-strip": return <ChromeStrip />;
    case "os-panel":     return <OSPanel />;
    case "code-panel":   return <CodePanel />;
    case "glass-orb":    return <GlassOrb />;
    case "frame":        return <FrameOutline />;
    case "shard":        return <Shard />;
    case "ring":         return <TargetRing />;
    case "tile":         return <CornerTile />;
  }
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const glowRef       = useRef<HTMLDivElement>(null);
  const objRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef     = useRef({ x: 0.5, y: 0.5 });
  const scrollRef     = useRef(0);
  const exploreRef    = useRef<HTMLAnchorElement>(null);
  const startBuildRef = useRef<HTMLAnchorElement>(null);
  usePremiumButton(exploreRef);
  usePremiumButton(startBuildRef);

  // ── CSS 3D interactive field ───────────────────────────────────────────────
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse  = window.matchMedia("(pointer: coarse)").matches;
    // Static objects on reduced-motion or touch — no RAF cost
    if (reduced || coarse) return;

    const section = sectionRef.current;
    if (!section) return;

    // Per-object physics — mutable, never triggers React re-renders
    const phys: Phys[] = OBJS.map(() => ({ px: 0, py: 0, vx: 0, vy: 0, rz: 0, avz: 0 }));

    let W  = section.offsetWidth;
    let H  = section.offsetHeight;
    const t0 = performance.now();
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      cursorRef.current.x = (e.clientX - r.left) / r.width;
      cursorRef.current.y = (e.clientY - r.top)  / r.height;
    };
    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onResize = () => { W = section.offsetWidth; H = section.offsetHeight; };

    const tick = (now: number) => {
      const t  = now - t0;
      const mx = cursorRef.current.x * W;
      const my = cursorRef.current.y * H;

      OBJS.forEach((obj, i) => {
        const el = objRefs.current[i];
        if (!el) return;
        const p = phys[i];

        // 1. Slow noise drift — two non-harmonic components per axis to break orbit symmetry
        p.vx += Math.sin(t * 0.00021 + obj.seed * 2.31)        * 0.0038;
        p.vy += Math.sin(t * 0.00017 + obj.seed * 1.87 + 1.2)  * 0.0032;
        p.vx += Math.cos(t * 0.00013 + obj.seed * 0.71)        * 0.0016;
        p.vy += Math.sin(t * 0.00029 + obj.seed * 3.14)        * 0.0016;

        // 2. Cursor force — soft falloff, gradual, no instant kick
        const elCx = (obj.x / 100) * W + p.px;
        const elCy = (obj.y / 100) * H + p.py;
        const ddx  = elCx - mx;
        const ddy  = elCy - my;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
        const R    = 175;
        if (dist < R) {
          // Exponent 2.4: force drops off sharply with distance → soft at medium range
          const strength = Math.pow(1 - dist / R, 2.4) * 0.60 / obj.mass;
          p.vx += (ddx / dist) * strength;
          p.vy += (ddy / dist) * strength;
        }

        // 3. Max velocity clamp — prevents runaway acceleration near cursor
        const MAX_V = 1.1;
        p.vx = Math.max(-MAX_V, Math.min(MAX_V, p.vx));
        p.vy = Math.max(-MAX_V, Math.min(MAX_V, p.vy));

        // 4. Very gentle boundary — wide radius, tiny pull, no orbit feel
        const bd = Math.sqrt(p.px * p.px + p.py * p.py);
        const BOUND = 115;
        if (bd > BOUND) {
          const pull = (bd - BOUND) / bd * 0.00015;
          p.vx -= p.px * pull;
          p.vy -= p.py * pull;
        }

        // 5. Damping — momentum persists (heavy inertia feel)
        p.vx *= 0.9973;
        p.vy *= 0.9973;

        // 6. Integrate position
        p.px += p.vx;
        p.py += p.vy;

        // 7. Calm rotation — heavier, slower angular response
        p.avz += p.vx * 0.00045;
        p.avz *= 0.9965;
        p.rz  += p.avz;

        // 8. Scroll parallax (depth-scaled)
        const sy = scrollRef.current * (obj.z / 500) * -0.10;

        // 9. Write directly to DOM — no React state, no re-renders
        el.style.transform =
          `translate3d(${p.px}px, ${p.py + sy}px, ${obj.z}px) rotateZ(${p.rz}deg)`;
      });

      raf = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll",    onScroll,    { passive: true });
    window.addEventListener("resize",    onResize,    { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Mouse-follow hero glow ────────────────────────────────────────────────
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const section = sectionRef.current;
    const glow    = glowRef.current;
    if (!section || !glow) return;
    let raf: number;
    let cx = section.offsetWidth  / 2;
    let cy = section.offsetHeight / 2;
    let tx = cx, ty = cy;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      glow.style.left = `${cx}px`;
      glow.style.top  = `${cy}px`;
      raf = requestAnimationFrame(tick);
    };
    section.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-overlay"
      aria-label="Hero"
    >
      {/* ── CSS 3D object field ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ perspective: "1100px", perspectiveOrigin: "65% 50%" }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
          {OBJS.map((obj, i) => (
            <div
              key={obj.id}
              ref={(el) => { objRefs.current[i] = el; }}
              style={{
                position:   "absolute",
                left:       `${obj.x}%`,
                top:        `${obj.y}%`,
                transform:  `translate3d(0px, 0px, ${obj.z}px)`,
                willChange: "transform",
                opacity:    0.72,
              }}
            >
              {renderObjKind(obj.kind)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mouse-follow glow ─────────────────────────────────────────── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.11) 0%, transparent 65%)",
          filter:     "blur(60px)",
        }}
      />

      {/* ── Vignettes ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080a0f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080a0f] to-transparent" />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center min-h-[82svh]">

          {/* Left: headline — object-free zone */}
          <div className="flex flex-col justify-center">

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-glow-pulse flex-shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/55">
                VibeCoding OS&nbsp;/&nbsp;Independent Digital Builder
              </span>
            </div>

            <h1 className="font-bold tracking-tight leading-[0.94] mb-5">
              <span className="block text-[#f0f0f0] text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem]">
                Websites That
              </span>
              <span className="block text-[#00d4ff] glow-text-blue text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] mt-1">
                Feel Alive.
              </span>
            </h1>

            <p className="text-base md:text-lg text-[#8892a4] leading-relaxed mb-5 max-w-[40ch]">
              Cinematic websites, interactive systems, and digital experiences
              built by one independent creator.
            </p>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-2 mb-7">
              {["Design + Build", "Motion Systems", "Client-Ready Interfaces"].map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[9px] tracking-wide uppercase px-2.5 py-1 border border-white/10 bg-white/[0.025] text-[#8892a4] rounded-sm whitespace-nowrap"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="font-mono text-[10px] tracking-widest text-[#5a6070]/60 mb-7 uppercase">
              5 core builds&nbsp;·&nbsp;4 disciplines&nbsp;·&nbsp;1 independent creator
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <a
                ref={exploreRef}
                href="#projects"
                className="btn-arrow btn-premium inline-flex items-center gap-2 px-7 py-3.5 bg-[#00d4ff] text-[#080a0f] font-semibold text-sm tracking-wide uppercase rounded-sm hover:bg-[#00d4ff]/90 transition-colors duration-200 glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/60"
              >
                Explore Projects
                <span aria-hidden="true" className="arrow">→</span>
              </a>
              <a
                ref={startBuildRef}
                href="#contact"
                className="btn-premium inline-flex items-center px-7 py-3.5 border border-white/20 text-[#c8d0dc] text-sm tracking-wide uppercase rounded-sm hover:border-white/32 hover:text-[#f0f0f0] hover:bg-white/4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                Start a Build
              </a>
            </div>

            <a
              href="#archive"
              className="btn-arrow inline-flex items-center gap-1.5 mt-5 font-mono text-[10px] tracking-widest uppercase text-[#5a6070] hover:text-[#00d4ff]/60 transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
            >
              View Build Archive
              <span aria-hidden="true" className="arrow-diag text-[8px] opacity-60">↗</span>
            </a>
          </div>

          {/* Right: OS visual (desktop only) */}
          <div className="hidden md:flex items-center justify-center relative" aria-hidden="true">
            {/* Depth glow — anchors the visual in the composition */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.10) 0%, transparent 62%)",
                filter: "blur(28px)",
              }}
            />
            <OSCoreVisual />
          </div>
        </div>
      </div>

    </section>
  );
}
