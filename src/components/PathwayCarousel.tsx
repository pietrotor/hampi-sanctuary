"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const CAROUSEL_QUERY = "(max-width: 1023.98px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(CAROUSEL_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useIsCarousel() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(CAROUSEL_QUERY).matches,
    () => false,
  );
}

type Props = {
  labels: string[];
  children: React.ReactNode;
};

/**
 * Drag carousel below lg, plain stacked rows above it. Embla is deactivated
 * at the breakpoint rather than duplicating the markup.
 */
export function PathwayCarousel({ labels, children }: Props) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 1024px)": { active: false },
    },
  });
  const [selected, setSelected] = useState(0);
  const isCarousel = useIsCarousel();

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla]);

  return (
    <div className="mt-12 sm:mt-16">
      <div
        className="-mx-5 overflow-hidden px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
        ref={emblaRef}
      >
        <div className="flex touch-pan-y gap-5 lg:block lg:gap-0">
          {children}
        </div>
      </div>
      {isCarousel ? (
        <ul className="mt-6 flex items-center gap-2">
          {labels.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => embla?.scrollTo(i)}
                aria-current={i === selected}
                className="flex min-h-11 items-center px-1"
              >
                <span
                  className={`block h-px w-9 transition-colors ${
                    i === selected ? "bg-accent" : "bg-line"
                  }`}
                />
                <span className="sr-only">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
