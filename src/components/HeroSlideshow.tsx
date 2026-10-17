"use client";

import Image, { getImageProps } from "next/image";
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
  mobileFirstPhoto: Photo;
};

export function HeroSlideshow({ photos, mobileFirstPhoto }: Props) {
  // Index and high-water mark share one state so advancing stays a single
  // pure update.
  const [frame, setFrame] = useState({ index: 0, furthest: 0 });
  // Nothing beyond the first photograph is mounted until its bytes arrive,
  // so later photography cannot compete with LCP on a slow connection.
  const [warm, setWarm] = useState(false);
  const reduced = usePrefersReducedMotion();

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

  const {
    props: { srcSet: desktopFirstSrcSet },
  } = getImageProps({
    src: photos[0].src,
    alt: "",
    width: photos[0].width,
    height: photos[0].height,
    sizes: "(max-aspect-ratio: 16/9) 178vh, 100vw",
    quality: 70,
  });

  const markHeroReady = () => {
    setWarm(true);
    document.documentElement.dataset.heroReady = "true";
    window.dispatchEvent(new Event("hampi:hero-ready"));
  };

  return (
    <div className="hero-image absolute inset-0" aria-hidden="true">
      <picture className="absolute inset-0">
        <source
          media="(min-width: 768px)"
          srcSet={desktopFirstSrcSet}
          sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
        />
        <Image
          src={mobileFirstPhoto.src}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          quality={70}
          className="hero-frame object-cover"
          data-active={frame.index === 0}
          onLoad={markHeroReady}
          style={{
            objectPosition: photos[0].position,
            opacity: frame.index === 0 ? 1 : 0,
          }}
        />
      </picture>
      {photos.slice(1, mounted).map((photo, index) => {
        const i = index + 1;
        return (
          <Image
            key={photo.src}
            src={photo.src}
            alt=""
            fill
            // object-cover on a viewport narrower than 16:9 draws the photo
            // wider than the screen; 100vw alone made phones fetch a third
            // of the pixels they paint.
            sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
            quality={70}
            className="hero-frame object-cover"
            data-active={i === frame.index}
            style={{
              objectPosition: photo.position,
              opacity: i === frame.index ? 1 : 0,
            }}
          />
        );
      })}
    </div>
  );
}
