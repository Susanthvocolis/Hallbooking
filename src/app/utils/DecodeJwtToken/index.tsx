import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';

interface CustomJwtPayload {
  id: string;
  fullName: string;
  email: string;
  role: string;
  mobileNo: string;
  // profileImage: { data: number[] } | null;
}

export const DecodeJwtToken = (): CustomJwtPayload | null => {
  const jwtToken = JSON.stringify(Cookies.get('jwt_token'))
  if (jwtToken) {
    try {
      return jwtDecode<CustomJwtPayload>(jwtToken);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
};