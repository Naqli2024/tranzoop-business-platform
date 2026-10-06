import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "../../../assets/styles/products.css"
import { useDispatch, useSelector } from "react-redux";
import { getPublicByErpCode } from "../../../redux/Auth/PlansSlice";
import { getAllErps } from "../../../redux/Auth/ErpsSlice";

const Pricing = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { plans, loading } = useSelector((state) => state.plans);
  const { erps,loading:erpsLoading } = useSelector((state) => state.erps);

  useEffect(() => {
    dispatch(getAllErps());
  }, [dispatch]);


  const erpCode = searchParams.get("erpCode")

  useEffect(() => {
    if (erpCode) {
      dispatch(getPublicByErpCode(erpCode));
    }
  }, [dispatch, erpCode]);

  const currentErp = erps.find(
    (erp) => erp.code === erpCode
  );

  const handleSwitchProduct = (code) => {
    setSearchParams({
      erpCode: code,
    });
  };

  const handleSelectPlan = (planId) => {
  navigate(
    `/signup?planId=${encodeURIComponent(planId)}&erpCode=${erpCode}`
  );
};

if (erpsLoading) {
    return (
      <div className="pricing-loading-page">
        <div className="pricing-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }


  return (
    <div className="pricing-page">
      <div className="pricing-back-arrow" onClick={() => navigate('/our-products')}>
        <IoMdArrowBack size={20} className="icon" />
      </div>
      <section className="pricing-header">
        <span className="pricing-eyebrow">Plans &amp; Pricing</span>
        <h1 className="pricing-title">{currentErp?.name} plans</h1>
        <p className="pricing-subtitle">{currentErp?.shortDescription}</p>

        <div className="pricing-tabs" role="tablist" aria-label="Choose a product">
          {erps.map((tab) => (
            <button
              key={tab.code}
              type="button"
              role="tab"
              aria-selected={tab.code === erpCode}
              className={`pricing-tab ${tab.code === erpCode ? "pricing-tab-active" : ""}`}
              onClick={() => handleSwitchProduct(tab.code)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>
      {loading ? <div className="pricing-loading">Loading Plans...</div> : (
        <div className="pricing-grid">
          {plans.map((plan) => {
            return (
              <article
                key={plan._id}
                className='pricing-card'
              >
                <h2 className="pricing-card-name">{plan.name}</h2>
                <p className="pricing-card-description">{plan.description}</p>
                <div className="pricing-price-row">

                  <span className="pricing-currency">₹</span>
                  <span className="pricing-price-value">
                    {Number(plan.amount || 0).toLocaleString("en-IN")}
                  </span>
                  <span className="pricing-price-period"> {plan.currency}{plan.billingCycle === "YEARLY"
                    ? "/year"
                    : "/month"}</span>
                </div>
                <p className="pricing-price-note">
                  Duration {plan.durationDays} days
                </p>

                <button
                  type="button"
                  className='pricing-cta'
                  onClick={() => handleSelectPlan(plan._id)}
                >
                  Choose {plan.name}
                </button>

                <ul className="pricing-feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="pricing-feature-item">
                      <i className="pricing-feature-check">✓</i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Pricing;
