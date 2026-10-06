import React, { useEffect, useRef, useState } from "react";
import botLogo from "../../../assets/images/bot.png";

import {
  RiArrowRightUpLine,
  RiTimeLine,
} from "react-icons/ri";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";


const DIGITAL_OFFICE_FEATURES = [
  {
    number: "01",
    title: "People",
    text: "Keep teams, roles and responsibilities connected.",
  },
  {
    number: "02",
    title: "Processes",
    text: "Turn everyday work into structured workflows.",
  },
  {
    number: "03",
    title: "Projects",
    text: "Track work from planning to completion.",
  },
  {
    number: "04",
    title: "Customers",
    text: "Keep bookings, conversations and relationships together.",
  },
  {
    number: "05",
    title: "Operations",
    text: "See what is happening across your business in real time.",
  },
];


const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];


const inspectionData = [
  {
    label: "Document Inspection",
    task: "Assign employee to verify business documents.",
  },
  {
    label: "Invoice Inspection",
    task: "Assign employee to check invoices.",
  },
  {
    label: "Payment Inspection",
    task: "Assign employee to verify payment records.",
  },
  {
    label: "Expense Inspection",
    task: "Assign employee to verify expenses, bills, and receipts.",
  },
  {
    label: "Customer Data Inspection",
    task: "Assign employee to verify customer information.",
  },
  {
    label: "Employee Record Inspection",
    task: "Assign employee to verify employee records.",
  },
  {
    label: "Business Report Inspection",
    task: "Assign employee to review business reports.",
  },
];


const SMART_ACTIONS = [
  {
    text: "Escalate Brand + Web Platform",
    label: "Red",
    color: "red",
  },
  {
    text: "Respond to SEO Content Pack lead",
    label: "High Intent",
    color: "orange",
  },
  {
    text: "Vendor recovery — VWO-2026-0042",
    label: "At Risk",
    color: "warning",
  },
  {
    text: "Trigger e-Sign Nudge — Kabir Anand",
    label: "Onboarding",
    color: "purple",
  },
];

const initialGoals = [
  {
    text: "Clear the Reception queue",
    progress: "1/7",
    percentage: 10,
    completed: false,
  },
  {
    text: "Keep projects healthy",
    progress: "3/5",
    percentage: 10,
    completed: false,
  },
  {
    text: "Vendor work orders on track",
    progress: "1/3",
    percentage: 10,
    completed: false,
  },
  {
    text: "Activate ready onboarding",
    progress: "1/3",
    percentage: 5,
    completed: false,
  },
];


