import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiSearchLine,
  RiFilter3Line,
  RiBuilding2Line,
  RiMore2Fill,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiCheckLine,
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMapPin2Line,
  RiCalendarLine,
  RiApps2Line,
} from "react-icons/ri";
import EditBusinessModal from "./EditBusinessModal";
import "../../../assets/styles/adminBusinesses.css";
import ConfirmDialog from "../../../components/ConfirmDialog";


export const MODULE_MAP = {
  "Transport BOS": [
    "Fleet Management",
    "Trip Management",
    "Driver Management",
    "Customer Management",
    "Billing & Payments",
    "Reports & Analytics",
  ],
  "Tyre BOS": [
    "Inventory & Stock",
    "Sales & Billing",
    "Service & Fitting",
    "Customer Management",
    "Purchase Orders",
    "Reports & Analytics",
  ],
  "Tailor BOS": [
    "Order Management",
    "Measurement Records",
    "Customer Management",
    "Billing & Payments",
    "Fabric & Inventory",
    "Reports & Analytics",
  ],
};

export const PLAN_PRICING = {
  "Transport BOS": { Free: 0, Standard: 999, Premium: 1999 },
  "Tyre BOS": { Free: 0, Standard: 799, Premium: 1599 },
  "Tailor BOS": { Free: 0, Standard: 699, Premium: 1399 },
};

const buildSubscriptions = (business) =>
  business.products.map((product, index) => {
    const plan = business.plans[index];
    return {
      product,
      plan,
      price: PLAN_PRICING[product]?.[plan] ?? 0,
      billingCycle: plan === "Free" ? "Trial" : "Monthly",
      startDate: business.joinedDate,
      renewalDate: business.renewalDate,
      status: business.status,
      modules: MODULE_MAP[product] ?? [],
    };
  });

const RAW_BUSINESSES = [
  {
    id: "BUS-1001",
    name: "ABC Enterprises",
    owner: "Arun Kumar",
    email: "arun@abcenterprises.com",
    phone: "+91 98765 43210",
    city: "Chennai",
    state: "Tamil Nadu",
    products: ["Transport BOS", "Tyre BOS"],
    plans: ["Premium", "Standard"],
    status: "Active",
    joinedDate: "12 Aug 2026",
    renewalDate: "12 Aug 2027",
    employees: 24,
  },
  {
    id: "BUS-1002",
    name: "Sri Lakshmi Transport",
    owner: "Suresh Kumar",
    email: "suresh@sltransport.com",
    phone: "+91 98421 12345",
    city: "Madurai",
    state: "Tamil Nadu",
    products: ["Transport BOS"],
    plans: ["Standard"],
    status: "Active",
    joinedDate: "18 Aug 2026",
    renewalDate: "18 Aug 2027",
    employees: 12,
  },
  {
    id: "BUS-1003",
    name: "Classic Tailors",
    owner: "Ramesh B",
    email: "ramesh@classictailors.com",
    phone: "+91 97890 45678",
    city: "Coimbatore",
    state: "Tamil Nadu",
    products: ["Tailor BOS"],
    plans: ["Premium"],
    status: "Active",
    joinedDate: "21 Aug 2026",
    renewalDate: "21 Aug 2027",
    employees: 8,
  },
  {
    id: "BUS-1004",
    name: "Raj Tyres & Wheels",
    owner: "Rajesh M",
    email: "rajesh@rajtyres.com",
    phone: "+91 98654 32109",
    city: "Trichy",
    state: "Tamil Nadu",
    products: ["Tyre BOS"],
    plans: ["Standard"],
    status: "Active",
    joinedDate: "24 Aug 2026",
    renewalDate: "24 Aug 2027",
    employees: 15,
  },
  {
    id: "BUS-1005",
    name: "South India Logistics",
    owner: "Vijay Anand",
    email: "vijay@silogistics.com",
    phone: "+91 99520 11223",
    city: "Bengaluru",
    state: "Karnataka",
    products: ["Transport BOS", "Tyre BOS"],
    plans: ["Premium", "Premium"],
    status: "Suspended",
    joinedDate: "27 Aug 2026",
    renewalDate: "27 Aug 2027",
    employees: 42,
  },
  {
    id: "BUS-1006",
    name: "Fashion Point",
    owner: "Priya S",
    email: "priya@fashionpoint.com",
    phone: "+91 98945 67890",
    city: "Salem",
    state: "Tamil Nadu",
    products: ["Tailor BOS"],
    plans: ["Free"],
    status: "Active",
    joinedDate: "29 Aug 2026",
    renewalDate: "-",
    employees: 5,
  },
  {
    id: "BUS-1007",
    name: "Metro Cargo Movers",
    owner: "Karthik R",
    email: "karthik@metrocargo.com",
    phone: "+91 98840 55667",
    city: "Chennai",
    state: "Tamil Nadu",
    products: ["Transport BOS"],
    plans: ["Premium"],
    status: "Pending",
    joinedDate: "01 Sep 2026",
    renewalDate: "-",
    employees: 18,
  },
  {
    id: "BUS-1008",
    name: "National Tyres",
    owner: "Mohan Das",
    email: "mohan@nationaltyres.com",
    phone: "+91 97654 33445",
    city: "Erode",
    state: "Tamil Nadu",
    products: ["Tyre BOS"],
    plans: ["Standard"],
    status: "Active",
    joinedDate: "02 Sep 2026",
    renewalDate: "02 Sep 2027",
    employees: 11,
  },
  {
    id: "BUS-1009",
    name: "Coastal Tyre Traders",
    owner: "Selvam K",
    email: "selvam@coastaltyre.com",
    phone: "+91 97654 22110",
    city: "Thoothukudi",
    state: "Tamil Nadu",
    products: ["Tyre BOS"],
    plans: ["Standard"],
    status: "Active",
    joinedDate: "03 Sep 2026",
    renewalDate: "03 Sep 2027",
    employees: 9,
  },
  {
    id: "BUS-1010",
    name: "Vikram Transport Co.",
    owner: "Vikram Singh",
    email: "vikram@vikramtransport.com",
    phone: "+91 96543 11009",
    city: "Chennai",
    state: "Tamil Nadu",
    products: ["Transport BOS"],
    plans: ["Premium"],
    status: "Active",
    joinedDate: "04 Sep 2026",
    renewalDate: "04 Sep 2027",
    employees: 31,
  },
  {
    id: "BUS-1011",
    name: "Nandhini Tailors",
    owner: "Nandhini R",
    email: "nandhini@nandhinitailors.com",
    phone: "+91 95432 88776",
    city: "Madurai",
    state: "Tamil Nadu",
    products: ["Tailor BOS"],
    plans: ["Free"],
    status: "Pending",
    joinedDate: "05 Sep 2026",
    renewalDate: "-",
    employees: 4,
  },
  {
    id: "BUS-1012",
    name: "SR Wheels & Tyres",
    owner: "Senthil R",
    email: "senthil@srwheels.com",
    phone: "+91 94321 55443",
    city: "Salem",
    state: "Tamil Nadu",
    products: ["Tyre BOS"],
    plans: ["Standard"],
    status: "Active",
    joinedDate: "06 Sep 2026",
    renewalDate: "06 Sep 2027",
    employees: 14,
  },
  {
    id: "BUS-1013",
    name: "Metro Fleet Services",
    owner: "Anand P",
    email: "anand@metrofleet.com",
    phone: "+91 93210 44332",
    city: "Bengaluru",
    state: "Karnataka",
    products: ["Transport BOS"],
    plans: ["Standard"],
    status: "Suspended",
    joinedDate: "07 Sep 2026",
    renewalDate: "07 Sep 2027",
    employees: 22,
  },
];

