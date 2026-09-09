import React, { useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiChevronDown,
  FiEdit2,
  FiLock,
  FiMapPin,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCTS } from "../BOS/Products/Pricing";
import "../../assets/styles/auth.css";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const productSlug = searchParams.get("product") || "transport";
  const planId = searchParams.get("plan") || "standard";

  const product = PRODUCTS[productSlug] || PRODUCTS.transport;

  const selectedPlan =
    product.plans.find((plan) => plan.id === planId) ||
    product.plans.find((plan) => plan.id === "standard");

  /*
   * Account data should be passed from CustomerAccount using:
   *
   * navigate(
   *   `/checkout?product=${productSlug}&plan=${planId}`,
   *   { state: { account: formData } }
   * );
   *
   * If the page is opened directly, fallback values are used.
   */
  const account = location.state?.account || {};

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [showAddress, setShowAddress] = useState(true);

  const price = Number(selectedPlan?.price || 0);

  /*
   * Demo GST calculation.
   * Replace this later with your actual tax calculation from backend.
   */
  const taxRate = 18;

  const discount = couponApplied && price > 0 ? Math.round(price * 0.1) : 0;

  const taxableAmount = Math.max(price - discount, 0);

  const tax = Math.round((taxableAmount * taxRate) / 100);

  const total = taxableAmount + tax;

  const formatPrice = (amount) => {
    if (amount === 0) return "Free";

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const handleApplyCoupon = () => {
    const normalizedCoupon = coupon.trim().toUpperCase();

    if (!normalizedCoupon) {
      setCouponMessage("Enter a coupon code.");
      setCouponApplied(false);
      return;
    }

    /*
     * Demo coupon.
     * Replace with API validation later.
     */
    if (normalizedCoupon === "BIZOOP10") {
      if (price === 0) {
        setCouponMessage("Coupon is not required for the free plan.");
        setCouponApplied(false);
        return;
      }

      setCouponApplied(true);
      setCouponMessage("Coupon applied — 10% discount.");
      return;
    }

    setCouponApplied(false);
    setCouponMessage("Invalid or expired coupon code.");
  };

  const handleRemoveCoupon = () => {
    setCoupon("");
    setCouponApplied(false);
    setCouponMessage("");
  };

  const handleProceedToPayment = () => {
    navigate(
      `/payment-success?product=${productSlug}&plan=${selectedPlan.id}`,
      {
        state: {
          account,
          product,
          selectedPlan,
          coupon: couponApplied ? coupon : null,
          pricing: {
            subtotal: price,
            discount,
            tax,
            total,
          },
        },
      }
    );
  };

  const fullAddress = useMemo(() => {
    return [
      account.addressLine1,
      account.addressLine2,
      account.city,
      account.state,
      account.pincode,
      account.country,
    ]
      .filter(Boolean)
      .join(", ");
  }, [account]);

  return (
    <div className="co-page">
      <div className="co-container">
        <section className="co-intro">
          <span className="co-eyebrow">CHECKOUT</span>

          <h1>Review your order</h1>

          <p>
            Confirm your plan, business details and billing information
            before proceeding to secure payment.
          </p>
        </section>

        <div className="co-layout">
          {/* LEFT */}
          <main className="co-main">

            {/* ORDER */}
            <section className="co-card co-order-card">
              <div className="co-card-heading">
                <div>
                  <span className="co-card-eyebrow">YOUR ORDER</span>
                  <h2>Subscription details</h2>
                </div>

                <button
                  type="button"
                  className="co-edit-btn"
                  onClick={() =>
                    navigate(`/pricing?product=${productSlug}`)
                  }
                >
                  <FiEdit2 />
                  Change plan
                </button>
              </div>

              <div className="co-product-box">
                <div className="co-product-icon">
                  {product.icon}
                </div>

                <div className="co-product-info">
                  <div className="co-product-name-row">
                    <h3>{product.name}</h3>

                    <span className="co-product-badge">
                      BOS SOFTWARE
                    </span>
                  </div>

                  <p>{product.tagline}</p>
                </div>
              </div>

              <div className="co-plan-row">
                <div>
                  <span className="co-label">Selected plan</span>
                  <strong>{selectedPlan.name}</strong>
                </div>

                <div className="co-plan-price">
                  {price === 0 ? (
                    <strong>Free</strong>
                  ) : (
                    <>
                      <strong>{formatPrice(price)}</strong>
                      <span>/ month</span>
                    </>
                  )}
                </div>
              </div>

              <div className="co-included">
                <div className="co-included-title">
                  <span>Included in your plan</span>
                </div>

                <div className="co-feature-grid">
                  {selectedPlan.features.map((feature) => (
                    <div
                      className="co-feature"
                      key={feature}
                    >
                      <FiCheckCircle />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* BUSINESS INFORMATION */}
            <section className="co-card">
              <div className="co-card-heading">
                <div>
                  <span className="co-card-eyebrow">
                    BUSINESS INFORMATION
                  </span>

                  <h2>Business details</h2>
                </div>

                <button
                  type="button"
                  className="co-edit-btn"
                  onClick={() => navigate(-1)}
                >
                  <FiEdit2 />
                  Edit
                </button>
              </div>

              <div className="co-business-details">

                <div className="co-business-main">
                  <div className="co-detail-icon">
                    <HiOutlineBuildingOffice2 />
                  </div>

                  <div>
                    <span>Organization</span>
                    <strong>
                      {account.organizationName || "Your business"}
                    </strong>

                    {account.businessType && (
                      <small>{account.businessType}</small>
                    )}
                  </div>
                </div>

                {account.gstNo && (
                  <div className="co-detail-item">
                    <span>GSTIN</span>
                    <strong>{account.gstNo}</strong>
                  </div>
                )}

                <div className="co-detail-item">
                  <span>Primary contact</span>
                  <strong>
                    {account.contactName || "Not provided"}
                  </strong>
                </div>

                <div className="co-detail-item">
                  <span>Email</span>
                  <strong>
                    {account.email || "Not provided"}
                  </strong>
                </div>

                <div className="co-detail-item">
                  <span>Mobile</span>
                  <strong>
                    {account.mobile
                      ? `+91 ${account.mobile}`
                      : "Not provided"}
                  </strong>
                </div>

              </div>
            </section>

            {/* BILLING ADDRESS */}
            <section className="co-card">
              <button
                type="button"
                className="co-collapsible-heading"
                onClick={() => setShowAddress((prev) => !prev)}
              >
                <div className="co-card-heading-left">
                  <div className="co-heading-icon">
                    <FiMapPin />
                  </div>

                  <div>
                    <span className="co-card-eyebrow">
                      BILLING INFORMATION
                    </span>

                    <h2>Billing address</h2>
                  </div>
                </div>

                <FiChevronDown
                  className={`co-chevron ${
                    showAddress ? "co-chevron-open" : ""
                  }`}
                />
              </button>

              {showAddress && (
                <div className="co-address-content">
                  <div className="co-address-icon">
                    <FiMapPin />
                  </div>

                  <div className="co-address-text">
                    <strong>
                      {account.organizationName || "Your business"}
                    </strong>

                    <p>
                      {fullAddress ||
                        "Your billing address will appear here."}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* SECURITY */}
            <div className="co-security-note">
              <div className="co-security-icon">
                <FiLock />
              </div>

              <div>
                <strong>Secure checkout</strong>

                <span>
                  Your information is encrypted and protected.
                  Payment details are handled securely by our payment
                  provider.
                </span>
              </div>
            </div>
          </main>

          {/* RIGHT */}
          <aside className="co-sidebar">

            <div className="co-summary-card">

              <div className="co-summary-top">
                <span className="co-card-eyebrow">
                  ORDER SUMMARY
                </span>

                <h2>Payment summary</h2>
              </div>

              <div className="co-summary-product">
                <div className="co-summary-product-icon">
                  {product.icon}
                </div>

                <div>
                  <strong>{product.name}</strong>
                  <span>{selectedPlan.name} Plan</span>
                </div>
              </div>

              <div className="co-summary-divider" />

              <div className="co-price-list">

                <div className="co-price-row">
                  <span>Plan price</span>
                  <strong>{formatPrice(price)}</strong>
                </div>

                {discount > 0 && (
                  <div className="co-price-row co-discount-row">
                    <span>
                      Discount
                      <small>
                        {coupon.toUpperCase()}
                      </small>
                    </span>

                    <strong>
                      -{formatPrice(discount)}
                    </strong>
                  </div>
                )}

                <div className="co-price-row">
                  <span>GST ({taxRate}%)</span>
                  <strong>{formatPrice(tax)}</strong>
                </div>

              </div>

              <div className="co-summary-divider" />

              <div className="co-total-row">
                <div>
                  <span>Total payable</span>

                  <small>
                    {price === 0
                      ? "No payment required"
                      : "Billed monthly"}
                  </small>
                </div>

                <strong>{formatPrice(total)}</strong>
              </div>

              <button
                type="button"
                className="co-payment-btn"
                onClick={handleProceedToPayment}
              >
                {price === 0
                  ? "Activate Free Plan"
                  : "Proceed to Payment"}

                <FiArrowRight />
              </button>

              <div className="co-secure-summary">
                <FiLock />

                <span>
                  Secure & encrypted checkout
                </span>
              </div>
            </div>

            {/* ACCOUNT */}
            <div className="co-account-card">
              <div className="co-account-icon">
                <FiUser />
              </div>

              <div>
                <span>Account</span>

                <strong>
                  {account.email || "Your account"}
                </strong>

                <small>
                  This subscription will be linked to
                  your BIZOOP account.
                </small>
              </div>
            </div>

            {/* WHAT HAPPENS NEXT */}
            <div className="co-next-card">
              <span className="co-card-eyebrow">
                WHAT HAPPENS NEXT
              </span>

              <div className="co-next-item">
                <span>1</span>
                <div>
                  <strong>Complete payment</strong>
                  <p>
                    Securely complete your subscription payment.
                  </p>
                </div>
              </div>

              <div className="co-next-item">
                <span>2</span>
                <div>
                  <strong>Account activated</strong>
                  <p>
                    Your BIZOOP organization and subscription
                    will be created.
                  </p>
                </div>
              </div>

              <div className="co-next-item">
                <span>3</span>
                <div>
                  <strong>Open your BOS</strong>
                  <p>
                    Start using your selected business
                    operating system.
                  </p>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;