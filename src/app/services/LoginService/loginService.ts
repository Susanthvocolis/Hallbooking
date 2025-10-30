import { authApiFetch } from '../api';

// Login
export const login = async (credentials: { email: string; password: string }) => {
  return authApiFetch('users/login', 'POST', credentials);
};

// Signup
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return authApiFetch('/signup', 'POST', data);
};
