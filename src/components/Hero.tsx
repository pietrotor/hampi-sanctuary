import Image from "next/image";
import { hero, site } from "@/lib/copy";
import { heroPhotos } from "@/lib/media";

export function Hero() {
  const heroPhoto = heroPhotos[0];

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden bg-ink text-paper"
    >
      <div className="hero-image absolute inset-0" aria-hidden="true">
        <Image
          src={heroPhoto.src}
          alt=""
          fill
          sizes="100vw"
          priority
          quality={84}
          className="object-cover"
          style={{ objectPosition: heroPhoto.position }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/35" />
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 md:px-12 md:py-10">
        <p className="hero-brand font-sans text-sm tracking-[0.14em] text-paper md:tracking-[0.18em]">
          {site.name}
        </p>
        <div className="hero-copy max-w-3xl pb-4 sm:pb-8 md:pb-16">
          <h1 className="font-display text-[clamp(2.5rem,10vw,4rem)] leading-[1.08] text-balance md:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[40rem] font-sans text-base leading-7 text-paper/90 sm:mt-8 sm:leading-8 md:text-lg">
            {hero.body}
          </p>
        </div>
      </div>
    </section>
  );
}
