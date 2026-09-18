"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type Label = {
  /** Short pathway name. Doubles as the visible tab and its accessible name. */
  short: string;
  /** Full title, announced after the tab name. */
  full: string;
};

type Props = {
  labels: Label[];
  children: React.ReactNode;
};

/**
 * Tabs, not a mystery carousel: the three pathway names are always visible
 * and labelled, on every viewport. Dragging still works through Embla, but
 * it is an extra affordance rather than the only way through.
 *
 * Implements the ARIA tabs pattern with automatic activation.
 */
export function PathwaySlider({ labels, children }: Props) {
  const base = useId();
  const tabId = (i: number) => `${base}-tab-${i}`;
  const panelId = (i: number) => `${base}-panel-${i}`;

  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 26,
  });
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla]);

  const activate = useCallback(
    (index: number, moveFocus = false) => {
      const next = (index + labels.length) % labels.length;
      // Reduced motion gets an instant jump instead of the eased scroll.
      const instant = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      embla?.scrollTo(next, instant);
      if (moveFocus) tabs.current[next]?.focus();
    },
    [embla, labels.length],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const targets: Record<string, number> = {
        ArrowLeft: selected - 1,
        ArrowRight: selected + 1,
        Home: 0,
        End: labels.length - 1,
      };
      const next = targets[event.key];
      if (next === undefined) return;
      event.preventDefault();
      activate(next, true);
    },
    [activate, selected, labels.length],
  );

  return (
    <div className="mt-10 sm:mt-14">
      {/* A segmented control rather than underlined labels: as text with a
          rule under the active one, nothing about these read as pressable.
          No 01/02/03 either, since the intro states outright that the
          pathways are not ranked versions of each other. */}
      <div
        role="tablist"
        aria-label="Participation pathways"
        onKeyDown={onKeyDown}
        className="flex divide-x divide-line border border-line sm:inline-flex"
      >
        {labels.map((label, i) => (
          <button
            key={label.short}
            ref={(node) => {
              tabs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={tabId(i)}
            aria-selected={i === selected}
            aria-controls={panelId(i)}
            // Roving tabindex: one stop for the whole group, arrows move within.
            tabIndex={i === selected ? 0 : -1}
            onClick={() => activate(i)}
            className={`flex-1 px-3 py-4 font-ui text-[0.7rem] uppercase tracking-[0.1em] transition-colors sm:flex-none sm:px-8 sm:text-xs sm:tracking-[0.12em] ${
              i === selected
                ? "bg-accent text-paper"
                : "text-ink-soft hover:bg-mist hover:text-ink"
            }`}
          >
            {label.short}
          </button>
        ))}
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        {/* Inactive panels are inert, so neither keyboard nor screen reader
            lands on a "Learn more" that is off screen. */}
        <div className="flex touch-pan-y">
          {Children.map(children, (child, i) =>
            isValidElement<{
              inert?: boolean;
              id?: string;
              role?: string;
              tabIndex?: number;
              "aria-labelledby"?: string;
            }>(child)
              ? cloneElement(child, {
                  inert: i !== selected,
                  id: panelId(i),
                  role: "tabpanel",
                  tabIndex: i === selected ? 0 : undefined,
                  "aria-labelledby": tabId(i),
                })
              : child,
          )}
        </div>
      </div>

      {/* Dragging changes the panel without moving focus, so the change is
          announced here. */}
      <p role="status" className="sr-only">
        {labels[selected]?.full}, {selected + 1} of {labels.length}
      </p>
    </div>
  );
}
