import React from "react";
import {
  Camera,
  ShieldCheck,
  ScanSearch,
  Link2,
  ClipboardCheck,
  UserCheck,
  Fingerprint,
  Activity,
  ArrowRight,
  AlertTriangle,
  Thermometer,
  Zap,
  MapPin,
  CheckCircle2,
  CircleDot,
} from "lucide-react";

const VISION_MODES = [
  {
    number: "01",
    title: "Anonymous Vision",
    description:
      "People, vehicle and object detection without identifying individuals.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Operational Correlation",
    description:
      "Vision connects with zones, work orders and access events.",
    icon: Link2,
  },
  {
    number: "03",
    title: "Identity-Assisted",
    description:
      "Authorised app, QR, NFC or card signals when necessary.",
    icon: UserCheck,
  },
  {
    number: "04",
    title: "Biometric Identification",
    description:
      "Optional facial recognition where justified and legally appropriate.",
    icon: Fingerprint,
  },
];

const AUDIT_STEPS = [
  {
    number: "01",
    title: "Detected",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "AI Correlates",
    icon: Link2,
  },
  {
    number: "03",
    title: "Finding Created",
    icon: AlertTriangle,
  },
  {
    number: "04",
    title: "Person Assigned",
    icon: UserCheck,
  },
  {
    number: "05",
    title: "Corrective Action",
    icon: ClipboardCheck,
  },
  {
    number: "06",
    title: "Evidence Uploaded",
    icon: Camera,
  },
  {
    number: "07",
    title: "Verified & Closed",
    icon: CheckCircle2,
  },
];

const INTELLIGENCE_SCORES = [
  {
    label: "Security",
    value: 91,
  },
  {
    label: "Safety",
    value: 84,
  },
  {
    label: "Operations",
    value: 78,
  },
  {
    label: "Energy",
    value: 67,
  },
  {
    label: "Maintenance",
    value: 88,
  },
  {
    label: "Compliance",
    value: 95,
  },
];

const VisionSection = () => {
  return (
    <section className="vision-section" id="vision">

      <div className="vision-container">

        <div className="vision-header">

          <div className="eyebrow">
            <span />
            BIZOOP VISION · PHYSICAL BUSINESS INTELLIGENCE
          </div>

          <h2>
            Turn cameras, access points
            <br />
            and sensors into <em>evidence.</em>
          </h2>

          <p>
            Bizoop Vision connects CCTV, access control, QR/NFC/RFID,
            workforce, machines, IoT, utilities, vehicles and inventory
            into one operational intelligence loop.
          </p>

        </div>

        <div className="vision-loop">

          <div className="vision-loop-label">
            <span>THE INTELLIGENCE LOOP</span>
            <strong>From physical signal to business action.</strong>
          </div>

          <div className="vision-loop-track">

            {[
              "Detect",
              "Correlate",
              "Audit",
              "Quantify",
              "Recommend",
              "Act",
            ].map((item, index) => (
              <React.Fragment key={item}>

                <div className="vision-loop-item">
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                </div>

                {index < 5 && (
                  <ArrowRight className="vision-loop-arrow" size={20} />
                )}

              </React.Fragment>
            ))}

          </div>

        </div>

        <div className="vision-modes">

          <div className="vision-section-heading">

            <div>
              <span>PRIVACY BY DESIGN</span>

              <h3>
                Four levels of physical intelligence.
              </h3>
            </div>
          </div>


          <div className="vision-mode-grid">

            {VISION_MODES.map((mode, index) => {
              const Icon = mode.icon;

              return (
                <article
                  className={`vision-mode vision-mode-${index + 1}`}
                  key={mode.title}
                >

                  <div className="vision-mode-top">

                    <span className="vision-mode-number">
                      {mode.number}
                    </span>

                    <Icon size={24} />

                  </div>

                  <h4>{mode.title}</h4>

                  <p>{mode.description}</p>

                  <div className="vision-mode-line">
                    <span />
                  </div>

                </article>
              );
            })}

          </div>

        </div>

        <div className="vision-dashboard">

          {/* Left score panel */}

          <div className="vision-score-panel">

            <div className="vision-card-label">
              PROPERTY INTELLIGENCE SCORE
            </div>

            <div className="vision-score-main">

              <strong>86</strong>

              <div>
                <span>/ 100</span>
                <small>Overall property health</small>
              </div>

            </div>


            <div className="vision-score-list">

              {INTELLIGENCE_SCORES.map((score) => (
                <div
                  className="vision-score-row"
                  key={score.label}
                >

                  <div className="vision-score-meta">
                    <span>{score.label}</span>
                    <strong>{score.value}</strong>
                  </div>

                  <div className="vision-score-track">
                    <span
                      style={{
                        width: `${score.value}%`,
                      }}
                    />
                  </div>

                </div>
              ))}

            </div>

          </div>

          <div className="vision-finding-panel">

            <div className="vision-finding-top">

              <div className="vision-finding-status">
                <i />
                NEEDS REVIEW
              </div>

              <span>FINDING #2048</span>

            </div>


            <div className="vision-finding-title">

              <div className="vision-finding-icon">
                <AlertTriangle size={20} />
              </div>

              <div>
                <span>COLD STORAGE FINDING</span>

                <h3>
                  Door open duration
                </h3>
              </div>

            </div>


            <div className="vision-finding-metrics">

              <div className="vision-finding-metric">

                <div>
                  <span>DOOR OPEN</span>
                  <strong>14 min</strong>
                </div>

                <div className="vision-metric-icon">
                  <Camera size={15} />
                </div>

              </div>


              <div className="vision-finding-metric">

                <div>
                  <span>TEMPERATURE</span>
                  <strong>+6.2°C</strong>
                </div>

                <div className="vision-metric-icon">
                  <Thermometer size={15} />
                </div>

              </div>


              <div className="vision-finding-metric">

                <div>
                  <span>ENERGY VS BASELINE</span>
                  <strong>+18%</strong>
                </div>

                <div className="vision-metric-icon">
                  <Zap size={15} />
                </div>

              </div>

            </div>


            <div className="vision-finding-location">

              <MapPin size={14} />

              <span>
                Cold Store · Camera 04
              </span>

            </div>


            <div className="vision-correlation">

              <div className="vision-correlation-line">

                <CircleDot size={14} />
                <span />

                <CircleDot size={14} />
                <span />

                <CircleDot size={14} />

              </div>

              <p>
                Correlated door + temperature + energy signals
                into one operational finding.
              </p>

            </div>


            <div className="vision-impact">

              <div>
                <span>ESTIMATED IMPACT</span>
                <small>
                  At-risk stock + excess energy
                </small>
              </div>

              <strong>₹3,100</strong>

            </div>


            <div className="vision-action">

              <div className="vision-action-check">
                <CheckCircle2 size={14} />
              </div>

              <div>
                <span>CORRECTIVE ACTION</span>
                <strong>Assigned & evidence requested</strong>
              </div>

              <ArrowRight size={16} />

            </div>

          </div>

        </div>

        <div className="vision-footer">

          <ShieldCheck size={17} />

          <span>
            PHYSICAL SIGNALS
          </span>

          <i />

          <span>
            BUSINESS CONTEXT
          </span>

          <i />

          <span>
            AUDITABLE EVIDENCE
          </span>

          <i />

          <strong>
            ACTION
          </strong>

        </div>

      </div>

    </section>
  );
};

export default VisionSection;