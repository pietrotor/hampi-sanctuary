import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hampi Sanctuary",
    short_name: "Hampi Sanctuary",
    description:
      "An intentional retreat community for living differently long enough to discover what genuinely improves your life.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef1ee",
    theme_color: "#2c5348",
    lang: "en",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
