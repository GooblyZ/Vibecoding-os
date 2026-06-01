"use client";

import { useRef } from "react";
import { neovoltCaseStudy, projects } from "../lib/data";
import { useReveal } from "../lib/hooks";

// ── Static case study content ─────────────────────────────────────────────────

const PSO = [
  {
    label:  "Problem",
    border: "rgba(255,107,53,0.50)",
    accent: "rgba(255,107,53,0.70)",
    text:   "Most vehicle websites feel like spec sheets: grids, numbers, and generic showroom pages. They explain the product, but they rarely make it feel desirable.",
  },
  {
    label:  "Solution",
    border: "rgba(255,107,53,0.32)",
    accent: "rgba(255,107,53,0.55)",
    text:   "A scroll-driven cinematic showcase where motion trails, dark atmosphere, and controlled pacing make the product feel premium before the details appear.",
  },
  {
    label:  "Outcome",
    border: "rgba(255,107,53,0.18)",
    accent: "rgba(255,107,53,0.40)",
    text:   "A product experience that feels closer to a short film than a standard landing page.",
  },
] as const;

const FLOW = [
  { id: "01", label: "Arrival", body: "Introduce the machine through atmosphere, silence, and scale." },
  { id: "02", label: "Motion",  body: "Use scroll movement, speed trails, and pacing to create energy." },
  { id: "03", label: "Desire",  body: "End with focused product presence and a clear action." },
] as const;

const SCENES = [
  { label: "Scene 01", active: true  },
  { label: "Scene 02", active: false },
  { label: "Scene 03", active: false },
];

const TIMELINE_LABELS = ["Traction", "Motion", "Aperture"] as const;

// ── Abstract cinematic mockup ─────────────────────────────────────────────────

