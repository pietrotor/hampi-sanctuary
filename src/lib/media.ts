export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  /**
   * Where the hero camera starts, before it settles. A positive x begins
   * looking left of the subject; a positive y begins looking below it.
   */
  drift?: { x: string; y: string };
};

/**
 * The client's own photography, resized for the web from the originals in
 * `assets/client-photos/`. Daniel's portrait comes from the WEB-DANI set.
 */

/**
 * Every visit opens on the wide view of the place. A reload advances to the
 * next story, so the photographs after that opening play in a different order.
 */
export const heroSignaturePhoto: Photo = {
  src: "/photos/garden-dogs-run.webp",
  alt: "Andrea running with the dogs through the sunlit gardens",
  width: 3072,
  height: 2048,
  position: "center 42%",
  drift: { x: "0%", y: "2%" },
};

const sanctuaryFacade: Photo = {
  src: "/photos/sanctuary-facade.webp",
  alt: "The sanctuary buildings and gardens beneath the mountains",
  width: 3384,
  height: 1860,
  position: "center 40%",
  drift: { x: "0%", y: "2.4%" },
};

const angelsTrumpetEntrance: Photo = {
  src: "/photos/angels-trumpet-entrance.webp",
  alt: "Trumpet flowers framing a doorway into the sanctuary",
  width: 3362,
  height: 1870,
  position: "center 62%",
  drift: { x: "0%", y: "-2.2%" },
};

const paloSantoCeremony: Photo = {
  src: "/photos/palo-santo-ceremony.webp",
  alt: "A hand lighting palo santo over a row of candles",
  width: 3368,
  height: 1868,
  position: "58% 36%",
  drift: { x: "2.2%", y: "2%" },
};

const lavenderCactusOven: Photo = {
  src: "/photos/lavender-cactus-oven.webp",
  alt: "Lavender and cacti around the adobe oven in the afternoon light",
  width: 3358,
  height: 1874,
  position: "28% 70%",
  drift: { x: "-2.2%", y: "-2%" },
};

const sanPedroBloom: Photo = {
  src: "/photos/san-pedro-bloom.webp",
  alt: "A San Pedro cactus in white bloom",
  width: 3352,
  height: 1878,
  position: "34% 42%",
  drift: { x: "-2.2%", y: "1.5%" },
};

const pondLiliesYellow: Photo = {
  src: "/photos/pond-lilies-yellow.webp",
  alt: "Yellow water lilies opening on the natural pond",
  width: 3404,
  height: 1848,
  position: "32% 68%",
  drift: { x: "-2%", y: "-2.2%" },
};

const lavenderCircleShare: Photo = {
  src: "/photos/lavender-circle-share.webp",
  alt: "A community circle sharing in the garden, framed by lavender",
  width: 3648,
  height: 2048,
  position: "70% 48%",
  drift: { x: "2.4%", y: "0%" },
};

const integrationCandlelight: Photo = {
  src: "/photos/integration-candlelight.webp",
  alt: "Candles and a resting figure during an integration gathering",
  width: 3072,
  height: 2048,
  position: "46% 62%",
  drift: { x: "0%", y: "-2%" },
};

const altarBuddhaOffering: Photo = {
  src: "/photos/altar-buddha-offering.webp",
  alt: "A quiet altar of fruit and flowers around a seated figure",
  width: 3648,
  height: 2048,
  position: "center 48%",
  drift: { x: "0%", y: "2%" },
};

const bonfireCircleNight: Photo = {
  src: "/photos/bonfire-circle-night.webp",
  alt: "Friends gathered around a bonfire at night",
  width: 3386,
  height: 1858,
  position: "center 48%",
  drift: { x: "0%", y: "-1.8%" },
};

const waterfallConnection: Photo = {
  src: "/photos/waterfall-connection.webp",
  alt: "Two people standing in the spray of a waterfall",
  width: 3840,
  height: 2177,
  position: "center 40%",
  drift: { x: "0%", y: "2.4%" },
};

const quietInward: Photo = {
  src: "/photos/quiet-inward.webp",
  alt: "A guest sitting quietly beside a drum and a bunch of lavender",
  width: 3376,
  height: 1864,
  position: "68% 42%",
  drift: { x: "2.2%", y: "1.2%" },
};

const pondReeds: Photo = {
  src: "/photos/pond-reeds.webp",
  alt: "A quiet pond edged with reeds and wooden platforms",
  width: 3304,
  height: 1506,
  position: "center 58%",
  drift: { x: "0%", y: "-2%" },
};

/**
 * Five ways through the same day. Each one opens on the place itself, then
 * uses every other photograph once: arriving through the door, living the
 * day, turning inward, following the water, or sitting with people.
 */
