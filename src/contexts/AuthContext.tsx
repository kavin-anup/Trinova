import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authAPI, getToken, removeToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Admin {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = getToken();
    if (token) {
      authAPI
        .getCurrentAdmin()
        .then((response) => {
          if (response.success && response.data?.admin) {
            setAdmin(response.data.admin);
          } else {
            // Only remove token if it's explicitly invalid (not just network errors)
            console.warn('Failed to verify admin session:', response.message);
            removeToken();
            setAdmin(null);
          }
        })
        .catch((error) => {
          // Only remove token if it's a 401 Unauthorized error
          // Keep token for network errors or server issues
          if (error?.response?.status === 401 || error?.message?.includes('Unauthorized')) {
            console.warn('Token is invalid or expired, logging out');
            removeToken();
            setAdmin(null);
          } else {
            // For other errors (network, server down, etc.), keep the token
            // but don't set admin (user will stay on current page)
            console.error('Error checking auth status, but keeping session:', error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success && response.data?.admin) {
        setAdmin(response.data.admin);
        navigate('/admin/dashboard');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setAdmin(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

