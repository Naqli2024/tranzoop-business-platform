import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiBuilding2Line,
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiCalendarLine,
  RiApps2Line,
  RiEditLine,
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiTeamLine,
  RiMoneyRupeeCircleLine,
} from "react-icons/ri";
import EditBusinessModal from "./EditBusinessModal";
import "../../../assets/styles/adminBusinesses.css";
import ConfirmDialog from "../../../components/ConfirmDialog";

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

export const INITIAL_BUSINESSES = RAW_BUSINESSES.map((business) => ({
  ...business,
  subscriptions: buildSubscriptions(business),
}));

const BusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);
  const business = useMemo(() => businesses.find((b) => b.id === id), [businesses, id]);

  const [isEditing, setIsEditing] = useState(false);
  const [confirmState, setConfirmState] = useState(null); // { type: "suspend" | "activate" | "delete" }

  if (!business) {
    return (
      <div className="bd-not-found">
        <RiBuilding2Line size={28} />
        <h2>Business not found</h2>
        <p>It may have been removed, or the link is incorrect.</p>
        <button type="button" onClick={() => navigate("/admin/businesses")}>
          Back to Businesses
        </button>
      </div>
    );
  }

  const totalMonthlySpend = business.subscriptions.reduce((sum, sub) => sum + sub.price, 0);

  const saveEdit = (updated) => {
    setBusinesses((prev) => prev.map((b) => (b.id === updated.id ? { ...b, ...updated } : b)));
    setIsEditing(false);
  };

  const handleConfirm = () => {
    if (!confirmState) return;

    if (confirmState.type === "delete") {
      navigate("/admin/businesses");
      return;
    }

    const nextStatus = confirmState.type === "activate" ? "Active" : "Suspended";
    setBusinesses((prev) => prev.map((b) => (b.id === business.id ? { ...b, status: nextStatus } : b)));
    setConfirmState(null);
  };

  return (
    <div className="bd-page">
      {/* Breadcrumb + back */}
      <div className="bd-breadcrumb">
        <button type="button" className="bd-back-btn" onClick={() => navigate("/admin/businesses")}>
          <RiArrowLeftLine size={16} />
        </button>
        <span>Marketplace</span>
        <span className="bd-breadcrumb-sep">/</span>
        <span>Businesses</span>
        <span className="bd-breadcrumb-sep">/</span>
        <span className="bd-breadcrumb-current">{business.name}</span>
      </div>

      {/* Header */}
      <div className="bd-header">
        <div className="bd-header-left">
          <div className="bd-avatar">{business.name.charAt(0)}</div>
          <div>
            <div className="bd-header-name-row">
              <h1>{business.name}</h1>
              <span className={`businesses-status businesses-status-${business.status.toLowerCase()}`}>
                <i />
                {business.status}
              </span>
            </div>
            <span className="bd-header-id">{business.id}</span>
          </div>
        </div>

        <div className="bd-header-actions">
          <button type="button" className="bd-action-btn" onClick={() => setIsEditing(true)}>
            <RiEditLine size={15} />
            Edit
          </button>
          <button
            type="button"
            className="bd-action-btn"
            onClick={() =>
              setConfirmState({ type: business.status === "Suspended" ? "activate" : "suspend" })
            }
          >
            {business.status === "Suspended" ? <RiPlayCircleLine size={15} /> : <RiPauseCircleLine size={15} />}
            {business.status === "Suspended" ? "Activate" : "Suspend"}
          </button>
          <button
            type="button"
            className="bd-action-btn bd-action-btn-danger"
            onClick={() => setConfirmState({ type: "delete" })}
          >
            <RiDeleteBinLine size={15} />
            Delete
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bd-stats-row">
        <div className="bd-stat">
          <RiTeamLine size={16} />
          <div>
            <span>Employees</span>
            <strong>{business.employees}</strong>
          </div>
        </div>
        <div className="bd-stat">
          <RiCalendarLine size={16} />
          <div>
            <span>Joined</span>
            <strong>{business.joinedDate}</strong>
          </div>
        </div>
        <div className="bd-stat">
          <RiApps2Line size={16} />
          <div>
            <span>Active Subscriptions</span>
            <strong>{business.subscriptions.length}</strong>
          </div>
        </div>
        <div className="bd-stat">
          <RiMoneyRupeeCircleLine size={16} />
          <div>
            <span>Monthly Spend</span>
            <strong>₹{totalMonthlySpend.toLocaleString("en-IN")}</strong>
          </div>
        </div>
      </div>

      <div className="bd-layout">
        <div className="bd-main">
          {/* Business info */}
          <section className="bd-panel">
            <h2 className="bd-panel-title">
              <RiBuilding2Line size={16} />
              Business Information
            </h2>
            <div className="bd-info-grid">
              <div>
                <span>Business Name</span>
                <strong>{business.name}</strong>
              </div>
              <div>
                <span>Business ID</span>
                <strong>{business.id}</strong>
              </div>
              <div>
                <span>Employees</span>
                <strong>{business.employees}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>
                  {business.city}, {business.state}
                </strong>
              </div>
            </div>
          </section>

          {/* Owner / contact */}
          <section className="bd-panel">
            <h2 className="bd-panel-title">
              <RiUserLine size={16} />
              Owner Information
            </h2>
            <div className="bd-contact-grid">
              <div>
                <RiUserLine size={15} />
                <span>{business.owner}</span>
              </div>
              <div>
                <RiMailLine size={15} />
                <span>{business.email}</span>
              </div>
              <div>
                <RiPhoneLine size={15} />
                <span>{business.phone}</span>
              </div>
              <div>
                <RiMapPin2Line size={15} />
                <span>
                  {business.city}, {business.state}
                </span>
              </div>
            </div>
          </section>

          {/* Subscriptions with modules */}
          <section className="bd-panel">
            <h2 className="bd-panel-title">
              <RiApps2Line size={16} />
              BOS Subscriptions &amp; Modules
            </h2>

            <div className="bd-subscriptions">
              {business.subscriptions.map((sub) => (
                <div key={sub.product} className="bd-subscription-card">
                  <div className="bd-subscription-head">
                    <div>
                      <h3>{sub.product}</h3>
                      <span className="bd-subscription-plan-badge">{sub.plan} Plan</span>
                    </div>
                    <div className="bd-subscription-price">
                      {sub.price === 0 ? (
                        <span>Free</span>
                      ) : (
                        <>
                          <strong>₹{sub.price.toLocaleString("en-IN")}</strong>
                          <span>/ month</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bd-subscription-meta">
                    <span>
                      <RiCalendarLine size={13} /> Started {sub.startDate}
                    </span>
                    <span>
                      <RiCalendarLine size={13} /> Renews {sub.renewalDate}
                    </span>
                    <span className={`businesses-status businesses-status-${sub.status.toLowerCase()}`}>
                      <i />
                      {sub.status}
                    </span>
                  </div>

                  <div className="bd-subscription-modules">
                    <span className="bd-subscription-modules-label">Enabled Modules</span>
                    <div className="bd-modules-grid">
                      {sub.modules.map((module) => (
                        <div key={module} className="bd-module-chip">
                          <RiCheckLine size={13} />
                          {module}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="bd-sidebar">
          <div className="bd-sidebar-card">
            <span className="bd-sidebar-eyebrow">Account Summary</span>
            <div className="bd-sidebar-row">
              <span>Status</span>
              <span className={`businesses-status businesses-status-${business.status.toLowerCase()}`}>
                <i />
                {business.status}
              </span>
            </div>
            <div className="bd-sidebar-row">
              <span>Total Products</span>
              <strong>{business.subscriptions.length}</strong>
            </div>
            <div className="bd-sidebar-row">
              <span>Monthly Spend</span>
              <strong>₹{totalMonthlySpend.toLocaleString("en-IN")}</strong>
            </div>
            <div className="bd-sidebar-row">
              <span>Member Since</span>
              <strong>{business.joinedDate}</strong>
            </div>
          </div>
        </aside>
      </div>

      {isEditing && (
        <EditBusinessModal business={business} onClose={() => setIsEditing(false)} onSave={saveEdit} />
      )}

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
            ? `${business.name} and all of its subscription data will be permanently removed. This cannot be undone.`
            : confirmState?.type === "activate"
            ? `${business.name} will regain access to all subscribed BOS products.`
            : `${business.name} will lose access to all subscribed BOS products until reactivated.`
        }
        confirmLabel={
          confirmState?.type === "delete" ? "Delete Business" : confirmState?.type === "activate" ? "Activate" : "Suspend"
        }
        onConfirm={handleConfirm}
        onCancel={() => setConfirmState(null)}
      />
    </div>
  );
};

export default BusinessDetails;