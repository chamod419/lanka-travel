import type {
  Request,
  Response,
} from "express";

import {
  Attraction,
} from "../models/Attraction.js";

interface AttractionIdParams {
  id: string;
}

interface AttractionSlugParams {
  slug: string;
}

/* =========================================================
   GET ALL ATTRACTIONS
========================================================= */

export async function getAttractions(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const district =
      typeof req.query.district ===
      "string"
        ? req.query.district
        : undefined;

    const category =
      typeof req.query.category ===
      "string"
        ? req.query.category
        : undefined;

    const query: Record<
      string,
      unknown
    > = {
      published: true,
    };

    if (district) {
      query.district =
        district;
    }

    if (category) {
      query.mapCategory =
        category;
    }

    const attractions =
      await Attraction.find(
        query
      )
        .sort({
          featured: -1,
          attractionId: 1,
        })
        .lean();

    res.status(200).json({
      success: true,

      count:
        attractions.length,

      data:
        attractions,
    });
  } catch (error) {
    console.error(
      "Get attractions error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Unable to load attractions.",
    });
  }
}

/* =========================================================
   GET KANDY MAP POINTS
========================================================= */

export async function getKandyMapAttractions(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const attractions =
      await Attraction.find({
        district: "Kandy",

        published: true,

        "coordinates.latitude": {
          $exists: true,
        },

        "coordinates.longitude": {
          $exists: true,
        },
      })
        .select({
          _id: 0,

          attractionId: 1,

          slug: 1,

          name: 1,

          area: 1,

          mapCategory: 1,

          coordinates: 1,

          shortDescription: 1,

          visitDuration: 1,

          verified: 1,

          verificationStatus: 1,

          featured: 1,
        })
        .sort({
          attractionId: 1,
        })
        .lean();

    const mapPoints =
      attractions.map(
        (attraction) => ({
          id:
            attraction.attractionId,

          slug:
            attraction.slug,

          name:
            attraction.name,

          area:
            attraction.area,

          latitude:
            attraction.coordinates
              .latitude,

          longitude:
            attraction.coordinates
              .longitude,

          coordinateAccuracy:
            attraction.coordinates
              .accuracy,

          coordinatePointType:
            attraction.coordinates
              .pointType,

          coordinateSource:
            attraction.coordinates
              .source,

          category:
            attraction.mapCategory,

          shortDescription:
            attraction.shortDescription,

          duration:
            attraction.visitDuration,

          verified:
            attraction.verified,

          verificationStatus:
            attraction.verificationStatus,

          featured:
            attraction.featured,
        })
      );

    res.status(200).json({
      success: true,

      district:
        "Kandy",

      count:
        mapPoints.length,

      data:
        mapPoints,
    });
  } catch (error) {
    console.error(
      "Get Kandy map attractions error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Unable to load Kandy map data.",
    });
  }
}

/* =========================================================
   GET KANDY FULL RECORDS
========================================================= */

export async function getKandyAttractions(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const attractions =
      await Attraction.find({
        district: "Kandy",
        published: true,
      })
        .sort({
          attractionId: 1,
        })
        .lean();

    res.status(200).json({
      success: true,

      district:
        "Kandy",

      count:
        attractions.length,

      data:
        attractions,
    });
  } catch (error) {
    console.error(
      "Get Kandy attractions error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Unable to load Kandy attractions.",
    });
  }
}

/* =========================================================
   GET ATTRACTION BY SLUG
========================================================= */

export async function getAttractionBySlug(
  req: Request<AttractionSlugParams>,
  res: Response
): Promise<void> {
  try {
    const slug =
      req.params.slug
        .trim()
        .toLowerCase();

    const attraction =
      await Attraction.findOne({
        slug,

        published: true,
      }).lean();

    if (!attraction) {
      res.status(404).json({
        success: false,

        message:
          "Attraction not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,

      data:
        attraction,
    });
  } catch (error) {
    console.error(
      "Get attraction by slug error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Unable to load attraction.",
    });
  }
}

/* =========================================================
   GET ATTRACTION BY ID
========================================================= */

export async function getAttractionById(
  req: Request<AttractionIdParams>,
  res: Response
): Promise<void> {
  try {
    const attractionId =
      req.params.id
        .trim()
        .toUpperCase();

    const attraction =
      await Attraction.findOne({
        attractionId,

        published: true,
      }).lean();

    if (!attraction) {
      res.status(404).json({
        success: false,

        message:
          "Attraction not found.",
      });

      return;
    }

    res.status(200).json({
      success: true,

      data:
        attraction,
    });
  } catch (error) {
    console.error(
      "Get attraction by ID error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        "Unable to load attraction.",
    });
  }
}