"use client";

import { useState, useRef } from "react";
import { capabilitySystem, type Capability } from "../lib/data";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "../lib/hooks";

// ── Capability Console ────────────────────────────────────────────────────────

function CapabilityConsole({ active }: { active: Capability | null }) {
  return (
    <div className="panel rounded-sm overflow-hidden">
      {/* Window bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.015]">
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-[#00d4ff]/25" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6070] ml-1">
          capability.console
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div
            aria-hidden="true"
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              active ? "bg-[#00d4ff] animate-glow-pulse" : "bg-[#5a6070]/40"
            }`}
          />
          <span className="font-mono text-[9px] text-[#5a6070]">
            {active ? "ACTIVE" : "IDLE"}
          </span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="px-5 py-5 min-h-[140px] flex flex-col justify-center font-mono text-xs leading-6 overflow-hidden">
        {active ? (
          <div className="space-y-1 min-w-0">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[#00d4ff]/30 flex-shrink-0">›</span>
              <span className="text-[#5a6070] flex-shrink-0">capability.active :</span>
              <span className="text-[#f0f0f0] truncate">{active.label}</span>
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[#00d4ff]/30 flex-shrink-0">›</span>
              <span className="text-[#5a6070] flex-shrink-0">metric :</span>
              <span className="text-[#ff6b35]/80 truncate">{active.metric}</span>
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[#00d4ff]/30 flex-shrink-0">›</span>
              <span className="text-[#5a6070] flex-shrink-0">output :</span>
              <span className="text-[#8892a4] truncate">{active.consoleOutput.join(", ")}</span>
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[#00d4ff]/30 flex-shrink-0">›</span>
              <span className="text-[#5a6070] flex-shrink-0">linked.projects :</span>
              <span className="text-[#00d4ff]/70 truncate">{active.usedIn.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2 pt-1 min-w-0">
              <span className="text-[#00d4ff]/30 flex-shrink-0">›</span>
              <span className="text-[#5a6070] flex-shrink-0">status :</span>
              <div className="flex-1 h-px bg-white/8 mx-1" aria-hidden="true" />
              <span className="text-[#00d4ff] flex-shrink-0">READY</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-[#00d4ff]/20 flex-shrink-0">›</span>
              <span className="text-[#5a6070]/50">capability.active :</span>
              <span className="text-[#5a6070]/50">null</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#00d4ff]/20 flex-shrink-0">›</span>
              <span className="text-[#5a6070]/40">select a capability card to load profile</span>
            </div>
            <div className="flex items-center gap-2 pt-1 min-w-0">
              <span className="text-[#00d4ff]/20 flex-shrink-0">›</span>
              <span className="text-[#5a6070]/30 flex-shrink-0">status :</span>
              <div className="flex-1 h-px bg-white/4 mx-1" aria-hidden="true" />
              <span className="text-[#5a6070]/50 flex-shrink-0">IDLE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Capability card ───────────────────────────────────────────────────────────

const METRIC_COLOR: Record<string, string> = {
  Design:   "text-[#00d4ff]   border-[#00d4ff]/25   bg-[#00d4ff]/06",
  Build:    "text-[#00d4ff]   border-[#00d4ff]/25   bg-[#00d4ff]/06",
  Motion:   "text-[#ff6b35]   border-[#ff6b35]/25   bg-[#ff6b35]/06",
  Logic:    "text-[#00d4ff]   border-[#00d4ff]/25   bg-[#00d4ff]/06",
  Workflow: "text-[#ff6b35]   border-[#ff6b35]/25   bg-[#ff6b35]/06",
};

function CapabilityCard({
  cap,
  isActive,
  onClick,
}: {
  cap: Capability;
  isActive: boolean;
  onClick: () => void;
}) {
  const metricCls = METRIC_COLOR[cap.metric] ?? METRIC_COLOR.Design;

  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Select ${cap.label} capability`}
      className={`reveal text-left w-full panel rounded-sm p-5 flex flex-col gap-4 transition-all duration-250 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40 ${
        isActive
          ? "border-[#00d4ff]/40 bg-[#00d4ff]/05 shadow-[0_0_24px_rgba(0,212,255,0.06)]"
          : "hover:border-white/14 hover:bg-white/[0.025]"
      }`}
    >
      {/* Top row: icon + metric badge */}
      <div className="flex items-start justify-between">
        <span
          className={`font-mono text-xl transition-colors duration-200 ${
            isActive ? "text-[#00d4ff]" : "text-[#00d4ff]/30 group-hover:text-[#00d4ff]/60"
          }`}
          aria-hidden="true"
        >
          {cap.icon}
        </span>
        <span
          className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border rounded-sm ${metricCls}`}
        >
          {cap.metric}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3
          className={`text-sm font-bold leading-snug transition-colors duration-200 ${
            isActive ? "text-[#00d4ff]" : "text-[#f0f0f0] group-hover:text-[#00d4ff]"
          }`}
        >
          {cap.label}
        </h3>
        <p className="text-xs text-[#5a6070] leading-relaxed mt-1.5">
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
        <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 block mb-1.5">
          Used in
        </span>
        <div className="flex flex-wrap gap-1.5">
          {cap.usedIn.map((name) => (
            <span
              key={name}
              className="font-mono text-[9px] text-[#8892a4]/70"
            >
              {name}
              {name !== cap.usedIn[cap.usedIn.length - 1] && (
                <span className="text-white/15 ml-1.5">·</span>
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
          <p className="text-[#5a6070] max-w-xl leading-relaxed">
            Clients don&apos;t buy React or Tailwind. They buy outcomes — a premium first impression,
            a system that works, motion that feels alive.
          </p>
        </div>

        {/* Capability cards — 2-col md, 3-col lg, 5-col xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-6">
          {capabilitySystem.map((cap) => (
            <CapabilityCard
              key={cap.id}
              cap={cap}
              isActive={activeId === cap.id}
              onClick={() => toggle(cap.id)}
            />
          ))}
        </div>

        {/* Capability Console */}
        <div className="reveal">
          <CapabilityConsole active={activeCapability} />
        </div>
      </div>
    </section>
  );
}
