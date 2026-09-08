import React, { useEffect, useState } from "react";
import {
  RiCloseLine,
  RiSaveLine,
  RiApps2Line,
} from "react-icons/ri";

const CATEGORY_OPTIONS = [
  "Transport",
  "Tyre",
  "Tailoring",
  "Retail",
  "Salon",
  "Restaurant",
  "Services",
  "Manufacturing",
  "Real Estate",
];

const PLAN_OPTIONS = ["Free", "Standard", "Premium"];

const EMPTY_FORM = {
  name: "",
  slug: "",
  category: "",
  description: "",
  icon: "📦",
  plans: ["Free", "Standard", "Premium"],
  status: "Draft",
};

const ProductFormModal = ({
  open,
  mode = "add",
  product = null,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && product) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        category: product.category || "",
        description: product.description || "",
        icon: product.icon || "📦",
        plans: product.plans || [],
        status: product.status || "Draft",
      });
    } else {
      setFormData(EMPTY_FORM);
    }

    setErrors({});
  }, [open, mode, product]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSlugFromName = (value) => {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug,
    }));

    setErrors((prev) => ({
      ...prev,
      name: "",
      slug: "",
    }));
  };

  const handlePlanToggle = (plan) => {
    setFormData((prev) => {
      const exists = prev.plans.includes(plan);

      if (exists) {
        return {
          ...prev,
          plans: prev.plans.filter((item) => item !== plan),
        };
      }

      return {
        ...prev,
        plans: [...prev.plans, plan],
      };
    });

    setErrors((prev) => ({
      ...prev,
      plans: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Product name is required.";
    }

    if (!formData.slug.trim()) {
      nextErrors.slug = "Product slug is required.";
    }

    if (!formData.category) {
      nextErrors.category = "Please select a category.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Product description is required.";
    }

    if (!formData.icon.trim()) {
      nextErrors.icon = "Product icon is required.";
    }

    if (!formData.plans.length) {
      nextErrors.plans = "Select at least one plan.";
    }

    if (!formData.status) {
      nextErrors.status = "Please select a status.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave({
      ...formData,
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim(),
      icon: formData.icon.trim(),
    });
  };

  return (
    <div
      className="erp-form-overlay"
      onMouseDown={onClose}
    >
      <div
        className="erp-form-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="erp-form-header">
          <div className="erp-form-heading">
            <div className="erp-form-icon">
              <RiApps2Line />
            </div>

            <div>
              <h2>
                {mode === "edit"
                  ? "Edit Product"
                  : "Add Product"}
              </h2>

              <p>
                {mode === "edit"
                  ? "Update product information and availability."
                  : "Create a new BOS product for the marketplace."}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="erp-form-close"
            onClick={onClose}
            aria-label="Close"
          >
            <RiCloseLine />
          </button>
        </div>

        {/* FORM */}

        <form
          className="erp-form-body"
          onSubmit={handleSubmit}
        >
          {/* PRODUCT INFORMATION */}

          <div className="erp-form-section">
            <div className="erp-form-section-title">
              Product Information
            </div>

            <div className="erp-form-grid">
              {/* NAME */}

              <div className="erp-form-field">
                <label>
                  Product Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Transport BOS"
                  value={formData.name}
                  onChange={(e) =>
                    mode === "add"
                      ? handleSlugFromName(e.target.value)
                      : handleChange(e)
                  }
                />

                {errors.name && (
                  <small className="erp-form-error">
                    {errors.name}
                  </small>
                )}
              </div>

              {/* SLUG */}

              <div className="erp-form-field">
                <label>
                  Product Slug <span>*</span>
                </label>

                <input
                  type="text"
                  name="slug"
                  placeholder="transport-bos"
                  value={formData.slug}
                  onChange={handleChange}
                />

                {errors.slug && (
                  <small className="erp-form-error">
                    {errors.slug}
                  </small>
                )}
              </div>

              {/* CATEGORY */}

              <div className="erp-form-field">
                <label>
                  Category <span>*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select category
                  </option>

                  {CATEGORY_OPTIONS.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <small className="erp-form-error">
                    {errors.category}
                  </small>
                )}
              </div>

              {/* ICON */}

              <div className="erp-form-field">
                <label>
                  Product Icon <span>*</span>
                </label>

                <div className="erp-icon-input">
                  <div className="erp-icon-preview">
                    {formData.icon || "📦"}
                  </div>

                  <input
                    type="text"
                    name="icon"
                    placeholder="🚚"
                    value={formData.icon}
                    onChange={handleChange}
                  />
                </div>

                {errors.icon && (
                  <small className="erp-form-error">
                    {errors.icon}
                  </small>
                )}
              </div>

              {/* DESCRIPTION */}

              <div className="erp-form-field erp-form-field-full">
                <label>
                  Description <span>*</span>
                </label>

                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe what this BOS product provides..."
                  value={formData.description}
                  onChange={handleChange}
                />

                {errors.description && (
                  <small className="erp-form-error">
                    {errors.description}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* PLANS */}

          <div className="erp-form-section">
            <div className="erp-form-section-title">
              Available Plans
            </div>

            <div className="erp-plan-selection">
              {PLAN_OPTIONS.map((plan) => {
                const selected =
                  formData.plans.includes(plan);

                return (
                  <button
                    key={plan}
                    type="button"
                    className={`erp-plan-option ${
                      selected
                        ? "erp-plan-option-active"
                        : ""
                    }`}
                    onClick={() =>
                      handlePlanToggle(plan)
                    }
                  >
                    <span
                      className={`erp-plan-checkbox ${
                        selected
                          ? "erp-plan-checkbox-active"
                          : ""
                      }`}
                    >
                      {selected ? "✓" : ""}
                    </span>

                    <span>{plan}</span>
                  </button>
                );
              })}
            </div>

            {errors.plans && (
              <small className="erp-form-error">
                {errors.plans}
              </small>
            )}
          </div>

          {/* STATUS */}

          <div className="erp-form-section">
            <div className="erp-form-section-title">
              Product Status
            </div>

            <div className="erp-status-options">
              {["Active", "Draft", "Inactive"].map(
                (status) => {
                  const selected =
                    formData.status === status;

                  return (
                    <button
                      key={status}
                      type="button"
                      className={`erp-status-option ${
                        selected
                          ? "erp-status-option-active"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          status,
                        }))
                      }
                    >
                      <span
                        className={`erp-status-radio ${
                          selected
                            ? "erp-status-radio-active"
                            : ""
                        }`}
                      />

                      {status}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* FOOTER */}

          <div className="erp-form-footer">
            <button
              type="button"
              className="erp-form-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="erp-form-save"
            >
              <RiSaveLine />

              {mode === "edit"
                ? "Save Changes"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;