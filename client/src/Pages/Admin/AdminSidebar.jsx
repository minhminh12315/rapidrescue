import React from 'react'
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/admin-user">Users</Link></li>
        <li><Link to="/admin-driver">Driver</Link></li>
        <li><Link to="/admin-image">Image</Link></li>
        <li><Link to="/admin-video">Video</Link></li>
        <li><Link to="/admin-text">Text</Link></li>
        <li><Link to="/admin-hospital">Hospitals</Link></li>
        <li><Link to="/admin-ambulance-car">Ambulance Cars</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar