import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  
  const [formData, setFormData] = useState({
    address: '',
    isEmergency: 'no',
    hospital: '',
    phone: '',
    textareaValue: '',
  });

  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [destinationMarker, setDestinationMarker] = useState(null);

  const location = useLocation();

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
    const { hospital } = formData;
    if (userLocation && hospital) {
      const selectedHospital = hospitalOptions.find(h => h.id === hospital);
      if (selectedHospital?.coordinates) {
        getAmbulanceRoute(userLocation, selectedHospital.coordinates, setRoute, mapInstance, setDestinationMarker);
      }
    } else {
      console.error('User location or hospital coordinates not set.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='mapbox-container'>
      <Map setUserLocation={setUserLocation} setMapInstance={setMapInstance} />
      {location.pathname !== '/contact' && (
        <>
          <Geocoder map={mapInstance} setDestination={setDestination} />
          <div className='container mt-4'>
            <div className='row'>
              <div className='col-md-6'>
                <EmergencyForm
                  address={formData.address}
                  setAddress={(val) => handleInputChange('address', val)}
                  isEmergency={formData.isEmergency}
                  setIsEmergency={(val) => handleInputChange('isEmergency', val)}
                  phone={formData.phone}
                  setPhone={(val) => handleInputChange('phone', val)}
                />
                <HospitalSelector
                  hospitalOptions={hospitalOptions}
                  selectedHospital={formData.hospital}
                  setSelectedHospital={(val) => handleInputChange('hospital', val)}
                />
                <div className="form-group">
                  <label htmlFor="myTextarea">Text Area</label>
                  <textarea
                    className="form-control"
                    id="myTextarea"
                    rows="5"
                    value={formData.textareaValue}
                    onChange={(e) => handleInputChange('textareaValue', e.target.value)}
                  />
                </div>
                <RouteDisplay onCheckRoute={handleCheck} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AmbulanceRouting;
