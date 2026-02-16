/**
 * Session Manager Service
 *
 * Keeps the user session alive by sending periodic heartbeat requests.
 *
 * How it works:
 * 1. When user logs in, SessionManager starts sending heartbeat requests
 * 2. Every 30 minutes, calls /api/auth/refresh endpoint (unconditionally)
 * 3. Backend extends session timeout (sliding window)
 * 4. If heartbeat fails (401), triggers session expiry event
 * 5. When user logs out, stops heartbeat
 *
 * IMPORTANT: The first heartbeat is DELAYED (not immediate) to avoid
 * race conditions with other requests that fire on page load (F5).
 * On page reload, useCurrentUser already calls GET /api/auth/me which
 * extends the session. Firing an immediate heartbeat would cause
 * concurrent requests with different timing, risking 401/403 errors.
 *
 * Session Lifecycle:
 * - Backend session timeout: 30 days (stored in PostgreSQL via Spring Session JDBC)
 * - Heartbeat interval: 30 minutes (unconditional, no activity check)
 * - User stays logged in as long as tab is open (or app is visited within 30 days)
 * - Sessions survive backend container restarts (persisted in DB)
 */

import { apiClient } from '../api/client';

const HEARTBEAT_INTERVAL = 30 * 60 * 1000; // 30 minutes

interface SessionManagerConfig {
  onSessionExpired?: () => void;
  onSessionRefreshed?: (expiresIn: number) => void;
  onError?: (error: Error) => void;
}

class SessionManager {
  private heartbeatIntervalId: number | null = null;
  private config: SessionManagerConfig = {};

  configure(config: SessionManagerConfig): void {
    this.config = { ...this.config, ...config };
  }

  startHeartbeat(): void {
    if (this.heartbeatIntervalId !== null) return;

    this.heartbeatIntervalId = window.setInterval(() => {
      this.sendHeartbeat();
    }, HEARTBEAT_INTERVAL);
  }

  stopHeartbeat(): void {
    if (this.heartbeatIntervalId !== null) {
      window.clearInterval(this.heartbeatIntervalId);
      this.heartbeatIntervalId = null;
    }
  }

  isHeartbeatActive(): boolean {
    return this.heartbeatIntervalId !== null;
  }

  private async sendHeartbeat(): Promise<void> {
    try {
      const { data } = await apiClient.post('/auth/refresh');

      if (this.config.onSessionRefreshed) {
        this.config.onSessionRefreshed(data.expiresIn);
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        this.handleSessionExpired();
        return;
      }

      console.error('[SessionManager] Heartbeat error:', error);

      if (this.config.onError) {
        this.config.onError(error as Error);
      }
    }
  }

  private handleSessionExpired(): void {
    this.stopHeartbeat();
    window.dispatchEvent(new CustomEvent('auth:unauthorized'));

    if (this.config.onSessionExpired) {
      this.config.onSessionExpired();
    }
  }
}

export const sessionManager = new SessionManager();
