import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

const EditBusinessModal = ({ business, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: business.name,
    owner: business.owner,
    email: business.email,
    phone: business.phone,
    city: business.city,
    state: business.state,
    employees: business.employees,
    status: business.status,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = field === "employees" ? e.target.value.replace(/\D/g, "") : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Business name is required.";
    if (!form.owner.trim()) next.owner = "Owner name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.state.trim()) next.state = "State is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...business, ...form, employees: Number(form.employees) || 0 });
  };

  return (
    <div className="businesses-modal-overlay" onMouseDown={onClose}>
      <div className="businesses-modal edit-business-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="businesses-modal-header">
          <div>
            <span className="businesses-modal-eyebrow">Edit Business</span>
            <h2>{business.name}</h2>
            <p>{business.id}</p>
          </div>
          <button type="button" className="businesses-modal-close" onClick={onClose}>
            <RiCloseLine />
          </button>
        </div>

        <form className="edit-business-form" onSubmit={handleSubmit}>
          <div className="edit-business-section">
            <div className="edit-business-field">
              <label>Business Name</label>
              <input
                type="text"
                className={errors.name ? "edit-business-input-error" : ""}
                value={form.name}
                onChange={handleChange("name")}
              />
              {errors.name && <span className="edit-business-error">{errors.name}</span>}
            </div>

            <div className="edit-business-row">
              <div className="edit-business-field">
                <label>Owner Name</label>
                <input
                  type="text"
                  className={errors.owner ? "edit-business-input-error" : ""}
                  value={form.owner}
                  onChange={handleChange("owner")}
                />
                {errors.owner && <span className="edit-business-error">{errors.owner}</span>}
              </div>

              <div className="edit-business-field">
                <label>Employees</label>
                <input type="text" inputMode="numeric" value={form.employees} onChange={handleChange("employees")} />
              </div>
            </div>

            <div className="edit-business-row">
              <div className="edit-business-field">
                <label>Email</label>
                <input
                  type="email"
                  className={errors.email ? "edit-business-input-error" : ""}
                  value={form.email}
                  onChange={handleChange("email")}
                />
                {errors.email && <span className="edit-business-error">{errors.email}</span>}
              </div>

              <div className="edit-business-field">
                <label>Phone</label>
                <input type="tel" value={form.phone} onChange={handleChange("phone")} />
              </div>
            </div>

            <div className="edit-business-row">
              <div className="edit-business-field">
                <label>City</label>
                <input
                  type="text"
                  className={errors.city ? "edit-business-input-error" : ""}
                  value={form.city}
                  onChange={handleChange("city")}
                />
                {errors.city && <span className="edit-business-error">{errors.city}</span>}
              </div>

              <div className="edit-business-field">
                <label>State</label>
                <input
                  type="text"
                  className={errors.state ? "edit-business-input-error" : ""}
                  value={form.state}
                  onChange={handleChange("state")}
                />
                {errors.state && <span className="edit-business-error">{errors.state}</span>}
              </div>
            </div>

            <div className="edit-business-field">
              <label>Status</label>
              <select value={form.status} onChange={handleChange("status")}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="businesses-modal-footer">
            <button type="button" className="businesses-modal-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="businesses-modal-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBusinessModal;