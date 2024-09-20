import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const DIRECTIONS_API_KEY = import.meta.env.VITE_MAPBOX_DIRECTIONS_API_KEY;

const Driver = ({ ambulanceId }) => {
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

        // Vẽ các yêu cầu khi có thay đổi
        if (requests.length > 0) {
            requests.forEach(request => {
                const userLocation = JSON.parse(request.start_location);
                const destination = JSON.parse(request.destination);
                drawRoute(userLocation, destination);
            });
        }
    }, [requests]);

    const getRoute = async (start, end) => {
        try {
            const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=false&geometries=geojson&access_token=${DIRECTIONS_API_KEY}`);
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

                // Vẽ marker cho điểm đến
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
            }
        }
    };

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '70vh' }} />
    );
};

export default Driver;
