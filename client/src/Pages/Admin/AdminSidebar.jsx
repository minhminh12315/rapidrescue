import React from 'react'
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (

    <div className="app-menu navbar-menu overflow-auto">
      <div className="navbar-brand-box">
        <a href="index.html" className="logo logo-dark">
          <span className="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="assets/images/logo-dark.png" alt="" height="17" />
          </span>
        </a>
        <a href="index.html" className="logo logo-light">
          <span className="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="assets/images/logo-light.png" alt="" height="17" />
          </span>
        </a>
        <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover">
          <i className="ri-record-circle-line"></i>
        </button>
      </div>
      <div id="scrollbar">
        <div className="container-fluid">

          <div id="two-column-menu">
          </div>
          <ul className="navbar-nav" id="navbar-nav">
            <li className="nav-item">
              <a className="nav-link menu-link" href="widgets.html">
                <i className="ri-honour-line"></i> <span data-key="t-widgets">Widgets</span>
              </a>
            </li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-dashboard"><i className="ri-dashboard-2-line"></i>Dashboard</Link></li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-user"><i className="ri-user-line"></i>Users</Link></li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-driver"><i className=" ri-steering-2-line"></i>Driver</Link></li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-image"><i className="ri-image-line"></i>Image</Link></li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-video"><i className="ri-video-line"></i>Video</Link></li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-text"><i className="ri-text"></i>Text</Link></li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-hospital"><i className="ri-hospital-line"></i>Hospitals</Link></li>
            <li className='nav-item'><Link className='nav-link menu-link' to="/admin-ambulance-car"><i className=' ri-truck-line'></i>Ambulance Cars</Link></li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar