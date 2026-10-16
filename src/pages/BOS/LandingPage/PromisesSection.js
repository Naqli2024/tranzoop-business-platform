import {
  Activity,
  Settings2,
  Lightbulb,
  TrendingUp,
  Zap,
  ArrowRight,
  Users,
  BriefcaseBusiness,
  Factory,
  Package,
  WalletCards,
  Check,
  Sparkles,
} from "lucide-react";

const PROMISES = [
  {
    number: "01",
    title: "Know",
    question: "What is happening in my business right now?",
    type: "overview",
    icon: Activity,
    accent: "var(--primary)",
    label: "LIVE OVERVIEW",
  },
  {
    number: "02",
    title: "Control",
    question: "Where are my people, jobs, machines, materials and money?",
    type: "operations",
    icon: Settings2,
    accent: "var(--brand-blue)",
    label: "OPERATIONS",
  },
  {
    number: "03",
    title: "Understand",
    question: "Why did cost, profit or productivity change?",
    type: "analytics",
    icon: Lightbulb,
    accent: "var(--brand-orange)",
    label: "BUSINESS ANALYTICS",
  },
  {
    number: "04",
    title: "Improve",
    question: "Where can cost be reduced or output improved?",
    type: "recommendations",
    icon: TrendingUp,
    accent: "var(--brand-green)",
    label: "AI RECOMMENDATIONS",
  },
  {
    number: "05",
    title: "Act",
    question: "Can Bizoop prepare or execute the fix with permission?",
    type: "action",
    icon: Zap,
    accent: "var(--primary)",
    label: "TAKE ACTION",
  },
];

const OverviewMock = () => (
  <div className="fpp-mock fpp-overview-mock">
    <div className="fpp-mock-heading">
      <span>Live Overview</span>
      <Activity size={11} />
    </div>

    <div className="fpp-stat-row">
      <div>
        <span>Sales</span>
        <strong>₹2,48,000</strong>
        <small>↑ 12%</small>
      </div>

      <div>
        <span>Orders</span>
        <strong>142</strong>
        <small>↑ 8%</small>
      </div>

      <div>
        <span>Customers</span>
        <strong>86</strong>
        <small>↑ 10%</small>
      </div>
    </div>

    <div className="fpp-chart">
      <span className="chart-line" />
      <span className="chart-line chart-line-two" />
    </div>
  </div>
);

const OperationsMock = () => {
  const rows = [
    [Users, "People", "On shift"],
    [BriefcaseBusiness, "Jobs", "In progress"],
    [Factory, "Machines", "Running"],
    [Package, "Materials", "In stock"],
    [WalletCards, "Money", "Balanced"],
  ];

  return (
    <div className="fpp-mock fpp-operations-mock">
      <div className="fpp-mock-heading">
        <span>Operations</span>
        <Settings2 size={11} />
      </div>

      <div className="fpp-operation-list">
        {rows.map(([Icon, name, status]) => (
          <div className="fpp-operation-row" key={name}>
            <Icon size={12} />
            <span>{name}</span>
            <em>{status}</em>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalyticsMock = () => (
  <div className="fpp-mock fpp-analytics-mock">
    <div className="fpp-mock-heading">
      <span>Business Analytics</span>
      <TrendingUp size={11} />
    </div>

    <div className="fpp-analytics-top">
      <div className="fpp-bars">
        <i style={{ height: "28%" }} />
        <i style={{ height: "46%" }} />
        <i style={{ height: "63%" }} />
        <i style={{ height: "82%" }} />
      </div>

      <div className="fpp-profit">
        <span>Profit Margin</span>
        <strong>18.4%</strong>
        <small>↑ 4.2%</small>
      </div>
    </div>

    <div className="fpp-donut-row">
      <div className="fpp-donut" />

      <div className="fpp-legend">
        <span>Revenue <b>62%</b></span>
        <span>Cost <b>23%</b></span>
        <span>Profit <b>15%</b></span>
      </div>
    </div>
  </div>
);

const RecommendationsMock = () => (
  <div className="fpp-mock fpp-recommendation-mock">
    <div className="fpp-mock-heading">
      <span>
        <Sparkles size={12} />
        AI Recommendations
      </span>
    </div>

    <div className="fpp-recommendation">
      <span>◆</span>
      <div>
        <strong>Reduce material waste</strong>
        <small>Estimated 8% savings</small>
      </div>
      <em>High</em>
    </div>

    <div className="fpp-recommendation">
      <span>◆</span>
      <div>
        <strong>Optimize machine usage</strong>
        <small>+12% estimated output</small>
      </div>
      <em>Medium</em>
    </div>

    <div className="fpp-recommendation">
      <span>◆</span>
      <div>
        <strong>Negotiate supplier rates</strong>
        <small>₹45,000 / month</small>
      </div>
      <em>Medium</em>
    </div>
  </div>
);

const ActionMock = () => (
  <div className="fpp-mock fpp-action-mock">
    <div className="fpp-mock-heading">
      <span>Take Action</span>
      <Zap size={11} />
    </div>

    <div className="fpp-action-list">
      {[
        "Create work order",
        "Purchase materials",
        "Notify team",
        "Execute and track",
      ].map((item) => (
        <div key={item}>
          <Check size={11} />
          <span>{item}</span>
        </div>
      ))}
    </div>

    <button className="fpp-execute">
      <Zap size={11} />
      Execute
    </button>
  </div>
);

const Mockup = ({ type }) => {
  switch (type) {
    case "overview":
      return <OverviewMock />;

    case "operations":
      return <OperationsMock />;

    case "analytics":
      return <AnalyticsMock />;

    case "recommendations":
      return <RecommendationsMock />;

    case "action":
      return <ActionMock />;

    default:
      return null;
  }
};

const PromisesSection = () => {
  return (
    <section className="fpp-section" id="product-promises" data-reveal>
      <div className="fpp-container">

        {/* Header */}
        <div className="fpp-header">
          <span className="fpp-eyebrow">
            THE FIVE PRODUCT PROMISES
          </span>

          <h2 className="fpp-title">
            Record <span>→</span> Understand <span>→</span> Predict
            <br className="fpp-desktop-break" />
            <span>→</span> Recommend <span>→</span>{" "}
            <strong>Act.</strong>
          </h2>

          <p className="fpp-description">
            Bizoop is not another ERP with a chatbot bolted on. It’s an
            operating system that answers five questions in order — and gets
            more capable at each stage as it earns your trust.
          </p>

          <div className="fpp-hand-note">
            Smarter
            <br />
            Business
            <br />
            Decisions
            <ArrowRight />
          </div>
        </div>

        {/* Promise flow */}
        <div className="fpp-flow">
          {PROMISES.map((promise, index) => {
            const Icon = promise.icon;

            return (
              <div
                className={`fpp-item fpp-item-${index + 1}`}
                key={promise.number}
                style={{
                  "--promise-accent": promise.accent,
                }}
              >
                {/* Visual */}
                <div className="fpp-visual">

                  <div className="fpp-glow" />

                  <Mockup type={promise.type} />


                </div>
                <div className="fpp-icon">
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                {/* Arrow */}
                {index < PROMISES.length - 1 && (
                  <div className="fpp-connector">
                    <ArrowRight size={18} />
                  </div>
                )}

                {/* Content */}
                <div className="fpp-content">
                  <span className="fpp-number">
                    {promise.number}
                  </span>

                  <h3>{promise.title}</h3>

                  <p>{promise.question}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom progression */}
        <div className="fpp-progress">
          <span />
          <i />
          <i />
          <i />
          <i />
          <span />
        </div>

      </div>
    </section>
  );
};

export default PromisesSection;