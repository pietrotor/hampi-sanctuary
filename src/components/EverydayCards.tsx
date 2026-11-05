"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EverydayMobileCarousel } from "@/components/EverydayMobileCarousel";
import { SitePhoto } from "@/components/SitePhoto";
import type { Photo } from "@/lib/media";

type Category = {
  title: string;
  body: string;
};

type Props = {
  categories: readonly Category[];
  photos: Photo[];
};

export function EverydayCards({ categories, photos }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const slide = useRef<HTMLDivElement>(null);
  const previousActiveIndex = useRef<number | null>(null);
  const navigationDirection = useRef(1);
  const closeTimer = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [compact, setCompact] = useState(false);
  const activeCategory =
    activeIndex === null ? null : categories[activeIndex];
  const activePhoto = activeIndex === null ? null : photos[activeIndex];
  const previousIndex =
    activeIndex === null
      ? 0
      : (activeIndex - 1 + categories.length) % categories.length;
  const nextIndex =
    activeIndex === null ? 0 : (activeIndex + 1) % categories.length;
  const isPortrait =
    activePhoto !== null && activePhoto.height > activePhoto.width;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (activeIndex === null || dialog.current?.open) return;
    delete dialog.current?.dataset.closing;
    dialog.current?.showModal();
  }, [activeIndex]);

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (activeIndex === null) {
      previousActiveIndex.current = null;
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 639px)").matches;

    if (
      previousActiveIndex.current === null ||
      previousActiveIndex.current === activeIndex ||
      reduced ||
      mobile
    ) {
      previousActiveIndex.current = activeIndex;
      return;
    }

    const node = slide.current;
    node?.getAnimations().forEach((animation) => animation.cancel());
    if (node) node.style.transform = "";
    node?.animate(
      [
        {
          opacity: 0.72,
          transform: `translateX(${navigationDirection.current * 18}px)`,
        },
        { opacity: 1, transform: "translateX(0)" },
      ],
      {
        duration: 280,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "both",
      },
    );

    previousActiveIndex.current = activeIndex;
  }, [activeIndex]);

  const close = () => {
    const node = dialog.current;
    if (!node || node.dataset.closing === "true") return;

    node.dataset.closing = "true";
    closeTimer.current = window.setTimeout(() => node.close(), 320);
  };
  const selectCategory = (index: number, direction?: number) => {
    if (activeIndex !== null) {
      navigationDirection.current =
        direction ?? (index > activeIndex ? 1 : -1);
    }
    setActiveIndex(index);
  };

  return (
    <>
      <ul className="reveal-sequence mt-10 grid gap-2 md:mt-14 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-3 xl:gap-x-16">
        {categories.map((category, index) => (
          <li key={category.title}>
            <button
              type="button"
              className="everyday-card group flex min-h-30 w-full cursor-pointer items-center gap-5 rounded-xl px-4 py-5 text-left text-ink transition-[background-color,color,transform] duration-300 hover:bg-mist/60 hover:text-accent active:scale-[0.99] sm:min-h-34 sm:gap-7 sm:px-5"
              onClick={() => selectCategory(index)}
              aria-haspopup="dialog"
            >
              <EverydayIcon index={index} />
              <span className="max-w-64 flex-1 font-display text-3xl leading-[1.05] transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-[2rem]">
                {category.title}
              </span>
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-accent transition-[background-color,border-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-paper"
              >
                <svg viewBox="0 0 24 24" className="size-5">
                  <path
                    d="M5 12h13m-5-5 5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="everyday-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          if (closeTimer.current !== null) {
            window.clearTimeout(closeTimer.current);
            closeTimer.current = null;
          }
          if (dialog.current) delete dialog.current.dataset.closing;
          setActiveIndex(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            selectCategory(previousIndex, -1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            selectCategory(nextIndex, 1);
          }
        }}
        className="everyday-dialog m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-ink"
      >
        {activeCategory && activePhoto ? (
          <>
            <div className="everyday-dialog-scroll pointer-events-none absolute inset-0 flex flex-col overflow-y-auto px-4 py-4 sm:items-center sm:justify-center sm:px-8 sm:pt-4 sm:pb-30">
              <div
                className={`everyday-dialog-panel pointer-events-auto relative w-full overflow-visible bg-transparent sm:my-auto sm:max-h-full sm:min-h-0 sm:overflow-x-hidden sm:overflow-y-auto sm:rounded-2xl sm:bg-paper ${
                  isPortrait ? "max-w-4xl" : "max-w-6xl"
                }`}
              >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-20 hidden size-12 cursor-pointer place-items-center rounded-lg border border-paper/70 bg-ink text-paper shadow-[0_0.5rem_1.5rem_rgb(34_48_38/0.2)] transition-colors hover:bg-accent focus-visible:outline-paper sm:grid"
            >
              <span className="sr-only">Close {activeCategory.title}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
                <path
                  d="M5 5l14 14M19 5 5 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            {activeIndex !== null ? (
              <EverydayMobileCarousel
                categories={categories}
                photos={photos}
                index={activeIndex}
                labelled={compact}
                onIndex={setActiveIndex}
                onClose={close}
              />
            ) : null}

            <div
              ref={slide}
              className={`hidden sm:grid ${
                isPortrait
                  ? "items-center md:grid-cols-[auto_minmax(22rem,1fr)]"
                  : "items-stretch md:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)]"
              }`}
            >
              <div
                className={`relative grid place-items-center overflow-hidden md:h-full ${
                  isPortrait ? "bg-deep md:bg-transparent" : ""
                }`}
              >
                {isPortrait ? (
                  <SitePhoto
                    photo={activePhoto}
                    alt=""
                    sizes="100vw"
                    quality={45}
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl md:hidden"
                  />
                ) : null}
                <SitePhoto
                  photo={activePhoto}
                  sizes={
                    isPortrait
                      ? "(min-width: 768px) 44vw, calc(100vw - 2rem)"
                      : "(min-width: 768px) 58vw, calc(100vw - 2rem)"
                  }
                  className={
                    isPortrait
                      ? "relative h-auto w-full object-contain md:h-[min(34rem,calc(100dvh-10rem))] md:w-auto md:max-w-full"
                      : "h-auto w-full object-cover md:h-full"
                  }
                />
              </div>
              <div className="min-h-0 overflow-y-auto px-6 py-8 sm:px-9 sm:py-10 md:px-10 lg:px-12">
                <h3
                  id={compact ? undefined : "everyday-dialog-title"}
                  className="max-w-sm font-display text-4xl leading-[1.05] text-ink md:text-5xl"
                >
                  {activeCategory.title}
                </h3>
                <p className="mt-5 max-w-lg text-pretty font-body text-lg leading-8 text-ink-soft md:text-xl md:leading-9">
                  {activeCategory.body}
                </p>
              </div>
            </div>
              </div>
            </div>

            <div
              className="everyday-dialog-rail absolute bottom-4 left-1/2 hidden w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 gap-2 overflow-x-auto rounded-xl bg-mist p-3 shadow-[0_0.75rem_2rem_rgb(34_48_38/0.18)] sm:flex"
              aria-label="Explore everyday life"
            >
              {categories.map((category, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => selectCategory(index)}
                    aria-pressed={selected}
                    className={`group flex min-h-16 min-w-36 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-[background-color,color,transform] duration-200 active:scale-[0.98] ${
                      selected
                        ? "bg-accent text-paper"
                        : "bg-paper/60 text-ink hover:bg-paper"
                    }`}
                  >
                    <EverydayIcon index={index} compact inverse={selected} />
                    <span className="font-ui text-sm leading-5">
                      {category.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}
      </dialog>
    </>
  );
}

function EverydayIcon({
  index,
  compact = false,
  inverse = false,
}: {
  index: number;
  compact?: boolean;
  inverse?: boolean;
}) {
  const common = `${compact ? "size-9" : "size-13 sm:size-14"} ${
    inverse ? "text-paper" : "text-accent"
  } transition-transform duration-500 ease-out group-hover:-translate-y-1`;

  if (index === 0) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={common}>
        <path
          d="M9 22h30c-1.2 9.5-6.2 14.3-15 14.3S10.2 31.5 9 22ZM14 39h20M24 21c-1.2-5.5 1.4-9.8 7.5-12.5.7 5.9-1.8 10.1-7.5 12.5Zm0 0c-.8-4.4-3.3-7.5-7.5-9.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={common}>
        <path
          d="M24 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 3v11m0-7-8-4m8 4 8-4m-8 11-7 10m7-10 7 10M10 41h28"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={common}>
        <path
          d="M24 40V22m0 8c-7 0-11.5-4.3-12-12 7.4-.3 11.7 3.7 12 12Zm0-7c.5-8.3 5.3-12.7 14.5-13-.5 8.4-5.3 12.7-14.5 13ZM11 41h26"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={common}>
        <path
          d="M9 32c4-3 8-3 12 0s8 3 12 0 7-3 9-1M12 38c4-3 8-3 12 0s8 3 12 0M17 24c-3-3-3-6 0-9s3-6 0-9m10 18c-3-3-3-6 0-9s3-6 0-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={common}>
        <path
          d="M17 21a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm14 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM7 38c.7-8.2 4-12.3 10-12.3S26.3 29.8 27 38M21 38c.7-8.2 4-12.3 10-12.3S40.3 29.8 41 38"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={common}>
      <path
        d="M24 42c9.9 0 18-8.1 18-18S33.9 6 24 6 6 14.1 6 24s8.1 18 18 18Zm0-7c6.1 0 11-4.9 11-11s-4.9-11-11-11-11 4.9-11 11 4.9 11 11 11Zm0-6a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
