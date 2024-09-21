import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import HostContext from '../../Context/HostContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const AdminMap = () => {
    const { host } = useContext(HostContext);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [ambulances, setAmbulances] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const fetchAmbulances = async () => {
            try {
                const res = await axios.get(`${host}api/ambulances`);
                setAmbulances(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu xe cứu thương:', error);
            }
        };

        fetchAmbulances();
    }, [host]);

    useEffect(() => {
        // Lấy vị trí hiện tại của admin
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);

                // Nếu chưa khởi tạo bản đồ, khởi tạo và đặt trung tâm là vị trí của admin
                if (!mapRef.current) {
                    mapRef.current = new mapboxgl.Map({
                        container: mapContainerRef.current,
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: [longitude, latitude],
                        zoom: 12,
                    });
                } else {
                    // Di chuyển bản đồ đến vị trí của admin
                    mapRef.current.flyTo({ center: [longitude, latitude] });
                }
            });
        } else {
            console.error('Trình duyệt của bạn không hỗ trợ Geolocation');
        }
    }, []);

    useEffect(() => {
        if (mapRef.current && ambulances.length > 0) {
            ambulances.forEach(ambulance => {
                const coordinates = [ambulance.longitude, ambulance.latitude];
                addMarker(coordinates, mapRef.current, ambulance.name);
            });
        }
    }, [ambulances]);

    const addMarker = (coordinates, map, label) => {
        const marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(label))
            .addTo(map);
    };

    return (
        <div>
            <div ref={mapContainerRef} style={{ width: '100%', height: '70vh' }} />
        </div>
    );
};

export default AdminMap;
