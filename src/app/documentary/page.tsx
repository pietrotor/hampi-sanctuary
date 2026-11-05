import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { BrandLockup } from "@/components/BrandLogo";
import { SitePhoto } from "@/components/SitePhoto";
import { placeholders } from "@/lib/copy";
import { documentaryStill } from "@/lib/media";

export const metadata: Metadata = {
  title: placeholders.documentaryTitle,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/documentary",
  },
};

export default function DocumentaryPage() {
  return (
    <main className="min-h-dvh bg-deep text-paper lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)]">
      <ViewTransition
        name="documentary-still"
        share="documentary-morph"
        default="none"
      >
        <div className="relative min-h-[45svh] overflow-hidden lg:min-h-dvh">
          <SitePhoto
            photo={documentaryStill}
            sizes="(min-width: 1024px) 58vw, 100vw"
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/15 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-ink/25" />
        </div>
      </ViewTransition>

      <ViewTransition enter="documentary-content-enter" default="none">
        <div className="flex min-h-[55svh] flex-col justify-center px-6 py-16 sm:px-10 lg:min-h-dvh lg:px-14 xl:px-20">
          <BrandLockup
            variant="bone"
            className="h-auto w-20 sm:w-24"
            priority
          />
          <p className="mt-12 font-ui text-sm tracking-[0.14em] text-paper/65">
            Documentary
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-paper md:text-6xl">
            {placeholders.documentaryTitle}
          </h1>
          <p className="mt-8 max-w-xl font-body text-lg leading-8 text-paper/80">
            {placeholders.documentaryBody}
          </p>
          <p className="mt-10">
            <Link
              href="/#documentary"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-paper bg-paper px-6 font-ui text-base text-ink transition-[background-color,border-color,transform] duration-200 hover:border-mist hover:bg-mist active:scale-[0.98]"
            >
              {placeholders.back}
            </Link>
          </p>
        </div>
      </ViewTransition>
    </main>
  );
}
