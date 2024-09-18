import React from 'react';
import './RouteDisplay.scss';

const RouteDisplay = ({ onCheckRoute }) => {
  return (
    <div className="route-display">
      <button className="btn btn-primary" onClick={onCheckRoute}>
        Check Route
      </button>
    </div>
  );
};

export default RouteDisplay;
