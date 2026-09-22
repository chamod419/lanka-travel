import type { MapPlace } from "@/types/tourism";

export const mapPlaces: MapPlace[] = [
  {
    id: "kandy",
    name: "Kandy",
    region: "Central Province",
    latitude: 7.2906,
    longitude: 80.6337,
    category: "Heritage",
    shortDescription:
      "Sri Lanka's sacred hill capital, where royal history, temples, forests, tea and mountain journeys meet.",
    verified: true,
    experienceCount: 30,
    pilot: true,
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    region: "Central Sri Lanka",
    latitude: 7.957,
    longitude: 80.7603,
    category: "Heritage",
    shortDescription:
      "An ancient rock fortress rising dramatically above Sri Lanka's central plains.",
    verified: false,
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    region: "North Central Province",
    latitude: 8.3114,
    longitude: 80.4037,
    category: "Heritage",
    shortDescription:
      "Ancient monuments, sacred Buddhist heritage and one of Sri Lanka's great historic capitals.",
    verified: false,
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    region: "Central Province",
    latitude: 6.9497,
    longitude: 80.7891,
    category: "Tea",
    shortDescription:
      "Cool highlands, tea estates and rolling green landscapes in Sri Lanka's mountain country.",
    verified: false,
  },
  {
    id: "ella",
    name: "Ella",
    region: "Uva Province",
    latitude: 6.8667,
    longitude: 81.0466,
    category: "Mountains",
    shortDescription:
      "Mountain trails, railway journeys and dramatic valleys in Sri Lanka's central highlands.",
    verified: false,
  },
  {
    id: "yala",
    name: "Yala",
    region: "Southern Sri Lanka",
    latitude: 6.3725,
    longitude: 81.5185,
    category: "Wildlife",
    shortDescription:
      "A dramatic wilderness landscape known for wildlife, forest and open plains.",
    verified: false,
  },
  {
    id: "galle",
    name: "Galle",
    region: "Southern Province",
    latitude: 6.0329,
    longitude: 80.2168,
    category: "Heritage",
    shortDescription:
      "Historic coastal streets, ocean views and one of Sri Lanka's best-known fortified cities.",
    verified: false,
  },
  {
    id: "arugam-bay",
    name: "Arugam Bay",
    region: "Eastern Province",
    latitude: 6.8404,
    longitude: 81.8368,
    category: "Beaches",
    shortDescription:
      "A laid-back eastern coast destination known for surf, beaches and tropical scenery.",
    verified: false,
  },
];