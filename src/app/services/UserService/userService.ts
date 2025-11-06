import { authApiFetch } from '../api';

export const createUser = async (data:object) => {
  return authApiFetch('users', 'POST', data)
}
export const getUserById = async (userId: string) => {
  return authApiFetch(`users/${userId}`, 'GET');
}
export const getUserList = async () => {
  return authApiFetch('users', 'GET');
}