import React, { useEffect, useMemo, useState } from "react";
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
  MdDelete,
  MdOutlineFileUpload,
} from "react-icons/md";

import {
  RiAddLine,
  RiApps2Line,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiFilter3Line,
  RiMore2Fill,
  RiSearchLine,
  RiWallet3Line,
} from "react-icons/ri";

import PricingPlanFormModal from "./PricingPlanFormModal";
import PricingPlanDetailsModal from "./PricingPlanDetailsModal";
import "../../../assets/styles/adminPricing.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan, getPublicByErpCode } from "../../../redux/Auth/PlansSlice";
import { getAllErps } from "../../../redux/Auth/ErpsSlice";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 6;

const PricingPlan = () => {
  const dispatch = useDispatch();
  const { loading: plansLoading } = useSelector((state) => state.plans);
  const { erps, loading: erpsLoading } = useSelector((state) => state.erps);

  const erpList = Array.isArray(erps) ? erps : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [erpFilter, setErpFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [billingFilter, setBillingFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPlanFormModal, setShowPlanFormModal] = useState(false);
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openErps, setOpenErps] = useState({});
  const [allPlans, setAllPlans] = useState([]);
  const plans = allPlans;
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingPlan, setDeletingPlan] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openDeleteModal = (plan) => {
    setDeletingPlan(plan);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;
    setShowDeleteModal(false);
    setDeletingPlan(null);
  };

  const handleDeletePlan = async () => {
    if (!deletingPlan?._id) {
      return;
    }
    try {
      setDeleteLoading(true);
      const response = await dispatch(deletePlan(deletingPlan._id)).unwrap();
      console.log("Plan deleted successfully:", response);
      setAllPlans((prevPlans) =>
        prevPlans.filter((plan) => plan._id !== deletingPlan._id),
      );
      toast.success(response?.message || "Plan deleted successfully.");
      setShowDeleteModal(false);
      setDeletingPlan(null);
    } catch (error) {
      console.error("Delete plan error:", error);
      toast.error(error?.message || error?.error || "Failed to delete plan.");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const loadErps = async () => {
      try {
        const response = await dispatch(getAllErps()).unwrap();
        const erpList = response?.data || [];
      } catch (error) {}
    };
    loadErps();
  }, [dispatch]);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        if (erpFilter === "All") {
          if (erpList.length === 0) {
            setAllPlans([]);
            return;
          }
          const responses = await Promise.all(
            erpList.map((erp) =>
              dispatch(getPublicByErpCode(erp.code)).unwrap(),
            ),
          );
          const combinedPlans = responses.flatMap(
            (response) => response?.data || [],
          );
          setAllPlans(combinedPlans);
          return;
        }
        const response = await dispatch(getPublicByErpCode(erpFilter)).unwrap();

        setAllPlans(response?.data || []);
      } catch (error) {
        setAllPlans([]);
      }
    };

    loadPlans();
  }, [dispatch, erpFilter, erpList]);
  
  const truncateDescription = (description) => {
    if (!description) return "-";
    const words = description.trim().split(/\s+/);
    if (words.length <= 3) {
      return description;
    }
    return `${words.slice(0, 3).join(" ")}...`;
  };
  const toggleErp = (erpCode) => {
    setOpenErps((prev) => ({
      ...prev,
      [erpCode]: !prev[erpCode],
    }));
  };

  const totalPlans = plans.length;
  const activePlans = plans.filter((plan) => plan.status === "ACTIVE").length;
  const publicPlans = plans.filter((plan) => plan.isPublic === true).length;
  const totalTrialDays = plans.reduce(
    (sum, plan) => sum + Number(plan.trialDays || 0),
    0,
  );
  const billingOptions = useMemo(() => {
    return [...new Set(plans.map((plan) => plan.billingCycle).filter(Boolean))];
  }, [plans]);
  const statusOptions = useMemo(() => {
    return [...new Set(plans.map((plan) => plan.status).filter(Boolean))];
  }, [plans]);
  const filteredPlans = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return plans.filter((plan) => {
      const matchesSearch =
        !search ||
        plan.name?.toLowerCase().includes(search) ||
        plan.code?.toLowerCase().includes(search) ||
        plan.erpCode?.toLowerCase().includes(search) ||
        plan.description?.toLowerCase().includes(search);

      const matchesErp = erpFilter === "All" || plan.erpCode === erpFilter;

      const matchesStatus =
        statusFilter === "All" || plan.status === statusFilter;

      const matchesBilling =
        billingFilter === "All" || plan.billingCycle === billingFilter;

      return matchesSearch && matchesErp && matchesStatus && matchesBilling;
    });
  }, [plans, searchTerm, erpFilter, statusFilter, billingFilter]);

  const groupedPlans = useMemo(() => {
    return filteredPlans.reduce((groups, plan) => {
      const erpCode = plan.erpCode || "UNKNOWN";
      if (!groups[erpCode]) {
        groups[erpCode] = [];
      }
      groups[erpCode].push(plan);

      return groups;
    }, {});
  }, [filteredPlans]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPlans.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedPlans = filteredPlans.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, erpFilter, statusFilter, billingFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openAddPlanModal = () => {
    setSelectedPlan(null);
    setIsEditMode(false);
    setShowPlanFormModal(true);
  };

  const openEditPlanModal = (plan) => {
    setSelectedPlan(plan);
    setIsEditMode(true);
    setShowPlanFormModal(true);
  };

  const closePlanFormModal = () => {
    setShowPlanFormModal(false);
  };

  const openPlanDetails = (plan) => {
    setSelectedPlan(plan);
    setShowPlanDetailsModal(true);
  };

  const closePlanDetails = () => {
    setShowPlanDetailsModal(false);
    setSelectedPlan(null);
    setIsEditMode(false);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setErpFilter("All");
    setStatusFilter("All");
    setBillingFilter("All");
    setCurrentPage(1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "pp-status-active";

      case "INACTIVE":
        return "pp-status-inactive";

      case "DRAFT":
        return "pp-status-draft";

      default:
        return "";
    }
  };

  const isInitialLoading = plansLoading && plans.length === 0;

  return (
    <div className="pp-page">
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
            <small>Plans from API</small>
          </div>
        </div>

        <div className="pp-summary-card">
          <div className="pp-summary-icon pp-summary-success">
            <RiCheckLine />
          </div>

          <div className="pp-summary-content">
            <span>Active Plans</span>
            <strong>{activePlans}</strong>
            <small>Currently active</small>
          </div>
        </div>

        <div className="pp-summary-card">
          <div className="pp-summary-icon pp-summary-blue">
            <RiApps2Line />
          </div>

          <div className="pp-summary-content">
            <span>Public Plans</span>
            <strong>{publicPlans}</strong>
            <small>Available publicly</small>
          </div>
        </div>

        <div className="pp-summary-card">
          <div className="pp-summary-icon pp-summary-purple">
            <RiCalendarLine />
          </div>

          <div className="pp-summary-content">
            <span>Trial Days</span>
            <strong>{totalTrialDays}</strong>
            <small>Total trial duration</small>
          </div>
        </div>
      </div>

      <div className="pp-table-card">
        <div className="pp-toolbar">
          <div className="pp-search-box">
            <RiSearchLine />

            <input
              type="text"
              placeholder="Search plans..."
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
                value={erpFilter}
                onChange={(e) => setErpFilter(e.target.value)}
                disabled={erpsLoading}
              >
                <option value="All">All ERPs</option>
                {erpList.map((erp) => (
                  <option key={erp._id} value={erp.code}>
                    {erp.name}
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

                {billingOptions.map((billing) => (
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

                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <RiArrowDownSLine />
            </div>

            {(searchTerm ||
              erpFilter !== "All" ||
              billingFilter !== "All" ||
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
          {isInitialLoading ? (
            <div className="pp-empty-cell">Loading plans...</div>
          ) : Object.keys(groupedPlans).length === 0 ? (
            <div className="pp-empty-cell">
              <div className="pp-empty-state">
                <div className="pp-empty-icon">
                  <RiSearchLine />
                </div>

                <h3>No plans found</h3>

                <p>No pricing plans are available.</p>
              </div>
            </div>
          ) : (
            Object.entries(groupedPlans).map(([erpCode, erpPlans]) => {
              const isOpen = openErps[erpCode];

              return (
                <div className="pp-table-accordion" key={erpCode}>
                  {/* ERP ACCORDION HEADER */}
                  <button
                    type="button"
                    className="pp-table-accordion-header"
                    onClick={() => toggleErp(erpCode)}
                  >
                    <div className="pp-table-accordion-title">
                      <div className="pp-table-accordion-icon">
                        <RiApps2Line />
                      </div>

                      <div>
                        <strong>{erpCode.toUpperCase()}</strong>

                        <span>
                          {erpPlans.length}{" "}
                          {erpPlans.length === 1 ? "Plan" : "Plans"}
                        </span>
                      </div>
                    </div>

                    <RiArrowDownSLine
                      className={`pp-table-accordion-arrow ${
                        isOpen ? "open" : ""
                      }`}
                    />
                  </button>

                  {/* EXISTING TABLE */}
                  {isOpen && (
                    <div className="pp-table-scroll">
                      <table className="pp-table">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Duration Days</th>
                            <th>Billing Cycle</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Display Order</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {erpPlans.map((plan) => (
                            <tr
                              key={plan._id}
                              onClick={() => openPlanDetails(plan)}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {/* CODE */}
                              <td>{plan.code || "-"}</td>

                              {/* DURATION */}
                              <td>{plan.durationDays ?? "-"}</td>

                              {/* BILLING */}
                              <td>
                                <span className="pp-billing-badge">
                                  {plan.billingCycle || "-"}
                                </span>
                              </td>

                              {/* AMOUNT */}
                              <td>
                                <span className="pp-billing-badge">
                                  {plan.amount ?? "-"}
                                </span>
                              </td>

                              {/* DESCRIPTION */}
                              <td>
                                <span className="pp-description">
                                  {truncateDescription(plan.description)}
                                </span>
                              </td>

                              {/* STATUS */}
                              <td>
                                <span
                                  className={`pp-status ${getStatusClass(
                                    plan.status,
                                  )}`}
                                >
                                  <i />
                                  {plan.status || "-"}
                                </span>
                              </td>

                              {/* DISPLAY ORDER */}
                              <td>{plan.displayOrder ?? "-"}</td>
                              <td className="d-flex">
                                <button
                                  type="button"
                                  className="pp-action-btn pp-action-edit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditPlanModal(plan);
                                  }}
                                >
                                  <MdOutlineEdit size={22} />
                                </button>

                                <button
                                  type="button"
                                  className="pp-action-btn pp-action-delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDeleteModal(plan);
                                  }}
                                >
                                  <MdDeleteOutline size={22} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="pp-mobile-list">
          {isInitialLoading ? (
            <div className="pp-mobile-empty">Loading plans...</div>
          ) : paginatedPlans.length === 0 ? (
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
              <div
                className="pp-mobile-card"
                key={plan._id}
                onClick={() => openPlanDetails(plan)}
              >
                <div className="pp-mobile-card-top">
                  <div className="pp-plan-info">
                    {plan.code || "-"}

                    <span>{plan.name || "-"}</span>
                  </div>
                </div>
                <div className="pp-mobile-meta">
                  <div>
                    <span>Duration</span>

                    {plan.durationDays ?? "-"}
                  </div>
                  <div>
                    <span>Billing</span>

                    {plan.billingCycle || "-"}
                  </div>
                  <div>
                    <span>ERP</span>

                    {plan.erpCode || "-"}
                  </div>
                </div>
                <div className="pp-mobile-product">
                  <div>
                    <span>Description</span>

                    {truncateDescription(plan.description)}
                  </div>
                </div>
                <div className="pp-mobile-bottom">
                  <span className={`pp-status ${getStatusClass(plan.status)}`}>
                    <i />

                    {plan.status || "-"}
                  </span>

                  <span>Order: {plan.displayOrder ?? "-"}</span>
                </div>
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
        onClose={closePlanFormModal}
        plan={selectedPlan}
        isEditMode={isEditMode}
      />

      <PricingPlanDetailsModal
        open={showPlanDetailsModal}
        plan={selectedPlan}
        onClose={closePlanDetails}
      />

      {showDeleteModal && (
        <div className="pp-delete-modal-overlay">
          <div className="pp-delete-modal">
            <div className="pp-delete-modal-icon">
              <MdDelete size={28} />
            </div>

            <h3>Delete Plan?</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deletingPlan?.name || deletingPlan?.code || "this plan"}
              </strong>
              ?
            </p>

            <span className="pp-delete-modal-warning">
              This action cannot be undone.
            </span>

            <div className="pp-delete-modal-actions">
              <button
                type="button"
                className="pp-delete-cancel-btn"
                onClick={closeDeleteModal}
                disabled={deleteLoading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="pp-delete-confirm-btn"
                onClick={handleDeletePlan}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <span className="pp-delete-spinner" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <MdDelete size={19} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlan;
