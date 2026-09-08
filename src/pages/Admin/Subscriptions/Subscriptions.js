import React, { useEffect, useMemo, useState } from "react";
import {
  RiSearchLine,
  RiFilter3Line,
  RiMore2Fill,
  RiEyeLine,
  RiExchangeLine,
  RiPauseCircleLine,
  RiCloseCircleLine,
  RiRefreshLine,
  RiBankCardLine,
  RiFileList3Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine, 
  RiApps2Line,
  RiCloseLine,
  RiMoneyRupeeCircleLine,
} from "react-icons/ri";

import SubscriptionDetailsModal from "./SubscriptionDetailsModal";
import PauseSubscriptionModal from "./PauseSubscriptionModal";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import SubscriptionPaymentsModal from "./SubscriptionPaymentsModal";
import SubscriptionInvoicesModal from "./SubscriptionInvoicesModal";

import "../../../assets/styles/adminSubscriptions.css";
import ConfirmDialog from "../../../components/ConfirmDialog";

const INITIAL_SUBSCRIPTIONS = [
  {
    id: "SUB-1001",
    businessId: "BUS-1001",
    businessName: "ABC Enterprises",
    ownerName: "Arun Kumar",
    email: "arun@abcenterprises.com",
    productId: "PROD-1001",
    productName: "Transport BOS",
    planId: "PLAN-1003",
    planName: "Premium Plan",
    billingCycle: "Yearly",
    monthlyPrice: 1999,
    amount: 23988,
    currency: "INR",
    status: "Active",
    startDate: "12 Aug 2026",
    renewalDate: "12 Aug 2027",
    nextBillingDate: "12 Aug 2027",
    paymentStatus: "Paid",
    autoRenew: true,
    trial: false,
    trialDays: 0,
    pausedUntil: null,
    cancelledAt: null,
    modules: [
      "Fleet Management",
      "Trip Management",
      "Driver Management",
      "Customer Management",
      "Billing & Payments",
      "Reports & Analytics",
    ],
    createdDate: "12 Aug 2026",
    updatedDate: "12 Aug 2026",
  },
  {
    id: "SUB-1002",
    businessId: "BUS-1001",
    businessName: "ABC Enterprises",
    ownerName: "Arun Kumar",
    email: "arun@abcenterprises.com",
    productId: "PROD-1002",
    productName: "Tyre BOS",
    planId: "PLAN-1002",
    planName: "Standard Plan",
    billingCycle: "Yearly",
    monthlyPrice: 799,
    amount: 9588,
    currency: "INR",
    status: "Active",
    startDate: "12 Aug 2026",
    renewalDate: "12 Aug 2027",
    nextBillingDate: "12 Aug 2027",
    paymentStatus: "Paid",
    autoRenew: true,
    trial: false,
    trialDays: 0,
    pausedUntil: null,
    cancelledAt: null,
    modules: [
      "Inventory & Stock",
      "Sales & Billing",
      "Service & Fitting",
      "Customer Management",
      "Purchase Orders",
      "Reports & Analytics",
    ],
    createdDate: "12 Aug 2026",
    updatedDate: "12 Aug 2026",
  },
  {
    id: "SUB-1003",
    businessId: "BUS-1002",
    businessName: "Sri Lakshmi Transport",
    ownerName: "Suresh Kumar",
    email: "suresh@sltransport.com",
    productId: "PROD-1001",
    productName: "Transport BOS",
    planId: "PLAN-1002",
    planName: "Standard Plan",
    billingCycle: "Monthly",
    monthlyPrice: 1299,
    amount: 1299,
    currency: "INR",
    status: "Active",
    startDate: "18 Aug 2026",
    renewalDate: "18 Sep 2026",
    nextBillingDate: "18 Sep 2026",
    paymentStatus: "Paid",
    autoRenew: true,
    trial: false,
    trialDays: 0,
    pausedUntil: null,
    cancelledAt: null,
    modules: [
      "Fleet Management",
      "Trip Management",
      "Driver Management",
      "Customer Management",
    ],
    createdDate: "18 Aug 2026",
    updatedDate: "18 Aug 2026",
  },
  {
    id: "SUB-1004",
    businessId: "BUS-1003",
    businessName: "Classic Tailors",
    ownerName: "Ramesh B",
    email: "ramesh@classictailors.com",
    productId: "PROD-1003",
    productName: "Tailor BOS",
    planId: "PLAN-1003",
    planName: "Premium Plan",
    billingCycle: "Yearly",
    monthlyPrice: 999,
    amount: 11988,
    currency: "INR",
    status: "Active",
    startDate: "21 Aug 2026",
    renewalDate: "21 Aug 2027",
    nextBillingDate: "21 Aug 2027",
    paymentStatus: "Paid",
    autoRenew: true,
    trial: false,
    trialDays: 0,
    pausedUntil: null,
    cancelledAt: null,
    modules: [
      "Customers",
      "Orders",
      "Measurements",
      "Production",
      "Billing",
      "Reports",
    ],
    createdDate: "21 Aug 2026",
    updatedDate: "21 Aug 2026",
  },
  {
    id: "SUB-1005",
    businessId: "BUS-1004",
    businessName: "Raj Tyres & Wheels",
    ownerName: "Rajesh M",
    email: "rajesh@rajtyres.com",
    productId: "PROD-1002",
    productName: "Tyre BOS",
    planId: "PLAN-1002",
    planName: "Standard Plan",
    billingCycle: "Monthly",
    monthlyPrice: 799,
    amount: 799,
    currency: "INR",
    status: "Past Due",
    startDate: "24 Aug 2026",
    renewalDate: "24 Sep 2026",
    nextBillingDate: "24 Sep 2026",
    paymentStatus: "Failed",
    autoRenew: true,
    trial: false,
    trialDays: 0,
    pausedUntil: null,
    cancelledAt: null,
    modules: ["Inventory & Stock", "Sales & Billing", "Service & Fitting"],
    createdDate: "24 Aug 2026",
    updatedDate: "02 Sep 2026",
  },
  {
    id: "SUB-1006",
    businessId: "BUS-1005",
    businessName: "South India Logistics",
    ownerName: "Vijay Anand",
    email: "vijay@silogistics.com",
    productId: "PROD-1001",
    productName: "Transport BOS",
    planId: "PLAN-1003",
    planName: "Premium Plan",
    billingCycle: "Yearly",
    monthlyPrice: 1999,
    amount: 23988,
    currency: "INR",
    status: "Suspended",
    startDate: "27 Aug 2026",
    renewalDate: "27 Aug 2027",
    nextBillingDate: "27 Aug 2027",
    paymentStatus: "Failed",
    autoRenew: true,
    trial: false,
    trialDays: 0,
    pausedUntil: null,
    cancelledAt: null,
    modules: [
      "Fleet Management",
      "Trip Management",
      "Driver Management",
      "Billing & Payments",
    ],
    createdDate: "27 Aug 2026",
    updatedDate: "03 Sep 2026",
  },
  {
    id: "SUB-1007",
    businessId: "BUS-1006",
    businessName: "Fashion Point",
    ownerName: "Priya S",
    email: "priya@fashionpoint.com",
    productId: "PROD-1003",
    productName: "Tailor BOS",
    planId: "PLAN-1001",
    planName: "Free Plan",
    billingCycle: "Monthly",
    monthlyPrice: 0,
    amount: 0,
    currency: "INR",
    status: "Trial",
    startDate: "29 Aug 2026",
    renewalDate: "12 Sep 2026",
    nextBillingDate: "12 Sep 2026",
    paymentStatus: "Not Required",
    autoRenew: false,
    trial: true,
    trialDays: 14,
    pausedUntil: null,
    cancelledAt: null,
    modules: ["Customers", "Orders", "Measurements"],
    createdDate: "29 Aug 2026",
    updatedDate: "29 Aug 2026",
  },
  {
    id: "SUB-1008",
    businessId: "BUS-1007",
    businessName: "Metro Auto Care",
    ownerName: "Karthik R",
    email: "karthik@metroauto.com",
    productId: "PROD-1002",
    productName: "Tyre BOS",
    planId: "PLAN-1003",
    planName: "Premium Plan",
    billingCycle: "Monthly",
    monthlyPrice: 1499,
    amount: 1499,
    currency: "INR",
    status: "Paused",
    startDate: "01 Sep 2026",
    renewalDate: "01 Oct 2026",
    nextBillingDate: "01 Oct 2026",
    paymentStatus: "Paid",
    autoRenew: true,
    trial: false,
    trialDays: 0,
    pausedUntil: "15 Sep 2026",
    cancelledAt: null,
    modules: [
      "Inventory & Stock",
      "Sales & Billing",
      "Service & Fitting",
      "Reports & Analytics",
    ],
    createdDate: "01 Sep 2026",
    updatedDate: "04 Sep 2026",
  },
  {
    id: "SUB-1009",
    businessId: "BUS-1008",
    businessName: "Chennai Fashion Hub",
    ownerName: "Meena S",
    email: "meena@fashionhub.com",
    productId: "PROD-1003",
    productName: "Tailor BOS",
    planId: "PLAN-1002",
    planName: "Standard Plan",
    billingCycle: "Monthly",
    monthlyPrice: 599,
    amount: 599,
    currency: "INR",
    status: "Cancelled",
    startDate: "03 Aug 2026",
    renewalDate: "03 Sep 2026",
    nextBillingDate: "-",
    paymentStatus: "Paid",
    autoRenew: false,
    trial: false,
    trialDays: 0,
    pausedUntil: null,
    cancelledAt: "28 Aug 2026",
    modules: ["Customers", "Orders", "Measurements"],
    createdDate: "03 Aug 2026",
    updatedDate: "28 Aug 2026",
  },
];

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS = [
  "All Status",
  "Active",
  "Trial",
  "Past Due",
  "Paused",
  "Suspended",
  "Cancelled",
];

