import { PathwayOffers } from "@/components/PathwayOffers";
import { SitePhoto } from "@/components/SitePhoto";
import { pathways } from "@/lib/copy";
import { plantMedicinePhoto } from "@/lib/media";

export function PathwaysSection() {
  return (
    <section id={pathways.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-350">
        <h2 className="reveal max-w-4xl font-display text-4xl leading-[1.08] text-ink md:text-6xl">
          {pathways.headline}
        </h2>

        <PathwayOffers />

        <aside className="reveal mt-16 border-t border-line pt-10 md:mt-24 md:pt-14">
          <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16 xl:gap-20">
            <figure className="image-reveal">
              <SitePhoto
                photo={plantMedicinePhoto}
                sizes="(min-width: 1024px) 36rem, 100vw"
                quality={90}
                className="h-auto w-full"
              />
            </figure>
            <div className="mt-6 max-w-[65ch] lg:mt-0">
              <h3 className="font-display text-3xl leading-[1.15] text-ink md:text-4xl">
                {pathways.plantMedicine.title}
              </h3>
              <blockquote className="mt-5">
                <p className="text-pretty font-display text-2xl leading-snug text-ink md:text-3xl">
                  “{pathways.plantMedicine.quote}”
                </p>
                <footer className="mt-4 font-ui text-xs uppercase tracking-[0.12em] text-ink-soft">
                  {pathways.plantMedicine.attribution}
                </footer>
              </blockquote>
              <p className="mt-6 text-pretty font-body text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                {pathways.plantMedicine.body}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
