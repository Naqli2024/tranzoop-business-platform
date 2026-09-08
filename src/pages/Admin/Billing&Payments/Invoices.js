import React, { useEffect, useMemo, useState } from "react";
import {
  RiSearchLine,
  RiCloseLine,
  RiFilter3Line,
  RiArrowDownSLine,
  RiMore2Fill,
  RiDownload2Line,
  RiEyeLine,
  RiSendPlaneLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiBuilding2Line,
  RiFileList3Line,
  RiBankCardLine,
  RiCalendarLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/adminBilling.css";

const ITEMS_PER_PAGE = 6;

const initialInvoices = [
  {
    id: "INV-1001",
    paymentId: "PAY-1001",
    businessId: "BUS-1001",
    subscriptionId: "SUB-1001",
    businessName: "ABC Enterprises",
    ownerName: "Arun Kumar",
    productName: "Transport BOS",
    planName: "Premium Plan",
    invoiceType: "Subscription",
    amount: 29999,
    tax: 5400,
    total: 35399,
    currency: "₹",
    status: "Paid",
    issueDate: "28 Aug 2026",
    dueDate: "28 Aug 2026",
  },
  {
    id: "INV-1002",
    paymentId: "PAY-1002",
    businessId: "BUS-1001",
    subscriptionId: "SUB-1002",
    businessName: "ABC Enterprises",
    ownerName: "Arun Kumar",
    productName: "Tyre BOS",
    planName: "Standard Plan",
    invoiceType: "Subscription",
    amount: 14999,
    tax: 2700,
    total: 17699,
    currency: "₹",
    status: "Paid",
    issueDate: "27 Aug 2026",
    dueDate: "27 Aug 2026",
  },
  {
    id: "INV-1003",
    paymentId: "PAY-1003",
    businessId: "BUS-1002",
    subscriptionId: "SUB-1003",
    businessName: "Sri Lakshmi Transport",
    ownerName: "Suresh Kumar",
    productName: "Transport BOS",
    planName: "Standard Plan",
    invoiceType: "Subscription",
    amount: 1499,
    tax: 270,
    total: 1769,
    currency: "₹",
    status: "Issued",
    issueDate: "29 Aug 2026",
    dueDate: "05 Sep 2026",
  },
  {
    id: "INV-1004",
    paymentId: "PAY-1004",
    businessId: "BUS-1003",
    subscriptionId: "SUB-1004",
    businessName: "Classic Tailors",
    ownerName: "Ramesh B",
    productName: "Tailor BOS",
    planName: "Premium Plan",
    invoiceType: "Subscription",
    amount: 24999,
    tax: 4500,
    total: 29499,
    currency: "₹",
    status: "Paid",
    issueDate: "25 Aug 2026",
    dueDate: "25 Aug 2026",
  },
  {
    id: "INV-1005",
    paymentId: "PAY-1005",
    businessId: "BUS-1004",
    subscriptionId: "SUB-1005",
    businessName: "Raj Tyres & Wheels",
    ownerName: "Rajesh M",
    productName: "Tyre BOS",
    planName: "Standard Plan",
    invoiceType: "Subscription",
    amount: 1499,
    tax: 270,
    total: 1769,
    currency: "₹",
    status: "Overdue",
    issueDate: "30 Aug 2026",
    dueDate: "30 Aug 2026",
  },
  {
    id: "INV-1006",
    paymentId: "PAY-1006",
    businessId: "BUS-1005",
    subscriptionId: "SUB-1006",
    businessName: "South India Logistics",
    ownerName: "Vijay Anand",
    productName: "Transport BOS",
    planName: "Premium Plan",
    invoiceType: "Renewal",
    amount: 29999,
    tax: 5400,
    total: 35399,
    currency: "₹",
    status: "Void",
    issueDate: "20 Aug 2026",
    dueDate: "20 Aug 2026",
  },
  {
    id: "INV-1007",
    paymentId: "PAY-1007",
    businessId: "BUS-1006",
    subscriptionId: "SUB-1007",
    businessName: "Fashion Point",
    ownerName: "Priya S",
    productName: "Tailor BOS",
    planName: "Free Plan",
    invoiceType: "Subscription",
    amount: 0,
    tax: 0,
    total: 0,
    currency: "₹",
    status: "Paid",
    issueDate: "18 Aug 2026",
    dueDate: "18 Aug 2026",
  },
  {
    id: "INV-1008",
    paymentId: "PAY-1008",
    businessId: "BUS-1007",
    subscriptionId: "SUB-1008",
    businessName: "Metro Auto Care",
    ownerName: "Karthik R",
    productName: "Tyre BOS",
    planName: "Premium Plan",
    invoiceType: "Renewal",
    amount: 1999,
    tax: 360,
    total: 2359,
    currency: "₹",
    status: "Issued",
    issueDate: "22 Aug 2026",
    dueDate: "22 Sep 2026",
  },
  {
    id: "INV-1009",
    paymentId: "PAY-1009",
    businessId: "BUS-1008",
    subscriptionId: "SUB-1009",
    businessName: "Chennai Fashion Hub",
    ownerName: "Meena R",
    productName: "Tailor BOS",
    planName: "Standard Plan",
    invoiceType: "Subscription",
    amount: 999,
    tax: 180,
    total: 1179,
    currency: "₹",
    status: "Partially Paid",
    issueDate: "24 Aug 2026",
    dueDate: "24 Aug 2026",
  },
  {
    id: "INV-1010",
    paymentId: "PAY-1010",
    businessId: "BUS-1009",
    subscriptionId: "SUB-1010",
    businessName: "Prime Fleet Services",
    ownerName: "Sanjay K",
    productName: "Transport BOS",
    planName: "Standard Plan",
    invoiceType: "Renewal",
    amount: 12999,
    tax: 2340,
    total: 15339,
    currency: "₹",
    status: "Draft",
    issueDate: "31 Aug 2026",
    dueDate: "07 Sep 2026",
  },
];

const statusOptions = [
  "All Status",
  "Draft",
  "Issued",
  "Paid",
  "Partially Paid",
  "Overdue",
  "Void",
];

const productOptions = [
  "All Products",
  "Transport BOS",
  "Tyre BOS",
  "Tailor BOS",
];

const typeOptions = [
  "All Types",
  "Subscription",
  "Renewal",
];

const dateOptions = [
  "All Dates",
  "Today",
  "Last 7 Days",
  "Last 30 Days",
];

const formatAmount = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

const statusClass = (status) => {
  const map = {
    Draft: "ai-status-draft",
    Issued: "ai-status-issued",
    Paid: "ai-status-paid",
    "Partially Paid": "ai-status-partial",
    Overdue: "ai-status-overdue",
    Void: "ai-status-void",
  };

  return map[status] || "";
};

const Invoices = () => {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState(initialInvoices);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [productFilter, setProductFilter] = useState("All Products");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [dateFilter, setDateFilter] = useState("All Dates");

  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".ai-action-wrapper")) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredInvoices = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return invoices.filter((invoice) => {
      const matchesSearch =
        !search ||
        invoice.id.toLowerCase().includes(search) ||
        invoice.paymentId.toLowerCase().includes(search) ||
        invoice.subscriptionId.toLowerCase().includes(search) ||
        invoice.businessId.toLowerCase().includes(search) ||
        invoice.businessName.toLowerCase().includes(search) ||
        invoice.ownerName.toLowerCase().includes(search) ||
        invoice.productName.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All Status" ||
        invoice.status === statusFilter;

      const matchesProduct =
        productFilter === "All Products" ||
        invoice.productName === productFilter;

      const matchesType =
        typeFilter === "All Types" ||
        invoice.invoiceType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProduct &&
        matchesType
      );
    });
  }, [
    invoices,
    searchTerm,
    statusFilter,
    productFilter,
    typeFilter,
    dateFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE)
  );

  const paginatedInvoices = filteredInvoices.slice(
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
    dateFilter,
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
    setDateFilter("All Dates");
    setCurrentPage(1);
  };

  const hasFilters =
    searchTerm ||
    statusFilter !== "All Status" ||
    productFilter !== "All Products" ||
    typeFilter !== "All Types" ||
    dateFilter !== "All Dates";

  const openDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetails(true);
    setOpenActionId(null);
  };

  const handleViewBusiness = (invoice) => {
    setOpenActionId(null);
    navigate(`/admin/businesses?businessId=${invoice.businessId}`);
  };

  const handleViewSubscription = (invoice) => {
    setOpenActionId(null);
    navigate(
      `/admin/subscriptions?subscriptionId=${invoice.subscriptionId}`
    );
  };

  const handleViewPayment = (invoice) => {
    setOpenActionId(null);
    navigate(`/admin/payments?paymentId=${invoice.paymentId}`);
  };

  const handleDownload = (invoice) => {
    setOpenActionId(null);

    // Replace this later with your backend invoice PDF endpoint.
    window.print();

    console.log("Download invoice:", invoice.id);
  };

  const handleSendInvoice = (invoice) => {
    setOpenActionId(null);

    alert(`Invoice ${invoice.id} will be sent to ${invoice.businessName}.`);
  };

  const handleMarkPaid = (invoice) => {
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoice.id
          ? {
              ...item,
              status: "Paid",
            }
          : item
      )
    );

    setOpenActionId(null);
  };

  const handleVoid = (invoice) => {
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoice.id
          ? {
              ...item,
              status: "Void",
            }
          : item
      )
    );

    setOpenActionId(null);
  };

  return (
    <div className="ai-page">
      <div className="ai-page-header">
        <div>
          <div className="ai-breadcrumb">
            <span>Billing &amp; Payments</span>
            <span>/</span>
            Invoices
          </div>

          <h1>Invoices</h1>

          <p>
            Manage invoices, billing records and payment documents.
          </p>
        </div>

        <button
          type="button"
          className="ai-export-button"
          onClick={() => window.print()}
        >
          <RiDownload2Line />
          Export
        </button>
      </div>

      <div className="ai-card">
        <div className="ai-filter-row">
          <div className="ai-search-box">
            <RiSearchLine />

            <input
              type="text"
              placeholder="Search invoice, business, payment, subscription ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                type="button"
                className="ai-search-clear"
                onClick={() => setSearchTerm("")}
              >
                <RiCloseLine />
              </button>
            )}
          </div>

          <div className="ai-filter-group">
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
              value={dateFilter}
              options={dateOptions}
              onChange={setDateFilter}
            />

            {hasFilters && (
              <button
                type="button"
                className="ai-reset-button"
                onClick={handleResetFilters}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="ai-table-summary">
          <div>
            <strong>{filteredInvoices.length}</strong> invoices found
          </div>

          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="ai-table-wrapper">
          <table className="ai-table">
            <thead>
              <tr>
                <th>INVOICE</th>
                <th>BUSINESS</th>
                <th>PRODUCT / PLAN</th>
                <th>TYPE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ISSUE / DUE DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedInvoices.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <div className="ai-empty">
                      No invoices found
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <div className="ai-primary-text">
                        {invoice.id}
                      </div>

                      <div className="ai-secondary-text">
                        {invoice.paymentId}
                      </div>
                    </td>

                    <td>
                      <div className="ai-primary-text">
                        {invoice.businessName}
                      </div>

                      <div className="ai-secondary-text">
                        {invoice.businessId} · {invoice.ownerName}
                      </div>
                    </td>

                    <td>
                      <div className="ai-primary-text">
                        {invoice.productName}
                      </div>

                      <span className="ai-plan-badge">
                        {invoice.planName}
                      </span>
                    </td>

                    <td>
                      <div className="ai-type-text">
                        {invoice.invoiceType}
                      </div>
                    </td>

                    <td>
                      <div className="ai-primary-text">
                        {formatAmount(invoice.total)}
                      </div>

                      <div className="ai-secondary-text">
                        incl. tax
                      </div>
                    </td>

                    <td>
                      <span
                        className={`ai-status ${statusClass(
                          invoice.status
                        )}`}
                      >
                        <span className="ai-status-dot" />
                        {invoice.status}
                      </span>
                    </td>

                    <td>
                      <div className="ai-date-cell">
                        <RiCalendarLine />

                        <div>
                          <div>{invoice.issueDate}</div>

                          <small>
                            Due {invoice.dueDate}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="ai-action-wrapper">
                        <button
                          type="button"
                          className="ai-action-button"
                          onClick={() =>
                            setOpenActionId(
                              openActionId === invoice.id
                                ? null
                                : invoice.id
                            )
                          }
                        >
                          <RiMore2Fill />
                        </button>

                        {openActionId === invoice.id && (
                          <div className="ai-action-menu">
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(invoice)
                              }
                            >
                              <RiEyeLine />
                              View Invoice
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDownload(invoice)
                              }
                            >
                              <RiDownload2Line />
                              Download Invoice
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleSendInvoice(invoice)
                              }
                            >
                              <RiSendPlaneLine />
                              Send Invoice
                            </button>

                            {invoice.status !== "Paid" &&
                              invoice.status !== "Void" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleMarkPaid(invoice)
                                  }
                                >
                                  <RiCheckLine />
                                  Mark as Paid
                                </button>
                              )}

                            {invoice.status !== "Void" && (
                              <button
                                type="button"
                                className="ai-danger-menu-item"
                                onClick={() =>
                                  handleVoid(invoice)
                                }
                              >
                                <RiCloseCircleLine />
                                Void Invoice
                              </button>
                            )}

                            <div className="ai-menu-divider" />

                            <button
                              type="button"
                              onClick={() =>
                                handleViewPayment(invoice)
                              }
                            >
                              <RiBankCardLine />
                              View Payment
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleViewBusiness(invoice)
                              }
                            >
                              <RiBuilding2Line />
                              View Business
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleViewSubscription(invoice)
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
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="ai-mobile-list">
          {paginatedInvoices.map((invoice) => (
            <div className="ai-mobile-card" key={invoice.id}>
              <div className="ai-mobile-card-top">
                <div>
                  <strong>{invoice.id}</strong>
                  <span>{invoice.paymentId}</span>
                </div>

                <span
                  className={`ai-status ${statusClass(
                    invoice.status
                  )}`}
                >
                  <span className="ai-status-dot" />
                  {invoice.status}
                </span>
              </div>

              <div className="ai-mobile-business">
                <strong>{invoice.businessName}</strong>
                <span>
                  {invoice.businessId} · {invoice.ownerName}
                </span>
              </div>

              <div className="ai-mobile-product">
                <strong>{invoice.productName}</strong>
                <span className="ai-plan-badge">
                  {invoice.planName}
                </span>
              </div>

              <div className="ai-mobile-grid">
                <div>
                  <small>Amount</small>
                  <strong>
                    {formatAmount(invoice.total)}
                  </strong>
                </div>

                <div>
                  <small>Type</small>
                  <strong>{invoice.invoiceType}</strong>
                </div>

                <div>
                  <small>Issue Date</small>
                  <strong>{invoice.issueDate}</strong>
                </div>

                <div>
                  <small>Due Date</small>
                  <strong>{invoice.dueDate}</strong>
                </div>
              </div>

              <button
                type="button"
                className="ai-mobile-view-button"
                onClick={() => openDetails(invoice)}
              >
                <RiEyeLine />
                View Invoice
              </button>
            </div>
          ))}
        </div>

        <div className="ai-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
          >
            <RiArrowLeftSLine />
            Previous
          </button>

          <div className="ai-page-numbers">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page
                    ? "ai-page-active"
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

      {showDetails && selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          onClose={() => {
            setShowDetails(false);
            setSelectedInvoice(null);
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
    <div className="ai-select-wrapper">
      {icon && <span className="ai-filter-icon">{icon}</span>}

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

      <RiArrowDownSLine className="ai-select-arrow" />
    </div>
  );
};

const InvoiceDetails = ({ invoice, onClose }) => {
  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div
        className="ai-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ai-modal-header">
          <div>
            <span>Invoice</span>
            <h2>{invoice.id}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ai-modal-close"
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="ai-modal-status-row">
          <span
            className={`ai-status ${statusClass(
              invoice.status
            )}`}
          >
            <span className="ai-status-dot" />
            {invoice.status}
          </span>
        </div>

        <div className="ai-detail-grid">
          <div>
            <span>Business</span>
            <strong>{invoice.businessName}</strong>
          </div>

          <div>
            <span>Owner</span>
            <strong>{invoice.ownerName}</strong>
          </div>

          <div>
            <span>Product</span>
            <strong>{invoice.productName}</strong>
          </div>

          <div>
            <span>Plan</span>
            <strong>{invoice.planName}</strong>
          </div>

          <div>
            <span>Invoice Type</span>
            <strong>{invoice.invoiceType}</strong>
          </div>

          <div>
            <span>Payment ID</span>
            <strong>{invoice.paymentId}</strong>
          </div>

          <div>
            <span>Subtotal</span>
            <strong>{formatAmount(invoice.amount)}</strong>
          </div>

          <div>
            <span>Tax</span>
            <strong>{formatAmount(invoice.tax)}</strong>
          </div>
        </div>

        <div className="ai-total-box">
          <span>Total Amount</span>
          <strong>{formatAmount(invoice.total)}</strong>
        </div>

        <div className="ai-modal-footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoices;