"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects"   },
  { label: "Work",     href: "#case-study" },
  { label: "Skills",   href: "#skills"     },
  { label: "Archive",  href: "#archive"    },
  { label: "Process",  href: "#process"    },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Site navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080a0f]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" aria-label="VibeCoding OS — back to top" className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-glow-pulse" aria-hidden="true" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#00d4ff] uppercase">
            VibeCoding OS
          </span>
        </a>

        {/* Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-xs tracking-widest uppercase text-[#5a6070] hover:text-[#f0f0f0] transition-colors duration-200 focus-visible:outline-none focus-visible:text-[#00d4ff]"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="text-xs tracking-widest uppercase px-4 py-2 border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40"
        >
          Start a Build
        </a>
      </div>
    </nav>
  );
}
