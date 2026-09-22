export type TourismRouteTheme =
  | "Heritage"
  | "Culture"
  | "Nature"
  | "Tea"
  | "Adventure";

export interface TourismRoute {
  id: string;

  title: string;
  shortTitle: string;

  description: string;

  duration: string;
  theme: TourismRouteTheme;

  travelMode: string;

  stopIds: string[];

  verificationStatus:
    | "SCHEMATIC"
    | "ROUTE_VERIFIED";
}

export const tourismRoutes: TourismRoute[] = [
  {
    id: "KDY-ROUTE-001",

    title: "Sacred Kandy Heritage Walk",

    shortTitle: "Sacred Kandy",

    description:
      "Explore the sacred and royal heart of Kandy through temples, royal structures, museum heritage and historic religious landmarks.",

    duration: "Half day",

    theme: "Heritage",

    travelMode: "Walking",

    stopIds: [
      "KDY001",
      "KDY005",
      "KDY004",
      "KDY011",
      "KDY006",
      "KDY009",
      "KDY010",
    ],

    verificationStatus: "SCHEMATIC",
  },

  {
    id: "KDY-ROUTE-002",

    title: "Udunuwara Heritage Triangle",

    shortTitle: "Udunuwara",

    description:
      "A compact cultural journey connecting three exceptional Gampola-era heritage sites west of Kandy.",

    duration: "Half day",

    theme: "Culture",

    travelMode: "Road + walking",

    stopIds: [
      "KDY018",
      "KDY019",
      "KDY020",
    ],

    verificationStatus: "SCHEMATIC",
  },

  {
    id: "KDY-ROUTE-003",

    title: "Peradeniya & Hanthana",

    shortTitle: "Tea & Hanthana",

    description:
      "Connect botanical landscapes, university heritage, Sri Lanka's tea story and the mountain scenery of Hanthana.",

    duration: "Full day",

    theme: "Tea",

    travelMode: "Road + walking",

    stopIds: [
      "KDY014",
      "KDY015",
      "KDY016",
      "KDY017",
    ],

    verificationStatus: "SCHEMATIC",
  },

  {
    id: "KDY-ROUTE-004",

    title: "Knuckles Kandy Gateway",

    shortTitle: "Knuckles",

    description:
      "Travel from Kandy toward the waterfall country around Huluganga and the Bambarella gateway into the Knuckles landscape.",

    duration: "Full day",

    theme: "Adventure",

    travelMode: "Road + hiking",

    stopIds: [
      "KDY001",
      "KDY028",
      "KDY027",
    ],

    verificationStatus: "SCHEMATIC",
  },
];