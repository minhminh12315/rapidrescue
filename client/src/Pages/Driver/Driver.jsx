import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

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
        // Khởi tạo bản đồ nếu chưa được khởi tạo
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: userLocation || [0, 0], // Căn giữa tại [0, 0] nếu userLocation chưa có
                zoom: 12
            });
        }

        // Nếu có vị trí người dùng, cập nhật bản đồ
        if (userLocation) {
            mapRef.current.setCenter(userLocation);
            addMarker(userLocation, mapRef.current, "Vị trí hiện tại"); // Thêm marker cho vị trí hiện tại
        }

        if (userLocation && driverRequests.length > 0) {
            const bounds = new mapboxgl.LngLatBounds(); // Tạo một bounding box

            driverRequests.forEach((request) => {
                const [destLng, destLat] = JSON.parse(request.destination);
                const start = userLocation; // Điểm đi
                const end = [destLng, destLat]; // Điểm đến

                drawRoute(start, end, mapRef.current);

                // Thêm tọa độ điểm bắt đầu và điểm kết thúc vào bounding box
                bounds.extend(start);
                bounds.extend(end);

                // Thêm marker cho điểm đi
                addMarker(start, mapRef.current, "Điểm xuất phát");
            });

            // Thu nhỏ bản đồ theo vùng đã được xác định
            mapRef.current.fitBounds(bounds, { padding: 20 });
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
        } catch (error) {
            console.error('Lỗi khi lấy tuyến đường:', error);
        }
    };

    const addMarker = (coordinates, map, label) => {
        const marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(label))
            .addTo(map); // Thêm marker vào bản đồ
    };

    return (
        <div>
            <div ref={mapContainerRef} style={{ width: '100%', height: '70vh' }} />
        </div>
    );
};

export default DriverPage;
