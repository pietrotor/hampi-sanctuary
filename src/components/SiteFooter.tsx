import { nav, site } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper px-5 py-12 sm:px-8 md:px-10 md:py-16">
      <div className="mx-auto max-w-350">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <a
            href="#top"
            className="nav-link inline-flex min-h-11 items-center self-start font-display text-2xl text-ink"
          >
            {site.name}
          </a>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 font-sans text-sm text-ink-soft sm:grid-cols-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link inline-flex min-h-8 items-center transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 border-t border-line pt-6 font-sans text-sm text-ink-soft">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
