/**
 * useSessionKeepAlive Hook
 *
 * React hook to automatically manage session keep-alive (heartbeat).
 * Starts heartbeat when user is authenticated, stops on logout.
 *
 * This hook should be used at the root level (App.tsx) to ensure
 * session management works throughout the entire application.
 *
 * How it works:
 * 1. Monitors authentication state from useAuthStore
 * 2. When user logs in: Starts heartbeat (first fires after 30 min, not immediately)
 * 3. When user logs out: Stops heartbeat
 * 4. On session expiry (401): Clears auth store and redirects to login
 *
 * Session Lifecycle:
 * - Backend session: 30 days timeout (stored in PostgreSQL)
 * - Frontend heartbeat: Every 30 minutes (unconditional, no activity check)
 * - Heartbeat extends session timeout (sliding window)
 * - User stays logged in as long as tab is open or app visited within 30 days
 * - Sessions survive backend container restarts (Spring Session JDBC)
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
    // Configure session manager callbacks
    sessionManager.configure({
      // On session expiry: Clear local auth state and redirect to login
      onSessionExpired: () => {
        console.log('[useSessionKeepAlive] Session expired, redirecting to login');
        clearUser();
        navigate('/login', { replace: true });
      },

      // On successful refresh: Log session info (optional)
      onSessionRefreshed: (expiresIn) => {
        console.log('[useSessionKeepAlive] Session refreshed', {
          expiresInSeconds: expiresIn,
          expiresInHours: Math.floor(expiresIn / 3600),
        });
      },

      // On error: Log but don't interrupt user (will retry on next interval)
      onError: (error) => {
        console.error('[useSessionKeepAlive] Heartbeat error:', error);
      },
    });

    // Start/stop heartbeat based on authentication state
    if (isAuthenticated) {
      console.log('[useSessionKeepAlive] User authenticated, starting heartbeat');
      sessionManager.startHeartbeat();
    } else {
      console.log('[useSessionKeepAlive] User not authenticated, stopping heartbeat');
      sessionManager.stopHeartbeat();
    }

    // Cleanup on unmount
    return () => {
      sessionManager.stopHeartbeat();
    };
  }, [isAuthenticated, clearUser, navigate]);

  // Hook doesn't return anything - it just manages side effects
};
