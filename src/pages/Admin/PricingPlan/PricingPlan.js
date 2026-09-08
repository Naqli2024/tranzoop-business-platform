import React, { useEffect, useMemo, useState } from "react";

import {
  RiAddLine,
  RiApps2Line,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiFilter3Line,
  RiFileCopyLine,
  RiMore2Fill,
  RiSearchLine,
  RiSettings3Line,
  RiToggleLine,
  RiUserLine,
  RiWallet3Line,
} from "react-icons/ri";

import PricingPlanFormModal from "./PricingPlanFormModal";
import PricingPlanDetailsModal from "./PricingPlanDetailsModal";
import "../../../assets/styles/adminPricing.css";
import ConfirmDialog from "../../../components/ConfirmDialog";

const ITEMS_PER_PAGE = 6;

const PRODUCTS = [
  {
    id: "PROD-1001",
    name: "Transport BOS",
    category: "Transport",
    icon: "🚛",
  },
  {
    id: "PROD-1002",
    name: "Tyre BOS",
    category: "Tyre",
    icon: "🛞",
  },
  {
    id: "PROD-1003",
    name: "Tailor BOS",
    category: "Tailoring",
    icon: "🧵",
  },
  {
    id: "PROD-1004",
    name: "Retail BOS",
    category: "Retail",
    icon: "🛒",
  },
  {
    id: "PROD-1005",
    name: "Salon BOS",
    category: "Salon",
    icon: "💇",
  },
  {
    id: "PROD-1006",
    name: "Restaurant BOS",
    category: "Restaurant",
    icon: "🍽️",
  },
];

const PLAN_STATUSES = ["Active", "Inactive", "Draft"];

const BILLING_TYPES = ["Recurring", "One Time"];

const DEFAULT_FEATURES = [
  "Dashboard",
  "Customer Management",
  "Reports",
  "User Management",
];

const DEFAULT_LIMITS = {
  users: 5,
  vehicles: 10,
  drivers: 10,
  tripsPerMonth: 250,
  storageGB: 5,
  apiCallsPerMonth: 10000,
};

