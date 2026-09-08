import React, { useEffect, useState } from "react";
import {
  RiCloseLine,
  RiPauseCircleLine,
} from "react-icons/ri";

function PauseSubscriptionModal({
  open,
  subscription,
  onClose,
  onSave,
}) {
  const [pausedUntil, setPausedUntil] = useState("");
  const [autoRenew, setAutoRenew] = useState(true);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open && subscription) {
      setPausedUntil("");
      setAutoRenew(subscription.autoRenew);
      setReason("");
    }
  }, [open, subscription]);

  if (!open || !subscription) return null;

  const handleSubmit = () => {
    if (!pausedUntil) return;

    const formattedDate = new Date(
      pausedUntil
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    onSave(subscription.id, {
      pausedUntil: formattedDate,
      autoRenew,
      reason,
    });
  };

  return (
    <div className="sub-modal-overlay">

      <div className="sub-modal sub-form-modal">

        <div className="sub-modal-header">

          <div>
            <span className="sub-modal-kicker">
              Subscription Management
            </span>

            <h2>Pause Subscription</h2>

            <p>{subscription.businessName}</p>
          </div>

          <button
            className="sub-modal-close"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>

        </div>

        <div className="sub-modal-body">

          <div className="sub-warning-box">
            The customer will temporarily lose access to{" "}
            <strong>{subscription.productName}</strong> while
            the subscription is paused.
          </div>

          <div className="sub-form-section">

            <label>Pause Until *</label>

            <input
              className="sub-input"
              type="date"
              value={pausedUntil}
              onChange={(e) =>
                setPausedUntil(e.target.value)
              }
            />

          </div>

          <div className="sub-form-section">

            <label>Reason</label>

            <textarea
              className="sub-textarea"
              placeholder="Enter reason for pausing..."
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
            />

          </div>

          <label className="sub-checkbox-row">

            <input
              type="checkbox"
              checked={autoRenew}
              onChange={(e) =>
                setAutoRenew(e.target.checked)
              }
            />

            <span>
              Keep automatic renewal enabled
            </span>

          </label>

        </div>

        <div className="sub-modal-footer">

          <button
            className="sub-secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="sub-primary-button"
            onClick={handleSubmit}
            disabled={!pausedUntil}
          >
            <RiPauseCircleLine />
            Pause Subscription
          </button>

        </div>

      </div>

    </div>
  );
}

export default PauseSubscriptionModal;