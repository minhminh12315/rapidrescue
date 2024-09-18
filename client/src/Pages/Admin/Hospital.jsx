import React, { useState } from "react";
import axios from "axios";
const Hospital = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here

    axios
      .post("http://localhost:8000/api/store-hospital", {
        name,
        address,
        phone,
      })
      .then((response) => {
        console.log("Hospital added:", response.data);
        setName("");
        setAddress("");
        setPhone("");
      })
      .catch((error) => {
        console.error("There was an error adding the hospital:", error);
      });

    console.log({ name, address, phone });
  };

  return (
    <section className="mt-5">
        <h1>abc</h1>
      <form onSubmit={handleSubmit} className="container mt-5">
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="address" className="col-sm-2 col-form-label">
            Address:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="phone" className="col-sm-2 col-form-label">
            Phone:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">
              Add Hospital
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Hospital;
