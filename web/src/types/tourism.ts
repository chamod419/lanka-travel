export type MapCategory =
  | "Heritage"
  | "Nature"
  | "Wildlife"
  | "Mountains"
  | "Beaches"
  | "Tea";

export type AttractionCategory =
  | "Heritage"
  | "Nature"
  | "Tea"
  | "Hiking"
  | "Museum"
  | "Viewpoint"
  | "Religious";

export type CoordinateAccuracy =
  | "OFFICIAL"
  | "AUTHORITATIVE_DATASET"
  | "VERIFIED_MAP"
  | "SECONDARY_MAP"
  | "APPROXIMATE"
  | "PENDING";

export type CoordinatePointType =
  | "SITE_REFERENCE"
  | "SITE_CENTROID"
  | "BUILDING"
  | "VISITOR_ENTRANCE"
  | "VIEWPOINT"
  | "EVENT_REFERENCE"
  | "AREA_REFERENCE"
  | "GATEWAY";

export interface MapPlace {
  id: string;
  name: string;
  region: string;

  latitude: number;
  longitude: number;

  category: MapCategory;

  shortDescription: string;

  verified: boolean;

  experienceCount?: number;

  pilot?: boolean;
}

export interface AttractionMapPoint {
  id: string;
  name: string;
  area: string;

  latitude: number | null;
  longitude: number | null;

  coordinateAccuracy: CoordinateAccuracy;
  coordinatePointType: CoordinatePointType;

  coordinateSource?: string;

  category: AttractionCategory;

  shortDescription: string;

  duration: string;

  verified: boolean;

  featured?: boolean;
}