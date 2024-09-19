import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  const roles = ["admin", "customer", "driver", "emt"];

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
      name: "Role",
      selector: (row) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
          className="form-select"
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      ),
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
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on the search term
    setFilteredUsers(
      users.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:8000/api/update-user/${id}`, {
        role: newRole,
      });
      fetchUsers(); // Refresh data after role update
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-user");
      console.log("Response from API:", response.data); // Log dữ liệu trả về
  
      // Kiểm tra xem response.data có phải là một mảng hay không
      if (Array.isArray(response.data.users)) {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      } else {
        console.error("Expected an array but received:", response.data.users);
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-user/${id}`);
      fetchUsers(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post("http://localhost:8000/api/store-user", newUser);
      setShowModal(false);
      setNewUser({ first_name: "", last_name: "", email: "", phone: "" });
      fetchUsers(); // Refresh the data after creating
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Management</h1>

      {/* Search Input */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by name"
          aria-label="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Create User Button */}
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Create User
      </Button>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
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

      {/* Modal for Create User */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="userFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newUser.first_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, first_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUser;
