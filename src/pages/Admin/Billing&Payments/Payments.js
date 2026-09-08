import React, { useEffect, useMemo, useState } from "react";
import {
  RiSearchLine,
  RiRefreshLine,
  RiMore2Fill,
  RiEyeLine,
  RiFileList3Line,
  RiBuildingLine,
  RiBillLine,
  RiRefund2Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiCheckLine,
  RiTimeLine,
  RiErrorWarningLine,
  RiFilter3Line,
  RiMoneyDollarCircleLine,
  RiBankCardLine,
  RiWallet3Line,
  RiExchangeDollarLine,
} from "react-icons/ri";

import "../../../assets/styles/adminBilling.css";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const INITIAL_PAYMENTS = [
  {
    id: "PAY-1001",
    businessId: "BUS-1001",
    businessName: "ABC Enterprises",
    email: "accounts@abcenterprises.com",
    subscriptionId: "SUB-1001",
    productName: "Transport BOS",
    planName: "Premium",
    invoiceId: "INV-1001",
    amount: 29999,
    currency: "INR",
    paymentMethod: "UPI",
    transactionId: "TXN_8F72A1",
    status: "Success",
    paymentDate: "2026-08-28T10:30:00",
    refundAmount: 0,
    description: "Annual Premium subscription payment",
  },
  {
    id: "PAY-1002",
    businessId: "BUS-1001",
    businessName: "ABC Enterprises",
    email: "accounts@abcenterprises.com",
    subscriptionId: "SUB-1002",
    productName: "Tyre BOS",
    planName: "Standard",
    invoiceId: "INV-1002",
    amount: 14999,
    currency: "INR",
    paymentMethod: "Credit Card",
    transactionId: "TXN_9D42B7",
    status: "Success",
    paymentDate: "2026-08-27T14:15:00",
    refundAmount: 0,
    description: "Annual Standard subscription payment",
  },
  {
    id: "PAY-1003",
    businessId: "BUS-1002",
    businessName: "Sri Lakshmi Transport",
    email: "admin@srilakshmitransport.com",
    subscriptionId: "SUB-1003",
    productName: "Transport BOS",
    planName: "Standard",
    invoiceId: "INV-1003",
    amount: 1499,
    currency: "INR",
    paymentMethod: "Net Banking",
    transactionId: "TXN_2A77C1",
    status: "Pending",
    paymentDate: "2026-08-29T09:20:00",
    refundAmount: 0,
    description: "Monthly Standard subscription payment",
  },
  {
    id: "PAY-1004",
    businessId: "BUS-1003",
    businessName: "Classic Tailors",
    email: "admin@classictailors.com",
    subscriptionId: "SUB-1004",
    productName: "Tailor BOS",
    planName: "Premium",
    invoiceId: "INV-1004",
    amount: 24999,
    currency: "INR",
    paymentMethod: "Credit Card",
    transactionId: "TXN_6C83E2",
    status: "Success",
    paymentDate: "2026-08-25T16:40:00",
    refundAmount: 0,
    description: "Annual Premium subscription payment",
  },
  {
    id: "PAY-1005",
    businessId: "BUS-1004",
    businessName: "Raj Tyres & Wheels",
    email: "accounts@rajtyres.com",
    subscriptionId: "SUB-1005",
    productName: "Tyre BOS",
    planName: "Standard",
    invoiceId: "INV-1005",
    amount: 1499,
    currency: "INR",
    paymentMethod: "UPI",
    transactionId: "TXN_4E92D4",
    status: "Failed",
    paymentDate: "2026-08-30T11:10:00",
    refundAmount: 0,
    description: "Monthly Standard subscription payment",
    failureReason: "Payment declined by bank",
  },
  {
    id: "PAY-1006",
    businessId: "BUS-1005",
    businessName: "South India Logistics",
    email: "finance@southindialogistics.com",
    subscriptionId: "SUB-1006",
    productName: "Transport BOS",
    planName: "Premium",
    invoiceId: "INV-1006",
    amount: 29999,
    currency: "INR",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN_7B12F9",
    status: "Refunded",
    paymentDate: "2026-08-20T13:25:00",
    refundAmount: 29999,
    description: "Annual Premium subscription payment",
    refundDate: "2026-08-22T10:15:00",
    refundReason: "Customer requested cancellation",
  },
  {
    id: "PAY-1007",
    businessId: "BUS-1006",
    businessName: "Fashion Point",
    email: "admin@fashionpoint.com",
    subscriptionId: "SUB-1007",
    productName: "Tailor BOS",
    planName: "Free",
    invoiceId: "INV-1007",
    amount: 0,
    currency: "INR",
    paymentMethod: "Free Trial",
    transactionId: "-",
    status: "Success",
    paymentDate: "2026-08-18T10:00:00",
    refundAmount: 0,
    description: "Free trial activation",
  },
  {
    id: "PAY-1008",
    businessId: "BUS-1007",
    businessName: "Metro Auto Care",
    email: "billing@metroautocare.com",
    subscriptionId: "SUB-1008",
    productName: "Tyre BOS",
    planName: "Premium",
    invoiceId: "INV-1008",
    amount: 2499,
    currency: "INR",
    paymentMethod: "UPI",
    transactionId: "TXN_1D82A9",
    status: "Partially Refunded",
    paymentDate: "2026-08-15T15:45:00",
    refundAmount: 999,
    description: "Monthly Premium subscription payment",
    refundDate: "2026-08-17T12:20:00",
    refundReason: "Partial service credit",
  },
  {
    id: "PAY-1009",
    businessId: "BUS-1008",
    businessName: "Chennai Fashion Hub",
    email: "finance@chennaifashionhub.com",
    subscriptionId: "SUB-1009",
    productName: "Tailor BOS",
    planName: "Standard",
    invoiceId: "INV-1009",
    amount: 1299,
    currency: "INR",
    paymentMethod: "Debit Card",
    transactionId: "TXN_3A91D7",
    status: "Success",
    paymentDate: "2026-08-12T17:30:00",
    refundAmount: 0,
    description: "Monthly Standard subscription payment",
  },
  {
    id: "PAY-1010",
    businessId: "BUS-1009",
    businessName: "Greenline Logistics",
    email: "accounts@greenlinelogistics.com",
    subscriptionId: "SUB-1010",
    productName: "Transport BOS",
    planName: "Standard",
    invoiceId: "INV-1010",
    amount: 1499,
    currency: "INR",
    paymentMethod: "Credit Card",
    transactionId: "TXN_5C21F8",
    status: "Success",
    paymentDate: "2026-08-10T09:45:00",
    refundAmount: 0,
    description: "Monthly Standard subscription payment",
  },
];

