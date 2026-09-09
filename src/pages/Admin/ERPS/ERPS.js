import React, { useEffect, useMemo, useState } from "react";
import {
  RiAddLine,
  RiApps2Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiCheckLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiFilter3Line,
  RiMore2Fill,
  RiSearchLine,
  RiSettings3Line,
  RiToggleLine,
} from "react-icons/ri";
import "../../../assets/styles/adminProducts.css";
import ProductDetailsModal from "./ProductsDetailsModal";
import ConfirmDialog from "../../../components/ConfirmDialog";
import ProductFormModal from "./ProductFormModal";

const PRODUCTS = [
  {
    id: "PROD-1001",
    name: "Transport BOS",
    slug: "transport-bos",
    category: "Transport",
    description:
      "Complete business operating system for transport and logistics companies.",
    icon: "🚚",
    plans: ["Free", "Standard", "Premium"],
    status: "Active",
    createdDate: "12 Aug 2026",
    updatedDate: "28 Aug 2026",
    customers: 128,
    monthlyRevenue: 125640,
  },
  {
    id: "PROD-1002",
    name: "Tyre BOS",
    slug: "tyre-bos",
    category: "Tyre",
    description:
      "Business management platform for tyre shops, dealers and service centres.",
    icon: "🛞",
    plans: ["Free", "Standard", "Premium"],
    status: "Active",
    createdDate: "14 Aug 2026",
    updatedDate: "29 Aug 2026",
    customers: 94,
    monthlyRevenue: 78420,
  },
  {
    id: "PROD-1003",
    name: "Tailor BOS",
    slug: "tailor-bos",
    category: "Tailoring",
    description:
      "Complete tailoring management system for measurements, orders and customers.",
    icon: "✂️",
    plans: ["Free", "Standard", "Premium"],
    status: "Active",
    createdDate: "18 Aug 2026",
    updatedDate: "30 Aug 2026",
    customers: 76,
    monthlyRevenue: 53210,
  },
  {
    id: "PROD-1004",
    name: "Retail BOS",
    slug: "retail-bos",
    category: "Retail",
    description:
      "Retail business management platform for inventory, sales and customers.",
    icon: "🏪",
    plans: ["Free", "Standard"],
    status: "Draft",
    createdDate: "22 Aug 2026",
    updatedDate: "31 Aug 2026",
    customers: 0,
    monthlyRevenue: 0,
  },
  {
    id: "PROD-1005",
    name: "Salon BOS",
    slug: "salon-bos",
    category: "Salon",
    description:
      "Salon management platform for appointments, queues, customers and staff.",
    icon: "💇",
    plans: ["Free", "Standard", "Premium"],
    status: "Inactive",
    createdDate: "25 Aug 2026",
    updatedDate: "01 Sep 2026",
    customers: 18,
    monthlyRevenue: 9800,
  },
  {
    id: "PROD-1006",
    name: "Restaurant BOS",
    slug: "restaurant-bos",
    category: "Restaurant",
    description:
      "Restaurant operating system for orders, tables, billing and operations.",
    icon: "🍽️",
    plans: ["Free", "Standard", "Premium"],
    status: "Draft",
    createdDate: "26 Aug 2026",
    updatedDate: "01 Sep 2026",
    customers: 0,
    monthlyRevenue: 0,
  },
  {
    id: "PROD-1007",
    name: "Service BOS",
    slug: "service-bos",
    category: "Services",
    description:
      "Business operating system for service-based businesses and professionals.",
    icon: "🧰",
    plans: ["Free", "Standard", "Premium"],
    status: "Active",
    createdDate: "27 Aug 2026",
    updatedDate: "01 Sep 2026",
    customers: 34,
    monthlyRevenue: 22100,
  },
  {
    id: "PROD-1008",
    name: "Manufacturing BOS",
    slug: "manufacturing-bos",
    category: "Manufacturing",
    description:
      "Manufacturing management platform for production and operational workflows.",
    icon: "🏭",
    plans: ["Standard", "Premium"],
    status: "Draft",
    createdDate: "28 Aug 2026",
    updatedDate: "02 Sep 2026",
    customers: 0,
    monthlyRevenue: 0,
  },
  {
    id: "PROD-1009",
    name: "Property BOS",
    slug: "property-bos",
    category: "Real Estate",
    description:
      "Property management platform for listings, buyers, sellers and deals.",
    icon: "🏠",
    plans: ["Free", "Standard", "Premium"],
    status: "Active",
    createdDate: "29 Aug 2026",
    updatedDate: "02 Sep 2026",
    customers: 21,
    monthlyRevenue: 18900,
  },
];

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS = ["All", "Active", "Inactive", "Draft"];

