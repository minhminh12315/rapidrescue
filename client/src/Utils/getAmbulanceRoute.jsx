import axios from 'axios';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import ReactDOMServer from 'react-dom/server';
import { FaAmbulance } from 'react-icons/fa'; 
import { FaRegHospital } from "react-icons/fa";


export const getAmbulanceRoute = async (start, end, setRoute, mapInstance, setDestinationMarker) => {
  try {
    if (!Array.isArray(start) || !Array.isArray(end)) {
      throw new Error('Tọa độ không hợp lệ.');
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
      // Chuyển đổi biểu tượng React thành chuỗi HTML
      const iconHtml = ReactDOMServer.renderToString(<FaAmbulance color="red" size="24px" />);

      // Tạo một phần tử DOM mới để sử dụng làm marker
      const el = document.createElement('div');
      el.innerHTML = iconHtml;
      el.style.fontSize = '24px'; // Điều chỉnh kích thước nếu cần

      const newMarker = new mapboxgl.Marker(el)
        .setLngLat(end)
        .setPopup(new mapboxgl.Popup().setText('Điểm đến'))
        .addTo(mapInstance);

      setDestinationMarker(newMarker);
    }

    const routeLine = turf.lineString(route.coordinates);
    const bbox = turf.bbox(routeLine);
    mapInstance.fitBounds(bbox, {
      padding: 50
    });

  } catch (error) {
    console.error('Lỗi khi lấy lộ trình cấp cứu:', error.message);
  }
};
