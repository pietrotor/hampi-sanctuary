import { why } from "@/lib/copy";
import { whyPhoto } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function WhySection() {
  const supportingParagraphs = why.paragraphs.slice(0, -1);
  const closingThought = why.paragraphs.at(-1);

  return (
    <section id={why.id} className="bg-mist px-5 py-24 sm:px-8 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-350 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-24 xl:gap-x-28">
        <h2 className="reveal font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.04] text-ink lg:col-start-1 lg:row-start-1">
          {why.headline}
        </h2>
        <div className="reveal space-y-5 lg:col-start-2 lg:row-start-1 lg:pt-3">
          {supportingParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-152 text-pretty font-body text-lg leading-8 text-ink-soft md:text-xl md:leading-9"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <figure className="image-reveal -mx-5 sm:-mx-8 md:mx-0 lg:col-start-2 lg:row-start-2">
          <SitePhoto
            photo={whyPhoto}
            sizes="(min-width: 1024px) 36rem, 100vw"
            quality={90}
            className="h-auto w-full lg:aspect-3/4 lg:object-cover"
          />
        </figure>
        {closingThought ? (
          <p className="reveal max-w-152 font-display text-3xl leading-[1.15] text-ink md:text-4xl lg:col-start-1 lg:row-start-2 lg:self-center lg:text-5xl">
            {closingThought}
          </p>
        ) : null}
      </div>
    </section>
  );
}
