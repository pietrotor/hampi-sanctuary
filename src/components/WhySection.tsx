import { why } from "@/lib/copy";
import { whyPhoto } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function WhySection() {
  const supportingParagraphs = why.paragraphs.slice(0, -1);
  const closingThought = why.paragraphs.at(-1);

  return (
    <section id={why.id} className="bg-mist px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-350 items-center gap-12 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-20">
        <figure className="image-reveal order-2 lg:order-1">
          <SitePhoto
            photo={whyPhoto}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="w-full object-cover"
          />
        </figure>
        <div className="reveal order-1 lg:order-2">
          <h2 className="text-balance font-display text-3xl leading-[1.15] text-ink md:text-5xl">
            {why.headline}
          </h2>
          <div className="mt-8 space-y-5">
            {supportingParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-152 text-pretty font-sans text-base leading-8 text-ink-soft md:text-lg"
              >
                {paragraph}
              </p>
            ))}
            {closingThought ? (
              <div className="mt-9 max-w-152">
                <span className="reveal-rule block h-px w-full bg-line" />
                <p className="mt-7 font-display text-2xl leading-[1.3] text-ink md:text-3xl">
                  {closingThought}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
