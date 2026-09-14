export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

const u = (id: string, extra = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70${extra}`;

export const heroPhotos: Photo[] = [
  {
    src: u("photo-1469474968028-56623f02e42e", "&w=2400"),
    alt: "Morning light across a quiet valley of trees",
    width: 2400,
    height: 1600,
    position: "center 55%",
  },
  {
    src: u("photo-1441974231531-c6227db76b6e", "&w=2400"),
    alt: "A sunlit forest path with tall trees",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1500530855697-b586d89ba3ee", "&w=2400"),
    alt: "Open hills under a pale sky",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1470071459604-3b5ec3a7fe05", "&w=2400"),
    alt: "Mist moving through a green landscape",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1426604966848-d7adac402bff", "&w=2400"),
    alt: "Still water reflecting surrounding trees",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1470252649378-9c29740c9fa8", "&w=2400"),
    alt: "Warm light at the edge of a wooded ridge",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1418065460487-3e41a6c84dc5", "&w=2400"),
    alt: "A dense canopy of trees in natural light",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1502082553048-f009c37129b9", "&w=2400"),
    alt: "Low plants and open ground in soft daylight",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1447752875215-b2761acb3c5d", "&w=2400"),
    alt: "A quiet woodland clearing",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1511497584788-876760111969", "&w=2400"),
    alt: "Tall forest trunks in filtered light",
    width: 2400,
    height: 1600,
  },
  {
    src: u("photo-1542273917363-3b1817f69a2d", "&w=2400"),
    alt: "A path through mature trees",
    width: 2400,
    height: 1600,
  },
];

export const lifePhoto: Photo = {
  src: u("photo-1478144592103-25e218a04891", "&w=1800"),
  alt: "A simple table set for a shared meal in natural light",
  width: 1800,
  height: 1350,
  position: "center",
};

export const whyPhoto: Photo = {
  src: u("photo-1449158743715-0a90ebb6d2d8", "&w=1800"),
  alt: "A modest house surrounded by trees and open land",
  width: 1800,
  height: 1350,
  position: "center",
};

export const documentaryStill: Photo = {
  src: u("photo-1529156069898-49953e39b3ac", "&w=2000"),
  alt: "People gathered outdoors in unposed conversation at dusk",
  width: 2000,
  height: 1125,
  position: "center 42%",
};

export const everydayPhotos: Photo[] = [
  {
    src: u("photo-1512621776951-a57141f2eefd", "&w=1200"),
    alt: "Simple communal food prepared with fresh vegetables",
    width: 1200,
    height: 900,
    position: "center",
  },
  {
    src: u("photo-1544367567-0f2fcb009e0b", "&w=1200"),
    alt: "A person moving slowly outdoors at their own pace",
    width: 1200,
    height: 900,
    position: "center 35%",
  },
  {
    src: u("photo-1585320806297-9794b3e4eeae", "&w=1200"),
    alt: "Edible plants growing in an outdoor garden",
    width: 1200,
    height: 900,
    position: "center",
  },
  {
    src: u("photo-1540555700478-4be289fbecef", "&w=1200"),
    alt: "A wood-lined sauna interior in quiet light",
    width: 1200,
    height: 900,
    position: "center",
  },
  {
    src: u("photo-1511632765486-a01980e01a18", "&w=1200"),
    alt: "A small group sharing time outdoors",
    width: 1200,
    height: 900,
    position: "center 35%",
  },
  {
    src: u("photo-1481627834876-b7833e8f5570", "&w=1200"),
    alt: "A quiet indoor space for reading and reflection",
    width: 1200,
    height: 900,
    position: "center",
  },
];

export const pathwayPhotos: Photo[] = [
  {
    src: u("photo-1464226184884-fa280b87c399", "&w=1400"),
    alt: "Hands working with soil and plants",
    width: 1400,
    height: 1050,
    position: "center",
  },
  {
    src: u("photo-1454165804606-c3d57bc86b40", "&w=1400"),
    alt: "A laptop and notebook on a table beside a window",
    width: 1400,
    height: 1050,
    position: "center",
  },
  {
    src: u("photo-1506126613408-eca07ce68773", "&w=1400"),
    alt: "A person sitting quietly outdoors in natural light",
    width: 1400,
    height: 1050,
    position: "center 38%",
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
    src: u("photo-1531123897727-8f129e1688ce", "&w=1000"),
    alt: "Portrait placeholder for Andrea",
    width: 1000,
    height: 1250,
    position: "center 25%",
  },
];
