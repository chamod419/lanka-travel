import type {
  ApiAttraction,
  AttractionApiResponse,
  KandyMapApiResponse,
} from "@/types/api-attraction";

import type {
  AttractionMapPoint,
} from "@/types/tourism";

const API_URL =
  process.env.SERVER_API_URL ??
  "http://localhost:5000";

/* =========================================================
   GET ATTRACTION BY SLUG
========================================================= */

export async function getAttractionBySlug(
  slug: string
): Promise<ApiAttraction | null> {
  try {
    const response =
      await fetch(
        `${API_URL}/api/attractions/slug/${encodeURIComponent(
          slug
        )}`,
        {
          cache:
            "no-store",

          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (
      response.status ===
      404
    ) {
      return null;
    }

    if (
      !response.ok
    ) {
      throw new Error(
        `Attraction API request failed with status ${response.status}`
      );
    }

    const result =
      (await response.json()) as AttractionApiResponse;

    if (
      !result.success ||
      !result.data
    ) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(
      `Unable to load attraction slug "${slug}":`,
      error
    );

    throw error;
  }
}

/* =========================================================
   GET ATTRACTION BY ID
========================================================= */

export async function getAttractionById(
  attractionId: string
): Promise<ApiAttraction | null> {
  try {
    const response =
      await fetch(
        `${API_URL}/api/attractions/${encodeURIComponent(
          attractionId
        )}`,
        {
          cache:
            "no-store",

          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (
      response.status ===
      404
    ) {
      return null;
    }

    if (
      !response.ok
    ) {
      throw new Error(
        `Attraction API request failed with status ${response.status}`
      );
    }

    const result =
      (await response.json()) as AttractionApiResponse;

    if (
      !result.success ||
      !result.data
    ) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(
      `Unable to load attraction ID "${attractionId}":`,
      error
    );

    throw error;
  }
}

/* =========================================================
   GET KANDY MAP POINTS
========================================================= */

export async function getKandyMapAttractions(): Promise<
  AttractionMapPoint[]
> {
  const response =
    await fetch(
      `${API_URL}/api/attractions/district/kandy/map`,
      {
        /*
          Map records do not need
          second-by-second refresh.

          Production can reuse this
          server result briefly.
        */
        next: {
          revalidate: 300,
        },

        headers: {
          Accept:
            "application/json",
        },
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      `Kandy map API request failed with status ${response.status}`
    );
  }

  const result =
    (await response.json()) as KandyMapApiResponse;

  if (
    !result.success ||
    !Array.isArray(
      result.data
    )
  ) {
    throw new Error(
      result.message ??
        "Kandy map API returned an invalid response."
    );
  }

  return result.data;
}