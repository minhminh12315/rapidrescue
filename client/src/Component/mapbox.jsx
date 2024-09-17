import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicXVhbmcxMjM0NTYiLCJhIjoiY20xNmpoNDE5MGsydDJqc2swMXd3dDk0NCJ9.ckvAyKZrFuuRgbzLMYWLmg';

const Mapbox = () => {
  const [map, setMap] = useState(null);
  const [countryCode, setCountryCode] = useState('');
  const [formData, setFormData] = useState({
    address: '',
    emergencyStatus: '',
    hospital: '',
    phone: ''
  });

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        mapInstance.setCenter([longitude, latitude]);
        mapInstance.setZoom(14);

        new mapboxgl.Marker({ color: '#ff0000' })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setText('You are here'))
          .addTo(mapInstance);

        try {
          const reverseGeocodeResponse = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
            {
              params: { access_token: mapboxgl.accessToken }
            }
          );
          const countryFeature = reverseGeocodeResponse.data.features.find(
            (feature) => feature.place_type.includes('country')
          );
          if (countryFeature) {
            setCountryCode(countryFeature.properties.short_code);
          }
        } catch (error) {
          console.error('Error getting country code:', error);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for a place',
      bbox: countryCode ? getBoundingBoxForCountry(countryCode) : undefined
    });

    mapInstance.addControl(geocoder);

    geocoder.on('result', (event) => {
      if (event.result.context) {
        const isInCurrentCountry = event.result.context.some(context => context.id.startsWith('country'));
        if (!isInCurrentCountry) {
          geocoder.setBBox([-180, -90, 180, 90]);
        }
      }
    });

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [countryCode]);

  const getBoundingBoxForCountry = (countryCode) => {
    const boundingBoxes = {
      US: [-125.0, 24.0, -66.5, 49.5],
    };

    return boundingBoxes[countryCode] || [-180, -90, 180, 90];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='mapbox-container'>
      <div id="map" style={{ width: '100%', height: '80vh' }} className="mt-4"></div>
      <div className="container">
        <h3 className="mt-4">Information Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input 
              type="text" 
              className="form-control" 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emergencyStatus" className="form-label">Emergency Status</label>
            <select 
              className="form-select" 
              id="emergencyStatus" 
              name="emergencyStatus" 
              value={formData.emergencyStatus} 
              onChange={handleChange} 
              required
            >
              <option value="">Choose...</option>
              <option value="urgent">Urgent</option>
              <option value="non-urgent">Non-Urgent</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="hospital" className="form-label">Hospital</label>
            <select 
              className="form-select" 
              id="hospital" 
              name="hospital" 
              value={formData.hospital} 
              onChange={handleChange} 
              required
            >
              <option value="">Choose a hospital...</option>
              <option value="hospitalA">Hospital A</option>
              <option value="hospitalB">Hospital B</option>
              <option value="hospitalC">Hospital C</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Mapbox;
