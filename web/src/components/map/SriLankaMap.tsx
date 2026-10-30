"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Binoculars,
  ChevronRight,
  Clock3,
  Compass,
  Landmark,
  Layers3,
  Leaf,
  MapPin,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Map, {
  Layer,
  Marker,
  NavigationControl,
  Source,
  type MapRef,
} from "react-map-gl/maplibre";

import {
  setWorkerUrl,
  type GeoJSONSource,
  type GeoJSONSourceSpecification,
  type LngLatBoundsLike,
  type MapLayerMouseEvent,
} from "maplibre-gl";

import {
  mapPlaces,
} from "@/data/mapPlaces";

import {
  tourismRoutes,
  type TourismRoute,
} from "@/data/tourismRoutes";

import type {
  AttractionCategory,
  AttractionMapPoint,
  MapCategory,
  MapPlace,
} from "@/types/tourism";

setWorkerUrl(
  "/maplibre/maplibre-gl-worker.mjs"
);

/* =========================================================
   TYPES
========================================================= */

type IslandFilter =
  | "All"
  | MapCategory;

type KandyFilter =
  | "All"
  | AttractionCategory;

type MappedAttraction =
  AttractionMapPoint & {
    latitude: number;
    longitude: number;
  };

interface SriLankaMapProps {
  initialMode?:
    | "island"
    | "kandy";

  initialAttractionId?:
    | string
    | null;

  kandyMapPoints:
    AttractionMapPoint[];

  mapDataUnavailable?:
    boolean;
}

/* =========================================================
   FILTER OPTIONS
========================================================= */

const islandCategories:
  IslandFilter[] = [
    "All",
    "Heritage",
    "Nature",
    "Wildlife",
    "Mountains",
    "Beaches",
    "Tea",
  ];

const kandyCategories:
  KandyFilter[] = [
    "All",
    "Heritage",
    "Religious",
    "Nature",
    "Tea",
    "Hiking",
    "Museum",
    "Viewpoint",
  ];

const mediumPriorityLabels =
  new Set([
    "KDY001",
    "KDY014",
    "KDY016",
    "KDY017",
    "KDY021",
    "KDY027",
    "KDY029",
  ]);

/* =========================================================
   ICONS
========================================================= */

function IslandCategoryIcon({
  category,
  size = 18,
}: {
  category:
    MapCategory;

  size?: number;
}) {
  switch (
    category
  ) {
    case "Heritage":
      return (
        <Landmark
          size={size}
        />
      );

    case "Nature":
      return (
        <Leaf
          size={size}
        />
      );

    case "Wildlife":
      return (
        <Binoculars
          size={size}
        />
      );

    case "Mountains":
      return (
        <Mountain
          size={size}
        />
      );

    case "Beaches":
      return (
        <Waves
          size={size}
        />
      );

    case "Tea":
      return (
        <Leaf
          size={size}
        />
      );

    default:
      return (
        <MapPin
          size={size}
        />
      );
  }
}

function AttractionCategoryIcon({
  category,
  size = 18,
}: {
  category:
    AttractionCategory;

  size?: number;
}) {
  switch (
    category
  ) {
    case "Heritage":
    case "Religious":
    case "Museum":
      return (
        <Landmark
          size={size}
        />
      );

    case "Nature":
    case "Tea":
      return (
        <Leaf
          size={size}
        />
      );

    case "Hiking":
    case "Viewpoint":
      return (
        <Mountain
          size={size}
        />
      );

    default:
      return (
        <MapPin
          size={size}
        />
      );
  }
}

/* =========================================================
   COORDINATE TYPE GUARD
========================================================= */

