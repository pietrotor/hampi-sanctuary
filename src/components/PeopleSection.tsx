import { people } from "@/lib/copy";
import { portraits } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function PeopleSection() {
  return (
    <section id={people.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-275">
        <h2 className="reveal max-w-2xl text-balance font-display text-3xl leading-[1.15] text-ink md:text-5xl">
          {people.headline}
        </h2>
        <ul className="mt-12 grid gap-14 sm:mt-16 md:grid-cols-2 md:gap-16 lg:gap-20">
          {people.portraits.map((person, index) => (
            <li key={person.name} className={index % 2 === 1 ? "md:mt-20" : undefined}>
              <figure className="image-reveal">
                <SitePhoto
                  photo={portraits[index]}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-4/5 w-full object-cover"
                />
              </figure>
              <div className="reveal">
                <h3 className="mt-6 font-display text-2xl text-ink">{person.name}</h3>
                <p className="mt-3 max-w-152 text-pretty font-sans text-base leading-8 text-ink-soft">
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
