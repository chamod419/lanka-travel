import type { AttractionDetail } from "@/types/attraction-detail";

export const attractionDetails: AttractionDetail[] = [
  {
    id: "KDY001",

    slug: "temple-of-the-sacred-tooth-relic",

    name: "Temple of the Sacred Tooth Relic",

    shortName: "Sri Dalada Maligawa",

    category: "Sacred Heritage",

    district: "Kandy",

    province: "Central Province",

    area: "Kandy City",

    latitude: 7.2939,

    longitude: 80.6386,

    tagline:
      "At the spiritual heart of Kandy, one of Sri Lanka's most important living sacred places.",

    description:
      "Sri Dalada Maligawa, the Temple of the Sacred Tooth Relic, stands at the centre of Kandy's historic royal and religious precinct. It is an active place of worship rather than simply a monument, so a visit combines architecture, history, ritual, living Buddhist tradition and the atmosphere of Sri Lanka's last royal capital.",

    highlights: [
      "Temple of the Sacred Tooth Relic",
      "Historic Kandyan royal precinct",
      "Daily Thewawa rituals",
      "Dalada Museum",
      "World Buddhist Museum",
      "Tusker Museum",
      "Royal Elephant Stable",
    ],

    visitDuration: "1.5–2.5 hours",

    openingHours: {
      days: "Monday – Sunday",
      open: "05:30",
      close: "20:00",
      timezone: "Sri Lanka Time · UTC+05:30",
    },

    schedules: [
      {
        label: "Early Morning Service",
        time: "05:30 – 07:00",
        description:
          "The first daily Thewawa period.",
      },
      {
        label: "Middle Morning Service",
        time: "09:30 – 11:00",
        description:
          "The middle-morning Thewawa period.",
      },
      {
        label: "Evening Service",
        time: "18:30 – 20:00",
        description:
          "The evening Thewawa period.",
      },
    ],

    prices: [
      {
        label: "SAARC Countries",
        amount: "LKR 2,500",
        note: "Foreign visitor ticket",
      },
      {
        label: "Thailand & Myanmar",
        amount: "LKR 2,500",
        note: "Foreign visitor ticket",
      },
      {
        label: "Other Countries",
        amount: "LKR 3,000",
        note: "Foreign visitor ticket",
      },
    ],

    ticketIncludes: [
      "Temple of the Sacred Tooth Relic",
      "Dalada Museum",
      "World Buddhist Museum",
      "Tusker Museum",
      "Royal Elephant Stable",
    ],

    visitorGuidelines: [
      "Wear respectful clothing that covers shoulders and knees.",
      "Shorts, sleeveless clothing and body-revealing clothing are not permitted.",
      "Footwear should be handed over at the designated reception or shoe counter before entering.",
      "Large bags and unnecessary parcels should be handed over at the designated booth.",
      "All visitors and carried items are subject to security screening.",
      "Avoid bringing polythene and plastic into the temple premises.",
      "Pets are not permitted.",
      "Foreign visitor tickets should be obtained only through the official ticket machines at the temple.",
    ],

    facilities: [
      {
        title: "Foreign visitor guidance",
        description:
          "Guidance services are available for foreign visitors.",
      },
      {
        title: "Wi-Fi",
        description:
          "The temple lists Wi-Fi facilities among its visitor services.",
      },
      {
        title: "Sanitary facilities",
        description:
          "Visitor sanitary facilities are available within the temple service infrastructure.",
      },
      {
        title: "Special assistance",
        description:
          "The temple lists assistance for visitors requiring additional support.",
      },
      {
        title: "3D navigation boards",
        description:
          "Navigation and orientation boards are provided within the visitor environment.",
      },
    ],

    transport: {
      locationSummary:
        "Located in the historic centre of Kandy beside Kandy Lake.",

      roadAccess:
        "Road access is available into central Kandy, but traffic and access controls can change during major religious events and the Esala Perahera period.",

      walking:
        "The temple is within Kandy's central heritage precinct and is suitable for combining with Kandy Lake, the Royal Palace area, museums and nearby devalayas on foot.",

      publicTransport:
        "Kandy is served by railway and bus services. The final central-city leg can be completed on foot or by local road transport.",

      parking:
        "Parking arrangements can vary according to traffic restrictions, religious events and crowd conditions. Event-specific official parking plans should override normal guidance.",
    },

    accessibility: {
      status: "Assistance available",

      description:
        "The official temple website lists modernized pathways and assistance for special devotees. Exact step-free access through every internal section is not confirmed in our dataset yet, so visitors with specific mobility requirements should verify assistance on arrival.",
    },

    safety: {
      security:
        "All persons entering the temple are screened at the entrance. Bags and carried items are also checked.",

      contacts: [
        {
          label: "Sri Dalada Maligawa",
          value: "+94 81 223 4226",
          href: "tel:+94812234226",
        },
        {
          label: "Temple Police Station",
          value: "+94 81 222 5722",
          href: "tel:+94812225722",
        },
        {
          label: "Sri Lanka Police Emergency",
          value: "119",
          href: "tel:119",
        },
        {
          label: "Emergency Ambulance",
          value: "1990",
          href: "tel:1990",
        },
      ],
    },

    contact: {
      address:
        "Sri Dalada Maligawa, Kandy 20000, Sri Lanka",

      phone: [
        "+94 81 223 4226",
        "+94 81 220 5901",
      ],

      email:
        "info@sridaladamaligawa.lk",
    },

    nearby: [
      {
        id: "KDY003",
        name: "Kandy Lake",
        category: "Nature & Heritage",
      },
      {
        id: "KDY004",
        name: "Royal Palace of Kandy",
        category: "Royal Heritage",
      },
      {
        id: "KDY005",
        name: "Magul Maduwa",
        category: "Royal Heritage",
      },
      {
        id: "KDY006",
        name: "Natha Devalaya",
        category: "Religious Heritage",
      },
      {
        id: "KDY011",
        name: "Kandy National Museum",
        category: "Museum",
      },
      {
        id: "KDY012",
        name: "Udawatta Kele Sanctuary",
        category: "Nature",
      },
    ],

    sources: [
      {
        title: "Visitor FAQ",
        organization:
          "Sri Dalada Maligawa",
        url: "https://sridaladamaligawa.lk/faq/",
        verifiedAt: "2026-09-22",
      },
      {
        title: "Official Contact Information",
        organization:
          "Sri Dalada Maligawa",
        url: "https://sridaladamaligawa.lk/contact/",
        verifiedAt: "2026-09-22",
      },
      {
        title: "Official Temple Website",
        organization:
          "Sri Dalada Maligawa",
        url: "https://sridaladamaligawa.lk/",
        verifiedAt: "2026-09-22",
      },
    ],

    verifiedAt: "2026-09-22",
  },
];

export function getAttractionBySlug(
  slug: string
): AttractionDetail | undefined {
  return attractionDetails.find(
    (attraction) =>
      attraction.slug === slug
  );
}