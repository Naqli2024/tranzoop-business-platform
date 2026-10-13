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
import "../../../assets/styles/adminBusinesses.css";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { changeBusinessStatus, getAllBusiness } from "../../../redux/Auth/BusinessSlice";

const ITEMS_PER_PAGE = 6;

const statuses = ["ACTIVE", "INACTIVE", "SUSPENDED", "EXPIRED"];

const Businesses = () => {
  const navigate = useNavigate();

  const { business, loading, summary } = useSelector((state) => state.businesses)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const dispatch = useDispatch()
  const businesses = business || [];

  const menuRef = useRef(null);

  useEffect(() => {
    dispatch(getAllBusiness())
  }, [dispatch])

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
    return businesses.filter((item) => {
      const searchValue = search.toLowerCase();
      const matchesSearch =
        item?.business?.businessName?.toLowerCase().includes(searchValue) ||
        item?.business?.mobile?.includes(searchValue)
      const matchesStatus = statusFilter === "All" || item?.status === statusFilter;
      const matchesProduct =
        productFilter === "All" || item?.products?.some((s) => s?.erpCode === productFilter);
      const matchesPlan =
        planFilter === "All" || item?.products?.some((s) => s.plan?.name === planFilter);
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
    navigate(`/admin/businesses/${business.businessId}`);
  };

  const askToggleStatus = (item) => {
    setOpenMenu(null);
    setConfirmState({
      type: item.status === "SUSPENDED" ? "activate" : "suspend",
      businesses: item,
    });
  };

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

  if (loading) {
    return (
      <div className="bd-not-found">
        <h2>Loading business...</h2>
      </div>
    );
  }

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
              <p>Manage businesses, subscriptions and BOS access across Bizoop Marketplace.</p>
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
            <strong>{summary?.totalBusinesses}</strong>
            <small>All registered businesses</small>
          </div>
        </div>
        <div className="businesses-summary-card">
          <div className="businesses-summary-icon businesses-summary-green">
            <RiCheckLine />
          </div>
          <div>
            <span>Active Businesses</span>
            <strong>{summary?.activeSubscriptions}</strong>
            <small>Currently active</small>
          </div>
        </div>
        <div className="businesses-summary-card">
          <div className="businesses-summary-icon businesses-summary-orange">
            <RiPauseCircleLine />
          </div>
          <div>
            <span>Suspended</span>
            <strong>{summary?.suspendedSubscriptions}</strong>
            <small>Require attention</small>
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
              placeholder="Search business name or mobile..."
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
                <option value="All">ALL STATUS</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="businesses-filter">
              <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
                <option value="All">All Products</option>
                {[
                  ...new Set(
                    businesses?.flatMap(
                      (item) =>
                        item.products?.map((product) => product.erpCode) || []
                    )
                  ),
                ].map((erpCode) => (
                  <option key={erpCode} value={erpCode}>
                    {erpCode.charAt(0).toUpperCase() + erpCode.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="businesses-filter">
              <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
                <option value="All">All Plans</option>
                {[
                  ...new Set(
                    businesses?.flatMap(
                      (item) =>
                        item.products?.map((product) => product.plan?.name) || []
                    )
                  ),
                ].map((planName) => (
                  <option key={planName} value={planName}>
                    {planName}
                  </option>
                ))}
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
                <th>Location</th>
                <th>BOS Products</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(paginatedBusinesses || []).map((business) => (
                <tr key={business.businessId}>
                  {/* Business */}
                  <td>
                    <div className="businesses-business-cell">
                      <div className="businesses-avatar">
                        {business?.business?.businessName?.charAt(0)}
                      </div>
                      <div>
                        <strong>
                          {business?.business?.businessName}
                        </strong>
                        <span>
                          {business?.business?.mobile}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* Location */}
                  <td>
                    <div className="businesses-location">
                      <RiMapPin2Line />
                      <span>
                        {business?.business?.address}
                      </span>
                    </div>
                  </td>
                  {/* BOS Products */}
                  <td>
                    <div className="businesses-products">
                      {(business?.products || []).map((product, index) => (
                        <span
                          key={`${business.businessId}-${product?.erpCode || index}`}
                          className={`businesses-product-tag ${product?.erpCode === "transport"
                            ? "businesses-product-transport"
                            : product?.erpCode === "tyre"
                              ? "businesses-product-tyre"
                              : "businesses-product-tailor"
                            }`}
                        >
                          {product?.erpCode
                            ? product.erpCode.charAt(0).toUpperCase() +
                            product.erpCode?.slice(1)
                            : ""}

                          <small>
                            {product?.plan?.name}
                          </small>
                        </span>
                      ))}
                    </div>
                  </td>
                  {/* Status */}
                  <td>
                    <span
                      className={`businesses-status ${getStatusClass(business?.status)}`}
                    >
                      <i />
                      {business?.status}
                    </span>
                  </td>
                  {/* Joined */}
                  <td>
                    <div className="businesses-date">
                      <RiCalendarLine />
                      {business?.joinedDate
                        ? new Date(business.joinedDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        : ""}
                    </div>
                  </td>
                  {/* Actions */}
                  <td>
                    <div
                      className="businesses-action-wrapper"
                      ref={
                        openMenu === business.businessId
                          ? menuRef
                          : null
                      }
                    >
                      <button
                        type="button"
                        className="businesses-action-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === business.businessId
                              ? null
                              : business.businessId
                          )
                        }
                      >
                        <RiMore2Fill />
                      </button>
                      {openMenu === business.businessId && (
                        <div className="businesses-action-menu">
                          <button
                            type="button"
                            onClick={() => viewDetails(business)}
                          >
                            <RiEyeLine />
                            View Details
                          </button>
                          <button
                            type="button"
                            onClick={() => askToggleStatus(business)}
                          >
                            {business.status === "SUSPENDED" ? (
                              <RiPlayCircleLine />
                            ) : (
                              <RiPauseCircleLine />
                            )}

                            {business.status === "SUSPENDED"
                              ? "Activate Business"
                              : "Suspend Business"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedBusinesses?.length === 0 && (
            <div className="businesses-empty">
              <div>
                <RiBuilding2Line />
              </div>
              <h3>No businesses found</h3>
              <p>
                Try changing your search or filter criteria.
              </p>
              <button
                type="button"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        {/* Mobile Cards */}
        <div className="businesses-mobile-list">
          {(paginatedBusinesses || []).map((item) => (
            <div
              className="businesses-mobile-card"
              key={item.businessId}
            >
              <div className="businesses-mobile-top">
                <div className="businesses-business-cell">
                  <div className="businesses-avatar">
                    {item?.business?.businessName?.charAt(0) || ""}
                  </div>
                  <div>
                    <strong>
                      {item?.business?.businessName || ""}
                    </strong>
                    <span>
                      {item?.business?.mobile || ""}
                    </span>
                  </div>
                </div>
                <span
                  className={`businesses-status ${getStatusClass(item?.status) || ""}`}
                >
                  <i />
                  {item?.status || ""}
                </span>
              </div>
              <div className="businesses-mobile-info">
                <div>
                  <span>Owner</span>
                  <strong>
                    {item?.business?.ownerName || "N/A"}
                  </strong>
                </div>
                <div>
                  <span>Mobile</span>
                  <strong>
                    {item?.business?.mobile || "N/A"}
                  </strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>
                    {item?.business?.address || "N/A"}
                  </strong>
                </div>
                <div>
                  <span>Products</span>
                  <div className="businesses-products">
                    {(item?.products || []).map((product, index) => (
                      <span
                        key={`${item.businessId}-mobile-${product?.erpCode || index}`}
                        className="businesses-product-tag"
                      >
                        {product?.erpCode
                          ? product.erpCode.charAt(0).toUpperCase() +
                          product.erpCode.slice(1)
                          : ""}
                        <small>
                          {product?.plan?.name || ""}
                        </small>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span>Joined</span>
                  <strong>
                    {item?.joinedDate
                      ? new Date(item.joinedDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </strong>
                </div>
              </div>
              <div className="businesses-mobile-actions">
                <button
                  type="button"
                  className="businesses-mobile-view"
                  onClick={() => viewDetails(item)}
                >
                  <RiEyeLine />
                  View Business
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
              <p>
                Try changing your filters.
              </p>
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
            ? `${confirmState?.businesses?.business?.businessName} and all of its subscription data will be permanently removed. This cannot be undone.`
            : confirmState?.type === "activate"
              ? `${confirmState?.businesses?.business?.businessName} will regain access to all subscribed BOS products.`
              : `${confirmState?.businesses?.business?.businessName} will lose access to all subscribed BOS products until reactivated.`
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