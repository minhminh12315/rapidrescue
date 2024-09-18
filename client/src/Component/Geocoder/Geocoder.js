import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Geocoder.scss';

const Geocoder = ({ map, setDestination }) => {
  useEffect(() => {
    if (map) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for a destination',
      });

      map.addControl(geocoder);

      geocoder.on('result', (event) => {
        const destination = event.result.geometry.coordinates;
        setDestination(destination);
      });

      return () => map.removeControl(geocoder);
    }
  }, [map]);

  return null;
};

export default Geocoder;
