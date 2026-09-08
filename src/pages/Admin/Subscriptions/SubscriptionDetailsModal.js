import React from "react";
import {
  RiCloseLine,
  RiCheckLine,
  RiCalendarLine,
  RiUserLine,
  RiBuildingLine,
  RiBankCardLine,
  RiShieldCheckLine,
  RiApps2Line,
} from "react-icons/ri";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

function SubscriptionDetailsModal({
  open,
  subscription,
  onClose,
}) {
  if (!open || !subscription) return null;

  return (
    <div className="sub-modal-overlay">
      <div className="sub-modal sub-details-modal">

        <div className="sub-modal-header">
          <div>
            <span className="sub-modal-kicker">
              Subscription Details
            </span>

            <h2>{subscription.id}</h2>

            <p>
              {subscription.businessName} ·{" "}
              {subscription.productName}
            </p>
          </div>

          <button
            className="sub-modal-close"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="sub-modal-body">

          {/* STATUS */}
          <div className="sub-details-status-row">

            <div>
              <span>Status</span>
              <strong
                className={`sub-status sub-status-${subscription.status
                  .toLowerCase()
                  .replace(" ", "")}`}
              >
                <i />
                {subscription.status}
              </strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>{subscription.paymentStatus}</strong>
            </div>

            <div>
              <span>Auto Renew</span>
              <strong>
                {subscription.autoRenew ? "Enabled" : "Disabled"}
              </strong>
            </div>

          </div>

          {/* PLAN */}
          <section className="sub-details-section">

            <div className="sub-section-title">
              <RiApps2Line />
              Plan & Product
            </div>

            <div className="sub-details-grid">

              <div>
                <span>Product</span>
                <strong>{subscription.productName}</strong>
              </div>

              <div>
                <span>Plan</span>
                <strong>{subscription.planName}</strong>
              </div>

              <div>
                <span>Billing Cycle</span>
                <strong>{subscription.billingCycle}</strong>
              </div>

              <div>
                <span>Monthly Price</span>
                <strong>
                  {formatCurrency(subscription.monthlyPrice)}
                </strong>
              </div>

              <div>
                <span>Billing Amount</span>
                <strong>
                  {formatCurrency(subscription.amount)}
                </strong>
              </div>

              <div>
                <span>Currency</span>
                <strong>{subscription.currency}</strong>
              </div>

            </div>

          </section>

          {/* BUSINESS */}
          <section className="sub-details-section">

            <div className="sub-section-title">
              <RiBuildingLine />
              Customer
            </div>

            <div className="sub-details-grid">

              <div>
                <span>Business</span>
                <strong>{subscription.businessName}</strong>
              </div>

              <div>
                <span>Business ID</span>
                <strong>{subscription.businessId}</strong>
              </div>

              <div>
                <span>Owner</span>
                <strong>{subscription.ownerName}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{subscription.email}</strong>
              </div>

            </div>

          </section>

          {/* DATES */}
          <section className="sub-details-section">

            <div className="sub-section-title">
              <RiCalendarLine />
              Subscription Dates
            </div>

            <div className="sub-details-grid">

              <div>
                <span>Started</span>
                <strong>{subscription.startDate}</strong>
              </div>

              <div>
                <span>Renewal Date</span>
                <strong>{subscription.renewalDate}</strong>
              </div>

              <div>
                <span>Next Billing</span>
                <strong>{subscription.nextBillingDate}</strong>
              </div>

              <div>
                <span>Cancelled At</span>
                <strong>
                  {subscription.cancelledAt || "Not cancelled"}
                </strong>
              </div>

            </div>

          </section>

          {/* MODULES */}
          <section className="sub-details-section">

            <div className="sub-section-title">
              <RiShieldCheckLine />
              Enabled Modules
            </div>

            <div className="sub-module-grid">

              {subscription.modules.map((module) => (
                <div
                  className="sub-module-item"
                  key={module}
                >
                  <RiCheckLine />
                  {module}
                </div>
              ))}

            </div>

          </section>

        </div>

        <div className="sub-modal-footer">
          <button
            className="sub-secondary-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default SubscriptionDetailsModal;