import axios from 'axios';
import mapboxgl from 'mapbox-gl';


export const fetchNearbyHospitals = async (longitude, latitude, setHospitalOptions) => {
  try {
    const response = await axios.get(
      'https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json',
      {
        params: {
          proximity: `${longitude},${latitude}`,
          access_token: mapboxgl.accessToken
        }
      }
    );

    const hospitals = response.data.features;
    setHospitalOptions(hospitals.map(hospital => ({
      id: hospital.id,
      name: hospital.text,
      coordinates: hospital.geometry.coordinates
    })));
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error.message);
  }
};
