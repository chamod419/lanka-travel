import { NextResponse } from "next/server";

const KANDY_BOUNDARY_URL =
  "https://lanka-data-layer.prabhavalabs.com/v1/admin/LK21/geometry";

type UnknownRecord =
  Record<string, unknown>;

function isRecord(
  value: unknown
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeGeoJson(
  value: unknown
): UnknownRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  /*
    Lanka Data Layer responses use:

    {
      success,
      message,
      payload,
      meta
    }

    But this parser intentionally accepts
    several reasonable GeoJSON response
    shapes so our application remains
    resilient if the upstream envelope
    changes slightly.
  */

  if (
    value.type ===
    "FeatureCollection"
  ) {
    return value;
  }

  if (
    value.type ===
    "Feature"
  ) {
    return {
      type: "FeatureCollection",

      features: [value],
    };
  }

  if (
    "payload" in value
  ) {
    const normalized =
      normalizeGeoJson(
        value.payload
      );

    if (normalized) {
      return normalized;
    }
  }

  if (
    "geojson" in value
  ) {
    const normalized =
      normalizeGeoJson(
        value.geojson
      );

    if (normalized) {
      return normalized;
    }
  }

  if (
    "geometry" in value &&
    isRecord(
      value.geometry
    )
  ) {
    const geometry =
      value.geometry;

    if (
      typeof geometry.type ===
        "string" &&
      "coordinates" in
        geometry
    ) {
      return {
        type:
          "FeatureCollection",

        features: [
          {
            type: "Feature",

            properties:
              isRecord(
                value.properties
              )
                ? value.properties
                : {},

            geometry,
          },
        ],
      };
    }
  }

  return null;
}

export async function GET() {
  try {
    const response =
      await fetch(
        KANDY_BOUNDARY_URL,
        {
          headers: {
            Accept:
              "application/json",
          },

          next: {
            revalidate:
              86400,
          },
        }
      );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Boundary provider returned an error.",
        },
        {
          status: 502,
        }
      );
    }

    const rawData:
      unknown =
      await response.json();

    const geoJson =
      normalizeGeoJson(
        rawData
      );

    if (!geoJson) {
      return NextResponse.json(
        {
          error:
            "Boundary geometry could not be normalized.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json(
      geoJson,
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Kandy boundary is temporarily unavailable.",
      },
      {
        status: 502,
      }
    );
  }
}