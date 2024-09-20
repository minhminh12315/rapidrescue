import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.scss';

const Map = ({ setUserLocation, setMapInstance }) => {
  const mapContainerRef = useRef(null); 

  useEffect(() => {
    // Tạo map chỉ khi container đã sẵn sàng
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current, 
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    mapInstance.addControl(new mapboxgl.GeolocateControl({ 
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), 'top-right');

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

    // Lưu instance của Mapbox
    setMapInstance(mapInstance);

    // Cleanup map khi component bị unmount
    return () => mapInstance.remove();
  }, [setUserLocation, setMapInstance]);

  return <div ref={mapContainerRef} className="map-container" style={{ width: '100%', height: '70vh' }} />;
};

export default Map;
