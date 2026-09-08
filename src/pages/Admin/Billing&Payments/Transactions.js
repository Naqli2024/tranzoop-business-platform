import React, { useEffect, useMemo, useState } from "react";
import {
  RiSearchLine,
  RiCloseLine,
  RiFilter3Line,
  RiArrowDownSLine,
  RiMore2Fill,
  RiEyeLine,
  RiBankCardLine,
  RiBuilding2Line,
  RiFileList3Line,
  RiCalendarLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/adminBilling.css";

const ITEMS_PER_PAGE = 6;

const initialTransactions = [
  {
    id: "TXN_8F72A1",
    paymentId: "PAY-1001",
    businessId: "BUS-1001",
    subscriptionId: "SUB-1001",
    businessName: "ABC Enterprises",
    ownerName: "Arun Kumar",
    productName: "Transport BOS",
    planName: "Premium Plan",
    type: "Subscription Payment",
    method: "UPI",
    amount: 29999,
    direction: "Credit",
    status: "Completed",
    date: "28 Aug 2026",
    time: "10:30 AM",
  },
  {
    id: "TXN_9D42B7",
    paymentId: "PAY-1002",
    businessId: "BUS-1001",
    subscriptionId: "SUB-1002",
    businessName: "ABC Enterprises",
    ownerName: "Arun Kumar",
    productName: "Tyre BOS",
    planName: "Standard Plan",
    type: "Subscription Payment",
    method: "Credit Card",
    amount: 14999,
    direction: "Credit",
    status: "Completed",
    date: "27 Aug 2026",
    time: "02:15 PM",
  },
  {
    id: "TXN_2A77C1",
    paymentId: "PAY-1003",
    businessId: "BUS-1002",
    subscriptionId: "SUB-1003",
    businessName: "Sri Lakshmi Transport",
    ownerName: "Suresh Kumar",
    productName: "Transport BOS",
    planName: "Standard Plan",
    type: "Subscription Payment",
    method: "Net Banking",
    amount: 1499,
    direction: "Credit",
    status: "Pending",
    date: "29 Aug 2026",
    time: "09:20 AM",
  },
  {
    id: "TXN_6C83E2",
    paymentId: "PAY-1004",
    businessId: "BUS-1003",
    subscriptionId: "SUB-1004",
    businessName: "Classic Tailors",
    ownerName: "Ramesh B",
    productName: "Tailor BOS",
    planName: "Premium Plan",
    type: "Subscription Payment",
    method: "Credit Card",
    amount: 24999,
    direction: "Credit",
    status: "Completed",
    date: "25 Aug 2026",
    time: "04:40 PM",
  },
  {
    id: "TXN_4E92D4",
    paymentId: "PAY-1005",
    businessId: "BUS-1004",
    subscriptionId: "SUB-1005",
    businessName: "Raj Tyres & Wheels",
    ownerName: "Rajesh M",
    productName: "Tyre BOS",
    planName: "Standard Plan",
    type: "Subscription Payment",
    method: "UPI",
    amount: 1499,
    direction: "Credit",
    status: "Failed",
    date: "30 Aug 2026",
    time: "11:10 AM",
  },
  {
    id: "TXN_7B12F9",
    paymentId: "PAY-1006",
    businessId: "BUS-1005",
    subscriptionId: "SUB-1006",
    businessName: "South India Logistics",
    ownerName: "Vijay Anand",
    productName: "Transport BOS",
    planName: "Premium Plan",
    type: "Refund",
    method: "Bank Transfer",
    amount: 29999,
    direction: "Debit",
    status: "Refunded",
    date: "20 Aug 2026",
    time: "01:25 PM",
  },
  {
    id: "TXN_3A81K2",
    paymentId: "PAY-1007",
    businessId: "BUS-1006",
    subscriptionId: "SUB-1007",
    businessName: "Fashion Point",
    ownerName: "Priya S",
    productName: "Tailor BOS",
    planName: "Free Plan",
    type: "Subscription Payment",
    method: "UPI",
    amount: 0,
    direction: "Credit",
    status: "Completed",
    date: "18 Aug 2026",
    time: "10:15 AM",
  },
  {
    id: "TXN_5D91L8",
    paymentId: "PAY-1008",
    businessId: "BUS-1007",
    subscriptionId: "SUB-1008",
    businessName: "Metro Auto Care",
    ownerName: "Karthik R",
    productName: "Tyre BOS",
    planName: "Premium Plan",
    type: "Renewal Payment",
    method: "Credit Card",
    amount: 1999,
    direction: "Credit",
    status: "Completed",
    date: "22 Aug 2026",
    time: "03:45 PM",
  },
  {
    id: "TXN_7F32M5",
    paymentId: "PAY-1009",
    businessId: "BUS-1008",
    subscriptionId: "SUB-1009",
    businessName: "Chennai Fashion Hub",
    ownerName: "Meena R",
    productName: "Tailor BOS",
    planName: "Standard Plan",
    type: "Partial Refund",
    method: "UPI",
    amount: 500,
    direction: "Debit",
    status: "Refunded",
    date: "24 Aug 2026",
    time: "12:10 PM",
  },
  {
    id: "TXN_1H44P7",
    paymentId: "PAY-1010",
    businessId: "BUS-1009",
    subscriptionId: "SUB-1010",
    businessName: "Prime Fleet Services",
    ownerName: "Sanjay K",
    productName: "Transport BOS",
    planName: "Standard Plan",
    type: "Adjustment",
    method: "System",
    amount: 1000,
    direction: "Credit",
    status: "Completed",
    date: "31 Aug 2026",
    time: "09:05 AM",
  },
];

const statusOptions = [
  "All Status",
  "Completed",
  "Pending",
  "Failed",
  "Refunded",
];

const productOptions = [
  "All Products",
  "Transport BOS",
  "Tyre BOS",
  "Tailor BOS",
];

const typeOptions = [
  "All Types",
  "Subscription Payment",
  "Renewal Payment",
  "Refund",
  "Partial Refund",
  "Credit",
  "Debit",
  "Adjustment",
  "Coupon / Discount",
  "Tax",
];

const methodOptions = [
  "All Methods",
  "UPI",
  "Credit Card",
  "Net Banking",
  "Bank Transfer",
  "System",
];

const transactionStatusClass = (status) => {
  const map = {
    Completed: "at-status-completed",
    Pending: "at-status-pending",
    Failed: "at-status-failed",
    Refunded: "at-status-refunded",
  };

  return map[status] || "";
};

const typeClass = (type) => {
  if (type.includes("Refund")) {
    return "at-type-refund";
  }

  if (type.includes("Payment")) {
    return "at-type-payment";
  }

  if (type === "Adjustment") {
    return "at-type-adjustment";
  }

  return "at-type-other";
};

const Transactions = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] =
    useState(initialTransactions);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Status");
  const [productFilter, setProductFilter] =
    useState("All Products");
  const [typeFilter, setTypeFilter] =
    useState("All Types");
  const [methodFilter, setMethodFilter] =
    useState("All Methods");

  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".at-action-wrapper")) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const filteredTransactions = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return transactions.filter((transaction) => {
      const matchesSearch =
        !search ||
        transaction.id.toLowerCase().includes(search) ||
        transaction.paymentId.toLowerCase().includes(search) ||
        transaction.businessId.toLowerCase().includes(search) ||
        transaction.subscriptionId
          .toLowerCase()
          .includes(search) ||
        transaction.businessName
          .toLowerCase()
          .includes(search) ||
        transaction.ownerName.toLowerCase().includes(search) ||
        transaction.productName.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All Status" ||
        transaction.status === statusFilter;

      const matchesProduct =
        productFilter === "All Products" ||
        transaction.productName === productFilter;

      const matchesType =
        typeFilter === "All Types" ||
        transaction.type === typeFilter;

      const matchesMethod =
        methodFilter === "All Methods" ||
        transaction.method === methodFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProduct &&
        matchesType &&
        matchesMethod
      );
    });
  }, [
    transactions,
    searchTerm,
    statusFilter,
    productFilter,
    typeFilter,
    methodFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTransactions.length / ITEMS_PER_PAGE
    )
  );

  const paginatedTransactions =
    filteredTransactions.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    productFilter,
    typeFilter,
    methodFilter,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
    setProductFilter("All Products");
    setTypeFilter("All Types");
    setMethodFilter("All Methods");
    setCurrentPage(1);
  };

  const hasFilters =
    searchTerm ||
    statusFilter !== "All Status" ||
    productFilter !== "All Products" ||
    typeFilter !== "All Types" ||
    methodFilter !== "All Methods";

  const openDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
    setOpenActionId(null);
  };

  const handleViewPayment = (transaction) => {
    setOpenActionId(null);

    navigate(
      `/admin/payments?paymentId=${transaction.paymentId}`
    );
  };

  const handleViewBusiness = (transaction) => {
    setOpenActionId(null);

    navigate(
      `/admin/businesses?businessId=${transaction.businessId}`
    );
  };

  const handleViewSubscription = (transaction) => {
    setOpenActionId(null);

    navigate(
      `/admin/subscriptions?subscriptionId=${transaction.subscriptionId}`
    );
  };

  return (
    <div className="at-page">
      <div className="at-page-header">
        <div>
          <div className="at-breadcrumb">
            <span>Billing &amp; Payments</span>
            <span>/</span>
            <strong>Transactions</strong>
          </div>

          <h1>Transactions</h1>

          <p>
            Track all financial movements, payments, refunds and
            adjustments.
          </p>
        </div>

        <button
          type="button"
          className="at-export-button"
          onClick={() => window.print()}
        >
          Export
        </button>
      </div>

      <div className="at-card">
        <div className="at-filter-row">
          <div className="at-search-box">
            <RiSearchLine />

            <input
              type="text"
              placeholder="Search transaction, payment, business or ID..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            {searchTerm && (
              <button
                type="button"
                className="at-search-clear"
                onClick={() => setSearchTerm("")}
              >
                <RiCloseLine />
              </button>
            )}
          </div>

          <div className="at-filter-group">
            <FilterSelect
              icon={<RiFilter3Line />}
              value={statusFilter}
              options={statusOptions}
              onChange={setStatusFilter}
            />

            <FilterSelect
              value={productFilter}
              options={productOptions}
              onChange={setProductFilter}
            />

            <FilterSelect
              value={typeFilter}
              options={typeOptions}
              onChange={setTypeFilter}
            />

            <FilterSelect
              value={methodFilter}
              options={methodOptions}
              onChange={setMethodFilter}
            />

            {hasFilters && (
              <button
                type="button"
                className="at-reset-button"
                onClick={handleResetFilters}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="at-table-summary">
          <div>
            <strong>
              {filteredTransactions.length}
            </strong>{" "}
            transactions found
          </div>

          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="at-table-wrapper">
          <table className="at-table">
            <thead>
              <tr>
                <th>TRANSACTION</th>
                <th>BUSINESS</th>
                <th>PRODUCT / PLAN</th>
                <th>TYPE</th>
                <th>METHOD</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    <div className="at-empty">
                      No transactions found
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map(
                  (transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <div className="at-primary-text">
                          {transaction.id}
                        </div>

                        <div className="at-secondary-text">
                          {transaction.paymentId}
                        </div>
                      </td>

                      <td>
                        <div className="at-primary-text">
                          {transaction.businessName}
                        </div>

                        <div className="at-secondary-text">
                          {transaction.businessId} ·{" "}
                          {transaction.ownerName}
                        </div>
                      </td>

                      <td>
                        <div className="at-primary-text">
                          {transaction.productName}
                        </div>

                        <span className="at-plan-badge">
                          {transaction.planName}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`at-type-badge ${typeClass(
                            transaction.type
                          )}`}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td>
                        <div className="at-method-text">
                          {transaction.method}
                        </div>
                      </td>

                      <td>
                        <div
                          className={`at-amount ${
                            transaction.direction ===
                            "Debit"
                              ? "at-amount-debit"
                              : "at-amount-credit"
                          }`}
                        >
                          {transaction.direction ===
                          "Debit"
                            ? "-"
                            : "+"}
                          ₹
                          {Number(
                            transaction.amount
                          ).toLocaleString("en-IN")}
                        </div>

                        <div className="at-secondary-text">
                          {transaction.direction}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`at-status ${transactionStatusClass(
                            transaction.status
                          )}`}
                        >
                          <span className="at-status-dot" />
                          {transaction.status}
                        </span>
                      </td>

                      <td>
                        <div className="at-date-cell">
                          <RiCalendarLine />

                          <div>
                            <div>
                              {transaction.date}
                            </div>

                            <small>
                              {transaction.time}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="at-action-wrapper">
                          <button
                            type="button"
                            className="at-action-button"
                            onClick={() =>
                              setOpenActionId(
                                openActionId ===
                                  transaction.id
                                  ? null
                                  : transaction.id
                              )
                            }
                          >
                            <RiMore2Fill />
                          </button>

                          {openActionId ===
                            transaction.id && (
                            <div className="at-action-menu">
                              <button
                                type="button"
                                onClick={() =>
                                  openDetails(
                                    transaction
                                  )
                                }
                              >
                                <RiEyeLine />
                                View Transaction
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleViewPayment(
                                    transaction
                                  )
                                }
                              >
                                <RiBankCardLine />
                                View Payment
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleViewBusiness(
                                    transaction
                                  )
                                }
                              >
                                <RiBuilding2Line />
                                View Business
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleViewSubscription(
                                    transaction
                                  )
                                }
                              >
                                <RiFileList3Line />
                                View Subscription
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="at-mobile-list">
          {paginatedTransactions.map((transaction) => (
            <div
              className="at-mobile-card"
              key={transaction.id}
            >
              <div className="at-mobile-card-top">
                <div>
                  <strong>{transaction.id}</strong>
                  <span>{transaction.paymentId}</span>
                </div>

                <span
                  className={`at-status ${transactionStatusClass(
                    transaction.status
                  )}`}
                >
                  <span className="at-status-dot" />
                  {transaction.status}
                </span>
              </div>

              <div className="at-mobile-business">
                <strong>
                  {transaction.businessName}
                </strong>

                <span>
                  {transaction.businessId} ·{" "}
                  {transaction.ownerName}
                </span>
              </div>

              <div className="at-mobile-product">
                <strong>
                  {transaction.productName}
                </strong>

                <span className="at-plan-badge">
                  {transaction.planName}
                </span>
              </div>

              <div className="at-mobile-grid">
                <div>
                  <small>Type</small>
                  <strong>{transaction.type}</strong>
                </div>

                <div>
                  <small>Method</small>
                  <strong>{transaction.method}</strong>
                </div>

                <div>
                  <small>Amount</small>
                  <strong>
                    {transaction.direction ===
                    "Debit"
                      ? "-"
                      : "+"}
                    ₹
                    {Number(
                      transaction.amount
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <small>Date</small>
                  <strong>{transaction.date}</strong>
                </div>
              </div>

              <button
                type="button"
                className="at-mobile-view-button"
                onClick={() => openDetails(transaction)}
              >
                <RiEyeLine />
                View Transaction
              </button>
            </div>
          ))}
        </div>

        <div className="at-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(1, page - 1)
              )
            }
          >
            <RiArrowLeftSLine />
            Previous
          </button>

          <div className="at-page-numbers">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "at-page-active"
                    : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
          >
            Next
            <RiArrowRightSLine />
          </button>
        </div>
      </div>

      {showDetails && selectedTransaction && (
        <TransactionDetails
          transaction={selectedTransaction}
          onClose={() => {
            setShowDetails(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </div>
  );
};

const FilterSelect = ({
  icon,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="at-select-wrapper">
      {icon && (
        <span className="at-filter-icon">{icon}</span>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <RiArrowDownSLine className="at-select-arrow" />
    </div>
  );
};

const TransactionDetails = ({
  transaction,
  onClose,
}) => {
  return (
    <div
      className="at-modal-overlay"
      onClick={onClose}
    >
      <div
        className="at-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="at-modal-header">
          <div>
            <span>Transaction</span>
            <h2>{transaction.id}</h2>
          </div>

          <button
            type="button"
            className="at-modal-close"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="at-modal-status">
          <span
            className={`at-status ${transactionStatusClass(
              transaction.status
            )}`}
          >
            <span className="at-status-dot" />
            {transaction.status}
          </span>
        </div>

        <div className="at-detail-grid">
          <div>
            <span>Payment ID</span>
            <strong>{transaction.paymentId}</strong>
          </div>

          <div>
            <span>Business</span>
            <strong>
              {transaction.businessName}
            </strong>
          </div>

          <div>
            <span>Subscription</span>
            <strong>
              {transaction.subscriptionId}
            </strong>
          </div>

          <div>
            <span>Product</span>
            <strong>
              {transaction.productName}
            </strong>
          </div>

          <div>
            <span>Transaction Type</span>
            <strong>{transaction.type}</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>{transaction.method}</strong>
          </div>

          <div>
            <span>Direction</span>
            <strong>{transaction.direction}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>
              {transaction.date} · {transaction.time}
            </strong>
          </div>
        </div>

        <div className="at-total-box">
          <span>Transaction Amount</span>

          <strong>
            {transaction.direction === "Debit"
              ? "-"
              : "+"}
            ₹
            {Number(
              transaction.amount
            ).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="at-modal-footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;