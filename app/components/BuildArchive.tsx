"use client";

import { useState, useMemo, useRef } from "react";
import { projects, type Project } from "../lib/data";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "../lib/hooks";

// ── Utilities ─────────────────────────────────────────────────────────────────

function archivePath(project: Project): string {
  return project.category === "Experiments"
    ? `/vibecoding/experiments/${project.id}`
    : `/vibecoding/projects/${project.id}`;
}

const STATUS: Record<Project["status"], { dot: string; text: string; border: string }> = {
  live:    { dot: "bg-[#00d4ff]",  text: "text-[#00d4ff]",  border: "border-[#00d4ff]/25" },
  beta:    { dot: "bg-[#ff6b35]",  text: "text-[#ff6b35]",  border: "border-[#ff6b35]/25" },
  concept: { dot: "bg-[#5a6070]", text: "text-[#5a6070]",  border: "border-white/10" },
};

// ── Project row ───────────────────────────────────────────────────────────────

function ProjectRow({
  project,
  isActive,
  onActivate,
}: {
  project: Project;
  isActive: boolean;
  onActivate: () => void;
}) {
  const s    = STATUS[project.status];
  const name = archivePath(project).split("/").pop()!;

  return (
    <button
      onClick={onActivate}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-pressed={isActive}
      aria-label={`Preview ${project.name}`}
      className={`w-full text-left flex items-center gap-2.5 py-2.5 pr-4 transition-colors duration-150 group
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#00d4ff]/40
        ${isActive
          ? "bg-[#00d4ff]/06 border-l-2 border-l-[#00d4ff]/45 pl-[14px]"
          : "border-l-2 border-l-transparent pl-[14px] hover:bg-white/[0.025]"
        }`}
    >
      {/* Caret */}
      <span
        className={`font-mono text-[9px] flex-shrink-0 transition-colors ${
          isActive ? "text-[#00d4ff]" : "text-[#00d4ff]/30 group-hover:text-[#00d4ff]/60"
        }`}
        aria-hidden="true"
      >
        ▸
      </span>

      {/* Folder name */}
      <span
        className={`font-mono text-xs flex-1 truncate transition-colors ${
          isActive ? "text-[#f0f0f0]" : "text-[#8892a4] group-hover:text-[#f0f0f0]"
        }`}
      >
        {name}/
      </span>

      {/* Meta (hidden on xs) */}
      <div className="hidden sm:flex items-center gap-3 flex-shrink-0 min-w-0">
        <span className="font-mono text-[8px] text-[#5a6070] uppercase tracking-wide hidden lg:block">
          {project.category}
        </span>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
          <span className={`font-mono text-[8px] ${s.text}`}>{project.status}</span>
        </div>
        <span className="font-mono text-[8px] text-[#5a6070]">{project.year}</span>
        <span className="font-mono text-[8px] text-[#5a6070]/40">
          {project.tech.length}T
        </span>
      </div>
    </button>
  );
}

// ── Preview panel ─────────────────────────────────────────────────────────────

