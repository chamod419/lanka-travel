import type {
  AttractionCategory,
  AttractionMapPoint,
} from "@/types/tourism";

export interface ApiAttractionSource {
  title: string;

  organization: string;

  url: string;

  verifiedAt: string;
}

export interface ApiAttractionSchedule {
  label: string;

  time: string;

  description?: string;
}

export interface ApiAttractionPrice {
  label: string;

  amount: string;

  note?: string;
}

export interface ApiAttractionFacility {
  title: string;

  description: string;
}

export interface ApiSafetyContact {
  label: string;

  value: string;

  href?: string;
}

export interface ApiNearbyAttraction {
  id: string;

  name: string;

  category: string;
}

export interface ApiAttraction {
  _id: string;

  attractionId: string;

  slug: string;

  name: string;

  shortName?: string;

  category: string;

  mapCategory:
    AttractionCategory;

  province: string;

  district: string;

  area: string;

  coordinates: {
    latitude: number;

    longitude: number;

    accuracy: string;

    pointType: string;

    source?: string;
  };

  tagline?: string;

  shortDescription:
    string;

  description?: string;

  visitDuration: string;

  highlights: string[];

  openingHours?: {
    days: string;

    open: string;

    close: string;

    timezone: string;
  };

  schedules:
    ApiAttractionSchedule[];

  prices:
    ApiAttractionPrice[];

  ticketIncludes:
    string[];

  visitorGuidelines:
    string[];

  facilities:
    ApiAttractionFacility[];

  transport?: {
    locationSummary:
      string;

    roadAccess:
      string;

    walking:
      string;

    publicTransport:
      string;

    parking:
      string;
  };

  accessibility?: {
    status: string;

    description:
      string;
  };

  safety?: {
    security: string;

    contacts:
      ApiSafetyContact[];
  };

  contact?: {
    address: string;

    phone: string[];

    email?: string;
  };

  nearby:
    ApiNearbyAttraction[];

  verified: boolean;

  verificationStatus:
    string;

  sources:
    ApiAttractionSource[];

  lastVerifiedAt?: string;

  featured: boolean;

  published: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface AttractionApiResponse {
  success: boolean;

  data?: ApiAttraction;

  message?: string;
}

export interface KandyMapApiResponse {
  success: boolean;

  district?: string;

  count?: number;

  data?:
    AttractionMapPoint[];

  message?: string;
}