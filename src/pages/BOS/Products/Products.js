import React from "react";
import "../../../assets/styles/products.css";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    category: "RETAIL OPERATIONS",
    title: "Tyre Shop",
    shortTitle: "TYRE SHOP",
    path: "https://tranzoop.com/tyreshop/",
    description:
      "Manage tyre inventory, purchases, sales, customers, suppliers and service operations from one place.",
    features: [
      "Tyre Inventory",
      "Purchases & Sales",
      "Customer Management",
      "Service Tracking",
    ],
    icon: "🛞",
  },
  {
    id: 2,
    category: "BUSINESS OPERATIONS",
    title: "Tailor Shop",
    shortTitle: "TAILOR SHOP",
    path: "",
    description:
      "Manage customers, measurements, orders, fabrics, stitching workflow and delivery with ease.",
    features: [
      "Customer & Measurements",
      "Order Management",
      "Fabric Inventory",
      "Delivery Tracking",
    ],
    icon: "🪡",
  },
  {
    id: 3,
    category: "TRANSPORT OPERATIONS",
    title: "Transport Management",
    shortTitle: "TRANSPORT MANAGEMENT",
    path: "https://tranzoop.com/transport/",
    description:
      "Manage vehicles, drivers, trips, documents, deliveries and transport operations from one platform.",
    features: [
      "Vehicle Management",
      "Driver Management",
      "Trip Management",
      "Document Tracking",
    ],
    icon: "🚛",
  },
];

const Products = () => {
  const navigate = useNavigate();
  
  return (
    <main className="products-page">
      <section className="products-section">
        <div className="products-container">
          <div className="products-header">
            <span className="products-eyebrow">
              TRANZOOP PRODUCTS
            </span>
            <h1 className="products-title">
              SOFTWARE BUILT FOR YOUR BUSINESS.
            </h1>
            <p className="products-description">
              Choose an industry-specific solution designed to simplify
              operations, manage resources and help your business grow.
            </p>
          </div>
          <div className="products-stage">
            <div className="products-deck-glow" />

            <div className="products-cards">
              {products.map((product, index) => (
                <article
                  className={`products-card products-card-${index + 1}`}
                  key={product.id}
                  style={{
                    "--products-delay": `${index * 180}ms`,
                  }}
                 onClick={() => (window.location.href = product.path)}
                >
                  <div className="products-card-top">
                    <span className="products-category">
                      {product.category}
                    </span>
                  </div>

                  <div className="products-icon">
                    {product.icon}
                  </div>

                  <div className="products-card-content">
                    <h2>{product.shortTitle}</h2>

                    <p>{product.description}</p>
                  </div>

                  <div className="products-features">
                    {product.features.map((feature) => (
                      <span key={feature}>
                        <i>✓</i>
                        {feature}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Products;
