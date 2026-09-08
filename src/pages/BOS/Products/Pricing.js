import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "../../../assets/styles/products.css"

const PRODUCTS = {
  tyre: {
    slug: "tyre",
    icon: "🛞",
    name: "Tyre Shop",
    tagline:
      "Manage your tyre inventory, sales, billing, services and customers from one simple platform.",
    plans: [
      {
        id: "free",
        name: "Free Trial",
        badge: "14 Days Free",
        price: 0,
        description:
          "Get a hands-on experience of tyre shop management with essential tools for inventory, billing, customers and daily operations.",
        note: "14-day free trial · no credit card required",
        features: [
          "Tyre inventory (up to 200 SKUs)",
          "Basic sales & billing",
          "1 outlet, 1 user",
          "Basic dashboard",
          "Email support",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        badge: "Most Popular",
        price: 799,
        description:
          "Run your day-to-day tyre business efficiently with complete inventory, sales, customer, service and reporting tools.",
        note: "billed monthly · cancel anytime",
        features: [
          "Unlimited tyre inventory",
          "Purchases & sales",
          "Customer management",
          "Service & fitting tracking",
          "Multi-user access",
          "Reports & analytics",
          "Priority email support",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        badge: null,
        price: 1599,
        description:
          "Scale your tyre business with advanced automation, analytics, multi-outlet management and powerful controls for growing teams.",
        note: "billed monthly · cancel anytime",
        features: [
          "Everything in Standard",
          "Supplier & purchase order automation",
          "Advanced sales analytics",
          "Unlimited outlets",
          "Advanced permissions",
          "Priority phone support",
          "Early access to new features",
        ],
      },
    ],
  },

  tailor: {
    slug: "tailor",
    icon: "🪡",
    name: "Tailor Shop",
    tagline:
      "Manage customers, measurements, orders, fabrics and deliveries from one organized platform.",
    plans: [
      {
        id: "free",
        name: "Free Trial",
        badge: "14 Days Free",
        price: 0,
        description:
          "Try essential tailoring tools for managing customers, orders and delivery tracking before choosing a plan.",
        note: "14-day free trial · no credit card required",
        features: [
          "Up to 50 customer records",
          "Basic order tracking",
          "1 shop, 1 user",
          "Basic dashboard",
          "Email support",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        badge: "Most Popular",
        price: 699,
        description:
          "Organize your tailoring business with complete customer, measurement, order, fabric, delivery and reporting tools.",
        note: "billed monthly · cancel anytime",
        features: [
          "Unlimited customer & measurement records",
          "Order management",
          "Fabric & inventory tracking",
          "Delivery tracking",
          "Multi-user access",
          "Reports & analytics",
          "Priority email support",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        badge: null,
        price: 1399,
        description:
          "Grow your tailoring business with advanced analytics, multiple shop locations, custom workflows and enhanced team controls.",
        note: "billed monthly · cancel anytime",
        features: [
          "Everything in Standard",
          "Advanced order analytics",
          "Multiple shop locations",
          "Advanced permissions",
          "Priority phone support",
          "Custom order forms",
          "Early access to new features",
        ],
      },
    ],
  },

  transport: {
    slug: "transport",
    icon: "🚛",
    name: "Transport Management",
    tagline:
      "Manage vehicles, drivers, trips, customers, billing and transport operations from one centralized platform.",
    plans: [
      {
        id: "free",
        name: "Free Trial",
        badge: "14 Days Free",
        price: 0,
        description:
          "Explore the core transport management experience with essential tools for vehicles, trips, dashboards and daily operations.",
        note: "14-day free trial · no credit card required",
        features: [
          "Up to 5 vehicles",
          "Basic trip tracking",
          "1 depot, 1 user",
          "Basic dashboard",
          "Email support",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        badge: "Most Popular",
        price: 999,
        description:
          "Run your transport business efficiently with complete fleet, trip, driver, billing, customer and reporting capabilities.",
        note: "billed monthly · cancel anytime",
        features: [
          "Unlimited vehicles",
          "Trip management",
          "Driver management",
          "Billing & payments",
          "Multi-user access",
          "Reports & analytics",
          "Priority email support",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        badge: null,
        price: 1999,
        description:
          "Scale your transport operations with advanced fleet analytics, compliance tracking, multiple depots and powerful team controls.",
        note: "billed monthly · cancel anytime",
        features: [
          "Everything in Standard",
          "Document & compliance tracking",
          "Advanced fleet analytics",
          "Unlimited depots",
          "Advanced permissions",
          "Priority phone support",
          "Early access to new features",
        ],
      },
    ],
  },
};

const PRODUCT_TABS = [
  { slug: "tyre", label: "Tyre Shop" },
  { slug: "tailor", label: "Tailor Shop" },
  { slug: "transport", label: "Transport Management" },
];

const DEFAULT_SLUG = "transport";

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedSlug = searchParams.get("product");
  const activeSlug = PRODUCTS[requestedSlug] ? requestedSlug : DEFAULT_SLUG;
  const product = PRODUCTS[activeSlug];

  const handleSwitchProduct = (slug) => {
    setSearchParams({ product: slug });
  };

  const handleSelectPlan = (planId) => {
    navigate(`/signup?product=${activeSlug}&plan=${planId}`);
  };

  return (
    <div className="pricing-page">
      <div className="pricing-back-arrow" onClick={()=>navigate('/our-products')}>
        <IoMdArrowBack size={20} className="icon"/>
        </div>
      <section className="pricing-header">
        <span className="pricing-eyebrow">Plans &amp; Pricing</span>
        <h1 className="pricing-title">{product.name} plans</h1>
        <p className="pricing-subtitle">{product.tagline}</p>

        <div className="pricing-tabs" role="tablist" aria-label="Choose a product">
          {PRODUCT_TABS.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={tab.slug === activeSlug}
              className={`pricing-tab ${tab.slug === activeSlug ? "pricing-tab-active" : ""}`}
              onClick={() => handleSwitchProduct(tab.slug)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <div className="pricing-grid">
        {product.plans.map((plan) => {
          const isFeatured = Boolean(plan.name === "Standard");
          const isFree = plan.id === "free";

          return (
            <article
              key={plan.id}
              className={`pricing-card ${isFeatured ? "pricing-card-featured" : ""}`}
            >
              {!isFree &&plan.badge && <span className="pricing-badge">{plan.badge}</span>}
              {isFree && <span className="pricing-badge-free">{plan.badge}</span>}

              <h2 className="pricing-card-name">{plan.name}</h2>
              <p className="pricing-card-description">{plan.description}</p>

              <div className="pricing-price-row">
                {isFree ? (
                  <span className="pricing-price-value">Free</span>
                ) : (
                  <>
                    <span className="pricing-currency">₹</span>
                    <span className="pricing-price-value">
                      {plan.price.toLocaleString("en-IN")}
                    </span>
                    <span className="pricing-price-period">/mo</span>
                  </>
                )}
              </div>
              <p className="pricing-price-note">{plan.note}</p>

              <button
                type="button"
                className={`pricing-cta ${isFeatured ? "pricing-cta-featured" : ""}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {isFree ? "Start Free Trial" : `Choose ${plan.name}`}
              </button>

              <ul className="pricing-feature-list">
                {plan.features.map((feature) => (
                  <li key={feature} className="pricing-feature-item">
                    <i className="pricing-feature-check">✓</i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
export { PRODUCTS };