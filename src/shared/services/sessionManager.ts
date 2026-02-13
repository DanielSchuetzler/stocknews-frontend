/**
 * Session Manager Service
 *
 * Keeps the user session alive by sending periodic heartbeat requests.
 * The backend rotates the session ID on each heartbeat for security.
 *
 * How it works:
 * 1. When user logs in, SessionManager starts sending heartbeat requests
 * 2. Every 30 minutes, calls /api/auth/refresh endpoint (unconditionally)
 * 3. Backend extends session timeout (sliding window) and rotates session ID
 * 4. If heartbeat fails (401), triggers session expiry event
 * 5. When user logs out, stops heartbeat
 *
 * Session Lifecycle:
 * - Backend session timeout: 30 days (stored in PostgreSQL via Spring Session JDBC)
 * - Heartbeat interval: 30 minutes (unconditional, no activity check)
 * - Session ID rotates every 30 min (stolen cookies expire fast)
 * - User stays logged in as long as tab is open (or app is visited within 30 days)
 * - Sessions survive backend container restarts (persisted in DB)
 */

import { apiClient } from '../api/client';

// Heartbeat interval: 30 minutes
// Sent unconditionally (no activity tracking) to ensure session never expires
// while the app is open. 48 requests/day per user is negligible server load.
const HEARTBEAT_INTERVAL = 30 * 60 * 1000; // 30 minutes

interface SessionManagerConfig {
  onSessionExpired?: () => void;
  onSessionRefreshed?: (expiresIn: number) => void;
  onError?: (error: Error) => void;
}

class SessionManager {
  private heartbeatIntervalId: number | null = null;
  private config: SessionManagerConfig = {};

  /**
   * Configure session manager callbacks
   */
  configure(config: SessionManagerConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Start periodic heartbeat to keep session alive
   * Call this after successful login
   */
  startHeartbeat(): void {
    // Don't start multiple heartbeats
    if (this.heartbeatIntervalId !== null) {
      console.log('[SessionManager] Heartbeat already running');
      return;
    }

    console.log('[SessionManager] Starting heartbeat (interval: 30 minutes)');

    // Send initial heartbeat immediately
    this.sendHeartbeat();

    // Schedule periodic heartbeats (unconditional - no activity check)
    this.heartbeatIntervalId = window.setInterval(() => {
      this.sendHeartbeat();
    }, HEARTBEAT_INTERVAL);
  }

  /**
   * Stop heartbeat when user logs out
   */
  stopHeartbeat(): void {
    if (this.heartbeatIntervalId !== null) {
      console.log('[SessionManager] Stopping heartbeat');
      window.clearInterval(this.heartbeatIntervalId);
      this.heartbeatIntervalId = null;
    }
  }

  /**
   * Check if heartbeat is currently running
   */
  isHeartbeatActive(): boolean {
    return this.heartbeatIntervalId !== null;
  }

  /**
   * Send heartbeat request to backend
   * Nutzt den zentralen apiClient (Axios) statt fetch():
   * - Gleiche baseURL-Logik (lokal + VPS)
   * - CSRF-Token wird automatisch mitgesendet
   * - Cookies (JSESSIONID) werden automatisch mitgesendet
   */
  private async sendHeartbeat(): Promise<void> {
    try {
      const { data } = await apiClient.post('/auth/refresh');

      console.log('[SessionManager] Session refreshed (ID rotated)', {
        expiresIn: data.expiresIn,
        expiresInDays: Math.floor(data.expiresIn / 86400),
      });

      // Notify callback
      if (this.config.onSessionRefreshed) {
        this.config.onSessionRefreshed(data.expiresIn);
      }
    } catch (error: any) {
      // Check if session expired (401)
      if (error?.response?.status === 401) {
        console.warn('[SessionManager] Session expired (401)');
        this.handleSessionExpired();
        return;
      }

      console.error('[SessionManager] Heartbeat error:', error);

      if (this.config.onError) {
        this.config.onError(error as Error);
      }
    }
  }

  /**
   * Handle session expiration
   */
  private handleSessionExpired(): void {
    console.log('[SessionManager] Handling session expiration');

    // Stop heartbeat
    this.stopHeartbeat();

    // Dispatch custom event for global handling
    window.dispatchEvent(new CustomEvent('auth:unauthorized'));

    // Notify callback
    if (this.config.onSessionExpired) {
      this.config.onSessionExpired();
    }
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();
