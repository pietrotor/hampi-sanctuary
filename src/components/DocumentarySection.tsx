import Link from "next/link";
import { ViewTransition } from "react";
import { documentary, placeholders } from "@/lib/copy";
import { documentaryStill } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function DocumentarySection() {
  return (
    <section
      id={documentary.id}
      className="on-dark bg-deep px-5 py-24 text-paper sm:px-8 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-275">
        <div className="reveal">
          <p className="font-ui text-sm tracking-[0.14em] text-paper/65">
            {documentary.kicker}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] text-paper md:text-6xl">
            {documentary.headline}
          </h2>
          <div className="mt-8 max-w-2xl space-y-5">
            {documentary.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-pretty font-body text-lg leading-8 text-paper/80 md:text-xl md:leading-9"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <Link
          href={placeholders.documentaryHref}
          className="documentary-preview group mt-10 block sm:mt-12 md:mt-14"
        >
          <ViewTransition
            name="documentary-still"
            share="documentary-morph"
            default="none"
          >
            <span className="image-reveal relative block overflow-hidden">
              <SitePhoto
                photo={documentaryStill}
                alt=""
                sizes="(min-width: 1180px) 68.75rem, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 2.5rem)"
                className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <span
                aria-hidden="true"
                className="documentary-preview-shade absolute inset-0 bg-ink/40"
              />
              <span className="absolute inset-0 grid place-items-center p-5">
                <span className="documentary-overlay-action inline-flex items-center justify-center overflow-hidden border border-paper bg-paper font-ui text-base text-ink">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="documentary-play-icon size-5 shrink-0"
                  >
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                  <span className="documentary-play-label" aria-hidden="true">
                    <span className="documentary-play-label-short whitespace-nowrap">
                      Watch video
                    </span>
                    <span className="documentary-play-label-full whitespace-nowrap">
                      {documentary.cta}
                    </span>
                  </span>
                  <span className="sr-only">{documentary.cta}</span>
                </span>
              </span>
            </span>
          </ViewTransition>
        </Link>
      </div>
    </section>
  );
}
