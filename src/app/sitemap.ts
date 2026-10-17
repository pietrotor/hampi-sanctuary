import type { MetadataRoute } from "next";
import { sitePhotos } from "@/lib/media";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: sitePhotos.map((photo) => new URL(photo.src, siteUrl).toString()),
    },
  ];
}
