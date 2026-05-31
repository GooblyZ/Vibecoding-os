"use client";

import { useRef } from "react";
import { barberCaseStudy, projects } from "../lib/data";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "../lib/hooks";

// ── Booking mockup ────────────────────────────────────────────────────────────
// Abstract UI preview — intentional product mockup, not an image placeholder.

function BookingMockup() {
  const slots = ["10:00", "10:30", "11:00", "11:30"];

  return (
    <div
      className="panel rounded-sm overflow-hidden w-full max-w-[300px] mx-auto lg:mx-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#00d4ff]/[0.03]">
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#00d4ff]/50">
          Booking System
        </span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-white/8" />
          <div className="w-2 h-2 rounded-full bg-[#00d4ff]/30" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Selected service */}
        <div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#5a6070] block mb-1.5">
            Service
          </span>
          <div className="border border-[#00d4ff]/30 bg-[#00d4ff]/06 rounded-sm p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-[#f0f0f0]">Haircut & Beard</span>
              {/* Selected radio */}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#00d4ff] flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
              </div>
            </div>
            <span className="font-mono text-[9px] text-[#5a6070]">45 min · ₪80</span>
          </div>
        </div>

        {/* Time slots */}
        <div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#5a6070] block mb-1.5">
            Available Times
          </span>
          <div className="grid grid-cols-4 gap-1">
            {slots.map((t, i) => (
              <div
                key={t}
                className={`text-center py-2 rounded-sm font-mono text-[9px] border transition-none ${
                  i === 1
                    ? "border-[#00d4ff] bg-[#00d4ff] text-[#080a0f] font-bold"
                    : "border-white/8 text-[#5a6070]"
                }`}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Client detail */}
        <div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#5a6070] block mb-1.5">
            Your Details
          </span>
          <div className="border border-white/8 rounded-sm px-3 py-2.5 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#00d4ff]/30 flex-shrink-0" />
            <span className="text-xs text-[#8892a4]">Yoni Cohen · +972 50 ···</span>
          </div>
        </div>

        {/* Confirm button */}
        <div className="w-full py-3 bg-[#00d4ff] text-[#080a0f] font-bold text-[10px] tracking-widest uppercase rounded-sm text-center select-none cursor-default">
          Confirm Booking
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 pt-0.5 pb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-glow-pulse flex-shrink-0" />
          <span className="font-mono text-[9px] text-[#00d4ff]/70">
            BOOKED · Wed 14 May · 10:30 AM
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef, ".reveal");

  const cs      = barberCaseStudy;
  const project = projects.find((p) => p.id === cs.projectId)!;

  const pso = [
    {
      id: "01", label: "Problem",
      accent: "rgba(255,107,53,0.18)", border: "rgba(255,107,53,0.3)",
      dot: "#ff6b35",
      text: cs.problem,
    },
    {
      id: "02", label: "Solution",
      accent: "rgba(0,212,255,0.1)",  border: "rgba(0,212,255,0.3)",
      dot: "#00d4ff",
      text: cs.solution,
    },
    {
      id: "03", label: "Outcome",
      accent: "rgba(0,212,255,0.05)", border: "rgba(0,212,255,0.2)",
      dot: "#00d4ff",
      text: cs.outcome,
    },
  ];

  return (
    <section
      id="case-study"
      className="relative py-28 md:py-36 px-6 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient blue glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-14 reveal">
          <SectionLabel index="04" label="Featured Case Study" className="mb-8" />

          {/* Project meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border border-[#00d4ff]/25 text-[#00d4ff]/70 rounded-sm">
              {project.category}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border border-white/10 text-[#5a6070] rounded-sm">
              {project.year}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border border-[#00d4ff]/25 text-[#00d4ff] rounded-sm flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00d4ff] inline-block" />
              {project.status}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f0f0] tracking-tight leading-tight mb-5 max-w-3xl">
            {cs.headline}
          </h2>
          <p className="text-[#5a6070] text-base leading-relaxed max-w-2xl">
            {cs.subheadline}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* ── Problem / Solution / Outcome ───────────────────────── */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 reveal">
          {pso.map((panel) => (
            <div
              key={panel.id}
              className="panel rounded-sm p-6 border-t-2"
              style={{ borderTopColor: panel.border }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: panel.dot }} />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6070]">
                  {panel.id} — {panel.label}
                </span>
              </div>
              <p className="text-sm text-[#8892a4] leading-relaxed">{panel.text}</p>
            </div>
          ))}
        </div>

        {/* ── Booking flow ────────────────────────────────────────── */}
        <div className="mb-14 reveal">
          <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-[#5a6070] mb-8">
            Booking Flow
          </h3>

          {/* Step cards + connector */}
          <div className="relative">
            {/* Desktop connector line */}
            <div className="hidden md:block absolute top-[18px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent pointer-events-none" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cs.flowSteps.map((step) => (
                <div key={step.id} className="group">
                  {/* Step number node */}
                  <div className="flex justify-center mb-4">
                    <div className="relative z-10 w-9 h-9 rounded-full bg-[#080a0f] border border-[#00d4ff]/20 flex items-center justify-center group-hover:border-[#00d4ff]/50 group-hover:bg-[#00d4ff]/05 transition-all duration-300">
                      <span className="font-mono text-[9px] text-[#00d4ff]/60 group-hover:text-[#00d4ff] transition-colors">
                        {step.id}
                      </span>
                    </div>
                  </div>
                  {/* Card */}
                  <div className="panel panel-hover rounded-sm p-4 h-full">
                    <p className="text-sm font-semibold text-[#f0f0f0] mb-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                      {step.label}
                    </p>
                    <p className="text-xs text-[#5a6070] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Decisions + Mockup ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-8 mb-10">

          {/* Left — "Why this works" decisions (3/5) */}
          <div className="lg:col-span-3 reveal">
            <h3 className="text-base font-semibold text-[#f0f0f0] mb-6">
              Why this works
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {cs.decisions.map((d, i) => (
                <div key={i} className="panel panel-hover rounded-sm p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-[8px] text-[#00d4ff]/40 mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-sm font-semibold text-[#f0f0f0] leading-snug">
                      {d.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#5a6070] leading-relaxed pl-6">{d.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Booking mockup (2/5) */}
          <div className="lg:col-span-2 reveal">
            <h3 className="text-base font-semibold text-[#f0f0f0] mb-6">
              Interface Preview
            </h3>
            <BookingMockup />
          </div>
        </div>

        {/* ── Stats strip ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden reveal">
          {cs.stats.map(({ value, label }) => (
            <div key={label} className="bg-[#080a0f] px-6 py-7 text-center">
              <div className="text-2xl font-bold text-[#00d4ff] tracking-tight mb-1">
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
