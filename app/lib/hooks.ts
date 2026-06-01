"use client";

import { RefObject, useEffect } from "react";

/**
 * Adds "in-view" class to matched elements when they enter the viewport.
 * Elements should start with class="reveal" (defined in globals.css).
 * Pass a CSS selector to reveal children; omit to reveal the root element.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  childSelector?: string
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets: Element[] = childSelector
      ? Array.from(root.querySelectorAll(childSelector))
      : [root];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref, childSelector]);
}

/**
 * Tracks pointer position over an element and sets --glow-x / --glow-y /
 * --glow-opacity CSS custom properties directly on the DOM node.
 * Pair with a .card-glow-layer child element (defined in globals.css).
 * No RAF, no React state, no re-renders.
 */
/**
 * Magnetic hover, cursor-follow inner light, press depth, and click ripple
 * for premium CTA buttons. Owns the element's transform — remove btn-press
 * from any element using this hook. No React state on mousemove.
 *
 * @param maxMagnet  Max pixel displacement for magnetic effect (0 = disabled).
 */
export function usePremiumButton<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { maxMagnet = 6 }: { maxMagnet?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse   = window.matchMedia("(pointer: coarse)").matches;
    const magnetic = !reduced && !coarse && maxMagnet > 0;

    // Mutable motion state — never React state
    let tX = 0, tY = 0;   // magnetic target
    let cX = 0, cY = 0;   // current lerped position
    let pressed = false;
    let hovered = false;
    let rafId   = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const write = () => {
      el.style.transform = `translate(${cX}px, ${cY}px) scale(${pressed ? 0.96 : 1})`;
    };

    const frame = () => {
      cX = lerp(cX, tX, 0.12);
      cY = lerp(cY, tY, 0.12);
      write();
      const settled = Math.abs(cX - tX) < 0.02 && Math.abs(cY - tY) < 0.02;
      rafId = (!settled || hovered) ? requestAnimationFrame(frame) : 0;
    };

    const kick = () => { if (!rafId) rafId = requestAnimationFrame(frame); };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--btn-lx", `${((e.clientX - rect.left) / rect.width)  * 100}%`);
      el.style.setProperty("--btn-ly", `${((e.clientY - rect.top)  / rect.height) * 100}%`);
      el.style.setProperty("--btn-light", "1");
      if (magnetic) {
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        tX = Math.max(-maxMagnet, Math.min(maxMagnet, (e.clientX - cx) * 0.18));
        tY = Math.max(-maxMagnet, Math.min(maxMagnet, (e.clientY - cy) * 0.18));
        kick();
      }
    };

    const onEnter = () => { hovered = true;  if (magnetic) kick(); };

    const onLeave = () => {
      hovered = false;
      tX = 0; tY = 0;
      el.style.setProperty("--btn-light", "0");
      if (magnetic) kick(); else write();
    };

    const onDown = () => { pressed = true;  if (magnetic) kick(); else write(); };
    const onUp   = () => { pressed = false; if (magnetic) kick(); else write(); };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") { pressed = true;  write(); }
    };
    const onKeyUp = () => { pressed = false; write(); };

    const onClick = (e: MouseEvent) => {
      if (reduced) return;
      const rect = el.getBoundingClientRect();
      const span = document.createElement("span");
      span.className = "btn-ripple";
      span.style.left = `${e.clientX - rect.left}px`;
      span.style.top  = `${e.clientY - rect.top}px`;
      el.appendChild(span);
      span.addEventListener("animationend", () => span.remove(), { once: true });
    };

    el.addEventListener("mousemove",  onMouseMove, { passive: true });
    el.addEventListener("mouseenter", onEnter,     { passive: true });
    el.addEventListener("mouseleave", onLeave,     { passive: true });
    el.addEventListener("mousedown",  onDown,      { passive: true });
    el.addEventListener("mouseup",    onUp,        { passive: true });
    el.addEventListener("keydown",    onKeyDown);
    el.addEventListener("keyup",      onKeyUp,     { passive: true });
    el.addEventListener("click",      onClick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove",  onMouseMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown",  onDown);
      el.removeEventListener("mouseup",    onUp);
      el.removeEventListener("keydown",    onKeyDown);
      el.removeEventListener("keyup",      onKeyUp);
      el.removeEventListener("click",      onClick);
    };
  }, [ref, maxMagnet]);
}

