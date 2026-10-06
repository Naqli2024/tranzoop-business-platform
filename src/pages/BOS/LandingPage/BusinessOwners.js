import React from "react";
import { Activity, BriefcaseBusiness, CircleDollarSign, Users } from "lucide-react";
import whatshappening from "../../../assets/images/whatshappening.svg";
import {
  ArrowRight,
  Check,
  Search,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  Zap,
} from "lucide-react";

const OWNER_BENEFITS = [
  {
    icon: Search,
    title: "Get discovered",
    text: "Get discovered by customers actively looking for your service.",
  },
  {
    icon: CalendarCheck,
    title: "Run your operations",
    text: "Manage bookings, staff and inventory from one connected screen.",
  },
  {
    icon: CreditCard,
    title: "Get paid faster",
    text: "Accept online payments with same-day settlement.",
  },
  {
    icon: TrendingUp,
    title: "Grow with data",
    text: "See what's working across your business, branch by branch.",
  },
];

const OWNER_STATS = [
  {
    value: "128",
    label: "Active operations",
    icon: Activity,
  },
  {
    value: "42",
    label: "Orders / jobs",
    icon: BriefcaseBusiness,
  },
  {
    value: "96%",
    label: "Operations tracked",
    icon: Activity,
  },
  {
    value: "₹48.2K",
    label: "Potential savings",
    icon: CircleDollarSign,
  },
];

const OPPORTUNITIES = [
  {
    label: "Sales & billing",
    value: 92,
  },
  {
    label: "Inventory",
    value: 78,
  },
  {
    label: "Operations",
    value: 86,
  },
  {
    label: "Customers",
    value: 74,
  },
];

