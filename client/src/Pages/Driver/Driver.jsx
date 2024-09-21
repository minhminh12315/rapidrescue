import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const DriverPage = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [driverRequests, setDriverRequests] = useState([]);
    const driverId = localStorage.getItem('driver_id');
    console.log(driverId);


    useEffect(() => {
        const fetchDriverRequests = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/driver-requests/${driverId}`);
                setDriverRequests(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu chuyến đi:', error);
            }
        };

        fetchDriverRequests();
    }, [driverId]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);
            }, (error) => {
                console.error('Lỗi khi lấy vị trí:', error);
            });
        } else {
            console.error('Trình duyệt của bạn không hỗ trợ Geolocation');
        }
    }, []);

    useEffect(() => {
        if (userLocation && driverRequests.length > 0 && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: userLocation,
                zoom: 12
            });

            driverRequests.forEach((request) => {
                const [destLng, destLat] = JSON.parse(request.destination);

                const start = userLocation;
                const end = [destLng, destLat];

                drawRoute(start, end, mapRef.current);
            });
        }
    }, [userLocation, driverRequests]);

    const drawRoute = async (start, end, map) => {
        try {
            const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);

            const data = response.data.routes[0];
            const route = data.geometry;

            map.addSource(`route-${end[0]}-${end[1]}`, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: route
                }
            });

            map.addLayer({
                id: `route-${end[0]}-${end[1]}`,
                type: 'line',
                source: `route-${end[0]}-${end[1]}`,
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                paint: {
                    'line-color': '#007cbf',
                    'line-width': 5
                }
            });

            map.addSource(`end-marker-${end[0]}-${end[1]}`, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: end
                    }
                }
            });

            map.addLayer({
                id: `end-marker-${end[0]}-${end[1]}`,
                type: 'symbol',
                source: `end-marker-${end[0]}-${end[1]}`,
                layout: {
                    'icon-image': 'marker-15',
                    'icon-size': 1.5
                }
            });
        } catch (error) {
            console.error('Lỗi khi lấy tuyến đường:', error);
        }
    };

    return (
        <div>
            <div ref={mapContainerRef} style={{ width: '100%', height: '70vh' }} />
            <h2>Driver Requests</h2>
            <ul>
                {driverRequests.map(request => (
                    <li key={request.id}>
                        Destination: {request.destination}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverPage;
