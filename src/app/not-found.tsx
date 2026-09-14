import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/BrandLogo";
import { site } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-6 py-24">
      <BrandLockup variant="green" className="h-auto w-24" priority />
      <span className="sr-only">{site.name}</span>
      <h1 className="mt-10 font-display text-5xl leading-[1.1] text-ink md:text-6xl">
        Page not found
      </h1>
      <p className="mt-8 font-body text-lg leading-8 text-ink-soft">
        The page you are looking for is not available.
      </p>
      <p className="mt-12">
        <Link href="/" className="btn-primary">
          Back to Hampi Sanctuary
        </Link>
      </p>
    </main>
  );
}
