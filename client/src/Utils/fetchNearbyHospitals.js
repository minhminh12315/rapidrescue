import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';


export const fetchNearbyHospitals = async (longitude, latitude, setHospitalOptions ,setNearestHospital) => {
  try {
    const userPoint = [longitude, latitude];
    let minDistance = Infinity;
    let nearestHospital = null;

    const res = await axios.get("http://localhost:8000/api/hospitals");
    let hostpitals = res.data;
    // add lat long to all object hospital
    hostpitals.forEach((el,i) => {
        let coord = el.address;
     
        const coordarr = coord.split(',').map(part => parseFloat(part.trim()));
        // console.log(coordarr);
        hostpitals[i].coord = coordarr;
        // console.log(hostpitals[i]);
    });
    // calculate min distance
    hostpitals.forEach((el,i) =>{
      const hospitalPoint = turf.point(el.coord);
      const usrPoint = turf.point(userPoint);
      const distance = turf.distance(usrPoint, hospitalPoint, { units: 'kilometers' });
      if (distance < minDistance) {
        minDistance = distance;
        nearestHospital = el;
      }
    });
    // console.log(nearestHospital);
     setHospitalOptions(hostpitals.map(hospital => ({
      id: hospital.id,
      name: hospital.name,
      coordinates: hospital.coord
    })));
    setNearestHospital(nearestHospital);
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error.message);
  }
};
