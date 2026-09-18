import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBuilding from "../../../assets/images/hero-building.jpg";
import dashboard from "../../../assets/images/dashboard.png";
import {
  RiCalendarCheckLine,
  RiTeamLine,
  RiBarChartBoxLine,
  RiSmartphoneLine,
  RiArrowRightLine,
  RiCheckLine,
  RiAddLine,
  RiSubtractLine,
  RiStarFill,
  RiTwitterXLine,
  RiLinkedinFill,
  RiInstagramLine,
  RiFacebookCircleFill,
  RiAppsLine,
} from "react-icons/ri";
import "../../../assets/styles/landingPage.css";

const STATS = [
  {
    value: "1,200+",
    label: "Businesses onboarded",
  },
  {
    value: "3",
    label: "Business Operating Systems",
  },
  {
    value: "99.9%",
    label: "Platform uptime",
  },
  {
    value: "24/7",
    label: "Priority support",
  },
];

const BOS_PRODUCTS = [
  {
    id: "tyre",
    icon: "🛞",
    name: "Tyre BOS",
    tagline: "Inventory, sales and service for tyre outlets.",
    features: [
      "Tyre inventory & stock",
      "Sales & billing",
      "Service & fitting tracking",
      "Supplier purchase orders",
    ],
  },
  {
    id: "transport",
    icon: "🚚",
    name: "Transport BOS",
    tagline: "Fleet, drivers and trips for transport businesses.",
    features: [
      "Fleet management",
      "Trip & driver management",
      "Billing & payments",
      "Document tracking",
    ],
  },
  {
    id: "tailor",
    icon: "🪡",
    name: "Tailor BOS",
    tagline: "Measurements, orders and delivery for tailoring shops.",
    features: [
      "Customer measurements",
      "Order management",
      "Fabric & inventory",
      "Delivery tracking",
    ],
  },
];

const SERVICE_FEATURES = [
  {
    icon: <RiCalendarCheckLine />,
    title: "Online booking",
    description:
      "Customers book appointments or services in a few taps, any time of day.",
  },
  {
    icon: <RiTeamLine />,
    title: "Staff scheduling",
    description:
      "Assign jobs to the right person automatically based on availability and skill.",
  },
  {
    icon: <RiSmartphoneLine />,
    title: "SMS & app reminders",
    description:
      "Automatic reminders cut no-shows and keep customers coming back.",
  },
  {
    icon: <RiBarChartBoxLine />,
    title: "Live reporting",
    description:
      "See bookings, revenue and staff performance from one dashboard.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose your BOS",
    description:
      "Pick the Business Operating System built for your industry — Tyre, Transport or Tailor.",
  },
  {
    step: "02",
    title: "Pick a plan",
    description:
      "Start on a 14-day free trial, then choose Standard or Premium as you grow.",
  },
  {
    step: "03",
    title: "Onboard your business",
    description:
      "Add your team, locations and products — most businesses are live within a day.",
  },
  {
    step: "04",
    title: "Start operating",
    description:
      "Take bookings, manage jobs and get paid, all from one connected platform.",
  },
];

const PROVIDER_BENEFITS = [
  "Get discovered by customers actively looking for your service",
  "Manage bookings, staff and inventory from one screen",
  "Accept online payments with same-day settlement",
  "Grow with data — see what's working, branch by branch",
];

const TESTIMONIALS = [
  {
    quote:
      "Switching to Tyre BOS cut our billing time in half and we finally know what's actually in stock.",
    name: "Rajesh M.",
    role: "Owner, Raj Tyres & Wheels",
  },
  {
    quote:
      "Dispatch used to be a spreadsheet nightmare. Now every driver, trip and invoice lives in one place.",
    name: "Suresh Kumar",
    role: "Founder, Sri Lakshmi Transport",
  },
  {
    quote:
      "Our tailors track every measurement digitally now — no more lost order slips.",
    name: "Ramesh B.",
    role: "Owner, Classic Tailors",
  },
];

