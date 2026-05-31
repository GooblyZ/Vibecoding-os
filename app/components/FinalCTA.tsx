"use client";

import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "../lib/hooks";

const PROJECT_TYPES = [
  {
    id: "01",
    icon: "○",
    title: "Business Website",
    description: "For service providers who need a modern site that builds trust.",
    accent: "#00d4ff",
  },
  {
    id: "02",
    icon: "◆",
    title: "Booking System",
    description: "For small businesses that need a cleaner appointment flow.",
    accent: "#00d4ff",
  },
  {
    id: "03",
    icon: "◈",
    title: "Cinematic Showcase",
    description: "For brands, concepts, or products that need visual impact.",
    accent: "#ff6b35",
  },
] as const;

const STATUS_FIELDS = [
  { key: "availability", value: "selected builds"  },
  { key: "response",     value: "direct"           },
  { key: "builder",      value: "independent"      },
  { key: "mode",         value: "design + build"   },
] as const;

// TODO: Replace PRIMARY_HREF with a WhatsApp Business link when ready.
// Suggested prefilled message:
// "Hey, I saw your VibeCoding OS portfolio and I want to build a website."
// Format: https://wa.me/YOURPHONE?text=Hey%2C+I+saw+your+VibeCoding+OS+portfolio...
const PRIMARY_HREF = "mailto:dizzyy552@gmail.com";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef, ".reveal");

  return (
    <section
      id="contact"
      className="relative py-32 md:py-44 px-6 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 55%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto" ref={sectionRef}>

        {/* ── Upper block: headline (left) + CTAs/status (right) ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">

          {/* Left — headline */}
          <div>
            <div className="flex items-center gap-4 mb-8 reveal">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#00d4ff]/20 flex-shrink-0" />
              <SectionLabel index="08" label="Start a Project" />
            </div>

            <h2 className="reveal text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#f0f0f0] tracking-tight leading-[1.06] mb-6">
              Have an idea?{" "}
              <span className="text-[#00d4ff]">
                I can turn it into a working website.
              </span>
            </h2>

            <p className="reveal text-[#5a6070] text-base leading-relaxed max-w-md">
              Work directly with one independent creator to shape, design, build,
              and refine a digital experience with clear structure and premium execution.
            </p>
          </div>

          {/* Right — CTAs + OS status card */}
          <div className="flex flex-col gap-5">

            {/* CTA buttons */}
            <div className="reveal flex flex-col sm:flex-row gap-3">
              {/* Primary */}
              <a
                href={PRIMARY_HREF}
                className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#00d4ff] text-[#080a0f] font-bold text-sm tracking-wide uppercase hover:bg-[#00d4ff]/90 transition-colors duration-200 rounded-sm glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/60"
              >
                Start a Project
                <span aria-hidden="true">→</span>
              </a>
              {/* Secondary */}
              <a
                href="#projects"
                className="flex-1 inline-flex items-center justify-center px-7 py-4 border border-white/12 text-[#8892a4] text-sm tracking-wide uppercase hover:border-white/25 hover:text-[#f0f0f0] transition-all duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                View Projects
              </a>
            </div>

            {/* OS Status card */}
            <div className="reveal panel rounded-sm overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5 bg-white/[0.015]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/8" />
                  <div className="w-2 h-2 rounded-full bg-white/8" />
                  <div className="w-2 h-2 rounded-full bg-[#00d4ff]/30" />
                </div>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#5a6070] ml-1">
                  VIBECODING OS — BUILDER STATUS
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-glow-pulse"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[8px] text-[#00d4ff]/60 uppercase tracking-widest">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Fields */}
              <div className="px-5 py-4 space-y-2.5">
                {STATUS_FIELDS.map(({ key, value }) => (
                  <div key={key} className="flex items-center gap-4">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#5a6070] w-24 flex-shrink-0">
                      {key}
                    </span>
                    <span className="font-mono text-[9px] text-[#00d4ff]/70">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Prompt line */}
              <div className="px-5 pb-4 flex items-center gap-2">
                <span className="font-mono text-[9px] text-[#5a6070]/40 select-none">›</span>
                <span className="font-mono text-[9px] text-[#5a6070]/50">
                  reach out to begin a build
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Project type cards ── */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16 reveal">
          {PROJECT_TYPES.map((pt) => (
            <div
              key={pt.id}
              className="panel panel-hover rounded-sm p-6 flex flex-col gap-4 group"
            >
              {/* Icon + number badge */}
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-base transition-opacity duration-200 group-hover:opacity-80"
                  style={{ color: pt.accent, opacity: 0.35 }}
                  aria-hidden="true"
                >
                  {pt.icon}
                </span>
                <span
                  className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border rounded-sm"
                  style={{
                    color:       pt.accent + "99",
                    borderColor: pt.accent + "28",
                    background:  pt.accent + "08",
                  }}
                >
                  {pt.id}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-[#f0f0f0] leading-snug group-hover:text-[#00d4ff] transition-colors duration-200">
                {pt.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#5a6070] leading-relaxed">
                {pt.description}
              </p>

              {/* Action link */}
              <a
                href={PRIMARY_HREF}
                className="font-mono text-[9px] tracking-widest uppercase text-[#5a6070] hover:text-[#00d4ff]/70 transition-colors duration-200 flex items-center gap-1.5 mt-auto pt-1 focus-visible:outline-none focus-visible:underline"
                aria-label={`Start a ${pt.title} project`}
              >
                Start this build
                <span aria-hidden="true" className="text-[8px]">→</span>
              </a>
            </div>
          ))}
        </div>

        {/* ── Footer bar ── */}
        <div className="reveal pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#5a6070]">
              VibeCoding OS — {new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/40 animate-glow-pulse"
                aria-hidden="true"
              />
              <span className="font-mono text-[9px] tracking-widest uppercase text-[#5a6070]">
                Available for selected builds
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#5a6070]">
              dizzyy552@gmail.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
