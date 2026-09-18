import { people } from "@/lib/copy";
import { portraits } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function PeopleSection() {
  return (
    <section id={people.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-275">
        <h2 className="reveal max-w-2xl text-balance font-display text-4xl leading-[1.1] text-ink md:text-5xl">
          {people.headline}
        </h2>
        {/* Portrait beside the bio at author scale, rather than stacked above
            it at half a screen tall. */}
        {/* One column: two side-by-side portraits squeezed each bio to a
            31-character measure. */}
        <ul className="mt-12 grid gap-12 sm:mt-16 md:gap-14">
          {people.portraits.map((person, index) => (
            <li
              key={person.name}
              className="grid gap-6 border-t border-line pt-8 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:items-start sm:gap-10"
            >
              <figure className="image-reveal max-w-56 sm:max-w-none">
                <SitePhoto
                  photo={portraits[index]}
                  sizes="(min-width: 640px) 13rem, 14rem"
                  className="aspect-4/5 w-full object-cover"
                />
              </figure>
              <div className="reveal">
                <h3 className="font-display text-2xl text-ink md:text-3xl">
                  {person.name}
                </h3>
                <p className="mt-3 max-w-[58ch] text-pretty font-body text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                  {person.bio}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
