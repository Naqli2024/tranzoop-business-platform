import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SCENARIOS = [
  {
    who: "Registered WhatsApp · Supervisor",
    text: "Morning shift M4 production 4,850. Reject 92. Stopped 35 mins waiting material.",
    fields: [
      ["Machine", "M4"],
      ["Production", "4,850"],
      ["Reject", "92"],
      ["Downtime", "35 min"],
      ["Reason", "Waiting for material"],
    ],
    event: "PRODUCTION_RECORDED · DOWNTIME_REASON_ADDED",
  },
  {
    who: "Voice note · Owner",
    text: "Customer ABC paid ₹25,000 by UPI.",
    fields: [
      ["Customer", "ABC"],
      ["Amount", "₹25,000"],
      ["Mode", "UPI"],
      ["Type", "Draft receipt"],
    ],
    event: "PAYMENT_RECEIVED",
  },
  {
    who: "Typed update · Technician",
    text: "Bearing changed on Machine 7; cost ₹4,800.",
    fields: [
      ["Machine", "M7"],
      ["Work", "Bearing change"],
      ["Cost", "₹4,800"],
      ["Type", "Maintenance + Expense"],
    ],
    event: "MAINTENANCE_REPORTED · EXPENSE_RECORDED",
  },
  {
    who: "Mixed-language · Operator",
    text: "Machine 4-la today 1,250 pieces production. 32 reject. Two hours current problem nala machine stop.",
    fields: [
      ["Machine", "M4"],
      ["Production", "1,250"],
      ["Reject", "32"],
      ["Downtime", "2 hrs"],
      ["Reason", "Power issue"],
    ],
    event: "PRODUCTION_RECORDED · MACHINE_STOPPED",
  },
];

const BusinessConsole = () => {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [showEvent, setShowEvent] = useState(false);

  const timers = useRef([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => {
      clearTimeout(timer);
      clearInterval(timer);
    });

    timers.current = [];
  }, []);

  useEffect(() => {
    clearTimers();

    setTyped("");
    setShowFields(false);
    setShowEvent(false);

    const scenario = SCENARIOS[index];
    let charIndex = 0;

    const typingTimer = setInterval(() => {
      charIndex++;

      setTyped(
        scenario.text.slice(0, charIndex)
      );

      if (charIndex >= scenario.text.length) {
        clearInterval(typingTimer);

        const fieldsTimer = setTimeout(() => {
          setShowFields(true);

          const eventTimer = setTimeout(() => {
            setShowEvent(true);

            const nextTimer = setTimeout(() => {
              setIndex(
                (current) =>
                  (current + 1) % SCENARIOS.length
              );
            }, 3200);

            timers.current.push(nextTimer);
          }, 550);

          timers.current.push(eventTimer);
        }, 400);

        timers.current.push(fieldsTimer);
      }
    }, 22);

    timers.current.push(typingTimer);

    return clearTimers;
  }, [index, clearTimers]);

  const scenario = SCENARIOS[index];

  return (
    <div className="hero-business-console">

      {/* Console Header */}
      <div className="hero-console-bar">

        <div className="hero-console-status">
          <span className="hero-console-dot red" />
          <span className="hero-console-dot amber" />
          <span className="hero-console-dot green" />
        </div>

        <div className="hero-console-title">
          BIZOOP · BUSINESS INTELLIGENCE
        </div>

        <div className="hero-console-live">
          <span />
          LIVE
        </div>

      </div>

      {/* Console Body */}
      <div className="hero-console-body">

        <div className="hero-console-label">
          TALK TO YOUR BUSINESS
        </div>

        <div className="hero-console-message">

          <div className="hero-console-who">
            {scenario.who}
          </div>

          <div className="hero-console-text">
            {typed}

            {typed.length < scenario.text.length && (
              <span className="hero-console-cursor">
                ▌
              </span>
            )}
          </div>

        </div>

        {/* Extracted Data */}
        <div
          className={`hero-console-fields ${
            showFields ? "show" : ""
          }`}
        >
          {scenario.fields.map(([key, value]) => (
            <div
              className="hero-console-field"
              key={key}
            >
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        {/* Event */}
        <div
          className={`hero-console-event ${
            showEvent ? "show" : ""
          }`}
        >
          <span className="event-check">✓</span>
          {scenario.event}
        </div>

      </div>
    </div>
  );
};

export default BusinessConsole;