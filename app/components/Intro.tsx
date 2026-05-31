"use client";

import { useRef } from "react";
import { capabilities, creatorStats } from "../lib/data";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "../lib/hooks";

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useReveal(sectionRef, ".reveal");
  useReveal(statsRef, ".reveal");

  return (
    <section id="intro" className="relative py-28 md:py-36 px-6 border-t border-white/5">
      {/* Faint left-edge glow */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.15), transparent)" }}
      />

      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — creator statement */}
          <div>
            <SectionLabel index="02" label="Builder Profile" className="mb-8 reveal" />

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8 reveal">
              <span className="text-[#f0f0f0]">One creator.</span>
              <br />
              <span className="text-[#00d4ff]">Every layer.</span>
            </h2>

            <div className="space-y-5 reveal">
              <p className="text-[#8892a4] text-base md:text-lg leading-relaxed">
                No handoff delays. No brief lost in translation. I work across design,
                code, and motion — one person driving every layer from concept to
                deployed system.
              </p>
              <p className="text-[#5a6070] text-sm leading-relaxed">
                Whether it's a cinematic product showcase, a full booking platform, or a
                scroll-driven interactive experiment — I own the creative and technical
                execution completely.
              </p>
            </div>

            {/* Distinction line */}
            <div className="mt-10 reveal">
              <div className="panel rounded-sm px-6 py-5 border-l-2 border-l-[#00d4ff]/40">
                <p className="font-mono text-xs text-[#5a6070] leading-relaxed">
                  <span className="text-[#00d4ff]/70 block mb-1 tracking-widest uppercase text-[9px]">
                    Core belief
                  </span>
                  Motion should amplify strong composition — not compensate for weak design.
                  Structure comes first. Everything else follows.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — capability pillars */}
          <div className="grid grid-cols-2 gap-3">
            {capabilities.map((cap, i) => (
              <div
                key={cap.id}
                className="reveal panel panel-hover rounded-sm p-5 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-5 h-5 rounded-sm bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center mb-4 group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/60" />
                </div>
                <h3 className="text-sm font-semibold text-[#f0f0f0] mb-2 leading-snug">
                  {cap.label}
                </h3>
                <p className="text-xs text-[#5a6070] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden"
        >
          {creatorStats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal bg-[#080a0f] px-8 py-7 flex flex-col gap-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-3xl font-bold text-[#f0f0f0] tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#5a6070]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