const CATEGORY_OPTIONS = [
  "All",
  "Transport",
  "Tyre",
  "Tailoring",
  "Retail",
  "Salon",
  "Restaurant",
  "Services",
  "Manufacturing",
  "Real Estate",
];

const PLAN_OPTIONS = ["All", "Free", "Standard", "Premium"];

const Products = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [openActionId, setOpenActionId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: null,
    product: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      type: null,
      product: null,
    });
  };

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.id.toLowerCase().includes(search) ||
        product.slug.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || product.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      const matchesPlan =
        planFilter === "All" || product.plans.includes(planFilter);

      return matchesSearch && matchesStatus && matchesCategory && matchesPlan;
    });
  }, [products, searchTerm, statusFilter, categoryFilter, planFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, planFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenActionId(null);
    };

    if (openActionId) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openActionId]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
    setOpenActionId(null);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = () => {
    setFormMode("add");
    setEditingProduct(null);
    setShowFormModal(true);
    setOpenActionId(null);
  };

  const handleEditProduct = (product) => {
    setFormMode("edit");
    setEditingProduct(product);
    setShowFormModal(true);
    setOpenActionId(null);
  };

  const handleManagePlans = (product) => {
    setFormMode("edit");
    setEditingProduct(product);
    setShowFormModal(true);
    setOpenActionId(null);
  };

  const handleSaveProduct = (formData) => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if (formMode === "add") {
      const nextNumber =
        products.reduce((max, product) => {
          const number = parseInt(product.id.replace("PROD-", ""), 10);

          return Math.max(max, number || 0);
        }, 1000) + 1;

      const newProduct = {
        id: `PROD-${nextNumber}`,
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        description: formData.description,
        icon: formData.icon,
        plans: formData.plans,
        status: formData.status,
        createdDate: formattedDate,
        updatedDate: formattedDate,
        customers: 0,
        monthlyRevenue: 0,
      };

      setProducts((prev) => [newProduct, ...prev]);

      setCurrentPage(1);
    } else {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? {
                ...item,
                ...formData,
                updatedDate: formattedDate,
              }
            : item,
        ),
      );
    }

    setShowFormModal(false);
    setEditingProduct(null);
  };

  const handleToggleStatus = (product) => {
    setConfirmDialog({
      open: true,
      type: "toggle",
      product,
    });

    setOpenActionId(null);
  };

  const handleDeleteProduct = (product) => {
    setConfirmDialog({
      open: true,
      type: "delete",
      product,
    });

    setOpenActionId(null);
  };

  const handleConfirmAction = () => {
    const { type, product } = confirmDialog;

    if (!product) return;

    if (type === "delete") {
      setProducts((prev) => prev.filter((item) => item.id !== product.id));
    }

    if (type === "toggle") {
      const nextStatus = product.status === "Active" ? "Inactive" : "Active";

      setProducts((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                status: nextStatus,
                updatedDate: "04 Sep 2026",
              }
            : item,
        ),
      );
    }

    closeConfirmDialog();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setPlanFilter("All");
    setCurrentPage(1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "erp-status-active";

      case "Inactive":
        return "erp-status-inactive";

      case "Draft":
        return "erp-status-draft";

      default:
        return "";
    }
  };

  const getPlanClass = (plan) => {
    return `erp-plan erp-plan-${plan
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  return (
    <div className="erp-page">
      <div className="erp-page-header">
        <div>
          <div className="businesses-breadcrumb">
            Marketplace <span>/</span> Products
          </div>
          <div className="businesses-title-row">
            <div className="erp-title-icon">
              <RiApps2Line />
            </div>

            <div>
              <h1>Products</h1>

              <p>Manage BIZOOP BOS products and their availability.</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="erp-add-btn"
          onClick={handleAddProduct}
        >
          <RiAddLine />

          <span>Add Product</span>
        </button>
      </div>

      <div className="erp-summary">
        {/* TOTAL */}
        <div className="erp-summary-card">
          <div className="erp-summary-icon">
            <RiApps2Line />
          </div>

          <div className="erp-summary-content">
            <span>Total Products</span>

            <strong>{products.length}</strong>

            <small>All BOS products in marketplace</small>
          </div>
        </div>

        {/* ACTIVE */}
        <div className="erp-summary-card">
          <div
            className="
        erp-summary-icon
        erp-summary-success
      "
          >
            <RiCheckLine />
          </div>

          <div className="erp-summary-content">
            <span>Active Products</span>

            <strong>
              {products.filter((item) => item.status === "Active").length}
            </strong>

            <small>Currently available products</small>
          </div>
        </div>

        {/* DRAFT */}
        <div className="erp-summary-card">
          <div
            className="
        erp-summary-icon
        erp-summary-warning
      "
          >
            <RiSettings3Line />
          </div>

          <div className="erp-summary-content">
            <span>Draft Products</span>

            <strong>
              {products.filter((item) => item.status === "Draft").length}
            </strong>

            <small>Products still being prepared</small>
          </div>
        </div>

        {/* CUSTOMERS */}
        <div className="erp-summary-card">
          <div
            className="
        erp-summary-icon
        erp-summary-purple
      "
          >
            <RiToggleLine />
          </div>

          <div className="erp-summary-content">
            <span>Total Customers</span>

            <strong>
              {products
                .reduce((total, product) => total + product.customers, 0)
                .toLocaleString("en-IN")}
            </strong>

            <small>Combined customers across products</small>
          </div>
        </div>
      </div>

      <div className="erp-table-card">
        <div className="erp-toolbar">
          {/* SEARCH */}

          <div className="erp-search">
            <RiSearchLine />

            <input
              type="text"
              placeholder="Search product, category or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            {searchTerm && (
              <button
                type="button"
                className="erp-search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <RiCloseLine />
              </button>
            )}
          </div>

          {/* FILTERS */}

          <div className="erp-filters">
            {/* STATUS */}

            <div className="erp-filter">
              <RiFilter3Line />

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Status" : status}
                  </option>
                ))}
              </select>
            </div>

            {/* CATEGORY */}

            <div className="erp-filter">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* PLAN */}

            <div className="erp-filter">
              <select
                value={planFilter}
                onChange={(e) => {
                  setPlanFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {PLAN_OPTIONS.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan === "All" ? "All Plans" : plan}
                  </option>
                ))}
              </select>
            </div>

            {/* RESET */}

            {(searchTerm ||
              statusFilter !== "All" ||
              categoryFilter !== "All" ||
              planFilter !== "All") && (
              <button
                type="button"
                className="erp-reset"
                onClick={handleClearFilters}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="erp-results-bar">
          <div>
            <strong>{filteredProducts.length}</strong> products found
          </div>

          <span>
            Page {filteredProducts.length === 0 ? 0 : currentPage} of{" "}
            {filteredProducts.length === 0 ? 0 : totalPages}
          </span>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>PRODUCT</th>

                <th>CATEGORY</th>

                <th>PLANS</th>

                <th>CUSTOMERS</th>

                <th>REVENUE</th>

                <th>STATUS</th>

                <th>UPDATED</th>

                <th className="erp-action-column">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    {/* PRODUCT */}

                    <td>
                      <div className="erp-product-cell">
                        <div className="erp-product-icon">
                          {product.icon}
                        </div>

                        <div className="erp-product-info">
                          <strong>{product.name}</strong>

                          <span>{product.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td>
                      <span className="erp-category">
                        {product.category}
                      </span>
                    </td>

                    {/* PLANS */}

                    <td>
                      <div className="erp-plans">
                        {product.plans.map((plan) => (
                          <span
                            key={`${product.id}-${plan}`}
                            className={getPlanClass(plan)}
                          >
                            {plan}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* CUSTOMERS */}

                    <td>
                      <span className="erp-number">
                        {product.customers.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* REVENUE */}

                    <td>
                      <span className="erp-revenue">
                        ₹{product.monthlyRevenue.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`erp-status ${getStatusClass(
                          product.status,
                        )}`}
                      >
                        <span />
                        {product.status}
                      </span>
                    </td>

                    {/* UPDATED */}

                    <td>
                      <span className="erp-date">
                        <RiCalendarLine />
                        {product.updatedDate}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td className="erp-action-column">
                      <div
                        className="erp-action-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="erp-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenActionId(
                              openActionId === product.id ? null : product.id,
                            );
                          }}
                          aria-label={`Actions for ${product.name}`}
                        >
                          <RiMore2Fill />
                        </button>

                        {openActionId === product.id && (
                          <div className="erp-action-menu">
                            <button
                              type="button"
                              onClick={() => handleViewProduct(product)}
                            >
                              <RiEyeLine />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() => handleEditProduct(product)}
                            >
                              <RiEditLine />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleManagePlans(product)}
                            >
                              <RiSettings3Line />
                              Manage Plans
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleStatus(product)}
                            >
                              <RiToggleLine />

                              {product.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                            <button
                              type="button"
                              className="erp-danger-action"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <RiDeleteBinLine />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="erp-empty-table">
                    <div className="erp-empty-state">
                      <div className="erp-empty-icon">
                        <RiApps2Line />
                      </div>

                      <h3>No products found</h3>

                      <p>Try changing your search or filter criteria.</p>

                      <button type="button" onClick={handleClearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="erp-mobile-list">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div
                className="erp-mobile-card"
                key={`mobile-${product.id}`}
              >
                <div className="erp-mobile-top">
                  <div className="erp-product-cell">
                    <div className="erp-product-icon">{product.icon}</div>

                    <div className="erp-product-info">
                      <strong>{product.name}</strong>

                      <span>{product.id}</span>
                    </div>
                  </div>

                  <span
                    className={`erp-status ${getStatusClass(
                      product.status,
                    )}`}
                  >
                    <span />
                    {product.status}
                  </span>
                </div>

                <div className="erp-mobile-details">
                  <div>
                    <span>Category</span>

                    <strong>{product.category}</strong>
                  </div>

                  <div>
                    <span>Customers</span>

                    <strong>{product.customers.toLocaleString("en-IN")}</strong>
                  </div>

                  <div>
                    <span>Revenue</span>

                    <strong>
                      ₹{product.monthlyRevenue.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div className="erp-mobile-plans">
                  {product.plans.map((plan) => (
                    <span
                      key={`${product.id}-mobile-${plan}`}
                      className={getPlanClass(plan)}
                    >
                      {plan}
                    </span>
                  ))}
                </div>

                <div className="erp-mobile-date">
                  <RiCalendarLine />

                  <span>Updated {product.updatedDate}</span>
                </div>

                <div className="erp-mobile-actions">
                  <button
                    type="button"
                    onClick={() => handleViewProduct(product)}
                  >
                    <RiEyeLine />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEditProduct(product)}
                  >
                    <RiEditLine />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleManagePlans(product)}
                  >
                    <RiSettings3Line />
                    Plans
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="erp-mobile-empty">
              <div className="erp-empty-icon">
                <RiApps2Line />
              </div>

              <h3>No products found</h3>

              <p>Try changing your search or filter criteria.</p>

              <button type="button" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length > 0 && (
          <div className="erp-pagination">
            {/* PREVIOUS */}

            <button
              type="button"
              className="erp-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              <RiArrowLeftSLine />

              <span>Previous</span>
            </button>

            {/* PAGE NUMBERS */}

            <div className="erp-page-numbers">
              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`erp-page-number ${
                    currentPage === page ? "erp-page-number-active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* NEXT */}

            <button
              type="button"
              className="erp-page-btn"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              <span>Next</span>

              <RiArrowRightSLine />
            </button>
          </div>
        )}
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={handleCloseModal}
        onEdit={handleEditProduct}
        onManagePlans={handleManagePlans}
      />

      <ProductFormModal
        open={showFormModal}
        mode={formMode}
        product={editingProduct}
        onClose={() => {
          setShowFormModal(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        title={
          confirmDialog.type === "delete"
            ? "Delete Product?"
            : confirmDialog.product?.status === "Active"
              ? "Deactivate Product?"
              : "Activate Product?"
        }
        message={
          confirmDialog.type === "delete"
            ? `Are you sure you want to permanently delete ${confirmDialog.product?.name}? This action cannot be undone.`
            : confirmDialog.product?.status === "Active"
              ? `${confirmDialog.product?.name} will no longer be available for new customers. Existing subscriptions will remain unaffected.`
              : `${confirmDialog.product?.name} will become available again in the marketplace.`
        }
        confirmLabel={
          confirmDialog.type === "delete"
            ? "Delete Product"
            : confirmDialog.product?.status === "Active"
              ? "Deactivate"
              : "Activate"
        }
        tone={confirmDialog.type === "delete" ? "danger" : "warning"}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirmDialog}
      />
    </div>
  );
};

export default Products;
