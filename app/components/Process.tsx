"use client";

import { useState, useRef } from "react";
import { processPipeline, type PipelineStage } from "../lib/data";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "../lib/hooks";

// ── Pipeline Console ──────────────────────────────────────────────────────────

function PipelineConsole({ stage }: { stage: PipelineStage }) {
  return (
    <div className="panel rounded-sm overflow-hidden">
      {/* Window bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.015]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-[#00d4ff]/25" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6070] ml-1">
          pipeline.console
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-glow-pulse" aria-hidden="true" />
          <span className="font-mono text-[9px] text-[#00d4ff]/60 uppercase tracking-widest">
            RUNNING
          </span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="px-5 py-5 font-mono text-xs leading-7 min-h-[120px] overflow-hidden">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-[#00d4ff]/25 select-none flex-shrink-0">›</span>
            <span className="text-[#5a6070] flex-shrink-0">pipeline.input :</span>
            <span className="text-[#8892a4]">raw idea</span>
          </div>
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-[#00d4ff]/25 select-none flex-shrink-0">›</span>
            <span className="text-[#5a6070] flex-shrink-0">stage.active :</span>
            <span className="text-[#f0f0f0] truncate">{stage.label}</span>
            <span className="text-[#5a6070] flex-shrink-0">({stage.id})</span>
          </div>
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-[#00d4ff]/25 select-none flex-shrink-0">›</span>
            <span className="text-[#5a6070] flex-shrink-0">output :</span>
            <span className="text-[#00d4ff]/80 truncate">{stage.output}</span>
          </div>
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-[#00d4ff]/25 select-none flex-shrink-0">›</span>
            <span className="text-[#5a6070] flex-shrink-0">mode :</span>
            <span className="text-[#ff6b35]/70 truncate">{stage.mode}</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5 min-w-0">
            <span className="text-[#00d4ff]/25 select-none flex-shrink-0">›</span>
            <span className="text-[#5a6070] flex-shrink-0">status :</span>
            <div className="flex-1 h-px bg-white/8 mx-1" aria-hidden="true" />
            <span className="text-[#00d4ff] flex-shrink-0">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stage card ────────────────────────────────────────────────────────────────

function StageCard({
  stage,
  isActive,
  onActivate,
  index,
  total,
}: {
  stage: PipelineStage;
  isActive: boolean;
  onActivate: () => void;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;

  return (
    <div className="relative flex flex-col">
      {/* Mobile timeline connector (shown left of card on mobile) */}
      <div className="md:hidden absolute left-4 top-10 bottom-0 w-px bg-white/5" aria-hidden="true" />

      <button
        onClick={onActivate}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        aria-pressed={isActive}
        aria-label={`Stage ${stage.id}: ${stage.label}`}
        className={`reveal w-full text-left flex flex-col gap-3 rounded-sm transition-all duration-250 group
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40
          ${isActive
            ? "panel border-[#00d4ff]/40 bg-[#00d4ff]/05 shadow-[0_0_24px_rgba(0,212,255,0.07)]"
            : "panel panel-hover"
          }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        {/* Number node row */}
        <div className="flex items-center justify-between px-5 pt-5">
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-250 ${
              isActive
                ? "border-[#00d4ff]/60 bg-[#00d4ff]/12 shadow-[0_0_14px_rgba(0,212,255,0.15)]"
                : "border-white/10 group-hover:border-[#00d4ff]/35"
            }`}
          >
            <span
              className={`font-mono text-[9px] transition-colors ${
                isActive ? "text-[#00d4ff]" : "text-[#5a6070] group-hover:text-[#00d4ff]/70"
              }`}
            >
              {stage.id}
            </span>
          </div>

          {/* Connector arrow (desktop only, not on last item) */}
          {!isLast && (
            <span
              className="hidden lg:block font-mono text-[8px] text-[#00d4ff]/15 group-hover:text-[#00d4ff]/30 transition-colors ml-2"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </div>

        {/* Stage content */}
        <div className="px-5 pb-5 flex flex-col gap-2.5">
          <h3
            className={`text-sm font-semibold leading-snug transition-colors duration-250 ${
              isActive ? "text-[#00d4ff]" : "text-[#f0f0f0] group-hover:text-[#00d4ff]"
            }`}
          >
            {stage.label}
          </h3>
          <p className="text-xs text-[#5a6070] leading-relaxed">
            {stage.description}
          </p>

          {/* Output chip */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="font-mono text-[8px] text-[#5a6070] uppercase tracking-wider">
              output
            </span>
            <span className="font-mono text-[8px] text-[#00d4ff]/50">→</span>
            <span
              className={`font-mono text-[8px] px-2 py-0.5 rounded-sm border tracking-wide transition-all duration-250 ${
                isActive
                  ? "border-[#00d4ff]/35 text-[#00d4ff]/80 bg-[#00d4ff]/08"
                  : "border-white/8 text-[#5a6070] group-hover:border-white/14"
              }`}
            >
              {stage.output}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Process() {
  const [activeId, setActiveId] = useState<string>(processPipeline[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef, ".reveal");

  const activeStage = processPipeline.find((s) => s.id === activeId) ?? processPipeline[0];

  return (
    <section id="process" className="relative py-28 md:py-36 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="mb-14 reveal">
          <SectionLabel index="07" label="Process" className="mb-5" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight leading-tight mb-5">
            From raw idea to working
            <br className="hidden md:block" />
            <span className="text-[#00d4ff]"> digital experience.</span>
          </h2>
          <p className="text-[#5a6070] max-w-xl leading-relaxed">
            Every build follows the same pipeline — each stage sharpens the next and keeps the
            work clear, focused, and production-ready.
          </p>
        </div>

        {/* ── Pipeline input → output indicator ─────────────────── */}
        <div className="flex items-center gap-3 mb-8 reveal">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/8 bg-white/[0.02]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/60" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#5a6070]">
              input: raw idea
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-white/8 via-[#00d4ff]/10 to-white/8" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#00d4ff]/20 bg-[#00d4ff]/04">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/60 animate-glow-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#00d4ff]/70">
              output: working experience
            </span>
          </div>
        </div>

        {/* ── Stage grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {processPipeline.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isActive={activeId === stage.id}
              onActivate={() => setActiveId(stage.id)}
              index={i}
              total={processPipeline.length}
            />
          ))}
        </div>

        {/* ── Pipeline Console ──────────────────────────────────── */}
        <div className="reveal">
          <PipelineConsole stage={activeStage} />
        </div>
      </div>
    </section>
  );
}
