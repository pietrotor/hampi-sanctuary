import Link from "next/link";
import { closing, faq, placeholders } from "@/lib/copy";

export function FaqSection() {
  return (
    <section id={faq.id} className="bg-mist px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-275 lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:gap-20">
        <div className="reveal lg:sticky lg:top-[calc(4.5rem+0.75rem)]">
          <h2 className="max-w-xs font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-8 hidden lg:block">
            <Link
              href={placeholders.conversationHref}
              className="inline-flex min-h-11 items-center gap-3 font-ui text-xs uppercase tracking-[0.12em] text-accent transition-colors hover:text-ink"
            >
              {closing.cta}
              <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            </Link>
          </p>
        </div>

        <ul className="reveal-sequence mt-10 divide-y divide-line border-y border-line lg:mt-0">
          {faq.items.map((item, index) => (
            <li key={item.question} className="faq-row">
              <details>
                <summary className="cursor-pointer gap-6 px-1 py-5 font-ui text-base leading-7 text-ink sm:px-3 sm:py-6 sm:text-lg">
                  <span>
                    <span className="mr-3 text-ink-soft tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.question}
                  </span>
                </summary>
                <p className="max-w-160 px-1 pb-5 font-body text-lg leading-8 text-ink-soft sm:pr-3 sm:pb-6 sm:pl-13">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>

        <p className="reveal mt-10 lg:hidden">
          <Link
            href={placeholders.conversationHref}
            className="inline-flex min-h-11 items-center gap-3 font-ui text-xs uppercase tracking-[0.12em] text-accent transition-colors hover:text-ink"
          >
            {closing.cta}
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          </Link>
        </p>
      </div>
    </section>
  );
}
