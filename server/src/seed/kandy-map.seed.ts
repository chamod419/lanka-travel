import "dotenv/config";

import {
  connectDatabase,
  disconnectDatabase,
} from "../config/db.js";

import {
  Attraction,
} from "../models/Attraction.js";

const kandyMapRecords = [
  {
    attractionId: "KDY001",
    slug: "temple-of-the-sacred-tooth-relic",
    name: "Temple of the Sacred Tooth Relic",
    category: "Sacred Heritage",
    mapCategory: "Heritage",
    area: "Kandy City",
    latitude: 7.2939,
    longitude: 80.6386,
    accuracy: "OFFICIAL",
    pointType: "SITE_REFERENCE",
    source: "Sri Dalada Maligawa",
    description:
      "Sri Lanka's most important Buddhist pilgrimage site and the spiritual heart of historic Kandy.",
    duration: "1.5–2.5 hours",
    featured: true,
    verificationStatus: "VERIFIED_OFFICIAL",
  },

  {
    attractionId: "KDY002",
    slug: "sacred-city-of-kandy",
    name: "Sacred City of Kandy",
    category: "World Heritage",
    mapCategory: "Heritage",
    area: "Kandy City",
    latitude: 7.293611,
    longitude: 80.640278,
    accuracy: "OFFICIAL",
    pointType: "AREA_REFERENCE",
    source: "UNESCO",
    description:
      "The historic sacred city and former royal capital recognized as a UNESCO World Heritage property.",
    duration: "Half day",
    featured: true,
    verificationStatus: "VERIFIED_OFFICIAL",
  },

  {
    attractionId: "KDY003",
    slug: "kandy-lake",
    name: "Kandy Lake",
    category: "Nature & Heritage",
    mapCategory: "Nature",
    area: "Kandy City",
    latitude: 7.291739,
    longitude: 80.639639,
    accuracy: "AUTHORITATIVE_DATASET",
    pointType: "SITE_CENTROID",
    source: "Wikidata",
    description:
      "The historic lake at the heart of Kandy, ideal for a relaxed walk through the city's sacred precinct.",
    duration: "30–60 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY004",
    slug: "royal-palace-of-kandy",
    name: "Royal Palace of Kandy",
    category: "Royal Heritage",
    mapCategory: "Heritage",
    area: "Kandy City",
    latitude: 7.29474,
    longitude: 80.64114,
    accuracy: "AUTHORITATIVE_DATASET",
    pointType: "BUILDING",
    source: "Wikidata / OpenStreetMap",
    description:
      "Part of the former Kandyan royal complex beside the Temple of the Sacred Tooth Relic.",
    duration: "45–90 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY005",
    slug: "magul-maduwa",
    name: "Magul Maduwa",
    category: "Royal Heritage",
    mapCategory: "Heritage",
    area: "Temple Square",
    latitude: 7.29401,
    longitude: 80.64147,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "OpenStreetMap",
    description:
      "The historic royal audience hall of the Kandyan kingdom.",
    duration: "20–40 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY006",
    slug: "natha-devalaya",
    name: "Natha Devalaya",
    category: "Religious Heritage",
    mapCategory: "Religious",
    area: "Temple Square",
    latitude: 7.2938554,
    longitude: 80.6404412,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "OpenStreetMap",
    description:
      "One of Kandy's historic devalayas within the sacred royal precinct.",
    duration: "20–30 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY007",
    slug: "maha-vishnu-devalaya",
    name: "Maha Vishnu Devalaya",
    category: "Religious Heritage",
    mapCategory: "Religious",
    area: "Kandy City",
    latitude: 7.2951378,
    longitude: 80.6402866,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "OpenStreetMap",
    description:
      "A historic Hindu-Buddhist shrine closely connected with Kandy's religious traditions.",
    duration: "20–30 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY008",
    slug: "kataragama-devalaya-kandy",
    name: "Kataragama Devalaya",
    category: "Religious Heritage",
    mapCategory: "Religious",
    area: "Kandy City",
    latitude: 7.29389,
    longitude: 80.63646,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "OpenStreetMap",
    description:
      "A historic shrine in central Kandy dedicated to the deity Kataragama.",
    duration: "20–30 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY009",
    slug: "pattini-devalaya-kandy",
    name: "Pattini Devalaya",
    category: "Religious Heritage",
    mapCategory: "Religious",
    area: "Temple Square",
    latitude: 7.2941609,
    longitude: 80.640168,
    accuracy: "SECONDARY_MAP",
    pointType: "BUILDING",
    source: "Secondary map reference",
    description:
      "A traditional shrine associated with the Pattini deity within Kandy's sacred precinct.",
    duration: "20–30 min",
    featured: false,
    verificationStatus: "NEEDS_VERIFICATION",
  },

  {
    attractionId: "KDY010",
    slug: "st-pauls-church-kandy",
    name: "St Paul's Church",
    category: "Colonial Heritage",
    mapCategory: "Heritage",
    area: "Kandy City",
    latitude: 7.294528,
    longitude: 80.639694,
    accuracy: "AUTHORITATIVE_DATASET",
    pointType: "BUILDING",
    source: "Authoritative map dataset",
    description:
      "A landmark Anglican church beside Kandy's sacred royal precinct.",
    duration: "20–30 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY011",
    slug: "kandy-national-museum",
    name: "Kandy National Museum",
    category: "Museum",
    mapCategory: "Museum",
    area: "Kandy City",
    latitude: 7.29326,
    longitude: 80.64214,
    accuracy: "AUTHORITATIVE_DATASET",
    pointType: "BUILDING",
    source: "Authoritative map dataset",
    description:
      "A museum presenting artifacts and history from the Kandyan era.",
    duration: "1–1.5 hours",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY012",
    slug: "udawatta-kele-sanctuary",
    name: "Udawatta Kele Sanctuary",
    category: "Nature Reserve",
    mapCategory: "Nature",
    area: "Kandy City",
    latitude: 7.298878,
    longitude: 80.642403,
    accuracy: "VERIFIED_MAP",
    pointType: "VISITOR_ENTRANCE",
    source: "Verified map reference",
    description:
      "A forest sanctuary rising above Kandy with walking trails, birds and historic forest paths.",
    duration: "2–3 hours",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY013",
    slug: "bahirawakanda-vihara-buddha-statue",
    name: "Bahirawakanda Vihara Buddha Statue",
    category: "Viewpoint & Religious",
    mapCategory: "Viewpoint",
    area: "Bahirawakanda",
    latitude: 7.29558,
    longitude: 80.6309,
    accuracy: "VERIFIED_MAP",
    pointType: "VIEWPOINT",
    source: "Verified map reference",
    description:
      "A hilltop Buddha statue overlooking Kandy city and the surrounding hills.",
    duration: "45–60 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY014",
    slug: "royal-botanic-gardens-peradeniya",
    name: "Royal Botanic Gardens, Peradeniya",
    category: "Botanical Garden",
    mapCategory: "Nature",
    area: "Peradeniya",
    latitude: 7.27111,
    longitude: 80.59556,
    accuracy: "AUTHORITATIVE_DATASET",
    pointType: "SITE_CENTROID",
    source: "Authoritative dataset",
    description:
      "Sri Lanka's celebrated botanical garden, known for tropical collections, palms and expansive landscaped grounds.",
    duration: "2.5–4 hours",
    featured: true,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY015",
    slug: "university-of-peradeniya",
    name: "University of Peradeniya",
    category: "Campus Heritage",
    mapCategory: "Heritage",
    area: "Peradeniya",
    latitude: 7.25636,
    longitude: 80.59705,
    accuracy: "VERIFIED_MAP",
    pointType: "AREA_REFERENCE",
    source: "Verified map reference",
    description:
      "A scenic university campus known for its architecture, landscapes and historic setting.",
    duration: "1–2 hours",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY016",
    slug: "ceylon-tea-museum",
    name: "Ceylon Tea Museum",
    category: "Tea Museum",
    mapCategory: "Museum",
    area: "Hanthana",
    latitude: 7.26864,
    longitude: 80.63266,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "Verified map reference",
    description:
      "A museum exploring the history, machinery and culture of Sri Lanka's tea industry.",
    duration: "1–2 hours",
    featured: true,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY017",
    slug: "hanthana-mountain-range",
    name: "Hanthana Mountain Range",
    category: "Mountain & Hiking",
    mapCategory: "Hiking",
    area: "Hanthana",
    latitude: 7.25861,
    longitude: 80.62861,
    accuracy: "AUTHORITATIVE_DATASET",
    pointType: "AREA_REFERENCE",
    source: "Authoritative dataset",
    description:
      "A scenic mountain range south of Kandy popular for hiking and panoramic hill-country views.",
    duration: "3–6 hours",
    featured: true,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY018",
    slug: "gadaladeniya-raja-maha-vihara",
    name: "Gadaladeniya Raja Maha Vihara",
    category: "Religious Heritage",
    mapCategory: "Heritage",
    area: "Udunuwara",
    latitude: 7.25727,
    longitude: 80.55614,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "Verified map reference",
    description:
      "A historic temple known for distinctive stone architecture from the Gampola period.",
    duration: "45–60 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY019",
    slug: "lankatilaka-vihara",
    name: "Lankatilaka Vihara",
    category: "Religious Heritage",
    mapCategory: "Heritage",
    area: "Udunuwara",
    latitude: 7.23391,
    longitude: 80.56504,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "Verified map reference",
    description:
      "A major Gampola-period temple dramatically positioned on a rock outcrop.",
    duration: "45–60 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY020",
    slug: "embekke-devalaya",
    name: "Embekke Devalaya",
    category: "Religious Heritage",
    mapCategory: "Heritage",
    area: "Udunuwara",
    latitude: 7.217917,
    longitude: 80.567611,
    accuracy: "VERIFIED_MAP",
    pointType: "SITE_REFERENCE",
    source: "Verified map reference",
    description:
      "A historic shrine renowned for its exceptionally detailed Kandyan-era wooden carvings.",
    duration: "45–60 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY021",
    slug: "ambuluwawa-biodiversity-complex",
    name: "Ambuluwawa",
    category: "Viewpoint",
    mapCategory: "Viewpoint",
    area: "Gampola",
    latitude: 7.16152,
    longitude: 80.54736,
    accuracy: "VERIFIED_MAP",
    pointType: "SITE_REFERENCE",
    source: "OpenStreetMap / Ambuluwawa Tower",
    description:
      "A mountain-top biodiversity complex famous for its spiral tower and panoramic views.",
    duration: "2–3 hours",
    featured: true,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY022",
    slug: "balana-fort",
    name: "Balana Fort",
    category: "Historic Site",
    mapCategory: "Hiking",
    area: "Balana",
    latitude: 7.270409,
    longitude: 80.475876,
    accuracy: "SECONDARY_MAP",
    pointType: "SITE_REFERENCE",
    source: "Secondary map reference — field verification recommended",
    description:
      "A strategic historic mountain pass and fort site associated with the defence of the Kandyan kingdom.",
    duration: "1–2 hours",
    featured: false,
    verificationStatus: "NEEDS_VERIFICATION",
  },

  {
    attractionId: "KDY023",
    slug: "alagalla-mountain-range",
    name: "Alagalla Mountain Range",
    category: "Mountain & Hiking",
    mapCategory: "Hiking",
    area: "Alagalla",
    latitude: 7.25333,
    longitude: 80.44639,
    accuracy: "SECONDARY_MAP",
    pointType: "AREA_REFERENCE",
    source: "Secondary map reference",
    description:
      "A rugged mountain range west of Kandy offering challenging hikes and broad views.",
    duration: "4–7 hours",
    featured: false,
    verificationStatus: "NEEDS_VERIFICATION",
  },

  {
    attractionId: "KDY024",
    slug: "loolecondera-tea-estate",
    name: "Loolecondera Tea Estate",
    category: "Tea Heritage",
    mapCategory: "Tea",
    area: "Central Highlands",
    latitude: 7.122,
    longitude: 80.7139,
    accuracy: "AUTHORITATIVE_DATASET",
    pointType: "AREA_REFERENCE",
    source: "GeoNames / Wikidata",
    description:
      "A pioneering tea estate associated with the beginnings of Sri Lanka's commercial tea industry.",
    duration: "2–4 hours",
    featured: false,
    verificationStatus: "NEEDS_VERIFICATION",
  },

  {
    attractionId: "KDY025",
    slug: "ranawana-purana-raja-maha-vihara",
    name: "Ranawana Raja Maha Vihara",
    category: "Religious Site",
    mapCategory: "Religious",
    area: "Ranawana",
    latitude: 7.27141,
    longitude: 80.56412,
    accuracy: "VERIFIED_MAP",
    pointType: "SITE_REFERENCE",
    source: "Verified map reference",
    description:
      "A Buddhist temple complex west of Kandy known for its peaceful setting and large religious sculptures.",
    duration: "1–1.5 hours",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY026",
    slug: "gatambe-raja-maha-vihara",
    name: "Gatambe Temple",
    category: "Religious Site",
    mapCategory: "Religious",
    area: "Gatambe",
    latitude: 7.26757,
    longitude: 80.60078,
    accuracy: "VERIFIED_MAP",
    pointType: "BUILDING",
    source: "Verified map reference",
    description:
      "A prominent Buddhist temple beside the Mahaweli River near Peradeniya.",
    duration: "30–45 min",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY027",
    slug: "knuckles-kandy-gateway",
    name: "Knuckles — Kandy Gateway",
    category: "Adventure Gateway",
    mapCategory: "Hiking",
    area: "Bambarella",
    latitude: 7.40525,
    longitude: 80.77814,
    accuracy: "VERIFIED_MAP",
    pointType: "GATEWAY",
    source: "Bambarella transport reference point",
    description:
      "A practical Kandy-side gateway toward hiking landscapes in the Knuckles mountain region.",
    duration: "Full day",
    featured: true,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY028",
    slug: "panwila-huluganga-waterfall-corridor",
    name: "Panwila–Huluganga Waterfall Corridor",
    category: "Waterfall & Nature",
    mapCategory: "Nature",
    area: "Panwila / Huluganga",
    latitude: 7.40107,
    longitude: 80.74215,
    accuracy: "VERIFIED_MAP",
    pointType: "AREA_REFERENCE",
    source: "Huluganga Ella corridor reference",
    description:
      "A scenic waterfall and highland corridor leading toward the Knuckles region.",
    duration: "Half day",
    featured: false,
    verificationStatus: "VERIFIED_MULTI_SOURCE",
  },

  {
    attractionId: "KDY029",
    slug: "fort-seetha-seetha-kotuwa",
    name: "Fort Seetha / Seetha Kotuwa",
    category: "Historic & Legendary Site",
    mapCategory: "Heritage",
    area: "Eastern Kandy Highlands",
    latitude: 7.35,
    longitude: 80.93333,
    accuracy: "SECONDARY_MAP",
    pointType: "SITE_REFERENCE",
    source: "Secondary map reference",
    description:
      "A site associated with regional history and traditional narratives in the eastern highlands.",
    duration: "1–2 hours",
    featured: false,
    verificationStatus: "NEEDS_VERIFICATION",
  },

  {
    attractionId: "KDY030",
    slug: "kandy-esala-perahera",
    name: "Kandy Esala Perahera",
    category: "Cultural Event",
    mapCategory: "Heritage",
    area: "Kandy City",
    latitude: 7.2939,
    longitude: 80.6386,
    accuracy: "OFFICIAL",
    pointType: "EVENT_REFERENCE",
    source: "Temple precinct event reference",
    description:
      "Kandy's celebrated annual procession combining Buddhist ritual, traditional performance and living cultural heritage.",
    duration: "Event dependent",
    featured: true,
    verificationStatus: "VERIFIED_OFFICIAL",
  },
] as const;

