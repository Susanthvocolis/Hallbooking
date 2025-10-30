"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JSX } from 'react/jsx-runtime';

interface CustomJwtPayload {
  role: string;
}

const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole: string[] }) => {
  const router = useRouter();
  const jwtToken = Cookies.get('jwt_token');
  const [isLoading, setIsLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!jwtToken) {
      router.push('/');
    } else {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(jwtToken);
        if (requiredRole.includes(decoded.role)) {
            setIsAuthenticated(true);
        } else {
          router.push('/');
        }
      } catch {
        router.push('/');
      }
    }
    setIsLoading(false);
  }, [jwtToken, router, requiredRole]);

  if (isLoading) {
    return null; 
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;