import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Bus,
  CalendarCheck,
  Car,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  Footprints,
  Info,
  Landmark,
  Mail,
  Map,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Ticket,
  Train,
  UserRoundCheck,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import {
  getAttractionBySlug,
} from "@/lib/api/attractions";

import styles from "./page.module.css";

interface AttractionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(
  value?: string
): string {
  if (!value) {
    return "Verification pending";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

export default async function AttractionPage({
  params,
}: AttractionPageProps) {
  const { slug } =
    await params;

  const attraction =
    await getAttractionBySlug(
      slug
    );

  if (!attraction) {
    notFound();
  }

  const atlasHref =
    `/map?mode=kandy&attraction=${encodeURIComponent(
      attraction.attractionId
    )}`;

  const firstTicket =
    attraction.prices[0]
      ?.amount;

  return (
    <main className={styles.page}>
      {/* =====================================
          HEADER
      ====================================== */}

      <header className={styles.header}>
        <Link
          href={atlasHref}
          className={
            styles.backButton
          }
        >
          <ArrowLeft size={18} />

          <span>
            Back to Atlas
          </span>
        </Link>

        <Link
          href="/"
          className={styles.brand}
        >
          <div
            className={
              styles.brandMark
            }
          >
            <Navigation
              size={19}
            />
          </div>

          <div>
            <strong>
              LANKA
            </strong>

            <span>
              TRAVEL EXPLORER
            </span>
          </div>
        </Link>

        <Link
          href={atlasHref}
          className={
            styles.mapButton
          }
        >
          <Map size={17} />

          Open Atlas
        </Link>
      </header>

      {/* =====================================
          HERO
      ====================================== */}

      <section className={styles.hero}>
        <div
          className={
            styles.heroTexture
          }
        />

        <div
          className={
            styles.heroGlowOne
          }
        />

        <div
          className={
            styles.heroGlowTwo
          }
        />

        <div
          className={
            styles.heroContent
          }
        >
          <div
            className={
              styles.heroMeta
            }
          >
            {attraction.verified && (
              <span
                className={
                  styles.verifiedBadge
                }
              >
                <ShieldCheck
                  size={15}
                />

                Officially verified
              </span>
            )}

            <span>
              {
                attraction.attractionId
              }
            </span>

            <span>
              {
                attraction.category
              }
            </span>
          </div>

          <div
            className={
              styles.heroGrid
            }
          >
            <div>
              <div
                className={
                  styles.locationLine
                }
              >
                <MapPin
                  size={16}
                />

                {
                  attraction.area
                }
                {" · "}
                {
                  attraction.district
                }
              </div>

              <h1>
                {
                  attraction.name
                }
              </h1>

              {attraction.shortName && (
                <p
                  className={
                    styles.shortName
                  }
                >
                  {
                    attraction.shortName
                  }
                </p>
              )}

              {attraction.tagline && (
                <p
                  className={
                    styles.tagline
                  }
                >
                  {
                    attraction.tagline
                  }
                </p>
              )}
            </div>

            <div
              className={
                styles.heroQuickInfo
              }
            >
              <div>
                <Clock3
                  size={19}
                />

                <span>
                  Visit time
                </span>

                <strong>
                  {
                    attraction.visitDuration
                  }
                </strong>
              </div>

              <div>
                <CalendarCheck
                  size={19}
                />

                <span>
                  Opening
                </span>

                <strong>
                  {attraction.openingHours
                    ? `${attraction.openingHours.open} – ${attraction.openingHours.close}`
                    : "Check details"}
                </strong>
              </div>

              <div>
                <Ticket
                  size={19}
                />

                <span>
                  Foreign tickets
                </span>

                <strong>
                  {firstTicket
                    ? `From ${firstTicket}`
                    : "Check official source"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            styles.heroCoordinates
          }
        >
          <span>
            {
              attraction.coordinates
                .latitude
            }
            ° N
          </span>

          <span>
            {
              attraction.coordinates
                .longitude
            }
            ° E
          </span>
        </div>
      </section>

      {/* =====================================
          QUICK NAV
      ====================================== */}

      <nav
        className={
          styles.quickNav
        }
      >
        <div
          className={
            styles.contentWidth
          }
        >
          <a href="#overview">
            Overview
          </a>

          <a href="#visit">
            Plan your visit
          </a>

          <a href="#getting-there">
            Getting there
          </a>

          <a href="#guidelines">
            Guidelines
          </a>

          <a href="#safety">
            Safety
          </a>

          <a href="#sources">
            Sources
          </a>
        </div>
      </nav>

      {/* =====================================
          MAIN
      ====================================== */}

      <div
        className={`${styles.contentWidth} ${styles.mainLayout}`}
      >
        <div
          className={
            styles.mainColumn
          }
        >
          {/* OVERVIEW */}

          <section
            id="overview"
            className={
              styles.section
            }
          >
            <div
              className={
                styles.sectionKicker
              }
            >
              <Sparkles
                size={15}
              />

              DISCOVER
            </div>

            <h2>
              A living sacred
              landmark
            </h2>

            <p
              className={
                styles.lead
              }
            >
              {attraction.description ??
                attraction.shortDescription}
            </p>

            {attraction.highlights
              .length > 0 && (
              <div
                className={
                  styles.highlightGrid
                }
              >
                {attraction.highlights.map(
                  (
                    highlight
                  ) => (
                    <div
                      key={
                        highlight
                      }
                      className={
                        styles.highlightItem
                      }
                    >
                      <Check
                        size={15}
                      />

                      <span>
                        {
                          highlight
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          {/* PLAN VISIT */}

          <section
            id="visit"
            className={
              styles.section
            }
          >
            <div
              className={
                styles.sectionKicker
              }
            >
              <Clock3
                size={15}
              />

              PLAN YOUR VISIT
            </div>

            <h2>
              Hours, rituals &
              tickets
            </h2>

            {attraction.openingHours && (
              <div
                className={
                  styles.hoursCard
                }
              >
                <div>
                  <span>
                    {
                      attraction
                        .openingHours
                        .days
                    }
                  </span>

                  <strong>
                    {
                      attraction
                        .openingHours
                        .open
                    }
                    {" – "}
                    {
                      attraction
                        .openingHours
                        .close
                    }
                  </strong>

                  <small>
                    {
                      attraction
                        .openingHours
                        .timezone
                    }
                  </small>
                </div>

                <CalendarCheck
                  size={34}
                />
              </div>
            )}

            {attraction.schedules
              .length > 0 && (
              <>
                <h3
                  className={
                    styles.subHeading
                  }
                >
                  Daily schedule
                </h3>

                <div
                  className={
                    styles.scheduleGrid
                  }
                >
                  {attraction.schedules.map(
                    (
                      schedule
                    ) => (
                      <article
                        key={`${schedule.label}-${schedule.time}`}
                        className={
                          styles.scheduleCard
                        }
                      >
                        <span>
                          {
                            schedule.label
                          }
                        </span>

                        <strong>
                          {
                            schedule.time
                          }
                        </strong>

                        {schedule.description && (
                          <p>
                            {
                              schedule.description
                            }
                          </p>
                        )}
                      </article>
                    )
                  )}
                </div>
              </>
            )}

            {attraction.prices
              .length > 0 && (
              <>
                <h3
                  className={
                    styles.subHeading
                  }
                >
                  Visitor tickets
                </h3>

                <div
                  className={
                    styles.priceGrid
                  }
                >
                  {attraction.prices.map(
                    (
                      price
                    ) => (
                      <article
                        key={`${price.label}-${price.amount}`}
                        className={
                          styles.priceCard
                        }
                      >
                        <span>
                          {
                            price.label
                          }
                        </span>

                        <strong>
                          {
                            price.amount
                          }
                        </strong>

                        {price.note && (
                          <small>
                            {
                              price.note
                            }
                          </small>
                        )}
                      </article>
                    )
                  )}
                </div>
              </>
            )}

            {attraction.ticketIncludes
              .length > 0 && (
              <div
                className={
                  styles.includedCard
                }
              >
                <div
                  className={
                    styles.includedHeading
                  }
                >
                  <Ticket
                    size={20}
                  />

                  <strong>
                    Ticket includes
                  </strong>
                </div>

                <div
                  className={
                    styles.includedList
                  }
                >
                  {attraction.ticketIncludes.map(
                    (item) => (
                      <span
                        key={
                          item
                        }
                      >
                        <Check
                          size={14}
                        />

                        {
                          item
                        }
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </section>

          {/* TRANSPORT */}

          <section
            id="getting-there"
            className={
              styles.section
            }
          >
            <div
              className={
                styles.sectionKicker
              }
            >
              <Navigation
                size={15}
              />

              GETTING THERE
            </div>

            <h2>
              Simple arrival
              guidance
            </h2>

            {attraction.transport && (
              <div
                className={
                  styles.transportGrid
                }
              >
                <article>
                  <Footprints
                    size={22}
                  />

                  <h3>
                    Walking
                  </h3>

                  <p>
                    {
                      attraction
                        .transport
                        .walking
                    }
                  </p>
                </article>

                <article>
                  <Car
                    size={22}
                  />

                  <h3>
                    Road access
                  </h3>

                  <p>
                    {
                      attraction
                        .transport
                        .roadAccess
                    }
                  </p>
                </article>

                <article>
                  <Train
                    size={22}
                  />

                  <h3>
                    Rail & bus
                  </h3>

                  <p>
                    {
                      attraction
                        .transport
                        .publicTransport
                    }
                  </p>
                </article>

                <article>
                  <Bus
                    size={22}
                  />

                  <h3>
                    Parking
                  </h3>

                  <p>
                    {
                      attraction
                        .transport
                        .parking
                    }
                  </p>
                </article>
              </div>
            )}

            <Link
              href={atlasHref}
              className={
                styles.atlasCTA
              }
            >
              <div>
                <Map
                  size={20}
                />

                <span>
                  Open this
                  location in the
                  tourism atlas
                </span>
              </div>

              <ArrowRight
                size={18}
              />
            </Link>
          </section>

          {/* GUIDELINES */}

          {attraction.visitorGuidelines
            .length > 0 && (
            <section
              id="guidelines"
              className={
                styles.section
              }
            >
              <div
                className={
                  styles.sectionKicker
                }
              >
                <Info
                  size={15}
                />

                BEFORE YOU ENTER
              </div>

              <h2>
                Respectful &
                prepared
              </h2>

              <div
                className={
                  styles.guidelineList
                }
              >
                {attraction.visitorGuidelines.map(
                  (
                    guideline,
                    index
                  ) => (
                    <div
                      key={
                        guideline
                      }
                    >
                      <span>
                        {String(
                          index +
                            1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p>
                        {
                          guideline
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {/* FACILITIES */}

          {(attraction.facilities
            .length >
            0 ||
            attraction.accessibility) && (
            <section
              className={
                styles.section
              }
            >
              <div
                className={
                  styles.sectionKicker
                }
              >
                <UserRoundCheck
                  size={15}
                />

                VISITOR SERVICES
              </div>

              <h2>
                Facilities &
                assistance
              </h2>

              {attraction.facilities
                .length > 0 && (
                <div
                  className={
                    styles.facilitiesGrid
                  }
                >
                  {attraction.facilities.map(
                    (
                      facility
                    ) => (
                      <article
                        key={
                          facility.title
                        }
                      >
                        <Check
                          size={
                            16
                          }
                        />

                        <div>
                          <strong>
                            {
                              facility.title
                            }
                          </strong>

                          <p>
                            {
                              facility.description
                            }
                          </p>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}

              {attraction.accessibility && (
                <div
                  className={
                    styles.accessibilityCard
                  }
                >
                  <UserRoundCheck
                    size={24}
                  />

                  <div>
                    <span>
                      ACCESSIBILITY
                    </span>

                    <strong>
                      {
                        attraction
                          .accessibility
                          .status
                      }
                    </strong>

                    <p>
                      {
                        attraction
                          .accessibility
                          .description
                      }
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* SAFETY */}

          {attraction.safety && (
            <section
              id="safety"
              className={
                styles.section
              }
            >
              <div
                className={
                  styles.sectionKicker
                }
              >
                <ShieldCheck
                  size={15}
                />

                SAFETY & HELP
              </div>

              <h2>
                Help when you
                need it
              </h2>

              <div
                className={
                  styles.securityNotice
                }
              >
                <ShieldCheck
                  size={23}
                />

                <p>
                  {
                    attraction
                      .safety
                      .security
                  }
                </p>
              </div>

              {attraction.safety
                .contacts
                .length > 0 && (
                <div
                  className={
                    styles.contactGrid
                  }
                >
                  {attraction.safety.contacts.map(
                    (
                      contact
                    ) => (
                      <a
                        key={
                          contact.label
                        }
                        href={
                          contact.href ??
                          "#"
                        }
                      >
                        <Phone
                          size={
                            17
                          }
                        />

                        <span>
                          {
                            contact.label
                          }
                        </span>

                        <strong>
                          {
                            contact.value
                          }
                        </strong>
                      </a>
                    )
                  )}
                </div>
              )}
            </section>
          )}

          {/* NEARBY */}

          {attraction.nearby
            .length > 0 && (
            <section
              className={
                styles.section
              }
            >
              <div
                className={
                  styles.sectionKicker
                }
              >
                <MapPin
                  size={15}
                />

                NEARBY
              </div>

              <h2>
                Continue exploring
                Kandy
              </h2>

              <div
                className={
                  styles.nearbyGrid
                }
              >
                {attraction.nearby.map(
                  (place) => (
                    <Link
                      key={
                        place.id
                      }
                      href={`/map?mode=kandy&attraction=${encodeURIComponent(
                        place.id
                      )}`}
                    >
                      <span>
                        {
                          place.id
                        }
                      </span>

                      <strong>
                        {
                          place.name
                        }
                      </strong>

                      <small>
                        {
                          place.category
                        }
                      </small>

                      <ChevronRight
                        size={17}
                      />
                    </Link>
                  )
                )}
              </div>
            </section>
          )}

          {/* SOURCES */}

          {attraction.sources
            .length > 0 && (
            <section
              id="sources"
              className={
                styles.section
              }
            >
              <div
                className={
                  styles.sectionKicker
                }
              >
                <ShieldCheck
                  size={15}
                />

                DATA TRANSPARENCY
              </div>

              <h2>
                Sources &
                verification
              </h2>

              <p
                className={
                  styles.sourceIntro
                }
              >
                Traveller-facing
                operational
                information is
                connected to its
                source so changing
                details can be
                checked and
                maintained.
              </p>

              <div
                className={
                  styles.sourceList
                }
              >
                {attraction.sources.map(
                  (
                    source
                  ) => (
                    <a
                      key={
                        source.url
                      }
                      href={
                        source.url
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div>
                        <span>
                          {
                            source.organization
                          }
                        </span>

                        <strong>
                          {
                            source.title
                          }
                        </strong>

                        <small>
                          Verified{" "}
                          {formatDate(
                            source.verifiedAt
                          )}
                        </small>
                      </div>

                      <ExternalLink
                        size={16}
                      />
                    </a>
                  )
                )}
              </div>
            </section>
          )}
        </div>

        {/* =====================================
            SIDEBAR
        ====================================== */}

        <aside
          className={
            styles.sidebar
          }
        >
          <div
            className={
              styles.sidebarCard
            }
          >
            <span>
              VISIT ESSENTIALS
            </span>

            <div
              className={
                styles.sidebarFact
              }
            >
              <Clock3
                size={17}
              />

              <div>
                <small>
                  Opening
                </small>

                <strong>
                  {attraction.openingHours
                    ? `${attraction.openingHours.open} – ${attraction.openingHours.close}`
                    : "Check details"}
                </strong>
              </div>
            </div>

            <div
              className={
                styles.sidebarFact
              }
            >
              <Ticket
                size={17}
              />

              <div>
                <small>
                  Foreign ticket
                </small>

                <strong>
                  {firstTicket ??
                    "Check source"}
                </strong>
              </div>
            </div>

            <div
              className={
                styles.sidebarFact
              }
            >
              <Clock3
                size={17}
              />

              <div>
                <small>
                  Recommended time
                </small>

                <strong>
                  {
                    attraction.visitDuration
                  }
                </strong>
              </div>
            </div>

            <div
              className={
                styles.verificationBox
              }
            >
              <ShieldCheck
                size={18}
              />

              <div>
                <strong>
                  {attraction.verified
                    ? "Verified"
                    : "Verification pending"}
                </strong>

                <span>
                  {formatDate(
                    attraction.lastVerifiedAt
                  )}
                </span>
              </div>
            </div>
          </div>

          {attraction.contact && (
            <div
              className={
                styles.sidebarCard
              }
            >
              <span>
                CONTACT
              </span>

              <p
                className={
                  styles.address
                }
              >
                {
                  attraction.contact
                    .address
                }
              </p>

              {attraction.contact.phone.map(
                (phone) => (
                  <a
                    href={`tel:${phone.replace(
                      /\s/g,
                      ""
                    )}`}
                    key={
                      phone
                    }
                    className={
                      styles.contactLink
                    }
                  >
                    <Phone
                      size={
                        15
                      }
                    />

                    {phone}
                  </a>
                )
              )}

              {attraction.contact.email && (
                <a
                  href={`mailto:${attraction.contact.email}`}
                  className={
                    styles.contactLink
                  }
                >
                  <Mail
                    size={15}
                  />

                  {
                    attraction.contact
                      .email
                  }
                </a>
              )}
            </div>
          )}

          <Link
            href={atlasHref}
            className={
              styles.sidebarMap
            }
          >
            <MapPin
              size={25}
            />

            <div>
              <span>
                VIEW ON ATLAS
              </span>

              <strong>
                {
                  attraction.coordinates
                    .latitude
                }
                ,{" "}
                {
                  attraction.coordinates
                    .longitude
                }
              </strong>
            </div>

            <ChevronRight
              size={18}
            />
          </Link>
        </aside>
      </div>

      {/* =====================================
          FOOTER
      ====================================== */}

      <footer
        className={
          styles.footer
        }
      >
        <div
          className={
            styles.contentWidth
          }
        >
          <div>
            <Landmark
              size={20}
            />

            <span>
              Lanka Travel
              Explorer
            </span>
          </div>

          <p>
            Verified travel
            information built
            for exploring Sri
            Lanka with
            confidence.
          </p>
        </div>
      </footer>
    </main>
  );
}