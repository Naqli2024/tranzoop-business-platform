import React from "react";
import "../../assets/styles/landingPage.css";
import logisticsImg from "../../assets/images/logistics.png";
import truckImg from "../../assets/images/truck.png";
import { BsTruck } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import CardsSection from "./CardsSection";
import { useNavigate } from "react-router-dom";

const serviceCards = [
  
  {
    category: "TRANSPORT",
    title: "Goods Transportation",
    description: "Move cargo across cities with verified transport providers.",
    tags: ["Truck", "Container", "Fleet"],
  },
  {
    category: "WAREHOUSING",
    title: "Warehouse Services",
    description: "Find storage, warehousing and distribution services near you.",
    tags: ["Storage", "Cold Chain", "Distribution"],
  },
  {
    category: "LOGISTICS",
    title: "Logistics Services",
    description: "Book reliable logistics services for your business operations.",
    tags: ["Freight", "Delivery", "Tracking"],
  },
  {
    category: "BUSINESS",
    title: "Business Services",
    description: "Connect with trusted providers for your day-to-day business needs.",
    tags: ["Operations", "Support", "Services"],
  },
];

const GROUND_Y = 800; // bottom of viewBox = top of hero-metrics

// Deterministic pseudo-random so SSR/CSR always match
const seededRandom = (seed) => {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
};

const buildLayout = ({ count, minW, maxW, minH, maxH, gap, seedOffset }) => {
  let x = 0;
  const buildings = [];
  for (let i = 0; i < count; i++) {
    const w = Math.round(minW + seededRandom(i + seedOffset) * (maxW - minW));
    const h = Math.round(
      minH + seededRandom(i + seedOffset + 50) * (maxH - minH)
    );
    buildings.push({ x, width: w, height: h, y: GROUND_Y - h });
    x += w + gap;
  }
  return buildings;
};

const buildWindows = (b, { winW, winH, gapX, gapY, marginX, marginTop, marginBottom }) => {
  const usableW = b.width - marginX * 2;
  const usableH = b.height - marginTop - marginBottom;
  const cols = Math.max(1, Math.floor((usableW + gapX) / (winW + gapX)));
  const rows = Math.max(1, Math.floor((usableH + gapY) / (winH + gapY)));
  const rowW = cols * winW + (cols - 1) * gapX;
  const startX = b.x + (b.width - rowW) / 2;
  const startY = b.y + marginTop;

  const windows = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      windows.push({
        x: startX + c * (winW + gapX),
        y: startY + r * (winH + gapY),
      });
    }
  }
  return windows;
};

const SkylineLayer = ({ layer }) => {
  const isFront = layer === "front";

  const buildings = buildLayout(
    isFront
      ? { count: 4, minW: 60, maxW: 95, minH: 260, maxH: 620, gap: 30, seedOffset: 0 }
      : { count: 14, minW: 55, maxW: 85, minH: 160, maxH: 360, gap: 34, seedOffset: 100 }
  );

  const winSettings = isFront
    ? { winW: 7, winH: 11, gapX: 11, gapY: 22, marginX: 12, marginTop: 22, marginBottom: 18 }
    : { winW: 6, winH: 9, gapX: 14, gapY: 26, marginX: 10, marginTop: 18, marginBottom: 16 };

  return (
    <g className={`hero-skyline-${layer}`}>
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.width} height={b.height} />
          {buildWindows(b, winSettings).map((w, wi) => (
            <rect key={wi} x={w.x} y={w.y} width={winSettings.winW} height={winSettings.winH} />
          ))}
        </g>
      ))}
    </g>
  );
};
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-main">
      <div className="hero-background-overlay" />
      <svg
          className="hero-skyline"
          viewBox="0 0 1600 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <SkylineLayer layer="front" />
        </svg>
          <img
    src={logisticsImg}
    alt=""
    aria-hidden="true"
    className="hero-logistics-graphic"
  />
          <img
    src={truckImg}
    alt=""
    aria-hidden="true"
    className="hero-truck-graphic"
  />
      <div className="hero-container container">
        <div className="hero-content">
          <div className="hero-status">
            <span className="hero-status-dot" />
            <span>NOW TRACKING SHIPMENTS LIVE ACROSS INDIA</span>
          </div>
          <h1 className="hero-title">
            <div className="mb-2">One Platform</div>
            <span>Infinite</span> Possibilities
          </h1>
          <p className="hero-small-desc">Book Services. Run your business</p>
          <p className="hero-small-desc">Grow Everywhere</p>
          <p className="hero-description">
            TranZoop
            connects logistics services with powerful Business Operating Solutions
            to help you operate,
            manage and grow your entire business digitally.
          </p>
          <div className="hero-actions">
            <button className="hero-primary-btn">
              <BsTruck size={18}/>Book a service
            </button>

            <button className="hero-secondary-btn" onClick={()=>navigate('/our-products')}>
              <MdOutlineDashboard size={18}/>Explore BOS
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-cards-wrapper">
            <CardsSection
              randomRotation
              sensitivity={300}
              sendToBackOnClick={false}
              cards={serviceCards.map((service, i) => (
                <div className="hero-service-card" key={i}>
                  <div className="hero-service-card-top">
                    <span className="hero-service-category">
                      {service.category}
                    </span>

                    <span className="hero-service-number">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="hero-service-icon">
                    {i === 0 && "🚛"}
                    {i === 1 && "🏭"}
                    {i === 2 && "📦"}
                    {i === 3 && "🏢"}
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <div className="hero-service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="hero-service-link">
                    Explore service <span>↗</span>
                  </div>
                </div>
              ))}
              autoplay
              autoplayDelay={2000}
              pauseOnHover
            />
          </div>
        </div>
      </div>
      </div>
      <div className="hero-metrics">
        <div className="hero-metrics-container container">
          <div className="hero-metric">
            <strong>40+</strong>
            <span>service categories</span>
          </div>
          <div className="hero-metric">
            <strong>20+</strong>
            <span>ready-made ERP modules</span>
          </div>
          <div className="hero-metric">
            <strong>Pan-India</strong>
            <span>provider network</span>
          </div>
          <div className="hero-metric">
            <strong>1</strong>
            <span>account for booking, ops & accounting</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;