function hasCoordinates(
  place:
    AttractionMapPoint
): place is MappedAttraction {
  return (
    place.latitude !==
      null &&
    place.longitude !==
      null
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function SriLankaMap({
  initialMode = "island",

  initialAttractionId = null,

  kandyMapPoints,

  mapDataUnavailable = false,
}: SriLankaMapProps) {
  const router =
    useRouter();

  const mapRef =
    useRef<MapRef>(
      null
    );

  /* =======================================================
     DEEP LINK INITIAL DATA
  ======================================================= */

  const deepLinkedAttraction =
    initialAttractionId
      ? kandyMapPoints.find(
          (place) =>
            place.id.toUpperCase() ===
            initialAttractionId.toUpperCase()
        ) ?? null
      : null;

  const startsInKandy =
    initialMode ===
      "kandy" ||
    deepLinkedAttraction !==
      null;

  /* =======================================================
     STATE
  ======================================================= */

  const [
    mapMode,
    setMapMode,
  ] = useState<
    "island" | "kandy"
  >(
    startsInKandy
      ? "kandy"
      : "island"
  );

  const [
    islandFilter,
    setIslandFilter,
  ] =
    useState<IslandFilter>(
      "All"
    );

  const [
    kandyFilter,
    setKandyFilter,
  ] =
    useState<KandyFilter>(
      "All"
    );

  const [
    selectedPlace,
    setSelectedPlace,
  ] =
    useState<MapPlace | null>(
      mapPlaces.find(
        (place) =>
          place.id ===
          "kandy"
      ) ?? null
    );

  const [
    selectedAttraction,
    setSelectedAttraction,
  ] =
    useState<AttractionMapPoint | null>(
      deepLinkedAttraction
    );

  const [
    activeRouteId,
    setActiveRouteId,
  ] =
    useState<string | null>(
      null
    );

  const [
    boundaryGeoJson,
    setBoundaryGeoJson,
  ] =
    useState<
      | GeoJSONSourceSpecification["data"]
      | null
    >(null);

  const [
    mapCursor,
    setMapCursor,
  ] =
    useState(
      "grab"
    );

  /* =======================================================
     KANDY DISTRICT BOUNDARY
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    async function loadBoundary() {
      try {
        const response =
          await fetch(
            "/api/boundaries/kandy",
            {
              signal:
                controller.signal,
            }
          );

        if (
          !response.ok
        ) {
          return;
        }

        const data:
          unknown =
          await response.json();

        if (
          typeof data !==
            "object" ||
          data === null
        ) {
          return;
        }

        setBoundaryGeoJson(
          data as
            GeoJSONSourceSpecification["data"]
        );
      } catch (
        error
      ) {
        if (
          error instanceof
            DOMException &&
          error.name ===
            "AbortError"
        ) {
          return;
        }

        console.warn(
          "Kandy district boundary could not be loaded."
        );
      }
    }

    void loadBoundary();

    return () => {
      controller.abort();
    };
  }, []);

  /* =======================================================
     FILTERED ISLAND PLACES
  ======================================================= */

  const filteredIslandPlaces =
    useMemo(() => {
      if (
        islandFilter ===
        "All"
      ) {
        return mapPlaces;
      }

      return mapPlaces.filter(
        (place) =>
          place.category ===
          islandFilter
      );
    }, [
      islandFilter,
    ]);

  /* =======================================================
     FILTERED KANDY ATTRACTIONS
  ======================================================= */

  const filteredKandyPlaces =
    useMemo(() => {
      if (
        kandyFilter ===
        "All"
      ) {
        return kandyMapPoints;
      }

      return kandyMapPoints.filter(
        (place) =>
          place.category ===
          kandyFilter
      );
    }, [
      kandyFilter,
      kandyMapPoints,
    ]);

  const allMappedKandyPlaces =
    useMemo(
      () =>
        kandyMapPoints.filter(
          hasCoordinates
        ),
      [
        kandyMapPoints,
      ]
    );

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const activeRoute =
    useMemo(
      () =>
        tourismRoutes.find(
          (route) =>
            route.id ===
            activeRouteId
        ) ?? null,
      [
        activeRouteId,
      ]
    );

  const activeRouteStops =
    useMemo(() => {
      if (
        !activeRoute
      ) {
        return [];
      }

      return activeRoute.stopIds
        .map(
          (id) =>
            kandyMapPoints.find(
              (place) =>
                place.id ===
                id
            )
        )
        .filter(
          (
            place
          ): place is MappedAttraction =>
            Boolean(
              place &&
                hasCoordinates(
                  place
                )
            )
        );
    }, [
      activeRoute,
      kandyMapPoints,
    ]);

  const mappedKandyPlaces =
    useMemo(() => {
      if (
        activeRoute
      ) {
        return activeRouteStops;
      }

      return filteredKandyPlaces.filter(
        hasCoordinates
      );
    }, [
      activeRoute,
      activeRouteStops,
      filteredKandyPlaces,
    ]);

  /* =======================================================
     KANDY GEOJSON
  ======================================================= */

  const kandyGeoJson =
    useMemo<
      GeoJSONSourceSpecification["data"]
    >(
      () => ({
        type:
          "FeatureCollection",

        features:
          mappedKandyPlaces.map(
            (
              place
            ) => ({
              type:
                "Feature",

              geometry: {
                type:
                  "Point",

                coordinates: [
                  place.longitude,
                  place.latitude,
                ],
              },

              properties: {
                id:
                  place.id,

                slug:
                  place.slug,

                name:
                  place.name,

                area:
                  place.area,

                category:
                  place.category,

                featured:
                  Boolean(
                    place.featured
                  ),

                labelPriority:
                  place.featured
                    ? 3
                    : mediumPriorityLabels.has(
                          place.id
                        )
                      ? 2
                      : 1,
              },
            })
          ),
      }),
      [
        mappedKandyPlaces,
      ]
    );

  /* =======================================================
     ROUTE LINE GEOJSON
  ======================================================= */

  const routeLineGeoJson =
    useMemo<
      GeoJSONSourceSpecification["data"]
    >(() => {
      if (
        !activeRoute ||
        activeRouteStops.length <
          2
      ) {
        return {
          type:
            "FeatureCollection",

          features: [],
        };
      }

      return {
        type:
          "FeatureCollection",

        features: [
          {
            type:
              "Feature",

            geometry: {
              type:
                "LineString",

              coordinates:
                activeRouteStops.map(
                  (
                    place
                  ) => [
                    place.longitude,
                    place.latitude,
                  ]
                ),
            },

            properties: {
              id:
                activeRoute.id,

              title:
                activeRoute.title,

              verificationStatus:
                activeRoute.verificationStatus,
            },
          },
        ],
      };
    }, [
      activeRoute,
      activeRouteStops,
    ]);

  /* =======================================================
     ROUTE STOP GEOJSON
  ======================================================= */

  const routeStopsGeoJson =
    useMemo<
      GeoJSONSourceSpecification["data"]
    >(
      () => ({
        type:
          "FeatureCollection",

        features:
          activeRouteStops.map(
            (
              place,
              index
            ) => ({
              type:
                "Feature",

              geometry: {
                type:
                  "Point",

                coordinates: [
                  place.longitude,
                  place.latitude,
                ],
              },

              properties: {
                id:
                  place.id,

                slug:
                  place.slug,

                name:
                  place.name,

                category:
                  place.category,

                stopNumber:
                  index +
                  1,
              },
            })
          ),
      }),
      [
        activeRouteStops,
      ]
    );

  /* =======================================================
     CAMERA
  ======================================================= */

  function fitKandyPlaces(
    places:
      MappedAttraction[]
  ) {
    const map =
      mapRef.current;

    if (
      !map
    ) {
      return;
    }

    if (
      places.length ===
      0
    ) {
      map.flyTo({
        center: [
          80.61,
          7.27,
        ],

        zoom: 10,

        duration:
          1000,

        essential:
          true,
      });

      return;
    }

    if (
      places.length ===
      1
    ) {
      const place =
        places[0];

      map.flyTo({
        center: [
          place.longitude,
          place.latitude,
        ],

        zoom: 14,

        duration:
          950,

        essential:
          true,
      });

      return;
    }

    const longitudes =
      places.map(
        (place) =>
          place.longitude
      );

    const latitudes =
      places.map(
        (place) =>
          place.latitude
      );

    const bounds:
      LngLatBoundsLike = [
      [
        Math.min(
          ...longitudes
        ),

        Math.min(
          ...latitudes
        ),
      ],

      [
        Math.max(
          ...longitudes
        ),

        Math.max(
          ...latitudes
        ),
      ],
    ];

    const isMobile =
      typeof window !==
        "undefined" &&
      window.innerWidth <
        760;

    map.fitBounds(
      bounds,
      {
        padding:
          isMobile
            ? {
                top: 210,

                right: 35,

                bottom:
                  300,

                left: 35,
              }
            : {
                top: 285,

                right: 105,

                bottom: 85,

                left: 525,
              },

        maxZoom:
          activeRoute
            ? 12.2
            : 11.2,

        duration:
          1350,
      }
    );
  }

  /* =======================================================
     INITIAL MAP LOAD
  ======================================================= */

  function handleMapLoad() {
    if (
      deepLinkedAttraction &&
      hasCoordinates(
        deepLinkedAttraction
      )
    ) {
      mapRef.current?.flyTo({
        center: [
          deepLinkedAttraction.longitude,
          deepLinkedAttraction.latitude,
        ],

        zoom: 14.4,

        duration:
          1100,

        essential:
          true,
      });

      return;
    }

    if (
      startsInKandy &&
      allMappedKandyPlaces.length >
        0
    ) {
      fitKandyPlaces(
        allMappedKandyPlaces
      );
    }
  }

  /* =======================================================
     SELECT ISLAND DESTINATION
  ======================================================= */

  function selectIslandPlace(
    place:
      MapPlace
  ) {
    setSelectedPlace(
      place
    );

    mapRef.current?.flyTo({
      center: [
        place.longitude,
        place.latitude,
      ],

      zoom:
        place.id ===
        "kandy"
          ? 8
          : 7.6,

      duration:
        1050,

      essential:
        true,
    });
  }

  /* =======================================================
     OPEN KANDY
  ======================================================= */

  function openKandy() {
    router.replace(
      "/map?mode=kandy",
      {
        scroll:
          false,
      }
    );

    setMapMode(
      "kandy"
    );

    setSelectedAttraction(
      null
    );

    setActiveRouteId(
      null
    );

    setKandyFilter(
      "All"
    );

    setSelectedPlace(
      mapPlaces.find(
        (place) =>
          place.id ===
          "kandy"
      ) ?? null
    );

    window.setTimeout(
      () => {
        if (
          allMappedKandyPlaces.length >
          0
        ) {
          fitKandyPlaces(
            allMappedKandyPlaces
          );
        }
      },
      50
    );
  }

  /* =======================================================
     SELECT ATTRACTION
  ======================================================= */

  function selectAttraction(
    place:
      AttractionMapPoint
  ) {
    if (
      !hasCoordinates(
        place
      )
    ) {
      return;
    }

    setSelectedAttraction(
      place
    );

    router.replace(
      `/map?mode=kandy&attraction=${encodeURIComponent(
        place.id
      )}`,
      {
        scroll:
          false,
      }
    );

    mapRef.current?.flyTo({
      center: [
        place.longitude,
        place.latitude,
      ],

      zoom: 14.4,

      duration:
        850,

      essential:
        true,
    });
  }

  /* =======================================================
     KANDY FILTER
  ======================================================= */

  function handleKandyFilter(
    category:
      KandyFilter
  ) {
    router.replace(
      "/map?mode=kandy",
      {
        scroll:
          false,
      }
    );

    setActiveRouteId(
      null
    );

    setKandyFilter(
      category
    );

    setSelectedAttraction(
      null
    );

    const places =
      (
        category ===
        "All"
          ? kandyMapPoints
          : kandyMapPoints.filter(
              (
                place
              ) =>
                place.category ===
                category
            )
      ).filter(
        hasCoordinates
      );

    window.setTimeout(
      () => {
        fitKandyPlaces(
          places
        );
      },
      40
    );
  }

  /* =======================================================
     ROUTE SELECT
  ======================================================= */

  function selectRoute(
    route:
      TourismRoute
  ) {
    const routeStops =
      route.stopIds
        .map(
          (id) =>
            kandyMapPoints.find(
              (
                place
              ) =>
                place.id ===
                id
            )
        )
        .filter(
          (
            place
          ): place is MappedAttraction =>
            Boolean(
              place &&
                hasCoordinates(
                  place
                )
            )
        );

    router.replace(
      "/map?mode=kandy",
      {
        scroll:
          false,
      }
    );

    setActiveRouteId(
      route.id
    );

    setKandyFilter(
      "All"
    );

    setSelectedAttraction(
      null
    );

    window.setTimeout(
      () => {
        fitKandyPlaces(
          routeStops
        );
      },
      50
    );
  }

  /* =======================================================
     CLEAR ROUTE
  ======================================================= */

  function clearRoute() {
    router.replace(
      "/map?mode=kandy",
      {
        scroll:
          false,
      }
    );

    setActiveRouteId(
      null
    );

    setSelectedAttraction(
      null
    );

    window.setTimeout(
      () => {
        fitKandyPlaces(
          allMappedKandyPlaces
        );
      },
      50
    );
  }

  /* =======================================================
     RESET ISLAND
  ======================================================= */

  function resetMap() {
    router.replace(
      "/map",
      {
        scroll:
          false,
      }
    );

    setMapMode(
      "island"
    );

    setIslandFilter(
      "All"
    );

    setKandyFilter(
      "All"
    );

    setActiveRouteId(
      null
    );

    setSelectedAttraction(
      null
    );

    setSelectedPlace(
      mapPlaces.find(
        (place) =>
          place.id ===
          "kandy"
      ) ?? null
    );

    mapRef.current?.flyTo({
      center: [
        80.72,
        7.55,
      ],

      zoom: 6.85,

      bearing: 0,

      pitch: 0,

      duration:
        1200,

      essential:
        true,
    });
  }

  /* =======================================================
     MAP CLICK
  ======================================================= */

  async function handleMapClick(
    event:
      MapLayerMouseEvent
  ) {
    if (
      mapMode !==
      "kandy"
    ) {
      return;
    }

    const feature =
      event.features?.[0];

    if (
      !feature
    ) {
      return;
    }

    /* ROUTE STOP */

    if (
      activeRoute &&
      (
        feature.layer.id ===
          "kandy-route-points" ||
        feature.layer.id ===
          "kandy-route-labels" ||
        feature.layer.id ===
          "kandy-route-stop-numbers"
      )
    ) {
      const id =
        String(
          feature.properties
            ?.id ??
            ""
        );

      const place =
        kandyMapPoints.find(
          (item) =>
            item.id ===
            id
        );

      if (
        place
      ) {
        selectAttraction(
          place
        );
      }

      return;
    }

    /* CLUSTER */

    const clusterId =
      feature.properties
        ?.cluster_id;

    const isCluster =
      Boolean(
        feature.properties
          ?.cluster
      );

    if (
      isCluster &&
      clusterId !==
        undefined &&
      feature.geometry.type ===
        "Point"
    ) {
      const coordinates =
        feature.geometry
          .coordinates as [
          number,
          number,
        ];

      const source =
        mapRef.current
          ?.getMap()
          .getSource(
            "kandy-attractions"
          ) as
          | GeoJSONSource
          | undefined;

      if (
        !source
      ) {
        return;
      }

      try {
        const expansionZoom =
          await source.getClusterExpansionZoom(
            Number(
              clusterId
            )
          );

        mapRef.current?.easeTo({
          center:
            coordinates,

          zoom:
            Math.min(
              expansionZoom,
              15.5
            ),

          duration:
            650,

          essential:
            true,
        });
      } catch {
        mapRef.current?.easeTo({
          center:
            coordinates,

          zoom:
            Math.min(
              (
                mapRef.current?.getZoom() ??
                10
              ) + 2,
              15.5
            ),

          duration:
            650,

          essential:
            true,
        });
      }

      return;
    }

    /* NORMAL POINT */

    const id =
      String(
        feature.properties
          ?.id ??
          ""
      );

    if (
      !id
    ) {
      return;
    }

    const place =
      kandyMapPoints.find(
        (item) =>
          item.id ===
          id
      );

    if (
      place
    ) {
      selectAttraction(
        place
      );
    }
  }

  /* =======================================================
     INTERACTIVE LAYERS
  ======================================================= */

  const interactiveLayers =
    mapMode !==
    "kandy"
      ? []
      : activeRoute
        ? [
            "kandy-route-points",
            "kandy-route-labels",
            "kandy-route-stop-numbers",
          ]
        : [
            "kandy-clusters",
            "kandy-cluster-count",
            "kandy-points",
            "kandy-featured-labels",
            "kandy-detail-labels",
          ];

  /* =======================================================
     SELECTED DETAIL PAGE URL
  ======================================================= */

  const selectedDetailHref =
    selectedAttraction?.slug
      ? `/destinations/kandy/${encodeURIComponent(
          selectedAttraction.slug
        )}`
      : null;

  const coordinateProgress =
    kandyMapPoints.length >
    0
      ? (
          allMappedKandyPlaces.length /
          kandyMapPoints.length
        ) *
        100
      : 0;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="sl-map-shell">
      <Map
        ref={
          mapRef
        }
        initialViewState={{
          longitude:
            startsInKandy
              ? 80.63
              : 80.72,

          latitude:
            startsInKandy
              ? 7.29
              : 7.55,

          zoom:
            startsInKandy
              ? 10
              : 6.85,

          bearing: 0,

          pitch: 0,
        }}
        minZoom={
          5.5
        }
        maxZoom={
          16
        }
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        style={{
          position:
            "absolute",

          inset: 0,

          width:
            "100%",

          height:
            "100%",
        }}
        interactiveLayerIds={
          interactiveLayers
        }
        cursor={
          mapCursor
        }
        onLoad={
          handleMapLoad
        }
        onMouseEnter={() =>
          setMapCursor(
            "pointer"
          )
        }
        onMouseLeave={() =>
          setMapCursor(
            "grab"
          )
        }
        onClick={
          handleMapClick
        }
      >
        <NavigationControl
          position="bottom-right"
          showCompass={
            false
          }
        />

        {/* ===============================================
            KANDY BOUNDARY
        =============================================== */}

        {mapMode ===
          "kandy" &&
          boundaryGeoJson && (
            <Source
              id="kandy-district-boundary"
              type="geojson"
              data={
                boundaryGeoJson
              }
            >
              <Layer
                id="kandy-district-fill"
                type="fill"
                paint={{
                  "fill-color":
                    "#1f7655",

                  "fill-opacity":
                    0.055,
                }}
              />

              <Layer
                id="kandy-district-outline"
                type="line"
                paint={{
                  "line-color":
                    "#14513f",

                  "line-width":
                    [
                      "interpolate",
                      [
                        "linear",
                      ],
                      [
                        "zoom",
                      ],

                      7,
                      1.5,

                      12,
                      3,
                    ],

                  "line-opacity":
                    0.78,

                  "line-dasharray":
                    [
                      3,
                      2,
                    ],
                }}
              />
            </Source>
          )}

        {/* ===============================================
            ISLAND DESTINATIONS
        =============================================== */}

        {mapMode ===
          "island" &&
          filteredIslandPlaces.map(
            (
              place
            ) => {
              const active =
                selectedPlace?.id ===
                place.id;

              const experienceCount =
                place.id ===
                "kandy"
                  ? kandyMapPoints.length
                  : place.experienceCount;

              return (
                <Marker
                  key={
                    place.id
                  }
                  longitude={
                    place.longitude
                  }
                  latitude={
                    place.latitude
                  }
                  anchor="bottom"
                  onClick={(
                    event
                  ) => {
                    event.originalEvent.stopPropagation();

                    selectIslandPlace(
                      place
                    );
                  }}
                >
                  <button
                    className={`tourism-map-marker ${
                      active
                        ? "active"
                        : ""
                    } ${
                      place.pilot
                        ? "pilot"
                        : ""
                    }`}
                    aria-label={`Explore ${place.name}`}
                  >
                    {place.pilot && (
                      <span className="marker-pulse" />
                    )}

                    <span className="marker-icon">
                      <IslandCategoryIcon
                        category={
                          place.category
                        }
                        size={
                          17
                        }
                      />
                    </span>

                    <span className="marker-label">
                      {
                        place.name
                      }

                      {place.pilot &&
                        experienceCount >
                          0 && (
                          <small>
                            {
                              experienceCount
                            }{" "}
                            experiences
                          </small>
                        )}
                    </span>
                  </button>
                </Marker>
              );
            }
          )}

        {/* ===============================================
            KANDY CLUSTER SOURCE
        =============================================== */}

        {mapMode ===
          "kandy" &&
          !activeRoute &&
          kandyMapPoints.length >
            0 && (
            <Source
              id="kandy-attractions"
              type="geojson"
              data={
                kandyGeoJson
              }
              cluster
              clusterRadius={
                58
              }
              clusterMaxZoom={
                14
              }
            >
              <Layer
                id="kandy-clusters"
                type="circle"
                filter={[
                  "has",
                  "point_count",
                ]}
                paint={{
                  "circle-color":
                    [
                      "step",

                      [
                        "get",
                        "point_count",
                      ],

                      "#174f3f",

                      5,
                      "#103f33",

                      10,
                      "#0a352b",
                    ],

                  "circle-radius":
                    [
                      "step",

                      [
                        "get",
                        "point_count",
                      ],

                      21,

                      5,
                      25,

                      10,
                      30,
                    ],

                  "circle-stroke-color":
                    "#ffffff",

                  "circle-stroke-width":
                    3,

                  "circle-opacity":
                    0.96,
                }}
              />

              <Layer
                id="kandy-cluster-count"
                type="symbol"
                filter={[
                  "has",
                  "point_count",
                ]}
                layout={{
                  "text-field":
                    [
                      "to-string",

                      [
                        "get",
                        "point_count_abbreviated",
                      ],
                    ],

                  "text-size":
                    12,

                  "text-allow-overlap":
                    true,

                  "text-ignore-placement":
                    true,
                }}
                paint={{
                  "text-color":
                    "#ffffff",
                }}
              />

              <Layer
                id="kandy-selected-ring"
                type="circle"
                filter={[
                  "all",

                  [
                    "!",
                    [
                      "has",
                      "point_count",
                    ],
                  ],

                  [
                    "==",

                    [
                      "get",
                      "id",
                    ],

                    selectedAttraction?.id ??
                      "__none__",
                  ],
                ]}
                paint={{
                  "circle-radius":
                    17,

                  "circle-color":
                    "rgba(0,0,0,0)",

                  "circle-stroke-width":
                    4,

                  "circle-stroke-color":
                    "#b47a32",
                }}
              />

              <Layer
                id="kandy-points"
                type="circle"
                filter={[
                  "!",

                  [
                    "has",
                    "point_count",
                  ],
                ]}
                paint={{
                  "circle-radius":
                    [
                      "interpolate",

                      [
                        "linear",
                      ],

                      [
                        "zoom",
                      ],

                      9,
                      7,

                      12,
                      9,

                      15,
                      11,
                    ],

                  "circle-color":
                    [
                      "match",

                      [
                        "get",
                        "category",
                      ],

                      "Nature",
                      "#257152",

                      "Tea",
                      "#657b43",

                      "Hiking",
                      "#76583a",

                      "Viewpoint",
                      "#9a6a30",

                      "Religious",
                      "#355c70",

                      "Museum",
                      "#66577d",

                      "#0f4939",
                    ],

                  "circle-stroke-color":
                    "#ffffff",

                  "circle-stroke-width":
                    2.5,
                }}
              />

              <Layer
                id="kandy-featured-labels"
                type="symbol"
                minzoom={
                  9.6
                }
                filter={[
                  "all",

                  [
                    "!",

                    [
                      "has",
                      "point_count",
                    ],
                  ],

                  [
                    ">=",

                    [
                      "get",
                      "labelPriority",
                    ],

                    2,
                  ],
                ]}
                layout={{
                  "text-field":
                    [
                      "get",
                      "name",
                    ],

                  "text-size":
                    10,

                  "text-offset":
                    [
                      0,
                      1.65,
                    ],

                  "text-anchor":
                    "top",

                  "text-max-width":
                    16,

                  "text-optional":
                    true,

                  "text-allow-overlap":
                    false,
                }}
                paint={{
                  "text-color":
                    "#143e32",

                  "text-halo-color":
                    "rgba(255,253,248,0.97)",

                  "text-halo-width":
                    2,
                }}
              />

              <Layer
                id="kandy-detail-labels"
                type="symbol"
                minzoom={
                  12.2
                }
                filter={[
                  "!",

                  [
                    "has",
                    "point_count",
                  ],
                ]}
                layout={{
                  "text-field":
                    [
                      "get",
                      "name",
                    ],

                  "text-size":
                    10,

                  "text-offset":
                    [
                      0,
                      1.75,
                    ],

                  "text-anchor":
                    "top",

                  "text-max-width":
                    16,

                  "text-optional":
                    true,

                  "text-allow-overlap":
                    false,
                }}
                paint={{
                  "text-color":
                    "#153b31",

                  "text-halo-color":
                    "rgba(255,253,248,0.97)",

                  "text-halo-width":
                    2.2,
                }}
              />
            </Source>
          )}

        {/* ===============================================
            ACTIVE ROUTE
        =============================================== */}

        {mapMode ===
          "kandy" &&
          activeRoute &&
          activeRouteStops.length >
            0 && (
            <>
              <Source
                id="active-tourism-route"
                type="geojson"
                data={
                  routeLineGeoJson
                }
              >
                <Layer
                  id="active-route-shadow"
                  type="line"
                  layout={{
                    "line-cap":
                      "round",

                    "line-join":
                      "round",
                  }}
                  paint={{
                    "line-color":
                      "#ffffff",

                    "line-width":
                      9,

                    "line-opacity":
                      0.86,
                  }}
                />

                <Layer
                  id="active-route-line"
                  type="line"
                  layout={{
                    "line-cap":
                      "round",

                    "line-join":
                      "round",
                  }}
                  paint={{
                    "line-color":
                      "#b47a32",

                    "line-width":
                      5,

                    "line-opacity":
                      0.95,

                    "line-dasharray":
                      [
                        1.5,
                        1.2,
                      ],
                  }}
                />
              </Source>

              <Source
                id="kandy-route-stops"
                type="geojson"
                data={
                  routeStopsGeoJson
                }
              >
                <Layer
                  id="kandy-route-stop-halo"
                  type="circle"
                  paint={{
                    "circle-radius":
                      16,

                    "circle-color":
                      "rgba(180,122,50,0.16)",
                  }}
                />

                <Layer
                  id="kandy-route-points"
                  type="circle"
                  paint={{
                    "circle-radius":
                      11,

                    "circle-color":
                      "#0f4939",

                    "circle-stroke-color":
                      "#ffffff",

                    "circle-stroke-width":
                      3,
                  }}
                />

                <Layer
                  id="kandy-route-stop-numbers"
                  type="symbol"
                  layout={{
                    "text-field":
                      [
                        "to-string",

                        [
                          "get",
                          "stopNumber",
                        ],
                      ],

                    "text-size":
                      10,

                    "text-allow-overlap":
                      true,

                    "text-ignore-placement":
                      true,
                  }}
                  paint={{
                    "text-color":
                      "#ffffff",
                  }}
                />

                <Layer
                  id="kandy-route-labels"
                  type="symbol"
                  minzoom={
                    9
                  }
                  layout={{
                    "text-field":
                      [
                        "get",
                        "name",
                      ],

                    "text-size":
                      10,

                    "text-offset":
                      [
                        0,
                        1.8,
                      ],

                    "text-anchor":
                      "top",

                    "text-max-width":
                      18,

                    "text-optional":
                      true,

                    "text-allow-overlap":
                      false,
                  }}
                  paint={{
                    "text-color":
                      "#153b31",

                    "text-halo-color":
                      "rgba(255,253,248,0.98)",

                    "text-halo-width":
                      2.3,
                  }}
                />
              </Source>
            </>
          )}
      </Map>

      {/* ===============================================
          TOP BAR
      =============================================== */}

      <div className="sl-map-topbar">
        {mapMode ===
        "island" ? (
          <Link
            href="/"
            className="map-back-button"
          >
            <ArrowLeft
              size={
                18
              }
            />

            Back
          </Link>
        ) : (
          <button
            className="map-back-button"
            onClick={
              resetMap
            }
          >
            <ArrowLeft
              size={
                18
              }
            />

            Sri Lanka
          </button>
        )}

        <div className="map-page-brand">
          <div className="map-page-brand-icon">
            <Compass
              size={
                18
              }
            />
          </div>

          <div>
            <strong>
              {mapMode ===
              "island"
                ? "EXPLORE SRI LANKA"
                : "EXPLORE KANDY"}
            </strong>

            <span>
              {mapMode ===
              "island"
                ? "Interactive Discovery Map"
                : "Central Province · Destination Atlas"}
            </span>
          </div>
        </div>

        <button
          className="map-reset-button"
          onClick={
            resetMap
          }
        >
          <Layers3
            size={
              17
            }
          />

          Island View
        </button>
      </div>

      {/* ===============================================
          FILTERS
      =============================================== */}

      <div className="map-filter-panel">
        <span className="map-filter-label">
          {mapMode ===
          "island"
            ? "EXPLORE BY EXPERIENCE"
            : "EXPLORE KANDY BY TYPE"}
        </span>

        <div className="map-filter-scroll">
          {mapMode ===
          "island"
            ? islandCategories.map(
                (
                  category
                ) => (
                  <button
                    key={
                      category
                    }
                    onClick={() =>
                      setIslandFilter(
                        category
                      )
                    }
                    className={
                      islandFilter ===
                      category
                        ? "active"
                        : ""
                    }
                  >
                    {category ===
                    "All" ? (
                      <Sparkles
                        size={
                          15
                        }
                      />
                    ) : (
                      <IslandCategoryIcon
                        category={
                          category
                        }
                        size={
                          15
                        }
                      />
                    )}

                    {
                      category
                    }
                  </button>
                )
              )
            : kandyCategories.map(
                (
                  category
                ) => (
                  <button
                    key={
                      category
                    }
                    onClick={() =>
                      handleKandyFilter(
                        category
                      )
                    }
                    className={
                      !activeRoute &&
                      kandyFilter ===
                        category
                        ? "active"
                        : ""
                    }
                    disabled={
                      mapDataUnavailable
                    }
                  >
                    {category ===
                    "All" ? (
                      <Sparkles
                        size={
                          15
                        }
                      />
                    ) : (
                      <AttractionCategoryIcon
                        category={
                          category
                        }
                        size={
                          15
                        }
                      />
                    )}

                    {
                      category
                    }
                  </button>
                )
              )}
        </div>
      </div>

      {/* ===============================================
          ROUTE SELECTOR
      =============================================== */}

      {mapMode ===
        "kandy" && (
          <div className="map-route-panel">
            <div className="route-panel-heading">
              <span>
                CURATED
                JOURNEYS
              </span>

              {activeRoute && (
                <button
                  onClick={
                    clearRoute
                  }
                >
                  <X
                    size={
                      13
                    }
                  />

                  Clear route
                </button>
              )}
            </div>

            <div className="route-selector-scroll">
              {tourismRoutes.map(
                (
                  route
                ) => (
                  <button
                    key={
                      route.id
                    }
                    className={
                      activeRouteId ===
                      route.id
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      selectRoute(
                        route
                      )
                    }
                    disabled={
                      mapDataUnavailable ||
                      kandyMapPoints.length ===
                        0
                    }
                  >
                    <Route
                      size={
                        15
                      }
                    />

                    <span>
                      {
                        route.shortTitle
                      }
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        )}

      {/* ===============================================
          MAP LOCATION LABEL
      =============================================== */}

      {mapMode ===
      "island" ? (
        <div className="island-map-label">
          <span>
            INDIAN OCEAN
          </span>

          <strong>
            SRI LANKA
          </strong>

          <small>
            7.8731° N ·
            80.7718° E
          </small>
        </div>
      ) : (
        <div className="district-map-label">
          <span>
            CENTRAL PROVINCE
          </span>

          <strong>
            KANDY
          </strong>

          <small>
            {
              kandyMapPoints.length
            }{" "}
            database
            experiences
          </small>
        </div>
      )}

      {/* ===============================================
          ISLAND CARD
      =============================================== */}

      {mapMode ===
        "island" &&
        selectedPlace && (
          <aside className="selected-map-place">
            <button
              className="selected-map-close"
              onClick={() =>
                setSelectedPlace(
                  null
                )
              }
              aria-label="Close destination"
            >
              <X
                size={
                  17
                }
              />
            </button>

            <div className="selected-map-top">
              <div className="selected-category-icon">
                <IslandCategoryIcon
                  category={
                    selectedPlace.category
                  }
                  size={
                    21
                  }
                />
              </div>

              <div>
                <span>
                  {
                    selectedPlace.category
                  }
                </span>

                {selectedPlace.verified ? (
                  <div className="selected-verified">
                    <ShieldCheck
                      size={
                        13
                      }
                    />

                    Verified
                    pilot
                    destination
                  </div>
                ) : (
                  <div className="selected-preview">
                    Preview
                    destination
                  </div>
                )}
              </div>
            </div>

            <div className="selected-map-location">
              <MapPin
                size={
                  14
                }
              />

              {
                selectedPlace.region
              }
            </div>

            <h2>
              {
                selectedPlace.name
              }
            </h2>

            <p>
              {
                selectedPlace.shortDescription
              }
            </p>

            {selectedPlace.id ===
            "kandy" ? (
              kandyMapPoints.length >
                0 && (
                <div className="selected-map-stat">
                  <strong>
                    {
                      kandyMapPoints.length
                    }
                  </strong>

                  <span>
                    database
                    <br />
                    experiences
                  </span>
                </div>
              )
            ) : (
              selectedPlace.experienceCount && (
                <div className="selected-map-stat">
                  <strong>
                    {
                      selectedPlace.experienceCount
                    }
                  </strong>

                  <span>
                    structured
                    <br />
                    experiences
                  </span>
                </div>
              )
            )}

            <button
              className={`selected-explore-button ${
                selectedPlace.id !==
                "kandy" ||
                mapDataUnavailable
                  ? "disabled"
                  : ""
              }`}
              disabled={
                selectedPlace.id !==
                  "kandy" ||
                mapDataUnavailable
              }
              onClick={() => {
                if (
                  selectedPlace.id ===
                    "kandy" &&
                  !mapDataUnavailable
                ) {
                  openKandy();
                }
              }}
            >
              {mapDataUnavailable &&
              selectedPlace.id ===
                "kandy"
                ? "Map data unavailable"
                : selectedPlace.id ===
                    "kandy"
                  ? "Explore Kandy"
                  : "Coming soon"}

              <ChevronRight
                size={
                  18
                }
              />
            </button>
          </aside>
        )}

      {/* ===============================================
          ROUTE CARD
      =============================================== */}

      {mapMode ===
        "kandy" &&
        activeRoute &&
        !selectedAttraction && (
          <aside className="route-overview-card">
            <div className="route-card-badge">
              <Route
                size={
                  14
                }
              />

              Curated
              journey
            </div>

            <span className="route-card-id">
              {
                activeRoute.id
              }
            </span>

            <h2>
              {
                activeRoute.title
              }
            </h2>

            <p>
              {
                activeRoute.description
              }
            </p>

            <div className="route-card-meta">
              <span>
                <Clock3
                  size={
                    13
                  }
                />

                {
                  activeRoute.duration
                }
              </span>

              <span>
                {
                  activeRoute.theme
                }
              </span>

              <span>
                {
                  activeRouteStops.length
                }{" "}
                stops
              </span>
            </div>

            <div className="route-stop-list">
              {activeRouteStops.map(
                (
                  stop,
                  index
                ) => (
                  <button
                    key={
                      stop.id
                    }
                    onClick={() =>
                      selectAttraction(
                        stop
                      )
                    }
                  >
                    <span className="route-stop-number">
                      {
                        index +
                        1
                      }
                    </span>

                    <span>
                      {
                        stop.name
                      }
                    </span>

                    <ChevronRight
                      size={
                        14
                      }
                    />
                  </button>
                )
              )}
            </div>

            <div className="route-preview-warning">
              Preview route
              connects database
              stops. It is not
              turn-by-turn road
              navigation yet.
            </div>

            <button
              className="selected-explore-button"
              onClick={() =>
                fitKandyPlaces(
                  activeRouteStops
                )
              }
            >
              Fit journey
              on map

              <Route
                size={
                  17
                }
              />
            </button>
          </aside>
        )}

      {/* ===============================================
          KANDY OVERVIEW
      =============================================== */}

      {mapMode ===
        "kandy" &&
        !activeRoute &&
        !selectedAttraction && (
          <aside className="kandy-overview-card">
            {mapDataUnavailable ? (
              <>
                <div className="kandy-overview-badge">
                  <X
                    size={
                      15
                    }
                  />

                  Data service
                  unavailable
                </div>

                <span className="kandy-overview-region">
                  CENTRAL
                  PROVINCE
                </span>

                <h2>
                  Kandy
                </h2>

                <p>
                  Tourism map data
                  could not be
                  loaded from the
                  travel API.
                  Please try again
                  after the service
                  is available.
                </p>

                <div className="kandy-overview-note">
                  The base map is
                  still available,
                  but attraction
                  points and
                  journeys are
                  temporarily
                  unavailable.
                </div>
              </>
            ) : (
              <>
                <div className="kandy-overview-badge">
                  <ShieldCheck
                    size={
                      15
                    }
                  />

                  Database
                  connected
                </div>

                <span className="kandy-overview-region">
                  CENTRAL
                  PROVINCE
                </span>

                <h2>
                  Kandy
                </h2>

                <p>
                  Explore Sri
                  Lanka&apos;s
                  sacred hill
                  capital through
                  royal heritage,
                  temples,
                  forests,
                  mountains,
                  tea country and
                  living culture.
                </p>

                <div className="kandy-overview-stats">
                  <div>
                    <strong>
                      {
                        kandyMapPoints.length
                      }
                    </strong>

                    <span>
                      database
                      <br />
                      experiences
                    </span>
                  </div>

                  <div>
                    <strong>
                      {
                        allMappedKandyPlaces.length
                      }
                    </strong>

                    <span>
                      mapped
                      <br />
                      locations
                    </span>
                  </div>
                </div>

                <div className="coordinate-progress">
                  <div>
                    <span>
                      Coordinate
                      coverage
                    </span>

                    <strong>
                      {
                        allMappedKandyPlaces.length
                      }
                      /
                      {
                        kandyMapPoints.length
                      }
                    </strong>
                  </div>

                  <div className="coordinate-progress-track">
                    <div
                      className="coordinate-progress-value"
                      style={{
                        width: `${coordinateProgress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="kandy-overview-note">
                  Attraction
                  locations on
                  this map are
                  loaded from the
                  MongoDB-backed
                  tourism API.
                </div>
              </>
            )}
          </aside>
        )}

      {/* ===============================================
          ATTRACTION CARD
      =============================================== */}

      {mapMode ===
        "kandy" &&
        selectedAttraction && (
          <aside className="attraction-map-card">
            <button
              className="selected-map-close"
              onClick={() => {
                setSelectedAttraction(
                  null
                );

                router.replace(
                  "/map?mode=kandy",
                  {
                    scroll:
                      false,
                  }
                );
              }}
              aria-label="Close attraction"
            >
              <X
                size={
                  17
                }
              />
            </button>

            <div className="attraction-card-id">
              {
                selectedAttraction.id
              }
            </div>

            <div className="selected-map-location">
              <MapPin
                size={
                  14
                }
              />

              {
                selectedAttraction.area
              }
            </div>

            <h2>
              {
                selectedAttraction.name
              }
            </h2>

            <div className="attraction-meta-row">
              <span>
                {
                  selectedAttraction.category
                }
              </span>

              <span>
                {
                  selectedAttraction.duration
                }
              </span>
            </div>

            <p>
              {
                selectedAttraction.shortDescription
              }
            </p>

            {selectedAttraction.verified && (
              <div className="attraction-verification">
                <ShieldCheck
                  size={
                    15
                  }
                />

                Map point ·{" "}
                {
                  selectedAttraction.coordinateAccuracy
                }
              </div>
            )}

            {selectedDetailHref ? (
              <Link
                href={
                  selectedDetailHref
                }
                className="selected-explore-button"
              >
                View full
                attraction

                <ChevronRight
                  size={
                    18
                  }
                />
              </Link>
            ) : (
              <button
                className="selected-explore-button disabled"
                disabled
              >
                Detail page
                unavailable

                <ChevronRight
                  size={
                    18
                  }
                />
              </button>
            )}
          </aside>
        )}

      {/* ===============================================
          LEGEND
      =============================================== */}

      {mapMode ===
        "island" && (
          <div className="map-legend">
            <div>
              <span className="legend-dot verified" />

              Verified
            </div>

            <div>
              <span className="legend-dot preview" />

              Preview
            </div>
          </div>
        )}

      {mapMode ===
        "kandy" &&
        !mapDataUnavailable && (
          <div className="map-legend">
            {boundaryGeoJson && (
              <div>
                <span className="legend-boundary" />

                District
                boundary
              </div>
            )}

            {activeRoute ? (
              <div>
                <span className="legend-route" />

                Journey
                preview
              </div>
            ) : (
              <>
                <div>
                  <span className="legend-dot verified" />

                  Attraction
                </div>

                <div>
                  <span className="legend-cluster-example">
                    5
                  </span>

                  Cluster
                </div>
              </>
            )}
          </div>
        )}
    </section>
  );
}