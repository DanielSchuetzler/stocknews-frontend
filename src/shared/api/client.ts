/**
 * Axios API Client Configuration
 * Centralized HTTP client with interceptors for authentication and error handling
 */

import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

interface CsrfRetryConfig extends AxiosRequestConfig {
  _csrfRetry?: boolean;
}

// Get API base URL from environment variables
// Production: VITE_API_URL ist leer → relative URL "" → Browser ruft /api/* auf gleichem Host auf
// Development: VITE_API_URL = "http://localhost:8080" → direkter Aufruf ans Backend
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

/**
 * Main API client instance
 * Configured to work with Spring Boot session-based authentication
 */
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // CRITICAL: Send session cookies with every request
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Request Interceptor
 * Adds CSRF token to all state-changing requests (POST, PUT, PATCH, DELETE)
 * Logs outgoing requests in development mode
 *
 * CSRF Protection Strategy:
 * - Backend: CookieCsrfTokenRepository (Spring Security)
 * - Frontend: Reads XSRF-TOKEN cookie, sends as X-XSRF-TOKEN header
 * - Double Submit Cookie Pattern (OWASP recommended)
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add CSRF token for state-changing requests
    // Spring Boot expects CSRF token in X-XSRF-TOKEN header
    // The token is automatically set in XSRF-TOKEN cookie by Spring Security
    if (config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
        if (import.meta.env.DEV) {
          console.log(`[CSRF] Adding token to ${config.method?.toUpperCase()} ${config.url}`);
        }
      } else if (import.meta.env.DEV) {
        console.warn(`[CSRF] No token found for ${config.method?.toUpperCase()} ${config.url}`);
      }
    }

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Extract CSRF token from cookies
 * Spring Boot sets XSRF-TOKEN cookie automatically on first GET request
 */
function getCsrfToken(): string | null {
  const name = 'XSRF-TOKEN';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

/**
 * Response Interceptor
 * Handles global error responses (e.g., 401 Unauthorized)
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as CsrfRetryConfig | undefined;

    // Handle 403 caused by a missing CSRF token (race condition after login/register).
    // The 403 response from Spring Security includes a fresh Set-Cookie: XSRF-TOKEN,
    // so we wait one tick for the browser to commit it, then retry exactly once.
    // We ONLY retry when X-XSRF-TOKEN was absent in the original request – if the
    // header was present but rejected that is a real auth error and must not be retried.
    if (
      error.response?.status === 403 &&
      config &&
      !config._csrfRetry &&
      !error.config?.headers?.['X-XSRF-TOKEN']
    ) {
      config._csrfRetry = true;
      // Yield to the event loop so the browser can process the Set-Cookie header
      await new Promise(resolve => setTimeout(resolve, 0));
      const csrfToken = getCsrfToken();
      if (csrfToken && config.headers) {
        (config.headers as Record<string, string>)['X-XSRF-TOKEN'] = csrfToken;
      }
      return apiClient(config);
    }

    // Handle 401 Unauthorized - session expired or not authenticated
    if (error.response?.status === 401) {
      console.warn('[API] Session expired or unauthorized');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    // Handle network errors
    if (!error.response) {
      console.error('[API] Network error or backend unavailable');
    }

    // Log errors in development
    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to get error message from API response
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Extract error message from backend response
    const message = error.response?.data?.message || error.response?.data?.error;
    if (message) return message;

    // Fallback to HTTP status messages
    switch (error.response?.status) {
      case 400:
        return 'Ungültige Anfrage';
      case 401:
        return 'Nicht authentifiziert';
      case 403:
        return 'Zugriff verweigert';
      case 404:
        return 'Ressource nicht gefunden';
      case 500:
        return 'Serverfehler';
      default:
        return 'Ein Fehler ist aufgetreten';
    }
  }

  // Generic error
  return 'Ein unbekannter Fehler ist aufgetreten';
};

export default apiClient;
