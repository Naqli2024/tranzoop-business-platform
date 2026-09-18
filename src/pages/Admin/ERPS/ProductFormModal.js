import React, { useEffect, useState } from "react";
import { RiCloseLine, RiSaveLine, RiApps2Line } from "react-icons/ri";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addErps } from "../../../redux/Auth/ErpsSlice";
import { toast } from "react-toastify";

const ProductFormModal = ({ open, mode, product = null, onClose, onSave }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    shortDescription: "",
    icon: "",
    status: "ACTIVE",
    isPublic: true,
    isFeatured: false,
    displayOrder: 1,
  });
  const dispatch = useDispatch();

  // --------------------------------------------------
  // LOAD FORM
  // --------------------------------------------------

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && product) {
      setFormData({
        name: product.name || "",
        code: product.code || "",
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        icon: product.icon || "",
        status: product.status || "ACTIVE",
        isPublic:
          typeof product.isPublic === "boolean" ? product.isPublic : true,
        isFeatured:
          typeof product.isFeatured === "boolean" ? product.isFeatured : false,
        displayOrder: product.displayOrder ?? 1,
      });
    } else {
      setFormData({
        name: "",
        code: "",
        description: "",
        shortDescription: "",
        icon: "",
        status: "ACTIVE",
        isPublic: true,
        isFeatured: false,
        displayOrder: 1,
      });
    }
  }, [open, mode, product]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCodeChange = (e) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

    setFormData((prev) => ({
      ...prev,
      code: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      code: formData.code.trim().toLowerCase(),
      description: formData.description.trim(),
      shortDescription: formData.shortDescription.trim(),
      icon: formData.icon.trim(),
      status: formData.status,
      isPublic: formData.isPublic,
      isFeatured: formData.isFeatured,
      displayOrder: Number(formData.displayOrder),
    };

    try {
      setSubmitting(true);

      if (mode === "add") {
        const response = await dispatch(addErps(payload)).unwrap();
        console.log("ERP creation response:", response);
        toast.success(response?.message);
      }

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error?.message || "Failed to create ERP");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="erp-form-overlay" onMouseDown={onClose}>
      <div className="erp-form-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="erp-form-header">
          <div className="erp-form-heading">
            <div className="erp-form-icon">
              <RiApps2Line />
            </div>
            <div>
              <h2>{mode === "edit" ? "Edit ERP" : "Add ERP"}</h2>
              <p>
                {mode === "edit"
                  ? "Update ERP information and availability."
                  : "Create a new ERP for the marketplace."}
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
        <form className="erp-form-body" onSubmit={handleSubmit}>
          <div className="erp-form-section">
            <div className="erp-form-section-title">ERP Information</div>
            <div className="erp-form-grid">
              <div className="erp-form-field">
                <label>
                  ERP Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Transport ERP"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="erp-form-field">
                <label>
                  ERP Code <span>*</span>
                </label>

                <input
                  type="text"
                  name="code"
                  placeholder="e.g. transport"
                  value={formData.code}
                  onChange={handleCodeChange}
                />
              </div>

              <div className="erp-form-field">
                <label>ERP Icon</label>

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
              </div>
              <div className="erp-form-field">
                <label>
                  Display Order <span>*</span>
                </label>

                <select
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleChange}
                >
                  {Array.from({ length: 6 }, (_, index) => index + 1).map(
                    (order) => (
                      <option key={order} value={order}>
                        {order}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="erp-form-field erp-form-field-full">
                <label>
                  Short Description <span>*</span>
                </label>

                <input
                  type="text"
                  name="shortDescription"
                  placeholder="e.g. Manage vehicles, trips, drivers and transport operations."
                  value={formData.shortDescription}
                  onChange={handleChange}
                />
              </div>
              <div className="erp-form-field erp-form-field-full">
                <label>
                  Description <span>*</span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe what this ERP provides..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="erp-form-section">
            <div className="erp-form-section-title">ERP Status</div>

            <div className="erp-status-options">
              {["ACTIVE", "INACTIVE"].map((status) => {
                const selected = formData.status === status;

                return (
                  <button
                    key={status}
                    type="button"
                    className={`erp-status-option ${
                      selected ? "erp-status-option-active" : ""
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
                        selected ? "erp-status-radio-active" : ""
                      }`}
                    />

                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="erp-form-footer">
            <button
              type="button"
              className="erp-form-cancel"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
  type="submit"
  className="erp-form-save"
  disabled={submitting}
>
  {submitting ? (
    <>
      <Loader2 className="erp-form-loader" />
      Creating...
    </>
  ) : (
    <>
      <RiSaveLine />
      {mode === "edit" ? "Save Changes" : "Create ERP"}
    </>
  )}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
