import axios from 'axios';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';

export const getAmbulanceRoute = async (start, end, setRoute, mapInstance, setDestinationMarker) => {
  try {
    if (!Array.isArray(start) || !Array.isArray(end)) {
      throw new Error('Invalid coordinates.');
    }

    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}`,
      {
        params: {
          access_token: mapboxgl.accessToken,
          geometries: 'geojson',
          exclude: 'toll,ferry'
        }
      }
    );

    if (response.data.routes.length === 0) {
      throw new Error('No routes found.');
    }

    const route = response.data.routes[0].geometry;
    setRoute(route);

    if (mapInstance.getSource('route')) {
      mapInstance.getSource('route').setData({
        type: 'Feature',
        geometry: route
      });
    } else {
      mapInstance.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      });

      mapInstance.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#4285F4',
          'line-width': 5
        }
      });
    }

    if (setDestinationMarker) {
      const newMarker = new mapboxgl.Marker({ color: '#0000ff' })
        .setLngLat(end)
        .setPopup(new mapboxgl.Popup().setText('Destination'))
        .addTo(mapInstance);

      setDestinationMarker(newMarker);
    }

    const routeLine = turf.lineString(route.coordinates);
    const bbox = turf.bbox(routeLine);
    mapInstance.fitBounds(bbox, {
      padding: 50
    });

  } catch (error) {
    console.error('Error getting ambulance route:', error.message);
  }
};
