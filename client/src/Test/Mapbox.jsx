import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const DIRECTIONS_API_KEY = import.meta.env.VITE_MAPBOX_DIRECTIONS_API_KEY;

const Mapbox = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const popupRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [formData, setFormData] = useState({
        address: '',
        emergency: 'no',
        phone: '',
        hospital: '',
        textareaValue: ''
    });
    const [hospitals, setHospitals] = useState([]);
    const [destination, setDestination] = useState(null);
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/get-hospitals");
                setHospitals(res.data);
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu bệnh viện:', error);
            }
        };

        fetchHospitals();
    }, []);

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
        if (userLocation) {
            if (!mapRef.current) {
                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: userLocation,
                    zoom: 14
                });

                mapRef.current.addControl(new mapboxgl.NavigationControl());



                mapRef.current.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                }));

                mapRef.current.addControl(new mapboxgl.ScaleControl());

                mapRef.current.addControl(new mapboxgl.FullscreenControl());

            
              

                const popup = new mapboxgl.Popup({ offset: 25 }).setText('You are here');

                new mapboxgl.Marker()
                    .setLngLat(userLocation)
                    .addTo(mapRef.current)
                    .setPopup(popup);
            } else {
                mapRef.current.setCenter(userLocation);
            }
        }
    }, [userLocation]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleHospitalChange = (e) => {
        const selectedHospitalName = e.target.value;
        const selectedHospital = hospitals.find(h => h.name === selectedHospitalName);
        if (selectedHospital) {
            const [latitude, longitude] = selectedHospital.address.split(',').map(Number);
            setDestination([longitude, latitude]);
        }
        setFormData(prevState => ({
            ...prevState,
            hospital: selectedHospitalName
        }));
    };

    const getRoute = async (start, end) => {
        try {
            const response = await axios.get('https://api.mapbox.com/directions/v5/mapbox/driving-traffic/' +
                `${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=false&geometries=geojson&access_token=${DIRECTIONS_API_KEY}`);
            
            const route = response.data.routes[0];
            return {
                geometry: route.geometry,
                duration: route.duration, // Thời gian dự kiến tính bằng giây
                distance: route.distance  // Khoảng cách tính bằng mét
            };
        } catch (error) {
            console.error('Lỗi khi gọi Directions API:', error);
            return null;
        }
    };

    const drawRoute = async (start, end) => {
        if (start && end && mapRef.current) {
            const map = mapRef.current;
    
            // Xóa các layers và sources cũ
            if (map.getLayer('route')) {
                map.removeLayer('route');
                map.removeSource('route');
            }
    
            if (map.getLayer('end-marker')) {
                map.removeLayer('end-marker');
                map.removeSource('end-marker');
            }
    
            const routeData = await getRoute(start, end);
            if (routeData && routeData.geometry) {
                const routeGeometry = routeData.geometry;
                const duration = routeData.duration / 60; // Thời gian dự kiến tính bằng phút
                const distance = routeData.distance / 1000; // Khoảng cách tính bằng km
    
                // Thêm tuyến đường vào bản đồ
                map.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: routeGeometry
                            }
                        ]
                    }
                });
    
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round'
                    },
                    paint: {
                        'line-color': '#4285F4',
                        'line-width': 8
                    }
                });
    
                // Thêm marker cuối
                map.addSource('end-marker', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: end
                                }
                            }
                        ]
                    }
                });
    
                map.addLayer({
                    id: 'end-marker',
                    type: 'symbol',
                    source: 'end-marker',
                    layout: {
                        'icon-image': 'marker-15',
                        'icon-size': 3,
                        'icon-allow-overlap': true
                    }
                });
    
                // Sử dụng fitBounds để phóng to hoặc thu nhỏ bản đồ bao quanh tuyến đường
                const bounds = new mapboxgl.LngLatBounds();
                bounds.extend(start);
                bounds.extend(end);
                map.fitBounds(bounds, {
                    padding: 100
                });
    
                // Xóa popup cũ nếu tồn tại
                if (popupRef.current) {
                    popupRef.current.remove();
                }
    
                // Tính khoảng cách từ start đến end bằng Turf.js
                const line = turf.lineString([start, end]);
                const totalDistance = turf.length(line, { units: 'kilometers' });
    
                // Tìm điểm giữa tuyến đường (tính khoảng cách / 2)
                const halfwayPoint = turf.along(line, totalDistance / 2, { units: 'kilometers' });
                const halfwayCoords = halfwayPoint.geometry.coordinates;
    
                // Thêm popup mới tại điểm giữa tuyến đường, bên cạnh tuyến đường
                const newPopup = new mapboxgl.Popup({
                    offset: [20, 0]  // Điều chỉnh offset để popup xuất hiện bên cạnh tuyến đường
                })
                    .setLngLat(halfwayCoords)  // Đặt popup ở điểm giữa của tuyến đường
                    .setHTML(`<strong>Distance: ${totalDistance.toFixed(2)} km<br>Estimated Time: ${Math.round(duration)} min</strong>`)
                    .addTo(map);
    
                // Lưu popup hiện tại vào popupRef
                popupRef.current = newPopup;
            }
        }
    };
    
    
    const handleSubmit = () => {
        if (userLocation && destination) {
            drawRoute(userLocation, destination);
        } else {
            console.error('Vui lòng chọn bệnh viện trước');
        }

        console.log('Dữ liệu form:', formData);
    };

    return (
        <div>
            <div
                ref={mapContainerRef}
                style={{ width: '100%', height: '400px' }}
            />
            <div className="emergency-form">
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emergency" className="form-label">Emergency</label>
                    <select
                        id="emergency"
                        className="form-select"
                        value={formData.emergency}
                        onChange={handleInputChange}
                    >
                        <option value="no">Not Emergency</option>
                        <option value="yes">Emergency</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="hospital-selector">
                    <label htmlFor="hospital">Hospital</label>
                    <select
                        id="hospital"
                        className="form-select"
                        value={formData.hospital}
                        onChange={handleHospitalChange}
                    >
                        <option value="">Select a hospital</option>
                        {hospitals.map(hospital => (
                            <option key={hospital.id} value={hospital.name}>
                                {hospital.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="textareaValue">Text Area</label>
                    <textarea
                        className="form-control"
                        id="textareaValue"
                        rows="5"
                        value={formData.textareaValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="route-display">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Check
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mapbox;
