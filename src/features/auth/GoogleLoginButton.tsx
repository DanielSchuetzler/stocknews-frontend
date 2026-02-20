/**
 * Google OAuth Login Button
 * Reusable component for "Sign in with Google" functionality
 *
 * OAuth Flow:
 * 1. User clicks button
 * 2. Component calls /api/auth/oauth2/google to get authorization URL
 * 3. User redirects to Google consent screen
 * 4. Google redirects to /api/auth/oauth2/callback/google (backend)
 * 5. Backend validates, creates session, sets JSESSIONID cookie
 * 6. Backend redirects to frontend /dashboard (with welcome param if new user)
 */

import { useState } from 'react';
import { apiClient } from '@/shared/api/client';

interface GoogleLoginButtonProps {
  /** Button text */
  text?: string;
  /** Show on login page or register page (affects wording) */
  variant?: 'login' | 'register';
  /** Full width button */
  fullWidth?: boolean;
}

export const GoogleLoginButton = ({
  text,
  variant = 'login',
  fullWidth = false
}: GoogleLoginButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultText = variant === 'login'
    ? 'Mit Google anmelden'
    : 'Mit Google registrieren';

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get Google authorization URL from backend
      const response = await apiClient.get('/auth/oauth2/google');
      const authUrl: string = response.data.authUrl;

      // Extract state parameter from URL and store in sessionStorage for CSRF validation
      // sessionStorage survives the Google redirect because it stays on the same tab
      const urlParams = new URLSearchParams(new URL(authUrl).search);
      const state = urlParams.get('state');
      if (state) {
        sessionStorage.setItem('oauth_state', state);
      }

      // Redirect user to Google consent screen
      window.location.href = authUrl;
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google-Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
      setLoading(false);
    }
  };

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{
          width: fullWidth ? '100%' : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 500,
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          background: 'white',
          color: '#1f2937',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          opacity: loading ? 0.7 : 1
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.background = '#f9fafb';
            e.currentTarget.style.borderColor = '#9ca3af';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white';
          e.currentTarget.style.borderColor = 'var(--border-color)';
        }}
      >
        {/* Google Logo SVG */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>

        {loading ? 'Anmeldung läuft...' : (text || defaultText)}
      </button>

      {error && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            color: '#ef4444',
            fontSize: '0.875rem'
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};
