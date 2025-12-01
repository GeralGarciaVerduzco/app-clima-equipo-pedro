import api from './client';

export async function getFavorites() {
  const res = await api.get('/favorites');
  return res.data; 
}

export async function addFavorite(locationId) {
  const res = await api.post('/favorites', { locationId });
  return res.data;
}

export async function removeFavorite(locationId) {
  const res = await api.delete(`/favorites/${locationId}`);
  return res.data;
}
