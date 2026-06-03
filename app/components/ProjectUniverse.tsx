"use client";

import { useState, useRef } from "react";
import { projects, type Category, type Project } from "../lib/data";
import { SectionHeading } from "./SectionLabel";
import { CardVisual } from "./CardVisual";
import { useReveal, useTilt } from "../lib/hooks";

// Only show categories that have ≥1 project — keeps the filter bar free of empty buckets
const CATEGORIES: (Category | "All")[] = [
  "All",
  ...(["Systems", "Motion", "Business", "Experiments"] as Category[]).filter(
    (cat) => projects.some((p) => p.category === cat)
  ),
];

// Featured badge overlay — business/visual proof signal
const FEATURED: Partial<Record<string, string>> = {
  "barber-booking": "Business Proof",
  "neovolt":        "Visual Proof",
};

const STATUS_STYLE: Record<Project["status"], { dot: string; text: string; border: string }> = {
  live:    { dot: "bg-[#00d4ff]",  text: "text-[#00d4ff]",  border: "border-[#00d4ff]/25" },
  beta:    { dot: "bg-[#ff6b35]",  text: "text-[#ff6b35]",  border: "border-[#ff6b35]/25" },
  concept: { dot: "bg-[#5a6070]",  text: "text-[#5a6070]",  border: "border-white/10" },
};

function ProjectCard({ project }: { project: Project }) {
  const s       = STATUS_STYLE[project.status];
  const cardRef = useRef<HTMLDivElement>(null);
  const badge   = FEATURED[project.id];
  useTilt(cardRef); // 3D tilt + spotlight glow — supersedes usePointerGlow for cards

  // Single primary CTA: liveUrl > caseStudyUrl > nothing
  const cta = project.liveUrl
    ? { href: project.liveUrl,     label: project.liveLabel ?? "View Live", arrow: "↗" as const, external: true  }
    : project.caseStudyUrl
    ? { href: project.caseStudyUrl, label: "Case Study", arrow: "→" as const, external: false }
    : null;

  // Secondary only when both urls exist
  const secondaryCta = project.liveUrl && project.caseStudyUrl ? project.caseStudyUrl : null;

  return (
    <article ref={cardRef} className="relative panel rounded-sm flex flex-col overflow-hidden group card-tilt-wrap hover:border-white/12">
      <div className="card-glow-layer" aria-hidden="true" />

      {/* Featured badge — overlaid on visual header */}
      {badge && (
        <div className="absolute top-8 right-3 z-20 pointer-events-none">
          <span
            className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-sm border"
            style={{
              color:       project.accentColor,
              borderColor: project.accentColor + "45",
              background:  project.accentColor + "14",
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Visual header — parallax layer: shifts with tilt for depth */}
      <div style={{ transform: "translate(var(--tilt-sx, 0px), var(--tilt-sy, 0px))" }}>
        <CardVisual project={project} />
      </div>

      {/* Meta strip */}
      <div
        className="flex items-center gap-2 px-5 py-2.5 border-b border-white/5"
        style={{ background: project.bgColor }}
      >
        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accentColor }} />
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase flex-1"
          style={{ color: project.accentColor + "80" }}
        >
          {project.category}
        </span>
        <span className="font-mono text-[9px] text-[#5a6070]">{project.year}</span>
        <div className={`flex items-center gap-1.5 ml-3 px-2 py-0.5 border rounded-sm ${s.border}`}>
          <div className={`w-1 h-1 rounded-full ${s.dot}`} />
          <span className={`font-mono text-[8px] tracking-widest uppercase ${s.text}`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Card body — counter-parallax: moves opposite to header (40%) for layered depth */}
      <div
        className="flex flex-col gap-3 px-5 py-5 flex-1"
        style={{ transform: "translate(calc(var(--tilt-sx, 0px) * -0.4), calc(var(--tilt-sy, 0px) * -0.4))" }}
      >
        {/* Title + type */}
        <div>
          <h3 className="text-[1.05rem] font-bold text-[#f0f0f0] leading-snug tracking-tight group-hover:text-[#00d4ff] transition-colors duration-300">
            {project.name}
          </h3>
          <p className="font-mono text-[9px] tracking-wider text-[#5a6070] uppercase mt-1">
            {project.type}
          </p>
        </div>

        {/* Short description */}
        <p className="text-sm text-[#8892a4] leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Proof chips — 3 strongest, no label needed */}
        <div className="flex flex-wrap gap-1.5">
          {project.whatItProves.slice(0, 3).map((proof) => (
            <span
              key={proof}
              className="font-mono text-[9px] tracking-wide px-2.5 py-1 rounded-sm border"
              style={{
                color:       project.accentColor + "cc",
                borderColor: project.accentColor + "30",
                background:  project.accentColor + "08",
              }}
            >
              {proof}
            </span>
          ))}
        </div>

        {/* Tech tags — max 4 + overflow count */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tag opacity-50">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-2 mt-auto pt-2">
          {cta ? (
            <>
              <a
                href={cta.href}
                {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn-arrow btn-press flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1"
                style={{
                  borderColor: project.accentColor + "40",
                  color:       project.accentColor,
                }}
              >
                {cta.label}&nbsp;
                <span className={cta.arrow === "↗" ? "arrow-diag" : "arrow"}>{cta.arrow}</span>
              </a>
              {secondaryCta && (
                <a
                  href={secondaryCta}
                  className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-white/8 text-[#8892a4] hover:border-white/20 hover:text-[#f0f0f0] transition-all duration-200 rounded-sm"
                >
                  Case Study
                </a>
              )}
            </>
          ) : (
            <span className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-white/6 text-[#5a6070]/50 rounded-sm select-none">
              Preview Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectUniverse() {
  const [active, setActive] = useState<Category | "All">("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useReveal(headerRef, ".section-reveal");
  useReveal(gridRef, ".reveal");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header + filters */}
        <div ref={headerRef}>
          <SectionHeading
            index="03"
            label="Project Universe"
            title="Selected Builds"
            subtitle="Five focused builds showing systems, motion, product thinking, and visual direction."
            className="mb-12 section-reveal"
          />

          <div
            className="flex flex-wrap gap-2 mb-10 section-reveal"
            role="group"
            aria-label="Filter projects by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={`btn-press font-mono text-[10px] tracking-widest uppercase px-4 py-2 border rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d4ff]/50 ${
                  active === cat
                    ? "border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/8"
                    : "border-white/8 text-[#5a6070] hover:border-white/16 hover:text-[#8892a4]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-2 opacity-40">
                    {projects.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Card grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 cards-grid"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="font-mono text-sm text-[#5a6070] py-16 text-center">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
