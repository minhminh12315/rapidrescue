import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';


export const fetchNearbyHospitals = async (longitude, latitude, setHospitalOptions, setNearestHospital) => {
  try {
    const userPoint = [longitude, latitude];
    let minDistance = Infinity;
    let nearestHospital = null;

    const res = await axios.get("http://localhost:8000/api/get-hospitals");
    let hospitals = res.data;

    // Thêm lat long vào tất cả các đối tượng bệnh viện
    hospitals.forEach((el, i) => {
      let coord = el.address;
      const coordarr = coord.split(',').map(part => parseFloat(part.trim()));
      hospitals[i].coord = coordarr;
    });

    // Tính khoảng cách và tìm bệnh viện gần nhất
    hospitals.forEach((el, i) => {
      const hospitalPoint = turf.point(el.coord);
      const usrPoint = turf.point(userPoint);
      const distance = turf.distance(usrPoint, hospitalPoint, { units: 'kilometers' });
      // hospitals[i].distance = distance; 
      // console.log(distance)
      if (distance < minDistance) {
        minDistance = distance;
        nearestHospital = el;
      }
    });

    // Cập nhật tùy chọn bệnh viện và bệnh viện gần nhất
    setHospitalOptions(hospitals.map(hospital => ({
      id: hospital.id,
      name: hospital.name,
      coordinates: hospital.coord,
      // distance: hospital.distance 
    })));
    setNearestHospital(nearestHospital);
    // console.log(nearestHospital);
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error.message);
  }
};