const DigitalOfficeSection = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef(null);
  const [goals, setGoals] = useState(initialGoals);
  const [goalPercentage, setGoalPercentage] = useState(0);
  const [activeGoal, setActiveGoal] = useState(0);

  const TOTAL_SECONDS = 30 * 60;

  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          return TOTAL_SECONDS;
        }

        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const chartData = [
    {
      name: "Time",
      value: timeLeft,
      fill: "var(--brand-green)"
    },
  ];

  useEffect(() => {
    let timer;

    const runGoals = () => {
      setActiveGoal(0);
      setGoalPercentage(0);

      let currentGoal = 0;

      const animateGoal = () => {
        if (currentGoal >= goals.length) {
          // Wait before restarting
          timer = setTimeout(() => {
            runGoals();
          }, 2000);

          return;
        }

        const targetPercentage = goals
          .slice(0, currentGoal + 1)
          .reduce(
            (total, goal) => total + goal.percentage,
            0
          );

        timer = setInterval(() => {
          setGoalPercentage((prev) => {
            if (prev >= targetPercentage) {
              clearInterval(timer);

              currentGoal++;

              setActiveGoal(currentGoal);

              setTimeout(() => {
                animateGoal();
              }, 800);

              return targetPercentage;
            }

            return prev + 1;
          });
        }, 80);
      };

      animateGoal();
    };

    runGoals();

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [goals]);

  const goalChartData = [
    {
      name: "Goals",
      value: goalPercentage,
      fill: "var(--brand-green)",
    },
  ];

  const formattedDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

 
  const scheduledTasks = inspectionData.map(
    (item, index) => ({
      ...item,
      time:
        TIME_SLOTS[index] ||
        "Next Available",
    })
  );


  const typeBotMessage = (item) => {
    setIsTyping(true);
    let index = 0;
    setTypingMessage({
      label: item.label,
      time: item.time,
      task: "",
    });
    clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      index++;
      setTypingMessage({
        label: item.label,
        time: item.time,
        task: item.task.substring(0, index),
      });
      if (index >= item.task.length) {
        clearInterval(
          typingRef.current
        );
        typingRef.current = null;
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            label: item.label,
            time: item.time,
            task: item.task,
          },
        ]);
        setTypingMessage(null);
        setIsTyping(false);
      }
    }, 35);
  };

  const sendMessage = () => {
    const text = message.trim();

    if (!text || isTyping) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: text,
      },
    ]);

    setMessage("");
    const matchedItem =
      scheduledTasks.find((item) => {
        const searchText =
          text.toLowerCase();
        return (
          item.label
            .toLowerCase()
            .includes(searchText) ||
          item.task
            .toLowerCase()
            .includes(searchText)
        );
      });

    if (matchedItem) {

      typeBotMessage(
        matchedItem
      );

    } else {

      typeBotMessage({
        label: "Inspection",
        time: "",
        task:
          "Sorry, I couldn't find a matching inspection task.",
      });

    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }

  };
  return (

    <section
      className="digital-office-section"
      id="digital-office"
    >
      <div className="digital-office-orb digital-office-orb-one" />
      <div className="digital-office-orb digital-office-orb-two" />
      <div className="digital-office-orb digital-office-orb-three" />
      <div className="container digital-office-container">
        <div
          className="digital-office-header"
          data-reveal
        >
          <span className="eyebrow">
            DIGITAL OFFICE
          </span>
          <h2>
            Your digital office for
            <br />
            <span>
              every business.
            </span>
          </h2>
          <p>
            Bring people, processes,
            projects, customers and daily
            operations together in one
            connected workspace.
          </p>
        </div>
        <div className="digital-office-layout">
          {/* =========================
              LEFT SIDE
          ========================= */}

          <div
            className="digital-office-image-wrap"
            data-reveal
          >
            <div className="digital-office-image-glow" />
            <div className="digital-office-image-card">
              <div className="robot-intro">
                <div className="meta">
                  Good morning, JR 👋
                  <span className="date">{formattedDate}</span>
                </div>
                <h1>What would you like to do?</h1>
              </div>
              <div className="robot-section">
                <div className="copilot-status">
                  <span className="copilot-status-dot">
                    <span className="bz-pulse"></span>
                    <span className="copilot-dot"></span>
                  </span>
                  <span className="copilot-status-text">
                    Bizoop Copilot ready
                    <span className="copilot-divider">·</span>
                    <span className="copilot-question">
                      Ask me anything!
                    </span>
                  </span>
                </div>
                <div className="robot-animation speaking">
                  <img
                    src={botLogo}
                    alt="BIZOOP Digital Office"
                    className="digital-office-image"
                  />
                  <span className="robot-eyes"></span>
                  <span className="robot-mouth"></span>
                </div>
              </div>
              <div className="copilot-input-row">
                <input
                  type="text"
                  placeholder="e.g. Escalate the Yuktisaar delay, draft a vendor recovery request…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsChatOpen(true);
                    sendMessage();
                  }}
                  disabled={isTyping}
                  aria-label="Send message"
                >
                  <RiArrowRightUpLine />
                </button>
              </div>
              <div className="smart-actions">
                <div className="smart-actions-header">
                  <span className="smart-actions-star">
                    ✦
                  </span>
                  <span className="smart-actions-title">
                    AI Smart Actions
                  </span>
                  <span className="smart-actions-count">

                    {SMART_ACTIONS.length}
                    {" "}
                    recommendations
                  </span>
                </div>
                <div className="smart-actions-list">
                  {SMART_ACTIONS.map(
                    (action, index) => (
                      <button
                        type="button"
                        className="smart-action-button"
                        key={index}
                      >
                        <span
                          className={`smart-action-dot ${action.color}`}
                        />
                        <span>
                          {action.text}
                        </span>
                        <span
                          className={`smart-action-badge ${action.color}-badge`}
                        >
                          {action.label}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="digital-office-visual-row">
                <div className="next-thirty-card">
                  <div className="next-thirty-header">
                    <div className="next-thirty-title">
                      <RiTimeLine />
                      <span>
                        Next 30 Minutes
                      </span>
                    </div>
                    <p>
                      Stay focused. You've got this.
                    </p>
                  </div>
                  <div className="timer-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        className="timer-radial-chart"
                        cx="50%"
                        cy="50%"
                        innerRadius="72%"
                        outerRadius="100%"
                        barSize={8}
                        startAngle={90}
                        endAngle={-270}
                        data={chartData}
                      >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, TOTAL_SECONDS]}
                          tick={false}
                          axisLine={false}
                        />
                        <RadialBar
                          dataKey="value"
                          cornerRadius={10}
                          background
                          fill="var(--brand-green)"
                          isAnimationActive={false}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>

                    <div className="timer-text">
                      <strong>{formattedTime}</strong>
                      <span>REMAINING</span>
                    </div>
                  </div>
                  {/* TASK */}
                  <h3>
                    TVC Shoot (2 days)
                  </h3>
                </div>
                <div className="goal">
                  <div className="goal-head">
                    <span>
                      Goal for Today
                    </span>
                    <span className="count">
                      {activeGoal > goals.length
                        ? goals.length
                        : Math.min(activeGoal, goals.length)}{" "}
                      of {goals.length}
                    </span>
                  </div>
                  <div className="goal-ring">
                    <div className="goal-ring-background" />
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="72%"
                        outerRadius="100%"
                        barSize={8}
                        startAngle={90}
                        endAngle={-270}
                        data={goalChartData}
                      >
                        <PolarAngleAxis
                          type="number"
                          domain={[0, 100]}
                          angleAxisId={0}
                          tick={false}
                        />
                        <RadialBar
                          angleAxisId={0}
                          fill="var(--brand-green)"
                          dataKey="value"
                          cornerRadius={10}
                          isAnimationActive={false}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="goal-pct">
                      {goalPercentage}%
                    </div>

                  </div>
                  <ul>
                    {goals.map((goal, index) => {
                      const isActive =
                        index < activeGoal;
                      return (
                        <li
                          key={index}
                          className={
                            isActive
                              ? "goal-item active"
                              : "goal-item"
                          }
                        >
                          <label>
                            <input
                              type="checkbox"
                              checked={isActive}
                              readOnly
                            />
                            <span>
                              {goal.text}
                            </span>
                            <em>
                              {goal.progress}
                            </em>
                          </label>
                        </li>
                      );

                    })}
                  </ul>
                </div>
              </div>
           </div>
          </div>
          {/* =========================
              RIGHT CONTENT
          ========================= */}

          <div
            className="digital-office-content"
            data-reveal
          >
            <div className="digital-office-content-intro">
              <span>
                ONE CONNECTED WORKSPACE
              </span>
              <h3>
                Everything your business needs,
                <strong>
                  {" "}
                  in one place.
                </strong>
              </h3>
              <p>
                BIZOOP brings the different
                parts of your business together,
                giving your team one clear place
                to work, collaborate and manage
                everyday operations.
              </p>
            </div>
            {/* =========================
                FEATURES
            ========================= */}

            <div className="digital-office-features">
              {DIGITAL_OFFICE_FEATURES.map(
                (item) => (
                  <article
                    className="digital-office-feature"
                    key={item.number}
                  >
                    <div className="digital-office-feature-number">
                      {item.number}
                    </div>
                    <div className="digital-office-feature-body">
                      <h4>
                        {item.title}
                      </h4>
                      <p>
                        {item.text}
                      </p>
                    </div>
                    <div className="digital-office-feature-arrow">
                      →
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {/* =========================
          BOTTOM WAVE
      ========================= */}

      <div className="digital-office-wave">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M0 90
              C180 30 300 40 450 90
              C620 145 760 155 900 105
              C1060 45 1190 35 1320 75
              C1370 90 1405 95 1440 70
              L1440 180
              L0 180
              Z
            "
          />
        </svg>
      </div>
    </section >

  );
};


export default DigitalOfficeSection;