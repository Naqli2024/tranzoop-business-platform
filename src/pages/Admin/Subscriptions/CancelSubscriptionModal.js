import React, { useEffect, useState } from "react";
import {
  RiCloseLine,
  RiDeleteBinLine,
} from "react-icons/ri";

function CancelSubscriptionModal({
  open,
  subscription,
  onClose,
  onConfirm,
}) {
  const [reason, setReason] = useState("");
  const [immediate, setImmediate] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
      setImmediate(false);
      setConfirmation("");
    }
  }, [open]);

  if (!open || !subscription) return null;

  const canCancel = confirmation === "CANCEL";

  const handleSubmit = () => {
    if (!canCancel) return;

    onConfirm(subscription.id, {
      reason,
      immediate,
      cancelledAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
  };

  return (
    <div className="sub-modal-overlay">

      <div className="sub-modal sub-form-modal">

        <div className="sub-modal-header">

          <div>
            <span className="sub-modal-kicker sub-danger-text">
              Destructive Action
            </span>

            <h2>Cancel Subscription</h2>

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

          <div className="sub-danger-box">

            <strong>
              Are you sure you want to cancel this subscription?
            </strong>

            <p>
              This will stop future billing and may remove the
              customer's access to {subscription.productName}.
            </p>

          </div>

          <div className="sub-form-section">

            <label>Cancellation Reason</label>

            <textarea
              className="sub-textarea"
              placeholder="Enter cancellation reason..."
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
            />

          </div>

          <label className="sub-checkbox-row">

            <input
              type="checkbox"
              checked={immediate}
              onChange={(e) =>
                setImmediate(e.target.checked)
              }
            />

            <span>
              Cancel immediately instead of at the end of
              the current billing period.
            </span>

          </label>

          <div className="sub-confirm-input">

            <label>
              Type <strong>CANCEL</strong> to confirm
            </label>

            <input
              className="sub-input"
              value={confirmation}
              onChange={(e) =>
                setConfirmation(e.target.value)
              }
              placeholder="CANCEL"
            />

          </div>

        </div>

        <div className="sub-modal-footer">

          <button
            className="sub-secondary-button"
            onClick={onClose}
          >
            Keep Subscription
          </button>

          <button
            className="sub-danger-button"
            disabled={!canCancel}
            onClick={handleSubmit}
          >
            <RiDeleteBinLine />
            Cancel Subscription
          </button>

        </div>

      </div>

    </div>
  );
}

export default CancelSubscriptionModal;