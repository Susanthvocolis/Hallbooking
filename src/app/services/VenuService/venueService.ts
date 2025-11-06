import { authApiFetch } from '../api';

export const createVenue = async (data:object) => {
  return authApiFetch('venues', 'POST', data)
}

export const getVenueListByOwnerId = async (OwnerId: string) => {
  return authApiFetch(`venues/owner/${OwnerId}`, 'GET');
};