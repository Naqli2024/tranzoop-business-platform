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
  FiCheckCircle,
  FiPackage,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllErps } from "../../redux/Auth/ErpsSlice";
import { getPublicByErpCode } from "../../redux/Auth/PlansSlice";
import { ErpLogin } from "./ErpLogin";

const getNextRenewalDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch()

  const { erps } = useSelector((state) => state.erps);
  const { plans } = useSelector((state) => state.plans);

  const erpCode = searchParams.get("erpCode") || location.state?.erp?.code;


  useEffect(() => {
    dispatch(getAllErps());
  }, [dispatch]);

  useEffect(() => {
    if (erpCode) {
      dispatch(getPublicByErpCode(erpCode));
    }
  }, [dispatch, erpCode]);


  const planId = searchParams.get("planId") || location.state?.selectedPlan?._id;

  const selectedErp = erps?.find((erp) => erp.code === erpCode);

  const selectedPlan = plans?.find((plan) => plan._id === planId);


  const pricing = location.state?.pricing || {};

  const transactionId =
    location.state?.transactionId || "#TRZP123456789";

  const paymentMethod =
    location.state?.paymentMethod || "Net Banking";

  const nextRenewal =
    location.state?.nextRenewal || getNextRenewalDate();

  const price = selectedPlan?.amount ?? 0;

  const handleLogin = (erpName) => {
    const url = ErpLogin(erpName);
    if (url) {
      window.location.href = url;
    }
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
            {selectedErp?.name} account is ready to use.
            <br />
            You can now start managing your business with
            powerful tools.
          </p>
        </section>

        <section className="ps-subscription-card">
          <div className="ps-subscription-main">
            <div className="ps-product-info">
              <div className="ps-product-icon">
                <FiPackage />
              </div>
              <div className="ps-product-content">
                <h2>{selectedErp?.name}</h2>
                <p className="ps-product-type">
                  {selectedErp?.description}
                </p>
                <p className="ps-product-description">
                  {selectedErp?.shortDescription}
                </p>
              </div>
            </div>
            <div className="ps-plan-info">
              <div className="ps-status">
                <span className="ps-status-dot" />
                {selectedErp?.status}
              </div>
              <div className="ps-detail-row">
                <span>Plan</span>
                <strong>{selectedPlan?.name}</strong>
              </div>
              <div className="ps-detail-row">
                <span>Price</span>
                <strong>
                  ₹{Number(price).toLocaleString("en-IN")}
                  {" / "}
                  {selectedPlan?.billingCycle === "YEARLY"
                    ? "year"
                    : "month"}
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
              {selectedPlan?.features?.map((feature, index) => (
                <div
                  className="ps-feature"
                  key={index}
                >
                  <div className="ps-feature-icon">
                    <FiCheckCircle />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ps-actions">
          <button type="button"
            className="ps-primary-button"
            onClick={() => handleLogin(selectedErp?.name)}>
            <span>Login {selectedErp?.name}</span>
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