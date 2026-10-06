import React from "react";
import {
  BriefcaseBusiness,
  PackageCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import pencilImage from "../../../assets/images/pencil.jpg";
import readyMade from "../../../assets/images/readymade.png";

const solutions = [
  {
    icon: BriefcaseBusiness,
    title: "Finance & Accounting",
    copy: "Automate financial operations",
    tone: "orange",
  },
  {
    icon: Users,
    title: "HR & People",
    copy: "Manage your workforce",
    tone: "violet",
  },
  {
    icon: PackageCheck,
    title: "Inventory & Supply Chain",
    copy: "From purchase to delivery",
    tone: "blue",
  },
  {
    icon: TrendingUp,
    title: "Sales & CRM",
    copy: "Turn opportunities into revenue",
    tone: "green",
  },
];

function MiniCard({ icon: Icon, title, copy, tone }) {
  return (
    <article className="mini-card">
      <span className={`icon-box ${tone}`}>
        <Icon />
      </span>

      <p>
        <strong>{title}</strong>
        <small>{copy}</small>
      </p>
    </article>
  );
}

const AboutSection = () => {
  return (
    <section
      id="solutions"
      className="split-section"
      data-reveal
    >

      <div
        className="split-section-bg"
        style={{
          backgroundImage: `url(${pencilImage})`,
        }}
      />
      <div className="split-section-overlay" />
      <div className="split-section-bubble split-section-bubble-one" />
      <div className="split-section-bubble split-section-bubble-two" />
      <div className="split-section-bubble split-section-bubble-three" />

      <div className="split-section-inner container">
        <div className="section-copy" data-reveal>

          <p className="eyebrow">
            Powerful solutions
          </p>

          <h2>
            Ready-made BOS solutions for
            <br />
            <span>the way your business works</span>
          </h2>

          <p className="split-section-description">
            BIZOOP provides ready-to-use Business Operating Systems
            designed for specific industries — giving you the tools
            to manage your business operations from one connected
            platform.
          </p>

          <div className="solution-grid">
            {solutions.map((item) => (
              <MiniCard
                key={item.title}
                {...item}
              />
            ))}
          </div>

        </div>
        <div
          className="performance-wrap"
          data-reveal
        >
          <div className="performance-image-glow" />

          <div className="performance-image-card">
            <img
              src={readyMade}
              alt="BIZOOP business solutions"
              className="performance-image"
            />
          </div>
          <div className="performance-floating-card">
            <span className="performance-floating-dot" />

            <div>
              <strong>Ready to use</strong>
              <small>Built for real businesses</small>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;