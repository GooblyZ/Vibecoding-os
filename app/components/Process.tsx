"use client";

import { useState, useRef, useEffect, useCallback, RefObject } from "react";
import { processPipeline, type PipelineStage } from "../lib/data";
import { SectionLabel } from "./SectionLabel";

const TOTAL = processPipeline.length; // 6

// ── Execution Detail Panel ────────────────────────────────────────────────────
// key={stage.id} on inner grid unmounts/remounts content → panel-content-reveal fires.
// Outer container is stable — no layout shift.

function ExecutionPanel({ stage }: { stage: PipelineStage }) {
  return (
    <div className="panel rounded-sm overflow-hidden">
      {/* OS chrome — never remounts */}
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
          execution detail
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-glow-pulse" aria-hidden="true" />
          <span className="font-mono text-[8px] tracking-widest uppercase text-[#00d4ff]/55">active</span>
        </div>
      </div>

      {/* Content — key triggers remount + CSS animation on stage change */}
      <div className="px-6 py-4 min-h-[108px] flex flex-col justify-center">
        <div
          key={stage.id}
          className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 items-baseline panel-content-reveal"
        >
          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">Stage</span>
          <span className="text-sm font-semibold text-[#f0f0f0]">{stage.id} · {stage.label}</span>

          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">Output</span>
          <span className="text-xs text-[#00d4ff]/70">{stage.output}</span>

          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">Client value</span>
          <span className="text-xs text-[#8892a4]">{stage.clientValue}</span>

          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">Mode</span>
          <span className="text-xs text-[#ff6b35]/65">{stage.mode}</span>

          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/60 whitespace-nowrap">Status</span>
          <span className="flex items-center gap-2">
            <span className="flex-1 h-px bg-white/6" aria-hidden="true" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#00d4ff]">Active</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Desktop sequential stage list ─────────────────────────────────────────────
// railFillRef is written directly by the scroll handler — no React state for rail.

function DesktopStageList({
  activeIndex,
  railFillRef,
  onSelect,
  onFocusStage,
}: {
  activeIndex: number;
  railFillRef: RefObject<HTMLDivElement | null>;
  onSelect: (i: number) => void;
  onFocusStage: (i: number) => void;
}) {
  return (
    <div className="relative">
      {/* Rail track */}
      <div
        className="absolute top-4 bottom-4 overflow-hidden rounded-full"
        style={{ left: 15, width: 2, background: "rgba(255,255,255,0.05)" }}
        aria-hidden="true"
      >
        {/* Fill — updated every RAF by scroll handler, no CSS transition needed */}
        <div
          ref={railFillRef}
          style={{
            height: "0%",
            background: "linear-gradient(to bottom, rgba(0,212,255,0.52), rgba(0,212,255,0.10))",
          }}
        />
      </div>

      <div className="space-y-2">
        {processPipeline.map((stage, i) => {
          const status = i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming";

          // Distance-based opacity for upcoming stages — soft falloff
          const upcomingOpacity =
            i === activeIndex + 1 ? 0.44
            : i === activeIndex + 2 ? 0.28
            : 0.18;

          return (
            <button
              key={stage.id}
              onClick={() => onSelect(i)}
              onFocus={() => onFocusStage(i)}
              aria-pressed={i === activeIndex}
              aria-current={i === activeIndex ? "step" : undefined}
              aria-label={`Stage ${stage.id}: ${stage.label}`}
              className={`w-full text-left flex items-start gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/50 transition-opacity duration-300 ${
                status !== "active" ? "px-1 py-1 hover:bg-white/[0.02]" : ""
              }`}
              style={{ opacity: status === "upcoming" ? upcomingOpacity : 1 }}
            >
              {/* Node */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-350 ${
                  status === "done"
                    ? "border border-[#00d4ff]/30 bg-[#00d4ff]/08"
                    : status === "active"
                    ? "border-2 border-[#00d4ff] bg-[#00d4ff]/14 shadow-[0_0_16px_rgba(0,212,255,0.32)]"
                    : "border border-white/10 bg-[#080a0f]"
                }`}
                aria-hidden="true"
              >
                {status === "done" ? (
                  <span className="text-[#00d4ff]/55 text-[9px]">✓</span>
                ) : (
                  <span
                    className={`font-mono text-[9px] ${
                      status === "active" ? "text-[#00d4ff]" : "text-[#5a6070]/50"
                    }`}
                  >
                    {stage.id}
                  </span>
                )}
              </div>

              {/* Completed row */}
              {status === "done" && (
                <div className="flex items-center gap-2 flex-1 py-1.5 min-w-0">
                  <span className="text-sm text-[#8892a4]">{stage.label}</span>
                  <span className="ml-auto font-mono text-[8px] border border-white/8 text-[#5a6070] px-2 py-0.5 rounded-sm flex-shrink-0">
                    {stage.output}
                  </span>
                </div>
              )}

              {/* Active card — key triggers stage-card-reveal animation on change */}
              {status === "active" && (
                <div
                  key={activeIndex}
                  className="flex-1 panel rounded-sm px-5 py-4 border-[#00d4ff]/50 bg-[#00d4ff]/[0.05] shadow-[0_0_28px_rgba(0,212,255,0.09)] stage-card-reveal"
                >
                  <h3 className="text-[1.05rem] font-bold text-[#00d4ff] mb-2 leading-snug">
                    {stage.label}
                  </h3>
                  <p className="text-sm text-[#8892a4] leading-relaxed mb-3">
                    {stage.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[8px] text-[#5a6070]/60 uppercase tracking-wider">output</span>
                    <span className="font-mono text-[8px] text-[#00d4ff]/40" aria-hidden="true">→</span>
                    <span className="font-mono text-[8px] px-2 py-0.5 rounded-sm border border-[#00d4ff]/35 text-[#00d4ff]/80 bg-[#00d4ff]/08">
                      {stage.output}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] leading-snug" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {stage.clientValue}
                  </p>
                </div>
              )}

              {/* Upcoming row */}
              {status === "upcoming" && (
                <div className="flex items-center flex-1 py-1.5">
                  <span className="text-sm text-[#5a6070]">{stage.label}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef   = useRef<HTMLDivElement>(null);
  const railFillRef  = useRef<HTMLDivElement>(null); // Desktop rail: direct DOM writes
  const mobileRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const prevIdxRef   = useRef(0);                   // Debounce: only re-render on index change

  // ── Scroll the pinned section to the position matching a stage index ─────
  // Used only on click — focus does NOT trigger scroll (avoids tab-navigation jumps).
  // Always uses behavior:"auto" (instant). Smooth behavior causes a race: the scroll
  // handler fires on every intermediate frame and recalculates activeIndex from the
  // in-between positions, so the next user scroll continues from the wrong place.
  // The card/panel CSS animations (stage-card-reveal, panel-content-reveal) still
  // play because they are triggered by the React state change, not by scroll motion.
  const scrollToStage = useCallback((index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable < 50) return; // Mobile / section shorter than viewport — skip
    // Inverse of scroll handler: progress = -rect.top / scrollable
    // → targetScrollY = sectionAbsTop + scrollable * (index / (TOTAL - 1))
    const targetProgress = index / (TOTAL - 1);
    const targetScrollY = window.scrollY + el.getBoundingClientRect().top + scrollable * targetProgress;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, Math.min(maxScroll, targetScrollY)), behavior: "auto" });
  }, []);

  // ── Desktop click handler: set index immediately + sync scroll position ──
  const handleDesktopSelect = useCallback((index: number) => {
    setActiveIndex(index);
    prevIdxRef.current = index;
    scrollToStage(index);
  }, [scrollToStage]);

  // ── Mobile click handler: set index + scrollIntoView the stage card ──────
  const handleMobileSelect = useCallback((index: number) => {
    setActiveIndex(index);
    const el = mobileRefs.current[index];
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    }
  }, []);

  // ── Desktop: continuous scroll-progress driver ───────────────────────────
  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect      = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - window.innerHeight;
        if (scrollable < 50) return; // Mobile / section shorter than viewport — bail

        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

        // ── Rail fill: direct DOM write, no React re-render per pixel ──
        if (railFillRef.current) {
          railFillRef.current.style.height = `${progress * 100}%`;
        }

        // ── Active stage: Math.round for even distribution across all 6 ──
        // rawStage 0→5 maps progress 0→1 to stages 0→5 with equal scroll per stage.
        // Math.round gives each inner stage ~20% and first/last ~10%.
        const rawStage = progress * (TOTAL - 1);
        const idx = Math.min(TOTAL - 1, Math.max(0, Math.round(rawStage)));

        // Only trigger React re-render when the stage index actually changes
        if (idx !== prevIdxRef.current) {
          prevIdxRef.current = idx;
          setActiveIndex(idx);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Sync on mount
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Mobile: IntersectionObserver active stage driver ─────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt((e.target as HTMLElement).dataset.stageIdx ?? "0", 10);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    mobileRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const activeStage = processPipeline[activeIndex] ?? processPipeline[0];
  // Mobile rail: step-based from IO, CSS transition smooths the jump
  const railPct = TOTAL > 1 ? (activeIndex / (TOTAL - 1)) * 100 : 0;

  // Shared header content
  const header = (
    <>
      <SectionLabel index="07" label="Process" className="mb-5" />
      <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] tracking-tight leading-tight mb-4">
        From raw idea to working
        <span className="text-[#00d4ff]"> digital experience.</span>
      </h2>
      <p className="text-sm text-[#8892a4] max-w-xs leading-relaxed mb-5">
        A focused build process that turns vague ideas into structured, designed,
        tested, and launch-ready websites.
      </p>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/8 bg-white/[0.02]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b35]/60" aria-hidden="true" />
          <span className="font-mono text-[8px] uppercase tracking-widest text-[#5a6070]">raw idea</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/8 via-[#00d4ff]/14 to-white/8" aria-hidden="true" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#00d4ff]/20 bg-[#00d4ff]/04">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/60 animate-glow-pulse" aria-hidden="true" />
          <span className="font-mono text-[8px] uppercase tracking-widest text-[#00d4ff]/70">live site</span>
        </div>
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative border-t border-white/5 lg:min-h-[420vh]"
    >
      {/* ── DESKTOP: pinned scroll experience ─────────────────────────── */}
      <div className="hidden lg:flex sticky top-0 h-screen items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="grid grid-cols-[1fr_1.15fr] gap-14 items-start">

            {/* Left: header + stage counter + execution panel */}
            <div>
              {header}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-mono text-[8px] text-[#5a6070]/60 tracking-widest uppercase">Stage</span>
                <span className="font-mono text-lg font-bold text-[#00d4ff] tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[8px] text-[#5a6070]/50">
                  / {String(TOTAL).padStart(2, "0")}
                </span>
              </div>
              <ExecutionPanel stage={activeStage} />
            </div>

            {/* Right: sequential stage display */}
            <DesktopStageList
              activeIndex={activeIndex}
              railFillRef={railFillRef}
              onSelect={handleDesktopSelect}
              onFocusStage={setActiveIndex}
            />
          </div>
        </div>
      </div>

      {/* ── MOBILE: normal vertical timeline ──────────────────────────── */}
      <div className="lg:hidden py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-10">{header}</div>
          <ExecutionPanel stage={activeStage} />

          <div className="relative mt-8">
            {/* Rail */}
            <div
              className="absolute top-4 bottom-4 overflow-hidden rounded-full"
              style={{ left: 15, width: 2, background: "rgba(255,255,255,0.05)" }}
              aria-hidden="true"
            >
              <div
                style={{
                  height: `${railPct}%`,
                  background: "linear-gradient(to bottom, rgba(0,212,255,0.45), rgba(0,212,255,0.10))",
                  transition: "height 0.55s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>

            <div className="space-y-3">
              {processPipeline.map((stage, i) => {
                const isActive = i === activeIndex;
                const mobileOpacity =
                  isActive ? 1
                  : i < activeIndex ? 0.55
                  : i === activeIndex + 1 ? 0.42
                  : 0.22;

                return (
                  <div
                    key={stage.id}
                    ref={(el: HTMLDivElement | null) => { mobileRefs.current[i] = el; }}
                    data-stage-idx={i}
                  >
                    <button
                      onClick={() => handleMobileSelect(i)}
                      onFocus={() => setActiveIndex(i)}
                      aria-pressed={isActive}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Stage ${stage.id}: ${stage.label}`}
                      className={`w-full text-left flex items-start gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/50 transition-opacity duration-300 ${
                        !isActive ? "py-1 px-1 hover:bg-white/[0.02]" : ""
                      }`}
                      style={{ opacity: mobileOpacity }}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                          isActive
                            ? "border-2 border-[#00d4ff] bg-[#00d4ff]/14 shadow-[0_0_14px_rgba(0,212,255,0.28)]"
                            : "border border-white/10 bg-[#080a0f]"
                        }`}
                        aria-hidden="true"
                      >
                        <span
                          className={`font-mono text-[9px] ${isActive ? "text-[#00d4ff]" : "text-[#5a6070]/50"}`}
                        >
                          {stage.id}
                        </span>
                      </div>

                      {isActive ? (
                        <div
                          key={i}
                          className="flex-1 panel rounded-sm px-4 py-4 border-[#00d4ff]/45 bg-[#00d4ff]/[0.05] shadow-[0_0_22px_rgba(0,212,255,0.08)] stage-card-reveal"
                        >
                          <h3 className="text-sm font-bold text-[#00d4ff] mb-1.5">{stage.label}</h3>
                          <p className="text-xs text-[#8892a4] leading-relaxed mb-2.5">{stage.description}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[8px] text-[#5a6070]/60 uppercase tracking-wider">output</span>
                            <span className="font-mono text-[8px] text-[#00d4ff]/40" aria-hidden="true">→</span>
                            <span className="font-mono text-[8px] px-2 py-0.5 rounded-sm border border-[#00d4ff]/30 text-[#00d4ff]/75 bg-[#00d4ff]/06">
                              {stage.output}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center flex-1 py-1.5">
                          <span className="text-sm text-[#8892a4]">{stage.label}</span>
                          <span className="ml-auto font-mono text-[8px] text-[#5a6070]">{stage.output}</span>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
