"use client";

import { useEffect, useRef } from "react";
import { OSCoreVisual } from "./OSCoreVisual";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  // Soft mouse-follow glow
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
      const rect = section.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
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
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080a0f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080a0f] to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center min-h-[82svh]">

          {/* ── Left: text ────────────────────────────────────────── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-glow-pulse flex-shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#00d4ff]/55">
                VibeCoding OS&nbsp;/&nbsp;Independent Digital Builder
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-bold tracking-tight leading-[0.94] mb-7">
              <span className="block text-[#f0f0f0] text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem]">
                Websites That
              </span>
              <span className="block text-[#00d4ff] glow-text-blue text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] mt-1">
                Feel Alive.
              </span>
            </h1>

            {/* Supporting copy */}
            <p className="text-base md:text-lg text-[#5a6070] leading-relaxed mb-8 max-w-[40ch]">
              Cinematic websites, interactive systems, and digital experiences
              built by one independent creator.
            </p>

            {/* Stats line */}
            <p className="font-mono text-[10px] tracking-widest text-[#5a6070]/60 mb-10 uppercase">
              5 core builds&nbsp;·&nbsp;4 disciplines&nbsp;·&nbsp;1 independent creator
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#00d4ff] text-[#080a0f] font-semibold text-sm tracking-wide uppercase rounded-sm hover:bg-[#00d4ff]/90 transition-colors duration-200 glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/60"
              >
                Explore Projects
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-3.5 border border-white/14 text-[#f0f0f0] text-sm tracking-wide uppercase rounded-sm hover:border-white/28 hover:bg-white/4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                Start a Build
              </a>
            </div>

            {/* Tertiary archive link */}
            <a
              href="#archive"
              className="inline-flex items-center gap-1.5 mt-5 font-mono text-[10px] tracking-widest uppercase text-[#5a6070] hover:text-[#00d4ff]/60 transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
            >
              View Build Archive
              <span aria-hidden="true" className="text-[8px] opacity-60">↗</span>
            </a>
          </div>

          {/* ── Right: OS visual (desktop only) ─────────────────── */}
          <div
            className="hidden md:flex items-center justify-center"
            aria-hidden="true"
          >
            <OSCoreVisual />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#5a6070]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#00d4ff]/60 to-transparent" />
      </div>
    </section>
  );
}
