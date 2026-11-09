import { people } from "@/lib/copy";
import { peoplePhoto } from "@/lib/media";
import { SitePhoto } from "@/components/SitePhoto";

export function PeopleSection() {
  return (
    <section id={people.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-350">
        <h2 className="reveal max-w-3xl text-balance font-display text-4xl leading-[1.1] text-ink md:text-5xl">
          {people.headline}
        </h2>
        <div className="mt-12 grid items-start gap-10 md:mt-16 lg:grid-cols-[minmax(18rem,26rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          <figure className="image-reveal -mx-5 sm:-mx-8 md:mx-0 lg:sticky lg:top-[calc(4.5rem+1.5rem)]">
            <SitePhoto
              photo={peoplePhoto}
              sizes="(min-width: 1024px) 26rem, 100vw"
              quality={90}
              className="h-auto w-full"
            />
          </figure>
          <ul className="grid gap-10 md:gap-12">
            {people.profiles.map((person) => (
              <li key={person.name} className="reveal border-t border-line pt-8">
                <h3 className="font-display text-3xl text-ink md:text-4xl">{person.name}</h3>
                <p className="mt-4 max-w-[62ch] text-pretty font-body text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                  {person.bio}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
