import React from "react";

import {
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiEditLine,
  RiInformationLine,
  RiSettings3Line,
  RiUserLine,
  RiWallet3Line,
} from "react-icons/ri";


const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
};


const PricingPlanDetailsModal = ({
  open,
  plan,
  onClose,
  onEdit,
}) => {

  if (!open || !plan) return null;


  return (

    <div
      className="pp-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="pp-details-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="pp-modal-header">

          <div className="pp-details-heading">

            <div className="pp-details-plan-icon">
              {plan.icon || "📦"}
            </div>

            <div>

              <div className="pp-modal-kicker">
                {plan.productName}
              </div>

              <h2>
                {plan.name}
              </h2>

              <p>
                {plan.description}
              </p>

            </div>

          </div>


          <button
            type="button"
            className="pp-modal-close"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>

        </div>


        {/* BODY */}

        <div className="pp-details-body">


          {/* TOP SUMMARY */}

          <div className="pp-details-summary">

            <div className="pp-details-price">

              <span>
                Monthly Price
              </span>

              <strong>
                {formatCurrency(
                  plan.monthlyPrice
                )}
              </strong>

              <small>
                / month
              </small>

            </div>


            <div className="pp-details-price">

              <span>
                Yearly Price
              </span>

              <strong>
                {formatCurrency(
                  plan.yearlyPrice
                )}
              </strong>

              <small>
                / year
              </small>

            </div>


            <div className="pp-details-status">

              <span
                className={`pp-status ${
                  plan.status === "Active"
                    ? "pp-status-active"
                    : plan.status === "Inactive"
                    ? "pp-status-inactive"
                    : "pp-status-draft"
                }`}
              >
                <i />
                {plan.status}
              </span>

              {plan.popular && (
                <span className="pp-popular-badge">
                  Popular
                </span>
              )}

            </div>

          </div>


          {/* BILLING */}

          <div className="pp-details-section">

            <div className="pp-details-section-title">

              <RiWallet3Line />

              <div>

                <strong>
                  Billing
                </strong>

                <span>
                  Subscription billing configuration
                </span>

              </div>

            </div>


            <div className="pp-detail-grid">

              <div>
                <span>
                  Billing Type
                </span>

                <strong>
                  {plan.billingType}
                </strong>
              </div>

              <div>
                <span>
                  Currency
                </span>

                <strong>
                  {plan.currency}
                </strong>
              </div>

              <div>
                <span>
                  Trial
                </span>

                <strong>
                  {plan.trialEnabled
                    ? `${plan.trialDays} Days`
                    : "No Trial"}
                </strong>
              </div>

              <div>
                <span>
                  Subscribers
                </span>

                <strong>
                  {plan.subscribers || 0}
                </strong>
              </div>

            </div>

          </div>


          {/* FEATURES */}

          <div className="pp-details-section">

            <div className="pp-details-section-title">

              <RiCheckLine />

              <div>

                <strong>
                  Features
                </strong>

                <span>
                  Included capabilities
                </span>

              </div>

            </div>


            <div className="pp-details-feature-list">

              {(plan.features || []).map(
                (feature) => (

                  <div
                    className="pp-details-feature"
                    key={feature}
                  >

                    <span>
                      <RiCheckLine />
                    </span>

                    <strong>
                      {feature}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>


          {/* LIMITS */}

          <div className="pp-details-section">

            <div className="pp-details-section-title">

              <RiSettings3Line />

              <div>

                <strong>
                  Usage Limits
                </strong>

                <span>
                  Maximum resources included
                </span>

              </div>

            </div>


            <div className="pp-detail-limit-grid">

              <div>
                <span>
                  Users
                </span>

                <strong>
                  {plan.limits?.users ?? 0}
                </strong>
              </div>

              <div>
                <span>
                  Vehicles
                </span>

                <strong>
                  {plan.limits?.vehicles ?? 0}
                </strong>
              </div>

              <div>
                <span>
                  Drivers
                </span>

                <strong>
                  {plan.limits?.drivers ?? 0}
                </strong>
              </div>

              <div>
                <span>
                  Trips / Month
                </span>

                <strong>
                  {plan.limits?.tripsPerMonth ?? 0}
                </strong>
              </div>

              <div>
                <span>
                  Storage
                </span>

                <strong>
                  {plan.limits?.storageGB ?? 0} GB
                </strong>
              </div>

              <div>
                <span>
                  API Calls / Month
                </span>

                <strong>
                  {plan.limits?.apiCallsPerMonth ?? 0}
                </strong>
              </div>

            </div>

          </div>


          {/* META */}

          <div className="pp-details-meta">

            <div>
              <RiInformationLine />

              <span>
                Plan ID
              </span>

              <strong>
                {plan.id}
              </strong>
            </div>


            <div>
              <RiCalendarLine />

              <span>
                Created
              </span>

              <strong>
                {plan.createdDate}
              </strong>
            </div>


            <div>
              <RiCalendarLine />

              <span>
                Updated
              </span>

              <strong>
                {plan.updatedDate}
              </strong>
            </div>


            <div>
              <RiUserLine />

              <span>
                Subscribers
              </span>

              <strong>
                {plan.subscribers || 0}
              </strong>
            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="pp-modal-footer">

          <button
            type="button"
            className="pp-secondary-btn"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="pp-primary-btn"
            onClick={() =>
              onEdit(plan)
            }
          >
            <RiEditLine />
            Edit Plan
          </button>

        </div>

      </div>

    </div>
  );
};


export default PricingPlanDetailsModal;