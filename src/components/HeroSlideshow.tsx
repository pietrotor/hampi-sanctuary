"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/lib/media";

const INTERVAL_MS = 6500;

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

  useEffect(() => {
    const timer = setTimeout(() => setWarm(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setFrame((previous) => {
        const index = (previous.index + 1) % photos.length;
        return { index, furthest: Math.max(previous.furthest, index) };
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [photos.length]);

  // One frame ahead of the visible one, so the next photograph is decoded
  // before it starts fading in.
  const mounted = warm ? Math.min(photos.length, frame.furthest + 2) : 1;

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
          className="object-cover transition-opacity duration-[1600ms] ease-in-out"
          style={{
            objectPosition: photo.position,
            opacity: i === frame.index ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
