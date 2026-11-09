import { headers } from "next/headers";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { hero } from "@/lib/copy";
import { heroStories } from "@/lib/media";

export async function Hero() {
  const raw = Number((await headers()).get("x-hero-story"));
  const index =
    Number.isInteger(raw) && raw >= 0 && raw < heroStories.length ? raw : 0;
  const photos = heroStories[index];

  return (
    <section
      id="top"
      className="relative min-h-dvh overflow-hidden bg-ink text-paper"
      data-hero-story={index}
    >
      <HeroSlideshow photos={photos} headline={hero.headline} body={hero.body} />
    </section>
  );
}
