import React, { useContext, useState, useEffect } from 'react';
import TextContext from '../../Context/TextContext';
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const AdminText = () => {
  const { texts, setTexts } = useContext(TextContext);
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState({
    content: "",
    type: "",
  });
  const [filteredTexts, setFilteredTexts] = useState(texts);
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
      name: "Content",
      selector: (row) => row.content,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
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
    console.log("Text: ", texts);
  })

  const handleEdit = (row) => {
    setNewText(row);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      // Assume delete API is implemented in backend
      await axios.delete(`http://127.0.0.1:8000/api/delete-text/${idToDelete}`);
      setIdToDelete(null);
      setShowDeleteModal(false);
      fetchTexts(); // Refresh the data after deletion
      setTexts(texts.filter((text) => text.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setFilteredTexts(
      texts.filter((text) =>
        `${text.type} ${text.content}`.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, texts]);

  const handleCreateText = async () => {
    try {
      // Assume store API is implemented in backend
      await axios.post("http://127.0.0.1:8000/api/store-text", newText);
      setTexts([...texts, newText]);
      setShowModal(false);
      setNewText({ content: "", type: "" });
    } catch (error) {
      console.error("Error creating text:", error);
    }
  };
  const fetchTexts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-text"
      );
      setTexts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching text:", error);
      setLoading(false);
    }
  };
  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Texts</h2>
        <a className='btn-one' variant="primary" onClick={() => setShowModal(true)}>
          <span className='txt text-light'>Add New Text</span>
        </a>
      </div>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search texts..."
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>

      <DataTable
        columns={columns}
        data={filteredTexts}
        pagination
        highlightOnHover
      />

      {/* Modal for adding/editing text */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{newText.id ? "Edit Text" : "Add New Text"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter content"
                value={newText.content}
                onChange={(e) =>
                  setNewText({ ...newText, content: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="type" className="mt-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type"
                value={newText.type}
                onChange={(e) =>
                  setNewText({ ...newText, type: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button class="btn btn-outline-dark waves-effect waves-light" variant="secondary" onClick={() => setShowModal(false)}>
            <span>Close</span>
          </button>
          <button class="btn btn-primary btn-animation waves-effect waves-light" data-text={newText.id ? 'Update' : 'Create'} variant="primary" onClick={handleCreateText}>
            <span>{newText.id ? "Update Text" : "Create Text"}</span>
          </button>
        </Modal.Footer>
      </Modal>
      {/* Modal For Delete Driver */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="pb-3">
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this TEXT?
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

export default AdminText;
