import Link from "next/link";
import { closing, placeholders } from "@/lib/copy";

export function ClosingSection() {
  return (
    <section
      id={closing.id}
      className="bg-paper px-5 pt-4 pb-24 sm:px-8 md:px-10 md:pb-36"
    >
      <div className="reveal mx-auto max-w-275">
        <span className="reveal-rule mb-14 block h-px w-full bg-line md:mb-20" />
        <h2 className="max-w-5xl text-balance font-display text-5xl leading-[1.05] text-ink md:text-7xl">
          {closing.headline}
        </h2>
        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <p className="max-w-152 text-pretty font-body text-lg leading-8 text-ink-soft">
            {closing.body}
          </p>
          <p className="mt-10 lg:mt-0">
            <Link href={placeholders.conversationHref} className="btn-primary">
              {closing.cta}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
