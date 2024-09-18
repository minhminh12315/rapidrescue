import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.scss';

const Map = ({ setUserLocation, setMapInstance }) => {
  const mapContainerRef = useRef(null); // Sử dụng ref để quản lý DOM element

  useEffect(() => {
    // Tạo map chỉ khi container đã sẵn sàng
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current, // Sử dụng ref thay vì id
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    // Lấy vị trí người dùng nếu được cho phép
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([longitude, latitude]);
      mapInstance.setCenter([longitude, latitude]);
      mapInstance.setZoom(14);

      // Thêm marker để hiển thị vị trí người dùng
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
