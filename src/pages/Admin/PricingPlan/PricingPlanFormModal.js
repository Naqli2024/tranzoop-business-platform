import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RiAddLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiSaveLine,
  RiSettings3Line,
  RiWallet3Line,
} from "react-icons/ri";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { addPlans, editPlan } from "../../../redux/Auth/PlansSlice";
import { getAllErps } from "../../../redux/Auth/ErpsSlice";

const DEFAULT_FEATURES = [
  "Vehicle Management",
  "Trip Management",
  "Driver Management",
  "Reports",
  "Advanced Dashboard",
];

const PricingPlanFormModal = ({ open, onClose, plan, isEditMode }) => {
  const dispatch = useDispatch();
  const { erps, loading } = useSelector((state) => state.erps);
  const isEdit = Boolean(isEditMode && plan);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [newFeature, setNewFeature] = useState("");
  const [form, setForm] = useState({
    erpId: "",
    name: "",
    code: "",
    description: "",
    amount: "",
    currency: "INR",
    billingCycle: "",
    durationDays: 365,
    trialDays: 15,
    features: [...DEFAULT_FEATURES],
    status: "ACTIVE",
    isPublic: true,
    displayOrder: 1,
  });

  useEffect(() => {
    dispatch(getAllErps());
  }, [dispatch]);

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

  const handleErpChange = (erpId) => {
    setForm((prev) => ({
      ...prev,
      erpId: erpId,
    }));

    setErrors((prev) => ({
      ...prev,
      erpId: "",
    }));
  };
  
  const handleNameChange = (value) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      code: value
        .toUpperCase()
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^A-Z0-9_]/g, ""),
    }));

    setErrors((prev) => ({
      ...prev,
      name: "",
      code: "",
    }));
  };

  const handleCodeChange = (value) => {
    const code = value
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/[^A-Z0-9_]/g, "");

    updateField("code", code);
  };

  const handleFeatureToggle = (feature) => {
    setForm((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((item) => item !== feature)
          : [...prev.features, feature],
      };
    });

    setErrors((prev) => ({
      ...prev,
      features: "",
    }));
  };

  const handleAddFeature = () => {
    const value = newFeature.trim();

    if (!value) return;
    const alreadyExists = form.features.some(
      (feature) => feature.toLowerCase() === value.toLowerCase(),
    );
    if (alreadyExists) {
      toast.info("This feature already exists.");
      return;
    }
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, value],
    }));
    setNewFeature("");
    setErrors((prev) => ({
      ...prev,
      features: "",
    }));
  };

  const handleRemoveFeature = (feature) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((item) => item !== feature),
    }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.erpId) {
      nextErrors.erpId = "Please select an ERP.";
    }
    if (!form.name.trim()) {
      nextErrors.name = "Plan name is required.";
    }
    if (!form.code.trim()) {
      nextErrors.code = "Plan code is required.";
    }
    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }
    if (form.amount === "" || Number(form.amount) < 0) {
      nextErrors.amount = "Enter a valid amount.";
    }
    if (!form.durationDays || Number(form.durationDays) < 1) {
      nextErrors.durationDays = "Enter a valid duration.";
    }
    if (form.trialDays === "" || Number(form.trialDays) < 0) {
      nextErrors.trialDays = "Enter a valid trial period.";
    }
    if (!Array.isArray(form.features) || form.features.length === 0) {
      nextErrors.features = "Select at least one feature.";
    }
    if (!form.displayOrder || Number(form.displayOrder) < 1) {
      nextErrors.displayOrder = "Enter a valid display order.";
    }
    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await dispatch(
          editPlan({
            erpCode: plan.erpCode,
            data: form,
          }),
        ).unwrap();

        onClose();

        return;
      }

      // Your existing create-plan logic here
    } catch (error) {
      console.error("Plan save error:", error);
    }

    if (submitting) return;

    if (!validate()) {
      return;
    }

    const payload = {
      erpId: form.erpId,
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      description: form.description.trim(),
      amount: Number(form.amount),
      currency: form.currency,
      billingCycle: form.billingCycle,
      durationDays: Number(form.durationDays),
      trialDays: Number(form.trialDays),
      features: form.features,
      status: form.status,
      isPublic: form.isPublic,
      displayOrder: Number(form.displayOrder),
    };

    console.log("Plan payload:", payload);

    try {
      setSubmitting(true);

      const response = await dispatch(addPlans(payload)).unwrap();

      console.log("Plan creation response:", response);

      toast.success(response?.message || "Plan created successfully.");

      onClose();
    } catch (error) {
      console.error("Plan submit error:", error);

      toast.error(error?.message || error?.error || "Failed to create plan.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getAllErps());
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode && plan) {
      setForm({
        erpId: plan.erpId || "",
        name: plan.name || "",
        code: plan.code || "",
        description: plan.description || "",
        amount: plan.amount ?? "",
        currency: plan.currency || "INR",
        billingCycle: plan.billingCycle || "",
        durationDays: plan.durationDays ?? 365,
        trialDays: plan.trialDays ?? 15,
        features: plan.features || [],
        status: plan.status || "ACTIVE",
        isPublic: plan.isPublic ?? true,
        displayOrder: plan.displayOrder ?? 1,
      });
    } else if (!isEditMode) {
      setForm({
        erpId: "",
        name: "",
        code: "",
        description: "",
        amount: "",
        currency: "INR",
        billingCycle: "",
        durationDays: 365,
        trialDays: 15,
        features: [...DEFAULT_FEATURES],
        status: "ACTIVE",
        isPublic: true,
        displayOrder: 1,
      });
    }
  }, [isEditMode, plan]);

  // ✅ Conditional return comes AFTER all hooks
  if (!open) return null;

  return (
    <div
      className="pp-modal-overlay"
      onMouseDown={submitting ? undefined : onClose}
    >
      <div className="pp-form-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="pp-modal-header">
          <div>
            <div className="pp-modal-kicker">
              {isEdit ? "EDIT PRICING PLAN" : "NEW PRICING PLAN"}
            </div>

            <h2>{isEdit ? "Edit Plan" : "Create Plan"}</h2>

            <p>Configure pricing, features and subscription settings.</p>
          </div>

          <button
            type="button"
            className="pp-modal-close"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
          >
            <RiCloseLine />
          </button>
        </div>

        <form className="pp-form" onSubmit={handleSubmit}>
          <div className="pp-form-section">
            <div className="pp-section-title">
              <RiInformationLine />

              <div>
                <strong>Basic Information</strong>

                <span>Define the ERP and plan identity.</span>
              </div>
            </div>

            <div className="pp-form-grid">
              {/* ERP */}

              <div className="pp-field">
                <label>
                  ERP
                  <span>*</span>
                </label>

                <select
                  value={form.erpId}
                  onChange={(e) => handleErpChange(e.target.value)}
                  disabled={submitting}
                >
                  <option value="">Select ERP</option>

                  {erps?.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pp-field">
                <label>
                  Plan Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Professional"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  disabled={submitting}
                />

                {errors.name && (
                  <small className="pp-field-error">{errors.name}</small>
                )}
              </div>

              {/* CODE */}

              <div className="pp-field">
                <label>
                  Plan Code
                  <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="PROFESSIONAL"
                  value={form.code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  disabled={submitting}
                />

                {errors.code && (
                  <small className="pp-field-error">{errors.code}</small>
                )}
              </div>

              {/* DISPLAY ORDER */}

              <div className="pp-field">
                <label>
                  Display Order
                  <span>*</span>
                </label>

                <select
                  value={form.displayOrder}
                  onChange={(e) => updateField("displayOrder", e.target.value)}
                  disabled={submitting}
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    (order) => (
                      <option key={order} value={order}>
                        {order}
                      </option>
                    ),
                  )}
                </select>

                {errors.displayOrder && (
                  <small className="pp-field-error">
                    {errors.displayOrder}
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
                  placeholder="Professional transport ERP plan"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  disabled={submitting}
                />

                {errors.description && (
                  <small className="pp-field-error">{errors.description}</small>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              PRICING
          ==================================================== */}

          <div className="pp-form-section">
            <div className="pp-section-title">
              <RiWallet3Line />

              <div>
                <strong>Pricing & Billing</strong>

                <span>Configure how customers are charged.</span>
              </div>
            </div>

            <div className="pp-form-grid">
              {/* AMOUNT */}

              <div className="pp-field">
                <label>
                  Amount
                  <span>*</span>
                </label>

                <div className="pp-input-prefix">
                  <span>₹</span>

                  <input
                    type="number"
                    min="0"
                    value={form.amount}
                    placeholder="4999"
                    onChange={(e) => updateField("amount", e.target.value)}
                    disabled={submitting}
                  />
                </div>

                {errors.amount && (
                  <small className="pp-field-error">{errors.amount}</small>
                )}
              </div>

              {/* CURRENCY */}

              <div className="pp-field">
                <label>Currency</label>

                <select
                  value={form.currency}
                  onChange={(e) => updateField("currency", e.target.value)}
                  disabled={submitting}
                >
                  <option value="INR">INR - Indian Rupee</option>

                  <option value="USD">USD - US Dollar</option>

                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>

              {/* BILLING CYCLE */}

              <div className="pp-field">
                <label>Billing Cycle</label>

                <select
                  value={form.billingCycle}
                  onChange={(e) => updateField("billingCycle", e.target.value)}
                  disabled={submitting}
                >
                  <option value="MONTHLY">Monthly</option>

                  <option value="YEARLY">Yearly</option>
                </select>
              </div>

              {/* DURATION */}

              <div className="pp-field">
                <label>
                  Duration
                  <span>*</span>
                </label>

                <div className="pp-input-prefix">
                  <input
                    type="number"
                    min="1"
                    value={form.durationDays}
                    onChange={(e) =>
                      updateField("durationDays", e.target.value)
                    }
                    disabled={submitting}
                  />

                  <span>Days</span>
                </div>

                {errors.durationDays && (
                  <small className="pp-field-error">
                    {errors.durationDays}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              TRIAL
          ==================================================== */}

          <div className="pp-form-section">
            <div className="pp-section-title">
              <RiCalendarLine />

              <div>
                <strong>Free Trial</strong>

                <span>Configure the trial period for new customers.</span>
              </div>
            </div>

            <div className="pp-trial-row">
              <div className="pp-trial-days">
                <label>
                  Trial Period
                  <span>*</span>
                </label>

                <div>
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={form.trialDays}
                    onChange={(e) => updateField("trialDays", e.target.value)}
                    disabled={submitting}
                  />

                  <span>Days</span>
                </div>

                {errors.trialDays && (
                  <small className="pp-field-error">{errors.trialDays}</small>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              FEATURES
          ==================================================== */}

          <div className="pp-form-section">
            <div className="pp-section-title">
              <RiCheckLine />

              <div>
                <strong>Plan Features</strong>

                <span>Select what this subscription includes.</span>
              </div>
            </div>

            <div className="pp-feature-selector">
              <div className="pp-feature-grid">
                {Array.from(
                  new Set([...DEFAULT_FEATURES, ...form.features]),
                ).map((feature) => (
                  <label className="pp-feature-option" key={feature}>
                    <input
                      type="checkbox"
                      checked={form.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      disabled={submitting}
                    />

                    <span className="pp-check-box">
                      <RiCheckLine />
                    </span>

                    <span>{feature}</span>
                  </label>
                ))}
              </div>

              <div className="pp-add-feature">
                <input
                  type="text"
                  placeholder="Add custom feature..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  disabled={submitting}
                />

                <button
                  type="button"
                  onClick={handleAddFeature}
                  disabled={submitting}
                >
                  <RiAddLine />
                  Add
                </button>
              </div>

              {form.features.length > 0 && (
                <div className="pp-selected-features">
                  {form.features.map((feature) => (
                    <span key={feature}>
                      {feature}

                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        disabled={submitting}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {errors.features && (
                <small className="pp-field-error">{errors.features}</small>
              )}
            </div>
          </div>

          <div className="pp-form-section">
            <div className="pp-section-title">
              <RiSettings3Line />

              <div>
                <strong>Plan Settings</strong>

                <span>Control visibility and availability.</span>
              </div>
            </div>

            <div className="pp-settings-grid">
              <label className="pp-setting-card">
                <input
                  type="checkbox"
                  checked={form.isPublic}
                  onChange={(e) => updateField("isPublic", e.target.checked)}
                  disabled={submitting}
                />

                <span className="pp-check-box">
                  <RiCheckLine />
                </span>

                <div>
                  <strong>Public Plan</strong>

                  <small>Make this plan visible in the marketplace.</small>
                </div>
              </label>
              <div className="pp-field">
                <label>
                  Status
                  <span>*</span>
                </label>

                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  disabled={submitting}
                >
                  <option value="ACTIVE">Active</option>

                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pp-modal-footer">
            <button
              type="button"
              className="pp-secondary-btn"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="pp-primary-btn"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="pp-form-loader" />
                  {isEdit ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  {isEdit ? <RiSaveLine /> : <RiAddLine />}
                  {isEdit ? "Save Changes" : "Create Plan"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingPlanFormModal;