async function seedKandyMap(): Promise<void> {
  try {
    await connectDatabase();

    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      " Kandy Map Seed Started"
    );

    console.log(
      "========================================"
    );

    for (
      const record of
      kandyMapRecords
    ) {
      await Attraction.findOneAndUpdate(
        {
          attractionId:
            record.attractionId,
        },

        {
          $set: {
            attractionId:
              record.attractionId,

            slug:
              record.slug,

            name:
              record.name,

            category:
              record.category,

            mapCategory:
              record.mapCategory,

            province:
              "Central Province",

            district:
              "Kandy",

            area:
              record.area,

            coordinates: {
              latitude:
                record.latitude,

              longitude:
                record.longitude,

              accuracy:
                record.accuracy,

              pointType:
                record.pointType,

              source:
                record.source,
            },

            shortDescription:
              record.description,

            visitDuration:
              record.duration,

            verified: true,

            verificationStatus:
              record.verificationStatus,

            featured:
              record.featured,

            published:
              true,
          },

          /*
            Defaults only apply to new records.
            Existing KDY001 full-detail data
            remains untouched except for the
            fields explicitly updated above.
          */
          $setOnInsert: {
            highlights: [],

            schedules: [],

            prices: [],

            ticketIncludes: [],

            visitorGuidelines: [],

            facilities: [],

            nearby: [],

            sources: [],
          },
        },

        {
          upsert: true,

          new: true,

          runValidators: true,

          setDefaultsOnInsert:
            true,
        }
      );

      console.log(
        `✓ ${record.attractionId} — ${record.name}`
      );
    }

    const count =
      await Attraction.countDocuments({
        district: "Kandy",
        published: true,
      });

    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      " Kandy Map Seed Complete"
    );

    console.log(
      "========================================"
    );

    console.log(
      `Published Kandy records: ${count}`
    );

    console.log(
      "Expected: 30"
    );

    console.log(
      "========================================"
    );

    console.log("");
  } catch (error) {
    console.error("");
    console.error(
      "Kandy map seed failed:"
    );

    console.error(
      error
    );

    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

void seedKandyMap();