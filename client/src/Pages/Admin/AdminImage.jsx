import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import ImageContext from "../../Context/ImageContext";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Image",
    cell: (row) => (
      <img
      src={`http://localhost:8000/storage/${row.path}`} // Đường dẫn đến ảnh
      alt={row.title}
      style={{ width: '100px', height: 'auto' }} // Đặt kích thước ảnh
    />
    ),
  },
  {
    name: "Description",
    selector: (row) => row.description,
  },
  {
    name: "Type",
    selector: (row) => row.type,
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

const AdminImage = () => {
  const { images, setImages } = useContext(ImageContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState({
    title: "",
    path: null,
    description: "",
    type: "",
  });
  const [filteredImages, setFilteredImages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    // Filter images based on the search term
    setFilteredImages(
      images.filter((image) =>
        image.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, images]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-image");
      setImages(response.data);
      setFilteredImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (image) => {
    // Logic to edit the image (you can display a form for editing here)
    console.log("Editing image:", image);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-image/${id}`);
      fetchImages(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleCreateImage = async () => {
    const formData = new FormData();
    formData.append("title", newImage.title);
    formData.append("description", newImage.description);
    formData.append("type", newImage.type);
    formData.append("path", newImage.path);

    try {
      await axios.post("http://localhost:8000/api/store-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowModal(false);
      setNewImage({ title: "", path: null, description: "", type: "" });
      fetchImages();
    } catch (error) {
      console.error("Error creating image:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Image Management</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by title"
          aria-label="Search by title"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
      {/* Create Image Button */}
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Create Image
      </Button>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredImages} // Use filteredImages
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

      {/* Modal for Create Image */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="imageTitle">
              <Form.Label>Image Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image title"
                value={newImage.title}
                onChange={(e) =>
                  setNewImage({ ...newImage, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image description"
                value={newImage.description}
                onChange={(e) =>
                  setNewImage({ ...newImage, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image type"
                value={newImage.type}
                onChange={(e) =>
                  setNewImage({ ...newImage, type: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={
                  (e) => setNewImage({ ...newImage, path: e.target.files[0] }) // Cập nhật trường path với file
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateImage}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminImage;
