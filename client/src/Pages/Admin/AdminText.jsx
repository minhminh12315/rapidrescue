import React, { useContext, useState, useEffect } from 'react';
import TextContext from '../../Context/TextContext';
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const AdminText = () => {
  const { texts, setTexts } = useContext(TextContext);
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState({
    content: "",
    type: "",
  });
  const [filteredTexts, setFilteredTexts] = useState(texts);
  const [search, setSearch] = useState("");

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
    console.log("Text: ", texts);
  })

  const handleEdit = (row) => {
    setNewText(row);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      // Assume delete API is implemented in backend
      await axios.delete(`http://localhost:8000/api/delete-text/${id}`);
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
      await axios.post("http://localhost:8000/api/store-text", newText);
      setTexts([...texts, newText]);
      setShowModal(false);
      setNewText({ content: "", type: "" });
    } catch (error) {
      console.error("Error creating text:", error);
    }
  };

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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateText}>
            {newText.id ? "Update Text" : "Create Text"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminText;
