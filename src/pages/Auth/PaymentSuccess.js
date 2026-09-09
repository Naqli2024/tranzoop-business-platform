import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiCheck,
  FiTruck,
  FiUser,
  FiFileText,
  FiBarChart2,
  FiMoreHorizontal,
  FiGrid,
  FiArrowRight,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

const PRODUCTS = {
  tyre: {
    name: "Tyre BOS",
    description: "Complete tyre business management system",
    icon: "tyre",
  },
  transport: {
    name: "Transport BOS",
    description: "Transport management system",
    icon: "transport",
  },
  tailor: {
    name: "Tailor BOS",
    description: "Complete tailoring business management system",
    icon: "tailor",
  },
};

const PLANS = {
  free: {
    name: "Free Plan",
    price: 0,
    period: "month",
  },
  standard: {
    name: "Standard Plan",
    price: 999,
    period: "month",
  },
  premium: {
    name: "Premium Plan",
    price: 1999,
    period: "month",
  },
};

const PRODUCT_PLANS = {
  tyre: {
    free: {
      name: "Free Plan",
      price: 0,
    },
    standard: {
      name: "Standard Plan",
      price: 799,
    },
    premium: {
      name: "Premium Plan",
      price: 1599,
    },
  },

  tailor: {
    free: {
      name: "Free Plan",
      price: 0,
    },
    standard: {
      name: "Standard Plan",
      price: 699,
    },
    premium: {
      name: "Premium Plan",
      price: 1399,
    },
  },

  transport: {
    free: {
      name: "Free Plan",
      price: 0,
    },
    standard: {
      name: "Standard Plan",
      price: 999,
    },
    premium: {
      name: "Premium Plan",
      price: 1999,
    },
  },
};

const PRODUCT_FEATURES = {
  transport: [
    {
      icon: <FiTruck />,
      title: "Unlimited vehicles",
    },
    {
      icon: <FiFileText />,
      title: "Trip management",
    },
    {
      icon: <FiUser />,
      title: "Driver management",
    },
    {
      icon: <FiBarChart2 />,
      title: "Reports & analytics",
    },
    {
      icon: <FiMoreHorizontal />,
      title: "And more",
    },
  ],

  tyre: [
    {
      icon: <FiTruck />,
      title: "Tyre inventory",
    },
    {
      icon: <FiFileText />,
      title: "Sales management",
    },
    {
      icon: <FiUser />,
      title: "Customer management",
    },
    {
      icon: <FiBarChart2 />,
      title: "Reports & analytics",
    },
    {
      icon: <FiMoreHorizontal />,
      title: "And more",
    },
  ],

  tailor: [
    {
      icon: <FiFileText />,
      title: "Order management",
    },
    {
      icon: <FiUser />,
      title: "Customer management",
    },
    {
      icon: <FiCalendar />,
      title: "Delivery tracking",
    },
    {
      icon: <FiBarChart2 />,
      title: "Reports & analytics",
    },
    {
      icon: <FiMoreHorizontal />,
      title: "And more",
    },
  ],
};

const getNextRenewalDate = () => {
  const date = new Date();

  date.setMonth(date.getMonth() + 1);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getProductIcon = (slug) => {
  switch (slug) {
    case "transport":
      return <FiTruck />;

    case "tyre":
      return <FiShield />;

    case "tailor":
      return <FiFileText />;

    default:
      return <FiGrid />;
  }
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const productSlug =
    searchParams.get("product") ||
    location.state?.product?.slug ||
    "transport";

  const planId =
    searchParams.get("plan") ||
    location.state?.selectedPlan?.id ||
    "standard";

  const product =
    PRODUCTS[productSlug] ||
    location.state?.product ||
    PRODUCTS.transport;

  const selectedPlan =
    PRODUCT_PLANS[productSlug]?.[planId] ||
    location.state?.selectedPlan ||
    PLANS.standard;

  const pricing = location.state?.pricing || {};

  const transactionId =
    location.state?.transactionId || "#TRZP123456789";

  const paymentMethod =
    location.state?.paymentMethod || "Net Banking";

  const nextRenewal =
    location.state?.nextRenewal || getNextRenewalDate();

  const price =
    pricing.total ??
    selectedPlan.price ??
    0;

  const features =
    PRODUCT_FEATURES[productSlug] ||
    PRODUCT_FEATURES.transport;

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="ps-page">
      <main className="ps-main">
        <section className="ps-success">
          <div className="ps-success-icon-wrapper">
            <div className="ps-success-icon">
              <FiCheck />
            </div>
          </div>

          <h1>Payment Successful!</h1>

          <p className="ps-success-subtitle">
            Your subscription is now active
          </p>

          <p className="ps-success-description">
            Thank you for choosing BIZOOP. Your{" "}
            {product.name} account is ready to use.
            <br />
            You can now start managing your business with
            powerful tools.
          </p>

        </section>

        <section className="ps-subscription-card">
          <div className="ps-subscription-main">
            <div className="ps-product-info">

              <div className="ps-product-icon">
                {getProductIcon(productSlug)}
              </div>

              <div className="ps-product-content">

                <h2>{product.name}</h2>

                <p className="ps-product-type">
                  {product.description}
                </p>

                <p className="ps-product-description">
                  {productSlug === "transport" &&
                    "Manage vehicles, drivers, trips, customers and billing from one powerful platform."}

                  {productSlug === "tyre" &&
                    "Manage tyre inventory, customers, sales and business operations from one platform."}

                  {productSlug === "tailor" &&
                    "Manage customers, orders, measurements, deliveries and tailoring operations."}
                </p>

              </div>

            </div>
            <div className="ps-plan-info">

              <div className="ps-status">
                <span className="ps-status-dot" />
                Active
              </div>

              <div className="ps-detail-row">
                <span>Plan</span>
                <strong>{selectedPlan.name}</strong>
              </div>

              <div className="ps-detail-row">
                <span>Price</span>
                <strong>
                  ₹{Number(price).toLocaleString("en-IN")}
                  {" / month"}
                </strong>
              </div>

              <div className="ps-detail-row">
                <span>Next renewal</span>
                <strong>{nextRenewal}</strong>
              </div>

              <div className="ps-detail-row">
                <span>Payment method</span>
                <strong>{paymentMethod}</strong>
              </div>

              <div className="ps-detail-row">
                <span>Transaction ID</span>
                <strong>{transactionId}</strong>
              </div>

            </div>

          </div>

          <div className="ps-features">

            <h3>What's included in your plan</h3>

            <div className="ps-feature-list">

              {features.map((feature, index) => (
                <div
                  className="ps-feature"
                  key={index}
                >
                  <div className="ps-feature-icon">
                    {feature.icon}
                  </div>

                  <span>{feature.title}</span>
                </div>
              ))}

            </div>

          </div>

        </section>

        <section className="ps-actions">

          <button
            type="button"
            className="ps-primary-button"
            onClick={handleLogin}
          >
            <span>
              Login {product.name}
            </span>

            <FiArrowRight />
          </button>
        </section>

        <footer className="ps-footer">

          <p>
            Welcome to a smarter way to run your business.
          </p>

          <div className="ps-footer-line" />

        </footer>

      </main>
    </div>
  );
};

export default PaymentSuccess;