import { authApiFetch } from '../api';

// Login
export const login = async (credentials: { email: string; password: string }) => {
  return authApiFetch('users/login', 'POST', credentials);
};

// Signup
export const register = async (data: any) => {
  return authApiFetch('users/register', 'POST', data);
};

export const updateUser = async (userId: string, data: any) => {
  return authApiFetch(`users/${userId}`, 'PUT', data);
}

export const deleteUser = async (userId: string) => {
  return authApiFetch(`users/${userId}`, 'DELETE');
}

export const getEmployees = async () => {
  return authApiFetch('users/employees', 'GET');
};