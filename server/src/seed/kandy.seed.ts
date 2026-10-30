import "dotenv/config";

import {
  connectDatabase,
  disconnectDatabase,
} from "../config/db.js";

import { Attraction } from "../models/Attraction.js";

async function seedKandy(): Promise<void> {
  try {
    await connectDatabase();

    const temple = {
      attractionId: "KDY001",

      slug:
        "temple-of-the-sacred-tooth-relic",

      name:
        "Temple of the Sacred Tooth Relic",

      shortName:
        "Sri Dalada Maligawa",

      category:
        "Sacred Heritage",

    mapCategory: 
        "Heritage",

      province:
        "Central Province",

      district:
        "Kandy",

      area:
        "Kandy City",

      coordinates: {
        latitude: 7.2939,

        longitude: 80.6386,

        accuracy:
          "OFFICIAL",

        pointType:
          "SITE_REFERENCE",

        source:
          "Sri Dalada Maligawa",
      },

      tagline:
        "At the spiritual heart of Kandy, one of Sri Lanka's most important living sacred places.",

      shortDescription:
        "Sri Lanka's most important Buddhist pilgrimage site and the spiritual heart of historic Kandy.",

      description:
        "Sri Dalada Maligawa, the Temple of the Sacred Tooth Relic, stands at the centre of Kandy's historic royal and religious precinct. It is an active place of worship rather than simply a monument, so a visit combines architecture, history, ritual, living Buddhist tradition and the atmosphere of Sri Lanka's last royal capital.",

      visitDuration:
        "1.5–2.5 hours",

      highlights: [
        "Temple of the Sacred Tooth Relic",
        "Historic Kandyan royal precinct",
        "Daily Thewawa rituals",
        "Dalada Museum",
        "World Buddhist Museum",
        "Tusker Museum",
        "Royal Elephant Stable",
      ],

      openingHours: {
        days:
          "Monday – Sunday",

        open:
          "05:30",

        close:
          "20:00",

        timezone:
          "Asia/Colombo",
      },

      schedules: [
        {
          label:
            "Early Morning Service",

          time:
            "05:30 – 07:00",

          description:
            "The first daily Thewawa period.",
        },

        {
          label:
            "Middle Morning Service",

          time:
            "09:30 – 11:00",

          description:
            "The middle-morning Thewawa period.",
        },

        {
          label:
            "Evening Service",

          time:
            "18:30 – 20:00",

          description:
            "The evening Thewawa period.",
        },
      ],

      prices: [
        {
          label:
            "SAARC Countries",

          amount:
            "LKR 2,500",

          note:
            "Foreign visitor ticket",
        },

        {
          label:
            "Thailand & Myanmar",

          amount:
            "LKR 2,500",

          note:
            "Foreign visitor ticket",
        },

        {
          label:
            "Other Countries",

          amount:
            "LKR 3,000",

          note:
            "Foreign visitor ticket",
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

        "Foreign visitor tickets should be obtained only through official Sri Dalada Maligawa ticket facilities.",
      ],

      facilities: [
        {
          title:
            "Foreign visitor guidance",

          description:
            "Guidance services are available for foreign visitors.",
        },

        {
          title:
            "Wi-Fi",

          description:
            "Wi-Fi facilities are listed among the temple's visitor services.",
        },

        {
          title:
            "Sanitary facilities",

          description:
            "Visitor sanitary facilities are available within the temple service infrastructure.",
        },

        {
          title:
            "Special assistance",

          description:
            "Assistance is listed for devotees and visitors requiring additional support.",
        },

        {
          title:
            "3D navigation boards",

          description:
            "Navigation and orientation boards are provided within the visitor environment.",
        },
      ],

      transport: {
        locationSummary:
          "Located in the historic centre of Kandy beside Kandy Lake.",

        roadAccess:
          "Road access is available into central Kandy. Access restrictions can change during major religious events and the Esala Perahera period.",

        walking:
          "The temple is within Kandy's central heritage precinct and can be combined on foot with Kandy Lake, the Royal Palace area, museums and nearby devalayas.",

        publicTransport:
          "Kandy is served by railway and bus services. The final central-city leg can be completed on foot or by local road transport.",

        parking:
          "Parking arrangements vary according to traffic restrictions, religious events and crowd conditions. Event-specific official guidance should take priority.",
      },

      accessibility: {
        status:
          "Assistance available",

        description:
          "The official temple website lists modernized pathways and assistance for special devotees. Exact step-free access through every internal section is not confirmed in this dataset, so visitors with specific mobility requirements should verify assistance on arrival.",
      },

      safety: {
        security:
          "All persons entering the Temple of the Sacred Tooth Relic are screened at the entrance. Carried items are also checked.",

        contacts: [
          {
            label:
              "Sri Dalada Maligawa",

            value:
              "+94 81 223 4226",

            href:
              "tel:+94812234226",
          },

          {
            label:
              "Temple Police Station",

            value:
              "+94 81 222 5722",

            href:
              "tel:+94812225722",
          },

          {
            label:
              "Sri Lanka Police Emergency",

            value:
              "119",

            href:
              "tel:119",
          },

          {
            label:
              "Emergency Ambulance",

            value:
              "1990",

            href:
              "tel:1990",
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
          id:
            "KDY003",

          name:
            "Kandy Lake",

          category:
            "Nature & Heritage",
        },

        {
          id:
            "KDY004",

          name:
            "Royal Palace of Kandy",

          category:
            "Royal Heritage",
        },

        {
          id:
            "KDY005",

          name:
            "Magul Maduwa",

          category:
            "Royal Heritage",
        },

        {
          id:
            "KDY006",

          name:
            "Natha Devalaya",

          category:
            "Religious Heritage",
        },

        {
          id:
            "KDY011",

          name:
            "Kandy National Museum",

          category:
            "Museum",
        },

        {
          id:
            "KDY012",

          name:
            "Udawatta Kele Sanctuary",

          category:
            "Nature",
        },
      ],

      verified: true,

      verificationStatus:
        "VERIFIED_OFFICIAL",

      sources: [
        {
          title:
            "Visitor FAQ",

          organization:
            "Sri Dalada Maligawa",

          url:
            "https://sridaladamaligawa.lk/faq/",

          verifiedAt:
            new Date(
              "2026-10-30"
            ),
        },

        {
          title:
            "Official Contact Information",

          organization:
            "Sri Dalada Maligawa",

          url:
            "https://sridaladamaligawa.lk/contact/",

          verifiedAt:
            new Date(
              "2026-10-30"
            ),
        },

        {
          title:
            "Official Temple Website",

          organization:
            "Sri Dalada Maligawa",

          url:
            "https://sridaladamaligawa.lk/",

          verifiedAt:
            new Date(
              "2026-10-30"
            ),
        },
      ],

      lastVerifiedAt:
        new Date(
          "2026-10-30"
        ),

      featured: true,

      published: true,
    };

    const result =
      await Attraction.findOneAndUpdate(
        {
          attractionId:
            "KDY001",
        },

        {
          $set: temple,
        },

        {
          upsert: true,

          new: true,

          runValidators: true,

          setDefaultsOnInsert:
            true,
        }
      );

    console.log("");
    console.log(
      "========================================"
    );

    console.log(
      " Kandy Seed Complete"
    );

    console.log(
      "========================================"
    );

    console.log(
      `ID: ${result.attractionId}`
    );

    console.log(
      `Name: ${result.name}`
    );

    console.log(
      `MongoDB: ${result._id}`
    );

    console.log(
      "Verification: VERIFIED_OFFICIAL"
    );

    console.log(
      "========================================"
    );

    console.log("");
  } catch (error) {
    console.error(
      "Kandy seed failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

void seedKandy();