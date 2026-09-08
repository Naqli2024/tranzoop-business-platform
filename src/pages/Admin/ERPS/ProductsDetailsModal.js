import React from "react";
import {
  RiCloseLine,
  RiEditLine,
  RiSettings3Line,
  RiApps2Line,
  RiCalendarLine,
  RiGroupLine,
  RiMoneyRupeeCircleLine,
  RiPriceTag3Line,
  RiShieldCheckLine,
} from "react-icons/ri";
import "../../../assets/styles/adminProducts.css";

const ProductDetailsModal = ({
  product,
  isOpen,
  onClose,
  onEdit,
  onManagePlans,
}) => {
  if (!isOpen || !product) {
    return null;
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "erp-modal-status-active";

      case "Inactive":
        return "erp-modal-status-inactive";

      case "Draft":
        return "erp-modal-status-draft";

      default:
        return "";
    }
  };

  return (
    <div
      className="erp-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="erp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="erp-modal-title"
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="erp-modal-header">

          <div className="erp-modal-header-left">

            <div className="erp-modal-icon">
              {product.icon}
            </div>

            <div className="erp-modal-title-area">

              <div className="erp-modal-title-row">

                <h2 id="erp-modal-title">
                  {product.name}
                </h2>

                <span
                  className={`erp-modal-status ${getStatusClass(
                    product.status
                  )}`}
                >
                  <span />
                  {product.status}
                </span>

              </div>

              <p>
                {product.id} · {product.slug}
              </p>

            </div>

          </div>

          <button
            type="button"
            className="erp-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <RiCloseLine />
          </button>

        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="erp-modal-body">

          {/* Description */}

          <section className="erp-modal-section">

            <div className="erp-modal-section-heading">
              <RiApps2Line />
              <h3>Product Information</h3>
            </div>

            <p className="erp-modal-description">
              {product.description}
            </p>

            <div className="erp-modal-info-grid">

              <div className="erp-modal-info-item">
                <span>Product ID</span>
                <strong>{product.id}</strong>
              </div>

              <div className="erp-modal-info-item">
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div className="erp-modal-info-item">
                <span>Slug</span>
                <strong>{product.slug}</strong>
              </div>

              <div className="erp-modal-info-item">
                <span>Status</span>
                <strong>{product.status}</strong>
              </div>

            </div>

          </section>

          {/* Plans */}

          <section className="erp-modal-section">

            <div className="erp-modal-section-heading">
              <RiPriceTag3Line />
              <h3>Available Plans</h3>
            </div>

            <div className="erp-modal-plans">

              {product.plans.map((plan) => (
                <div
                  className={`erp-modal-plan erp-modal-plan-${plan
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={`${product.id}-${plan}`}
                >
                  <div className="erp-modal-plan-icon">
                    <RiPriceTag3Line />
                  </div>

                  <div>
                    <strong>{plan}</strong>
                    <span>
                      {plan === "Free"
                        ? "Free plan"
                        : `${plan} subscription`}
                    </span>
                  </div>
                </div>
              ))}

            </div>

          </section>

          {/* Business Metrics */}

          <section className="erp-modal-section">

            <div className="erp-modal-section-heading">
              <RiGroupLine />
              <h3>Business Metrics</h3>
            </div>

            <div className="erp-modal-metrics">

              <div className="erp-modal-metric">

                <div className="erp-modal-metric-icon">
                  <RiGroupLine />
                </div>

                <div>
                  <span>Customers</span>
                  <strong>
                    {product.customers.toLocaleString()}
                  </strong>
                </div>

              </div>

              <div className="erp-modal-metric">

                <div className="erp-modal-metric-icon">
                  <RiMoneyRupeeCircleLine />
                </div>

                <div>
                  <span>Monthly Revenue</span>
                  <strong>
                    ₹
                    {product.monthlyRevenue.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

              </div>

            </div>

          </section>

          {/* Dates */}

          <section className="erp-modal-section">

            <div className="erp-modal-section-heading">
              <RiCalendarLine />
              <h3>Timeline</h3>
            </div>

            <div className="erp-modal-timeline">

              <div>
                <span>Created</span>
                <strong>{product.createdDate}</strong>
              </div>

              <div>
                <span>Last Updated</span>
                <strong>{product.updatedDate}</strong>
              </div>

            </div>

          </section>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="erp-modal-footer">

          <button
            type="button"
            className="erp-modal-secondary-btn"
            onClick={onClose}
          >
            Close
          </button>

          <div className="erp-modal-footer-actions">

            <button
              type="button"
              className="erp-modal-manage-btn"
              onClick={() => onManagePlans(product)}
            >
              <RiSettings3Line />
              Manage Plans
            </button>

            <button
              type="button"
              className="erp-modal-edit-btn"
              onClick={() => onEdit(product)}
            >
              <RiEditLine />
              Edit Product
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailsModal;