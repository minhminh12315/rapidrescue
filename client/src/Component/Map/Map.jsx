import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.scss';

const Map = ({ setUserLocation, setMapInstance }) => {
  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    // Xử lý vị trí của người dùng
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([longitude, latitude]);
      mapInstance.setCenter([longitude, latitude]);
      mapInstance.setZoom(14);

      new mapboxgl.Marker({ color: '#ff0000' })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setText('You are here'))
        .addTo(mapInstance);
    });

    setMapInstance(mapInstance);

    return () => mapInstance.remove();
  }, [setUserLocation, setMapInstance]);

  return <div id="map" className="map-container"  style={{ width: '100%', height: '70vh' }} />;
};

export default Map;
