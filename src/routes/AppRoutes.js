import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../components/Header.js";
import LandingPage from "../pages/LandingPage/LandingPage.js";
import LoginPage from "../pages/Auth/LoginPage.js";
import Pricing from "../pages/BOS/Products/Pricing.js";
import CustomerAccount from "../pages/Auth/CustomerAccount.js";
import Checkout from "../pages/Auth/Checkout.js";
import PaymentSuccess from "../pages/Auth/PaymentSuccess.js";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard.js";
import AdminMain from "../pages/Admin/Dashboard/AdminMain.js";
import Businesses from "../pages/Admin/Businesses/Businesses.js";
import BusinessDetails from "../pages/Admin/Businesses/BusinessDetails.js";
import PricingPlan from "../pages/Admin/PricingPlan/PricingPlan.js";
import Subscriptions from "../pages/Admin/Subscriptions/Subscriptions.js";
import APIUsage from "../pages/Admin/APIUsage/APIUsage.js";
import Payments from "../pages/Admin/Billing&Payments/Payments.js";
import Invoices from "../pages/Admin/Billing&Payments/Invoices.js";
import Transactions from "../pages/Admin/Billing&Payments/Transactions.js";
import Profile from "../pages/Admin/Profile/Profile.js";
import ERPS from "../pages/Admin/ERPS/ERPS.js";
import Products from "../pages/BOS/Products/Products.js";

const AppRoutes = () => {
  const location = useLocation();

  const hideHeaderExactPaths = ["/pricing", "/payment-success"];

  const hideHeaderPrefixPaths = ["/admin"];

  const hideHeader =
    hideHeaderExactPaths.includes(location.pathname) ||
    hideHeaderPrefixPaths.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="our-products" element={<Products />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="signup" element={<CustomerAccount />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment-success" element={<PaymentSuccess />} />

        <Route path="/admin" element={<AdminMain />}>
          <Route index element={<AdminDashboard />} />
          <Route path="businesses" element={<Businesses />} />
          <Route path="businesses/:id" element={<BusinessDetails />} />
          <Route path="erp-management" element={<ERPS/>} />
          <Route path="plans-pricing" element={<PricingPlan />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="api-usage" element={<APIUsage />} />
          <Route path="payments" element={<Payments />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