const FAQS = [
  {
    q: "Do I need to be technical to use a BOS product?",
    a: "No. Every BOS is designed for shop owners and staff, not developers. Most teams are fully onboarded within a day, and support is available if you get stuck.",
  },
  {
    q: "Can I switch plans or products later?",
    a: "Yes. You can upgrade, downgrade, or add another BOS product to your account at any time from your dashboard — billing is prorated automatically.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan starts with a 14-day free trial, no credit card required, so you can try the full product before committing.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your data remains exportable for 30 days after cancellation. We never sell or share your business data with third parties.",
  },
];

const HeroIllustration = () => (
  <svg
    className="landing-page-hero-svg"
    viewBox="0 0 560 460"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="BOS dashboard preview"
  >
    {/* Floating product badges */}

    <g className="landing-page-hero-badge" transform="translate(20,40)">
      <rect width="118" height="40" rx="12" />

      <text x="16" y="26" className="landing-page-hero-badge-text">
        🛞 Tyre BOS
      </text>
    </g>

    <g className="landing-page-hero-badge" transform="translate(420,60)">
      <rect width="130" height="40" rx="12" />

      <text x="16" y="26" className="landing-page-hero-badge-text">
        🚚 Transport BOS
      </text>
    </g>

    <g className="landing-page-hero-badge" transform="translate(400,380)">
      <rect width="122" height="40" rx="12" />

      <text x="16" y="26" className="landing-page-hero-badge-text">
        🪡 Tailor BOS
      </text>
    </g>

    {/* Dashed connector lines */}

    <path d="M139,60 L200,110" className="landing-page-hero-connector" />

    <path d="M420,80 L340,130" className="landing-page-hero-connector" />

    <path d="M420,390 L340,320" className="landing-page-hero-connector" />

    {/* Browser window */}

    <g transform="translate(90,90)">
      <rect
        width="380"
        height="270"
        rx="16"
        className="landing-page-hero-window"
      />

      <rect
        width="380"
        height="34"
        rx="16"
        className="landing-page-hero-window-bar"
      />

      <circle cx="18" cy="17" r="4" className="landing-page-hero-dot" />

      <circle cx="32" cy="17" r="4" className="landing-page-hero-dot" />

      <circle cx="46" cy="17" r="4" className="landing-page-hero-dot" />

      {/* Sidebar */}

      <rect
        x="0"
        y="34"
        width="70"
        height="236"
        className="landing-page-hero-sidebar"
      />

      <rect
        x="14"
        y="54"
        width="42"
        height="6"
        rx="3"
        className="landing-page-hero-sidebar-line"
      />

      <rect
        x="14"
        y="76"
        width="42"
        height="6"
        rx="3"
        className="landing-page-hero-sidebar-line"
      />

      <rect
        x="14"
        y="98"
        width="30"
        height="6"
        rx="3"
        className="landing-page-hero-sidebar-line"
      />

      <rect
        x="14"
        y="120"
        width="36"
        height="6"
        rx="3"
        className="landing-page-hero-sidebar-line"
      />

      {/* Revenue */}

      <rect
        x="86"
        y="52"
        width="130"
        height="56"
        rx="10"
        className="landing-page-hero-card"
      />

      <text x="98" y="76" className="landing-page-hero-card-label">
        Revenue
      </text>

      <text x="98" y="96" className="landing-page-hero-card-value">
        ₹4.8L
      </text>

      {/* Bookings */}

      <rect
        x="228"
        y="52"
        width="130"
        height="56"
        rx="10"
        className="landing-page-hero-card"
      />

      <text x="240" y="76" className="landing-page-hero-card-label">
        Bookings
      </text>

      <text x="240" y="96" className="landing-page-hero-card-value">
        312
      </text>

      {/* Bar chart */}

      <rect
        x="86"
        y="126"
        width="272"
        height="128"
        rx="10"
        className="landing-page-hero-card"
      />

      <rect
        x="104"
        y="220"
        width="18"
        height="20"
        rx="3"
        className="landing-page-hero-bar"
      />

      <rect
        x="132"
        y="200"
        width="18"
        height="40"
        rx="3"
        className="landing-page-hero-bar"
      />

      <rect
        x="160"
        y="180"
        width="18"
        height="60"
        rx="3"
        className="landing-page-hero-bar"
      />

      <rect
        x="188"
        y="160"
        width="18"
        height="80"
        rx="3"
        className="landing-page-hero-bar-accent"
      />

      <rect
        x="216"
        y="190"
        width="18"
        height="50"
        rx="3"
        className="landing-page-hero-bar"
      />

      <rect
        x="244"
        y="170"
        width="18"
        height="70"
        rx="3"
        className="landing-page-hero-bar"
      />

      <rect
        x="272"
        y="150"
        width="18"
        height="90"
        rx="3"
        className="landing-page-hero-bar-accent"
      />

      <rect
        x="300"
        y="185"
        width="18"
        height="55"
        rx="3"
        className="landing-page-hero-bar"
      />
    </g>
  </svg>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="landing-page">
      <section className="landing-page-hero" id="hero">
        <div className="landing-page-hero-bg">
          <img
            src={heroBuilding}
            alt="Modern business building"
            className="landing-page-hero-image"
          />
          <div className="landing-page-hero-image-overlay" />
        </div>

        <div className="landing-page-container landing-page-hero-grid">
          <div className="landing-page-hero-copy">
            <span className="landing-page-eyebrow">BUSINESS OPERATIONS</span>

            <h1 className="landing-page-hero-title">
              One operating system.
              <br />
              <span>Every moving part.</span>
            </h1>

            <div className="landing-page-hero-accent-line" />

            <p className="landing-page-hero-subtitle">
              BIZOOP gives growing businesses a connected operating system for
              managing daily operations, people, customers, inventory, billing
              and more — all from one platform.
            </p>

            <div className="landing-page-hero-actions">
              <button
                type="button"
                className="landing-page-btn-primary"
                onClick={() => navigate("/login")}
              >
                Get Started Free
                <RiArrowRightLine />
              </button>

              <button
                type="button"
                className="landing-page-btn-secondary"
                onClick={() => navigate("/our-products")}
              >
                Explore Products
                <RiArrowRightLine />
              </button>
            </div>
          </div>
          <div className="landing-page-hero-visual">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className="landing-page-stats">
        <div className="landing-page-container landing-page-stats-grid">
          {STATS.map((stat) => (
            <div className="landing-page-stat" key={stat.label}>
              <strong>{stat.value}</strong>

              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>


      <section className="landing-page-section" id="vision">
        <div className="landing-page-container landing-page-split">
          <div className="landing-page-split-copy">
            <span className="landing-page-eyebrow">
              BUSINESS OPERATING SYSTEM
            </span>

            <h2 className="landing-page-section-title">
              Ready-made BOS solutions for the way your business works
            </h2>

            <p className="landing-page-section-subtitle">
              BIZOOP provides ready-to-use Business Operating Systems designed
              for specific industries — giving you the tools to manage your
              business operations from one connected platform.
            </p>

            <div className="landing-page-feature-grid">
              {SERVICE_FEATURES.map((feature) => (
                <div className="landing-page-feature-card" key={feature.title}>
                  <div className="landing-page-feature-icon">
                    {feature.icon}
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="landing-page-split-visual landing-page-bos-visual">
            <div className="landing-page-bos-image-wrapper">
              <img
                src={dashboard}
                alt="BIZOOP Business Operating System"
                className="landing-page-bos-section-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="landing-page-section landing-page-section-alt"
        id="bos"
      >
        <div className="landing-page-container">
          <div className="landing-page-section-head">
            <span className="landing-page-eyebrow">
              BUSINESS OPERATING SYSTEMS
            </span>

            <h2 className="landing-page-section-title">
              Built for your industry, not generic software
            </h2>

            <p className="landing-page-section-subtitle">
              Pick the BOS that matches your business — each one ships with the
              modules and workflows your industry actually needs.
            </p>
          </div>

          <div className="landing-page-bos-grid">
            {BOS_PRODUCTS.map((product) => (
              <div className="landing-page-bos-card" key={product.id}>
                <div className="landing-page-bos-icon">{product.icon}</div>

                <h3>{product.name}</h3>

                <p>{product.tagline}</p>

                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>
                      <RiCheckLine />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="landing-page-bos-link"
                  onClick={() => navigate("/our-products")}
                >
                  Explore {product.name}
                  <RiArrowRightLine />
                </button>
              </div>
            ))}

            {/* More BOS Solutions */}
            <div className="landing-page-bos-card landing-page-bos-more-card">
              <div className="landing-page-bos-icon landing-page-bos-more-icon">
                <RiAppsLine />
              </div>

              <span className="landing-page-bos-more-badge">COMING SOON</span>

              <h3>More BOS Solutions</h3>

              <p>
                More industry-focused Business Operating Systems are being added
                to the BIZOOP marketplace.
              </p>

              <ul>
                <li>
                  <RiCheckLine />
                  More industries
                </li>

                <li>
                  <RiCheckLine />
                  Ready-to-use workflows
                </li>

                <li>
                  <RiCheckLine />
                  Industry-specific modules
                </li>
              </ul>

              <button
                type="button"
                className="landing-page-bos-link"
                onClick={() => navigate("/our-products")}
              >
                View all BOS
                <RiArrowRightLine />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-page-section" id="how-it-works">
        <div className="landing-page-container">
          <div className="landing-page-section-head">
            <span className="landing-page-eyebrow">HOW IT WORKS</span>

            <h2 className="landing-page-section-title">
              From sign-up to live in a day
            </h2>
          </div>

          <div className="landing-page-steps">
            {HOW_IT_WORKS.map((item, index) => (
              <div className="landing-page-step" key={item.step}>
                <div className="landing-page-step-number">{item.step}</div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                {index < HOW_IT_WORKS.length - 1 && (
                  <span className="landing-page-step-connector" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="landing-page-section landing-page-providers"
        id="providers"
      >
        <div className="landing-page-container landing-page-split">
          <div className="landing-page-split-copy">
            <span className="landing-page-eyebrow">FOR BUSINESS OWNERS</span>

            <h2 className="landing-page-section-title">
              Bring your business onto BIZOOP
            </h2>

            <p className="landing-page-section-subtitle">
              Join thousands of businesses already using a BOS to run day-to-day
              operations and get discovered by new customers.
            </p>

            <ul className="landing-page-check-list">
              {PROVIDER_BENEFITS.map((benefit) => (
                <li key={benefit}>
                  <RiCheckLine />

                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="landing-page-split-visual landing-page-providers-visual">
            <div className="landing-page-provider-stat-card">
              <span>Avg. revenue increase</span>

              <strong>+27%</strong>

              <small>within 3 months of onboarding</small>
            </div>

            <div className="landing-page-provider-stat-card landing-page-provider-stat-card-accent">
              <span>Setup time</span>

              <strong>&lt; 1 day</strong>

              <small>from sign-up to first booking</small>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-page-section landing-page-section-alt">
        <div className="landing-page-container">
          <div className="landing-page-section-head">
            <span className="landing-page-eyebrow">TESTIMONIALS</span>

            <h2 className="landing-page-section-title">
              Businesses running on BIZOOP
            </h2>
          </div>

          <div className="landing-page-testimonial-grid">
            {TESTIMONIALS.map((testimonial) => (
              <div
                className="landing-page-testimonial-card"
                key={testimonial.name}
              >
                <div className="landing-page-testimonial-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <RiStarFill key={i} />
                  ))}
                </div>

                <p>
                  &ldquo;
                  {testimonial.quote}
                  &rdquo;
                </p>

                <div className="landing-page-testimonial-author">
                  <strong>{testimonial.name}</strong>

                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-page-section">
        <div className="landing-page-container landing-page-pricing-teaser">
          <div>
            <span className="landing-page-eyebrow">PRICING</span>

            <h2 className="landing-page-section-title">
              Simple plans that grow with you
            </h2>

            <p className="landing-page-section-subtitle">
              Every product starts free. Upgrade to Standard or Premium only
              when you need to.
            </p>
          </div>

          <button
            type="button"
            className="landing-page-btn-primary"
            onClick={() => navigate("/pricing")}
          >
            View Pricing
            <RiArrowRightLine />
          </button>
        </div>
      </section>

      <section
        className="landing-page-section landing-page-section-alt"
        id="faq"
      >
        <div className="landing-page-container landing-page-faq-wrap">
          <div className="landing-page-section-head">
            <span className="landing-page-eyebrow">FAQ</span>

            <h2 className="landing-page-section-title">Common questions</h2>
          </div>

          <div className="landing-page-faq-list">
            {FAQS.map((item, index) => (
              <div
                key={item.q}
                className={`landing-page-faq-item ${
                  openFaq === index ? "landing-page-faq-item-open" : ""
                }`}
              >
                <button
                  type="button"
                  className="landing-page-faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{item.q}</span>

                  {openFaq === index ? <RiSubtractLine /> : <RiAddLine />}
                </button>

                {openFaq === index && (
                  <p className="landing-page-faq-answer">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-page-final-cta">
        <div className="landing-page-container landing-page-final-cta-inner">
          <h2>Ready to run your business better?</h2>

          <p>Start your 14-day free trial today — no credit card required.</p>

          <button
            type="button"
            className="landing-page-btn-primary landing-page-btn-light"
            onClick={() => navigate("/login")}
          >
            Get Started Free
            <RiArrowRightLine />
          </button>
        </div>
      </section>

      <footer className="landing-page-footer">
        <div className="landing-page-container landing-page-footer-grid">
          <div className="landing-page-footer-brand">
            <span className="landing-page-footer-logo">BIZOOP</span>

            <p>
              Business Operating Systems for tyre, transport and tailoring
              businesses.
            </p>

            <div className="landing-page-footer-socials">
              <a
                href="#"
                aria-label="Twitter"
                onClick={(e) => e.preventDefault()}
              >
                <RiTwitterXLine />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                onClick={(e) => e.preventDefault()}
              >
                <RiLinkedinFill />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                onClick={(e) => e.preventDefault()}
              >
                <RiInstagramLine />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                onClick={(e) => e.preventDefault()}
              >
                <RiFacebookCircleFill />
              </a>
            </div>
          </div>

          <div className="landing-page-footer-col">
            <h4>Product</h4>

            <button type="button" onClick={() => navigate("/our-products")}>
              All Products
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  navigate("/#bos");
                } else {
                  document.getElementById("bos")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              Tyre BOS
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  navigate("/#bos");
                } else {
                  document.getElementById("bos")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              Transport BOS
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  navigate("/#bos");
                } else {
                  document.getElementById("bos")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              Tailor BOS
            </button>

            <button type="button" onClick={() => navigate("/pricing")}>
              Pricing
            </button>
          </div>
          <div className="landing-page-footer-col">
            <h4>Company</h4>

            <button
              type="button"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  navigate("/#how-it-works");
                } else {
                  document.getElementById("how-it-works")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              How it works
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  navigate("/#providers");
                } else {
                  document.getElementById("providers")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              For providers
            </button>

            <button type="button" onClick={(e) => e.preventDefault()}>
              About us
            </button>

            <button type="button" onClick={(e) => e.preventDefault()}>
              Careers
            </button>
          </div>

          <div className="landing-page-footer-col">
            <h4>Support</h4>

            <button type="button" onClick={(e) => e.preventDefault()}>
              Help Center
            </button>

            <button type="button" onClick={(e) => e.preventDefault()}>
              Contact Us
            </button>

            <button type="button" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </button>

            <button type="button" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </button>
          </div>
        </div>

        <div className="landing-page-container landing-page-footer-bottom">
          <span>© {new Date().getFullYear()} BIZOOP. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;