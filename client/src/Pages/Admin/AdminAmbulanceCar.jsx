import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HostContext from "../../Context/HostContext";

const AdminAmbulanceCar = () => {
  const { host } = useContext(HostContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newAmbulanceCar, setNewAmbulanceCar] = useState({
    name: "",
    address: "",
    type: "",
    driver_id: "",
    price: "",
    image: "",
  });

  const [ambulanceCars, setAmbulanceCars] = useState([]);
  useEffect(() => {
    console.log("Ambulance Cars: ", ambulanceCars);
  }, [ambulanceCars]);

  const fetchAmbulanceCars = async () => {
    try {
      const response = await axios.get(
        `${host}api/get-ambulance`
      );
      console.log("Full response: ", response.data);
      setAmbulanceCars(response.data);
      setFilteredAmbulanceCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ambulance cars:", error);
      setLoading(false);
    }
  };
  const [filteredAmbulanceCars, setFilteredAmbulanceCars] = useState([]);
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
        <div className="d-flex flex-row gap-2">
          <button
            type="button"
            onClick={() => handleEdit(row.id)}
            class="btn btn-primary btn-icon waves-effect waves-light"
          >
            <i class="ri-edit-line"></i>
          </button>
          <button
            type="button"
            onClick={() => handleShowDeleteModal(row.id)}
            class="btn btn-danger btn-icon waves-effect waves-light"
          >
            <i class="ri-delete-bin-5-line"></i>
          </button>
        </div>
      ),
    },
  ];
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

  // Handle Edit
  const handleEdit = (ambulanceCar) => {
    // Logic to edit the ambulance car (you can display a form for editing here)
    console.log("Editing ambulance car:", ambulanceCar);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    console.log("Delete");
    try {
      await axios.delete(
        `${host}api/delete-ambulance/${idToDelete}`
      );
      setIdToDelete(null);
      setShowDeleteModal(false);
      fetchAmbulanceCars(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting ambulance car:", error);
    }
  };

  const handleCreateAmbulanceCar = async () => {
    try {
      await axios.post(
        `${host}api/store-ambulance`,
        newAmbulanceCar
      );
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

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between align-items-center mb-4">
        <h4>Ambulance Car Management</h4>
        {/* Create Ambulance Car Button */}
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

      {/* Modal For Delete Driver */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="pb-3">
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this AMBULANCE CAR?
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

export default AdminAmbulanceCar;
