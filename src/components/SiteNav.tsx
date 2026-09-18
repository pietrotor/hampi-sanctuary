import { BrandRow } from "@/components/BrandLogo";
import { MobileMenu } from "@/components/MobileMenu";
import { nav, site } from "@/lib/copy";

export function SkipLink() {
  return (
    <a
      href="#life"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
    >
      Skip to content
    </a>
  );
}

export function SiteNav() {
  return (
    <nav
      aria-label="Page sections"
      className="sticky top-0 z-40 bg-paper/92 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-350 items-center justify-between gap-4 px-5 sm:px-8 md:h-18 md:gap-6 md:px-10">
        <a href="#top" className="flex min-h-11 items-center">
          <BrandRow variant="green" className="h-10 w-auto" />
          <span className="sr-only">{site.name}</span>
        </a>
        {/* From md there is room to keep the whole index in the bar. Below it,
            five labels only fit by scrolling sideways, which reads as a
            clipped bar rather than a list, so they move into the sheet. */}
        <ul className="hidden md:flex md:items-center md:gap-8">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link flex min-h-11 items-center font-ui text-xs uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 md:hidden">
          <a
            href="#invitation"
            className="flex min-h-11 items-center font-ui text-xs uppercase tracking-[0.12em] text-accent"
          >
            Invitation
          </a>
          <MobileMenu />
        </div>
      </div>
      {/* The bar's bottom rule is itself the progress track, so position is
          read as one hairline changing colour. Stacked under a separate
          border, the accent line just looked like a misdrawn edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-line"
      >
        <span className="nav-progress block h-full w-full bg-accent" />
      </span>
    </nav>
  );
}