function ProjectPreview({ project }: { project: Project }) {
  const s    = STATUS[project.status];
  const path = archivePath(project);

  return (
    <div className="flex flex-col gap-5 p-6 h-full overflow-y-auto">
      {/* Archive path */}
      <div>
        <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-[#00d4ff]/35 block mb-1.5">
          ∷ Archive Path
        </span>
        <p className="font-mono text-[10px] text-[#00d4ff]/65 break-all leading-relaxed">
          {path}
        </p>
      </div>

      <div className="h-px bg-white/5 flex-shrink-0" />

      {/* Name + meta badges */}
      <div>
        <h3 className="text-base font-bold text-[#f0f0f0] leading-tight mb-3">
          {project.name}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          <span className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border rounded-sm border-[#00d4ff]/20 text-[#00d4ff]/60`}>
            {project.category}
          </span>
          <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border border-white/8 text-[#5a6070] rounded-sm">
            {project.year}
          </span>
          <span className={`flex items-center gap-1 font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border rounded-sm ${s.border} ${s.text}`}>
            <span className={`w-1 h-1 rounded-full inline-block ${s.dot}`} aria-hidden="true" />
            {project.status}
          </span>
        </div>
      </div>

      {/* Short description */}
      <p className="text-sm text-[#8892a4] leading-relaxed">{project.shortDescription}</p>

      {/* Problem + Solution (compressed) */}
      <div className="space-y-2">
        <div className="flex gap-3">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#5a6070]/60 flex-shrink-0 mt-0.5 w-10">
            prob.
          </span>
          <p className="text-xs text-[#5a6070] leading-relaxed line-clamp-2">
            {project.problem}
          </p>
        </div>
        <div className="flex gap-3">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#00d4ff]/40 flex-shrink-0 mt-0.5 w-10">
            solv.
          </span>
          <p className="text-xs text-[#8892a4] leading-relaxed line-clamp-2">
            {project.solution}
          </p>
        </div>
      </div>

      {/* whatItProves chips */}
      <div>
        <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#5a6070]/50 block mb-2">
          Proves
        </span>
        <div className="flex flex-wrap gap-1.5">
          {project.whatItProves.map((proof) => (
            <span
              key={proof}
              className="font-mono text-[8px] tracking-wide px-2 py-0.5 rounded-sm border"
              style={{
                color:        project.accentColor + "bb",
                borderColor:  project.accentColor + "30",
                background:   project.accentColor + "08",
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
          <span key={t} className="tag" style={{ fontSize: "0.6rem" }}>{t}</span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-auto pt-2 flex-shrink-0">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-[#00d4ff]/25 text-[#00d4ff] hover:bg-[#00d4ff]/8 transition-colors duration-200 rounded-sm"
          >
            View Project ↗
          </a>
        ) : (
          <span className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-white/5 text-[#5a6070]/40 rounded-sm select-none">
            Demo Soon
          </span>
        )}
        {project.caseStudyUrl && (
          <a
            href={project.caseStudyUrl}
            className="flex-1 text-center font-mono text-[10px] tracking-widest uppercase py-2.5 border border-white/8 text-[#8892a4] hover:border-white/20 hover:text-[#f0f0f0] transition-all duration-200 rounded-sm"
          >
            Case Study
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BuildArchive() {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? "");
  const sectionRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef, ".reveal");

  // Group projects into folders — derived from projects array, no hardcoding
  const groups = useMemo(
    () => [
      {
        root:  "/vibecoding/projects",
        label: "projects",
        items: projects.filter((p) => p.category !== "Experiments"),
      },
      {
        root:  "/vibecoding/experiments",
        label: "experiments",
        items: projects.filter((p) => p.category === "Experiments"),
      },
    ],
    []
  );

  // Stats — all computed from the projects array
  const stats = useMemo(
    () => ({
      indexed:      projects.length,
      categories:   new Set(projects.map((p) => p.category)).size,
      technologies: new Set(projects.flatMap((p) => p.tech)).size,
    }),
    []
  );

  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <section id="archive" className="relative py-28 md:py-36 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>

        {/* Section header */}
        <div className="mb-12 reveal">
          <SectionLabel index="06" label="Build Archive" className="mb-5" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f0] tracking-tight mb-4">
            Project Index
          </h2>
          <p className="text-[#5a6070] max-w-xl leading-relaxed">
            Every build, indexed. Browse the archive to explore structure, decisions, and outcomes.
          </p>
        </div>

        {/* ── OS Archive Window ────────────────────────────────────── */}
        <div className="reveal panel rounded-sm overflow-hidden">

          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/[0.015] flex-shrink-0">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/8" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/8" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00d4ff]/30" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#8892a4] ml-2 hidden sm:block">
              VIBECODING ARCHIVE
            </span>
            <div className="flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-sm bg-white/[0.02] border border-white/5">
              <span className="font-mono text-[8px] text-[#00d4ff]/50">/vibecoding/projects</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-glow-pulse"
                aria-hidden="true"
              />
              <span className="font-mono text-[8px] tracking-widest uppercase text-[#00d4ff]/60">
                SYNCED
              </span>
            </div>
          </div>

          {/* Body: tree (left) + preview (right) */}
          <div className="grid md:grid-cols-[1fr_1.4fr] divide-y md:divide-y-0 md:divide-x divide-white/5">

            {/* ── Left: file tree ──────────────────────────────────── */}
            <div className="overflow-y-auto" style={{ maxHeight: "460px" }}>
              {/* Root label */}
              <div className="px-4 py-2 bg-white/[0.008] border-b border-white/4">
                <span className="font-mono text-[8px] text-[#5a6070] tracking-wider">~/</span>
              </div>

              {groups.map((group) => (
                <div key={group.root}>
                  {/* Group directory */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/4 bg-white/[0.006]">
                    <span className="font-mono text-[9px] text-[#5a6070] select-none w-3" aria-hidden="true">▾</span>
                    <span className="font-mono text-[11px] text-[#00d4ff]/55">
                      {group.label}/
                    </span>
                    <span className="ml-auto font-mono text-[8px] text-[#5a6070]/40">
                      {group.items.length}
                    </span>
                  </div>

                  {/* Project rows */}
                  {group.items.map((project) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      isActive={activeId === project.id}
                      onActivate={() => setActiveId(project.id)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* ── Right: preview ────────────────────────────────────── */}
            <div className="min-h-[360px] md:min-h-0">
              {activeProject && (
                <ProjectPreview key={activeProject.id} project={activeProject} />
              )}
            </div>
          </div>

          {/* ── Stats strip ──────────────────────────────────────────── */}
          <div className="border-t border-white/5 px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 bg-white/[0.008]">
            {[
              { label: "Indexed",      value: stats.indexed      },
              { label: "Categories",   value: stats.categories   },
              { label: "Technologies", value: stats.technologies },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="font-mono text-[8px] uppercase tracking-wider text-[#5a6070]">
                  {label}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[#f0f0f0]">
                  {value}
                </span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[#00d4ff]/40" />
              <span className="font-mono text-[8px] tracking-widest uppercase text-[#5a6070]">
                Archive: Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