const INITIAL_PLANS = [
  {
    id: "PLAN-1001",
    productId: "PROD-1001",
    productName: "Transport BOS",
    productCategory: "Transport",

    name: "Starter",
    slug: "transport-starter",
    description: "Essential tools for small transport businesses.",

    icon: "🚛",

    monthlyPrice: 999,
    yearlyPrice: 9990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 14,

    popular: false,

    features: [
      "Dashboard",
      "Fleet Management",
      "Customer Management",
      "Basic Reports",
    ],

    limits: {
      users: 3,
      vehicles: 10,
      drivers: 10,
      tripsPerMonth: 250,
      storageGB: 5,
      apiCallsPerMonth: 5000,
    },

    subscribers: 82,

    status: "Active",

    createdDate: "20 Aug 2026",
    updatedDate: "04 Sep 2026",
  },

  {
    id: "PLAN-1002",
    productId: "PROD-1001",
    productName: "Transport BOS",
    productCategory: "Transport",

    name: "Professional",
    slug: "transport-professional",
    description: "Advanced tools for growing transport companies.",

    icon: "🚛",

    monthlyPrice: 1999,
    yearlyPrice: 19990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 14,

    popular: true,

    features: [
      "Dashboard",
      "Fleet Management",
      "Trip Management",
      "Driver Management",
      "Customer Management",
      "Invoice Management",
      "Reports",
      "GPS Tracking",
      "API Access",
    ],

    limits: {
      users: 10,
      vehicles: 50,
      drivers: 50,
      tripsPerMonth: 1000,
      storageGB: 10,
      apiCallsPerMonth: 25000,
    },

    subscribers: 46,

    status: "Active",

    createdDate: "20 Aug 2026",
    updatedDate: "04 Sep 2026",
  },

  {
    id: "PLAN-1003",
    productId: "PROD-1001",
    productName: "Transport BOS",
    productCategory: "Transport",

    name: "Enterprise",
    slug: "transport-enterprise",
    description: "Complete transport management for large organizations.",

    icon: "🚛",

    monthlyPrice: 4999,
    yearlyPrice: 49990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 30,

    popular: false,

    features: [
      "Everything in Professional",
      "Advanced Analytics",
      "Multi Branch",
      "Role Management",
      "Priority Support",
      "Advanced API Access",
    ],

    limits: {
      users: 50,
      vehicles: 500,
      drivers: 500,
      tripsPerMonth: 10000,
      storageGB: 100,
      apiCallsPerMonth: 100000,
    },

    subscribers: 12,

    status: "Active",

    createdDate: "20 Aug 2026",
    updatedDate: "03 Sep 2026",
  },

  {
    id: "PLAN-2001",
    productId: "PROD-1002",
    productName: "Tyre BOS",
    productCategory: "Tyre",

    name: "Starter",
    slug: "tyre-starter",
    description: "Simple tyre shop management for small businesses.",

    icon: "🛞",

    monthlyPrice: 799,
    yearlyPrice: 7990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 14,

    popular: false,

    features: [
      "Dashboard",
      "Tyre Inventory",
      "Customer Management",
      "Basic Reports",
    ],

    limits: {
      users: 3,
      vehicles: 0,
      drivers: 0,
      tripsPerMonth: 0,
      storageGB: 5,
      apiCallsPerMonth: 5000,
    },

    subscribers: 65,

    status: "Active",

    createdDate: "18 Aug 2026",
    updatedDate: "02 Sep 2026",
  },

  {
    id: "PLAN-2002",
    productId: "PROD-1002",
    productName: "Tyre BOS",
    productCategory: "Tyre",

    name: "Professional",
    slug: "tyre-professional",
    description: "Complete tyre business management for growing stores.",

    icon: "🛞",

    monthlyPrice: 1499,
    yearlyPrice: 14990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 14,

    popular: true,

    features: [
      "Dashboard",
      "Tyre Inventory",
      "Purchase Management",
      "Sales Management",
      "Customer Management",
      "Supplier Management",
      "Reports",
    ],

    limits: {
      users: 10,
      vehicles: 0,
      drivers: 0,
      tripsPerMonth: 0,
      storageGB: 10,
      apiCallsPerMonth: 25000,
    },

    subscribers: 31,

    status: "Active",

    createdDate: "18 Aug 2026",
    updatedDate: "02 Sep 2026",
  },

  {
    id: "PLAN-3001",
    productId: "PROD-1003",
    productName: "Tailor BOS",
    productCategory: "Tailoring",

    name: "Starter",
    slug: "tailor-starter",
    description: "Essential tools for independent tailors.",

    icon: "🧵",

    monthlyPrice: 699,
    yearlyPrice: 6990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 7,

    popular: false,

    features: [
      "Dashboard",
      "Customer Management",
      "Job Cards",
      "Basic Reports",
    ],

    limits: {
      users: 2,
      vehicles: 0,
      drivers: 0,
      tripsPerMonth: 0,
      storageGB: 5,
      apiCallsPerMonth: 5000,
    },

    subscribers: 41,

    status: "Active",

    createdDate: "15 Aug 2026",
    updatedDate: "01 Sep 2026",
  },

  {
    id: "PLAN-3002",
    productId: "PROD-1003",
    productName: "Tailor BOS",
    productCategory: "Tailoring",

    name: "Professional",
    slug: "tailor-professional",
    description: "Advanced tailoring management for growing shops.",

    icon: "🧵",

    monthlyPrice: 1299,
    yearlyPrice: 12990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 14,

    popular: true,

    features: [
      "Dashboard",
      "Customer Management",
      "Job Cards",
      "Measurements",
      "Order Management",
      "Delivery Management",
      "Reports",
      "Staff Management",
    ],

    limits: {
      users: 8,
      vehicles: 0,
      drivers: 0,
      tripsPerMonth: 0,
      storageGB: 10,
      apiCallsPerMonth: 20000,
    },

    subscribers: 23,

    status: "Active",

    createdDate: "15 Aug 2026",
    updatedDate: "01 Sep 2026",
  },

  {
    id: "PLAN-4001",
    productId: "PROD-1004",
    productName: "Retail BOS",
    productCategory: "Retail",

    name: "Starter",
    slug: "retail-starter",
    description: "Basic retail business management.",

    icon: "🛒",

    monthlyPrice: 999,
    yearlyPrice: 9990,
    currency: "INR",

    billingType: "Recurring",

    trialEnabled: true,
    trialDays: 14,

    popular: false,

    features: DEFAULT_FEATURES,

    limits: {
      ...DEFAULT_LIMITS,
    },

    subscribers: 0,

    status: "Draft",

    createdDate: "28 Aug 2026",
    updatedDate: "28 Aug 2026",
  },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
};

