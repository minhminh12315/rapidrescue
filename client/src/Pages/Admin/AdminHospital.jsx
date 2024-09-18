import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.address,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
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

const AdminHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    // Filter hospitals based on the search term
    setFilteredHospitals(
      hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, hospitals]);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-hospitals"
      );
      setHospitals(response.data);
      setFilteredHospitals(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (hospital) => {
    // Logic to edit the hospital (you can display a form for editing here)
    console.log("Editing hospital:", hospital);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-hospital/${id}`);
      fetchHospitals(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  const handleCreateHospital = async () => {
    try {
      await axios.post("http://localhost:8000/api/store-hospital", newHospital);
      setShowModal(false);
      setNewHospital({ name: "", address: "", phone: "" });
      fetchHospitals(); // Refresh the data after creating
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Hospital Management</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name"
          aria-label="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
      {/* Create Hospital Button */}
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Create Hospital
      </Button>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredHospitals} // Use filteredHospitals
        progressPending={loading}
        pagination
        highlightOnHover
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "#f8f9fa",
            },
          },
          rows: {
            style: {
              minHeight: "50px",
            },
          },
        }}
      />

      {/* Modal for Create Hospital */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="hospitalName">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hospital name"
                value={newHospital.name}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hospitalAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hospital address"
                value={newHospital.address}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hospitalPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hospital phone"
                value={newHospital.phone}
                onChange={(e) =>
                  setNewHospital({ ...newHospital, phone: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateHospital}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminHospital;