const formatCurrency = (amount, currency = "INR") => {
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusClass = (status) => {
  const map = {
    Success: "ap-status-success",
    Pending: "ap-status-pending",
    Failed: "ap-status-failed",
    Refunded: "ap-status-refunded",
    "Partially Refunded": "ap-status-partial",
  };
  return map[status] || "ap-status-default";
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Success":
      return <RiCheckLine />;
    case "Pending":
      return <RiTimeLine />;
    case "Failed":
      return <RiErrorWarningLine />;
    case "Refunded":
      return <RiRefund2Line />;
    case "Partially Refunded":
      return <RiExchangeDollarLine />;
    default:
      return <RiTimeLine />;
  }
};

const getMethodIcon = (method) => {
  if (method === "UPI") return <RiWallet3Line />;
  if (method === "Credit Card" || method === "Debit Card")
    return <RiBankCardLine />;
  if (method === "Net Banking" || method === "Bank Transfer")
    return <RiMoneyDollarCircleLine />;
  return <RiWallet3Line />;
};

const PaymentDetailsModal = ({ open, payment, onClose }) => {
  if (!open || !payment) return null;

  const refundableAmount = Math.max(
    0,
    payment.amount - (payment.refundAmount || 0),
  );

  return (
    <div className="ap-modal-overlay" onMouseDown={onClose}>
      <div
        className="ap-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="ap-modal-header">
          <div>
            <span className="ap-modal-eyebrow">Payment Details</span>
            <h2>{payment.id}</h2>
          </div>
          <button
            type="button"
            className="ap-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="ap-modal-body">
          <div className="ap-payment-detail-top">
            <div className="ap-payment-detail-icon">
              <RiMoneyDollarCircleLine />
            </div>
            <div>
              <div className="ap-payment-detail-amount">
                {formatCurrency(payment.amount, payment.currency)}
              </div>
              <span
                className={`ap-status-badge ${getStatusClass(payment.status)}`}
              >
                {getStatusIcon(payment.status)}
                {payment.status}
              </span>
            </div>
          </div>

          <div className="ap-detail-section">
            <h3>Payment Information</h3>
            <div className="ap-detail-grid">
              <div className="ap-detail-item">
                <span>Payment ID</span>
                <strong>{payment.id}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Transaction ID</span>
                <strong>{payment.transactionId}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Payment Method</span>
                <strong className="ap-method-value">
                  {getMethodIcon(payment.paymentMethod)}
                  {payment.paymentMethod}
                </strong>
              </div>
              <div className="ap-detail-item">
                <span>Payment Date</span>
                <strong>{formatDateTime(payment.paymentDate)}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Amount</span>
                <strong>
                  {formatCurrency(payment.amount, payment.currency)}
                </strong>
              </div>
              <div className="ap-detail-item">
                <span>Refunded Amount</span>
                <strong>
                  {formatCurrency(payment.refundAmount, payment.currency)}
                </strong>
              </div>
              <div className="ap-detail-item">
                <span>Refundable Amount</span>
                <strong>
                  {formatCurrency(refundableAmount, payment.currency)}
                </strong>
              </div>
              <div className="ap-detail-item">
                <span>Invoice</span>
                <strong>{payment.invoiceId}</strong>
              </div>
            </div>
          </div>

          <div className="ap-detail-section">
            <h3>Customer &amp; Subscription</h3>
            <div className="ap-detail-grid">
              <div className="ap-detail-item">
                <span>Business</span>
                <strong>{payment.businessName}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Email</span>
                <strong>{payment.email}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Subscription</span>
                <strong>{payment.subscriptionId}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Product</span>
                <strong>{payment.productName}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Plan</span>
                <strong>{payment.planName}</strong>
              </div>
              <div className="ap-detail-item">
                <span>Description</span>
                <strong>{payment.description}</strong>
              </div>
            </div>
          </div>

          {(payment.refundDate || payment.refundReason) && (
            <div className="ap-detail-section">
              <h3>Refund Information</h3>
              <div className="ap-detail-grid">
                {payment.refundDate && (
                  <div className="ap-detail-item">
                    <span>Refund Date</span>
                    <strong>{formatDateTime(payment.refundDate)}</strong>
                  </div>
                )}
                {payment.refundReason && (
                  <div className="ap-detail-item">
                    <span>Refund Reason</span>
                    <strong>{payment.refundReason}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {payment.failureReason && (
            <div className="ap-payment-warning">
              <RiErrorWarningLine />
              <div>
                <strong>Payment failed</strong>
                <p>{payment.failureReason}</p>
              </div>
            </div>
          )}
        </div>

        <div className="ap-modal-footer">
          <button
            type="button"
            className="ap-secondary-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const RefundConfirmModal = ({ open, payment, onClose, onConfirm }) => {
  if (!open || !payment) return null;

  const refundableAmount = Math.max(
    0,
    payment.amount - (payment.refundAmount || 0),
  );

  return (
    <div className="ap-modal-overlay" onMouseDown={onClose}>
      <div
        className="ap-confirm-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="ap-confirm-icon">
          <RiRefund2Line />
        </div>

        <h2>Refund Payment?</h2>

        <p>
          Are you sure you want to refund <strong>{payment.id}</strong> for{" "}
          <strong>{formatCurrency(refundableAmount, payment.currency)}</strong>?
        </p>

        <div className="ap-refund-summary">
          <div>
            <span>Original Amount</span>
            <strong>{formatCurrency(payment.amount, payment.currency)}</strong>
          </div>
          <div>
            <span>Already Refunded</span>
            <strong>
              {formatCurrency(payment.refundAmount, payment.currency)}
            </strong>
          </div>
          <div>
            <span>Refund Amount</span>
            <strong>
              {formatCurrency(refundableAmount, payment.currency)}
            </strong>
          </div>
        </div>

        <div className="ap-confirm-actions">
          <button
            type="button"
            className="ap-secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="ap-danger-button"
            onClick={() => onConfirm(payment.id)}
          >
            <RiRefund2Line />
            Refund Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const Payments = () => {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".ap-action-wrapper")) {
        setOpenActionId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPayments = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !search ||
        payment.id.toLowerCase().includes(search) ||
        payment.businessName.toLowerCase().includes(search) ||
        payment.subscriptionId.toLowerCase().includes(search) ||
        payment.invoiceId.toLowerCase().includes(search) ||
        payment.transactionId.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;
      const matchesMethod =
        methodFilter === "All" || payment.paymentMethod === methodFilter;
      const matchesProduct =
        productFilter === "All" || payment.productName === productFilter;

      let matchesDate = true;
      if (dateFilter !== "All") {
        const paymentDate = new Date(payment.paymentDate);
        const today = new Date();

        if (dateFilter === "Today") {
          matchesDate = paymentDate.toDateString() === today.toDateString();
        }
        if (dateFilter === "Last 7 Days") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(today.getDate() - 7);
          matchesDate = paymentDate >= sevenDaysAgo;
        }
        if (dateFilter === "Last 30 Days") {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);
          matchesDate = paymentDate >= thirtyDaysAgo;
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesProduct &&
        matchesDate
      );
    });
  }, [
    payments,
    searchTerm,
    statusFilter,
    methodFilter,
    productFilter,
    dateFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / ITEMS_PER_PAGE),
  );
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, methodFilter, productFilter, dateFilter]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const summary = useMemo(() => {
    const successfulPayments = payments.filter(
      (payment) => payment.status === "Success",
    );
    const successfulRevenue = successfulPayments.reduce(
      (total, payment) => total + Number(payment.amount || 0),
      0,
    );
    const refundedAmount = payments.reduce(
      (total, payment) => total + Number(payment.refundAmount || 0),
      0,
    );
    const pendingCount = payments.filter(
      (payment) => payment.status === "Pending",
    ).length;
    const failedCount = payments.filter(
      (payment) => payment.status === "Failed",
    ).length;

    return {
      successfulCount: successfulPayments.length,
      successfulRevenue,
      refundedAmount,
      pendingCount,
      failedCount,
    };
  }, [payments]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setMethodFilter("All");
    setProductFilter("All");
    setDateFilter("All");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm ||
    statusFilter !== "All" ||
    methodFilter !== "All" ||
    productFilter !== "All" ||
    dateFilter !== "All";

  const openPayment = (payment, type) => {
    setSelectedPayment(payment);
    setOpenActionId(null);

    if (type === "details") setShowDetails(true);
    if (type === "refund") setShowRefund(true);
    if (type === "subscription")
      console.log("Navigate to subscription:", payment.subscriptionId);
    if (type === "business")
      console.log("Navigate to business:", payment.businessId);
    if (type === "invoice")
      console.log("Navigate to invoice:", payment.invoiceId);
  };

  const closeAllModals = () => {
    setShowDetails(false);
    setShowRefund(false);
    setSelectedPayment(null);
  };

  const handleRefund = (paymentId) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) => {
        if (payment.id !== paymentId) return payment;
        const refundAmount = payment.amount - (payment.refundAmount || 0);
        return {
          ...payment,
          refundAmount: (payment.refundAmount || 0) + refundAmount,
          status: "Refunded",
          refundDate: new Date().toISOString(),
          refundReason: "Refund processed by administrator",
        };
      }),
    );
    closeAllModals();
  };

  const handleViewBusiness = (payment) => {
    setOpenActionId(null);

    navigate(`/admin/businesses?businessId=${payment.businessId}`);
  };

  const handleViewSubscription = (payment) => {
    setOpenActionId(null);

    navigate(`/admin/subscriptions?subscriptionId=${payment.subscriptionId}`);
  };

  const handleViewInvoices = (payment) => {
    setOpenActionId(null);

    navigate(`/admin/invoices?invoiceId=${payment.paymentId}`);
  };

  const canRefund = (payment) =>
    (payment.status === "Success" || payment.status === "Partially Refunded") &&
    payment.amount > (payment.refundAmount || 0);

  return (
    <div className="ap-page">
      <div className="ap-page-header">
        <div>
          <div className="ap-breadcrumb">
            Billing &amp; Payments
            <span>/</span>
            Payments
          </div>
          <h1>Payments</h1>
          <p>
            Track subscription payments, payment status, refunds and
            transactions.
          </p>
        </div>
      </div>

      <div className="ap-summary-grid">
        <div className="ap-summary-card">
          <div className="ap-summary-icon ap-summary-icon-success">
            <RiCheckLine />
          </div>
          <div className="ap-summary-content">
            <span>Successful Revenue</span>
            <strong>{formatCurrency(summary.successfulRevenue)}</strong>
            <small>{summary.successfulCount} successful payments</small>
          </div>
        </div>

        <div className="ap-summary-card">
          <div className="ap-summary-icon ap-summary-icon-refund">
            <RiRefund2Line />
          </div>
          <div className="ap-summary-content">
            <span>Refunded Amount</span>
            <strong>{formatCurrency(summary.refundedAmount)}</strong>
            <small>Total processed refunds</small>
          </div>
        </div>

        <div className="ap-summary-card">
          <div className="ap-summary-icon ap-summary-icon-pending">
            <RiTimeLine />
          </div>
          <div className="ap-summary-content">
            <span>Pending Payments</span>
            <strong>{summary.pendingCount}</strong>
            <small>Awaiting confirmation</small>
          </div>
        </div>

        <div className="ap-summary-card">
          <div className="ap-summary-icon ap-summary-icon-failed">
            <RiErrorWarningLine />
          </div>
          <div className="ap-summary-content">
            <span>Failed Payments</span>
            <strong>{summary.failedCount}</strong>
            <small>Requires attention</small>
          </div>
        </div>
      </div>

      <div className="ap-table-card">
        <div className="ap-toolbar">
          <div className="ap-search-box">
            <RiSearchLine />
            <input
              type="text"
              placeholder="Search payment, business, invoice..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="ap-search-clear"
                onClick={() => setSearchTerm("")}
              >
                <RiCloseLine />
              </button>
            )}
          </div>

          <div className="ap-filter-group">
            <div className="ap-filter">
              <RiFilter3Line />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
                <option value="Partially Refunded">Partially Refunded</option>
              </select>
            </div>

            <div className="ap-filter">
              <select
                value={productFilter}
                onChange={(event) => setProductFilter(event.target.value)}
              >
                <option value="All">All Products</option>
                <option value="Transport BOS">Transport BOS</option>
                <option value="Tyre BOS">Tyre BOS</option>
                <option value="Tailor BOS">Tailor BOS</option>
              </select>
            </div>

            <div className="ap-filter">
              <select
                value={methodFilter}
                onChange={(event) => setMethodFilter(event.target.value)}
              >
                <option value="All">All Methods</option>
                <option value="UPI">UPI</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Free Trial">Free Trial</option>
              </select>
            </div>

            <div className="ap-filter">
              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                className="ap-reset-button"
                onClick={handleResetFilters}
                title="Reset filters"
              >
                <RiRefreshLine />
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="ap-results-bar">
          <div>
            <strong>{filteredPayments.length}</strong> payments found
          </div>
          <span>
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </span>
        </div>

        <div className="ap-table-wrapper">
          <table className="ap-table">
            <thead>
              <tr>
                <th>Payment</th>
                <th>Business</th>
                <th>Subscription</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th className="ap-action-column">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <div className="ap-payment-cell">
                      <div className="ap-payment-icon">
                        <RiMoneyDollarCircleLine />
                      </div>
                      <div>
                        <strong>{payment.id}</strong>
                        <span>{payment.transactionId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="ap-business-cell">
                      <strong>{payment.businessName}</strong>
                      <span>{payment.productName}</span>
                    </div>
                  </td>

                  <td>
                    <div className="ap-subscription-cell">
                      <strong>{payment.subscriptionId}</strong>
                      <span>{payment.planName}</span>
                    </div>
                  </td>

                  <td>
                    <div className="ap-method-cell">
                      {getMethodIcon(payment.paymentMethod)}
                      <span>{payment.paymentMethod}</span>
                    </div>
                  </td>

                  <td>
                    <div className="ap-amount-cell">
                      <strong>
                        {formatCurrency(payment.amount, payment.currency)}
                      </strong>
                      {payment.refundAmount > 0 && (
                        <span>
                          Refunded{" "}
                          {formatCurrency(
                            payment.refundAmount,
                            payment.currency,
                          )}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`ap-status-badge ${getStatusClass(payment.status)}`}
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </td>

                  <td>
                    <span className="ap-date">
                      {formatDate(payment.paymentDate)}
                    </span>
                  </td>

                  <td>
                    <div className="ap-action-wrapper">
                      <button
                        type="button"
                        className="ap-action-button"
                        onClick={() =>
                          setOpenActionId(
                            openActionId === payment.id ? null : payment.id,
                          )
                        }
                      >
                        <RiMore2Fill />
                      </button>

                      {openActionId === payment.id && (
                        <div className="ap-action-menu">
                          <button
                            type="button"
                            onClick={() => openPayment(payment, "details")}
                          >
                            <RiEyeLine />
                            View Payment
                          </button>
                          <button
                            type="button"
                            onClick={() => handleViewSubscription(payment)}
                          >
                            <RiFileList3Line />
                            View Subscription
                          </button>
                          <button
                            type="button"
                            onClick={() => handleViewBusiness(payment)}
                          >
                            <RiBuildingLine />
                            View Business
                          </button>
                          <button
                            type="button"
                            onClick={() => handleViewInvoices(payment)}
                          >
                            <RiBillLine />
                            View Invoice
                          </button>

                          {canRefund(payment) && (
                            <>
                              <div className="ap-menu-divider" />
                              <button
                                type="button"
                                className="ap-danger-menu-item"
                                onClick={() => openPayment(payment, "refund")}
                              >
                                <RiRefund2Line />
                                Refund Payment
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedPayments.length === 0 && (
            <div className="ap-empty-state">
              <div className="ap-empty-icon">
                <RiMoneyDollarCircleLine />
              </div>
              <h3>No payments found</h3>
              <p>No payment records match your current search or filters.</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="ap-secondary-button"
                  onClick={handleResetFilters}
                >
                  <RiRefreshLine />
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        <div className="ap-mobile-list">
          {paginatedPayments.map((payment) => (
            <div className="ap-mobile-card" key={payment.id}>
              <div className="ap-mobile-card-header">
                <div className="ap-payment-cell">
                  <div className="ap-payment-icon">
                    <RiMoneyDollarCircleLine />
                  </div>
                  <div>
                    <strong>{payment.id}</strong>
                    <span>{payment.businessName}</span>
                  </div>
                </div>

                <div className="ap-action-wrapper">
                  <button
                    type="button"
                    className="ap-action-button"
                    onClick={() =>
                      setOpenActionId(
                        openActionId === payment.id ? null : payment.id,
                      )
                    }
                  >
                    <RiMore2Fill />
                  </button>

                  {openActionId === payment.id && (
                    <div className="ap-action-menu">
                      <button
                        type="button"
                        onClick={() => openPayment(payment, "details")}
                      >
                        <RiEyeLine />
                        View Payment
                      </button>
                      <button
                        type="button"
                        onClick={() => openPayment(payment, "subscription")}
                      >
                        <RiFileList3Line />
                        View Subscription
                      </button>
                      <button
                        type="button"
                        onClick={() => openPayment(payment, "business")}
                      >
                        <RiBuildingLine />
                        View Business
                      </button>
                      <button
                        type="button"
                        onClick={() => openPayment(payment, "invoice")}
                      >
                        <RiBillLine />
                        View Invoice
                      </button>

                      {canRefund(payment) && (
                        <>
                          <div className="ap-menu-divider" />
                          <button
                            type="button"
                            className="ap-danger-menu-item"
                            onClick={() => openPayment(payment, "refund")}
                          >
                            <RiRefund2Line />
                            Refund Payment
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="ap-mobile-card-body">
                <div className="ap-mobile-row">
                  <span>Product</span>
                  <strong>{payment.productName}</strong>
                </div>
                <div className="ap-mobile-row">
                  <span>Subscription</span>
                  <strong>{payment.subscriptionId}</strong>
                </div>
                <div className="ap-mobile-row">
                  <span>Plan</span>
                  <strong>{payment.planName}</strong>
                </div>
                <div className="ap-mobile-row">
                  <span>Payment Method</span>
                  <strong className="ap-method-value">
                    {getMethodIcon(payment.paymentMethod)}
                    {payment.paymentMethod}
                  </strong>
                </div>
                <div className="ap-mobile-row">
                  <span>Amount</span>
                  <strong className="ap-mobile-amount">
                    {formatCurrency(payment.amount, payment.currency)}
                  </strong>
                </div>
                <div className="ap-mobile-row">
                  <span>Status</span>
                  <span
                    className={`ap-status-badge ${getStatusClass(payment.status)}`}
                  >
                    {getStatusIcon(payment.status)}
                    {payment.status}
                  </span>
                </div>
                <div className="ap-mobile-row">
                  <span>Date</span>
                  <strong>{formatDate(payment.paymentDate)}</strong>
                </div>
              </div>
            </div>
          ))}

          {paginatedPayments.length === 0 && (
            <div className="ap-empty-state">
              <div className="ap-empty-icon">
                <RiMoneyDollarCircleLine />
              </div>
              <h3>No payments found</h3>
              <p>No payment records match your current filters.</p>
            </div>
          )}
        </div>

        {filteredPayments.length > 0 && (
          <div className="ap-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              <RiArrowLeftSLine />
              Previous
            </button>

            <div className="ap-page-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage === page
                        ? "ap-page-number active"
                        : "ap-page-number"
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              Next
              <RiArrowRightSLine />
            </button>
          </div>
        )}
      </div>

      <PaymentDetailsModal
        open={showDetails}
        payment={selectedPayment}
        onClose={closeAllModals}
      />

      <RefundConfirmModal
        open={showRefund}
        payment={selectedPayment}
        onClose={closeAllModals}
        onConfirm={handleRefund}
      />
    </div>
  );
};

export default Payments;
