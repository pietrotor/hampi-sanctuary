import { BrandLockup } from "@/components/BrandLogo";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { hero } from "@/lib/copy";
import { heroPhotos } from "@/lib/media";

const HERO_FRAMES = 5;

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-dvh overflow-hidden bg-ink text-paper"
    >
      <HeroSlideshow photos={heroPhotos.slice(0, HERO_FRAMES)} />
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-ink/35" />
      <div className="relative z-10 flex min-h-dvh flex-col justify-between px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:px-8 md:px-12 md:py-10">
        <div className="hero-brand">
          <BrandLockup
            variant="bone"
            priority
            className="h-auto w-20 sm:w-24 md:w-28"
          />
        </div>
        <div className="hero-copy max-w-3xl pb-4 sm:pb-8 md:pb-16">
          <h1 className="font-display text-[clamp(2.75rem,11vw,4.5rem)] leading-[1.04] text-balance md:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-160 font-body text-base leading-7 text-paper/95 sm:mt-8 sm:leading-8 md:text-lg">
            {hero.body}
          </p>
        </div>
        <a
          href="#life"
          className="hero-scroll-cue absolute right-5 bottom-8 hidden flex-col items-center font-ui text-[0.65rem] uppercase tracking-[0.18em] text-paper sm:flex md:right-12 md:bottom-10"
        >
          Explore
        </a>
      </div>
    </section>
  );
}
