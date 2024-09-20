import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";

const AdminDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [search, setSearch] = useState("");

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    setFilteredDrivers(
      drivers.filter((driver) =>
        `${driver.first_name} ${driver.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, drivers]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-drivers");
      setDrivers(response.data);
      setFilteredDrivers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-driver/${id}`);
      fetchDrivers(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleCreateDriver = async () => {
    try {
      await axios.post("http://localhost:8000/api/store-driver", newDriver);
      setShowModal(false);
      setNewDriver({ first_name: "", last_name: "", email: "", phone: "" });
      fetchDrivers(); // Refresh the data after creating
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4 ">Driver Management</h4>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name"
          aria-label="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>

      <div className="btns-box">
        <a className="btn-one mb-5" onClick={() => setShowModal(true)}>
          <span className="txt text-light">Create Driver</span>
        </a>
      </div>

      <DataTable
        columns={columns}
        data={filteredDrivers}
        progressPending={loading}
        pagination
        highlightOnHover
      />

      {/* Modal for Create Driver */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newDriver.first_name}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, first_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newDriver.last_name}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, last_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newDriver.email}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={newDriver.phone}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, phone: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button class="btn btn-outline-dark waves-effect waves-light" variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button class="btn btn-primary btn-animation waves-effect waves-light" data-text="Save" variant="primary" onClick={handleCreateDriver}>
            <span>Save</span>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDriver;
