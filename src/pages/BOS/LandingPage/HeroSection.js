import "../../../assets/styles/landingPage.css";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Box,
  BriefcaseBusiness,
  Headphones,
  PackageCheck,
  Play,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import "../../../assets/styles/landingPage.css";
import BusinessConsole from "./BusinessConsole";

const HeroSection = () => {
  function Stat({ icon, value, label, tone }) {
    return (
      <div className="stat">
        <span className={`icon-box ${tone}`}>{icon}</span>
        <p>
          <strong>{value}</strong>
          <small>{label}</small>
        </p>
      </div>
    );
  }

  function TiltCard({ children, className = "", ...props }) {
    const ref = useRef(null);
    const onMove = (event) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      node.style.setProperty(
        "--tilt-x",
        `${((event.clientY - rect.top) / rect.height - 0.5) * -7}deg`,
      );
      node.style.setProperty(
        "--tilt-y",
        `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`,
      );
    };
    const reset = () => {
      ref.current?.style.setProperty("--tilt-x", "0deg");
      ref.current?.style.setProperty("--tilt-y", "0deg");
    };
    return (
      <div
        ref={ref}
        className={`tilt-card ${className}`}
        onPointerMove={onMove}
        onPointerLeave={reset}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div>
      <section id="top" className="hero container">
        <div className="digital-office-orb digital-office-orb-one" />
        <div className="digital-office-orb digital-office-orb-two" />
        <div className="digital-office-orb digital-office-orb-three" />
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">All-in-one platform</p>
          <h1>
            A business operating system,
            <br />
            uniquely built for every business.
            <br />
            <span>
              — with easy IoT integration and seamless device control.
            </span>
          </h1>
          <p>
            Run, grow, and scale your business with a single platform that
            connects people, processes, and data.
          </p>
          <div className="button-row">
            <button className="pill-button primary-button">
              Get Started <ArrowRight size={15} />
            </button>
            <button variant="outline" className="pill-button watch-button">
              <Play size={15} /> Watch Video
            </button>
          </div>
        </div>
        <TiltCard className="hero-visual">
          <div className="ambient-shape shape-one" />
          <div className="ambient-shape shape-two" />
          <BusinessConsole />
          <div className="hand-note">
            <div className="hand-note-text">
              Smarter
              <br />
              Business
              <br />
              Operations
            </div>

            <svg
              className="hand-note-arrow"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M82 12
       C94 28, 91 51, 76 67
       C63 81, 44 87, 25 82"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M25 82 L37 72"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M25 82 L39 90"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* small imperfect secondary stroke */}
              <path
                d="M83 13
       C93 29, 89 49, 75 65"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.35"
              />
            </svg>
          </div>
        </TiltCard>
      </section>

      <section className="stats container" data-reveal>
        <Stat
          icon={<Users />}
          value="6,200+"
          label="Active Users"
          tone="violet"
        />
        <Stat icon={<Box />} value="8" label="Countries (Live)" tone="blue" />
        {/* <Stat
          icon={<ShieldCheck />}
          value="99.9%"
          label="Uptime"
          tone="green"
        /> */}
        <Stat
          icon={<Headphones />}
          value="24/7"
          label="Support"
          tone="orange"
        />
        <Stat
          icon={<BriefcaseBusiness />}
          value="Finance"
          label="Automate financial operations"
          tone="orange"
        />
        <Stat
          icon={<PackageCheck />}
          value="Inventory"
          label="From purchase to delivery"
          tone="blue"
        />
        <Stat
          icon={<TrendingUp />}
          value="Sales & CRM"
          label="Turn opportunities into revenue"
          tone="green"
        />
      </section>
    </div>
  );
};

export default HeroSection;
