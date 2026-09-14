import { PathwayCarousel } from "@/components/PathwayCarousel";
import { SitePhoto } from "@/components/SitePhoto";
import { pathways } from "@/lib/copy";
import { pathwayPhotos } from "@/lib/media";

export function PathwaysSection() {
  return (
    <section id={pathways.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-350">
        <div className="reveal">
          <h2 className="max-w-4xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {pathways.headline}
          </h2>
          <p className="mt-6 max-w-184 text-pretty font-body text-lg leading-8 text-ink-soft">
            {pathways.intro}
          </p>
        </div>

        <PathwayCarousel labels={pathways.items.map((item) => item.title)}>
          {pathways.items.map((item, index) => (
            <article
              key={item.name}
              className="w-[86%] shrink-0 lg:grid lg:w-full lg:shrink lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:gap-12 lg:border-t lg:border-line lg:py-10 lg:first:border-t-0 lg:first:pt-0 xl:gap-16"
            >
              {/* Held to a modest column so the photograph supports the
                  copy instead of dominating the section. */}
              <figure className="image-reveal lg:max-w-100">
                <SitePhoto
                  photo={pathwayPhotos[index]}
                  sizes="(min-width: 1024px) 32vw, 86vw"
                  className="aspect-4/3 w-full object-cover"
                />
              </figure>
              <div className="mt-5 lg:mt-0">
                <p className="font-ui text-xs uppercase tracking-[0.14em] text-accent">
                  {item.name}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-[1.1] text-ink md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-lg italic leading-[1.35] text-ink-soft">
                  {item.line}
                </p>
                <div className="mt-5 space-y-3 text-pretty font-body text-base leading-7 text-ink-soft lg:text-lg lg:leading-8">
                  {item.summary.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <details className="mt-5 border-t border-line pt-3">
                  <summary className="cursor-pointer font-ui text-xs uppercase tracking-[0.12em] text-accent">
                    {pathways.learnMore}
                  </summary>
                  <p className="pt-4 font-body text-base leading-7 text-ink-soft lg:text-lg lg:leading-8">
                    {item.expanded}
                  </p>
                </details>
              </div>
            </article>
          ))}
        </PathwayCarousel>

        <p className="mt-16 max-w-184 text-pretty font-body text-sm leading-7 text-ink-soft">
          {pathways.note}
        </p>
      </div>
    </section>
  );
}
