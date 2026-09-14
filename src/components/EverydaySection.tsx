import { everyday } from "@/lib/copy";
import { everydayPhotos } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function EverydaySection() {
  return (
    <section id={everyday.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-350">
        <h2 className="reveal max-w-3xl text-balance font-display text-4xl leading-[1.1] text-ink md:text-5xl">
          {everyday.headline}
        </h2>
        <ul
          aria-label={everyday.headline}
          className="everyday-track -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-7 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-16 md:overflow-visible md:px-0 md:pb-0"
          tabIndex={0}
        >
          {everyday.categories.map((category, index) => (
            <li
              key={category.title}
              className="everyday-card grid w-[82vw] max-w-88 shrink-0 snap-start scroll-ml-5 gap-5 sm:scroll-ml-8 md:w-auto md:max-w-none md:shrink"
            >
              <div className="overflow-hidden">
                <SitePhoto
                  photo={everydayPhotos[index]}
                  sizes="(min-width: 768px) 45vw, 82vw"
                  className="everyday-photo aspect-4/3 w-full object-cover"
                />
              </div>
              <div className="pr-2">
                <h3 className="font-display text-2xl leading-snug text-ink md:text-3xl">
                  {category.title}
                </h3>
                <p className="mt-3 text-pretty font-body text-base leading-7 text-ink-soft sm:leading-8">
                  {category.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
