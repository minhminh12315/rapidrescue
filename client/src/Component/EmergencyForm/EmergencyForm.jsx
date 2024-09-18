import React from 'react';
import mapboxgl from 'mapbox-gl';
import './EmergencyForm.scss';

const EmergencyForm = ({ address, setAddress, isEmergency, setIsEmergency, phone, setPhone }) => {
  return (
    <div className="emergency-form">
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          id="address"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="emergency" className="form-label">Emergency</label>
        <select
          id="emergency"
          className="form-select"
          value={isEmergency}
          onChange={(e) => setIsEmergency(e.target.value)}
        >
          <option value="no">Not Emergency</option>
          <option value="yes">Emergency</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="tel"
          id="phone"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EmergencyForm;
