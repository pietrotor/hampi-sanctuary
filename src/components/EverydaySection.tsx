import { SitePhoto } from "@/components/SitePhoto";
import { everyday } from "@/lib/copy";
import { everydayPhoto } from "@/lib/media";

/**
 * A ruled index, not a carousel. These are six short facets of daily life
 * meant to be scanned; hiding five of them behind a swipe cost the reader
 * everything and bought nothing.
 */
export function EverydaySection() {
  return (
    <section id={everyday.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-350">
        <h2 className="reveal max-w-3xl text-balance font-display text-4xl leading-[1.1] text-ink md:text-5xl">
          {everyday.headline}
        </h2>

        <figure className="image-reveal -mx-5 mt-10 sm:-mx-8 md:-mx-10 md:mt-14">
          <SitePhoto
            photo={everydayPhoto}
            sizes="100vw"
            className="aspect-3/2 w-full object-cover sm:aspect-16/5"
          />
        </figure>

        {/* Columns only widen where each one still holds a readable measure;
            two columns at md would squeeze the body to 40 characters. */}
        <ul className="reveal-sequence mt-10 grid md:mt-16 lg:grid-cols-2 lg:gap-x-12 2xl:grid-cols-3 2xl:gap-x-14">
          {everyday.categories.map((category) => (
            <li key={category.title} className="border-t border-line py-6 md:py-8">
              <h3 className="font-display text-2xl leading-snug text-ink md:text-[1.75rem]">
                {category.title}
              </h3>
              <p className="mt-3 max-w-[58ch] text-pretty font-body text-base leading-7 text-ink-soft">
                {category.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
