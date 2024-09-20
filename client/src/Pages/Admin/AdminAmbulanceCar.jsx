import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => <img src={row.image} alt="ambulance" height={50} />,
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Action",
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

const AdminAmbulanceCar = () => {
  const [ambulanceCars, setAmbulanceCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newAmbulanceCar, setNewAmbulanceCar] = useState({
    name: "",
    address: "",
    type: "",
    price: "",
    image: "",
  });
  const [filteredAmbulanceCars, setFilteredAmbulanceCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAmbulanceCars();
  }, []);

  useEffect(() => {
    // Filter ambulance cars based on the search term
    setFilteredAmbulanceCars(
      ambulanceCars.filter((car) =>
        car.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, ambulanceCars]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const fetchAmbulanceCars = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-ambulance");
      setAmbulanceCars(response.data);
      setFilteredAmbulanceCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ambulance cars:", error);
      setLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (ambulanceCar) => {
    // Logic to edit the ambulance car (you can display a form for editing here)
    console.log("Editing ambulance car:", ambulanceCar);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-ambulance/${id}`);
      fetchAmbulanceCars(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting ambulance car:", error);
    }
  };

  const handleCreateAmbulanceCar = async () => {
    try {
      await axios.post("http://localhost:8000/api/store-ambulance", newAmbulanceCar);
      setShowModal(false);
      setNewAmbulanceCar({
        name: "",
        address: "",
        type: "",
        price: "",
        image: "",
      });
      fetchAmbulanceCars(); // Refresh the data after creating
    } catch (error) {
      console.error("Error creating ambulance car:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Ambulance Car Management</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name"
          aria-label="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
      {/* Create Ambulance Car Button */}
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Create Ambulance Car
      </Button>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredAmbulanceCars} // Use filteredAmbulanceCars
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

      {/* Modal for Create Ambulance Car */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Ambulance Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="ambulanceName">
              <Form.Label>Ambulance Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ambulance name"
                value={newAmbulanceCar.name}
                onChange={(e) =>
                  setNewAmbulanceCar({ ...newAmbulanceCar, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ambulanceAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ambulance address"
                value={newAmbulanceCar.address}
                onChange={(e) =>
                  setNewAmbulanceCar({ ...newAmbulanceCar, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ambulanceType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ambulance type"
                value={newAmbulanceCar.type}
                onChange={(e) =>
                  setNewAmbulanceCar({ ...newAmbulanceCar, type: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ambulancePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={newAmbulanceCar.price}
                onChange={(e) =>
                  setNewAmbulanceCar({ ...newAmbulanceCar, price: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ambulanceImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={newAmbulanceCar.image}
                onChange={(e) =>
                  setNewAmbulanceCar({ ...newAmbulanceCar, image: e.target.value })
                }
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateAmbulanceCar}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAmbulanceCar;