export const INITIAL_BUSINESSES = RAW_BUSINESSES.map((business) => ({
  ...business,
  subscriptions: buildSubscriptions(business),
}));

const ITEMS_PER_PAGE = 6;

const Businesses = () => {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  const [editingBusiness, setEditingBusiness] = useState(null);
  const [confirmState, setConfirmState] = useState(null); 

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        business.name.toLowerCase().includes(searchValue) ||
        business.owner.toLowerCase().includes(searchValue) ||
        business.email.toLowerCase().includes(searchValue) ||
        business.id.toLowerCase().includes(searchValue);

      const matchesStatus = statusFilter === "All" || business.status === statusFilter;

      const matchesProduct =
        productFilter === "All" || business.subscriptions.some((s) => s.product === productFilter);

      const matchesPlan =
        planFilter === "All" || business.subscriptions.some((s) => s.plan === planFilter);

      return matchesSearch && matchesStatus && matchesProduct && matchesPlan;
    });
  }, [businesses, search, statusFilter, productFilter, planFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBusinesses = filteredBusinesses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, productFilter, planFilter]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setProductFilter("All");
    setPlanFilter("All");
    setCurrentPage(1);
  };


  const viewDetails = (business) => {
    setOpenMenu(null);
    navigate(`/admin/businesses/${business.id}`);
  };

  const openEdit = (business) => {
    setOpenMenu(null);
    setEditingBusiness(business);
  };

  const saveEdit = (updated) => {
    setBusinesses((prev) => prev.map((b) => (b.id === updated.id ? { ...b, ...updated } : b)));
    setEditingBusiness(null);
  };

  const askToggleStatus = (business) => {
    setOpenMenu(null);
    setConfirmState({
      type: business.status === "Suspended" ? "activate" : "suspend",
      business,
    });
  };

  const askDelete = (business) => {
    setOpenMenu(null);
    setConfirmState({ type: "delete", business });
  };

  const handleConfirm = () => {
    if (!confirmState) return;
    const { type, business } = confirmState;

    if (type === "delete") {
      setBusinesses((prev) => prev.filter((b) => b.id !== business.id));
    } else {
      const nextStatus = type === "activate" ? "Active" : "Suspended";
      setBusinesses((prev) =>
        prev.map((b) => (b.id === business.id ? { ...b, status: nextStatus } : b))
      );
    }
    setConfirmState(null);
  };

  return (
    <div className="businesses-page">
      <div className="businesses-page-header">
        <div>
          <div className="businesses-breadcrumb">
            Marketplace <span>/</span> Businesses
          </div>

          <div className="businesses-title-row">
            <div className="businesses-title-icon">
              <RiBuilding2Line />
            </div>

            <div>
              <h1>Businesses</h1>
              <p>Manage businesses, subscriptions and BOS access across TRANZOOP Marketplace.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="businesses-summary-grid">
        <div className="businesses-summary-card">
          <div className="businesses-summary-icon">
            <RiBuilding2Line />
          </div>
          <div>
            <span>Total Businesses</span>
            <strong>{businesses.length}</strong>
            <small>All registered businesses</small>
          </div>
        </div>

        <div className="businesses-summary-card">
          <div className="businesses-summary-icon businesses-summary-green">
            <RiCheckLine />
          </div>
          <div>
            <span>Active Businesses</span>
            <strong>{businesses.filter((item) => item.status === "Active").length}</strong>
            <small>Currently active</small>
          </div>
        </div>

        <div className="businesses-summary-card">
          <div className="businesses-summary-icon businesses-summary-orange">
            <RiPauseCircleLine />
          </div>
          <div>
            <span>Suspended</span>
            <strong>{businesses.filter((item) => item.status === "Suspended").length}</strong>
            <small>Require attention</small>
          </div>
        </div>

        <div className="businesses-summary-card">
          <div className="businesses-summary-icon businesses-summary-purple">
            <RiApps2Line />
          </div>
          <div>
            <span>BOS Subscriptions</span>
            <strong>{businesses.reduce((total, item) => total + item.subscriptions.length, 0)}</strong>
            <small>Across all businesses</small>
          </div>
        </div>
      </div>
<div className="businesses-table-card">
      {/* Filters */}
      <div className="businesses-toolbar">
        <div className="businesses-search">
          <RiSearchLine />
          <input
            type="text"
            placeholder="Search business, owner, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="businesses-search-clear" onClick={() => setSearch("")}>
              <RiCloseLine />
            </button>
          )}
        </div>

        <div className="businesses-filters">
          <div className="businesses-filter">
            <RiFilter3Line />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="businesses-filter">
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
              <option value="All">All Products</option>
              <option value="Transport BOS">Transport BOS</option>
              <option value="Tyre BOS">Tyre BOS</option>
              <option value="Tailor BOS">Tailor BOS</option>
            </select>
          </div>

          <div className="businesses-filter">
            <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
              <option value="All">All Plans</option>
              <option value="Free">Free</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {(search || statusFilter !== "All" || productFilter !== "All" || planFilter !== "All") && (
            <button type="button" className="businesses-reset" onClick={resetFilters}>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="businesses-results-bar">
        <div>
          <strong>{filteredBusinesses.length}</strong> businesses found
        </div>
        <span>
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </span>
      </div>

      {/* Desktop Table */}
      <div className="businesses-table-wrapper">
        <table className="businesses-table">
          <thead>
            <tr>
              <th>Business</th>
              <th>Owner</th>
              <th>Location</th>
              <th>BOS Products</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedBusinesses.map((business) => (
              <tr key={business.id}>
                <td>
                  <div className="businesses-business-cell">
                    <div className="businesses-avatar">{business.name.charAt(0)}</div>
                    <div>
                      <strong>{business.name}</strong>
                      <span>{business.id}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="businesses-owner-cell">
                    <strong>{business.owner}</strong>
                    <span>{business.email}</span>
                  </div>
                </td>

                <td>
                  <div className="businesses-location">
                    <RiMapPin2Line />
                    <span>
                      {business.city}, {business.state}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="businesses-products">
                    {business.subscriptions.map((sub) => (
                      <span
                        key={`${business.id}-${sub.product}`}
                        className={`businesses-product-tag ${
                          sub.product.includes("Transport")
                            ? "businesses-product-transport"
                            : sub.product.includes("Tyre")
                            ? "businesses-product-tyre"
                            : "businesses-product-tailor"
                        }`}
                      >
                        {sub.product.replace(" BOS", "")}
                        <small>{sub.plan}</small>
                      </span>
                    ))}
                  </div>
                </td>

                <td>
                  <span className={`businesses-status businesses-status-${business.status.toLowerCase()}`}>
                    <i />
                    {business.status}
                  </span>
                </td>

                <td>
                  <div className="businesses-date">
                    <RiCalendarLine />
                    {business.joinedDate}
                  </div>
                </td>

                <td>
                  <div className="businesses-action-wrapper" ref={openMenu === business.id ? menuRef : null}>
                    <button
                      type="button"
                      className="businesses-action-button"
                      onClick={() => setOpenMenu(openMenu === business.id ? null : business.id)}
                    >
                      <RiMore2Fill />
                    </button>

                    {openMenu === business.id && (
                      <div className="businesses-action-menu">
                        <button type="button" onClick={() => viewDetails(business)}>
                          <RiEyeLine />
                          View Details
                        </button>

                        <button type="button" onClick={() => openEdit(business)}>
                          <RiEditLine />
                          Edit Business
                        </button>

                        <button type="button" onClick={() => askToggleStatus(business)}>
                          {business.status === "Suspended" ? <RiPlayCircleLine /> : <RiPauseCircleLine />}
                          {business.status === "Suspended" ? "Activate Business" : "Suspend Business"}
                        </button>

                        <button type="button" className="businesses-danger-action" onClick={() => askDelete(business)}>
                          <RiDeleteBinLine />
                          Delete Business
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedBusinesses.length === 0 && (
          <div className="businesses-empty">
            <div>
              <RiBuilding2Line />
            </div>
            <h3>No businesses found</h3>
            <p>Try changing your search or filter criteria.</p>
            <button type="button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="businesses-mobile-list">
        {paginatedBusinesses.map((business) => (
          <div className="businesses-mobile-card" key={business.id}>
            <div className="businesses-mobile-top">
              <div className="businesses-business-cell">
                <div className="businesses-avatar">{business.name.charAt(0)}</div>
                <div>
                  <strong>{business.name}</strong>
                  <span>{business.id}</span>
                </div>
              </div>

              <span className={`businesses-status businesses-status-${business.status.toLowerCase()}`}>
                <i />
                {business.status}
              </span>
            </div>

            <div className="businesses-mobile-info">
              <div>
                <span>Owner</span>
                <strong>{business.owner}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>
                  {business.city}, {business.state}
                </strong>
              </div>

              <div>
                <span>Products</span>
                <div className="businesses-products">
                  {business.subscriptions.map((sub) => (
                    <span key={`${business.id}-mobile-${sub.product}`} className="businesses-product-tag">
                      {sub.product.replace(" BOS", "")}
                      <small>{sub.plan}</small>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span>Joined</span>
                <strong>{business.joinedDate}</strong>
              </div>
            </div>

            <div className="businesses-mobile-actions">
              <button type="button" className="businesses-mobile-view" onClick={() => viewDetails(business)}>
                <RiEyeLine />
                View Business
              </button>
              <button type="button" className="businesses-mobile-edit" onClick={() => openEdit(business)}>
                <RiEditLine />
                Edit
              </button>
            </div>
          </div>
        ))}

        {paginatedBusinesses.length === 0 && (
          <div className="businesses-empty">
            <div>
              <RiBuilding2Line />
            </div>
            <h3>No businesses found</h3>
            <p>Try changing your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="businesses-pagination">
          <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>
            <RiArrowLeftSLine />
            Previous
          </button>

          <div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                type="button"
                key={page}
                className={currentPage === page ? "businesses-page-active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
            <RiArrowRightSLine />
          </button>
        </div>
      )}

      </div>

      {/* Edit modal */}
      {editingBusiness && (
        <EditBusinessModal
          business={editingBusiness}
          onClose={() => setEditingBusiness(null)}
          onSave={saveEdit}
        />
      )}

      {/* Confirm dialog (suspend / activate / delete) */}
      <ConfirmDialog
        open={Boolean(confirmState)}
        tone={confirmState?.type === "delete" ? "danger" : "default"}
        title={
          confirmState?.type === "delete"
            ? "Delete this business?"
            : confirmState?.type === "activate"
            ? "Activate this business?"
            : "Suspend this business?"
        }
        message={
          confirmState?.type === "delete"
            ? `${confirmState?.business?.name} and all of its subscription data will be permanently removed. This cannot be undone.`
            : confirmState?.type === "activate"
            ? `${confirmState?.business?.name} will regain access to all subscribed BOS products.`
            : `${confirmState?.business?.name} will lose access to all subscribed BOS products until reactivated.`
        }
        confirmLabel={
          confirmState?.type === "delete"
            ? "Delete Business"
            : confirmState?.type === "activate"
            ? "Activate"
            : "Suspend"
        }
        onConfirm={handleConfirm}
        onCancel={() => setConfirmState(null)}
      />
    </div>
  );
};

export default Businesses;