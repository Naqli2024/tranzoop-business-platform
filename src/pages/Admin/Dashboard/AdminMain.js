import React, { useContext, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  RiMenuFoldLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import "../../../assets/styles/adminMain.css";
import { sidebarBottomData, sidebarData } from "../../../helpers/SidebarData";
import { ThemeContext } from "../../../helpers/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import ConfirmDialog from "../../../components/ConfirmDialog";

const AdminMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  // Actual logout
  const confirmLogout = () => {
    localStorage.removeItem("adminToken");

    setShowLogoutConfirm(false);

    navigate("/login");
  };

    const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const isChildActive = (children = []) => {
    return children.some((item) => location.pathname.startsWith(item.path));
  };

  return (
    <>
    <div className="admin-layout">
      <aside
        className={`admin-sidebar ${sidebarOpen ? "is-open" : "is-collapsed"}`}
      >
        <div className="admin-sidebar-header">
          <div className="admin-logo" onClick={() => navigate("/admin")}>
            <div className="header-logo">TRANZOOP</div>

            <div className="admin-logo-subtitle">Marketplace Admin</div>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="admin-profile-card">
          <div className="admin-profile-avatar">A</div>

          {sidebarOpen && (
            <div className="admin-profile-info">
              <strong>Administrator</strong>
              <span>Super Admin</span>
            </div>
          )}
        </div>

        {/* NAVIGATION */}

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-label">MANAGEMENT</div>

          {sidebarData.map((item) => {
            const Icon = item.icon;

            const hasChildren =
              Array.isArray(item.children) && item.children.length > 0;

            const childActive = hasChildren
              ? isChildActive(item.children)
              : false;

            const menuOpen = openMenus[item.id] || childActive;

            if (hasChildren) {
              return (
                <div className="admin-nav-group" key={item.id}>
                  <button
                    type="button"
                    className={`admin-nav-item ${
                      childActive ? "is-parent-active" : ""
                    }`}
                    onClick={() => toggleMenu(item.id)}
                  >
                    <span className="admin-nav-left">
                      <Icon className="admin-nav-icon" />

                      {sidebarOpen && (
                        <span className="admin-nav-text">{item.label}</span>
                      )}
                    </span>

                    {sidebarOpen && (
                      <RiArrowDownSLine
                        className={`admin-nav-arrow ${
                          menuOpen ? "is-open" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* CHILDREN */}

                  {sidebarOpen && menuOpen && (
                    <div className="admin-submenu">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          className={({ isActive }) =>
                            `admin-submenu-item ${isActive ? "is-active" : ""}`
                          }
                        >
                          <span className="admin-submenu-dot" />

                          <span>{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/admin"}
                className={
                  ({ isActive }) => 
                    `admin-nav-item ${isActive ? "is-active" : ""}
                    ${!sidebarOpen ? 'no-left-border' : ''}`
                }
              >
                <span className="admin-nav-left">
                  <Icon className="admin-nav-icon" />

                  {sidebarOpen && (
                    <span className="admin-nav-text">{item.label}</span>
                  )}
                </span>

                {sidebarOpen && (
                  <RiArrowRightSLine className="admin-nav-arrow-right" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* BOTTOM */}

        <div className="admin-sidebar-bottom">
          {sidebarBottomData.map((item) => {
            const Icon = item.icon;

            if (item.action === "logout") {
              return (
                <button
                  key={item.id}
                  type="button"
                  className="admin-nav-item admin-logout"
                  onClick={handleLogout}
                >
                  <span className="admin-nav-left">
                    <Icon className="admin-nav-icon" />

                    {sidebarOpen && (
                      <span className="admin-nav-text">{item.label}</span>
                    )}
                  </span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `admin-nav-item ${isActive ? "is-active" : ""}`
                }
              >
                <span className="admin-nav-left">
                  <Icon className="admin-nav-icon" />

                  {sidebarOpen && (
                    <span className="admin-nav-text">{item.label}</span>
                  )}
                </span>
              </NavLink>
            );
          })}
        </div>
      </aside>

      <div
        className={`admin-content-wrapper ${
          sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
        }`}
      >
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-button"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <RiMenuFoldLine />
            </button>

            <div className="admin-page-context">
              <span>TRANZOOP</span>
              <strong>Marketplace Admin</strong>
            </div>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-topbar-user">
              <div className="dark-light-theme-toggle me-3">
                <div
                  className={`dark-light-theme-btn ${theme === "dark" ? "active" : ""}`}
                  onClick={toggleTheme}
                  role="button"
                  tabIndex={0}
                  aria-label="Switch to dark theme"
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && toggleTheme()
                  }
                >
                  <MdOutlineDarkMode />
                </div>
                <div
                  className={`dark-light-theme-btn ${theme === "light" ? "active" : ""}`}
                  onClick={toggleTheme}
                  role="button"
                  tabIndex={0}
                  aria-label="Switch to light theme"
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && toggleTheme()
                  }
                >
                  <MdOutlineLightMode />
                </div>
              </div>
              <div className="admin-topbar-avatar">A</div>
              <div className="admin-topbar-user-info">
                <strong>Administrator</strong>
                <span>Super Admin</span>
              </div>
            </div>
          </div>
        </header>
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
          <ConfirmDialog
        open={showLogoutConfirm}
        title="Logout?"
        message="Are you sure you want to logout from the TRANZOOP Marketplace Admin panel?"
        confirmLabel="Logout"
        tone="danger"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
};

export default AdminMain;
