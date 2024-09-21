import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import HostContext from "../../Context/HostContext";

const AdminDriver = () => {
  const { host } = useContext(HostContext);
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

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
        <div className="d-flex flex-row gap-2">
          <button type="button" onClick={() => handleEdit(row.id)} class="btn btn-primary btn-icon waves-effect waves-light"><i class="ri-edit-line"></i></button>
          <button type="button" onClick={() => handleShowDeleteModal(row.id)} class="btn btn-danger btn-icon waves-effect waves-light"><i class="ri-delete-bin-5-line"></i></button>
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
      const response = await axios.get(`${host}api/get-drivers`);
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
      await axios.delete(`${host}api/delete-driver/${idToDelete}`);
      setIdToDelete(null);
      setShowDeleteModal(false);
      fetchDrivers(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleCreateDriver = async () => {
    try {
      await axios.post(`${host}api/store-driver`, newDriver);
      setShowModal(false);
      setNewDriver({ first_name: "", last_name: "", email: "", phone: "" });
      fetchDrivers(); // Refresh the data after creating
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };
  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  }
  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between align-items-center mb-4">
        <h4>Driver Management</h4>
        <button className="btn-one" onClick={() => setShowModal(true)}>
          <span className="txt">Create Driver</span>
        </button>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name"
          aria-label="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>


      <DataTable
        columns={columns}
        data={filteredDrivers}
        progressPending={loading}
        pagination
        highlightOnHover
      />

      {/* Modal for Create Driver */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="pb-3">
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

      {/* Modal For Delete Driver */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="pb-3">
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this DRIVER?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDriver;
