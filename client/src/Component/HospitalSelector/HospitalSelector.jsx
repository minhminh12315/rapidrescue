import React from 'react';
import './HospitalSelector.scss';

const HospitalSelector = ({ hospitalOptions, selectedHospital, setSelectedHospital }) => {
  return (
    <div className="hospital-selector">
      <label htmlFor="hospital">Hospital</label>
      <select
        id="hospital"
        className="form-select"
        value={selectedHospital}
        onChange={(e) => setSelectedHospital(e.target.value)}
      >
        <option value="">Select a hospital</option>
        {hospitalOptions.map((hospital) => (
          <option key={hospital.id} value={hospital.id}>
            {hospital.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HospitalSelector;
