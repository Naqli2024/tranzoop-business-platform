import {
  RiArrowRightLine,
  RiCheckLine,
  RiTruckLine,
  RiScissors2Line,
} from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";

import tyreShop from "../../../assets/images/tyre-shop.png";
import tailorShop from "../../../assets/images/tailor.png";
import transport from "../../../assets/images/transport.png";
import moreSolutions from "../../../assets/images/more-solutions.png";

const products = [
  {
    id: "tyre",
    url: "transport",
    number: "01",
    title: "Tyre BOS",
    category: "TYRE & AUTOMOTIVE",
    description:
      "Manage your tyre inventory, sales, billing, services and customers from one simple platform.",
    image: tyreShop,
    icon: <FaCarSide />,
    accent: "var(--primary)",
    modules: [
      "Tyre inventory & stock",
      "Sales & billing",
      "Service & fitting tracking",
      "Supplier purchase orders",
    ],
  },

  {
    id: "transport",
    url: "tyreshop",
    number: "02",
    title: "Transport BOS",
    category: "TRANSPORT & LOGISTICS",
    description: "Fleet, drivers and trips for transport businesses.",
    image: transport,
    icon: <RiTruckLine />,
    accent: "var(--brand-blue)",
    modules: [
      "Fleet management",
      "Trip & driver management",
      "Billing & payments",
      "Document tracking",
    ],
  },

  {
    id: "tailor",
    url: "",
    number: "03",
    title: "Tailor BOS",
    category: "TAILORING & APPAREL",
    description: "Measurements, orders and delivery for tailoring shops.",
    image: tailorShop,
    icon: <RiScissors2Line />,
    accent: "var(--brand-lime)",
    modules: [
      "Customer measurements",
      "Order management",
      "Fabric & inventory",
      "Delivery tracking",
    ],
  },

  {
    id: "more",
    number: "04",
    title: "More BOS Solutions",
    category: "MORE INDUSTRIES",
    description:
      "More industry-focused Business Operating Systems are being added to the BIZOOP marketplace.",
    image: moreSolutions,
    icon: <RiArrowRightLine />,
    accent: "var(--brand-orange)",
    modules: [
      "More industries",
      "Ready-to-use workflows",
      "Industry-specific modules",
      "Industry-focused BOS",
    ],
    comingSoon: true,
  },
];

const ProductsSection = () => {

  const goToPricing = (product) => {
    // navigate(`${product.path}?product=${product.slug}`);
    window.location.href = `https://bizoop.in/${product.url}`;
  };

  return (
    <section className="generated-products-section" id="products">
      <div className="generated-products-decoration generated-products-decoration-left" />
      <div className="generated-products-decoration generated-products-decoration-right" />

      <div className="landing-page-container generated-products-container">
        <div className="generated-products-header" data-reveal>
          <div className="generated-products-eyebrow">
            BUSINESS OPERATING SYSTEMS
          </div>

          <h2 className="generated-products-title">
            Built for your industry,
            <br />
            <span>not generic software.</span>
          </h2>

          <p className="generated-products-subtitle">
            Choose the Business Operating System built around the way your
            industry actually works.
          </p>
        </div>
        <div className="generated-products-scroll">
          <div className="generated-products-grid">
            {products.map((product, index) => (
              <article
                key={product.id}
                className={`generated-product-card generated-product-card-${product.id}`}
                data-reveal
                style={{
                  "--product-accent": product.accent,
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div className="generated-product-visual">
                  <div className="generated-product-image-bg" />

                  <img
                    src={product.image}
                    alt={product.title}
                    className="generated-product-image"
                  />
                  <span className="generated-product-number">
                    {product.number}
                  </span>
                  {product.comingSoon && (
                    <span className="generated-product-coming">
                      COMING SOON
                    </span>
                  )}
                </div>
                <div className="generated-product-content">
                  <div
                    className="generated-product-floating-icon"
                    style={{
                      "--product-accent": product.accent,
                    }}
                  >
                    {product.icon}
                  </div>
                  <div className="generated-product-category">
                    {product.category}
                  </div>

                  <h3>{product.title}</h3>

                  <p>{product.description}</p>

                  <ul className="generated-product-features">
                    {product.modules.map((module) => (
                      <li key={module}>
                        <span className="generated-feature-check">
                          <RiCheckLine />
                        </span>

                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`generated-product-link ${
                      product.comingSoon
                        ? "generated-product-link-disabled"
                        : ""
                    }`}
                    onClick={() => goToPricing(product)}
                  >
                    {product.comingSoon
                      ? "Coming Soon"
                      : `Explore ${product.title}`}

                    {!product.comingSoon && <RiArrowRightLine />}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="generated-products-bottom" data-reveal>
          <div className="generated-products-bottom-line" />

          <span>DIFFERENT INDUSTRIES</span>

          <RiArrowRightLine />

          <strong>ONE DIGITAL OFFICE</strong>

          <div className="generated-products-bottom-line" />
        </div>
      </div>

      <div className="generated-products-wave">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M0,125
              C150,80 250,110 390,155
              C540,205 650,205 790,155
              C930,105 1030,85 1160,120
              C1280,155 1340,160 1440,105
              L1440,220
              L0,220
              Z
            "
          />
        </svg>
      </div>
    </section>
  );
};

export default ProductsSection;
