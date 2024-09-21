import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
const AdminHeader = ({ setSideBarAdminOpen, sideBarAdminOpen }) => {

  const { user, setUser } = useContext(UserContext);

  const openSidebar = () => {
    if (sideBarAdminOpen) {
      setSideBarAdminOpen(false);
    }
    else {
      setSideBarAdminOpen(true);
    }
  }
  return (

    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box vertical-logo">
              <Link to='/' className="logo logo-dark">
                <img
                  src="https://mehedi.asiandevelopers.com/ambons/assets/images/footer/footer-logo.png"
                  alt="logo"
                />
              </Link>
              <a href="index.html" className="logo logo-light">
                <span className="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src="assets/images/logo-light.png" alt="" height="17" />
                </span>
              </a>
            </div>

            <button type="button"
              className=" btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger d-md-none d-block"
              id="topnav-hamburger-icon" onClick={openSidebar}>
              <span className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span className="d-flex align-items-center">
                  {/* <img className="rounded-circle header-profile-user"
                    src="assets/images/users/avatar-1.jpg" alt="Header Avatar" /> */}
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">
                      {user.first_name + " " + user.last_name}
                    </span>
                    <span className="d-none d-xl-block ms-1 fs-13 user-name-sub-text">Founder</span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                {/* <h6 className="dropdown-header">Welcome Anna!</h6>
                <a className="dropdown-item" href="pages-profile.html"><i
                  className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Profile</span></a>
                <a className="dropdown-item" href="apps-chat.html"><i
                  className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Messages</span></a>
                <a className="dropdown-item" href="apps-tasks-kanban.html"><i
                  className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Taskboard</span></a>
                <a className="dropdown-item" href="pages-faqs.html"><i
                  className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Help</span></a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="pages-profile.html"><i
                  className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Balance : <b>$5971.67</b></span></a>
                <a className="dropdown-item" href="pages-profile-settings.html"><span
                  className="badge bg-success-subtle text-success mt-1 float-end">New</span><i
                    className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                      className="align-middle">Settings</span></a>
                <a className="dropdown-item" href="auth-lockscreen-basic.html"><i
                  className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span
                    className="align-middle">Lock screen</span></a> */}

                <Link
                  to="/login"
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  className="dropdown-item"
                >
                  <i
                    className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                      className="align-middle" data-key="t-logout">Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
