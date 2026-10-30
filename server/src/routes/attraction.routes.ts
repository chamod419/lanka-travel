import {
  Router,
} from "express";

import {
  getAttractionById,
  getAttractionBySlug,
  getAttractions,
  getKandyAttractions,
  getKandyMapAttractions,
} from "../controllers/attraction.controller.js";

const router =
  Router();

/* =========================================================
   COLLECTION
========================================================= */

router.get(
  "/",
  getAttractions
);

/* =========================================================
   KANDY
========================================================= */

router.get(
  "/district/kandy/map",
  getKandyMapAttractions
);

router.get(
  "/district/kandy",
  getKandyAttractions
);

/* =========================================================
   SLUG
========================================================= */

router.get(
  "/slug/:slug",
  getAttractionBySlug
);

/* =========================================================
   ID
   Keep this last.
========================================================= */

router.get(
  "/:id",
  getAttractionById
);

export default router;