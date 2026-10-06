import {
  ArrowRight,
  Bot,
  Check,
  Mic,
  Sparkles,
  MessageSquare,
  Languages,
  Zap,
  BarChart3,
  Play,
} from "lucide-react";
import { useRef } from "react";

const COPILOT_ACTIONS = [
  {
    command: "Create GRN",
    question: "Did the material arrive?",
    icon: "📦",
    accent: "blue",
  },
  {
    command: "Create debit note",
    question: "Did you return anything to the supplier?",
    icon: "↩",
    accent: "orange",
  },
  {
    command: "Production variance",
    question: "Did you produce less than planned? What happened?",
    icon: "⚙",
    accent: "purple",
  },
  {
    command: "Post maintenance expense",
    question: "What was repaired, and how much did it cost?",
    icon: "🔧",
    accent: "green",
  },
  {
    command: "Allocate labour cost",
    question: "Who worked on this job, and for how long?",
    icon: "👥",
    accent: "pink",
  },
];

const COPILOT_ROLES = [
  "Owner",
  "Production Manager",
  "Operator",
  "Accountant",
  "Salesperson",
  "Mechanic / Technician",
];

function TiltCard({ children, className = "", ...props }) {
  const ref = useRef(null);
  const onMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -7}deg`);
    node.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--tilt-x", "0deg");
    ref.current?.style.setProperty("--tilt-y", "0deg");
  };
  return <div ref={ref} className={`tilt-card ${className}`} onPointerMove={onMove} onPointerLeave={reset} {...props}>{children}</div>;
}

const CopilotSection = () => {
  return (
    <section className="copilot-section" id="copilot">
      <div className="copilot-orb copilot-orb-one" />
      <div className="copilot-orb copilot-orb-two" />

      <div className="container">
        <div className="copilot-header" data-reveal>

          <div className="eyebrow">
            <span className="eyebrow-icon me-2">
              <Sparkles size={13} />
            </span>
            BIZOOP COPILOT
            <span className="eyebrow-line" />
            AI-POWERED ERP
          </div>

          <h2>
            Talk to your ERP.
            <br />
            <span>Let Copilot do the rest.</span>
          </h2>

          <p>
            Employees don't learn menus — Bizoop learns how the business
            already speaks. Say what happened in English, Tamil, Hindi,
            or mixed language, and Copilot drafts the correct transaction.
          </p>
        </div>

        <div className="copilot-interface">
          <div className="copilot-actions" data-reveal>

            <div className="copilot-actions-heading">
              <div className="section-kicker">
                BUSINESS LANGUAGE
                <ArrowRight size={13} />
                TRANSACTION
              </div>

              <h3>
                One sentence can trigger
                <span> the right business action.</span>
              </h3>

              <p>
                Copilot understands the event, identifies the intent,
                and prepares the appropriate ERP transaction.
              </p>
            </div>

            <div className="copilot-action-list">

              {COPILOT_ACTIONS.map((item, index) => (
                <article
                  className={`copilot-action copilot-action-${item.accent}`}
                  key={item.command}
                >

                  <div className="copilot-action-number">
                    0{index + 1}
                  </div>

                  <div className="copilot-action-icon">
                    {item.icon}
                  </div>

                  <div className="copilot-action-content">
                    <strong>{item.command}</strong>
                    <ArrowRight className="copilot-action-arrow" />
                    <span>{item.question}</span>
                  </div>
                </article>
              ))}

            </div>
          </div>
          <TiltCard className="video-card" data-reveal>
          <strong>Learn Bizooop<br />in 2 minutes</strong>
          <div className="video-screen"><BarChart3 /><span /><span /><span /></div>
          <button size="icon" className="play-button" aria-label="Play product overview"><Play /></button>
        </TiltCard>
        </div>

        {/* Roles */}
        <div className="copilot-roles" data-reveal>

          <div className="copilot-roles-label">
            <span>ONE COPILOT</span>
            <strong>For everyone in the business.</strong>
          </div>

          <div className="copilot-role-list">
            {COPILOT_ROLES.map((role) => (
              <span key={role}>
                <i />
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="copilot-bottom" data-reveal>
          <div className="copilot-bottom-line" />

          <div className="copilot-bottom-copy">
            <span>LESS TRAINING</span>
            <span>FEWER MENUS</span>
            <span>FASTER ACTIONS</span>
          </div>

          <div className="copilot-bottom-line" />
        </div>

      </div>
    </section>
  );
};

export default CopilotSection;