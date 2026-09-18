"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-rule, .image-reveal, .reveal-sequence";

/**
 * Reveals only off-screen content. The server-rendered default stays visible,
 * so a failed or delayed script can never make the page unreadable.
 */
export function RevealMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    );

    // Whatever is already on screen stays visible so nothing flashes out.
    const fold = window.innerHeight * 0.92;
    const pending = targets.filter((element) => {
      if (element.getBoundingClientRect().top >= fold) return true;
      element.classList.add("is-revealed");
      return false;
    });

    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    for (const element of pending) observer.observe(element);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
