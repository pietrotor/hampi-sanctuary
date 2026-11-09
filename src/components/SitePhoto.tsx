import type { CSSProperties } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/media";

type Props = {
  photo: Photo;
  priority?: boolean;
  sizes: string;
  className?: string;
  quality?: number;
  /** Dialog slides sit off-screen, so lazy loading waits until navigation. */
  loading?: "eager" | "lazy";
  style?: CSSProperties;
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
  loading,
  style,
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
      loading={priority ? undefined : loading}
      quality={quality}
      style={{ objectPosition: photo.position, ...style }}
      className={`bg-line/30 ${className ?? ""}`}
    />
  );
}
