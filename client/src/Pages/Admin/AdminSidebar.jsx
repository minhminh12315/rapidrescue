import React from 'react'
import { Link } from 'react-router-dom';

const AdminSidebar = ({ setSideBarAdminOpen, sideBarAdminOpen }) => {
  const handleToggle = () => {
    setSideBarAdminOpen(!sideBarAdminOpen);
  };
  return (
    <div className='position-relative'>
      <div className={sideBarAdminOpen ? "app-menu navbar-menu overflow-auto active" : "app-menu navbar-menu overflow-auto"} >
        <div className='w-100 d-flex justify-content-end align-items-center'>
          <button className='btn btn-close me-2 d-md-none' onClick={handleToggle}></button>
        </div>
        <div id="scrollbar" style={{ paddingTop: "50px" }}>
          <div className="container-fluid">

            <div id="two-column-menu">
            </div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className='nav-item'><Link className='nav-link menu-link' to="/admin-dashboard"><i className="ri-dashboard-2-line"></i>Dashboard</Link></li>
              <li className='nav-item'><Link className='nav-link menu-link' to="/admin-user"><i className="ri-user-line"></i>Users</Link></li>
              <li className='nav-item'><Link className='nav-link menu-link' to="/admin-driver"><i className=" ri-steering-2-line"></i>Driver</Link></li>
              <li className='nav-item'><Link className='nav-link menu-link' to="/admin-image"><i className="ri-image-line"></i>Image</Link></li>
              <li className='nav-item'><Link className='nav-link menu-link' to="/admin-text"><i className="ri-text"></i>Text</Link></li>
              <li className='nav-item'><Link className='nav-link menu-link' to="/admin-hospital"><i className="ri-hospital-line"></i>Hospitals</Link></li>
              <li className='nav-item'><Link className='nav-link menu-link' to="/admin-ambulance-car"><i className=' ri-truck-line'></i>Ambulance Cars</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={sideBarAdminOpen ? 'overlay_sidebar active' : 'overlay_sidebar'} onClick={handleToggle}></div>
    </div>
  );
};

export default AdminSidebar