function NeovoltMockup() {
  return (
    <div
      role="img"
      aria-label="Abstract cinematic product showcase interface for NEOVOLT"
      className="relative overflow-hidden"
      style={{ background: "#04050a", minHeight: 300 }}
    >
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.011) 2px, rgba(255,255,255,0.011) 4px)",
        }}
      />

      {/* Frame corner marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-l border-t"   style={{ borderColor: "rgba(255,107,53,0.38)" }} />
      <div className="absolute top-3 right-3 w-4 h-4 border-r border-t"  style={{ borderColor: "rgba(255,107,53,0.38)" }} />
      <div className="absolute bottom-10 left-3 w-4 h-4 border-l border-b"  style={{ borderColor: "rgba(255,107,53,0.38)" }} />
      <div className="absolute bottom-10 right-3 w-4 h-4 border-r border-b" style={{ borderColor: "rgba(255,107,53,0.38)" }} />

      {/* Scene / ID labels */}
      <div className="absolute top-4 left-4 z-10">
        <span className="font-mono text-[7px] tracking-[0.22em] uppercase" style={{ color: "rgba(255,107,53,0.65)" }}>
          Scene 01 · Traction
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="font-mono text-[7px] tracking-[0.14em] uppercase" style={{ color: "rgba(255,255,255,0.20)" }}>
          NEOVOLT · 2025
        </span>
      </div>

      {/* Motion trails — speed lines */}
      <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-8 py-10">
        {[
          { w: "82%", o: 0.20, ml: "8%"  },
          { w: "68%", o: 0.34, ml: "14%" },
          { w: "88%", o: 0.13, ml: "4%"  },
          { w: "55%", o: 0.42, ml: "20%" },
          { w: "72%", o: 0.22, ml: "10%" },
          { w: "42%", o: 0.15, ml: "24%" },
        ].map(({ w, o, ml }, i) => (
          <div
            key={i}
            className="h-px rounded-full"
            style={{
              width:      w,
              marginLeft: ml,
              background: `linear-gradient(to right, transparent, rgba(255,107,53,${o}) 35%, rgba(255,107,53,${(o * 0.25).toFixed(2)}) 75%, transparent)`,
            }}
          />
        ))}
      </div>

      {/* Motorcycle silhouette — abstract SVG */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: 36 }}>
        <svg width="260" height="110" viewBox="0 0 260 110" fill="none" aria-hidden="true" style={{ opacity: 0.20 }}>
          {/* Rear wheel */}
          <circle cx="45"  cy="83" r="23" stroke="rgba(255,107,53,0.9)" strokeWidth="1.8" />
          <circle cx="45"  cy="83" r="12" stroke="rgba(255,107,53,0.5)" strokeWidth="0.9" />
          {/* Front wheel */}
          <circle cx="213" cy="83" r="23" stroke="rgba(255,107,53,0.9)" strokeWidth="1.8" />
          <circle cx="213" cy="83" r="12" stroke="rgba(255,107,53,0.5)" strokeWidth="0.9" />
          {/* Main frame */}
          <path d="M63 81 L73 46 L122 29 L168 25 L190 43 L194 81"
            stroke="rgba(255,107,53,0.85)" strokeWidth="1.4" />
          {/* Tank */}
          <path d="M90 47 L152 31 L176 45 L166 57 L100 61 Z"
            fill="rgba(255,107,53,0.10)" stroke="rgba(255,107,53,0.55)" strokeWidth="0.9" />
          {/* Seat / tail */}
          <path d="M90 59 L73 67 L71 81 L100 81 L118 61"
            stroke="rgba(255,107,53,0.60)" strokeWidth="1" fill="none" />
          {/* Front fork */}
          <path d="M190 43 L207 63 L211 81"
            stroke="rgba(255,107,53,0.75)" strokeWidth="1.4" fill="none" />
          {/* Handlebars */}
          <path d="M178 35 L190 24 L202 32"
            stroke="rgba(255,107,53,0.65)" strokeWidth="1.4" fill="none" />
          {/* Exhaust */}
          <path d="M70 76 L45 81" stroke="rgba(255,107,53,0.38)" strokeWidth="1" />
          {/* Rear swing arm */}
          <path d="M100 73 L45 82" stroke="rgba(255,107,53,0.45)" strokeWidth="1" />
        </svg>
      </div>

      {/* Scene indicator dots — right edge */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5" style={{ paddingBottom: 36 }}>
        {SCENES.map(({ label, active }) => (
          <div key={label} className="flex items-center gap-1.5 justify-end">
            <span className="font-mono text-[6px] tracking-widest uppercase"
              style={{ color: active ? "rgba(255,107,53,0.65)" : "rgba(255,255,255,0.18)" }}>
              {label}
            </span>
            <div className="w-1.5 h-1.5 rounded-full"
              style={{ background: active ? "rgba(255,107,53,0.80)" : "rgba(255,255,255,0.12)" }} />
          </div>
        ))}
      </div>

      {/* Ambient glow */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-52 h-28 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,107,53,0.09) 0%, transparent 70%)" }}
      />

      {/* Bottom timeline strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-2"
        style={{ background: "rgba(0,0,0,0.55)", borderTop: "1px solid rgba(255,107,53,0.10)" }}
      >
        <span className="font-mono text-[6px] tracking-[0.2em] uppercase flex-shrink-0"
          style={{ color: "rgba(255,107,53,0.45)" }}>
          Scroll
        </span>
        <div className="flex-1 relative h-px" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div className="absolute left-0 top-0 h-full w-2/5"
            style={{ background: "linear-gradient(to right, rgba(255,107,53,0.70), rgba(255,107,53,0.22))" }} />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {TIMELINE_LABELS.map((s, i) => (
            <span key={s} className="font-mono text-[6px] tracking-widest uppercase"
              style={{ color: i === 0 ? "rgba(255,107,53,0.55)" : "rgba(255,255,255,0.16)" }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function NeovoltCaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef, ".reveal");

  const cs      = neovoltCaseStudy;
  const project = projects.find((p) => p.id === "neovolt")!;

  return (
    <section
      id="case-study-neovolt"
      className="relative py-28 md:py-36 px-6 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient orange glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[400px] opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, #ff6b35 0%, transparent 70%)", filter: "blur(70px)" }}
      />

      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-12 reveal">
          {/* Orange section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px flex-shrink-0" style={{ background: "linear-gradient(to right, #ff6b35, transparent)" }} />
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase whitespace-nowrap"
              style={{ color: "rgba(255,107,53,0.50)" }}>
              04 — Case Study · NEOVOLT
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border rounded-sm"
              style={{ borderColor: "rgba(255,107,53,0.28)", color: "rgba(255,107,53,0.72)" }}>
              {project.category}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border border-white/10 text-[#5a6070] rounded-sm">
              {project.year}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border rounded-sm flex items-center gap-1.5"
              style={{ borderColor: "rgba(255,107,53,0.28)", color: "#ff6b35" }}>
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#ff6b35" }} aria-hidden="true" />
              {project.status}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] tracking-tight leading-tight mb-4 max-w-2xl">
            A cinematic product showcase built around speed, silence, and visual tension.
          </h2>
          <p className="text-[#5a6070] text-base leading-relaxed max-w-xl">
            NEOVOLT turns a motorcycle concept into a scroll-driven product experience, using atmosphere,
            motion pacing, and premium visual direction instead of generic spec-table presentation.
          </p>
        </div>

        {/* ── Two-column grid ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-8 mb-8">

          {/* Left — PSO panels + cinematic flow + stack */}
          <div className="flex flex-col gap-7 reveal">

            {/* Problem / Solution / Outcome */}
            <div className="space-y-5">
              {PSO.map((p) => (
                <div key={p.label} className="pl-4" style={{ borderLeft: `2px solid ${p.border}` }}>
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] block mb-1.5"
                    style={{ color: p.accent }}>
                    {p.label}
                  </span>
                  <p className="text-sm text-[#8892a4] leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>

            {/* Cinematic flow */}
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] block mb-3"
                style={{ color: "rgba(255,107,53,0.40)" }}>
                Cinematic Flow
              </span>
              <div className="space-y-2">
                {FLOW.map(({ id, label, body }) => (
                  <div
                    key={id}
                    className="flex gap-4 items-start panel rounded-sm px-4 py-3.5"
                    style={{ borderColor: "rgba(255,107,53,0.12)" }}
                  >
                    <span className="font-mono text-[9px] flex-shrink-0 mt-0.5"
                      style={{ color: "rgba(255,107,53,0.42)" }}>
                      {id}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-[#f0f0f0] block mb-1">{label}</span>
                      <p className="text-xs text-[#5a6070] leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack */}
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] block mb-3"
                style={{ color: "rgba(255,255,255,0.22)" }}>
                Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tag tag-orange">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — OS chrome + cinematic mockup */}
          <div className="reveal">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "rgba(255,107,53,0.50)" }} aria-hidden="true" />
              <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]">
                Cinematic mockup · scroll-driven product experience
              </span>
            </div>

            <div
              className="rounded-sm overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.18)" }}
            >
              {/* OS chrome bar */}
              <div
                className="flex items-center gap-3 px-4 border-b flex-shrink-0"
                style={{ height: 36, background: "rgba(0,0,0,0.28)", borderColor: "rgba(255,255,255,0.05)" }}
                aria-hidden="true"
              >
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white/8" />
                  <div className="w-2 h-2 rounded-full bg-white/8" />
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,107,53,0.42)" }} />
                </div>
                <span className="font-mono flex-1 truncate"
                  style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.22)" }}>
                  ~/vc/neovolt / cinematic / scene-02
                </span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
                    style={{ background: "#ff6b35", opacity: 0.65 }} />
                  <span className="font-mono"
                    style={{ fontSize: 7, letterSpacing: "0.18em", color: "rgba(255,107,53,0.55)" }}>
                    LIVE
                  </span>
                </div>
              </div>

              <NeovoltMockup />
            </div>
          </div>
        </div>

        {/* ── Stats strip ─────────────────────────────────────────── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-sm overflow-hidden reveal"
          style={{ background: "rgba(255,107,53,0.08)" }}
        >
          {cs.stats.map(({ value, label }) => (
            <div key={label} className="px-6 py-7 text-center" style={{ background: "#080a0f" }}>
              <div className="text-2xl font-bold tracking-tight mb-1" style={{ color: "#ff6b35" }}>
                {value}
              </div>
              <div className="font-mono text-[9px] tracking-wider uppercase text-[#5a6070]">
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
