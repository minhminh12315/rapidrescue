import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import HostContext from '../../Context/HostContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const DriverPage = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [driverRequests, setDriverRequests] = useState([]);
    const driverId = localStorage.getItem('driver_id');
    const markerRef = useRef(null);
    const previousLocationRef = useRef(null); // Lưu vị trí trước đó để so sánh

    useEffect(() => {
        const fetchDriverRequests = async () => {
            try {
                const res = await axios.get(`${host}api/driver-requests/${driverId}`);
                setDriverRequests(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu chuyến đi:', error);
            }
        };

        fetchDriverRequests();
    }, [driverId]);

    useEffect(() => {
        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition((position) => {
                const { longitude, latitude } = position.coords;
                const newLocation = [longitude, latitude];
                setUserLocation(newLocation);
    
                if (!previousLocationRef.current || previousLocationRef.current[0] !== newLocation[0] || previousLocationRef.current[1] !== newLocation[1]) {
                    console.log('Bạn đã di chuyển!');
                    updateDriverLocation(newLocation);
                    previousLocationRef.current = newLocation; 
                }
            }, (error) => {
                console.error('Lỗi khi lấy vị trí:', error);
                
            }, {
                enableHighAccuracy: true, 
                maximumAge: 10000, 
                timeout: 5000 
            });
        } else {
            console.error('Trình duyệt của bạn không hỗ trợ Geolocation');
        }
    
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);
    

    const updateDriverLocation = async (location) => {
        console.log('Vị trí tài xế:', JSON.stringify(location));
        
        try {
            console.log('Đang gửi yêu cầu cập nhật vị trí...');
            
            const response = await axios.post(`${host}api/update-driver-location`, {
                driver_id: driverId,
                location: JSON.stringify(location),
            });
            
            console.log('Phản hồi từ server:', response.data);
        } catch (error) {
            console.error('Lỗi khi cập nhật vị trí tài xế:', error.response ? error.response.data : error.message);
        }
    };
    

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: userLocation || [0, 0], 
                zoom: 12
            });
        }
        
        if (userLocation) {
            if (!markerRef.current) {
                markerRef.current = new mapboxgl.Marker()
                    .setLngLat(userLocation)
                    .addTo(mapRef.current);
            } else {
                markerRef.current.setLngLat(userLocation);
            }

            mapRef.current.flyTo({ center: userLocation });
        }

        if (userLocation && driverRequests.length > 0) {
            const bounds = new mapboxgl.LngLatBounds(); 

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
        const routeId = `route-${end[0]}-${end[1]}`;
    
        // Kiểm tra nếu source đã tồn tại thì xóa nó
        if (map.getSource(routeId)) {
            map.removeLayer(routeId); // Xóa layer nếu tồn tại
            map.removeSource(routeId); // Xóa source nếu tồn tại
        }
    
        try {
            const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
    
            const data = response.data.routes[0];
            const route = data.geometry;
    
            map.addSource(routeId, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: route
                }
            });
    
            map.addLayer({
                id: routeId,
                type: 'line',
                source: routeId,
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
