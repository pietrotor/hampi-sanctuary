import { thrive } from "@/lib/copy";

export function ThriveSection() {
  return (
    <section id={thrive.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-350 gap-14 md:grid-cols-2 md:gap-12 lg:gap-20">
        <div className="reveal">
          <h2 className="text-balance font-display text-3xl leading-[1.2] text-ink md:text-4xl">
            {thrive.yesTitle}
          </h2>
          <ul className="mt-8 list-disc space-y-4 pl-5 marker:text-moss">
            {thrive.yes.map((item) => (
              <li
                key={item}
                className="max-w-xl pl-2 text-pretty font-sans text-base leading-8 text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal md:border-l md:border-line md:pl-12 lg:pl-20">
          <h2 className="text-balance font-display text-3xl leading-[1.2] text-ink md:text-4xl">
            {thrive.noTitle}
          </h2>
          <ul className="mt-8 list-disc space-y-4 pl-5 marker:text-line">
            {thrive.no.map((item) => (
              <li
                key={item}
                className="max-w-xl pl-2 text-pretty font-sans text-base leading-8 text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
