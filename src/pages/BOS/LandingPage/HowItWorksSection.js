import {ArrowRight } from "lucide-react";

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Choose your BOS",
    text:
      "Pick the Business Operating System built for your industry — Tyre, Transport or Tailor.",
  },
  {
    number: "02",
    title: "Pick a plan",
    text:
      "Start with a 14-day free trial, then choose the plan that fits your business as you grow.",
  },
  {
    number: "03",
    title: "Onboard your business",
    text:
      "Add your team, locations and business information — most businesses can get started within a day.",
  },
  {
    number: "04",
    title: "Start operating",
    text:
      "Manage customers, inventory, jobs, billing and daily operations from one connected platform.",
  },
];

const HowItWorksSection = () => {
  return (
<section id="how-it-works" className="industry-band ">
  <div className="container">

    <div className="how-it-works-header" data-reveal>
      <p className="eyebrow">How it works</p>

      <h2>
        From sign-up
        <br />
        <span>to live in a day.</span>
      </h2>

      <p>
        Choose your industry, configure your business and start operating
        with BIZOOP — without complicated implementation.
      </p>
      <div className="orbit-object" aria-hidden="true"><span /><i /></div>
    </div>

    <div className="how-it-works-grid">
      {HOW_IT_WORKS.map((step, index) => (
        <article
          className={`how-it-works-step reveal reveal-delay-${index + 1}`}
          key={step.number}
        >
          <div className="how-step-top">
            <span className="how-step-number">
              {step.number}
            </span>

            {index < HOW_IT_WORKS.length - 1 && (
              <span className="how-step-line" />
            )}
          </div>

          <div className="how-step-content">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </article>
      ))}
    </div>

    <div className="how-it-works-footer" data-reveal>
      <span>ONE CONNECTED PLATFORM</span>

      <div className="how-footer-line" />

      <strong>
        Ready to run your business?
      </strong>

      <ArrowRight />
    </div>

  </div>
</section>
  );
};

export default HowItWorksSection;
