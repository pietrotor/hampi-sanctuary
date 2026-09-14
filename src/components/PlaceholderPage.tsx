import Link from "next/link";
import { site } from "@/lib/copy";

type Props = {
  title: string;
  body: string;
  backLabel: string;
};

export function PlaceholderPage({ title, body, backLabel }: Props) {
  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col justify-center px-6 py-24">
      <p className="font-sans text-sm tracking-wide text-moss">{site.name}</p>
      <h1 className="mt-10 font-display text-4xl leading-[1.15] text-ink md:text-5xl">
        {title}
      </h1>
      <p className="mt-8 max-w-[42rem] font-sans text-lg leading-8 text-ink-soft">
        {body}
      </p>
      <p className="mt-12">
        <Link href="/" className="btn-primary">
          {backLabel}
        </Link>
      </p>
    </main>
  );
}
