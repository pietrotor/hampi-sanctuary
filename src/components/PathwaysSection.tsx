import { pathways } from "@/lib/copy";
import { pathwayPhotos } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function PathwaysSection() {
  return (
    <section id={pathways.id} className="bg-mist px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-350">
        <div className="reveal">
          <h2 className="max-w-4xl text-balance font-display text-3xl leading-[1.15] text-ink md:text-5xl">
            {pathways.headline}
          </h2>
          <p className="mt-8 max-w-184 text-pretty font-sans text-base leading-8 text-ink-soft md:text-lg">
            {pathways.intro}
          </p>
        </div>
        <ul className="mt-12 sm:mt-16">
          {pathways.items.map((item, index) => (
            <li
              key={item.name}
              className={index > 0 ? "pt-12 sm:pt-16" : undefined}
            >
              {index > 0 ? (
                <span className="reveal-rule mb-12 block h-px w-full bg-line sm:mb-16" />
              ) : null}
              <div className="grid gap-8 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:items-center lg:gap-20">
                <figure
                  className={`image-reveal ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <SitePhoto
                    photo={pathwayPhotos[index]}
                    sizes="(min-width: 1024px) 43vw, 100vw"
                    className="aspect-4/3 w-full object-cover"
                  />
                </figure>
                <article
                  className={`reveal ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <p className="font-sans text-sm tracking-wide text-moss">
                    {item.name}
                  </p>
                  <h3 className="mt-2 text-balance font-display text-3xl leading-[1.15] text-ink md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-pretty font-display text-xl italic leading-[1.35] text-ink-soft">
                    {item.line}
                  </p>
                  <div className="mt-6 space-y-4 text-pretty font-sans text-base leading-8 text-ink-soft">
                    {item.summary.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <details className="mt-6 border-t border-line pt-3">
                    <summary className="cursor-pointer font-sans text-sm text-moss">
                      {pathways.learnMore}
                    </summary>
                    <p className="pt-4 font-sans text-base leading-8 text-ink-soft">
                      {item.expanded}
                    </p>
                  </details>
                </article>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-16 max-w-184 font-sans text-sm leading-7 text-ink-soft">
          {pathways.note}
        </p>
      </div>
    </section>
  );
}
