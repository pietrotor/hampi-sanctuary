"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { BrandLockup } from "@/components/BrandLogo";
import type { Photo } from "@/lib/media";

const REDUCED = "(prefers-reduced-motion: reduce)";
const HERO_QUALITY = 90;
const FRAME_SIZES = "(max-aspect-ratio: 16/9) 178vh, 100vw";

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

/** How long each photograph holds. The settle below runs for the same time. */
const INTERVAL_MS = 8000;
/** Matches the opacity transition on `.hero-frame`. */
const FADE_MS = 2000;

type Props = {
  photos: Photo[];
  copyOptions: readonly [{
    id: string;
    label: string;
    headline: string;
    body: string;
  }, ...{
    id: string;
    label: string;
    headline: string;
    body: string;
  }[]];
  /** Tall crop used when the visit opens on the running-with-dogs frame. */
  mobileFirstPhoto?: Photo;
};

export function HeroSlideshow({
  photos,
  copyOptions,
  mobileFirstPhoto,
}: Props) {
  const [frame, setFrame] = useState({
    index: 0,
    furthest: 0,
    releasing: null as number | null,
  });
  const [copySelection, setCopySelection] = useState<string>("auto");
  // Nothing beyond the first photograph is mounted until its bytes arrive,
  // so later photography cannot compete with LCP on a slow connection.
  const [warm, setWarm] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (photos.length < 2 || reduced) return;

    const timer = setInterval(() => {
      setFrame((previous) => {
        const index = (previous.index + 1) % photos.length;
        return {
          index,
          furthest: Math.max(previous.furthest, index),
          // Keep the settle running through the fade. Cutting the animation
          // the instant the next photograph appears snaps the frame.
          releasing: previous.index,
        };
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [photos.length, reduced]);

  useEffect(() => {
    if (frame.releasing === null) return;
    const timer = setTimeout(() => {
      setFrame((previous) => ({ ...previous, releasing: null }));
    }, FADE_MS);
    return () => clearTimeout(timer);
  }, [frame.releasing]);

  // One frame ahead of the visible one, so the next photograph is decoded
  // before it starts fading in. Nothing rotates under reduced motion, so
  // the extra frames would be a full-screen download for no reason.
  const mounted =
    warm && !reduced ? Math.min(photos.length, frame.furthest + 2) : 1;

  const markHeroReady = () => {
    setWarm(true);
    document.documentElement.dataset.heroReady = "true";
    window.dispatchEvent(new Event("hampi:hero-ready"));
  };

  const opener = photos[0];
  const keepsZoom = (index: number) =>
    index === frame.index || index === frame.releasing;
  const activeCopy =
    copySelection === "auto"
      ? copyOptions[frame.index % copyOptions.length]
      : copyOptions.find((option) => option.id === copySelection) ??
        copyOptions[0];

  return (
    <>
      <div className="hero-image absolute inset-0" aria-hidden="true">
        {mobileFirstPhoto ? (
          <PhoneOpener
            desktop={opener}
            mobile={mobileFirstPhoto}
            active={frame.index === 0}
            settling={keepsZoom(0)}
            onLoad={markHeroReady}
          />
        ) : (
          <HeroFrame
            photo={opener}
            active={frame.index === 0}
            settling={keepsZoom(0)}
            eager
            onLoad={markHeroReady}
          />
        )}
        {photos.slice(1, mounted).map((photo, index) => {
          const i = index + 1;
          return (
            <HeroFrame
              key={photo.src}
              photo={photo}
              active={i === frame.index}
              settling={keepsZoom(i)}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-ink/35" />
      <div className="relative z-10 flex min-h-dvh flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 sm:pb-8 md:px-12 md:py-10">
        <div className="hero-brand">
          <BrandLockup
            variant="bone"
            priority
            className="h-auto w-20 sm:w-24 md:w-28"
          />
        </div>

        <div className="mt-auto max-w-3xl">
          <div
            key={activeCopy.id}
            className="hero-copy hero-copy-swap flex min-h-68 flex-col justify-end sm:min-h-72 md:min-h-80"
            aria-live={copySelection === "auto" ? "off" : "polite"}
          >
            <h1 className="font-display text-[clamp(2.55rem,10vw,4.5rem)] leading-[1.02] text-balance md:text-7xl">
              {activeCopy.headline}
            </h1>
            <p className="mt-5 max-w-160 font-body text-base leading-7 text-paper/95 sm:mt-6 sm:leading-8 md:text-lg">
              {activeCopy.body}
            </p>
          </div>

          <div
            className="hero-copy-review mt-5 flex flex-wrap items-center gap-2 sm:mt-6"
            role="group"
            aria-label="Hero copy preview"
          >
            {copyOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="hero-copy-control"
                aria-pressed={copySelection === option.id}
                onClick={() => setCopySelection(option.id)}
              >
                {option.label}
              </button>
            ))}
            <button
              type="button"
              className="hero-copy-control"
              aria-pressed={copySelection === "auto"}
              onClick={() => setCopySelection("auto")}
            >
              Auto
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function PhoneOpener({
  desktop,
  mobile,
  active,
  settling,
  onLoad,
}: {
  desktop: Photo;
  mobile: Photo;
  active: boolean;
  settling: boolean;
  onLoad: () => void;
}) {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: desktop.src,
    alt: "",
    width: desktop.width,
    height: desktop.height,
    sizes: FRAME_SIZES,
    quality: HERO_QUALITY,
  });

  return (
    <picture className="absolute inset-0">
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes={FRAME_SIZES} />
      <Image
        src={mobile.src}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        quality={HERO_QUALITY}
        className="hero-frame object-cover"
        data-active={settling}
        onLoad={onLoad}
        style={
          {
            objectPosition: mobile.position,
            opacity: active ? 1 : 0,
            "--hero-x": mobile.drift?.x ?? "0%",
            "--hero-y": mobile.drift?.y ?? "0%",
          } as CSSProperties
        }
      />
    </picture>
  );
}

function HeroFrame({
  photo,
  active,
  settling,
  eager = false,
  onLoad,
}: {
  photo: Photo;
  active: boolean;
  settling: boolean;
  eager?: boolean;
  onLoad?: () => void;
}) {
  return (
    <Image
      src={photo.src}
      alt=""
      fill
      // object-cover on a viewport narrower than 16/9 draws the photo wider
      // than the screen; 100vw alone made phones fetch a third of the pixels
      // they paint.
      sizes={FRAME_SIZES}
      quality={HERO_QUALITY}
      {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      className="hero-frame object-cover"
      data-active={settling}
      onLoad={onLoad}
      style={
        {
          objectPosition: photo.position,
          opacity: active ? 1 : 0,
          "--hero-x": photo.drift?.x ?? "0%",
          "--hero-y": photo.drift?.y ?? "0%",
        } as CSSProperties
      }
    />
  );
}
