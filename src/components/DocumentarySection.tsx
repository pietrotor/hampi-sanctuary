import Link from "next/link";
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
        {/* The still itself is the play target, with the control centred on
            it, so there is nothing to hunt for below the image. */}
        {/* Full container width: capped at 48rem it left a dead strip down
            the right of the section, and a film invitation is the one place
            the photograph should be at its largest. */}
        <Link
          href={placeholders.documentaryHref}
          className="group mt-10 block sm:mt-12 md:mt-14"
        >
          <span className="image-reveal relative block">
            <SitePhoto
              photo={documentaryStill}
              alt=""
              sizes="(min-width: 1180px) 68.75rem, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 2.5rem)"
              className="aspect-16/9 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Darkest at the centre, under the control, so the play mark
                keeps its contrast whatever the still turns out to be. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-radial-[at_50%_50%] from-ink/75 via-ink/40 via-45% to-ink/25 transition-opacity duration-500 group-hover:opacity-85"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span
                aria-hidden="true"
                className="grid size-16 place-items-center rounded-full border border-paper/75 bg-ink/25 text-paper backdrop-blur-sm transition duration-300 group-hover:scale-105 group-hover:border-paper group-hover:bg-paper group-hover:text-ink md:size-20"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-0.5 size-5 md:size-6"
                >
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </span>
          </span>
          {/* The label sits off the photograph: over an unpredictable still
              it could never guarantee its contrast. */}
          <span className="mt-5 flex items-center gap-3 font-ui text-xs uppercase tracking-[0.14em] text-paper">
            {documentary.cta}
            <span
              aria-hidden="true"
              className="h-px w-8 bg-paper/50 transition-[width,background-color] duration-300 group-hover:w-12 group-hover:bg-paper"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
