import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-cyan-400 text-4xl animate-spin mb-4"></i>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, go to dashboard, otherwise go to login
  return <Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} replace />;
}

