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
