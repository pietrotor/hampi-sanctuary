"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-rule, .image-reveal > img";

/**
 * Drives the scroll reveals on browsers without scroll-driven animations.
 * Where `animation-timeline: view()` exists, the CSS handles everything and
 * this runs no work at all.
 */
export function RevealMotion() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    );

    document.documentElement.classList.add("js-reveal");

    // Whatever is already on screen stays visible so nothing flashes out.
    const fold = window.innerHeight * 0.9;
    const pending = targets.filter((element) => {
      if (element.getBoundingClientRect().top >= fold) return true;
      element.classList.add("is-revealed");
      return false;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const element of pending) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return null;
}
