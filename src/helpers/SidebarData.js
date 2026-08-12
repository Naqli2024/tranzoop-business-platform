import {
  RiDashboardLine,
  RiGroupLine,
  RiUser3Line,
  RiTruckLine,
  RiShoppingCartLine,
  RiShoppingBasketLine,
  RiFlaskLine,
  RiArchiveLine,
  RiInboxArchiveLine,
  RiShipLine,
  RiBox3Line,
  RiMapPinLine,
  RiWallet3Line,
  RiReceiptLine,
  RiLineChartLine,
} from "react-icons/ri";

export const seaFoodItems = [
  {
    path: "dashboard",
    icon: <RiDashboardLine size={15} />,
    label: "Dashboard",
  },
  {
    path: "pos",
    icon: <RiShoppingCartLine size={15} />,
    label: "POS",
  },
  {
    path: "customers",
    icon: <RiGroupLine size={15} />,
    label: "Customers",
  },
  {
    path: "suppliers",
    icon: <RiUser3Line size={15} />,
    label: "Suppliers",
  },
  {
    path: "transporters",
    icon: <RiTruckLine size={15} />,
    label: "Transporters",
  },
  {
    path: "purchase",
    icon: <RiShoppingBasketLine size={15} />,
    label: "Purchase",
  },
  {
    path: "sales",
    icon: <RiShoppingCartLine size={15} />,
    label: "Sales",
  },
  {
    path: "qc-inspection",
    icon: <RiFlaskLine size={15} />,
    label: "QC",
  },
  {
    path: "inventory",
    icon: <RiArchiveLine size={15} />,
    label: "Inventory",
  },
  {
    path: "packing",
    icon: <RiBox3Line size={15} />,
    label: "Packing",
  },
  {
    path: "shipments",
    icon: <RiShipLine size={15} />,
    label: "Shipments",
  },
  {
    path: "tracking",
    icon: <RiMapPinLine size={15} />,
    label: "Tracking",
  },
  {
    path: "payments",
    icon: <RiWallet3Line size={15} />,
    label: "Payments",
  },
  {
    path: "invoices",
    icon: <RiReceiptLine size={15} />,
    label: "Invoices",
  },
  {
    path: "ledger",
    icon: <RiLineChartLine size={15} />,
    label: "P & L",
  },
];