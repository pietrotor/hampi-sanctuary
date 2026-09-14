import { life } from "@/lib/copy";
import { lifePhoto } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function LifeSection() {
  return (
    <section id={life.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-350 items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div className="reveal">
          <h2 className="text-balance font-display text-4xl leading-[1.12] text-ink md:text-6xl">
            {life.headline}
          </h2>
          <div className="mt-7 space-y-5 sm:mt-8">
            {life.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-152 text-pretty font-body text-lg leading-8 text-ink-soft md:text-xl md:leading-9"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <figure className="image-reveal">
          <SitePhoto
            photo={lifePhoto}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="aspect-4/3 w-full object-cover lg:aspect-4/5 xl:aspect-4/3"
          />
        </figure>
      </div>
    </section>
  );
}
