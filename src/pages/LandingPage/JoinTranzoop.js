import React, { useState } from "react";

const JoinTranzoop = () => {
  return (
    <div className="join-page">
      <div className="join-container container">
        <section className="join-header">
          <p className="join-eyebrow">
            TWO CATEGORIES, TWO WAYS TO JOIN
          </p>
          <h1>
            WHICH SIDE OF TRANZOOP ARE YOU ON?
          </h1>
        </section>
        <section className="join-cards">
          <div className="join-card">
            <div className="card-content">
 
              <span className="card-label">
                SERVICE BOOKING
              </span>
 
              <h2>
                Become a Service Provider
              </h2>
 
              <p className="card-description">
                Get listed under Service Booking. Receive leads,
                take bookings and get paid — for transport,
                warehousing, workshops and more.
              </p>
 
              <ul className="card-features">
                <li>Free registration, verified in 48 hours</li>
                <li>Leads & bookings in one queue</li>
                <li>Fixed settlement cycle</li>
              </ul>
 
              <button className="join-button">
                Join as Provider
              </button>
 
            </div>
          </div>
          <div className="join-card">
            <div className="card-content">
 
              <span className="card-label bos-head">
                BOS
              </span>
 
              <h2>
                Become a BOS Partner
              </h2>
 
              <p className="card-description">
                Subscribe to a ready-made BOS, run your
                operations on it, and optionally sell it onward
                as a partner reseller.
              </p>
 
              <ul className="card-features">
                <li>14-day free trial, no setup cost</li>
                <li>Configure & invite your team same day</li>
                <li>Partner revenue share available</li>
              </ul>
 
              <button className="join-button">
                Join as Partner
              </button>
 
            </div>
          </div>
 
        </section>
        <section className="dashboard-preview">
          <div className="dashboard-title">
            PROVIDER DASHBOARD — PREVIEW
          </div>
          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span className="stat-label">
                New leads this week
              </span>
              <strong className="stat-value">
                38
              </strong>
            </div>
            <div className="dashboard-stat">
              <span className="stat-label">
                Active bookings
              </span>
              <strong className="stat-value">
                12
              </strong>
            </div>
            <div className="dashboard-stat">
              <span className="stat-label">
                Fleet utilisation
              </span>
              <strong className="stat-value">
                81%
              </strong>
            </div>
            <div className="dashboard-stat">
              <span className="stat-label">
                Next settlement
              </span>
              <strong className="stat-value">
                Fri, 5:00 PM
              </strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
 
export default JoinTranzoop;