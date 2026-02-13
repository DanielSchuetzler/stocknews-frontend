/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Waits for session check to complete before deciding
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/entities/auth/store';
import { useCurrentUser } from '@/entities/auth/queries';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for protected routes
 * Redirects to /login if user is not authenticated
 * Preserves intended destination in location state for redirect after login
 *
 * CRITICAL: Waits for useCurrentUser query to finish before redirecting
 * This prevents race condition where OAuth login redirects to /dashboard
 * but ProtectedRoute redirects back to /login before session is validated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const { isLoading } = useCurrentUser();

  // Show loading state while checking session
  // This prevents premature redirect after OAuth login
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <div>Lade...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, save current location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
