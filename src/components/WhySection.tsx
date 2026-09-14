import { why } from "@/lib/copy";
import { whyPhoto } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function WhySection() {
  const supportingParagraphs = why.paragraphs.slice(0, -1);
  const closingThought = why.paragraphs.at(-1);

  return (
    <section id={why.id} className="bg-mist px-5 py-24 sm:px-8 md:px-10 md:py-36">
      <div className="mx-auto max-w-350">
        {/* The thesis of the page, so it gets the largest type and no
            competing image beside it. */}
        <h2 className="reveal max-w-4xl font-display text-5xl leading-[1.02] text-ink md:text-8xl">
          {why.headline}
        </h2>
        <div className="reveal mt-12 space-y-5 md:mt-16 md:pl-[38%]">
          {supportingParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-152 text-pretty font-body text-lg leading-8 text-ink-soft md:text-xl md:leading-9"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <figure className="image-reveal -mx-5 mt-16 sm:-mx-8 md:-mx-10 md:mt-24">
          <SitePhoto
            photo={whyPhoto}
            sizes="100vw"
            className="aspect-4/3 w-full object-cover sm:aspect-21/9"
          />
        </figure>
        {closingThought ? (
          <p className="reveal mt-16 max-w-5xl font-display text-3xl leading-[1.15] text-ink md:mt-24 md:text-6xl">
            {closingThought}
          </p>
        ) : null}
      </div>
    </section>
  );
}
