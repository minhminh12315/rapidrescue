import axios from 'axios';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';

let currentPopup = null;

export const getAmbulanceRoute = async (start, end, setRoute, mapInstance, setDestinationMarker, clearMarkers, addMarker) => {
  try {
    if (!Array.isArray(start) || !Array.isArray(end)) {
      throw new Error('Tọa độ không hợp lệ.');
    }

    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}`,
      {
        params: {
          access_token: mapboxgl.accessToken,
          geometries: 'geojson',
          exclude: 'toll,ferry'
        }
      }
    );

    if (response.data.routes.length === 0) {
      throw new Error('Không tìm thấy lộ trình.');
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
      const el = document.createElement('div');
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.backgroundColor = '#007cbf'; 
      el.style.borderRadius = '50%'; 
      el.style.border = '2px solid #ffffff'; 
      el.style.cursor = 'pointer'; 
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';

      const newMarker = new mapboxgl.Marker(el)
        .setLngLat(end)
        .setPopup(new mapboxgl.Popup().setText('Điểm đến'))
        .addTo(mapInstance);

      setDestinationMarker(newMarker);
    }

    if (addMarker) {
      clearMarkers();
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const userCoords = [position.coords.longitude, position.coords.latitude];

      const distanceToEnd = turf.distance(userCoords, end, { units: 'kilometers' });

      const routeLine = turf.lineString(route.coordinates);
      const lineLength = turf.length(routeLine, { units: 'kilometers' });
      const midpoint = turf.along(routeLine, lineLength / 2, { units: 'kilometers' });
      const midpointCoordinates = midpoint.geometry.coordinates;

      const travelTimeSeconds = response.data.routes[0].duration;
      const travelTimeMinutes = Math.round(travelTimeSeconds / 60);

      // Xóa popup cũ nếu tồn tại
      if (currentPopup) {
        currentPopup.remove();
      }

      // Hiển thị popup tại điểm giữa
      currentPopup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(midpointCoordinates)
        .setHTML(`
          <p>Tổng khoảng cách: ${lineLength.toFixed(2)} km</p>
          <p>Thời gian dự kiến đến: ${travelTimeMinutes} phút</p>
        `)
        .addTo(mapInstance);

      const bbox = turf.bbox(routeLine);
      mapInstance.fitBounds(bbox, {
        padding: 50
      });
    }, (error) => {
      console.error('Lỗi khi lấy vị trí hiện tại:', error.message);
    });
  } catch (error) {
    console.error('Lỗi khi lấy lộ trình cấp cứu:', error.message);
  }
};
