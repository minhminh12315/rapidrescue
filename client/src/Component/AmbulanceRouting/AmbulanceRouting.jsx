import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';
import Geocoder from '../Geocoder/Geocoder.js';
import HospitalSelector from '../HospitalSelector/HospitalSelector';
import EmergencyForm from '../EmergencyForm/EmergencyForm';
import RouteDisplay from '../RouteDisplay/RouteDisplay';
import mapboxgl from 'mapbox-gl';
import { fetchNearbyHospitals } from '../../Utils/fetchNearbyHospitals.js';
import { getAmbulanceRoute } from '../../Utils/getAmbulanceRoute.jsx';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const AmbulanceRouting = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [address, setAddress] = useState('');
  const [isEmergency, setIsEmergency] = useState('no');
  const [hospital, setHospital] = useState('');
  const [phone, setPhone] = useState('');
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    if (userLocation && destination) {
      getAmbulanceRoute(userLocation, destination, setRoute, mapInstance, setDestinationMarker);
    }
  }, [userLocation, destination, mapInstance]);

  useEffect(() => {
    if (mapInstance) {
      fetchNearbyHospitals(userLocation[0], userLocation[1], setHospitalOptions);
    }
  }, [mapInstance, userLocation]);

  const handleCheck = () => {
    if (userLocation && hospital) {
      const selectedHospital = hospitalOptions.find(h => h.id === hospital);
      if (selectedHospital?.coordinates) {
        getAmbulanceRoute(userLocation, selectedHospital.coordinates, setRoute, mapInstance, setDestinationMarker);
      }
    } else {
      console.error('User location or hospital coordinates not set.');
    }
  };

  return (
    <div className='mapbox-container'>
      <Map setUserLocation={setUserLocation} setMapInstance={setMapInstance} />
      <Geocoder map={mapInstance} setDestination={setDestination} />
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-md-6'>
            <EmergencyForm 
              address={address}
              setAddress={setAddress}
              isEmergency={isEmergency}
              setIsEmergency={setIsEmergency}
              phone={phone}
              setPhone={setPhone}
            />
            <HospitalSelector 
              hospitalOptions={hospitalOptions}
              selectedHospital={hospital}
              setSelectedHospital={setHospital}
            />
            <div className="form-group">
              <label htmlFor="myTextarea">Text Area</label>
              <textarea 
                className="form-control" 
                id="myTextarea" 
                rows="5" 
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>
            <RouteDisplay onCheckRoute={handleCheck} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceRouting;
