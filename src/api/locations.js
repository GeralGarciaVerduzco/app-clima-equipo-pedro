import api from './client';

export async function getOrCreateLocationByCoords(lat, lon) {
  const res = await api.get('/locations/by-coords', {
    params: { lat, lon },
  });
  return res.data; 
}
