"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BrandRow } from "@/components/BrandLogo";
import { nav } from "@/lib/copy";

/** Entrance beat for the first row, then one beat per row after it. */
const STAGGER_FROM = 90;
const STAGGER_STEP = 45;

const stagger = (index: number) =>
  ({ "--stagger": `${STAGGER_FROM + index * STAGGER_STEP}ms` }) as CSSProperties;

/**
 * The five section links on small screens. A native modal dialog, so focus
 * trapping, Escape, and an inert page behind come from the platform rather
 * than from hand-rolled key handling.
 */
export function MobileMenu() {
  const sheet = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => sheet.current?.close();

  useEffect(() => {
    if (!open) return;

    // The page behind must not drift while the sheet covers it.
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    // Nothing should stay open once the inline nav takes over at md.
    const inlineNav = window.matchMedia("(min-width: 768px)");
    const onWide = () => {
      if (inlineNav.matches) close();
    };
    inlineNav.addEventListener("change", onWide);

    return () => {
      root.style.overflow = previous;
      inlineNav.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="page-sections-sheet"
        onClick={() => {
          sheet.current?.showModal();
          setOpen(true);
        }}
        className="-mr-2 grid min-h-11 min-w-11 place-items-center text-ink transition-colors hover:text-accent"
      >
        <span className="sr-only">Menu</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
          <path
            d="M3 8.5h18M3 15.5h18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <dialog
        id="page-sections-sheet"
        ref={sheet}
        aria-label="Page sections"
        onClose={() => setOpen(false)}
        className="nav-sheet m-0 h-dvh max-h-none w-full max-w-none border-0 bg-deep p-0 text-paper"
      >
        <div className="on-dark flex h-full flex-col overflow-y-auto px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-8">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <BrandRow variant="bone" className="h-10 w-auto" />
            <button
              type="button"
              onClick={close}
              className="-mr-2 grid min-h-11 min-w-11 place-items-center text-paper transition-colors hover:text-paper/70"
            >
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>

          {/* Set in the display face at heading scale: there is room here for
              the section names to read as an index, not as a toolbar. The rows
              share out the panel's height, capped so they stay rows on a tall
              screen, rather than leaving the run of names stranded up top. */}
          <ul className="mt-8 flex flex-1 flex-col divide-y divide-paper/15 border-y border-paper/15">
            {nav.map((item, index) => (
              <li
                key={item.href}
                className="nav-sheet-item flex max-h-28 min-h-14 flex-1"
                style={stagger(index)}
              >
                <a
                  href={item.href}
                  onClick={close}
                  className="flex w-full items-center font-display text-4xl leading-none text-paper transition-colors hover:text-paper/70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-sheet-item mt-8 shrink-0" style={stagger(nav.length)}>
            <a href="#invitation" onClick={close} className="btn-on-dark w-full">
              Invitation
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
