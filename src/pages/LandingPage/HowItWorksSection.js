import React from "react";
const steps = [
  {
    number: "1",
    title: "Browse Services",
    description:
      "Select category & services.",
  },
  {
    number: "2",
    title: "Create Booking / Enquiry",
    description:
      "Provide location, details, time",
  },
  {
    number: "3",
    title: "System Matches Providers",
    description:
      "Find available providers (ERP /Individuals)",
  },
  {
    number: "4",
    title: "Provider Response / Quote",
    description:
      "Providers send quotes & availability",
  },
  {
    number: "5",
    title: "Customer Selects Provider",
    description:
      "Confirm & makes payment",
  },
  {
    number: "6",
    title: "Service Execution",
    description:
      "Job completed & feedback",
  },
  {
    number: "7",
    title: "Completion & Settlement",
    description:
      "Payments to providers (Platform pays commission if any)",
  },
];
 
const HowItWorks = () => {
  return (
    <section className="service-how-it-works">
      <div className="service-how-container container py-5">
        <div className="service-how-header">
          <div className="service-how-eyebrow">
            SERVICE BOOKING · HOW IT WORKS
          </div>
          <h2>
            Service Booking
          </h2>
          <p>Anyone can book service instantly</p>
        </div>
        <div className="service-timeline">
          {steps.map((step) => (
            <div
              className="service-step"
              key={step.number}
            >
              <div className="service-step-number">
                {step.number}
              </div>
              <div className="service-step-content">
                <h3>
                  {step.title}
                </h3>
                <p>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
 
 
export default HowItWorks;