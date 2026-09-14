import { BrandMark } from "@/components/BrandLogo";
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
      className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md"
    >
      <div className="mx-auto max-w-350 px-5 sm:px-8 md:flex md:h-18 md:items-center md:justify-between md:gap-6 md:px-10">
        <div className="flex h-16 items-center justify-between gap-4 md:h-auto">
          {/* Mark only: the supplied lockup is vertical and its wordmark
              would be illegible at nav height. */}
          <a href="#top" className="flex min-h-11 items-center">
            <BrandMark variant="green" className="h-9 w-auto" />
            <span className="sr-only">{site.name}</span>
          </a>
          <a
            href="#invitation"
            className="flex min-h-11 items-center font-ui text-xs uppercase tracking-[0.12em] text-accent md:hidden"
          >
            Invitation
          </a>
        </div>
        <ul className="nav-scroll -mx-5 flex gap-7 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 md:mx-0 md:items-center md:gap-8 md:overflow-visible md:px-0 md:pb-0">
          {nav.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="nav-link flex min-h-8 items-center font-ui text-xs uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink md:min-h-11"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
