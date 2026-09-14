import { faq } from "@/lib/copy";

export function FaqSection() {
  return (
    <section
      id={faq.id}
      aria-label="Frequently asked questions"
      className="bg-mist px-5 py-20 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-200">
        <ul className="reveal divide-y divide-line border-y border-line">
          {faq.items.map((item, index) => (
            <li key={item.question} className="faq-row">
              <details className="px-1 py-5 sm:px-3 sm:py-6">
                <summary className="cursor-pointer gap-6 font-ui text-base leading-7 text-ink sm:text-lg">
                  <span>
                    <span className="mr-3 text-ink-soft tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.question}
                  </span>
                </summary>
                <p className="max-w-160 pt-4 pl-0 font-body text-lg leading-8 text-ink-soft sm:pl-10">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
