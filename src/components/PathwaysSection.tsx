import { PathwaySlider } from "@/components/PathwaySlider";
import { SitePhoto } from "@/components/SitePhoto";
import { pathways } from "@/lib/copy";
import { pathwayPhotos } from "@/lib/media";

export function PathwaysSection() {
  return (
    <section id={pathways.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      {/* Narrower than the page's wide sections: a photograph beside a
          readable measure needs about 1100px, and the remaining 300 only
          read as a hole on the right. */}
      <div className="mx-auto max-w-275">
        <div className="reveal">
          <h2 className="max-w-4xl font-display text-4xl leading-[1.1] text-ink md:text-5xl">
            {pathways.headline}
          </h2>
          <p className="mt-6 max-w-160 text-pretty font-body text-lg leading-8 text-ink-soft">
            {pathways.intro}
          </p>
        </div>

        <PathwaySlider
          labels={pathways.items.map((item) => ({
            short: item.name,
            full: item.title,
          }))}
        >
          {pathways.items.map((item, index) => (
            <article
              key={item.name}
              className="w-full shrink-0 grow-0 basis-full pt-10 md:pt-14"
            >
              {/* Centred against each other, so neither column ends in a
                  stranded gap when the summaries differ in length. */}
              <div className="lg:grid lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
                <figure className="image-reveal">
                  <SitePhoto
                    photo={pathwayPhotos[index]}
                    sizes="(min-width: 1024px) 30rem, 90vw"
                    className="aspect-4/3 w-full object-cover md:aspect-16/9 lg:aspect-4/3"
                  />
                </figure>
                <div className="mt-6 max-w-[65ch] md:mt-8 lg:mt-0">
                  <h3 className="font-display text-3xl leading-[1.1] text-ink md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-lg italic leading-[1.35] text-ink-soft">
                    {item.line}
                  </p>
                  <div className="mt-5 space-y-3 text-pretty font-body text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                    {item.summary.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
              {/* Spans the whole panel, the way the FAQ rows do. Inside the
                  text column the expanded answer opened a tall empty block
                  beside the photograph. */}
              <details className="group mt-10 border-t border-line pt-4 md:mt-14">
                <summary className="pathway-more cursor-pointer font-ui text-xs uppercase tracking-[0.12em] text-accent">
                  <span aria-hidden className="pathway-more-icon" />
                  <span className="pathway-more-label group-open:hidden">
                    {pathways.learnMore}
                    <span className="sr-only sm:not-sr-only"> about {item.title}</span>
                  </span>
                  <span className="pathway-more-label hidden group-open:inline">
                    {pathways.showLess}
                  </span>
                </summary>
                <p className="max-w-[68ch] pt-5 font-body text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                  {item.expanded}
                </p>
              </details>
            </article>
          ))}
        </PathwaySlider>

        <aside
          aria-labelledby="pathways-note-title"
          className="reveal mt-16 bg-mist px-6 py-8 sm:px-10 sm:py-10 md:mt-24 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:px-14 lg:py-12"
        >
          <div>
            <p className="font-ui text-xs uppercase tracking-[0.12em] text-accent">
              {pathways.note.label}
            </p>
            <h3
              id="pathways-note-title"
              className="mt-4 font-display text-2xl leading-[1.15] text-ink md:text-3xl"
            >
              {pathways.note.title}
            </h3>
            <p className="mt-4 max-w-[48ch] text-pretty font-body text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              {pathways.note.body}
            </p>
          </div>
          <div className="mt-8 border-t border-line pt-6 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <p className="font-ui text-xs uppercase tracking-[0.12em] text-ink-soft">
              {pathways.note.emphasisLabel}
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-2 font-body text-base leading-7 text-ink sm:grid-cols-2 lg:grid-cols-1">
              {pathways.note.emphasis.map((point) => (
                <li key={point} className="flex items-baseline gap-3">
                  <span aria-hidden className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-pretty font-body text-sm leading-6 text-ink-soft italic">
              {pathways.note.caveat}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
