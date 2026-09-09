import React from "react";
import {
  RiBuilding2Line,
  RiFileList3Line,
  RiCodeSSlashLine,
  RiBankCardLine,
  RiArrowRightUpLine,
  RiArrowRightDownLine,
} from "react-icons/ri";
import "../../../assets/styles/adminMain.css";
const STATS = [
  {
    id: "businesses",
    label: "Total Businesses",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: RiBuilding2Line,
  },
  {
    id: "subscriptions",
    label: "Active Subscriptions",
    value: "1,096",
    change: "+4.6%",
    trend: "up",
    icon: RiFileList3Line,
  },
  {
    id: "api",
    label: "API Calls (24h)",
    value: "482K",
    change: "-1.3%",
    trend: "down",
    icon: RiCodeSSlashLine,
  },
  {
    id: "revenue",
    label: "Monthly Revenue",
    value: "₹18.6L",
    change: "+11.4%",
    trend: "up",
    icon: RiBankCardLine,
  },
];

const API_TREND = [62, 74, 58, 81, 90, 70, 96]; // last 7 days, relative %

const RECENT_BUSINESSES = [
  { name: "Chennai Tyre Hub", product: "Tyre Shop", plan: "Standard", status: "active", joined: "2 Sep 2026" },
  { name: "Vikram Transport Co.", product: "Transport Management", plan: "Premium", status: "active", joined: "1 Sep 2026" },
  { name: "Nandhini Tailors", product: "Tailor Shop", plan: "Free Trial", status: "trial", joined: "31 Aug 2026" },
  { name: "SR Wheels & Tyres", product: "Tyre Shop", plan: "Standard", status: "active", joined: "29 Aug 2026" },
  { name: "Metro Fleet Services", product: "Transport Management", plan: "Standard", status: "past_due", joined: "27 Aug 2026" },
];

const ERP_STATUS = [
  { name: "Tally ERP 9", status: "connected", businesses: 412 },
  { name: "Zoho Books", status: "connected", businesses: 268 },
  { name: "SAP Business One", status: "issue", businesses: 34 },
  { name: "QuickBooks", status: "connected", businesses: 151 },
];

const STATUS_LABELS = {
  active: { label: "Active", className: "ad-badge-success" },
  trial: { label: "Trial", className: "ad-badge-accent" },
  past_due: { label: "Past Due", className: "ad-badge-danger" },
  connected: { label: "Connected", className: "ad-badge-success" },
  issue: { label: "Needs Attention", className: "ad-badge-danger" },
};

const AdminDashboard = () => {
  const maxTrend = Math.max(...API_TREND);

  return (
    <div className="ad-dashboard">
      <header className="ad-dashboard-header">
        <div>
          <h1 className="ad-dashboard-title">Welcome back</h1>
          <p className="ad-dashboard-subtitle">
            Here's what's happening across the BIZOOP marketplace today.
          </p>
        </div>
      </header>

      {/* Stat cards */}
      <div className="ad-stats-grid">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? RiArrowRightUpLine : RiArrowRightDownLine;

          return (
            <div key={stat.id} className="ad-stat-card">
              <div className="ad-stat-icon">
                <Icon size={18} />
              </div>
              <span className="ad-stat-label">{stat.label}</span>
              <span className="ad-stat-value">{stat.value}</span>
              <span className={`ad-stat-change ad-stat-change-${stat.trend}`}>
                <TrendIcon size={13} />
                {stat.change} vs last month
              </span>
            </div>
          );
        })}
      </div>

      <div className="ad-dashboard-grid">
        {/* Recent businesses */}
        <section className="ad-panel ad-panel-wide">
          <div className="ad-panel-head">
            <h2 className="ad-panel-title">Recent Businesses</h2>
            <a href="/admin/businesses" className="ad-panel-link">
              View all
            </a>
          </div>

          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Product</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_BUSINESSES.map((biz) => (
                  <tr key={biz.name}>
                    <td className="ad-table-name">{biz.name}</td>
                    <td>{biz.product}</td>
                    <td>{biz.plan}</td>
                    <td>
                      <span className={`ad-badge ${STATUS_LABELS[biz.status].className}`}>
                        {STATUS_LABELS[biz.status].label}
                      </span>
                    </td>
                    <td className="ad-table-muted">{biz.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* API usage trend */}
        <section className="ad-panel">
          <div className="ad-panel-head">
            <h2 className="ad-panel-title">API Usage — 7 Days</h2>
            <a href="/admin/api-usage" className="ad-panel-link">
              Details
            </a>
          </div>

          <div className="ad-trend-chart">
            {API_TREND.map((value, i) => (
              <div key={i} className="ad-trend-bar-wrap">
                <div
                  className="ad-trend-bar"
                  style={{ height: `${(value / maxTrend) * 100}%` }}
                />
                <span className="ad-trend-label">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ERP status */}
        <section className="ad-panel ad-panel-wide">
          <div className="ad-panel-head">
            <h2 className="ad-panel-title">ERP Integrations</h2>
            <a href="/admin/erp" className="ad-panel-link">
              Manage ERPs
            </a>
          </div>

          <div className="ad-erp-list">
            {ERP_STATUS.map((erp) => (
              <div key={erp.name} className="ad-erp-row">
                <span className="ad-erp-name">{erp.name}</span>
                <span className="ad-erp-count">{erp.businesses} businesses</span>
                <span className={`ad-badge ${STATUS_LABELS[erp.status].className}`}>
                  {STATUS_LABELS[erp.status].label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;