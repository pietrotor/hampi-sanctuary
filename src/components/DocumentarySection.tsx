import Link from "next/link";
import { documentary, placeholders } from "@/lib/copy";
import { documentaryStill } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function DocumentarySection() {
  return (
    <section
      id={documentary.id}
      className="bg-ink px-5 py-24 text-paper sm:px-8 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-275">
        <div className="reveal">
          <p className="font-display text-xl italic leading-[1.3] text-paper/70">
            {documentary.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl leading-[1.15] text-paper md:text-5xl">
            {documentary.headline}
          </h2>
          <div className="mt-8 max-w-2xl space-y-5">
            {documentary.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-pretty font-sans text-base leading-8 text-paper/75 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <figure className="image-reveal mt-10 sm:mt-12">
          <SitePhoto
            photo={documentaryStill}
            sizes="(min-width: 1100px) 1100px, 100vw"
            className="aspect-16/9 w-full object-cover"
          />
        </figure>
        <p className="mt-8">
          <Link href={placeholders.documentaryHref} className="btn-on-dark">
            <span aria-hidden="true">▶&nbsp;</span>
            {documentary.cta}
          </Link>
        </p>
      </div>
    </section>
  );
}
