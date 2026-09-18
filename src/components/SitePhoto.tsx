import Image from "next/image";
import type { Photo } from "@/lib/media";

type Props = {
  photo: Photo;
  priority?: boolean;
  sizes: string;
  className?: string;
  quality?: number;
  /**
   * Overrides the photo's own alt. Pass "" when the image sits inside a link
   * that already carries a visible label, to avoid a doubled-up name.
   */
  alt?: string;
};

export function SitePhoto({
  photo,
  priority = false,
  sizes,
  className,
  quality = 78,
  alt,
}: Props) {
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      style={{ objectPosition: photo.position }}
      className={`bg-line/30 ${className ?? ""}`}
    />
  );
}
