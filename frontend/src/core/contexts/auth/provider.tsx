import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './context';
import type { User, AuthContextValue } from './types';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * @component AuthProvider
 * @summary Provides authentication context to the application
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string): Promise<User> => {
    setIsLoading(true);
    try {
      const userData: User = { id: '1', email, name: 'User' };
      const token = 'mock-token';
      localStorage.setItem('auth_token', token);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