const BusinessOwners = () => {
  return (
    <div>
          <section className="owner-view-section" id="owner-view">
      <div className="owner-view-container">
        <div className="owner-view-header">
          <div className="eyebrow">
            THE OWNER'S VIEW
          </div>

          <h2>
            Know what is happening
            <br />
            <span>across your business.</span>
          </h2>

          <p>
            BIZOOP BOS brings your day-to-day operations into one connected
            system — so you can see what is happening, track performance,
            manage resources and make decisions with confidence.
          </p>
        </div>

        <div className="owner-view-main">
          <div className="owner-view-info">

            <div className="owner-view-intro">
              <span>BUSINESS SNAPSHOT</span>

              <h3>
                Everything important,
                <br />
                visible at a glance.
              </h3>

              <p>
                Replace scattered spreadsheets and disconnected updates
                with one live view of your business.
              </p>
            </div>


            {/* Stats */}
            <div className="owner-stat-grid">

              {OWNER_STATS.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div className="owner-stat" key={stat.label}>

                    <div className="owner-stat-top">
                      <Icon size={14} />
                    </div>

                    <strong>{stat.value}</strong>

                    <span>{stat.label}</span>

                  </div>
                );
              })}

            </div>

          </div>

          <div className="owner-view-visual">

            <div className="owner-image-frame">

              <img
                src={whatshappening}
                alt="Bizoop business operations dashboard"
              />

              <div className="owner-image-overlay" />
              <div className="owner-live-card">

                <div className="owner-live-dot" />

                <div>
                  <span>LIVE BUSINESS VIEW</span>
                  <strong>Everything is connected.</strong>
                </div>

              </div>
            </div>

          </div>

        </div>

        <div className="owner-opportunity">

          <div className="owner-opportunity-heading">

            <span>AI BUSINESS SIGNALS</span>

            <strong>
              Opportunities identified automatically.
            </strong>

            <p>
              Bizoop continuously looks across your operations
              to highlight where attention can create an impact.
            </p>

          </div>


          <div className="owner-opportunity-list">

            {OPPORTUNITIES.map((item) => (
              <div
                className="owner-opportunity-item"
                key={item.label}
              >

                <div className="owner-opportunity-meta">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>

                <div className="owner-opportunity-track">
                  <span
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>

        </div>

        <div className="owner-view-footer">

          <span>
            ONE CONNECTED VIEW
          </span>

          <i />

          <span>
            LIVE OPERATIONS
          </span>

          <i />

          <span>
            BETTER DECISIONS
          </span>

        </div>

      </div>
    </section>
    <section className="business-owner-section" id="business-owners">
      <div className="container">

        <div className="business-owner-layout">

          {/* LEFT */}
          <div className="business-owner-copy" data-reveal>

            <div className="eyebrow">
              FOR BUSINESS OWNERS
            </div>

            <h2>
              Bring your business
              <br />
              onto <span>BIZOOP.</span>
            </h2>

            <p>
              Join businesses already using a Business Operating System
              to run day-to-day operations, stay connected with customers
              and grow with better visibility.
            </p>

            <div className="business-owner-actions">

              <button className="pill-button primary-button">
                Get Started Free
                <ArrowRight size={16} />
              </button>

            </div>

          </div>

          <div className="business-owner-benefits" data-reveal>

            <div className="business-owner-benefits-head">
              <span>YOUR DIGITAL OFFICE</span>

              <p>
                Everything your business needs to operate,
                connect and grow from one platform.
              </p>
            </div>


            <div className="business-owner-benefit-list">

              {OWNER_BENEFITS.map((item, index) => {

                const Icon = item.icon;

                return (
                  <article
                    className="business-owner-benefit"
                    key={item.title}
                  >

                    <div className="business-owner-benefit-number">
                      0{index + 1}
                    </div>

                    <div className="business-owner-benefit-icon">
                      <Icon size={18} />
                    </div>

                    <div className="business-owner-benefit-content">

                      <h3>{item.title}</h3>

                      <p>{item.text}</p>

                    </div>

                    <Check
                      className="business-owner-check"
                      size={16}
                    />

                  </article>
                );
              })}

            </div>

          </div>

        </div>


        {/* METRICS */}
<div className="business-owner-metrics" data-reveal>

  {/* Revenue Card */}
  <article className="business-owner-metric-card revenue-card">

    <div className="metric-card-bubble bubble-one" />
    <div className="metric-card-bubble bubble-two" />

    <div className="metric-card-top">
      <span className="metric-card-index">01</span>

      <span className="metric-card-label">
        BUSINESS GROWTH
      </span>
    </div>

    <div className="metric-card-main">

      <div className="business-owner-metric-value">
        +27%
      </div>

      <div className="metric-card-icon">
        <TrendingUp size={18} />
      </div>

    </div>

    <div className="metric-card-content">
      <strong>Average revenue increase</strong>

      <span>
        within 3 months of onboarding
      </span>
    </div>

    <div className="metric-card-line">
      <span />
    </div>

  </article>


  {/* Setup Card */}
  <article className="business-owner-metric-card setup-card">

    <div className="metric-card-bubble bubble-three" />
    <div className="metric-card-bubble bubble-four" />

    <div className="metric-card-top">
      <span className="metric-card-index">02</span>

      <span className="metric-card-label">
        FAST ONBOARDING
      </span>
    </div>

    <div className="metric-card-main">

      <div className="business-owner-metric-value">
        &lt; 1
        <small>DAY</small>
      </div>

      <div className="metric-card-icon">
        <Zap size={18} />
      </div>

    </div>

    <div className="metric-card-content">
      <strong>Setup time</strong>

      <span>
        from sign-up to first booking
      </span>
    </div>

    <div className="metric-card-line">
      <span />
    </div>

  </article>

</div>


        {/* BOTTOM STATEMENT */}
        <div className="business-owner-bottom" data-reveal>

          <span>BUILT FOR BUSINESS OWNERS</span>

          <div />

          <strong>
            Your business. Your workflow. One connected office.
          </strong>

          <ArrowRight size={18} />

        </div>

      </div>
    </section>
    </div>
  );
};

export default BusinessOwners;