"use client";

import {
  ArrowRight,
  Binoculars,
  ChevronDown,
  Compass,
  Heart,
  Leaf,
  Map,
  MapPin,
  Menu,
  Mountain,
  Search,
  ShieldCheck,
  Sparkles,
  TreePine,
  Waves,
  X,
} from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    title: "Heritage",
    subtitle: "Kingdoms, temples & ancient stories",
    icon: <Sparkles size={22} />,
  },
  {
    title: "Nature",
    subtitle: "Forests, waterfalls & hidden trails",
    icon: <Leaf size={22} />,
  },
  {
    title: "Wildlife",
    subtitle: "Explore Sri Lanka's wild side",
    icon: <Binoculars size={22} />,
  },
  {
    title: "Mountains",
    subtitle: "Trails, mist & unforgettable views",
    icon: <Mountain size={22} />,
  },
  {
    title: "Beaches",
    subtitle: "Coastlines, surf & island sunsets",
    icon: <Waves size={22} />,
  },
];

const featuredPlaces = [
  {
    name: "Kandy",
    region: "Central Province",
    tag: "Culture & Heritage",
    description:
      "Sacred temples, royal history and mist-covered mountains in the cultural heart of Sri Lanka.",
    image:
      "https://images.unsplash.com/photo-1588258524675-c6192f2c7da3?auto=format&fit=crop&w=1200&q=85",
    size: "large",
  },
  {
    name: "Sigiriya",
    region: "Central Sri Lanka",
    tag: "Ancient Wonder",
    description: "Rise above the jungle to an ancient kingdom in the sky.",
    image:
      "https://images.unsplash.com/photo-1586613835347-2b95f80d43ba?auto=format&fit=crop&w=1000&q=85",
    size: "small",
  },
  {
    name: "Ella",
    region: "Uva Province",
    tag: "Mountains",
    description: "Tea hills, railway journeys and dramatic mountain trails.",
    image:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1000&q=85",
    size: "small",
  },
];

