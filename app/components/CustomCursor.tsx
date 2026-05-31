"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const [reduced, setReduced]   = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    // Hide on touch-primary devices
    const touch = window.matchMedia("(pointer: coarse)");
    if (touch.matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let dx = rx, dy = ry;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      dot.style.transform = `translate(${dx}px, ${dy}px)`;
      if (!visible) setVisible(true);
    };

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      if (!reduced) {
        rx = lerp(rx, dx, 0.12);
        ry = lerp(ry, dy, 0.12);
      } else {
        rx = dx; ry = dy;
      }
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], input, textarea, select, label, [tabindex]")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor-active");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [reduced, visible]);

  // Touch device — render nothing
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Core dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:  "fixed",
          top:       0,
          left:      0,
          width:     6,
          height:    6,
          marginTop: -3,
          marginLeft:-3,
          borderRadius: "50%",
          backgroundColor: "#00d4ff",
          pointerEvents: "none",
          zIndex:    9999,
          opacity:   visible ? 1 : 0,
          transition:"opacity 0.2s",
          willChange:"transform",
        }}
      />

      {/* Soft ring — lags slightly */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:  "fixed",
          top:       0,
          left:      0,
          width:     hovered ? 40 : 28,
          height:    hovered ? 40 : 28,
          marginTop: hovered ? -20 : -14,
          marginLeft:hovered ? -20 : -14,
          borderRadius: "50%",
          border:    `1px solid rgba(0,212,255,${hovered ? 0.55 : 0.35})`,
          backgroundColor: hovered ? "rgba(0,212,255,0.06)" : "transparent",
          pointerEvents: "none",
          zIndex:    9998,
          opacity:   visible ? 1 : 0,
          transition:"width 0.18s ease, height 0.18s ease, margin 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, opacity 0.2s",
          willChange:"transform",
        }}
      />
    </>
  );
}
