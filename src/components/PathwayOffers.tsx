"use client";

import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { SitePhoto } from "@/components/SitePhoto";
import { pathways } from "@/lib/copy";
import { pathwayPhotos } from "@/lib/media";

export function PathwayOffers() {
  const base = useId();
  const [selected, setSelected] = useState(0);
  const [frameHeight, setFrameHeight] = useState<number>();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const frame = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = frame.current;
    const active = root?.querySelector<HTMLElement>('[data-active="true"]');
    if (!root || !active) return;

    const measure = () => setFrameHeight(active.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(active);
    return () => observer.disconnect();
  }, [selected]);

  const activate = useCallback((index: number, moveFocus = false) => {
    const count = pathways.items.length;
    const next = (index + count) % count;
    setSelected(next);
    if (moveFocus) tabs.current[next]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const last = pathways.items.length - 1;
      const targets: Record<string, number> = {
        ArrowLeft: selected - 1,
        ArrowRight: selected + 1,
        Home: 0,
        End: last,
      };
      const next = targets[event.key];
      if (next === undefined) return;
      event.preventDefault();
      activate(next, true);
    },
    [activate, selected],
  );

  return (
    <div className="mt-10 md:mt-14">
      <div
        role="tablist"
        aria-label="Participation pathways"
        onKeyDown={onKeyDown}
        className="grid gap-2 px-5 sm:px-0 md:grid-cols-3 md:gap-6"
      >
        {pathways.items.map((item, index) => {
          const active = index === selected;
          return (
            <button
              key={item.title}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${index}`}
              aria-selected={active}
              aria-controls={`${base}-panel-${index}`}
              tabIndex={active ? 0 : -1}
              onClick={() => activate(index)}
              className={`min-h-14 cursor-pointer border px-4 py-3 text-left font-display text-xl leading-none transition-colors md:min-h-24 md:px-5 md:py-5 md:text-center md:text-3xl md:leading-tight md:text-balance ${
                active
                  ? "border-accent bg-accent text-paper"
                  : "border-line bg-paper text-ink hover:border-ink hover:bg-mist"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        ref={frame}
        className="pathway-frames relative mt-8 md:mt-14"
        style={{ height: frameHeight }}
      >
      {pathways.items.map((item, index) => {
        const active = index === selected;
        return (
          <article
            key={item.title}
            id={`${base}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${index}`}
            data-active={active ? "true" : "false"}
            inert={active ? undefined : true}
            tabIndex={active ? 0 : undefined}
            className="pt-8 md:pt-0"
          >
            <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16 xl:gap-20">
              <figure>
                <SitePhoto
                  photo={pathwayPhotos[index]}
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  quality={90}
                  className="h-auto w-full"
                />
              </figure>
              <div className="mt-6 max-w-[65ch] px-5 sm:px-0 lg:mt-0">
                <h3 className="font-display text-3xl leading-[1.1] text-ink md:text-5xl">
                  {item.title}
                </h3>
                <div className="mt-5 space-y-4 font-body text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
      </div>

      <p role="status" className="sr-only">
        {pathways.items[selected]?.title}, {selected + 1} of {pathways.items.length}
      </p>
    </div>
  );
}