export function usePointerGlow<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      el.style.setProperty("--glow-opacity", "1");
    };
    const onLeave = () => el.style.setProperty("--glow-opacity", "0");

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
}

/**
 * Premium 3D tilt interaction for project cards.
 * Desktop + fine-pointer only. Respects prefers-reduced-motion.
 *
 * Smoothing design:
 *   - Tilt (rotateX/Y) lerps at 0.065  → ~550ms ramp to 90% — heavy, premium feel
 *   - Lift + scale lerps at 0.055       → softer separate ramp, no instant snap
 *   - Spotlight position lerps at 0.10  → smooth follow, not a flashlight
 *   - Exit uses the same lerps — equally smooth return to rest
 */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse  = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    // ── Constants ──────────────────────────────────────────────────────────
    const MAX_RX    = 5;     // rotateX max degrees   (was 7)
    const MAX_RY    = 5;     // rotateY max degrees   (was 10)
    const LIFT      = -7;    // translateY px upward  (was -8)
    const SCALE     = 1.018; // scale on hover        (was 1.028)
    const LERP_TILT = 0.065; // rotation lerp rate    (was 0.095)
    const LERP_LIFT = 0.055; // lift + scale lerp rate — softer separate ramp
    const LERP_GLOW = 0.10;  // spotlight position lerp — smooth, not instant

    // ── Mutable state ──────────────────────────────────────────────────────
    let raf     = 0;
    let hovered = false;

    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;           // tilt
    let cLift = 0, cScale = 1;                          // lift + scale
    let tGX = 50, tGY = 50, cGX = 50, cGY = 50;        // spotlight (%)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const write = () => {
      el.style.transform =
        `perspective(900px) rotateX(${cRX}deg) rotateY(${cRY}deg) translateY(${cLift}px) scale(${cScale})`;
      el.style.setProperty("--tilt-sx", `${(-cRY * 0.34).toFixed(2)}px`);
      el.style.setProperty("--tilt-sy", `${( cRX * 0.28).toFixed(2)}px`);
      el.style.setProperty("--glow-x",  `${cGX.toFixed(1)}%`);
      el.style.setProperty("--glow-y",  `${cGY.toFixed(1)}%`);
    };

    const frame = () => {
      const tLift  = hovered ? LIFT  : 0;
      const tScale = hovered ? SCALE : 1;

      cRX    = lerp(cRX,    tRX,    LERP_TILT);
      cRY    = lerp(cRY,    tRY,    LERP_TILT);
      cLift  = lerp(cLift,  tLift,  LERP_LIFT);
      cScale = lerp(cScale, tScale, LERP_LIFT);
      cGX    = lerp(cGX,    tGX,    LERP_GLOW);
      cGY    = lerp(cGY,    tGY,    LERP_GLOW);

      write();

      // Settle: all channels near rest after exit
      const tiltDone = !hovered && Math.abs(cRX) < 0.04 && Math.abs(cRY) < 0.04;
      const liftDone = Math.abs(cLift) < 0.04 && Math.abs(cScale - 1) < 0.0004;

      if (tiltDone && liftDone) {
        raf = 0;
        cRX = 0; cRY = 0; cLift = 0; cScale = 1; cGX = 50; cGY = 50;
        el.style.transform = "";
        el.style.removeProperty("--tilt-sx");
        el.style.removeProperty("--tilt-sy");
      } else {
        raf = requestAnimationFrame(frame);
      }
    };

    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const rX   = (e.clientY - rect.top)  / rect.height; // 0–1 top→bottom
      const rY   = (e.clientX - rect.left) / rect.width;  // 0–1 left→right

      tRX = -(rX - 0.5) * MAX_RX * 2;
      tRY =  (rY - 0.5) * MAX_RY * 2;
      tGX = rY * 100;
      tGY = rX * 100;
      // Opacity: instant on (smooth off handled by card-glow-layer CSS transition)
      el.style.setProperty("--glow-opacity", "1");
      kick();
    };

    const onEnter = () => {
      hovered = true;
      el.style.willChange = "transform";
      kick();
    };

    const onLeave = () => {
      hovered = false;
      tRX = 0; tRY = 0;
      tGX = 50; tGY = 50;
      el.style.setProperty("--glow-opacity", "0");
      kick();
    };

    el.addEventListener("mousemove",  onMove,  { passive: true });
    el.addEventListener("mouseenter", onEnter, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.style.transform  = "";
      el.style.willChange = "";
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
}
