import Link from "next/link";
import { documentary, placeholders } from "@/lib/copy";
import { documentaryStill } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function DocumentarySection() {
  return (
    <section
      id={documentary.id}
      className="bg-deep px-5 py-24 text-paper sm:px-8 md:px-10 md:py-36"
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
