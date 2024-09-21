import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapbox.scss'
import * as turf from '@turf/turf';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useLocation } from 'react-router-dom';
import HostContext from '../Context/HostContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const DIRECTIONS_API_KEY = import.meta.env.VITE_MAPBOX_DIRECTIONS_API_KEY;

const Mapbox = () => {
    const { host } = useContext(HostContext);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const popupRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const location = useLocation();
    const [formData, setFormData] = useState({
        address: '',
        emergency: 'yes',
        phone: '',
        hospital: '',
        car: '',
        price: '',
        textareaValue: '',
        start_location: '',
        destination: '',
    });
    const [hospitals, setHospitals] = useState([]);
    const [ambulances, setAmbulances] = useState([]);
    const [isChecked, setIsChecked] = useState(false);


    const [destination, setDestination] = useState(null);
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    useEffect(() => {



        const fetchHospitals = async () => {
            try {
                const res = await axios.get(`${host}api/get-hospitals`);
                setHospitals(res.data);
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu bệnh viện:', error);
            }
        };

        const fetchAmbulances = async () => {
            try {
                const res = await axios.get(`${host}api/get-ambulance`);
                // console.log(res);
                setAmbulances(res.data);
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu xe cứu thương:', error);
            }
        };

        const fetchDrivers = async () => {
            try {
                const res = await axios.get(`${host}api/get-drivers`);
                return res.data;
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu tài xế:', error);
                return [];
            }
        };

        const initializeData = async () => {
            await Promise.all([fetchHospitals(), fetchAmbulances()]);
            const drivers = await fetchDrivers();
            const busyDriverIds = drivers.filter(driver => driver.status === 'busy').map(driver => driver.id);

            setAmbulances(prevAmbulances => prevAmbulances.filter(ambulance => !busyDriverIds.includes(ambulance.id)));
        };

        initializeData();
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

    const handleHospitalChange = (e, type) => {
        const selectedValue = e.target.value;

        if (type === 'hospital') {
            const selectedHospital = hospitals.find(h => h.name === selectedValue);
            if (selectedHospital) {
                const [latitude, longitude] = selectedHospital.address.split(',').map(Number);
                setDestination([longitude, latitude]);
            }
            setFormData(prevState => ({
                ...prevState,
                hospital: selectedValue,
            }));
        } else if (type === 'car') {
            setFormData(prevState => ({
                ...prevState,
                car: selectedValue,
            }));
        }
    };

    const getRoute = async (start, end) => {
        try {
            const response = await axios.get('https://api.mapbox.com/directions/v5/mapbox/driving-traffic/' +
                `${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=false&geometries=geojson&access_token=${DIRECTIONS_API_KEY}`);

            const route = response.data.routes[0];
            return {
                geometry: route.geometry,
                duration: route.duration,
                distance: route.distance
            };
        } catch (error) {
            console.error('Lỗi khi gọi Directions API:', error);
            return null;
        }
    };

    const drawRoute = async (start, end) => {
        if (start && end && mapRef.current) {
            const map = mapRef.current;

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
                const duration = routeData.duration / 60;

                const line = turf.lineString(routeGeometry.coordinates);
                const totalDistance = turf.length(line, { units: 'kilometers' });

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
                        'line-width': 5
                    }
                });

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

                const bounds = new mapboxgl.LngLatBounds();
                bounds.extend(start);
                bounds.extend(end);
                map.fitBounds(bounds, {
                    padding: 80
                });

                if (popupRef.current) {
                    popupRef.current.remove();
                }

                const halfwayPoint = turf.along(line, totalDistance / 2, { units: 'kilometers' });
                const halfwayCoords = halfwayPoint.geometry.coordinates;

                const newPopup = new mapboxgl.Popup({
                    offset: [0, 0]
                })
                    .setLngLat(halfwayCoords)
                    .setHTML(`<p>Distance: ${totalDistance.toFixed(2)} km<br>Estimated Time: ${Math.round(duration)} min</p>`)
                    .addTo(map);
                popupRef.current = newPopup;
            }
        }
    };

    const handleSubmit = async () => {
        if (!formData.address) {
            console.error('Please enter your address');
            return;
        }

        if (!formData.phone) {
            console.error('Please enter your phone number');
            return;
        }

        if (!formData.hospital || !formData.car) {
            console.error('Please choose hospital and ambulance car first');
            return;
        }

        const selectedHospital = hospitals.find(h => h.name === formData.hospital);
        if (!selectedHospital) {
            console.error('Hospital invalid');
            return;
        }

        const requestData = {
            user_id: localStorage.getItem('user') || null,
            hospital_id: selectedHospital.id,
            phone: formData.phone,
            type: formData.emergency === 'yes' ? 'urgent' : 'non-urgent',
            ambulance_id: formData.car,
            textarea_value: formData.textareaValue,
            start_location: JSON.stringify(userLocation),
            destination: JSON.stringify(destination)
        };

        if (userLocation && destination) {
            await drawRoute(userLocation, destination);
        }

        try {
            const response = await axios.post(`${host}api/emergency-requests`, requestData);
            console.log('Dữ liệu đã được lưu:', response.data);

            const driverId = formData.car;
            await axios.put(`${host}api/update-driver/${driverId}`, { status: 'busy' });

            console.log(driverId);
            setAmbulances(prevAmbulances =>
                prevAmbulances.map(ambulance =>
                    ambulance.id === formData.car
                        ? { ...ambulance, status: 'busy' }
                        : ambulance
                )
            );

            setIsChecked(true);

        } catch (error) {
            console.error('Request error:', error.response?.data || error.message);
        }

        console.log('Form data:', formData);
    };


    const changeMapStyle = (styleUrl) => {
        if (mapRef.current) {
            mapRef.current.setStyle(styleUrl);
        }
    };

    return (
        <div className='container'>
            <div className='call-ambulance justify-content-center row row-cols-lg-2 row-cols-md-1'>
                <div className='position-relative col-lg-8 col-md-12'>
                    <div ref={mapContainerRef} style={{ width: '100%', height: '70vh', position: 'realtive' }} />
                    <div className="map-controls">
                        <div className='control-items'>
                            <button onClick={() => changeMapStyle('mapbox://styles/mapbox/streets-v11')}><span className='txt'>Streets</span></button>
                        </div>
                        <div className='control-items'>
                            <button onClick={() => changeMapStyle('mapbox://styles/mapbox/light-v11')}><span className='txt'>Light</span></button>
                        </div>
                        <div className='control-items'>
                            <button onClick={() => changeMapStyle('mapbox://styles/mapbox/dark-v11')}><span className='txt'>Dark</span></button>
                        </div>
                        <div className='control-items'>
                            <button onClick={() => changeMapStyle('mapbox://styles/mapbox/outdoors-v11')}><span className='txt'>Outdoors</span></button>
                        </div>                        <div className='control-items'>
                            <button onClick={() => changeMapStyle('mapbox://styles/mapbox/satellite-v9')}><span className='txt'>Satellite</span></button>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-md-12'>
                    {location.pathname !== '/driver' && (
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="emergency-form">
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="form-control"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
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
                                                <option value="yes">Emergency</option>
                                                <option value="no">Not Emergency</option>
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
                                                required
                                            />
                                        </div>
                                        <div className="hospital-selector mb-3">
                                            <label htmlFor="hospital">Hospital</label>
                                            <select
                                                id="hospital"
                                                className="form-select"
                                                value={formData.hospital}
                                                onChange={(e) => handleHospitalChange(e, 'hospital')}
                                                disabled={isChecked}
                                            >
                                                <option value="">Select a hospital</option>
                                                {hospitals.map(hospital => (
                                                    <option key={hospital.id} value={hospital.name}>
                                                        {hospital.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='car-selector mb-3'>
                                            <label htmlFor="car" className='form-label'>Select a car</label>
                                            <select
                                                id="car"
                                                className='form-select'
                                                value={formData.car}
                                                onChange={(e) => handleHospitalChange(e, 'car')}
                                                disabled={isChecked}
                                            >
                                                <option value="">--Chosse a car--</option>
                                                {ambulances.filter(ambulance => ambulance.status !== 'busy').map(ambulance => (
                                                    <option key={ambulance.id} value={ambulance.id}>
                                                        {ambulance.name} {ambulance.price}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="textareaValue">Note</label>
                                            <textarea
                                                className="form-control"
                                                id="textareaValue"
                                                rows="5"
                                                value={formData.textareaValue}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="route-display text-center mb-3">
                                            <button className="btn-one" onClick={handleSubmit} disabled={isChecked}>
                                                <span className='txt'>Check</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Mapbox;
