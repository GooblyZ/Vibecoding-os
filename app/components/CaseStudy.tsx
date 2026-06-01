"use client";

import { useRef, useState } from "react";
import { barberCaseStudy, projects } from "../lib/data";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "../lib/hooks";

// ── Demo constants ────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "haircut-beard",   name: "Haircut & Beard", duration: "45 min", price: "₪80" },
  { id: "classic-haircut", name: "Classic Haircut",  duration: "30 min", price: "₪55" },
  { id: "beard-trim",      name: "Beard Trim",       duration: "20 min", price: "₪35" },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

const TIMES = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00"] as const;

type StepId = "service" | "time" | "details" | "confirmed";
const FLOW_STEPS: { id: StepId; label: string }[] = [
  { id: "service",   label: "Select service"  },
  { id: "time",      label: "Choose time"     },
  { id: "details",   label: "Confirm details" },
  { id: "confirmed", label: "Track status"    },
];

// ── Interactive Booking Mockup ────────────────────────────────────────────────
// Owns its own local state — no props needed from parent.

function BookingMockup() {
  const [selectedService, setSelectedService] = useState<ServiceId>("haircut-beard");
  const [selectedTime,    setSelectedTime]    = useState<string | null>(null);
  const [activeStep,      setActiveStep]      = useState<StepId>("service");
  const [isConfirmed,     setIsConfirmed]     = useState(false);

  const activeStepIdx = FLOW_STEPS.findIndex((s) => s.id === activeStep);
  const serviceData   = SERVICES.find((s) => s.id === selectedService)!;

  const handleSelectService = (id: ServiceId) => {
    setSelectedService(id);
    if (activeStep === "service") setActiveStep("time");
  };

  const handleSelectTime = (t: string) => {
    setSelectedTime(t);
    if (activeStep === "time") setActiveStep("details");
  };

  const handleConfirm = () => {
    if (!selectedTime) return;
    setIsConfirmed(true);
    setActiveStep("confirmed");
  };

  // Flow bar — can navigate back to any visited step
  const handleFlowStep = (step: StepId) => {
    const idx = FLOW_STEPS.findIndex((s) => s.id === step);
    if (idx <= activeStepIdx) setActiveStep(step);
  };

  const statusText = isConfirmed && selectedTime
    ? `CONFIRMED · ${serviceData.name} · ${selectedTime}`
    : selectedTime
    ? `PENDING · ${serviceData.name} · ${selectedTime}`
    : "Select a service and time slot to continue";

  return (
    <div className="w-full" role="region" aria-label="Interactive booking demo">
      <div className="p-5 space-y-5">

        {/* ── Services ──────────────────────────────────────────────── */}
        <div>
          <span
            className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#5a6070] block mb-2"
            aria-hidden="true"
          >
            Service
          </span>
          <div className="space-y-1.5" role="group" aria-label="Select a service">
            {SERVICES.map((svc) => {
              const isSelected = selectedService === svc.id;
              return (
                <button
                  key={svc.id}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectService(svc.id)}
                  className="w-full text-left rounded-sm p-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d4ff]/60"
                  style={{
                    border:     isSelected ? "1px solid rgba(0,212,255,0.32)" : "1px solid rgba(255,255,255,0.07)",
                    background: isSelected ? "rgba(0,212,255,0.06)"           : "rgba(255,255,255,0.015)",
                  }}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[12px] font-semibold transition-colors duration-200 ${isSelected ? "text-[#f0f0f0]" : "text-[#8892a4]"}`}>
                      {svc.name}
                    </span>
                    <div
                      className="w-3 h-3 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                      style={{ borderColor: isSelected ? "#00d4ff" : "rgba(255,255,255,0.2)" }}
                      aria-hidden="true"
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />}
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-[#5a6070]">
                    {svc.duration} · {svc.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Time slots ────────────────────────────────────────────── */}
        <div>
          <span
            className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#5a6070] block mb-2"
            aria-hidden="true"
          >
            Available Times
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5" role="group" aria-label="Select a time slot">
            {TIMES.map((t) => {
              const isSelected = selectedTime === t;
              return (
                <button
                  key={t}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectTime(t)}
                  className={`text-center py-2.5 rounded-sm font-mono text-[9px] border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d4ff]/60 ${
                    isSelected
                      ? "border-[#00d4ff] bg-[#00d4ff] text-[#080a0f] font-bold"
                      : "border-white/8 text-[#5a6070] hover:border-white/18 hover:text-[#8892a4]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Client details — static representative ─────────────────── */}
        <div>
          <span
            className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#5a6070] block mb-2"
            aria-hidden="true"
          >
            Your Details
          </span>
          <div
            className="rounded-sm px-4 py-3 flex items-center gap-2.5"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/30 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs text-[#8892a4]">Yoni Cohen · +972 50 ···</span>
          </div>
        </div>

        {/* ── Confirm button ─────────────────────────────────────────── */}
        {isConfirmed ? (
          <div
            className="w-full px-4 py-3.5 flex items-center gap-3 rounded-sm"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.25)" }}
            role="status"
          >
            <span
              className="text-base leading-none flex-shrink-0"
              style={{ color: "#00d4ff" }}
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <span className="font-bold text-[10px] tracking-widest uppercase text-[#00d4ff] block">
                Booking Confirmed
              </span>
              {selectedTime && (
                <span className="font-mono text-[9px] text-[#00d4ff]/55 mt-0.5 block">
                  {serviceData.name} · {selectedTime} · {serviceData.duration}
                </span>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={handleConfirm}
            disabled={!selectedTime}
            className="w-full py-3.5 font-bold text-[10px] tracking-widest uppercase rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#080a0f]"
            style={{
              background: selectedTime ? "#00d4ff" : "rgba(0,212,255,0.10)",
              color:      selectedTime ? "#080a0f" : "rgba(0,212,255,0.30)",
              cursor:     selectedTime ? "pointer" : "not-allowed",
            }}
          >
            Confirm Booking
          </button>
        )}

        {/* ── Status line ───────────────────────────────────────────── */}
        <div className="flex items-center gap-2" aria-live="polite" aria-atomic="true">
          <div
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              isConfirmed ? "bg-[#00d4ff] animate-glow-pulse" : "bg-[#5a6070]/40"
            }`}
            aria-hidden="true"
          />
          <span className={`font-mono text-[9px] ${isConfirmed ? "text-[#00d4ff]/75" : "text-[#5a6070]/60"}`}>
            {statusText}
          </span>
        </div>
      </div>

      {/* ── Booking flow indicator (clickable) ───────────────────────── */}
      <div
        className="flex items-center gap-1.5 px-5 py-3 border-t flex-wrap"
        style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.14)" }}
        role="navigation"
        aria-label="Booking flow steps"
      >
        <span
          className="font-mono text-[7px] text-[#5a6070]/40 tracking-widest uppercase mr-1 flex-shrink-0"
          aria-hidden="true"
        >
          Flow
        </span>
        {FLOW_STEPS.map((step, i) => {
          const isCurrent   = activeStep === step.id;
          const isVisited   = i < activeStepIdx || isConfirmed;
          const isNavigable = i <= activeStepIdx;
          const color       = isCurrent || isVisited ? "#00d4ff" : "rgba(255,255,255,0.20)";
          const opacity     = isCurrent ? 1 : isVisited ? 0.65 : 0.30;

          return (
            <span key={step.id} className="flex items-center gap-1.5">
              <button
                onClick={() => handleFlowStep(step.id)}
                disabled={!isNavigable}
                className="font-mono text-[8px] tracking-[0.07em] rounded-sm px-0.5 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d4ff]/40"
                style={{
                  color,
                  opacity,
                  fontWeight: isCurrent ? 700 : 400,
                  cursor:     isNavigable ? "pointer" : "default",
                }}
                aria-current={isCurrent ? "step" : undefined}
              >
                {step.label}
              </button>
              {i < FLOW_STEPS.length - 1 && (
                <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.14)", fontSize: 9, lineHeight: 1 }}>
                  ›
                </span>
              )}
            </span>
          );
        })}

        {isConfirmed && (
          <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
            <div
              className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
              style={{ background: "#00d4ff", opacity: 0.65 }}
              aria-hidden="true"
            />
            <span className="font-mono" style={{ fontSize: 7, letterSpacing: "0.15em", color: "rgba(0,212,255,0.55)" }}>
              CONFIRMED
            </span>
          </div>
        )}
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
    { label: "Problem", dot: "#ff6b35", border: "rgba(255,107,53,0.50)", text: cs.problem  },
    { label: "Solution", dot: "#00d4ff", border: "rgba(0,212,255,0.50)", text: cs.solution },
    { label: "Outcome",  dot: "#00d4ff", border: "rgba(0,212,255,0.30)", text: cs.outcome  },
  ];

  return (
    <section
      id="case-study-barber"
      className="relative py-28 md:py-36 px-6 border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)", filter: "blur(70px)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-12 reveal">
          <SectionLabel index="04" label="Featured Case Study" className="mb-8" />

          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border border-[#00d4ff]/25 text-[#00d4ff]/70 rounded-sm">
              {project.category}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border border-white/10 text-[#5a6070] rounded-sm">
              {project.year}
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 border border-[#00d4ff]/25 text-[#00d4ff] rounded-sm flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#00d4ff] inline-block" aria-hidden="true" />
              {project.status}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] tracking-tight leading-tight mb-4 max-w-2xl">
            {cs.headline}
          </h2>
          <p className="text-[#5a6070] text-base leading-relaxed max-w-xl">
            {cs.subheadline}
          </p>
        </div>

        {/* ── Product demo environment ─────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.45fr] gap-8 mb-8">

          {/* Left — build spec panel */}
          <div className="flex flex-col gap-7 reveal">

            {/* Problem / Solution / Outcome */}
            <div className="space-y-5">
              {pso.map((p) => (
                <div key={p.label} className="pl-4" style={{ borderLeft: `2px solid ${p.border}` }}>
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.2em] block mb-1.5"
                    style={{ color: p.dot, opacity: 0.70 }}
                  >
                    {p.label}
                  </span>
                  <p className="text-sm text-[#8892a4] leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>

            {/* Before / After — compact proof strip */}
            <div className="grid grid-cols-2 gap-px bg-white/5 rounded-sm overflow-hidden">
              <div className="bg-[#080a0f] px-3 py-3">
                <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#ff6b35]/50 block mb-1.5">
                  Before
                </span>
                <p className="text-[11px] text-[#5a6070] leading-snug">
                  WhatsApp messages, unclear availability, manual follow-up.
                </p>
              </div>
              <div className="bg-[#080a0f] px-3 py-3" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#00d4ff]/50 block mb-1.5">
                  After
                </span>
                <p className="text-[11px] text-[#8892a4] leading-snug">
                  Clear services, visible time slots, confirmed booking status.
                </p>
              </div>
            </div>

            {/* Stack */}
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#5a6070]/50 block mb-3">
                Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Build decisions */}
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#5a6070]/50 block mb-3">
                Build Decisions
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {cs.decisions.map((d, i) => (
                  <div key={i} className="panel rounded-sm p-3">
                    <span className="font-mono text-[8px] text-[#00d4ff]/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-xs font-semibold text-[#f0f0f0] mt-1 mb-1.5 leading-snug">
                      {d.title}
                    </h4>
                    <p className="text-[11px] text-[#5a6070] leading-snug">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — interactive product demo */}
          <div className="reveal">
            {/* Demo guidance label */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-1 h-1 rounded-full bg-[#00d4ff]/50 flex-shrink-0" aria-hidden="true" />
              <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]">
                Interactive demo · choose a service, pick a time, confirm
              </span>
            </div>

            <div
              className="rounded-sm overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.18)" }}
            >
              {/* OS title bar */}
              <div
                className="flex items-center gap-3 px-4 border-b flex-shrink-0"
                style={{ height: 36, background: "rgba(0,0,0,0.28)", borderColor: "rgba(255,255,255,0.06)" }}
                aria-hidden="true"
              >
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white/8" />
                  <div className="w-2 h-2 rounded-full bg-white/8" />
                  <div className="w-2 h-2 rounded-full" style={{ background: "rgba(0,212,255,0.42)" }} />
                </div>
                <span
                  className="font-mono flex-1 truncate"
                  style={{ fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.22)" }}
                >
                  ~/vc/barber-booking / public / book
                </span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
                    style={{ background: "#00d4ff", opacity: 0.65 }}
                  />
                  <span className="font-mono" style={{ fontSize: 7, letterSpacing: "0.18em", color: "rgba(0,212,255,0.55)" }}>
                    LIVE
                  </span>
                </div>
              </div>

              {/* Interactive mockup — owns its own state */}
              <BookingMockup />
            </div>
          </div>
        </div>

        {/* ── Stats strip ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden reveal">
          {cs.stats.map(({ value, label }) => (
            <div key={label} className="bg-[#080a0f] px-6 py-7 text-center">
              <div className="text-2xl font-bold text-[#00d4ff] tracking-tight mb-1">{value}</div>
              <div className="font-mono text-[9px] tracking-wider uppercase text-[#5a6070]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
