export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

/**
 * The client's own photography of the site, resized for the web from the
 * originals in `assets/client-photos/`. Only the portraits are still stock
 * placeholders, because no photographs of Daniel and Andrea were supplied.
 */
const u = (id: string, extra = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70${extra}`;

export const heroPhotos: Photo[] = [
  {
    src: "/photos/pond-gathering.jpg",
    alt: "Friends gathering on a wooden platform in Hampi Sanctuary's natural pond",
    width: 2400,
    height: 1348,
    position: "center 48%",
  },
  {
    src: "/photos/garden-cacti-sky.jpg",
    alt: "Cacti and flowers along the lawn under an open sky",
    width: 2400,
    height: 1600,
    position: "center 55%",
  },
  {
    src: "/photos/garden-run.jpg",
    alt: "Andrea running with the dogs through the sunlit gardens",
    width: 2400,
    height: 1600,
    position: "center 38%",
  },
  {
    src: "/photos/lavender-oven.jpg",
    alt: "Lavender, cacti and an adobe outdoor oven in the sanctuary garden",
    width: 2400,
    height: 1338,
    position: "center 48%",
  },
  {
    src: "/photos/pond-platform.jpg",
    alt: "A wooden platform extending over a quiet natural pond",
    width: 2400,
    height: 1348,
    position: "center 52%",
  },
];

export const lifePhoto: Photo = {
  src: "/photos/garden-doorway.jpg",
  alt: "A guest stepping into the garden through flowering angel's trumpets",
  width: 1800,
  height: 1002,
  position: "center 45%",
};

export const whyPhoto: Photo = {
  src: "/photos/garden-mountains.jpg",
  alt: "Hampi Sanctuary's garden and cacti beneath the surrounding mountains",
  width: 1800,
  height: 1200,
  position: "center 62%",
};

export const documentaryStill: Photo = {
  src: "/photos/community-conversation.jpg",
  alt: "A community conversation in the garden framed by lavender",
  width: 2400,
  height: 1348,
  position: "center 48%",
};

/**
 * One photograph anchors the whole section. Six separate images made the
 * facets compete with each other and none of them said anything.
 */
export const everydayPhoto: Photo = {
  src: "/photos/pond-afternoon.jpg",
  alt: "People sharing a sunny afternoon around the natural pond",
  width: 2400,
  height: 1348,
  position: "center 52%",
};

export const pathwayPhotos: Photo[] = [
  {
    src: "/photos/garden-harvest.jpg",
    alt: "Fresh squash and tomatoes harvested from the garden",
    width: 990,
    height: 1320,
    position: "center 58%",
  },
  {
    src: "/photos/candlelit-practice.jpg",
    alt: "A restful indoor practice space lit by candles",
    width: 1400,
    height: 934,
    position: "center 52%",
  },
  {
    src: "/photos/quiet-meditation.jpg",
    alt: "A guest meditating quietly among indoor plants",
    width: 1400,
    height: 934,
    position: "center 42%",
  },
];

export const portraits: Photo[] = [
  {
    src: u("photo-1506794778202-cad84cf45f1d", "&w=1000"),
    alt: "Portrait placeholder for Daniel",
    width: 1000,
    height: 1250,
    position: "center 28%",
  },
  {
    /* Cropped from the wider garden photograph, the only supplied frame of
       either founder. Daniel stays a placeholder until a portrait arrives. */
    src: "/photos/andrea-portrait.jpg",
    alt: "Andrea in the gardens at Hampi Sanctuary",
    width: 800,
    height: 1000,
  },
];
