/**
 * useSessionKeepAlive Hook
 *
 * Manages session keep-alive (heartbeat). Starts when authenticated, stops on logout.
 * Used at root level (App.tsx) to ensure session management works app-wide.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/auth/store';
import { sessionManager } from '@/shared/services/sessionManager';

export const useSessionKeepAlive = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    sessionManager.configure({
      onSessionExpired: () => {
        clearUser();
        navigate('/login', { replace: true });
      },
      onError: (error) => {
        console.error('[SessionKeepAlive] Heartbeat error:', error);
      },
    });

    if (isAuthenticated) {
      sessionManager.startHeartbeat();
    } else {
      sessionManager.stopHeartbeat();
    }

    return () => {
      sessionManager.stopHeartbeat();
    };
  }, [isAuthenticated, clearUser, navigate]);
};
