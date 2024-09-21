import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HostContext from "../../Context/HostContext";
import AdminMap from "./AdminMap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAmbulanceCars: 0,
    totalHospitals: 0,
    totalUsers: 0,
    totalBookings: 0,
  });
  const [hover, setHover] = useState(false);
  const { host } = useContext(HostContext);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${host}api/dashboard-stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row>
        <Col md={3}>
          <Card
            className={hover ? "pointer-cursor mb-4" : "mb-4"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate("/admin-ambulance-car")}
          >
            <Card.Body>
              <Card.Title>Total Ambulance Cars</Card.Title>
              <Card.Text>{stats.totalAmbulanceCars}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className={hover ? "pointer-cursor mb-4" : "mb-4"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate("/admin-hospital")}
          >
            <Card.Body>
              <Card.Title>Total Hospitals</Card.Title>
              <Card.Text>{stats.totalHospitals}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className={hover ? "pointer-cursor mb-4" : "mb-4"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate("/admin-user")}
          >
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{stats.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card
            className={hover ? "pointer-cursor mb-4" : "mb-4"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate("/admin-booking")}
          >
            <Card.Body>
              <Card.Title>Total Bookings</Card.Title>
              <Card.Text>{stats.totalBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AdminMap/>
    </div>
  );
};

export default AdminDashboard;
