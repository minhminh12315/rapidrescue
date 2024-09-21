import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import ImageContext from "../../Context/ImageContext";



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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

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
          src={`https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/storage/${row.path}`} // Đường dẫn đến ảnh
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
        <div className="d-flex flex-row gap-2">
          <button type="button" onClick={() => handleEdit(row.id)} class="btn btn-primary btn-icon waves-effect waves-light"><i class="ri-edit-line"></i></button>
          <button type="button" onClick={() => handleShowDeleteModal(row.id)} class="btn btn-danger btn-icon waves-effect waves-light"><i class="ri-delete-bin-5-line"></i></button>
        </div>
      ),
    },
  ];

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
      const response = await axios.get("https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/api/get-image");
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
      await axios.delete(`https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/api/delete-image/${idToDelete}`);
      setIdToDelete(null);
      setShowDeleteModal(false);
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
      await axios.post("https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/api/store-image", formData, {
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
  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setIdToDelete(id);
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row justify-content-between align-items-center mb-4">
        <h4>Image Management</h4>
        <button className="btn-one" onClick={() => setShowModal(true)}>
          <span className="txt">Create Driver</span>
        </button>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by title"
          aria-label="Search by title"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
      {/* Create Image Button */}


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
          <button class="btn btn-outline-dark waves-effect waves-light" variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button class="btn btn-primary btn-animation waves-effect waves-light" data-text="Save" variant="primary" onClick={handleCreateImage}>
            <span>Save</span>
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal For Delete Driver */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="pb-3">
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this IMAGE?
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

export default AdminImage;
