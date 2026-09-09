import React, { useEffect, useRef } from "react";
import {
  RiTruckLine,
  RiSettings3Line,
  RiScissors2Line,
  RiStore3Line,
} from "react-icons/ri";
import "../assets/styles/auth.css";

const Loader = ({ fullScreen = true, text = "Loading" }) => {
  const erpIcons = [
    RiTruckLine,
    RiSettings3Line,
    RiScissors2Line,
    RiStore3Line,
  ];

  // Extra copies act as buffer so icons are always available off-screen
  const icons = [...erpIcons, ...erpIcons, ...erpIcons, ...erpIcons];

  const trackRef = useRef(null);
  const iconRefs = useRef([]);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);

  const SPEED = 80; // px per second
  const MAX_SCALE = 1.55;
  const MIN_SCALE = 0.82;
  const FALLOFF = 100; // px — how wide the "zoom zone" is around center

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();

    const tick = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const trackWidth = track.scrollWidth / 2; // half = one full icon-set width
      offsetRef.current -= SPEED * dt;

      // Loop seamlessly once we've scrolled exactly one set's width
      if (Math.abs(offsetRef.current) >= trackWidth) {
        offsetRef.current += trackWidth;
      }

      track.style.transform = `translateX(${offsetRef.current}px)`;

      // Find track's container center in viewport space
      const containerRect = track.parentElement.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      iconRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const iconCenter = rect.left + rect.width / 2;
        const dist = Math.abs(iconCenter - centerX);

        const t = Math.min(dist / FALLOFF, 1);
        const scale = MAX_SCALE - t * (MAX_SCALE - MIN_SCALE);
        const opacity = 1 - t * 0.55;

        el.style.transform = `scale(${scale})`;
        el.style.opacity = opacity;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className={`app-loader ${
        fullScreen ? "app-loader-fullscreen" : "app-loader-inline"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="app-loader-modal">
        <div className="app-loader-track">
          <div className="app-loader-icons" ref={trackRef}>
            {icons.map((Icon, index) => (
              <div
                className="app-loader-icon"
                key={index}
                ref={(el) => (iconRefs.current[index] = el)}
                aria-hidden="true"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

        <div className="app-loader-text">
          <span>{text}</span>
          <span className="app-loader-dots">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;