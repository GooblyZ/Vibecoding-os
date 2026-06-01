"use client";

import { useState, useRef } from "react";
import { capabilitySystem, type Capability } from "../lib/data";
import { SectionLabel } from "./SectionLabel";
import { useReveal, usePointerGlow } from "../lib/hooks";

// ── Accent color per metric ───────────────────────────────────────────────────

const METRIC_BADGE: Record<string, string> = {
  Design:   "text-[#00d4ff]   border-[#00d4ff]/25   bg-[#00d4ff]/06",
  Build:    "text-[#00d4ff]   border-[#00d4ff]/25   bg-[#00d4ff]/06",
  Motion:   "text-[#ff6b35]   border-[#ff6b35]/25   bg-[#ff6b35]/06",
  Logic:    "text-[#00d4ff]   border-[#00d4ff]/25   bg-[#00d4ff]/06",
  Workflow: "text-[#ff6b35]   border-[#ff6b35]/25   bg-[#ff6b35]/06",
};

const METRIC_ACCENT: Record<string, string> = {
  Design:   "rgba(0,212,255,0.65)",
  Build:    "rgba(0,212,255,0.65)",
  Motion:   "rgba(255,107,53,0.65)",
  Logic:    "rgba(0,212,255,0.65)",
  Workflow: "rgba(255,107,53,0.65)",
};

// ── Selected Capability Panel ─────────────────────────────────────────────────

function CapabilityPanel({ active }: { active: Capability | null }) {
  return (
    <div className="panel rounded-sm overflow-hidden">
      {/* OS chrome bar */}
      <div
        className="flex items-center gap-3 px-5 py-2.5 border-b border-white/5"
        style={{ background: "rgba(0,0,0,0.18)" }}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-[#00d4ff]/25" />
        </div>
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#5a6070]/60 ml-1">
          selected capability
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            aria-hidden="true"
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              active ? "bg-[#00d4ff] animate-glow-pulse" : "bg-[#5a6070]/30"
            }`}
          />
          <span className="font-mono text-[8px] tracking-widest uppercase text-[#5a6070]/60">
            {active ? "ready" : "idle"}
          </span>
        </div>
      </div>

      {/* Panel body */}
      <div className="px-6 py-5 min-h-[118px] flex flex-col justify-center">
        {active ? (
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 items-baseline">
            {/* Capability */}
            <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">
              Capability
            </span>
            <span className="text-sm font-semibold text-[#f0f0f0]">{active.label}</span>

            {/* Outcome */}
            <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">
              Outcome
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: METRIC_ACCENT[active.metric] ?? METRIC_ACCENT.Design }}
            >
              {active.outcome}
            </span>

            {/* Output */}
            <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">
              Output
            </span>
            <span className="text-xs text-[#8892a4] leading-snug">
              {active.consoleOutput.join(", ")}
            </span>

            {/* Used in */}
            <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">
              Used in
            </span>
            <span className="text-xs text-[#00d4ff]/65 leading-snug">
              {active.usedIn.join(", ")}
            </span>

            {/* Status */}
            <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">
              Status
            </span>
            <span className="flex items-center gap-2">
              <span className="flex-1 h-px bg-white/6" aria-hidden="true" />
              <span className="font-mono text-[9px] tracking-widest uppercase text-[#00d4ff]">
                Ready
              </span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#5a6070]/25 flex-shrink-0" aria-hidden="true" />
            <span className="font-mono text-[9px] tracking-[0.12em] text-[#5a6070]/50">
              Select a capability to see how it connects to real project outcomes.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Capability card ───────────────────────────────────────────────────────────

function CapabilityCard({
  cap,
  isActive,
  dimmed,
  onClick,
}: {
  cap: Capability;
  isActive: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  const badgeCls   = METRIC_BADGE[cap.metric] ?? METRIC_BADGE.Design;
  const accentRgb  = METRIC_ACCENT[cap.metric] ?? METRIC_ACCENT.Design;
  const cardRef    = useRef<HTMLButtonElement>(null);
  usePointerGlow(cardRef);

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Select ${cap.label} capability`}
      className={`btn-press relative overflow-hidden text-left w-full panel rounded-sm p-5 flex flex-col gap-4 transition-all duration-250 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/50 ${
        isActive
          ? "border-[#00d4ff]/55 bg-[#00d4ff]/[0.05] shadow-[0_0_30px_rgba(0,212,255,0.10)]"
          : "hover:border-white/14 hover:bg-white/[0.025]"
      } ${dimmed ? "opacity-[0.72]" : ""}`}
      style={{ transition: "opacity 0.22s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease" }}
    >
      <div className="card-glow-layer" aria-hidden="true" />

      {/* Top row: icon + metric badge */}
      <div className="flex items-start justify-between">
        <span
          className="font-mono text-xl transition-colors duration-200"
          style={{ color: isActive ? accentRgb : "rgba(0,212,255,0.25)" }}
          aria-hidden="true"
        >
          {cap.icon}
        </span>
        <span className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border rounded-sm ${badgeCls}`}>
          {cap.metric}
        </span>
      </div>

      {/* Title + outcome + description */}
      <div>
        <h3
          className={`text-sm font-bold leading-snug transition-colors duration-200 ${
            isActive ? "text-[#00d4ff]" : "text-[#f0f0f0] group-hover:text-[#00d4ff]"
          }`}
        >
          {cap.label}
        </h3>
        {/* Outcome line — between title and description */}
        <p
          className="font-mono text-[9px] tracking-[0.1em] mt-1 mb-2"
          style={{ color: isActive ? accentRgb : "rgba(255,255,255,0.28)" }}
        >
          {cap.outcome}
        </p>
        <p className="text-xs text-[#8892a4] leading-relaxed">
          {cap.description}
        </p>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5">
        {cap.skills.map((skill) => (
          <span
            key={skill}
            className={`font-mono text-[9px] tracking-wide px-2 py-0.5 rounded-sm border transition-all duration-200 ${
              isActive
                ? "border-[#00d4ff]/30 text-[#00d4ff]/80 bg-[#00d4ff]/08"
                : "border-white/8 text-[#5a6070] group-hover:border-white/14 group-hover:text-[#8892a4]"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Used in */}
      <div className="pt-1 border-t border-white/5">
        <span
          className="font-mono text-[8px] tracking-[0.18em] uppercase block mb-1.5"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          Used in
        </span>
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          {cap.usedIn.map((name, i) => (
            <span key={name} className="font-mono text-[9px] text-[#8892a4]/60">
              {name}
              {i < cap.usedIn.length - 1 && (
                <span className="text-white/12 ml-2" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function SkillsMatrix() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef, ".reveal");

  const activeCapability = capabilitySystem.find((c) => c.id === activeId) ?? null;
  const hasActive = activeId !== null;

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* Header */}
        <div className="mb-14 reveal">
          <SectionLabel index="05" label="Capability System" className="mb-5" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight leading-tight mb-4">
            What I Bring
          </h2>
          <p className="text-[#8892a4] max-w-xl leading-relaxed">
            Not just tools — the systems behind premium websites, motion, and working products.
          </p>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
          {capabilitySystem.map((cap) => (
            <CapabilityCard
              key={cap.id}
              cap={cap}
              isActive={activeId === cap.id}
              dimmed={hasActive && activeId !== cap.id}
              onClick={() => toggle(cap.id)}
            />
          ))}
        </div>

        {/* Selected capability panel */}
        <div className="reveal">
          <CapabilityPanel active={activeCapability} />
        </div>
      </div>
    </section>
  );
}
