import React from "react";
import {
  RiCloseLine,
  RiFileList3Line,
  RiDownload2Line,
  RiEyeLine,
} from "react-icons/ri";

const INVOICES = {
  "SUB-1001": [
    {
      id: "INV-3001",
      date: "12 Aug 2026",
      dueDate: "12 Aug 2026",
      amount: 23988,
      status: "Paid",
    },
  ],

  "SUB-1002": [
    {
      id: "INV-3002",
      date: "12 Aug 2026",
      dueDate: "12 Aug 2026",
      amount: 9588,
      status: "Paid",
    },
  ],
};

function SubscriptionInvoicesModal({
  open,
  subscription,
  onClose,
}) {
  if (!open || !subscription) return null;

  const invoices =
    INVOICES[subscription.id] || [
      {
        id: `INV-${subscription.id.slice(-4)}`,
        date: subscription.startDate,
        dueDate: subscription.startDate,
        amount: subscription.amount,
        status:
          subscription.paymentStatus === "Paid"
            ? "Paid"
            : "Pending",
      },
    ];

  return (
    <div className="sub-modal-overlay">

      <div className="sub-modal sub-wide-modal">

        <div className="sub-modal-header">

          <div>
            <span className="sub-modal-kicker">
              Billing
            </span>

            <h2>Invoices</h2>

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

          <div className="sub-invoice-header">

            <RiFileList3Line />

            <div>
              <strong>
                {subscription.productName}
              </strong>

              <span>
                {subscription.planName} ·{" "}
                {subscription.billingCycle}
              </span>
            </div>

          </div>

          <div className="sub-inner-table-wrapper">

            <table className="sub-inner-table">

              <thead>

                <tr>
                  <th>INVOICE</th>
                  <th>ISSUED</th>
                  <th>DUE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>

              </thead>

              <tbody>

                {invoices.map((invoice) => (

                  <tr key={invoice.id}>

                    <td>
                      <strong>{invoice.id}</strong>
                    </td>

                    <td>{invoice.date}</td>

                    <td>{invoice.dueDate}</td>

                    <td>
                      ₹
                      {invoice.amount.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      <span className="sub-invoice-status">
                        {invoice.status}
                      </span>
                    </td>

                    <td>

                      <div className="sub-invoice-actions">

                        <button title="View">
                          <RiEyeLine />
                        </button>

                        <button title="Download">
                          <RiDownload2Line />
                        </button>

                      </div>

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

export default SubscriptionInvoicesModal;