const journeys = [
  {
    number: "01",
    title: "Sacred Kandy",
    text: "Temple heritage, royal history and the timeless streets of Sri Lanka's last kingdom.",
    meta: "1 day · Culture",
  },
  {
    number: "02",
    title: "Tea Country",
    text: "Travel from historic estates into misty hills where the story of Ceylon Tea began.",
    meta: "2 days · Nature",
  },
  {
    number: "03",
    title: "Wild Highlands",
    text: "Mountain trails, forests, waterfalls and panoramic viewpoints across the central hills.",
    meta: "3 days · Adventure",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <main>
      {/* NAVIGATION */}
      <header className="nav-shell">
        <nav className="navbar container">
          <a href="#" className="brand" aria-label="Lanka Travel Explorer Home">
            <div className="brand-mark">
              <Compass size={22} strokeWidth={1.8} />
            </div>

            <div className="brand-copy">
              <strong>LANKA</strong>
              <span>TRAVEL EXPLORER</span>
            </div>
          </a>

          <div className="desktop-nav">
            <a href="#discover">Discover</a>
            <a href="#destinations">Destinations</a>
            <a href="#journeys">Journeys</a>
            <a href="/map">Map</a>
          </div>

          <div className="nav-actions">
            <button className="nav-search" aria-label="Search">
              <Search size={19} />
            </button>

            <button className="saved-button">
              <Heart size={18} />
              <span>Saved</span>
            </button>

            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="#discover" onClick={() => setMenuOpen(false)}>
              Discover
            </a>
            <a href="#destinations" onClick={() => setMenuOpen(false)}>
              Destinations
            </a>
            <a href="#journeys" onClick={() => setMenuOpen(false)}>
              Journeys
            </a>
            <a href="#map" onClick={() => setMenuOpen(false)}>
              Map
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Your guide to Sri Lanka
            </div>

            <h1>
              One island.
              <br />
              <span>Endless stories.</span>
            </h1>

            <p>
              From sacred cities and misty mountains to wild forests and
              hidden beaches — discover Sri Lanka with everything you need
              for the journey.
            </p>

            <div className="hero-actions">
              <a href="#destinations" className="primary-button">
                Explore Sri Lanka
                <ArrowRight size={18} />
              </a>

              <a href="/map" className="glass-button">
                <Map size={18} />
                Open Map
              </a>
            </div>
          </div>

          <div className="hero-discovery-card">
            <div className="discovery-title">
              <div>
                <span>START EXPLORING</span>
                <h2>Where do you want to go?</h2>
              </div>

              <MapPin size={25} />
            </div>

            <div className="search-box">
              <Search size={20} />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Kandy, Ella, Sigiriya..."
                aria-label="Search destinations"
              />

              <button aria-label="Search">
                <ArrowRight size={19} />
              </button>
            </div>

            <div className="quick-search">
              <span>Popular:</span>
              <button>Kandy</button>
              <button>Sigiriya</button>
              <button>Ella</button>
              <button>Galle</button>
            </div>

            <div className="location-hint">
              <Compass size={17} />
              <span>Or explore places around you</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="container hero-bottom-inner">
            <span>Scroll to discover</span>
            <div className="scroll-line" />
            <span>07.8731° N · 80.7718° E</span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container trust-grid">
          <div>
            <ShieldCheck size={21} />
            <span>
              <strong>Verified information</strong>
              Official & trusted sources
            </span>
          </div>

          <div>
            <MapPin size={21} />
            <span>
              <strong>Real travel guidance</strong>
              Routes, access & practical info
            </span>
          </div>

          <div>
            <Compass size={21} />
            <span>
              <strong>Built for exploring</strong>
              Simple, clear & traveller friendly
            </span>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="discover">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">FIND YOUR JOURNEY</span>
              <h2>Explore your way</h2>
            </div>

            <p>
              Every traveller sees Sri Lanka differently. Start with what
              inspires you.
            </p>
          </div>

          <div className="experience-grid">
            {experiences.map((item) => (
              <button className="experience-card" key={item.title}>
                <div className="experience-icon">{item.icon}</div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>

                <ArrowRight className="experience-arrow" size={19} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section destination-section" id="destinations">
        <div className="container">
          <div className="section-heading align-end">
            <div>
              <span className="section-kicker">FEATURED DESTINATIONS</span>
              <h2>Places worth the journey</h2>
            </div>

            <button className="text-button">
              View all destinations
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="destination-grid">
            {featuredPlaces.map((place) => (
              <article
                key={place.name}
                className={`destination-card ${place.size}`}
                style={{ backgroundImage: `url("${place.image}")` }}
              >
                <div className="destination-overlay" />

                <button
                  className="heart-floating"
                  aria-label={`Save ${place.name}`}
                >
                  <Heart size={19} />
                </button>

                <div className="destination-content">
                  <span className="destination-tag">{place.tag}</span>
                  <span className="destination-region">
                    <MapPin size={14} />
                    {place.region}
                  </span>

                  <h3>{place.name}</h3>
                  <p>{place.description}</p>

                  <button className="explore-link">
                    Explore {place.name}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MAP TEASER */}
      <section className="map-section" id="map">
        <div className="map-background">
          <div className="map-grid-lines" />

          <div className="island-visual">
            <div className="island-glow" />
            <div className="map-pin pin-one">
              <span />
              Kandy
            </div>
            <div className="map-pin pin-two">
              <span />
              Sigiriya
            </div>
            <div className="map-pin pin-three">
              <span />
              Ella
            </div>
          </div>
        </div>

        <div className="container map-content">
          <div className="map-copy">
            <span className="section-kicker light">EXPLORE THE MAP</span>

            <h2>
              See the island.
              <br />
              <span>Find your next stop.</span>
            </h2>

            <p>
              Discover attractions, transport, trails, heritage sites and
              essential traveller services in one intelligent map.
            </p>

            <button className="primary-button light-button">
              <Map size={18} />
              Explore interactive map
            </button>
          </div>

          <div className="map-stat-card">
            <div>
              <span>STARTING WITH</span>
              <strong>30</strong>
              <p>verified Kandy experiences</p>
            </div>

            <div className="stat-divider" />

            <div>
              <span>EXPLORE</span>
              <strong>8+</strong>
              <p>travel experience types</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEYS */}
      <section className="section journeys-section" id="journeys">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">CURATED JOURNEYS</span>
              <h2>Start with a story</h2>
            </div>

            <p>
              Thoughtfully connected places that make exploring easier,
              richer and more memorable.
            </p>
          </div>

          <div className="journey-list">
            {journeys.map((journey) => (
              <article className="journey-row" key={journey.number}>
                <span className="journey-number">{journey.number}</span>

                <div>
                  <span className="journey-meta">{journey.meta}</span>
                  <h3>{journey.title}</h3>
                </div>

                <p>{journey.text}</p>

                <button aria-label={`Explore ${journey.title}`}>
                  <ArrowRight size={20} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HELP */}
      <section className="help-section">
        <div className="container help-card">
          <div className="help-icon">
            <TreePine size={27} />
          </div>

          <div>
            <span>TRAVEL WITH CONFIDENCE</span>
            <h2>Need help while exploring Sri Lanka?</h2>
            <p>
              Find tourist assistance, emergency services, hospitals,
              transport information and practical visitor support.
            </p>
          </div>

          <button className="help-button">
            Traveller Help
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container footer-main">
          <div>
            <a href="#" className="brand footer-brand">
              <div className="brand-mark">
                <Compass size={22} />
              </div>

              <div className="brand-copy">
                <strong>LANKA</strong>
                <span>TRAVEL EXPLORER</span>
              </div>
            </a>

            <p className="footer-description">
              A smarter way to discover the stories, landscapes and journeys
              of Sri Lanka.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <a href="#">Destinations</a>
              <a href="#">Experiences</a>
              <a href="#">Interactive Map</a>
            </div>

            <div>
              <strong>Plan</strong>
              <a href="#">Journeys</a>
              <a href="#">Transport</a>
              <a href="#">Traveller Help</a>
            </div>

            <div>
              <strong>About</strong>
              <a href="#">Our Data</a>
              <a href="#">Sources</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Lanka Travel Explorer</span>
          <span>Built for discovering Sri Lanka.</span>
        </div>
      </footer>
    </main>
  );
}