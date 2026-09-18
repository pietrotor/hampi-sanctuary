import { thrive } from "@/lib/copy";

const COLUMNS = [
  { title: "yesTitle", items: "yes", marker: "marker:text-accent" },
  { title: "noTitle", items: "no", marker: "marker:text-line" },
] as const;

export function ThriveSection() {
  return (
    <section id={thrive.id} className="bg-paper px-5 py-20 sm:px-8 md:px-10 md:py-32">
      {/* Subgrid keeps both headings and both lists on shared rows, so the
          lists start level even though one heading wraps to two lines. */}
      <div className="mx-auto grid max-w-350 gap-14 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-12 lg:gap-x-20">
        {COLUMNS.map(({ title, items, marker }, index) => (
          <div
            key={title}
            className={`md:row-span-2 md:grid md:grid-rows-subgrid md:gap-0 ${
              index === 1 ? "md:border-l md:border-line md:pl-12 lg:pl-20" : ""
            }`}
          >
            <h2 className="reveal text-balance font-display text-3xl leading-[1.12] text-ink md:text-4xl">
              {thrive[title]}
            </h2>
            <ul className={`reveal-sequence mt-8 list-disc space-y-4 pl-5 ${marker}`}>
              {thrive[items].map((item) => (
                <li
                  key={item}
                  className="max-w-xl pl-2 text-pretty font-body text-lg leading-8 text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