export const heroStories: Photo[][] = [
  [
    sanctuaryFacade,
    angelsTrumpetEntrance,
    heroSignaturePhoto,
    lavenderCactusOven,
    sanPedroBloom,
    pondReeds,
    pondLiliesYellow,
    paloSantoCeremony,
    quietInward,
    lavenderCircleShare,
    integrationCandlelight,
    altarBuddhaOffering,
    bonfireCircleNight,
    waterfallConnection,
  ],
  [
    sanctuaryFacade,
    heroSignaturePhoto,
    lavenderCactusOven,
    sanPedroBloom,
    pondReeds,
    pondLiliesYellow,
    angelsTrumpetEntrance,
    quietInward,
    paloSantoCeremony,
    lavenderCircleShare,
    altarBuddhaOffering,
    integrationCandlelight,
    bonfireCircleNight,
    waterfallConnection,
  ],
  [
    sanctuaryFacade,
    paloSantoCeremony,
    quietInward,
    altarBuddhaOffering,
    integrationCandlelight,
    sanPedroBloom,
    pondLiliesYellow,
    pondReeds,
    angelsTrumpetEntrance,
    lavenderCactusOven,
    heroSignaturePhoto,
    lavenderCircleShare,
    bonfireCircleNight,
    waterfallConnection,
  ],
  [
    sanctuaryFacade,
    pondLiliesYellow,
    pondReeds,
    waterfallConnection,
    angelsTrumpetEntrance,
    heroSignaturePhoto,
    lavenderCactusOven,
    sanPedroBloom,
    paloSantoCeremony,
    quietInward,
    lavenderCircleShare,
    integrationCandlelight,
    altarBuddhaOffering,
    bonfireCircleNight,
  ],
  [
    sanctuaryFacade,
    lavenderCircleShare,
    heroSignaturePhoto,
    angelsTrumpetEntrance,
    lavenderCactusOven,
    pondReeds,
    pondLiliesYellow,
    sanPedroBloom,
    quietInward,
    paloSantoCeremony,
    integrationCandlelight,
    altarBuddhaOffering,
    bonfireCircleNight,
    waterfallConnection,
  ],
];

/** The wide view of the place, also used for link previews. */
export const heroSharePhoto = sanctuaryFacade;

export const lifePhoto: Photo = {
  src: "/photos/1-imagin waking.png",
  alt: "A person resting on the lawn in the garden, with mountains behind",
  width: 1086,
  height: 1448,
  position: "center",
};

export const whyPhoto: Photo = {
  src: "/photos/2-knowing isnt.png",
    alt: "Two people moving on the lawn, one bending forward and one balancing on a trampoline",
    width: 941,
    height: 1672,
    position: "center 46%",
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

export const plantMedicinePhoto: Photo = {
  src: "/photos/11- plant medicine.png",
  alt: "A person drinking beside a lit candle",
  width: 1680,
  height: 936,
  position: "center",
};

export const pathwayPhotos: Photo[] = [
  {
    src: "/photos/garden-work.webp",
    alt: "Working from a chair in the garden at Hampi Sanctuary",
    width: 1760,
    height: 1320,
    position: "center 42%",
  },
  {
    src: "/photos/10- Transformation.png",
    alt: "A woman resting among yellow water lilies in the pond",
    width: 1692,
    height: 930,
    position: "center",
  },
  {
    src: "/photos/9- volunteer.png",
    alt: "A person carrying freshly cut plants through the garden",
    width: 1688,
    height: 932,
    position: "center",
  },
];

export const everydayCategoryPhotos: Photo[] = [
  {
    src: "/photos/3-nourishing food.JPG",
    alt: "A fresh bowl of beans, avocado, tomato and seeds",
    width: 683,
    height: 1024,
    position: "center 48%",
  },
  {
    src: "/photos/4-daily practices.png",
    alt: "A guided meditation practice at Hampi Sanctuary",
    width: 683,
    height: 1024,
    position: "center 58%",
  },
  {
    src: "/photos/5-garden nature.png",
    alt: "Friends sitting together among the gardens and cacti",
    width: 819,
    height: 454,
    position: "center 48%",
  },
  {
    src: "/photos/6-sauna Cold.png",
    alt: "A guest emerging from cold water in the natural pond",
    width: 819,
    height: 460,
    position: "center 48%",
  },
  {
    src: "/photos/7- comunidad.png",
    alt: "Friends smiling together after swimming at Hampi Sanctuary",
    width: 819,
    height: 546,
    position: "center 48%",
  },
  {
    src: "/photos/8- integration Support copy.png",
    alt: "A quiet moment of reflection and personal support",
    width: 1056,
    height: 594,
    position: "center 48%",
  },
];

export const peoplePhoto: Photo = {
  src: "/photos/daniel-andrea.webp",
  alt: "Daniel and Andrea together in the garden at Hampi Sanctuary",
  width: 1086,
  height: 1448,
  position: "center 42%",
};

/** Every site photograph, once each — for the image sitemap. */
export const sitePhotos: Photo[] = [
  heroSharePhoto,
  ...heroStories.flat(),
  lifePhoto,
  whyPhoto,
  documentaryStill,
  everydayPhoto,
  ...everydayCategoryPhotos,
  ...pathwayPhotos,
  plantMedicinePhoto,
  peoplePhoto,
].filter(
  (photo, index, list) =>
    list.findIndex((entry) => entry.src === photo.src) === index,
);
