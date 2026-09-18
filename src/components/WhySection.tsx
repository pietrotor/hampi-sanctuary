import { why } from "@/lib/copy";
import { whyPhoto } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function WhySection() {
  const supportingParagraphs = why.paragraphs.slice(0, -1);
  const closingThought = why.paragraphs.at(-1);

  return (
    <section id={why.id} className="bg-mist px-5 py-24 sm:px-8 md:px-10 md:py-36">
      {/* Two columns that interlock: the argument reads across the top row,
          and its conclusion sits opposite the photograph. An indented prose
          column left the whole left half of the section empty. */}
      <div className="mx-auto grid max-w-350 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-24 xl:gap-x-28">
        {/* The thesis of the page, so it keeps the largest type on it. */}
        <h2 className="reveal font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.04] text-ink lg:col-start-1 lg:row-start-1">
          {why.headline}
        </h2>
        {/* Nudged down so the first line of prose sits below the headline's
            cap height rather than fighting it for the same optical baseline. */}
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
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-3/2 w-full object-cover lg:aspect-4/3"
          />
        </figure>
        {closingThought ? (
          /* The conclusion, held against the photograph so the statement
             lands as the section's answer instead of trailing off alone. */
          <p className="reveal max-w-152 font-display text-3xl leading-[1.15] text-ink md:text-4xl lg:col-start-1 lg:row-start-2 lg:self-end lg:text-5xl">
            {closingThought}
          </p>
        ) : null}
      </div>
    </section>
  );
}
