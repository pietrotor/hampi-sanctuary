import Link from "next/link";
import { BrandLockup } from "@/components/BrandLogo";
import { site } from "@/lib/copy";

type Props = {
  title: string;
  body: string;
  backLabel: string;
};

export function PlaceholderPage({ title, body, backLabel }: Props) {
  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col justify-center px-6 py-24">
      <BrandLockup variant="green" className="h-auto w-24" priority />
      <span className="sr-only">{site.name}</span>
      <h1 className="mt-10 font-display text-5xl leading-[1.1] text-ink md:text-6xl">
        {title}
      </h1>
      <p className="mt-8 max-w-[42rem] font-body text-lg leading-8 text-ink-soft">
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
