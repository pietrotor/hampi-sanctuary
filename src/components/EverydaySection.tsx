import { EverydayCards } from "@/components/EverydayCards";
import { everyday } from "@/lib/copy";
import { everydayCategoryPhotos } from "@/lib/media";

export function EverydaySection() {
  return (
    <section id={everyday.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-350">
        <h2 className="reveal max-w-3xl text-balance font-display text-4xl leading-[1.1] text-ink md:text-5xl">
          {everyday.headline}
        </h2>

        <EverydayCards
          categories={everyday.categories}
          photos={everydayCategoryPhotos}
        />
      </div>
    </section>
  );
}
