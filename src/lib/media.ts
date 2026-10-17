export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

/**
 * The client's own photography, resized for the web from the originals in
 * `assets/client-photos/`. Daniel's portrait comes from the WEB-DANI set.
 */

export const heroPhotos: Photo[] = [
  {
    src: "/photos/pond-gathering.webp",
    alt: "Friends gathering on a wooden platform in Hampi Sanctuary's natural pond",
    width: 3648,
    height: 2048,
    position: "center 48%",
  },
  {
    src: "/photos/garden-cacti-sky.webp",
    alt: "Cacti and flowers along the lawn under an open sky",
    width: 3840,
    height: 2560,
    position: "center 58%",
  },
  {
    src: "/photos/garden-run.webp",
    alt: "Andrea running with the dogs through the sunlit gardens",
    width: 3648,
    height: 2432,
    position: "center 38%",
  },
  {
    src: "/photos/lavender-oven.webp",
    alt: "Lavender, cacti and an adobe outdoor oven in the sanctuary garden",
    width: 3840,
    height: 2142,
    position: "center 48%",
  },
  {
    src: "/photos/pond-platform.webp",
    alt: "A wooden platform extending over a quiet natural pond",
    width: 3840,
    height: 2157,
    position: "center 52%",
  },
];

export const mobileHeroPhoto: Photo = {
  src: "/photos/pond-gathering-mobile.webp",
  alt: heroPhotos[0].alt,
  width: 960,
  height: 2048,
  position: "center 48%",
};

export const lifePhoto: Photo = {
  src: "/photos/pond-lilies.webp",
  alt: "A quiet swim among the water lilies in the natural pond",
  width: 2000,
  height: 1333,
  position: "center 58%",
};

export const whyPhoto: Photo = {
  src: "/photos/garden-mountains.webp",
  alt: "Hampi Sanctuary's garden and cacti beneath the surrounding mountains",
  width: 2000,
  height: 1333,
  position: "center 62%",
};

export const documentaryStill: Photo = {
  src: "/photos/community-conversation.webp",
  alt: "A community conversation in the garden framed by lavender",
  width: 2400,
  height: 1347,
  position: "center 48%",
};

/**
 * One photograph anchors the whole section. Six separate images made the
 * facets compete with each other and none of them said anything.
 */
export const everydayPhoto: Photo = {
  src: "/photos/pond-afternoon.webp",
  alt: "People sharing a sunny afternoon around the natural pond",
  width: 3200,
  height: 1796,
  position: "center 52%",
};

export const pathwayPhotos: Photo[] = [
  {
    src: "/photos/garden-bowl.webp",
    alt: "A garden meal served on a tree stump among the lavender",
    width: 1600,
    height: 1200,
    position: "center 46%",
  },
  {
    src: "/photos/garden-work.webp",
    alt: "Working from a chair in the garden at Hampi Sanctuary",
    width: 1760,
    height: 1320,
    position: "center 42%",
  },
  {
    src: "/photos/quiet-meditation.webp",
    alt: "A guest meditating quietly among indoor plants",
    width: 1600,
    height: 1067,
    position: "center 42%",
  },
];

export const portraits: Photo[] = [
  {
    src: "/photos/daniel-portrait.webp",
    alt: "Daniel resting in the garden with a dog",
    width: 990,
    height: 1238,
    position: "center 42%",
  },
  {
    src: "/photos/andrea-portrait.webp",
    alt: "Andrea in the gardens at Hampi Sanctuary",
    width: 800,
    height: 1000,
  },
];

/** Every site photograph, once each — for the image sitemap. */
export const sitePhotos: Photo[] = [
  ...heroPhotos,
  mobileHeroPhoto,
  lifePhoto,
  whyPhoto,
  documentaryStill,
  everydayPhoto,
  ...pathwayPhotos,
  ...portraits,
].filter(
  (photo, index, list) =>
    list.findIndex((entry) => entry.src === photo.src) === index,
);
