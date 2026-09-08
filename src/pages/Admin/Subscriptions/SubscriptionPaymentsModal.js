import React from "react";
import {
  RiCloseLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiTimeLine,
} from "react-icons/ri";

const PAYMENTS = {
  "SUB-1001": [
    {
      id: "PAY-2001",
      date: "12 Aug 2026",
      amount: 23988,
      method: "UPI",
      status: "Paid",
      reference: "TXN784512",
    },
    {
      id: "PAY-1988",
      date: "12 Aug 2025",
      amount: 23988,
      method: "Card",
      status: "Paid",
      reference: "TXN651238",
    },
  ],

  "SUB-1005": [
    {
      id: "PAY-2041",
      date: "24 Aug 2026",
      amount: 799,
      method: "UPI",
      status: "Failed",
      reference: "TXN991283",
    },
  ],
};

function SubscriptionPaymentsModal({
  open,
  subscription,
  onClose,
}) {
  if (!open || !subscription) return null;

  const payments =
    PAYMENTS[subscription.id] || [
      {
        id: `PAY-${subscription.id.slice(-4)}`,
        date: subscription.startDate,
        amount: subscription.amount,
        method: "UPI",
        status: subscription.paymentStatus === "Paid"
          ? "Paid"
          : subscription.paymentStatus === "Failed"
          ? "Failed"
          : "Pending",
        reference: "—",
      },
    ];

  const getIcon = (status) => {
    if (status === "Paid") return <RiCheckLine />;
    if (status === "Failed")
      return <RiErrorWarningLine />;
    return <RiTimeLine />;
  };

  return (
    <div className="sub-modal-overlay">

      <div className="sub-modal sub-wide-modal">

        <div className="sub-modal-header">

          <div>
            <span className="sub-modal-kicker">
              Billing
            </span>

            <h2>Payments</h2>

            <p>
              {subscription.id} ·{" "}
              {subscription.businessName}
            </p>
          </div>

          <button
            className="sub-modal-close"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>

        </div>

        <div className="sub-modal-body sub-no-padding">

          <div className="sub-payment-summary">

            <div>
              <span>Subscription</span>
              <strong>{subscription.id}</strong>
            </div>

            <div>
              <span>Plan</span>
              <strong>{subscription.planName}</strong>
            </div>

            <div>
              <span>Billing</span>
              <strong>{subscription.billingCycle}</strong>
            </div>

          </div>

          <div className="sub-inner-table-wrapper">

            <table className="sub-inner-table">

              <thead>
                <tr>
                  <th>PAYMENT</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>METHOD</th>
                  <th>REFERENCE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr key={payment.id}>

                    <td>
                      <strong>{payment.id}</strong>
                    </td>

                    <td>{payment.date}</td>

                    <td>
                      ₹
                      {payment.amount.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>{payment.method}</td>

                    <td>{payment.reference}</td>

                    <td>
                      <span
                        className={`sub-payment-status sub-payment-${payment.status.toLowerCase()}`}
                      >
                        {getIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        <div className="sub-modal-footer">

          <button
            className="sub-secondary-button"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default SubscriptionPaymentsModal;