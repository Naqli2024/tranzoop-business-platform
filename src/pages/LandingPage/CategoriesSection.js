import React from "react";
import {
  Truck,
  Warehouse,
  Box,
  Flag,
  FileText,
  Globe2,
  Wrench,
  CircleDot,
  Fuel,
  Shield,
  MapPin,
  Grid3X3,
  Home,
  BarChart3,
  BriefcaseBusiness,
  Receipt,
  WalletCards,
  Users,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const serviceItems = [
  {
    title: "Transport Booking",
    icon: Truck,
  },
  {
    title: "Warehousing",
    icon: Warehouse,
  },
  {
    title: "Parcel & Movers",
    icon: Box,
  },
  {
    title: "Crane & Equipment",
    icon: Flag,
  },
  {
    title: "Customs Clearance",
    icon: FileText,
  },
  {
    title: "Freight Forwarders",
    icon: Globe2,
  },
  {
    title: "Mechanics & Workshops",
    icon: Wrench,
  },
  {
    title: "Tyre Shops",
    icon: CircleDot,
  },
  {
    title: "Fuel Stations",
    icon: Fuel,
  },
  {
    title: "Insurance",
    icon: Shield,
  },
  {
    title: "GPS Installation",
    icon: MapPin,
  },
  {
    title: "More services",
    icon: Grid3X3,
  },
];

const bosItems = [
  {
    title: "Transport BOS",
    description: "Fleet & trip mgmt.",
    icon: Truck,
  },
  {
    title: "Warehouse BOS",
    description: "WMS & inventory",
    icon: Home,
  },
  {
    title: "Export/Import BOS",
    description: "Docs & compliance",
    icon: Globe2,
  },
  {
    title: "Workshop BOS",
    description: "Job cards & billing",
    icon: Wrench,
  },
  {
    title: "Tyre Shop BOS",
    description: "POS & inventory",
    icon: CircleDot,
  },
  {
    title: "Logistics Co. BOS",
    description: "Accounting, HR, CRM",
    icon: BarChart3,
  },
  {
    title: "Accounting & GST",
    description: "",
    icon: FileText,
  },
  {
    title: "Payroll & HRMS",
    description: "",
    icon: WalletCards,
  },
  {
    title: "12 more BOS apps",
    description: "",
    icon: Grid3X3,
  },
];

function ServiceGrid() {
  return (
    <div className="marketplace-grid service-grid">
      {serviceItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div className="marketplace-grid-item" key={item.title}>
            <Icon className="service-icon" size={19} strokeWidth={1.7} />

            <span>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
}

function BosGrid() {
  return (
    <div className="marketplace-grid bos-grid">
      {bosItems.map((item) => {
        const Icon = item.icon;

        return (
          <div className="marketplace-grid-item" key={item.title}>
            <Icon className="bos-icon" size={19} strokeWidth={1.7} />

            <div className="bos-item-content">
              <span>{item.title}</span>

              {item.description && (
                <small>{item.description}</small>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CategoriesSection() {
  const navigate = useNavigate();

  return (
    <section className="marketplace-section py-5" id="services">
      <div className="marketplace-container container">
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            THE MARKETPLACE
          </div>
          <h2>
            TWO CATEGORIES. ONE MARKETPLACE.
          </h2>
          <p>
            Everything on TranZoop sits under one of two categories —
            services you book on demand, and the software that runs
            the businesses behind them.
          </p>
        </div>

        <div className="marketplace-cards">
          <div className="marketplace-card service-card">
            <div className="card-top">
              <div>
                <div className="category-label">
                  CATEGORY 01
                </div>
                <h3>
                  Service Booking
                </h3>
                <p>
                  Book logistics & business services instantly
                  <br className="desktop-break" />
                  from verified providers.
                </p>
              </div>
              <button className="view-all-button service-view">
                View all →
              </button>
            </div>
            <ServiceGrid />
            <div className="card-footer service-footer">
              <button className="primary-action">
                Book a Service Now →
              </button>
            </div>
          </div>
          <div className="marketplace-card bos-card">
            <div className="card-top">
              <div>
                <div className="category-label">
                  CATEGORY 02
                </div>
                <h3>
                  BOS
                </h3>
                <div className="bos-subtitle">
                  BUSINESS OPERATING SOLUTION
                </div>
                <p>
                  Run your business with industry-specific ERP
                  <br className="desktop-break" />
                  software.
                </p>
              </div>
              <button className="view-all-button bos-view">
                View all →
              </button>
            </div>
            <BosGrid />
            <div className="bos-benefits">
              <span>
                14-day free trial
              </span>
              <span>
                No setup cost
              </span>
              <span>
                Scales with your business
              </span>
            </div>
            <div className="card-footer bos-footer">
              <button className="bos-action" onClick={()=> navigate('/our-products')}>
                Explore BOS Solutions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;