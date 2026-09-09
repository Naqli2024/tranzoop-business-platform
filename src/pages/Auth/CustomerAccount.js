import React, { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import "../../assets/styles/auth.css";
import { PRODUCTS } from "../BOS/Products/Pricing";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const CustomerAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productSlug = searchParams.get("product") || "transport";
  const planId = searchParams.get("plan") || "standard";

  const product = PRODUCTS[productSlug] || PRODUCTS.transport;

  const selectedPlan =
    product.plans.find((plan) => plan.id === planId) ||
    product.plans.find((plan) => plan.id === "standard");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: "",
    businessType: "",
    gstNo: "",
    businessLogo: null,
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",

    contactName: "",
    mobile: "",
    email: "",

    password: "",
    confirmPassword: "",
    terms: false,
  });

  const isFormValid =
    formData.organizationName.trim() !== "" &&
    formData.businessType !== "" &&
    formData.addressLine1.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state !== "" &&
    formData.pincode.trim() &&
    formData.country !== "" &&
    formData.contactName.trim() !== "" &&
    formData.mobile.trim().length === 10 &&
    formData.email.trim() !== "" &&
    formData.password.length >= 8 &&
    formData.confirmPassword.length >= 8 &&
    formData.password === formData.confirmPassword &&
    formData.terms === true;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [openSections, setOpenSections] = useState({
    business: true,
    address: true,
    contact: true,
    account: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLogoChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Allow common logo formats
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Please upload a PNG, JPG, WEBP, or SVG image.");
    return;
  }

  // 2MB limit
  if (file.size > 2 * 1024 * 1024) {
    alert("Logo size should not exceed 2MB.");
    return;
  }

  setFormData((prev) => ({
    ...prev,
    businessLogo: file,
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Customer Account Data:", formData);
  };

  return (
    <div className="ca-page">
      <div className="ca-container">
        <div className="ca-content">
          <div className="ca-intro">
            <span className="ca-eyebrow">ACCOUNT SETUP</span>
            <h1>Tell us about your business</h1>
            <p>
              Create your BIZOOP account with your business and contact
              details. This information will be used to set up your organization
              and manage your subscription.
            </p>
          </div>

          <form className="ca-form" onSubmit={handleSubmit}>
            {/* Business Information */}
            <section className="ca-section">
              <div className="ca-section-heading">
                <div className="d-flex align-items-center gap-3">
                  <div className="ca-section-icon">
                    <HiOutlineBuildingOffice2 />
                  </div>
                  <div>
                    <h2>Business information</h2>
                    <p>Tell us about the organization using BIZOOP.</p>
                  </div>
                </div>
                <button
                  type="button"
                  className={`ca-dropdown ${
                    openSections.business ? "is-open" : ""
                  }`}
                  onClick={() => toggleSection("business")}
                  aria-label={
                    openSections.business
                      ? "Collapse business information"
                      : "Expand business information"
                  }
                >
                  <IoIosArrowDown />
                </button>
              </div>
              {openSections.business && (
                <div className="ca-fields">

  {/* BUSINESS NAME */}
  <div className="ca-field ca-field-full">
    <label>
      Business / Organization Name
      <span>*</span>
    </label>

    <div className="ca-input-wrap">
      <HiOutlineBuildingOffice2 />

      <input
        type="text"
        name="organizationName"
        value={formData.organizationName}
        onChange={handleChange}
        placeholder="Enter your business name"
        required
      />
    </div>
  </div>


  {/* BUSINESS LOGO */}
  <div className="ca-field ca-field-full">

    <label>
      Company / Business Logo
    </label>

    <div className="ca-logo-upload">

      <input
        type="file"
        id="businessLogo"
        name="businessLogo"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        onChange={handleLogoChange}
        hidden
      />

      <label
        htmlFor="businessLogo"
        className="ca-logo-upload-box"
      >

        {formData.businessLogo ? (
          <>
            <div className="ca-logo-preview">
              <img
                src={URL.createObjectURL(formData.businessLogo)}
                alt="Business logo preview"
              />
            </div>

            <div className="ca-logo-upload-content">
              <strong>
                {formData.businessLogo.name}
              </strong>

              <span>
                Click to change logo
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="ca-logo-icon">
              <HiOutlineBuildingOffice2 />
            </div>

            <div className="ca-logo-upload-content">
              <strong>
                Upload your business logo
              </strong>

              <span>
                PNG, JPG, WEBP or SVG · Max 2MB
              </span>
            </div>

            <div className="ca-logo-browse">
              Browse
            </div>
          </>
        )}

      </label>

    </div>

    <p className="ca-field-hint">
      Your logo will be used across your BIZOOP business account.
    </p>

  </div>


  {/* BUSINESS TYPE */}
  <div className="ca-field">
    <label>
      Business Type
      <span>*</span>
    </label>

    <select
      name="businessType"
      value={formData.businessType}
      onChange={handleChange}
      required
    >
      <option value="">Select business type</option>
      <option value="Proprietorship">
        Proprietorship
      </option>
      <option value="Partnership">
        Partnership
      </option>
      <option value="Private Limited Company">
        Private Limited Company
      </option>
      <option value="Public Limited Company">
        Public Limited Company
      </option>
      <option value="LLP">
        LLP
      </option>
      <option value="Other">
        Other
      </option>
    </select>
  </div>
  <div className="ca-field">
    <label>GST Number</label>

    <input
      type="text"
      name="gstNo"
      value={formData.gstNo}
      onChange={handleChange}
      placeholder="Enter GST number"
      maxLength={15}
    />
  </div>

</div>
              )}
            </section>

            {/* Address */}
            <section className="ca-section">
              <div className="ca-section-heading">
                <div className="d-flex align-items-center gap-3">
                  <div className="ca-section-icon">
                    <FiMapPin />
                  </div>

                  <div>
                    <h2>Business address</h2>
                    <p>Used for your organization and billing information.</p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`ca-dropdown ${
                    openSections.address ? "is-open" : ""
                  }`}
                  onClick={() => toggleSection("address")}
                  aria-label={
                    openSections.address
                      ? "Collapse business address"
                      : "Expand business address"
                  }
                >
                  <IoIosArrowDown />
                </button>
              </div>
              {openSections.address && (
                <div className="ca-fields">
                  <div className="ca-field ca-field-full">
                    <label>
                      Address Line 1<span>*</span>
                    </label>

                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="Building, street or area"
                      required
                    />
                  </div>

                  <div className="ca-field ca-field-full">
                    <label>Address Line 2</label>

                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      placeholder="Landmark, locality, etc."
                    />
                  </div>

                  <div className="ca-field">
                    <label>
                      City
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>

                  <div className="ca-field">
                    <label>
                      State
                      <span>*</span>
                    </label>

                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select state</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="ca-field">
                    <label>
                      Pincode
                      <span>*</span>
                    </label>

                    <input
                      type="number"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      inputMode="numeric"
                      required
                    />
                  </div>

                  <div className="ca-field">
                    <label>
                      Country
                      <span>*</span>
                    </label>

                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              )}
            </section>

            {/* Contact */}
            <section className="ca-section">
              <div className="ca-section-heading">
                <div className="d-flex align-items-center gap-3">
                  <div className="ca-section-icon">
                    <FiUser />
                  </div>

                  <div>
                    <h2>Primary contact</h2>
                    <p>
                      We'll use these details for important account updates.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`ca-dropdown ${
                    openSections.contact ? "is-open" : ""
                  }`}
                  onClick={() => toggleSection("contact")}
                  aria-label={
                    openSections.contact
                      ? "Collapse primary contact"
                      : "Expand primary contact"
                  }
                >
                  <IoIosArrowDown />
                </button>
              </div>
              {openSections.contact && (
                <div className="ca-fields">
                  <div className="ca-field">
                    <label>
                      Contact Person Name
                      <span>*</span>
                    </label>

                    <div className="ca-input-wrap">
                      <FiUser />
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="ca-field">
                    <label>
                      Mobile Number
                      <span>*</span>
                    </label>

                    <div className="ca-input-wrap">
                      <FiPhone />
                      <input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        inputMode="numeric"
                        required
                      />
                    </div>
                  </div>

                  <div className="ca-field ca-field-full">
                    <label>
                      Email Address
                      <span>*</span>
                    </label>

                    <div className="ca-input-wrap">
                      <FiMail />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                      />
                    </div>

                    <small className="ca-help">
                      Your email will be used for login, invoices, receipts and
                      account notifications.
                    </small>
                  </div>
                </div>
              )}
            </section>

            {/* Account */}
            <section className="ca-section">
              <div className="ca-section-heading">
                <div className="d-flex align-items-center gap-3">
                  <div className="ca-section-icon">
                    <FiLock />
                  </div>

                  <div>
                    <h2>Create your account</h2>
                    <p>Set a secure password for your BIZOOP account.</p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`ca-dropdown ${
                    openSections.account ? "is-open" : ""
                  }`}
                  onClick={() => toggleSection("account")}
                  aria-label={
                    openSections.account
                      ? "Collapse account section"
                      : "Expand account section"
                  }
                >
                  <IoIosArrowDown />
                </button>
              </div>
              {openSections.account && (
                <>
                  <div className="ca-fields">
                    <div className="ca-field">
                      <label>
                        Password
                        <span>*</span>
                      </label>

                      <div className="ca-input-wrap">
                        <FiLock />

                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          minLength={8}
                          required
                        />

                        <button
                          type="button"
                          className="ca-password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>

                      <small className="ca-help">
                        Use at least 8 characters.
                      </small>
                    </div>

                    <div className="ca-field">
                      <label>
                        Confirm Password
                        <span>*</span>
                      </label>

                      <div className="ca-input-wrap">
                        <FiLock />

                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Re-enter your password"
                          minLength={8}
                          required
                        />

                        <button
                          type="button"
                          className="ca-password-toggle"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <label className="ca-checkbox">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                    />

                    <span className="ca-checkbox-box">
                      <FiCheckCircle />
                    </span>

                    <span>
                      I agree to the{" "}
                      <button type="button">Terms & Conditions</button> and{" "}
                      <button type="button">Privacy Policy</button>.
                    </span>
                  </label>
                </>
              )}
            </section>

            {/* Mobile action */}
            <div className="ca-mobile-summary">
              <span>
                {product.name} · {selectedPlan.name}
              </span>

              <strong>
                {selectedPlan.price === 0
                  ? "Free"
                  : `₹${selectedPlan.price.toLocaleString("en-IN")} / month`}
              </strong>
            </div>

            <button
            //   type="submit"
              className={`ca-submit ${isFormValid ? "is-valid" : "is-disabled"}`}
            //   disabled={!isFormValid}
              onClick={()=> navigate('/checkout')}
            >
              Continue to Checkout
              <FiArrowRight />
            </button>
          </form>
        </div>

        {/* Right Summary */}
        <aside className="ca-summary">
          <div className="ca-summary-card">
            <div className="ca-summary-label">YOUR SELECTION</div>
            <div className="ca-product">
              <div className="ca-product-icon">{product.icon}</div>

              <div>
                <h3>{product.name}</h3>
                <span>BOS Software</span>
              </div>
            </div>
            <div className="ca-plan">
              <div>
                <span>Selected plan</span>
                <strong>{selectedPlan.name}</strong>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/pricing?product=${productSlug}`)}
              >
                Change
              </button>
            </div>
            <div className="ca-price">
              {selectedPlan.price === 0 ? (
                <>
                  <strong>Free</strong>
                </>
              ) : (
                <>
                  <strong>₹{selectedPlan.price.toLocaleString("en-IN")}</strong>
                  <span>/ month</span>
                </>
              )}
            </div>
            <p className="ca-selection-note">{selectedPlan.note}</p>

            <div className="ca-summary-divider" />
            <div className="ca-feature-heading">
              <span>What's included</span>
            </div>

            <ul className="ca-summary-features">
              {selectedPlan.features.map((feature) => (
                <li key={feature}>
                  <FiCheckCircle />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="ca-trust">
              <FiLock />

              <div>
                <strong>Your information is secure</strong>
                <span>
                  Your account details are protected and used only to provide
                  your BIZOOP services.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CustomerAccount;
