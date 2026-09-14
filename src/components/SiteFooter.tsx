import { BrandLockup } from "@/components/BrandLogo";
import { nav, site } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-mist px-5 py-14 sm:px-8 md:px-10 md:py-20">
      <div className="mx-auto max-w-350">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <a href="#top" className="inline-flex self-start">
            <BrandLockup variant="green" className="h-auto w-28 md:w-32" />
            <span className="sr-only">{site.name}</span>
          </a>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 font-ui text-xs uppercase tracking-[0.12em] text-ink-soft sm:grid-cols-3">
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
        <p className="mt-14 border-t border-line pt-6 font-ui text-xs uppercase tracking-[0.12em] text-ink-soft">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