const PRODUCT_OPTIONS = [
  "All Products",
  "Transport BOS",
  "Tyre BOS",
  "Tailor BOS",
];

const PLAN_OPTIONS = [
  "All Plans",
  "Free Plan",
  "Standard Plan",
  "Premium Plan",
];

const BILLING_OPTIONS = ["All Billing", "Monthly", "Yearly"];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [productFilter, setProductFilter] = useState("All Products");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [billingFilter, setBillingFilter] = useState("All Billing");
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);
  const [showReactivate, setShowReactivate] = useState(false);

  const filteredSubscriptions = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return subscriptions.filter((subscription) => {
      const matchesSearch =
        !search ||
        subscription.id.toLowerCase().includes(search) ||
        subscription.businessName.toLowerCase().includes(search) ||
        subscription.businessId.toLowerCase().includes(search) ||
        subscription.ownerName.toLowerCase().includes(search) ||
        subscription.email.toLowerCase().includes(search) ||
        subscription.productName.toLowerCase().includes(search) ||
        subscription.planName.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All Status" || subscription.status === statusFilter;

      const matchesProduct =
        productFilter === "All Products" ||
        subscription.productName === productFilter;

      const matchesPlan =
        planFilter === "All Plans" || subscription.planName === planFilter;

      const matchesBilling =
        billingFilter === "All Billing" ||
        subscription.billingCycle === billingFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProduct &&
        matchesPlan &&
        matchesBilling
      );
    });
  }, [
    subscriptions,
    searchTerm,
    statusFilter,
    productFilter,
    planFilter,
    billingFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubscriptions.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedSubscriptions = filteredSubscriptions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const activeSubscriptions = subscriptions.filter(
    (item) => item.status === "Active",
  ).length;

  const trialSubscriptions = subscriptions.filter(
    (item) => item.status === "Trial",
  ).length;

  const monthlyRecurringRevenue = subscriptions
    .filter(
      (item) =>
        ["Active", "Trial", "Past Due"].includes(item.status) &&
        item.monthlyPrice > 0,
    )
    .reduce((total, item) => total + item.monthlyPrice, 0);

  const totalSubscribers = subscriptions.filter(
    (item) => !["Cancelled"].includes(item.status),
  ).length;

  const openSubscription = (subscription, type) => {
    setSelectedSubscription(subscription);
    setOpenActionId(null);

    if (type === "details") setShowDetails(true);
    if (type === "pause") setShowPause(true);
    if (type === "cancel") setShowCancel(true);
    if (type === "reactivate") setShowReactivate(true);
    if (type === "payments") setShowPayments(true);
    if (type === "invoices") setShowInvoices(true);
  };

  const closeAllModals = () => {
    setShowDetails(false);
    setShowPause(false);
    setShowCancel(false);
    setShowReactivate(false);
    setShowPayments(false);
    setShowInvoices(false);
    setSelectedSubscription(null);
  };

  const updateSubscription = (id, changes) => {
    setSubscriptions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
              updatedDate: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
            }
          : item,
      ),
    );
  };

  const handlePause = (id, pauseData) => {
    updateSubscription(id, {
      status: "Paused",
      pausedUntil: pauseData.pausedUntil,
      autoRenew: pauseData.autoRenew,
    });

    closeAllModals();
  };

  const handleCancel = (id, cancelData) => {
    updateSubscription(id, {
      status: "Cancelled",
      autoRenew: false,
      cancelledAt: cancelData.cancelledAt,
      nextBillingDate: "-",
    });

    closeAllModals();
  };

  const handleReactivate = (id) => {
    updateSubscription(id, {
      status: "Active",
      cancelledAt: null,
      autoRenew: true,
    });

    closeAllModals();
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, productFilter, planFilter, billingFilter]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const getStatusClass = (status) => {
    const map = {
      Active: "sub-status-active",
      Trial: "sub-status-trial",
      "Past Due": "sub-status-pastdue",
      Paused: "sub-status-paused",
      Suspended: "sub-status-suspended",
      Cancelled: "sub-status-cancelled",
    };

    return map[status] || "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sub-action-wrapper")) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
    setProductFilter("All Products");
    setPlanFilter("All Plans");
    setBillingFilter("All Billing");
    setCurrentPage(1);
  };

  return (
    <div className="sub-page">
      {/* PAGE HEADER */}
      <div className="sub-page-header">
        <div>
          <div className="sub-breadcrumb">
            Marketplace <span>/</span> Subscriptions
          </div>

          <h1>Subscriptions</h1>

          <p>Manage customer subscriptions, plans, billing and access.</p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="sub-summary-grid">
        <div className="sub-summary-card">
          <div className="sub-summary-icon">
            <RiApps2Line />
          </div>
          <div>
            <span>Total Subscriptions</span>
            <strong>{subscriptions.length}</strong>
            <small>All customer subscriptions</small>
          </div>
        </div>

        <div className="sub-summary-card">
          <div className="sub-summary-icon">
            <RiRefreshLine />
          </div>
          <div>
            <span>Active</span>
            <strong>{activeSubscriptions}</strong>
            <small>Currently active subscriptions</small>
          </div>
        </div>

        <div className="sub-summary-card">
          <div className="sub-summary-icon">
            <RiMoneyRupeeCircleLine />
          </div>
          <div>
            <span>Monthly Recurring Revenue</span>
            <strong>{formatCurrency(monthlyRecurringRevenue)}</strong>
            <small>Current recurring revenue</small>
          </div>
        </div>

        <div className="sub-summary-card">
          <div className="sub-summary-icon">
            <RiBankCardLine />
          </div>
          <div>
            <span>Customers</span>
            <strong>{totalSubscribers}</strong>
            <small>{trialSubscriptions} currently on trial</small>
          </div>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="sub-table-card">
        {/* TOOLBAR */}
        <div className="sub-toolbar">
          <div className="sub-search-box">
            <RiSearchLine />
            <input
              type="text"
              placeholder="Search subscription, business, owner or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
                      {searchTerm && (
                        <button
                          type="button"
                          className="sub-search-clear"
                          onClick={() => setSearchTerm("")}
                        >
                          <RiCloseLine />
                        </button>
                      )}
          </div>

          <div className="sub-filter-group">
            <div className="sub-filter">
              <RiFilter3Line />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {STATUS_OPTIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="sub-filter">
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                {PRODUCT_OPTIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="sub-filter">
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
              >
                {PLAN_OPTIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="sub-filter">
              <select
                value={billingFilter}
                onChange={(e) => setBillingFilter(e.target.value)}
              >
                {BILLING_OPTIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            {(searchTerm ||
              statusFilter !== "All Status" ||
              productFilter !== "All Products" ||
              planFilter !== "All Plans" ||
              billingFilter !== "All Billing") && (
              <button
                type="button"
                className="sub-reset"
                onClick={handleResetFilters}
                title="Reset filters"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* RESULTS */}
        <div className="sub-results-bar">
          <span>
            <strong>{filteredSubscriptions.length}</strong> subscriptions found
          </span>

          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* DESKTOP TABLE */}
        <div className="sub-table-wrapper">
          <table className="sub-table">
            <thead>
              <tr>
                <th>SUBSCRIPTION</th>
                <th>BUSINESS</th>
                <th>PRODUCT / PLAN</th>
                <th>BILLING</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>RENEWAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {paginatedSubscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td>
                    <div className="sub-id-cell">
                      <strong>{subscription.id}</strong>
                      <small>Started {subscription.startDate}</small>
                    </div>
                  </td>

                  <td>
                    <div className="sub-business-cell">
                      <strong>{subscription.businessName}</strong>
                      <small>
                        {subscription.businessId} · {subscription.ownerName}
                      </small>
                    </div>
                  </td>

                  <td>
                    <div className="sub-product-cell">
                      <strong>{subscription.productName}</strong>
                      <span>{subscription.planName}</span>
                    </div>
                  </td>

                  <td>
                    <div className="sub-billing-cell">
                      <strong>{subscription.billingCycle}</strong>
                      <small>
                        {subscription.autoRenew
                          ? "Auto-renew ON"
                          : "Auto-renew OFF"}
                      </small>
                    </div>
                  </td>

                  <td>
                    <div className="sub-amount-cell">
                      <strong>
                        {formatCurrency(subscription.monthlyPrice)}
                      </strong>
                      <small>/month</small>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`sub-status ${getStatusClass(
                        subscription.status,
                      )}`}
                    >
                      <i />
                      {subscription.status}
                    </span>
                  </td>

                  <td>
                    <div className="sub-date-cell">
                      <RiCalendarLine />
                      <span>{subscription.renewalDate}</span>
                    </div>
                  </td>

                  <td>
                    <div className="sub-action-wrapper">
                      <button
                        className="sub-action-button"
                        onClick={() =>
                          setOpenActionId(
                            openActionId === subscription.id
                              ? null
                              : subscription.id,
                          )
                        }
                      >
                        <RiMore2Fill />
                      </button>

                      {openActionId === subscription.id && (
                        <div className="sub-action-menu">
                          <button
                            onClick={() =>
                              openSubscription(subscription, "details")
                            }
                          >
                            <RiEyeLine />
                            View Subscription
                          </button>
                          <button
                            onClick={() =>
                              openSubscription(subscription, "pause")
                            }
                            disabled={["Cancelled", "Paused"].includes(
                              subscription.status,
                            )}
                          >
                            <RiPauseCircleLine />
                            Pause Subscription
                          </button>

                          {subscription.status === "Cancelled" ? (
                            <button
                              onClick={() =>
                                openSubscription(subscription, "reactivate")
                              }
                            >
                              <RiRefreshLine />
                              Reactivate Subscription
                            </button>
                          ) : (
                            <button
                              className="sub-danger-menu-item"
                              onClick={() =>
                                openSubscription(subscription, "cancel")
                              }
                            >
                              <RiCloseCircleLine />
                              Cancel Subscription
                            </button>
                          )}

                          <div className="sub-menu-divider" />

                          <button
                            onClick={() =>
                              openSubscription(subscription, "payments")
                            }
                          >
                            <RiBankCardLine />
                            View Payments
                          </button>

                          <button
                            onClick={() =>
                              openSubscription(subscription, "invoices")
                            }
                          >
                            <RiFileList3Line />
                            View Invoices
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedSubscriptions.length === 0 && (
            <div className="sub-empty-state">No subscriptions found.</div>
          )}
        </div>

        {/* MOBILE */}
        <div className="sub-mobile-list">
          {paginatedSubscriptions.map((subscription) => (
            <div className="sub-mobile-card" key={subscription.id}>
              <div className="sub-mobile-top">
                <div>
                  <strong>{subscription.businessName}</strong>
                  <small>{subscription.id}</small>
                </div>

                <span
                  className={`sub-status ${getStatusClass(
                    subscription.status,
                  )}`}
                >
                  <i />
                  {subscription.status}
                </span>
              </div>

              <div className="sub-mobile-product">
                <strong>{subscription.productName}</strong>
                <span>{subscription.planName}</span>
              </div>

              <div className="sub-mobile-grid">
                <div>
                  <span>Owner</span>
                  <strong>{subscription.ownerName}</strong>
                </div>

                <div>
                  <span>Billing</span>
                  <strong>{subscription.billingCycle}</strong>
                </div>

                <div>
                  <span>Amount</span>
                  <strong>{formatCurrency(subscription.monthlyPrice)}</strong>
                </div>

                <div>
                  <span>Renewal</span>
                  <strong>{subscription.renewalDate}</strong>
                </div>
              </div>

              <button
                className="sub-mobile-view-button"
                onClick={() => openSubscription(subscription, "details")}
              >
                View Subscription
              </button>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="sub-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            <RiArrowLeftSLine />
            Previous
          </button>

          <div className="sub-page-numbers">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={currentPage === page ? "is-active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
          >
            Next
            <RiArrowRightSLine />
          </button>
        </div>
      </div>

      {/* MODALS */}

      <SubscriptionDetailsModal
        open={showDetails}
        subscription={selectedSubscription}
        onClose={closeAllModals}
      />

      <PauseSubscriptionModal
        open={showPause}
        subscription={selectedSubscription}
        onClose={closeAllModals}
        onSave={handlePause}
      />

      <CancelSubscriptionModal
        open={showCancel}
        subscription={selectedSubscription}
        onClose={closeAllModals}
        onConfirm={handleCancel}
      />

      <SubscriptionPaymentsModal
        open={showPayments}
        subscription={selectedSubscription}
        onClose={closeAllModals}
      />

      <SubscriptionInvoicesModal
        open={showInvoices}
        subscription={selectedSubscription}
        onClose={closeAllModals}
      />

      <ConfirmDialog
        open={showReactivate}
        title="Reactivate Subscription?"
        message={
          selectedSubscription
            ? `Are you sure you want to reactivate ${selectedSubscription.productName} for ${selectedSubscription.businessName}? The subscription will become active again.`
            : "Are you sure you want to reactivate this subscription?"
        }
        confirmLabel="Reactivate"
        tone="default"
        onConfirm={() =>
          selectedSubscription && handleReactivate(selectedSubscription.id)
        }
        onCancel={closeAllModals}
      />
    </div>
  );
}

export default Subscriptions;
