"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Photo } from "@/lib/media";

const REDUCED = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/** How long each photograph holds. The crossfade below runs inside it. */
const INTERVAL_MS = 4000;

type Props = {
  photos: Photo[];
};

export function HeroSlideshow({ photos }: Props) {
  // Index and high-water mark share one state so advancing stays a single
  // pure update.
  const [frame, setFrame] = useState({ index: 0, furthest: 0 });
  // Nothing beyond the first photograph is mounted until the hero has had
  // time to paint, so the rotation never competes with LCP.
  const [warm, setWarm] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Early enough that the next photograph is decoded before the first
    // switch at INTERVAL_MS, late enough to stay out of the LCP window.
    const timer = setTimeout(() => setWarm(true), 1600);
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (photos.length < 2 || reduced) return;

    const timer = setInterval(() => {
      setFrame((previous) => {
        const index = (previous.index + 1) % photos.length;
        return { index, furthest: Math.max(previous.furthest, index) };
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [photos.length, reduced]);

  // One frame ahead of the visible one, so the next photograph is decoded
  // before it starts fading in. Nothing rotates under reduced motion, so
  // the extra frames would be a full-screen download for no reason.
  const mounted =
    warm && !reduced ? Math.min(photos.length, frame.furthest + 2) : 1;

  return (
    <div className="hero-image absolute inset-0" aria-hidden="true">
      {photos.slice(0, mounted).map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
          quality={84}
          className="hero-frame object-cover"
          data-active={i === frame.index}
          style={{
            objectPosition: photo.position,
            opacity: i === frame.index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
