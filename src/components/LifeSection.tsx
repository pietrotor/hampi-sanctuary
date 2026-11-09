import { life } from "@/lib/copy";
import { lifePhoto } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function LifeSection() {
  return (
    <section id={life.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-350 gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-[calc(4.5rem+0.75rem)] lg:self-start">
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
        </div>
        <figure className="image-reveal -mx-5 sm:-mx-8 md:mx-0">
          <SitePhoto
            photo={lifePhoto}
            sizes="(min-width: 1024px) 32rem, 100vw"
            quality={90}
            className="h-auto w-full"
          />
        </figure>
      </div>
    </section>
  );
}
