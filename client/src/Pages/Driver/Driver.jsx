import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';

const DriverMap = ({ ambulanceId }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/emergency-requests/${ambulanceId}`);
                setRequests(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy yêu cầu:', error);
            }
        };

        fetchRequests();
    }, [ambulanceId]);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0], // Thiết lập vị trí ban đầu
                zoom: 2 // Thiết lập mức zoom ban đầu
            });
        }

        requests.forEach(request => {
            const userLocation = JSON.parse(request.start_location);
            const destination = JSON.parse(request.destination);
            drawRoute(userLocation, destination);
        });
    }, [requests]);

    const drawRoute = async (start, end) => {
        // Tương tự như hàm drawRoute trong component người dùng
        const routeData = await getRoute(start, end);
        if (routeData && routeData.geometry) {
            // Vẽ đường đi tương tự như trong component người dùng
        }
    };

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '70vh' }} />
    );
};

export default DriverMap;
