"use client";

import { useEffect } from "react";

/**
 * Native lazy-loading chooses its own distance from the viewport. Once the
 * LCP hero is safely loaded, this gives section photography a predictable
 * two-screen head start without downloading the whole page at startup.
 */
export function ProgressiveImageWarmup() {
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observeSections = () => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            entry.target
              .querySelectorAll<HTMLImageElement>('img[loading="lazy"]')
              .forEach((image) => {
                image.fetchPriority = "low";
                image.loading = "eager";
              });
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: "200% 0px" },
      );

      document
        .querySelectorAll("main > section:not(#top)")
        .forEach((section) => observer?.observe(section));
    };

    const begin = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(observeSections, { timeout: 800 });
      } else {
        timeoutId = setTimeout(observeSections, 0);
      }
    };

    if (document.documentElement.dataset.heroReady === "true") {
      begin();
    } else {
      window.addEventListener("hampi:hero-ready", begin, { once: true });
    }

    return () => {
      window.removeEventListener("hampi:hero-ready", begin);
      observer?.disconnect();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