const generateSlug = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getToday = () => {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getNextPlanId = (plans) => {
  const maxNumber = plans.reduce((max, plan) => {
    const number = Number(String(plan.id || "").replace("PLAN-", ""));

    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 0);

  return `PLAN-${String(maxNumber + 1).padStart(4, "0")}`;
};

const PricingPlan = () => {
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [searchTerm, setSearchTerm] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [billingFilter, setBillingFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState(null);
  const [showPlanFormModal, setShowPlanFormModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    plan: null,
  });

  const totalPlans = plans.length;

  const activePlans = plans.filter((plan) => plan.status === "Active").length;

  const productCount = new Set(plans.map((plan) => plan.productId)).size;

  const totalSubscribers = plans.reduce(
    (sum, plan) => sum + Number(plan.subscribers || 0),
    0,
  );

  const filteredPlans = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return plans.filter((plan) => {
      const matchesSearch =
        !search ||
        plan.name.toLowerCase().includes(search) ||
        plan.id.toLowerCase().includes(search) ||
        plan.slug.toLowerCase().includes(search) ||
        plan.productName.toLowerCase().includes(search) ||
        plan.description.toLowerCase().includes(search);

      const matchesProduct =
        productFilter === "All" || plan.productId === productFilter;

      const matchesStatus =
        statusFilter === "All" || plan.status === statusFilter;

      const matchesBilling =
        billingFilter === "All" || plan.billingType === billingFilter;

      return matchesSearch && matchesProduct && matchesStatus && matchesBilling;
    });
  }, [plans, searchTerm, productFilter, statusFilter, billingFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPlans.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedPlans = filteredPlans.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, productFilter, statusFilter, billingFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openAddPlanModal = () => {
    setEditingPlan(null);
    setShowPlanFormModal(true);
  };

  const openEditPlanModal = (plan) => {
    setEditingPlan(plan);
    setShowPlanFormModal(true);
    setOpenActionId(null);
  };

  const closePlanFormModal = () => {
    setShowPlanFormModal(false);
    setEditingPlan(null);
  };

  const openPlanDetails = (plan) => {
    setSelectedPlan(plan);
    setShowPlanDetailsModal(true);
    setOpenActionId(null);
  };

  const closePlanDetails = () => {
    setShowPlanDetailsModal(false);
    setSelectedPlan(null);
  };

  const handleSavePlan = (formData) => {
    if (editingPlan) {
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                ...formData,

                id: editingPlan.id,

                productId: formData.productId || editingPlan.productId,

                productName: formData.productName || editingPlan.productName,

                productCategory:
                  formData.productCategory || editingPlan.productCategory,

                subscribers: editingPlan.subscribers || 0,

                createdDate: editingPlan.createdDate,

                updatedDate: getToday(),
              }
            : plan,
        ),
      );
    } else {
      const selectedProduct = PRODUCTS.find(
        (product) => product.id === formData.productId,
      );

      const newPlan = {
        ...formData,

        id: getNextPlanId(plans),

        productName: selectedProduct?.name || formData.productName || "",

        productCategory:
          selectedProduct?.category || formData.productCategory || "",

        subscribers: 0,

        createdDate: getToday(),
        updatedDate: getToday(),
      };

      setPlans((prev) => [...prev, newPlan]);
    }

    setCurrentPage(1);
    closePlanFormModal();
  };

  const handleDuplicatePlan = (plan) => {
    const duplicate = {
      ...plan,

      id: getNextPlanId(plans),

      name: `${plan.name} Copy`,

      slug: `${generateSlug(plan.slug)}-copy`,

      status: "Draft",

      popular: false,

      subscribers: 0,

      createdDate: getToday(),

      updatedDate: getToday(),
    };

    setPlans((prev) => [...prev, duplicate]);

    setCurrentPage(1);

    setOpenActionId(null);
  };

  const openDeactivateConfirm = (plan) => {
    setConfirmDialog({
      open: true,
      type: plan.status === "Active" ? "deactivate" : "activate",
      plan,
    });

    setOpenActionId(null);
  };

  const openDeleteConfirm = (plan) => {
    setConfirmDialog({
      open: true,
      type: "delete",
      plan,
    });

    setOpenActionId(null);
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      type: null,
      plan: null,
    });
  };

  const handleConfirmAction = () => {
    const { type, plan } = confirmDialog;

    if (!plan) return;

    if (type === "delete") {
      if (Number(plan.subscribers || 0) > 0) {
        closeConfirmDialog();
        return;
      }

      setPlans((prev) => prev.filter((item) => item.id !== plan.id));
    }

    if (type === "deactivate") {
      setPlans((prev) =>
        prev.map((item) =>
          item.id === plan.id
            ? {
                ...item,
                status: "Inactive",
                updatedDate: getToday(),
              }
            : item,
        ),
      );
    }

    if (type === "activate") {
      setPlans((prev) =>
        prev.map((item) =>
          item.id === plan.id
            ? {
                ...item,
                status: "Active",
                updatedDate: getToday(),
              }
            : item,
        ),
      );
    }

    closeConfirmDialog();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setProductFilter("All");
    setStatusFilter("All");
    setBillingFilter("All");
    setCurrentPage(1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "pp-status-active";

      case "Inactive":
        return "pp-status-inactive";

      case "Draft":
        return "pp-status-draft";

      default:
        return "";
    }
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="pp-page" onClick={() => setOpenActionId(null)}>
      <div className="pp-header">
        <div className="pp-header-left">
          <div className="pp-breadcrumb">
            Marketplace <span>/</span> Pricing & Plans
          </div>
          <div className="pp-title-row">
            <div className="pp-title-icon">
              <RiWallet3Line />
            </div>

            <div>
              <h1>Pricing & Plans</h1>

              <p>
                Manage subscription plans, pricing, features and limits across
                all BOS products.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="pp-primary-btn"
          onClick={openAddPlanModal}
        >
          <RiAddLine />
          Create Plan
        </button>
      </div>

      <div className="pp-summary-grid">
        <div className="pp-summary-card">
          <div className="pp-summary-icon">
            <RiWallet3Line />
          </div>

          <div className="pp-summary-content">
            <span>Total Plans</span>
            <strong>{totalPlans}</strong>
            <small>All pricing plans</small>
          </div>
        </div>

        <div className="pp-summary-card">
          <div className="pp-summary-icon pp-summary-success">
            <RiCheckLine />
          </div>

          <div className="pp-summary-content">
            <span>Active Plans</span>
            <strong>{activePlans}</strong>
            <small>Currently available</small>
          </div>
        </div>

        <div className="pp-summary-card">
          <div className="pp-summary-icon pp-summary-blue">
            <RiApps2Line />
          </div>

          <div className="pp-summary-content">
            <span>Products</span>
            <strong>{productCount}</strong>
            <small>Products with plans</small>
          </div>
        </div>

        <div className="pp-summary-card">
          <div className="pp-summary-icon pp-summary-purple">
            <RiUserLine />
          </div>

          <div className="pp-summary-content">
            <span>Subscribers</span>
            <strong>{totalSubscribers}</strong>
            <small>Across all plans</small>
          </div>
        </div>
      </div>
      <div className="pp-table-card">
        <div className="pp-toolbar">
          <div className="pp-search-box">
            <RiSearchLine />

            <input
              type="text"
              placeholder="Search plans, products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                type="button"
                className="pp-search-clear"
                onClick={() => setSearchTerm("")}
              >
                <RiCloseCircleLine />
              </button>
            )}
          </div>

          <div className="pp-filter-group">
            <div className="pp-filter-select">
              <RiApps2Line />

              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value="All">All Products</option>

                {PRODUCTS.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              <RiArrowDownSLine />
            </div>

            <div className="pp-filter-select">
              <RiCalendarLine />

              <select
                value={billingFilter}
                onChange={(e) => setBillingFilter(e.target.value)}
              >
                <option value="All">All Billing</option>

                {BILLING_TYPES.map((billing) => (
                  <option key={billing} value={billing}>
                    {billing}
                  </option>
                ))}
              </select>

              <RiArrowDownSLine />
            </div>

            <div className="pp-filter-select">
              <RiFilter3Line />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>

                {PLAN_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <RiArrowDownSLine />
            </div>
            {(searchTerm ||
              billingFilter !== "All" ||
              productFilter !== "All" ||
              statusFilter !== "All") && (
              <button
                type="button"
                className="pp-reset-btn"
                onClick={handleClearFilters}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="pp-results-bar">
          <div className="pp-results-left">
            <strong>{filteredPlans.length}</strong>

            <span>{filteredPlans.length === 1 ? "plan" : "plans"} found</span>
          </div>

          <div className="pp-results-right">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="pp-table-wrapper">
          <table className="pp-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Product</th>
                <th>Price</th>
                <th>Billing</th>
                <th>Features</th>
                <th>Subscribers</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedPlans.length === 0 ? (
                <tr>
                  <td colSpan="9" className="pp-empty-cell">
                    <div className="pp-empty-state">
                      <div className="pp-empty-icon">
                        <RiSearchLine />
                      </div>

                      <h3>No plans found</h3>

                      <p>Try changing your search or filter criteria.</p>

                      <button type="button" onClick={handleClearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedPlans.map((plan) => (
                  <tr key={plan.id}>
                    {/* PLAN */}

                    <td>
                      <div className="pp-plan-cell">
                        <div className="pp-plan-icon">{plan.icon}</div>

                        <div className="pp-plan-info">
                          <div className="pp-plan-name-row">
                            <strong>{plan.name}</strong>

                            {plan.popular && (
                              <span className="pp-popular-badge">Popular</span>
                            )}
                          </div>

                          <span>{plan.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* PRODUCT */}

                    <td>
                      <div className="pp-product-cell">
                        <span className="pp-product-icon">
                          {PRODUCTS.find(
                            (product) => product.id === plan.productId,
                          )?.icon || "📦"}
                        </span>

                        <div>
                          <strong>{plan.productName}</strong>

                          <span>{plan.productCategory}</span>
                        </div>
                      </div>
                    </td>

                    {/* PRICE */}

                    <td>
                      <div className="pp-price-cell">
                        <strong>{formatCurrency(plan.monthlyPrice)}</strong>

                        <span>/ month</span>

                        {plan.yearlyPrice > 0 && (
                          <small>
                            {formatCurrency(plan.yearlyPrice)} / year
                          </small>
                        )}
                      </div>
                    </td>

                    {/* BILLING */}

                    <td>
                      <span className="pp-billing-badge">
                        {plan.billingType}
                      </span>
                    </td>

                    {/* FEATURES */}

                    <td>
                      <div className="pp-feature-count">
                        <RiCheckLine />

                        <span>{plan.features?.length || 0}</span>

                        <small>features</small>
                      </div>
                    </td>

                    {/* SUBSCRIBERS */}

                    <td>
                      <div className="pp-subscriber-cell">
                        <RiUserLine />

                        <strong>{plan.subscribers || 0}</strong>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`pp-status ${getStatusClass(plan.status)}`}
                      >
                        <i />

                        {plan.status}
                      </span>
                    </td>

                    {/* UPDATED */}

                    <td>
                      <div className="pp-date-cell">
                        <RiCalendarLine />

                        <span>{plan.updatedDate}</span>
                      </div>
                    </td>

                    {/* ACTION */}

                    <td>
                      <div
                        className="pp-action-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="pp-action-btn"
                          onClick={() =>
                            setOpenActionId(
                              openActionId === plan.id ? null : plan.id,
                            )
                          }
                        >
                          <RiMore2Fill />
                        </button>

                        {openActionId === plan.id && (
                          <div className="pp-action-menu">
                            <button
                              type="button"
                              onClick={() => openPlanDetails(plan)}
                            >
                              <RiEyeLine />
                              View Plan
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditPlanModal(plan)}
                            >
                              <RiEditLine />
                              Edit Plan
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditPlanModal(plan)}
                            >
                              <RiSettings3Line />
                              Manage Features
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDuplicatePlan(plan)}
                            >
                              <RiFileCopyLine />
                              Duplicate Plan
                            </button>

                            <div className="pp-action-divider" />

                            <button
                              type="button"
                              onClick={() => openDeactivateConfirm(plan)}
                            >
                              <RiToggleLine />

                              {plan.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                            <button
                              type="button"
                              className="pp-action-danger"
                              onClick={() => openDeleteConfirm(plan)}
                            >
                              <RiDeleteBinLine />
                              Delete Plan
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

        <div className="pp-mobile-list">
          {paginatedPlans.length === 0 ? (
            <div className="pp-mobile-empty">
              <div className="pp-empty-icon">
                <RiSearchLine />
              </div>

              <h3>No plans found</h3>

              <p>Try changing your search or filters.</p>

              <button type="button" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            paginatedPlans.map((plan) => (
              <div className="pp-mobile-card" key={plan.id}>
                <div className="pp-mobile-card-top">
                  <div className="pp-plan-cell">
                    <div className="pp-plan-icon">{plan.icon}</div>

                    <div className="pp-plan-info">
                      <div className="pp-plan-name-row">
                        <strong>{plan.name}</strong>

                        {plan.popular && (
                          <span className="pp-popular-badge">Popular</span>
                        )}
                      </div>

                      <span>{plan.id}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="pp-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      setOpenActionId(
                        openActionId === plan.id ? null : plan.id,
                      );
                    }}
                  >
                    <RiMore2Fill />
                  </button>
                </div>

                <div className="pp-mobile-product">
                  <span className="pp-product-icon">
                    {PRODUCTS.find((product) => product.id === plan.productId)
                      ?.icon || "📦"}
                  </span>

                  <div>
                    <strong>{plan.productName}</strong>

                    <span>{plan.productCategory}</span>
                  </div>
                </div>

                <div className="pp-mobile-price-row">
                  <div>
                    <span>Price</span>

                    <strong>{formatCurrency(plan.monthlyPrice)}</strong>

                    <small>/ month</small>
                  </div>

                  <div>
                    <span>Yearly</span>

                    <strong>{formatCurrency(plan.yearlyPrice)}</strong>
                  </div>
                </div>

                <div className="pp-mobile-meta">
                  <div>
                    <span>Billing</span>
                    <strong>{plan.billingType}</strong>
                  </div>

                  <div>
                    <span>Features</span>
                    <strong>{plan.features?.length || 0}</strong>
                  </div>

                  <div>
                    <span>Subscribers</span>
                    <strong>{plan.subscribers || 0}</strong>
                  </div>
                </div>

                <div className="pp-mobile-bottom">
                  <span className={`pp-status ${getStatusClass(plan.status)}`}>
                    <i />
                    {plan.status}
                  </span>

                  <span className="pp-mobile-date">{plan.updatedDate}</span>
                </div>

                {openActionId === plan.id && (
                  <div
                    className="pp-mobile-action-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button type="button" onClick={() => openPlanDetails(plan)}>
                      <RiEyeLine />
                      View Plan
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditPlanModal(plan)}
                    >
                      <RiEditLine />
                      Edit Plan
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditPlanModal(plan)}
                    >
                      <RiSettings3Line />
                      Manage Features
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicatePlan(plan)}
                    >
                      <RiFileCopyLine />
                      Duplicate Plan
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeactivateConfirm(plan)}
                    >
                      <RiToggleLine />

                      {plan.status === "Active" ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      type="button"
                      className="pp-action-danger"
                      onClick={() => openDeleteConfirm(plan)}
                    >
                      <RiDeleteBinLine />
                      Delete Plan
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {filteredPlans.length > 0 && (
          <div className="pp-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              <RiArrowLeftSLine />
              Previous
            </button>

            <div className="pp-page-numbers">
              {pageNumbers.map((page) => (
                <button
                  type="button"
                  key={page}
                  className={currentPage === page ? "pp-page-active" : ""}
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
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              Next
              <RiArrowRightSLine />
            </button>
          </div>
        )}
      </div>

      <PricingPlanFormModal
        open={showPlanFormModal}
        plan={editingPlan}
        products={PRODUCTS}
        onClose={closePlanFormModal}
        onSave={handleSavePlan}
      />

      <PricingPlanDetailsModal
        open={showPlanDetailsModal}
        plan={selectedPlan}
        onClose={closePlanDetails}
        onEdit={(plan) => {
          closePlanDetails();
          openEditPlanModal(plan);
        }}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        type={confirmDialog.type}
        plan={confirmDialog.plan}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirmDialog}
      />
    </div>
  );
};

export default PricingPlan;
