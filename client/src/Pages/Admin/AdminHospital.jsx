import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";



const AdminHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
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
        <div className="d-flex flex-row gap-2">
          <button type="button" onClick={() => handleEdit(row.id)} class="btn btn-primary btn-icon waves-effect waves-light"><i class="ri-edit-line"></i></button>
          <button type="button" onClick={() => handleShowDeleteModal(row.id)} class="btn btn-danger btn-icon waves-effect waves-light"><i class="ri-delete-bin-5-line"></i></button>
        </div>
      ),
    },
  ];
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
        "https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/api/get-hospitals"
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
    console.log('Delete')
    try {
      await axios.delete(`https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/api/delete-hospital/${idToDelete}`);
      setIdToDelete(null);
      setShowDeleteModal(false);
      fetchHospitals(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  const handleCreateHospital = async () => {
    try {
      await axios.post("https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/api/store-hospital", newHospital);
      setShowModal(false);
      setNewHospital({ name: "", address: "", phone: "" });
      fetchHospitals(); // Refresh the data after creating
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  }
  return (
    <div className="container mt-5">
      <div className="d-flex flex-row justify-content-between align-items-center mb-4">
        <h1 className="">Hospital Management</h1>
        <button className="btn-one" onClick={() => setShowModal(true)}>
          <span className="txt">Create Hospital</span>
        </button>

      </div>
      <InputGroup className="mb-5">
        <FormControl
          placeholder="Search by name"
          aria-label="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
      {/* Create Hospital Button */}

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
          <button class="btn btn-outline-dark waves-effect waves-light" variant="secondary" onClick={() => setShowModal(false)}>
            <span>Cancel</span>
          </button>
          <button class="btn btn-primary btn-animation waves-effect waves-light" data-text="Save" variant="primary" onClick={handleCreateHospital}>
            <span>Save</span>
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal For Delete Hospital */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="pb-3">
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this HOSPITAL?
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

export default AdminHospital;
