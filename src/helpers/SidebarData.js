import {
  RiDashboardLine,
  RiBuilding2Line,
  RiUser3Line,
  RiApps2Line,
  RiPriceTag3Line,
  RiBankCardLine,
  RiFileList3Line,
  RiDatabase2Line,
  RiPlug2Line,
  RiCodeSSlashLine,
  RiBarChartBoxLine,
  RiSettings3Line,
  RiShieldUserLine,
  RiLogoutBoxRLine
} from "react-icons/ri";

export const sidebarData = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: RiDashboardLine,
  },

  {
    id: "businesses",
    label: "Businesses",
    path: "/admin/businesses",
    icon: RiBuilding2Line,
  },

  {
    id: "erps",
    label: "ERP Management",
    path: "/admin/erp-management",
    icon: RiApps2Line,
  },

  {
    id: "pricing",
    label: "Pricing & Plans",
    path: "/admin/plans-pricing",
    icon: RiPriceTag3Line,
  },

  {
    id: "subscriptions",
    label: "Subscriptions",
    path: "/admin/subscriptions",
    icon: RiFileList3Line,
  },
  {
    id: "api",
    label: "API Usage",
    path: "/admin/api-usage",
    icon: RiCodeSSlashLine,
  },
  {
    id: "billing",
    label: "Billing & Payments",
    icon: RiBankCardLine,
    children: [
      {
        id: "payments",
        label: "Payments",
        path: "/admin/payments",
      },
      {
        id: "invoices",
        label: "Invoices",
        path: "/admin/invoices",
      },
      {
        id: "transactions",
        label: "Transactions",
        path: "/admin/transactions",
      },
    ],
  }
];

export const sidebarBottomData = [
  {
    id: "profile",
    label: "Admin Profile",
    path: "/admin/profile",
    icon: RiUser3Line,
  },

  {
    id: "logout",
    label: "Logout",
    action: "logout",
    icon: RiLogoutBoxRLine,
  },
];