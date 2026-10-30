import SriLankaMap from "@/components/map/SriLankaMap";

import {
  getKandyMapAttractions,
} from "@/lib/api/attractions";

import type {
  AttractionMapPoint,
} from "@/types/tourism";

interface MapPageProps {
  searchParams?: Promise<{
    mode?:
      | string
      | string[];

    attraction?:
      | string
      | string[];
  }>;
}

function getFirstValue(
  value:
    | string
    | string[]
    | undefined
): string | undefined {
  if (
    Array.isArray(
      value
    )
  ) {
    return value[0];
  }

  return value;
}

export default async function ExploreMapPage({
  searchParams,
}: MapPageProps) {
  const params =
    await searchParams;

  const requestedMode =
    getFirstValue(
      params?.mode
    );

  const requestedAttractionId =
    getFirstValue(
      params?.attraction
    );

  let kandyMapPoints:
    AttractionMapPoint[] =
    [];

  let mapDataUnavailable =
    false;

  try {
    kandyMapPoints =
      await getKandyMapAttractions();
  } catch (error) {
    mapDataUnavailable =
      true;

    console.error(
      "Unable to load Kandy map data:",
      error
    );
  }

  return (
    <main className="map-page">
      <SriLankaMap
        initialMode={
          requestedMode ===
          "kandy"
            ? "kandy"
            : "island"
        }
        initialAttractionId={
          requestedAttractionId ??
          null
        }
        kandyMapPoints={
          kandyMapPoints
        }
        mapDataUnavailable={
          mapDataUnavailable
        }
      />
    </main>
  );
}