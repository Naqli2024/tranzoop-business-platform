import React, { useEffect, useState } from "react";

import {
  RiAddLine,
  RiAlertLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiInformationLine,
  RiSaveLine,
  RiSettings3Line,
  RiWallet3Line,
} from "react-icons/ri";


const DEFAULT_FEATURES = [
  "Dashboard",
  "Customer Management",
  "Reports",
  "User Management",
];


const DEFAULT_LIMITS = {
  users: 5,
  vehicles: 10,
  drivers: 10,
  tripsPerMonth: 250,
  storageGB: 5,
  apiCallsPerMonth: 10000,
};


const generateSlug = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};


const PricingPlanFormModal = ({
  open,
  plan,
  products = [],
  onClose,
  onSave,
}) => {

  const isEdit = Boolean(plan);

  const [form, setForm] = useState({
    productId: "",
    productName: "",
    productCategory: "",

    name: "",
    slug: "",
    description: "",

    icon: "📦",

    monthlyPrice: "",
    yearlyPrice: "",

    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 14,

    popular: false,

    features: [...DEFAULT_FEATURES],

    limits: {
      ...DEFAULT_LIMITS,
    },

    status: "Draft",
  });

const [slugTouched, setSlugTouched] =
  useState(false);

const [errors, setErrors] =
  useState({});

const [newFeature, setNewFeature] =
  useState("");


  /* =========================================================
     RESET FORM
  ========================================================= */

  useEffect(() => {

    if (!open) return;

    if (plan) {

      setForm({
        productId: plan.productId || "",
        productName: plan.productName || "",
        productCategory:
          plan.productCategory || "",

        name: plan.name || "",
        slug: plan.slug || "",
        description:
          plan.description || "",

        icon: plan.icon || "📦",

        monthlyPrice:
          plan.monthlyPrice ?? "",

        yearlyPrice:
          plan.yearlyPrice ?? "",

        currency:
          plan.currency || "INR",

        billingType:
          plan.billingType || "Recurring",

        trialEnabled:
          plan.trialEnabled ?? true,

        trialDays:
          plan.trialDays ?? 14,

        popular:
          plan.popular ?? false,

        features:
          Array.isArray(plan.features)
            ? [...plan.features]
            : [...DEFAULT_FEATURES],

        limits: {
          ...DEFAULT_LIMITS,
          ...(plan.limits || {}),
        },

        status:
          plan.status || "Draft",
      });

      setSlugTouched(true);

    } else {

      setForm({
        productId: products[0]?.id || "",
        productName:
          products[0]?.name || "",
        productCategory:
          products[0]?.category || "",

        name: "",
        slug: "",
        description: "",

        icon:
          products[0]?.icon || "📦",

        monthlyPrice: "",
        yearlyPrice: "",

        currency: "INR",

        billingType: "Recurring",

        trialEnabled: true,
        trialDays: 14,

        popular: false,

        features: [...DEFAULT_FEATURES],

        limits: {
          ...DEFAULT_LIMITS,
        },

        status: "Draft",
      });

      setSlugTouched(false);
    }

    setErrors({});

  }, [open, plan, products]);


  if (!open) return null;


  /* =========================================================
     INPUT HANDLER
  ========================================================= */

  const updateField = (field, value) => {

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };


  /* =========================================================
     PRODUCT
  ========================================================= */

  const handleProductChange = (productId) => {

    const selectedProduct = products.find(
      (product) =>
        product.id === productId
    );

    setForm((prev) => ({
      ...prev,

      productId,

      productName:
        selectedProduct?.name || "",

      productCategory:
        selectedProduct?.category || "",

      icon:
        selectedProduct?.icon ||
        prev.icon,
    }));

    setErrors((prev) => ({
      ...prev,
      productId: "",
    }));
  };


  /* =========================================================
     PLAN NAME
  ========================================================= */

  const handleNameChange = (value) => {

    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugTouched
        ? prev.slug
        : generateSlug(value),
    }));

    setErrors((prev) => ({
      ...prev,
      name: "",
      slug: "",
    }));
  };


  /* =========================================================
     SLUG
  ========================================================= */

  const handleSlugChange = (value) => {

    setSlugTouched(true);

    updateField(
      "slug",
      generateSlug(value)
    );
  };


  /* =========================================================
     LIMIT HANDLER
  ========================================================= */

  const handleLimitChange = (
    field,
    value
  ) => {

    setForm((prev) => ({
      ...prev,

      limits: {
        ...prev.limits,
        [field]:
          value === ""
            ? ""
            : Number(value),
      },
    }));
  };


  /* =========================================================
     FEATURES
  ========================================================= */

  const handleFeatureToggle = (
    feature
  ) => {

    setForm((prev) => {

      const exists =
        prev.features.includes(feature);

      return {
        ...prev,

        features: exists
          ? prev.features.filter(
              (item) => item !== feature
            )
          : [...prev.features, feature],
      };
    });
  };

  const handleAddFeature = () => {

    const value =
      newFeature.trim();

    if (!value) return;

    if (
      form.features.some(
        (feature) =>
          feature.toLowerCase() ===
          value.toLowerCase()
      )
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        value,
      ],
    }));

    setNewFeature("");
  };


  const handleRemoveFeature = (
    feature
  ) => {

    setForm((prev) => ({
      ...prev,

      features:
        prev.features.filter(
          (item) =>
            item !== feature
        ),
    }));
  };


  /* =========================================================
     VALIDATION
  ========================================================= */

  const validate = () => {

    const nextErrors = {};

    if (!form.productId) {
      nextErrors.productId =
        "Please select a product.";
    }

    if (!form.name.trim()) {
      nextErrors.name =
        "Plan name is required.";
    }

    if (!form.slug.trim()) {
      nextErrors.slug =
        "Slug is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description =
        "Description is required.";
    }

    if (
      form.monthlyPrice === "" ||
      Number(form.monthlyPrice) < 0
    ) {
      nextErrors.monthlyPrice =
        "Enter a valid monthly price.";
    }

    if (
      form.billingType === "Recurring" &&
      (
        form.yearlyPrice === "" ||
        Number(form.yearlyPrice) < 0
      )
    ) {
      nextErrors.yearlyPrice =
        "Enter a valid yearly price.";
    }

    if (
      !Array.isArray(form.features) ||
      form.features.length === 0
    ) {
      nextErrors.features =
        "Select at least one feature.";
    }

    if (
      form.trialEnabled &&
      (
        form.trialDays === "" ||
        Number(form.trialDays) < 1
      )
    ) {
      nextErrors.trialDays =
        "Enter a valid trial period.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSave({
      ...form,

      name: form.name.trim(),

      slug: generateSlug(
        form.slug
      ),

      description:
        form.description.trim(),

      monthlyPrice:
        Number(form.monthlyPrice || 0),

      yearlyPrice:
        Number(form.yearlyPrice || 0),

      trialDays:
        Number(form.trialDays || 0),

      limits: {
        users:
          Number(form.limits.users || 0),

        vehicles:
          Number(form.limits.vehicles || 0),

        drivers:
          Number(form.limits.drivers || 0),

        tripsPerMonth:
          Number(
            form.limits.tripsPerMonth || 0
          ),

        storageGB:
          Number(
            form.limits.storageGB || 0
          ),

        apiCallsPerMonth:
          Number(
            form.limits.apiCallsPerMonth || 0
          ),
      },
    });
  };


  return (

    <div
      className="pp-modal-overlay"
      onMouseDown={onClose}
    >

      <div
        className="pp-form-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="pp-modal-header">

          <div>

            <div className="pp-modal-kicker">
              {isEdit
                ? "EDIT PRICING PLAN"
                : "NEW PRICING PLAN"}
            </div>

            <h2>
              {isEdit
                ? "Edit Plan"
                : "Create Plan"}
            </h2>

            <p>
              Configure pricing, features,
              limits and subscription settings.
            </p>

          </div>

          <button
            type="button"
            className="pp-modal-close"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>

        </div>


        <form
          className="pp-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <div className="pp-form-section">

            <div className="pp-section-title">
              <RiInformationLine />
              <div>
                <strong>
                  Basic Information
                </strong>

                <span>
                  Define the product and plan identity.
                </span>
              </div>
            </div>


            <div className="pp-form-grid">

              {/* PRODUCT */}

              <div className="pp-field">

                <label>
                  Product
                  <span>*</span>
                </label>

                <select
                  value={form.productId}
                  onChange={(e) =>
                    handleProductChange(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Product
                  </option>

                  {products.map(
                    (product) => (

                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.icon}{" "}
                        {product.name}
                      </option>

                    )
                  )}

                </select>

                {errors.productId && (
                  <small className="pp-field-error">
                    {errors.productId}
                  </small>
                )}

              </div>


              {/* ICON */}

              <div className="pp-field">

                <label>
                  Plan Icon
                </label>

                <div className="pp-icon-input">

                  <input
                    type="text"
                    value={form.icon}
                    maxLength={4}
                    onChange={(e) =>
                      updateField(
                        "icon",
                        e.target.value
                      )
                    }
                  />

                  <span>
                    Preview
                  </span>

                  <strong>
                    {form.icon || "📦"}
                  </strong>

                </div>

              </div>


              {/* NAME */}

              <div className="pp-field">

                <label>
                  Plan Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Professional"
                  value={form.name}
                  onChange={(e) =>
                    handleNameChange(
                      e.target.value
                    )
                  }
                />

                {errors.name && (
                  <small className="pp-field-error">
                    {errors.name}
                  </small>
                )}

              </div>


              {/* SLUG */}

              <div className="pp-field">

                <label>
                  Slug
                  <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="transport-professional"
                  value={form.slug}
                  onChange={(e) =>
                    handleSlugChange(
                      e.target.value
                    )
                  }
                />

                {errors.slug && (
                  <small className="pp-field-error">
                    {errors.slug}
                  </small>
                )}

              </div>


              {/* DESCRIPTION */}

              <div className="pp-field pp-field-full">

                <label>
                  Description
                  <span>*</span>
                </label>

                <textarea
                  rows="3"
                  placeholder="Describe who this plan is designed for..."
                  value={form.description}
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                />

                {errors.description && (
                  <small className="pp-field-error">
                    {errors.description}
                  </small>
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              PRICING
          ================================================= */}

          <div className="pp-form-section">

            <div className="pp-section-title">

              <RiWallet3Line />

              <div>
                <strong>
                  Pricing & Billing
                </strong>

                <span>
                  Configure how customers are charged.
                </span>
              </div>

            </div>


            <div className="pp-form-grid">

              <div className="pp-field">

                <label>
                  Monthly Price
                  <span>*</span>
                </label>

                <div className="pp-input-prefix">

                  <span>₹</span>

                  <input
                    type="number"
                    min="0"
                    value={
                      form.monthlyPrice
                    }
                    onChange={(e) =>
                      updateField(
                        "monthlyPrice",
                        e.target.value
                      )
                    }
                  />

                </div>

                {errors.monthlyPrice && (
                  <small className="pp-field-error">
                    {errors.monthlyPrice}
                  </small>
                )}

              </div>


              <div className="pp-field">

                <label>
                  Yearly Price
                  {form.billingType ===
                    "Recurring" && (
                    <span>*</span>
                  )}
                </label>

                <div className="pp-input-prefix">

                  <span>₹</span>

                  <input
                    type="number"
                    min="0"
                    value={
                      form.yearlyPrice
                    }
                    onChange={(e) =>
                      updateField(
                        "yearlyPrice",
                        e.target.value
                      )
                    }
                  />

                </div>

                {errors.yearlyPrice && (
                  <small className="pp-field-error">
                    {errors.yearlyPrice}
                  </small>
                )}

              </div>


              <div className="pp-field">

                <label>
                  Currency
                </label>

                <select
                  value={form.currency}
                  onChange={(e) =>
                    updateField(
                      "currency",
                      e.target.value
                    )
                  }
                >
                  <option value="INR">
                    INR - Indian Rupee
                  </option>

                  <option value="USD">
                    USD - US Dollar
                  </option>

                  <option value="EUR">
                    EUR - Euro
                  </option>
                </select>

              </div>


              <div className="pp-field">

                <label>
                  Billing Type
                </label>

                <select
                  value={form.billingType}
                  onChange={(e) =>
                    updateField(
                      "billingType",
                      e.target.value
                    )
                  }
                >

                  <option value="Recurring">
                    Recurring
                  </option>

                  <option value="One Time">
                    One Time
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              TRIAL
          ================================================= */}

          <div className="pp-form-section">

            <div className="pp-section-title">

              <RiCalendarLine />

              <div>
                <strong>
                  Free Trial
                </strong>

                <span>
                  Give new customers temporary access.
                </span>
              </div>

            </div>


            <div className="pp-trial-row">

              <label className="pp-switch-row">

                <input
                  type="checkbox"
                  checked={
                    form.trialEnabled
                  }
                  onChange={(e) =>
                    updateField(
                      "trialEnabled",
                      e.target.checked
                    )
                  }
                />

                <span className="pp-switch" />

                <div>
                  <strong>
                    Enable free trial
                  </strong>

                  <small>
                    Customers can use this plan
                    before payment.
                  </small>
                </div>

              </label>


              {form.trialEnabled && (

                <div className="pp-trial-days">

                  <label>
                    Trial Period
                  </label>

                  <div>

                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={
                        form.trialDays
                      }
                      onChange={(e) =>
                        updateField(
                          "trialDays",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      Days
                    </span>

                  </div>

                  {errors.trialDays && (
                    <small className="pp-field-error">
                      {errors.trialDays}
                    </small>
                  )}

                </div>

              )}

            </div>

          </div>


          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="pp-form-section">

            <div className="pp-section-title">

              <RiCheckLine />

              <div>
                <strong>
                  Plan Features
                </strong>

                <span>
                  Select what this subscription includes.
                </span>
              </div>

            </div>


            <div className="pp-feature-selector">

              <div className="pp-feature-grid">

                {Array.from(
                  new Set([
                    ...DEFAULT_FEATURES,
                    ...form.features,
                  ])
                ).map((feature) => (

                  <label
                    className="pp-feature-option"
                    key={feature}
                  >

                    <input
                      type="checkbox"
                      checked={form.features.includes(
                        feature
                      )}
                      onChange={() =>
                        handleFeatureToggle(
                          feature
                        )
                      }
                    />

                    <span className="pp-check-box">
                      <RiCheckLine />
                    </span>

                    <span>
                      {feature}
                    </span>

                  </label>

                ))}

              </div>


              <div className="pp-add-feature">

                <input
                  type="text"
                  placeholder="Add custom feature..."
                  value={newFeature}
                  onChange={(e) =>
                    setNewFeature(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={handleAddFeature}
                >
                  <RiAddLine />
                  Add
                </button>

              </div>


              {form.features.length > 0 && (

                <div className="pp-selected-features">

                  {form.features.map(
                    (feature) => (

                      <span key={feature}>

                        {feature}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveFeature(
                              feature
                            )
                          }
                        >
                          ×
                        </button>

                      </span>

                    )
                  )}

                </div>

              )}

              {errors.features && (
                <small className="pp-field-error">
                  {errors.features}
                </small>
              )}

            </div>

          </div>


          {/* =================================================
              LIMITS
          ================================================= */}

          <div className="pp-form-section">

            <div className="pp-section-title">

              <RiSettings3Line />

              <div>
                <strong>
                  Usage Limits
                </strong>

                <span>
                  Control resources available under this plan.
                </span>
              </div>

            </div>


            <div className="pp-limit-grid">

              <div className="pp-limit-field">
                <label>Users</label>

                <input
                  type="number"
                  min="0"
                  value={
                    form.limits.users
                  }
                  onChange={(e) =>
                    handleLimitChange(
                      "users",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="pp-limit-field">
                <label>Vehicles</label>

                <input
                  type="number"
                  min="0"
                  value={
                    form.limits.vehicles
                  }
                  onChange={(e) =>
                    handleLimitChange(
                      "vehicles",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="pp-limit-field">
                <label>Drivers</label>

                <input
                  type="number"
                  min="0"
                  value={
                    form.limits.drivers
                  }
                  onChange={(e) =>
                    handleLimitChange(
                      "drivers",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="pp-limit-field">
                <label>
                  Trips / Month
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    form.limits.tripsPerMonth
                  }
                  onChange={(e) =>
                    handleLimitChange(
                      "tripsPerMonth",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="pp-limit-field">
                <label>
                  Storage (GB)
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    form.limits.storageGB
                  }
                  onChange={(e) =>
                    handleLimitChange(
                      "storageGB",
                      e.target.value
                    )
                  }
                />
              </div>


              <div className="pp-limit-field">
                <label>
                  API Calls / Month
                </label>

                <input
                  type="number"
                  min="0"
                  value={
                    form.limits.apiCallsPerMonth
                  }
                  onChange={(e) =>
                    handleLimitChange(
                      "apiCallsPerMonth",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>

          </div>


          {/* =================================================
              SETTINGS
          ================================================= */}

          <div className="pp-form-section">

            <div className="pp-section-title">

              <RiSettings3Line />

              <div>
                <strong>
                  Plan Settings
                </strong>

                <span>
                  Control visibility and availability.
                </span>
              </div>

            </div>


            <div className="pp-settings-grid">

              <label className="pp-setting-card">

                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) =>
                    updateField(
                      "popular",
                      e.target.checked
                    )
                  }
                />

                <span className="pp-check-box">
                  <RiCheckLine />
                </span>

                <div>

                  <strong>
                    Mark as Popular
                  </strong>

                  <small>
                    Highlight this plan in the marketplace.
                  </small>

                </div>

              </label>


              <div className="pp-field">

                <label>
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value
                    )
                  }
                >

                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="pp-modal-footer">

            <button
              type="button"
              className="pp-secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="pp-primary-btn"
            >

              {isEdit ? (
                <RiSaveLine />
              ) : (
                <RiAddLine />
              )}

              {isEdit
                ? "Save Changes"
                : "Create Plan"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


export default PricingPlanFormModal;