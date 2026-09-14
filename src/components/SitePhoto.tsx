import Image from "next/image";
import type { Photo } from "@/lib/media";

type Props = {
  photo: Photo;
  priority?: boolean;
  sizes: string;
  className?: string;
  quality?: number;
};

export function SitePhoto({
  photo,
  priority = false,
  sizes,
  className,
  quality = 78,
}: Props) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
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
