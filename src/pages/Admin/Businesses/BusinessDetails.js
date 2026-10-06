import React, { useEffect, useMemo, useState } from "react";
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

import "../../../assets/styles/adminBusinesses.css";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { changeBusinessStatus, getAllBusiness } from "../../../redux/Auth/BusinessSlice";


const BusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { business, loading } = useSelector((state) => state.businesses)

  const businessData = business?.find(
    (item) => item.businessId === id
  );

  const [confirmState, setConfirmState] = useState(null); // { type: "suspend" | "activate" | "delete" }

  useEffect(() => {
    dispatch(getAllBusiness())
  }, [dispatch])

  if (loading) {
    return (
      <div className="bd-not-found">
        <h2>Loading business...</h2>
      </div>
    );
  }
  if (!businessData) {
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
  const businessInfo = businessData.business || {};
  const products = businessData.products || [];
  const businessName = businessInfo.businessName || "-";
  const mobile = businessInfo.mobile || "-";
  const address = businessInfo.address || "-";
  const joinedDate = businessData.joinedDate
    ? new Date(businessData.joinedDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "-";

  const totalMonthlySpend = products.reduce(
    (total, product) => {
      const amount = product.plan?.amount || 0;
      if (product.plan?.billingCycle === "MONTHLY") {
        return total + amount;
      }
      return total;
    },
    0
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "businesses-status-active";
      case "SUSPENDED":
        return "businesses-status-suspended";
      case "INACTIVE":
        return "businesses-status-inactive";
      case "EXPIRED":
        return "businesses-status-expired";
      default:
        return "";
    }
  };

  const handleConfirm = () => {
    if (!confirmState) return;
    const { type, business } = confirmState;
    const nextStatus = type === "activate" ? "ACTIVE" : "SUSPENDED";
    dispatch(changeBusinessStatus({
      businessId: business.businessId,
      status: nextStatus,
    })
    );
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
        <span className="bd-breadcrumb-current">{businessName}</span>
      </div>
      {/* Header */}
      <div className="bd-header">
        <div className="bd-header-left">
          <div className="bd-avatar">{businessName.charAt(0)}</div>
          <div>
            <div className="bd-header-name-row">
              <h1>{businessName}</h1>
              <span className={`businesses-status ${getStatusClass(businessData?.status)}`}>
                <i />
                {businessData?.status}
              </span>
            </div>
            <span className="bd-header-id">{mobile}</span>
          </div>
        </div>
        <div className="bd-header-actions">
          <button
            type="button"
            className="bd-action-btn"
            onClick={() =>
              setConfirmState({ type: business.status === "SUSPENDED" ? "activate" : "suspend" })
            }
          >
            {business.status === "SUSPENDED" ? <RiPlayCircleLine size={15} /> : <RiPauseCircleLine size={15} />}
            {business.status === "SUSPENDED" ? "Activate" : "Suspend"}
          </button>
        </div>
      </div>
      {/* Quick stats */}
      <div className="bd-stats-row">
        <div className="bd-stat">
          <RiCalendarLine size={16} />
          <div>
            <span>Joined</span>
            <strong>{joinedDate}</strong>
          </div>
        </div>
        <div className="bd-stat">
          <RiApps2Line size={16} />
          <div>
            <span>Active Subscriptions</span>
            <strong>{products.length}</strong>
          </div>
        </div>
        <div className="bd-stat">
          <RiMoneyRupeeCircleLine size={16} />
          <div>
            <span>Monthly Spend</span>
            <strong>₹{totalMonthlySpend}</strong>
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
                <strong>{businessName}</strong>
              </div>
              <div>
                <span>Mobile</span>
                <strong>{mobile}</strong>
              </div>
              <div>
                <span>Business Type</span>
                <strong>
                  {businessInfo.businessType || "-"}
                </strong>
              </div>
              <div>
                <span>GST Number</span>
                <strong>
                  {businessInfo.gstNo || "-"}
                </strong>
              </div>
              <div>
                <span>Location</span>
                <strong>
                  {address}
                </strong>
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
              {products.map((product) => {
                const plan = product.plan;
                const erpAccess = product.erpAccess;
                const startDate = erpAccess?.startDate
                  ? new Date(
                    erpAccess.startDate
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : "-";

                const renewalDate = erpAccess?.endDate
                  ? new Date(
                    erpAccess.endDate
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  : "-";

                return (
                  <div
                    key={erpAccess?._id || product.erpCode}
                    className="bd-subscription-card"
                  >
                    {/* Subscription Header */}
                    <div className="bd-subscription-head">
                      <div>
                        <h3 className="bd-name">{product?.erpCode}</h3>
                        <span className="bd-subscription-plan-badge">
                          {plan?.name || "-"} Plan
                        </span>
                      </div>
                      <div className="bd-subscription-price">
                        {plan?.amount === 0 ? (
                          <span>Free</span>
                        ) : (
                          <>
                            <strong>
                              ₹
                              {(
                                plan?.amount || 0
                              ).toLocaleString("en-IN")}
                            </strong>
                            <span>
                              {plan?.billingCycle === "YEARLY"
                                ? "/ Year"
                                : "/ Month"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Subscription Meta */}
                    <div className="bd-subscription-meta">
                      <span>
                        <RiCalendarLine size={13} />
                        Started {startDate}
                      </span>
                      <span>
                        <RiCalendarLine size={13} />
                        Ended {renewalDate}
                      </span>
                      <span
                        className={`businesses-status ${getStatusClass(erpAccess?.status)}`}
                      >
                        <i />
                        {erpAccess?.status}
                      </span>
                    </div>
                    {/* Plan Features */}
                    <div className="bd-subscription-modules">
                      <span className="bd-subscription-modules-label">
                        Enabled Modules
                      </span>
                      <div className="bd-modules-grid">
                        {(plan?.features || []).map((feature) => (
                          <div
                            key={feature}
                            className="bd-module-chip"
                          >
                            <RiCheckLine size={13} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

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
            ? `${businessName} and all of its subscription data will be permanently removed. This cannot be undone.`
            : confirmState?.type === "activate"
              ? `${businessName} will regain access to all subscribed BOS products.`
              : `${businessName} will lose access to all subscribed BOS products until reactivated.`
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