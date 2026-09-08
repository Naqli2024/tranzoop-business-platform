import React, { useEffect, useMemo, useState } from "react";
import {
  RiSearchLine,
  RiFilter3Line,
  RiRefreshLine,
  RiMore2Fill,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiEyeLine,
  RiKey2Line,
  RiLockLine,
  RiDeleteBinLine,
  RiEditLine,
  RiAddLine,
  RiServerLine,
  RiCloudLine,
  RiCpuLine,
  RiHardDrive3Line,
  RiDatabase2Line,
  RiTimerLine,
  RiErrorWarningLine,
  RiMoneyDollarCircleLine,
  RiCodeSSlashLine,
  RiBarChartBoxLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import "../../../assets/styles/adminApiUsage.css";

const ITEMS_PER_PAGE = 6;

/* =========================================================
   DEMO BUSINESS API USAGE
========================================================= */

const API_USAGE_DATA = [
  {
    id: "BUS-1001",
    businessName: "ABC Enterprises",
    owner: "Arun Kumar",
    product: "Transport BOS",
    apiRequests: 128450,
    googleMapsRequests: 18420,
    computeHours: 218,
    cpuUsage: 62,
    memoryUsage: 58,
    storageUsage: 84,
    networkUsage: 42,
    databaseOperations: 185000,
    avgLatency: 142,
    errorRate: 0.82,
    estimatedCost: 1842,
    status: "Healthy",
    lastActivity: "12 Aug 2026, 10:42 AM",
  },
  {
    id: "BUS-1002",
    businessName: "Sri Lakshmi Transport",
    owner: "Suresh Kumar",
    product: "Transport BOS",
    apiRequests: 94280,
    googleMapsRequests: 12180,
    computeHours: 164,
    cpuUsage: 48,
    memoryUsage: 44,
    storageUsage: 62,
    networkUsage: 31,
    databaseOperations: 124000,
    avgLatency: 128,
    errorRate: 0.42,
    estimatedCost: 1299,
    status: "Healthy",
    lastActivity: "12 Aug 2026, 09:18 AM",
  },
  {
    id: "BUS-1003",
    businessName: "Classic Tailors",
    owner: "Ramesh B",
    product: "Tailor BOS",
    apiRequests: 32450,
    googleMapsRequests: 4200,
    computeHours: 92,
    cpuUsage: 35,
    memoryUsage: 32,
    storageUsage: 38,
    networkUsage: 14,
    databaseOperations: 68000,
    avgLatency: 116,
    errorRate: 0.21,
    estimatedCost: 799,
    status: "Healthy",
    lastActivity: "11 Aug 2026, 06:32 PM",
  },
  {
    id: "BUS-1004",
    businessName: "Raj Tyres & Wheels",
    owner: "Rajesh M",
    product: "Tyre BOS",
    apiRequests: 76840,
    googleMapsRequests: 8920,
    computeHours: 142,
    cpuUsage: 55,
    memoryUsage: 49,
    storageUsage: 72,
    networkUsage: 28,
    databaseOperations: 108000,
    avgLatency: 164,
    errorRate: 1.34,
    estimatedCost: 1149,
    status: "Warning",
    lastActivity: "11 Aug 2026, 04:20 PM",
  },
  {
    id: "BUS-1005",
    businessName: "South India Logistics",
    owner: "Vijay Anand",
    product: "Transport BOS",
    apiRequests: 185620,
    googleMapsRequests: 28450,
    computeHours: 284,
    cpuUsage: 78,
    memoryUsage: 72,
    storageUsage: 91,
    networkUsage: 64,
    databaseOperations: 264000,
    avgLatency: 198,
    errorRate: 2.18,
    estimatedCost: 2499,
    status: "High Usage",
    lastActivity: "11 Aug 2026, 02:12 PM",
  },
  {
    id: "BUS-1006",
    businessName: "Fashion Point",
    owner: "Priya S",
    product: "Tailor BOS",
    apiRequests: 18420,
    googleMapsRequests: 2200,
    computeHours: 48,
    cpuUsage: 22,
    memoryUsage: 26,
    storageUsage: 24,
    networkUsage: 9,
    databaseOperations: 32000,
    avgLatency: 102,
    errorRate: 0.11,
    estimatedCost: 399,
    status: "Healthy",
    lastActivity: "10 Aug 2026, 08:52 PM",
  },
  {
    id: "BUS-1007",
    businessName: "Metro Auto Care",
    owner: "Karthik R",
    product: "Tyre BOS",
    apiRequests: 62890,
    googleMapsRequests: 7680,
    computeHours: 126,
    cpuUsage: 46,
    memoryUsage: 41,
    storageUsage: 54,
    networkUsage: 22,
    databaseOperations: 92000,
    avgLatency: 139,
    errorRate: 0.67,
    estimatedCost: 999,
    status: "Healthy",
    lastActivity: "10 Aug 2026, 05:32 PM",
  },
  {
    id: "BUS-1008",
    businessName: "Chennai Fashion Hub",
    owner: "Mohan Kumar",
    product: "Tailor BOS",
    apiRequests: 44280,
    googleMapsRequests: 3820,
    computeHours: 78,
    cpuUsage: 39,
    memoryUsage: 36,
    storageUsage: 43,
    networkUsage: 17,
    databaseOperations: 71000,
    avgLatency: 121,
    errorRate: 0.36,
    estimatedCost: 699,
    status: "Healthy",
    lastActivity: "09 Aug 2026, 04:11 PM",
  },
  {
    id: "BUS-1009",
    businessName: "Kumar Logistics",
    owner: "Kumar S",
    product: "Transport BOS",
    apiRequests: 112340,
    googleMapsRequests: 15420,
    computeHours: 196,
    cpuUsage: 64,
    memoryUsage: 61,
    storageUsage: 76,
    networkUsage: 39,
    databaseOperations: 156000,
    avgLatency: 151,
    errorRate: 1.02,
    estimatedCost: 1599,
    status: "Warning",
    lastActivity: "09 Aug 2026, 11:42 AM",
  },
  {
    id: "BUS-1010",
    businessName: "Chennai Tyres",
    owner: "Prakash V",
    product: "Tyre BOS",
    apiRequests: 28420,
    googleMapsRequests: 3120,
    computeHours: 66,
    cpuUsage: 31,
    memoryUsage: 28,
    storageUsage: 35,
    networkUsage: 11,
    databaseOperations: 44000,
    avgLatency: 110,
    errorRate: 0.18,
    estimatedCost: 599,
    status: "Healthy",
    lastActivity: "08 Aug 2026, 06:20 PM",
  },
];

/* =========================================================
   API KEYS
========================================================= */

const API_KEYS_DATA = [
  {
    id: "KEY-1001",
    businessId: "BUS-1001",
    businessName: "ABC Enterprises",
    name: "Production API",
    prefix: "trz_live_8F2",
    environment: "Production",
    requests: 82450,
    created: "12 Jan 2026",
    lastUsed: "12 Aug 2026, 10:42 AM",
    status: "Active",
  },
  {
    id: "KEY-1002",
    businessId: "BUS-1002",
    businessName: "Sri Lakshmi Transport",
    name: "Transport Mobile App",
    prefix: "trz_live_4K9",
    environment: "Production",
    requests: 62480,
    created: "18 Jan 2026",
    lastUsed: "12 Aug 2026, 09:18 AM",
    status: "Active",
  },
  {
    id: "KEY-1003",
    businessId: "BUS-1003",
    businessName: "Classic Tailors",
    name: "Tailor Dashboard",
    prefix: "trz_live_7P3",
    environment: "Production",
    requests: 21840,
    created: "21 Feb 2026",
    lastUsed: "11 Aug 2026, 06:32 PM",
    status: "Active",
  },
  {
    id: "KEY-1004",
    businessId: "BUS-1004",
    businessName: "Raj Tyres & Wheels",
    name: "Main Application",
    prefix: "trz_live_2D8",
    environment: "Production",
    requests: 48220,
    created: "24 Feb 2026",
    lastUsed: "11 Aug 2026, 04:20 PM",
    status: "Active",
  },
  {
    id: "KEY-1005",
    businessId: "BUS-1005",
    businessName: "South India Logistics",
    name: "Logistics API",
    prefix: "trz_live_9M1",
    environment: "Production",
    requests: 124620,
    created: "27 Feb 2026",
    lastUsed: "11 Aug 2026, 02:12 PM",
    status: "Active",
  },
  {
    id: "KEY-1006",
    businessId: "BUS-1006",
    businessName: "Fashion Point",
    name: "Mobile API",
    prefix: "trz_live_3X5",
    environment: "Production",
    requests: 11420,
    created: "02 Mar 2026",
    lastUsed: "10 Aug 2026, 08:52 PM",
    status: "Active",
  },
  {
    id: "KEY-1007",
    businessId: "BUS-1007",
    businessName: "Metro Auto Care",
    name: "Garage API",
    prefix: "trz_live_6R4",
    environment: "Production",
    requests: 42890,
    created: "05 Mar 2026",
    lastUsed: "10 Aug 2026, 05:32 PM",
    status: "Active",
  },
  {
    id: "KEY-1008",
    businessId: "BUS-1008",
    businessName: "Chennai Fashion Hub",
    name: "Production API",
    prefix: "trz_live_5B7",
    environment: "Production",
    requests: 28240,
    created: "08 Mar 2026",
    lastUsed: "09 Aug 2026, 04:11 PM",
    status: "Active",
  },
  {
    id: "KEY-1009",
    businessId: "BUS-1009",
    businessName: "Kumar Logistics",
    name: "ERP Integration",
    prefix: "trz_live_1N6",
    environment: "Production",
    requests: 76220,
    created: "12 Mar 2026",
    lastUsed: "09 Aug 2026, 11:42 AM",
    status: "Active",
  },
  {
    id: "KEY-1010",
    businessId: "BUS-1010",
    businessName: "Chennai Tyres",
    name: "Tyre BOS API",
    prefix: "trz_live_4Q2",
    environment: "Production",
    requests: 18420,
    created: "15 Mar 2026",
    lastUsed: "08 Aug 2026, 06:20 PM",
    status: "Revoked",
  },
];

/* =========================================================
   QUOTAS
========================================================= */

const QUOTAS_DATA = [
  {
    id: "QUOTA-1001",
    businessId: "BUS-1001",
    businessName: "ABC Enterprises",
    metric: "API Requests",
    category: "API",
    currentUsage: 128450,
    quota: 200000,
    unit: "requests / month",
    reset: "01 Sep 2026",
    status: "Healthy",
  },
  {
    id: "QUOTA-1002",
    businessId: "BUS-1001",
    businessName: "ABC Enterprises",
    metric: "Google Maps",
    category: "Maps",
    currentUsage: 18420,
    quota: 30000,
    unit: "requests / month",
    reset: "01 Sep 2026",
    status: "Healthy",
  },
  {
    id: "QUOTA-1003",
    businessId: "BUS-1002",
    businessName: "Sri Lakshmi Transport",
    metric: "API Requests",
    category: "API",
    currentUsage: 94280,
    quota: 120000,
    unit: "requests / month",
    reset: "01 Sep 2026",
    status: "Healthy",
  },
  {
    id: "QUOTA-1004",
    businessId: "BUS-1003",
    businessName: "Classic Tailors",
    metric: "Storage",
    category: "Cloud",
    currentUsage: 38,
    quota: 50,
    unit: "GB",
    reset: "01 Sep 2026",
    status: "Healthy",
  },
  {
    id: "QUOTA-1005",
    businessId: "BUS-1004",
    businessName: "Raj Tyres & Wheels",
    metric: "API Requests",
    category: "API",
    currentUsage: 76840,
    quota: 90000,
    unit: "requests / month",
    reset: "01 Sep 2026",
    status: "Warning",
  },
  {
    id: "QUOTA-1006",
    businessId: "BUS-1005",
    businessName: "South India Logistics",
    metric: "API Requests",
    category: "API",
    currentUsage: 185620,
    quota: 200000,
    unit: "requests / month",
    reset: "01 Sep 2026",
    status: "Critical",
  },
  {
    id: "QUOTA-1007",
    businessId: "BUS-1005",
    businessName: "South India Logistics",
    metric: "Compute Hours",
    category: "Compute",
    currentUsage: 284,
    quota: 350,
    unit: "hours / month",
    reset: "01 Sep 2026",
    status: "Warning",
  },
  {
    id: "QUOTA-1008",
    businessId: "BUS-1006",
    businessName: "Fashion Point",
    metric: "API Requests",
    category: "API",
    currentUsage: 18420,
    quota: 50000,
    unit: "requests / month",
    reset: "01 Sep 2026",
    status: "Healthy",
  },
  {
    id: "QUOTA-1009",
    businessId: "BUS-1007",
    businessName: "Metro Auto Care",
    metric: "Database Operations",
    category: "Database",
    currentUsage: 92000,
    quota: 150000,
    unit: "operations / month",
    reset: "01 Sep 2026",
    status: "Healthy",
  },
  {
    id: "QUOTA-1010",
    businessId: "BUS-1009",
    businessName: "Kumar Logistics",
    metric: "Network",
    category: "Network",
    currentUsage: 39,
    quota: 50,
    unit: "GB / month",
    reset: "01 Sep 2026",
    status: "Warning",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const APIUsage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("usage");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [businessFilter, setBusinessFilter] = useState("All");

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const [openActionId, setOpenActionId] = useState(null);

  /* Separate pagination state for EVERY tab */
  const [usagePage, setUsagePage] = useState(1);
  const [keysPage, setKeysPage] = useState(1);
  const [quotasPage, setQuotasPage] = useState(1);

  /* =========================================================
     OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".ap-action-wrapper")) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =========================================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================================= */

  useEffect(() => {
    setUsagePage(1);
    setKeysPage(1);
    setQuotasPage(1);
  }, [searchTerm, statusFilter, businessFilter, activeTab]);

  /* =========================================================
     BUSINESS OPTIONS
  ========================================================= */

  const businessOptions = useMemo(() => {
    return [
      "All",
      ...new Set(API_USAGE_DATA.map((item) => item.businessName)),
    ];
  }, []);

  /* =========================================================
     FILTER API USAGE
  ========================================================= */

  const filteredUsage = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return API_USAGE_DATA.filter((item) => {
      const matchesSearch =
        !search ||
        item.businessName.toLowerCase().includes(search) ||
        item.owner.toLowerCase().includes(search) ||
        item.product.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesBusiness =
        businessFilter === "All" || item.businessName === businessFilter;

      return matchesSearch && matchesStatus && matchesBusiness;
    });
  }, [searchTerm, statusFilter, businessFilter]);

  /* =========================================================
     FILTER API KEYS
  ========================================================= */

  const filteredKeys = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return API_KEYS_DATA.filter((item) => {
      const matchesSearch =
        !search ||
        item.businessName.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        item.prefix.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesBusiness =
        businessFilter === "All" || item.businessName === businessFilter;

      return matchesSearch && matchesStatus && matchesBusiness;
    });
  }, [searchTerm, statusFilter, businessFilter]);

  /* =========================================================
     FILTER QUOTAS
  ========================================================= */

  const filteredQuotas = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return QUOTAS_DATA.filter((item) => {
      const matchesSearch =
        !search ||
        item.businessName.toLowerCase().includes(search) ||
        item.metric.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesBusiness =
        businessFilter === "All" || item.businessName === businessFilter;

      return matchesSearch && matchesStatus && matchesBusiness;
    });
  }, [searchTerm, statusFilter, businessFilter]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const usageTotalPages = Math.max(
    1,
    Math.ceil(filteredUsage.length / ITEMS_PER_PAGE)
  );

  const keysTotalPages = Math.max(
    1,
    Math.ceil(filteredKeys.length / ITEMS_PER_PAGE)
  );

  const quotasTotalPages = Math.max(
    1,
    Math.ceil(filteredQuotas.length / ITEMS_PER_PAGE)
  );

  const paginatedUsage = filteredUsage.slice(
    (usagePage - 1) * ITEMS_PER_PAGE,
    usagePage * ITEMS_PER_PAGE
  );

  const paginatedKeys = filteredKeys.slice(
    (keysPage - 1) * ITEMS_PER_PAGE,
    keysPage * ITEMS_PER_PAGE
  );

  const paginatedQuotas = filteredQuotas.slice(
    (quotasPage - 1) * ITEMS_PER_PAGE,
    quotasPage * ITEMS_PER_PAGE
  );

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalRequests = API_USAGE_DATA.reduce(
    (sum, item) => sum + item.apiRequests,
    0
  );

  const totalCost = API_USAGE_DATA.reduce(
    (sum, item) => sum + item.estimatedCost,
    0
  );

  const averageLatency =
    API_USAGE_DATA.reduce((sum, item) => sum + item.avgLatency, 0) /
    API_USAGE_DATA.length;

  const averageErrorRate =
    API_USAGE_DATA.reduce((sum, item) => sum + item.errorRate, 0) /
    API_USAGE_DATA.length;

  /* =========================================================
     RESET
  ========================================================= */

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setBusinessFilter("All");

    setUsagePage(1);
    setKeysPage(1);
    setQuotasPage(1);
  };

  /* =========================================================
     BUSINESS USAGE
  ========================================================= */

  const handleViewUsage = (business) => {
    setSelectedBusiness(business);
    setOpenActionId(null);
  };

  const handleBackToUsage = () => {
    setSelectedBusiness(null);
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleViewBusiness = (business) => {
    navigate(
      `/admin/businesses?businessId=${encodeURIComponent(business.id)}`
    );
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusClass = (status) => {
    const map = {
      Healthy: "ap-status-healthy",
      Warning: "ap-status-warning",
      "High Usage": "ap-status-high",
      Critical: "ap-status-critical",
      Active: "ap-status-healthy",
      Revoked: "ap-status-critical",
    };

    return map[status] || "ap-status-neutral";
  };

  /* =========================================================
     PAGINATION COMPONENT
  ========================================================= */

  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
  }) => {
    if (totalItems === 0) {
      return null;
    }

    const pages = [];

    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }

    return (
      <div className="ap-pagination">
        <button
          type="button"
          className="ap-pagination-prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <RiArrowLeftLine />
          <span>Previous</span>
        </button>

        <div className="ap-pagination-pages">
          {pages.map((page) => (
            <button
              type="button"
              key={page}
              className={`ap-page-number ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="ap-pagination-next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span>Next</span>
          <RiArrowRightLine />
        </button>
      </div>
    );
  };

  /* =========================================================
     TOOLBAR
  ========================================================= */

  const Toolbar = () => {
    let totalCount = filteredUsage.length;

    if (activeTab === "keys") {
      totalCount = filteredKeys.length;
    }

    if (activeTab === "quotas") {
      totalCount = filteredQuotas.length;
    }

    return (
      <div className="ap-toolbar">
        <div className="ap-toolbar-left">
          <div className="ap-search">
            <RiSearchLine />
            <input
              type="text"
              placeholder={
                activeTab === "usage"
                  ? "Search business, owner or ID..."
                  : activeTab === "keys"
                  ? "Search key, business or ID..."
                  : "Search quota, business or metric..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="ap-toolbar-right">
          <div className="ap-filter">
            <RiFilter3Line />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              {activeTab === "usage" && (
                <>
                  <option value="Healthy">Healthy</option>
                  <option value="Warning">Warning</option>
                  <option value="High Usage">High Usage</option>
                </>
              )}

              {activeTab === "keys" && (
                <>
                  <option value="Active">Active</option>
                  <option value="Revoked">Revoked</option>
                </>
              )}

              {activeTab === "quotas" && (
                <>
                  <option value="Healthy">Healthy</option>
                  <option value="Warning">Warning</option>
                  <option value="Critical">Critical</option>
                </>
              )}
            </select>
          </div>

          <div className="ap-filter">
            <select
              value={businessFilter}
              onChange={(e) => setBusinessFilter(e.target.value)}
            >
              {businessOptions.map((business) => (
                <option value={business} key={business}>
                  {business === "All" ? "All Businesses" : business}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm ||
            statusFilter !== "All" ||
            businessFilter !== "All") && (
            <button
              type="button"
              className="ap-reset-button"
              onClick={handleResetFilters}
              title="Reset filters"
            >
              <RiRefreshLine />
              <span>Reset</span>
            </button>
          )}

          <div className="ap-result-count">
            <strong>{totalCount}</strong>
            <span>
              {activeTab === "keys"
                ? "keys found"
                : activeTab === "quotas"
                ? "quotas found"
                : "businesses found"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  /* =========================================================
     BUSINESS DETAIL VIEW
  ========================================================= */

  if (selectedBusiness) {
    return (
      <div className="ap-page">
        <div className="ap-detail-header">
          <button
            type="button"
            className="ap-back-button"
            onClick={handleBackToUsage}
          >
            <RiArrowLeftSLine />
            Back to API Usage
          </button>

          <div className="ap-detail-title-row">
            <div>
              <div className="ap-detail-eyebrow">BUSINESS API USAGE</div>

              <h1>{selectedBusiness.businessName}</h1>

              <p>
                {selectedBusiness.id} · {selectedBusiness.owner} ·{" "}
                {selectedBusiness.product}
              </p>
            </div>

            <button
              type="button"
              className="ap-secondary-button"
              onClick={() => handleViewBusiness(selectedBusiness)}
            >
              <RiEyeLine />
              View Business
            </button>
          </div>
        </div>

        <div className="ap-detail-summary">
          <div className="ap-detail-card">
            <div className="ap-detail-card-icon">
              <RiCodeSSlashLine />
            </div>

            <div>
              <span>Total API Requests</span>
              <strong>
                {selectedBusiness.apiRequests.toLocaleString()}
              </strong>
              <small>This month</small>
            </div>
          </div>

          <div className="ap-detail-card">
            <div className="ap-detail-card-icon">
              <RiMoneyDollarCircleLine />
            </div>

            <div>
              <span>Estimated Cost</span>
              <strong>₹{selectedBusiness.estimatedCost}</strong>
              <small>Current month</small>
            </div>
          </div>

          <div className="ap-detail-card">
            <div className="ap-detail-card-icon">
              <RiTimerLine />
            </div>

            <div>
              <span>Average Latency</span>
              <strong>{selectedBusiness.avgLatency} ms</strong>
              <small>API requests</small>
            </div>
          </div>

          <div className="ap-detail-card">
            <div className="ap-detail-card-icon">
              <RiErrorWarningLine />
            </div>

            <div>
              <span>Error Rate</span>
              <strong>{selectedBusiness.errorRate}%</strong>
              <small>Last 30 days</small>
            </div>
          </div>
        </div>

        <div className="ap-detail-grid">
          <div className="ap-detail-panel">
            <div className="ap-panel-heading">
              <div>
                <h3>API Services</h3>
                <p>Monthly API consumption</p>
              </div>
            </div>

            <div className="ap-usage-list">
              <div className="ap-usage-row">
                <div className="ap-usage-label">
                  <RiCodeSSlashLine />
                  <div>
                    <strong>API Requests</strong>
                    <span>Application API calls</span>
                  </div>
                </div>

                <strong>
                  {selectedBusiness.apiRequests.toLocaleString()}
                </strong>
              </div>

              <div className="ap-usage-row">
                <div className="ap-usage-label">
                  <RiCloudLine />
                  <div>
                    <strong>Google Maps</strong>
                    <span>Maps / Places / Directions</span>
                  </div>
                </div>

                <strong>
                  {selectedBusiness.googleMapsRequests.toLocaleString()}
                </strong>
              </div>

              <div className="ap-usage-row">
                <div className="ap-usage-label">
                  <RiDatabase2Line />
                  <div>
                    <strong>Database Operations</strong>
                    <span>Read / write operations</span>
                  </div>
                </div>

                <strong>
                  {selectedBusiness.databaseOperations.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          <div className="ap-detail-panel">
            <div className="ap-panel-heading">
              <div>
                <h3>Cloud Resources</h3>
                <p>Infrastructure consumption</p>
              </div>
            </div>

            <div className="ap-resource-list">
              <div className="ap-resource-row">
                <div className="ap-resource-icon">
                  <RiServerLine />
                </div>

                <div className="ap-resource-content">
                  <div>
                    <strong>Compute / VM</strong>
                    <span>{selectedBusiness.computeHours} hours</span>
                  </div>

                  <div className="ap-progress">
                    <span
                      style={{
                        width: `${selectedBusiness.cpuUsage}%`,
                      }}
                    />
                  </div>

                  <small>
                    CPU utilization {selectedBusiness.cpuUsage}%
                  </small>
                </div>
              </div>

              <div className="ap-resource-row">
                <div className="ap-resource-icon">
                  <RiCpuLine />
                </div>

                <div className="ap-resource-content">
                  <div>
                    <strong>Memory</strong>
                    <span>{selectedBusiness.memoryUsage}% used</span>
                  </div>

                  <div className="ap-progress">
                    <span
                      style={{
                        width: `${selectedBusiness.memoryUsage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="ap-resource-row">
                <div className="ap-resource-icon">
                  <RiHardDrive3Line />
                </div>

                <div className="ap-resource-content">
                  <div>
                    <strong>Storage</strong>
                    <span>{selectedBusiness.storageUsage}% used</span>
                  </div>

                  <div className="ap-progress">
                    <span
                      style={{
                        width: `${selectedBusiness.storageUsage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="ap-resource-row">
                <div className="ap-resource-icon">
                  <RiCloudLine />
                </div>

                <div className="ap-resource-content">
                  <div>
                    <strong>Network</strong>
                    <span>{selectedBusiness.networkUsage} GB</span>
                  </div>

                  <div className="ap-progress">
                    <span
                      style={{
                        width: `${Math.min(
                          selectedBusiness.networkUsage * 1.5,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ap-detail-panel ap-detail-table-panel">
          <div className="ap-panel-heading">
            <div>
              <h3>Usage Information</h3>
              <p>Current API and infrastructure metrics</p>
            </div>

            <span
              className={`ap-status ${getStatusClass(
                selectedBusiness.status
              )}`}
            >
              <span />
              {selectedBusiness.status}
            </span>
          </div>

          <div className="ap-detail-metrics">
            <div>
              <span>Google Maps Requests</span>
              <strong>
                {selectedBusiness.googleMapsRequests.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Compute Hours</span>
              <strong>{selectedBusiness.computeHours} hrs</strong>
            </div>

            <div>
              <span>Storage</span>
              <strong>{selectedBusiness.storageUsage}%</strong>
            </div>

            <div>
              <span>Network</span>
              <strong>{selectedBusiness.networkUsage} GB</strong>
            </div>

            <div>
              <span>Database Operations</span>
              <strong>
                {selectedBusiness.databaseOperations.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Last Activity</span>
              <strong>{selectedBusiness.lastActivity}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <div className="ap-page">
      {/* PAGE HEADER */}

      <div className="ap-page-header">
        <div>
          <div className="ap-page-eyebrow">PLATFORM MONITORING</div>

          <h1>API Usage</h1>

          <p>
            Monitor API requests, cloud resources, API keys and usage quotas
            across all businesses.
          </p>
        </div>

        <button
          type="button"
          className="ap-primary-button"
          onClick={() => setActiveTab("keys")}
        >
          <RiAddLine />
          Manage API Keys
        </button>
      </div>

      {/* SUMMARY */}

      <div className="ap-summary-grid">
        <div className="ap-summary-card">
          <div className="ap-summary-icon">
            <RiCodeSSlashLine />
          </div>

          <div>
            <span>Total API Requests</span>
            <strong>{totalRequests.toLocaleString()}</strong>
            <small>Current month</small>
          </div>
        </div>

        <div className="ap-summary-card">
          <div className="ap-summary-icon">
            <RiMoneyDollarCircleLine />
          </div>

          <div>
            <span>Estimated API Cost</span>
            <strong>₹{totalCost.toLocaleString()}</strong>
            <small>Current month</small>
          </div>
        </div>

        <div className="ap-summary-card">
          <div className="ap-summary-icon">
            <RiTimerLine />
          </div>

          <div>
            <span>Average Latency</span>
            <strong>{Math.round(averageLatency)} ms</strong>
            <small>All businesses</small>
          </div>
        </div>

        <div className="ap-summary-card">
          <div className="ap-summary-icon">
            <RiErrorWarningLine />
          </div>

          <div>
            <span>Average Error Rate</span>
            <strong>{averageErrorRate.toFixed(2)}%</strong>
            <small>All businesses</small>
          </div>
        </div>
      </div>

      {/* TABS */}

      <div className="ap-tabs-wrapper">
        <div className="ap-tabs">
          <button
            type="button"
            className={`ap-tab ${activeTab === "usage" ? "active" : ""}`}
            onClick={() => setActiveTab("usage")}
          >
            <RiBarChartBoxLine />
            <span>API Usage</span>
          </button>

          <button
            type="button"
            className={`ap-tab ${activeTab === "keys" ? "active" : ""}`}
            onClick={() => setActiveTab("keys")}
          >
            <RiKey2Line />
            <span>API Keys</span>
          </button>

          <button
            type="button"
            className={`ap-tab ${activeTab === "quotas" ? "active" : ""}`}
            onClick={() => setActiveTab("quotas")}
          >
            <RiLockLine />
            <span>Quotas & Limits</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          API USAGE TAB
      ===================================================== */}

      {activeTab === "usage" && (
        <div className="ap-table-card">
          <Toolbar />

          <div className="ap-table-meta">
            <span>
              {filteredUsage.length} businesses found
            </span>

            <span>
              Page {usagePage} of {usageTotalPages}
            </span>
          </div>

          <div className="ap-table-wrapper">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>BUSINESS</th>
                  <th>PRODUCT</th>
                  <th>API REQUESTS</th>
                  <th>GOOGLE MAPS</th>
                  <th>CLOUD USAGE</th>
                  <th>ERROR RATE</th>
                  <th>EST. COST</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsage.length > 0 ? (
                  paginatedUsage.map((business) => (
                    <tr key={business.id}>
                      <td>
                        <div className="ap-primary-cell">
                          <strong>{business.businessName}</strong>
                          <small>
                            {business.id} · {business.owner}
                          </small>
                        </div>
                      </td>

                      <td>
                        <span className="ap-product-name">
                          {business.product}
                        </span>
                      </td>

                      <td>
                        <div className="ap-number-cell">
                          <strong>
                            {business.apiRequests.toLocaleString()}
                          </strong>
                          <small>requests</small>
                        </div>
                      </td>

                      <td>
                        <div className="ap-number-cell">
                          <strong>
                            {business.googleMapsRequests.toLocaleString()}
                          </strong>
                          <small>requests</small>
                        </div>
                      </td>

                      <td>
                        <div className="ap-cloud-cell">
                          <span>{business.computeHours} hrs</span>
                          <div className="ap-mini-progress">
                            <span
                              style={{
                                width: `${business.cpuUsage}%`,
                              }}
                            />
                          </div>
                          <small>{business.cpuUsage}% CPU</small>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            business.errorRate >= 1
                              ? "ap-error-high"
                              : "ap-error-normal"
                          }
                        >
                          {business.errorRate}%
                        </span>
                      </td>

                      <td>
                        <div className="ap-cost-cell">
                          <strong>
                            ₹{business.estimatedCost.toLocaleString()}
                          </strong>
                          <small>/month</small>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`ap-status ${getStatusClass(
                            business.status
                          )}`}
                        >
                          <span />
                          {business.status}
                        </span>
                      </td>

                      <td>
                        <div className="ap-action-wrapper">
                          <button
                            type="button"
                            className="ap-action-button"
                            onClick={() =>
                              setOpenActionId(
                                openActionId === business.id
                                  ? null
                                  : business.id
                              )
                            }
                          >
                            <RiMore2Fill />
                          </button>

                          {openActionId === business.id && (
                            <div className="ap-action-menu">
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewUsage(business)
                                }
                              >
                                <RiEyeLine />
                                View Usage
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleViewBusiness(business)
                                }
                              >
                                <RiServerLine />
                                View Business
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">
                      <div className="ap-empty-state">
                        <RiSearchLine />
                        <strong>No API usage found</strong>
                        <span>
                          Try changing your search or filters.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="ap-mobile-list">
            {paginatedUsage.map((business) => (
              <div className="ap-mobile-card" key={business.id}>
                <div className="ap-mobile-card-top">
                  <div>
                    <strong>{business.businessName}</strong>
                    <small>
                      {business.id} · {business.owner}
                    </small>
                  </div>

                  <span
                    className={`ap-status ${getStatusClass(
                      business.status
                    )}`}
                  >
                    <span />
                    {business.status}
                  </span>
                </div>

                <div className="ap-mobile-info-grid">
                  <div>
                    <span>Product</span>
                    <strong>{business.product}</strong>
                  </div>

                  <div>
                    <span>API Requests</span>
                    <strong>
                      {business.apiRequests.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Google Maps</span>
                    <strong>
                      {business.googleMapsRequests.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Cost</span>
                    <strong>
                      ₹{business.estimatedCost.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="ap-mobile-view-button"
                  onClick={() => handleViewUsage(business)}
                >
                  <RiEyeLine />
                  View Usage
                </button>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={usagePage}
            totalPages={usageTotalPages}
            onPageChange={setUsagePage}
            totalItems={filteredUsage.length}
          />
        </div>
      )}

      {/* =====================================================
          API KEYS TAB
      ===================================================== */}

      {activeTab === "keys" && (
        <div className="ap-table-card">
          <Toolbar />

          <div className="ap-table-meta">
            <span>{filteredKeys.length} API keys found</span>

            <span>
              Page {keysPage} of {keysTotalPages}
            </span>
          </div>

          <div className="ap-table-wrapper">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>API KEY</th>
                  <th>BUSINESS</th>
                  <th>ENVIRONMENT</th>
                  <th>REQUESTS</th>
                  <th>CREATED</th>
                  <th>LAST USED</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {paginatedKeys.length > 0 ? (
                  paginatedKeys.map((key) => (
                    <tr key={key.id}>
                      <td>
                        <div className="ap-primary-cell">
                          <strong>{key.name}</strong>
                          <small>
                            {key.id} · {key.prefix}••••••
                          </small>
                        </div>
                      </td>

                      <td>
                        <div className="ap-primary-cell">
                          <strong>{key.businessName}</strong>
                          <small>{key.businessId}</small>
                        </div>
                      </td>

                      <td>
                        <span className="ap-environment">
                          {key.environment}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {key.requests.toLocaleString()}
                        </strong>
                      </td>

                      <td>
                        <span className="ap-date">
                          {key.created}
                        </span>
                      </td>

                      <td>
                        <span className="ap-date">
                          {key.lastUsed}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`ap-status ${getStatusClass(
                            key.status
                          )}`}
                        >
                          <span />
                          {key.status}
                        </span>
                      </td>

                      <td>
                        <div className="ap-action-wrapper">
                          <button
                            type="button"
                            className="ap-action-button"
                            onClick={() =>
                              setOpenActionId(
                                openActionId === key.id
                                  ? null
                                  : key.id
                              )
                            }
                          >
                            <RiMore2Fill />
                          </button>

                          {openActionId === key.id && (
                            <div className="ap-action-menu">
                              <button type="button">
                                <RiEyeLine />
                                View Key
                              </button>

                              <button type="button">
                                <RiEditLine />
                                Edit Key
                              </button>

                              {key.status === "Active" && (
                                <button
                                  type="button"
                                  className="ap-danger-menu-item"
                                >
                                  <RiLockLine />
                                  Revoke Key
                                </button>
                              )}

                              {key.status === "Revoked" && (
                                <button
                                  type="button"
                                  className="ap-danger-menu-item"
                                >
                                  <RiDeleteBinLine />
                                  Delete Key
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="ap-empty-state">
                        <RiKey2Line />
                        <strong>No API keys found</strong>
                        <span>
                          Try changing your search or filters.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="ap-mobile-list">
            {paginatedKeys.map((key) => (
              <div className="ap-mobile-card" key={key.id}>
                <div className="ap-mobile-card-top">
                  <div>
                    <strong>{key.name}</strong>
                    <small>
                      {key.id} · {key.prefix}••••••
                    </small>
                  </div>

                  <span
                    className={`ap-status ${getStatusClass(
                      key.status
                    )}`}
                  >
                    <span />
                    {key.status}
                  </span>
                </div>

                <div className="ap-mobile-info-grid">
                  <div>
                    <span>Business</span>
                    <strong>{key.businessName}</strong>
                  </div>

                  <div>
                    <span>Requests</span>
                    <strong>
                      {key.requests.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Created</span>
                    <strong>{key.created}</strong>
                  </div>

                  <div>
                    <span>Environment</span>
                    <strong>{key.environment}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* IMPORTANT:
              API KEYS HAS ITS OWN PAGINATION
          */}

          <Pagination
            currentPage={keysPage}
            totalPages={keysTotalPages}
            onPageChange={setKeysPage}
            totalItems={filteredKeys.length}
          />
        </div>
      )}

      {/* =====================================================
          QUOTAS TAB
      ===================================================== */}

      {activeTab === "quotas" && (
        <div className="ap-table-card">
          <Toolbar />

          <div className="ap-table-meta">
            <span>{filteredQuotas.length} quotas found</span>

            <span>
              Page {quotasPage} of {quotasTotalPages}
            </span>
          </div>

          <div className="ap-table-wrapper">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>BUSINESS</th>
                  <th>METRIC</th>
                  <th>CATEGORY</th>
                  <th>CURRENT USAGE</th>
                  <th>QUOTA</th>
                  <th>USAGE</th>
                  <th>RESET</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {paginatedQuotas.length > 0 ? (
                  paginatedQuotas.map((quota) => {
                    const percentage = Math.min(
                      Math.round(
                        (quota.currentUsage / quota.quota) * 100
                      ),
                      100
                    );

                    return (
                      <tr key={quota.id}>
                        <td>
                          <div className="ap-primary-cell">
                            <strong>{quota.businessName}</strong>
                            <small>{quota.businessId}</small>
                          </div>
                        </td>

                        <td>
                          <div className="ap-primary-cell">
                            <strong>{quota.metric}</strong>
                            <small>{quota.id}</small>
                          </div>
                        </td>

                        <td>
                          <span className="ap-category">
                            {quota.category}
                          </span>
                        </td>

                        <td>
                          <div className="ap-number-cell">
                            <strong>
                              {quota.currentUsage.toLocaleString()}
                            </strong>
                            <small>{quota.unit}</small>
                          </div>
                        </td>

                        <td>
                          <div className="ap-number-cell">
                            <strong>
                              {quota.quota.toLocaleString()}
                            </strong>
                            <small>{quota.unit}</small>
                          </div>
                        </td>

                        <td className="ap-quota-usage-cell">
                          <div className="ap-quota-percent">
                            <strong>{percentage}%</strong>
                          </div>

                          <div className="ap-mini-progress">
                            <span
                              className={
                                percentage >= 90
                                  ? "critical"
                                  : percentage >= 75
                                  ? "warning"
                                  : ""
                              }
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                        </td>

                        <td>
                          <span className="ap-date">
                            {quota.reset}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`ap-status ${getStatusClass(
                              quota.status
                            )}`}
                          >
                            <span />
                            {quota.status}
                          </span>
                        </td>

                        <td>
                          <div className="ap-action-wrapper">
                            <button
                              type="button"
                              className="ap-action-button"
                              onClick={() =>
                                setOpenActionId(
                                  openActionId === quota.id
                                    ? null
                                    : quota.id
                                )
                              }
                            >
                              <RiMore2Fill />
                            </button>

                            {openActionId === quota.id && (
                              <div className="ap-action-menu">
                                <button type="button">
                                  <RiEyeLine />
                                  View Quota
                                </button>

                                <button type="button">
                                  <RiEditLine />
                                  Edit Limit
                                </button>

                                <button type="button">
                                  <RiRefreshLine />
                                  Reset Usage
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9">
                      <div className="ap-empty-state">
                        <RiLockLine />
                        <strong>No quotas found</strong>
                        <span>
                          Try changing your search or filters.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="ap-mobile-list">
            {paginatedQuotas.map((quota) => {
              const percentage = Math.min(
                Math.round(
                  (quota.currentUsage / quota.quota) * 100
                ),
                100
              );

              return (
                <div className="ap-mobile-card" key={quota.id}>
                  <div className="ap-mobile-card-top">
                    <div>
                      <strong>{quota.metric}</strong>
                      <small>
                        {quota.businessName} · {quota.businessId}
                      </small>
                    </div>

                    <span
                      className={`ap-status ${getStatusClass(
                        quota.status
                      )}`}
                    >
                      <span />
                      {quota.status}
                    </span>
                  </div>

                  <div className="ap-mobile-quota">
                    <div className="ap-mobile-quota-top">
                      <span>Usage</span>
                      <strong>{percentage}%</strong>
                    </div>

                    <div className="ap-progress">
                      <span
                        className={
                          percentage >= 90
                            ? "critical"
                            : percentage >= 75
                            ? "warning"
                            : ""
                        }
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="ap-mobile-info-grid">
                    <div>
                      <span>Current</span>
                      <strong>
                        {quota.currentUsage.toLocaleString()}
                      </strong>
                    </div>

                    <div>
                      <span>Quota</span>
                      <strong>
                        {quota.quota.toLocaleString()}
                      </strong>
                    </div>

                    <div>
                      <span>Category</span>
                      <strong>{quota.category}</strong>
                    </div>

                    <div>
                      <span>Reset</span>
                      <strong>{quota.reset}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* IMPORTANT:
              QUOTAS HAS ITS OWN PAGINATION
          */}

          <Pagination
            currentPage={quotasPage}
            totalPages={quotasTotalPages}
            onPageChange={setQuotasPage}
            totalItems={filteredQuotas.length}
          />
        </div>
      )}
    </div>
  );
};

export default APIUsage;