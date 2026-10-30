export interface AttractionPrice {
  label: string;
  amount: string;
  note?: string;
}

export interface AttractionSchedule {
  label: string;
  time: string;
  description?: string;
}

export interface AttractionFacility {
  title: string;
  description: string;
}

export interface AttractionSafetyContact {
  label: string;
  value: string;
  href?: string;
}

export interface AttractionSource {
  title: string;
  organization: string;
  url: string;
  verifiedAt: string;
}

export interface AttractionDetail {
  id: string;

  slug: string;

  name: string;
  shortName: string;

  category: string;
  district: string;
  province: string;
  area: string;

  latitude: number;
  longitude: number;

  tagline: string;

  description: string;

  highlights: string[];

  visitDuration: string;

  openingHours: {
    days: string;
    open: string;
    close: string;
    timezone: string;
  };

  schedules: AttractionSchedule[];

  prices: AttractionPrice[];

  ticketIncludes: string[];

  visitorGuidelines: string[];

  facilities: AttractionFacility[];

  transport: {
    locationSummary: string;
    roadAccess: string;
    walking: string;
    publicTransport: string;
    parking: string;
  };

  accessibility: {
    status: string;
    description: string;
  };

  safety: {
    security: string;
    contacts: AttractionSafetyContact[];
  };

  contact: {
    address: string;
    phone: string[];
    email?: string;
  };

  nearby: {
    id: string;
    name: string;
    category: string;
  }[];

  sources: AttractionSource[];

  verifiedAt: string;
}