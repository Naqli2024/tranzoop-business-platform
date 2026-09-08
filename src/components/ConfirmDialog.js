import React from "react";
import { RiCloseLine, RiAlertLine } from "react-icons/ri";

const ConfirmDialog = ({ open, title, message, confirmLabel, tone = "default", onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="businesses-modal-overlay" onMouseDown={onCancel}>
      <div className="confirm-dialog" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="businesses-modal-close confirm-dialog-close" onClick={onCancel}>
          <RiCloseLine />
        </button>

        <div className={`confirm-dialog-icon ${tone === "danger" ? "confirm-dialog-icon-danger" : ""}`}>
          <RiAlertLine />
        </div>

        <h3 className="confirm-dialog-title">{title}</h3>
        <p className="confirm-dialog-message">{message}</p>

        <div className="confirm-dialog-actions">
          <button type="button" className="businesses-modal-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={tone === "danger" ? "confirm-dialog-danger-btn" : "businesses-modal-primary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;