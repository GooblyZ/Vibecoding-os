"use client";

import { useState, useRef } from "react";
import { projects, type Category, type Project } from "../lib/data";
import { SectionHeading } from "./SectionLabel";
import { CardVisual } from "./CardVisual";
import { useReveal } from "../lib/hooks";

const CATEGORIES: (Category | "All")[] = ["All", "Systems", "Motion", "Business", "Experiments"];

const STATUS_STYLE: Record<Project["status"], { dot: string; text: string; border: string }> = {
  live:    { dot: "bg-[#00d4ff]",  text: "text-[#00d4ff]",  border: "border-[#00d4ff]/25" },
  beta:    { dot: "bg-[#ff6b35]",  text: "text-[#ff6b35]",  border: "border-[#ff6b35]/25" },
  concept: { dot: "bg-[#5a6070]",  text: "text-[#5a6070]",  border: "border-white/10" },
};

function ProjectCard({ project }: { project: Project }) {
  const s = STATUS_STYLE[project.status];

  return (
    <article className="reveal panel rounded-sm flex flex-col overflow-hidden group transition-all duration-300 hover:border-white/12">
      {/* Abstract visual header */}
      <CardVisual project={project} />

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
        {/* Status */}
        <div className={`flex items-center gap-1.5 ml-3 px-2 py-0.5 border rounded-sm ${s.border}`}>
          <div className={`w-1 h-1 rounded-full ${s.dot}`} />
          <span className={`font-mono text-[8px] tracking-widest uppercase ${s.text}`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-4 px-5 py-5 flex-1">
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

        <div className="h-px bg-white/5" />

        {/* What it proves — chips */}
        <div>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#5a6070] block mb-2.5">
            What it proves
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.whatItProves.map((proof) => (
              <span
                key={proof}
                className="font-mono text-[9px] tracking-wide px-2.5 py-1 rounded-sm border"
                style={{
                  color: project.accentColor + "cc",
                  borderColor: project.accentColor + "30",
                  background: project.accentColor + "08",
                }}
              >
                {proof}
              </span>
            ))}
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-[#00d4ff]/25 text-[#00d4ff] hover:bg-[#00d4ff]/8 transition-all duration-200 rounded-sm"
            >
              View Project ↗
            </a>
          ) : (
            <span className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-white/6 text-[#5a6070] rounded-sm select-none">
              Coming Soon
            </span>
          )}
          {project.caseStudyUrl ? (
            <a
              href={project.caseStudyUrl}
              className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-white/8 text-[#8892a4] hover:border-white/20 hover:text-[#f0f0f0] transition-all duration-200 rounded-sm"
            >
              Case Study
            </a>
          ) : (
            <button
              disabled
              aria-label="No case study available"
              className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-white/5 text-[#5a6070]/50 rounded-sm cursor-default select-none"
            >
              Details
            </button>
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
            title="What I've Built"
            subtitle="Each project is a proof of concept — for a system, an experience, or an idea."
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
                className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 border rounded-sm transition-all duration-200 ${
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
          key={active}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
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
