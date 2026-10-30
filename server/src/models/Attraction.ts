import mongoose, {
  Schema,
  model,
  type InferSchemaType,
} from "mongoose";

/* =========================================================
   SOURCE
========================================================= */

const sourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    verifiedAt: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   COORDINATES
========================================================= */

const coordinateSchema = new Schema(
  {
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },

    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },

    accuracy: {
      type: String,
      required: true,

      enum: [
        "OFFICIAL",
        "AUTHORITATIVE_DATASET",
        "VERIFIED_MAP",
        "SECONDARY_MAP",
        "APPROXIMATE",
        "PENDING",
      ],
    },

    pointType: {
      type: String,
      required: true,

      enum: [
        "SITE_REFERENCE",
        "SITE_CENTROID",
        "BUILDING",
        "VISITOR_ENTRANCE",
        "VIEWPOINT",
        "EVENT_REFERENCE",
        "AREA_REFERENCE",
        "GATEWAY",
      ],
    },

    source: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   OPENING HOURS
========================================================= */

const openingHoursSchema = new Schema(
  {
    days: {
      type: String,
      required: true,
      trim: true,
    },

    open: {
      type: String,
      required: true,
      trim: true,
    },

    close: {
      type: String,
      required: true,
      trim: true,
    },

    timezone: {
      type: String,
      default: "Asia/Colombo",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   SCHEDULE
========================================================= */

const scheduleSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   PRICE
========================================================= */

const priceSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   FACILITY
========================================================= */

const facilitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   TRANSPORT
========================================================= */

const transportSchema = new Schema(
  {
    locationSummary: {
      type: String,
      default: "",
      trim: true,
    },

    roadAccess: {
      type: String,
      default: "",
      trim: true,
    },

    walking: {
      type: String,
      default: "",
      trim: true,
    },

    publicTransport: {
      type: String,
      default: "",
      trim: true,
    },

    parking: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   ACCESSIBILITY
========================================================= */

const accessibilitySchema = new Schema(
  {
    status: {
      type: String,
      default: "Information pending",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   SAFETY CONTACT
========================================================= */

const safetyContactSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: String,
      required: true,
      trim: true,
    },

    href: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   SAFETY
========================================================= */

const safetySchema = new Schema(
  {
    security: {
      type: String,
      default: "",
      trim: true,
    },

    contacts: {
      type: [safetyContactSchema],
      default: [],
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   CONTACT
========================================================= */

const contactSchema = new Schema(
  {
    address: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: [String],
      default: [],
    },

    email: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   NEARBY
========================================================= */

const nearbySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* =========================================================
   MAIN ATTRACTION SCHEMA
========================================================= */

const attractionSchema = new Schema(
  {
    attractionId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    shortName: {
      type: String,
      trim: true,
    },

    /*
      Human-friendly detail-page category.
      Example:
      "Sacred Heritage"
    */
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    /*
      Map/filter category.

      This is intentionally separate from
      the detail-page category.
    */
    mapCategory: {
      type: String,
      required: true,

      enum: [
        "Heritage",
        "Religious",
        "Nature",
        "Tea",
        "Hiking",
        "Museum",
        "Viewpoint",
      ],

      index: true,
    },

    province: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    area: {
      type: String,
      required: true,
      trim: true,
    },

    coordinates: {
      type: coordinateSchema,
      required: true,
    },

    tagline: {
      type: String,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    visitDuration: {
      type: String,
      required: true,
      trim: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    openingHours: {
      type: openingHoursSchema,
      required: false,
    },

    schedules: {
      type: [scheduleSchema],
      default: [],
    },

    prices: {
      type: [priceSchema],
      default: [],
    },

    ticketIncludes: {
      type: [String],
      default: [],
    },

    visitorGuidelines: {
      type: [String],
      default: [],
    },

    facilities: {
      type: [facilitySchema],
      default: [],
    },

    transport: {
      type: transportSchema,
      required: false,
    },

    accessibility: {
      type: accessibilitySchema,
      required: false,
    },

    safety: {
      type: safetySchema,
      required: false,
    },

    contact: {
      type: contactSchema,
      required: false,
    },

    nearby: {
      type: [nearbySchema],
      default: [],
    },

    verified: {
      type: Boolean,
      default: false,
      index: true,
    },

    verificationStatus: {
      type: String,

      enum: [
        "VERIFIED_OFFICIAL",
        "VERIFIED_MULTI_SOURCE",
        "NEEDS_VERIFICATION",
        "STALE",
      ],

      default: "NEEDS_VERIFICATION",
      index: true,
    },

    sources: {
      type: [sourceSchema],
      default: [],
    },

    lastVerifiedAt: {
      type: Date,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "attractions",
  }
);

/* =========================================================
   INDEXES
========================================================= */

attractionSchema.index({
  name: "text",
  shortName: "text",
  shortDescription: "text",
  area: "text",
});

attractionSchema.index({
  district: 1,
  mapCategory: 1,
  published: 1,
});

/* =========================================================
   TYPES
========================================================= */

export type AttractionDocument =
  InferSchemaType<
    typeof attractionSchema
  >;

/* =========================================================
   MODEL
========================================================= */

export const Attraction =
  mongoose.models.Attraction ??
  model(
    "Attraction",
    attractionSchema
  );