/**
 * OAuth2 Callback Page
 * Handles redirect from Google OAuth consent screen
 *
 * Flow:
 * 1. Google redirects to this page with code and state parameters
 * 2. Page automatically sends code/state to backend
 * 3. Backend validates, creates session, returns user data
 * 4. Page stores user in auth store and redirects to dashboard
 *
 * URL: /oauth2/callback?code=XXX&state=YYY
 */

import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/entities/auth/store';
import { apiClient } from '@/shared/api/client';
import type { User } from '@/shared/types';

export const OAuth2CallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double execution (React StrictMode runs effects twice)
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const handleCallback = async () => {
      // Get code and state from URL
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      // Check for OAuth errors (user denied, etc.)
      if (error) {
        setStatus('error');
        setErrorMessage(
          error === 'access_denied'
            ? 'Du hast die Google-Anmeldung abgebrochen.'
            : 'Google-Anmeldung fehlgeschlagen.'
        );
        return;
      }

      // Validate code and state exist
      if (!code || !state) {
        setStatus('error');
        setErrorMessage('Ungültige OAuth-Parameter.');
        return;
      }

      // CRITICAL SECURITY: Validate OAuth state to prevent CSRF attacks
      const storedState = sessionStorage.getItem('oauth_state');
      if (!storedState || storedState !== state) {
        console.error('[OAuth] State mismatch detected - possible CSRF attack');
        setStatus('error');
        setErrorMessage('Sicherheitsfehler: OAuth-State stimmt nicht überein. Bitte versuche es erneut.');
        sessionStorage.removeItem('oauth_state');
        return;
      }

      // Clear state after successful validation
      sessionStorage.removeItem('oauth_state');

      try {
        // Send code and state to backend
        const response = await apiClient.get(
          `/auth/oauth2/callback/google?code=${code}&state=${state}`
        );

        const data = response.data;

        // Store user in auth store
        const user: User = {
          id: data.userId,
          email: data.email
        };
        setUser(user);

        // Mark as success to prevent showing any UI
        setStatus('success');

        // Wait for store to be persisted to localStorage
        await new Promise(resolve => setTimeout(resolve, 50));

        // Redirect - show welcome for new registrations
        const welcomeParam = data.isNewUser ? '?welcome=true' : '';
        navigate(`/dashboard${welcomeParam}`, { replace: true });
      } catch (err) {
        console.error('OAuth callback error:', err);
        setStatus('error');
        setErrorMessage(
          err instanceof Error
            ? err.message
            : 'Google-Anmeldung fehlgeschlagen. Bitte versuche es erneut.'
        );
      }
    };

    // Only run once on mount - ignore deps warning since we want this to run exactly once
    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps = run only once on mount

  return (
    <div className="app-container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {(status === 'loading' || status === 'success') && (
          <>
            {/* Loading Spinner */}
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 2rem',
              border: '4px solid var(--border-color)',
              borderTop: '4px solid var(--primary-color)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />

            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem'
            }}>
              Anmeldung läuft...
            </h1>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem'
            }}>
              Bitte warten, während wir deine Google-Anmeldung verarbeiten.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            {/* Error Icon */}
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 2rem',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>

            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem'
            }}>
              Anmeldung fehlgeschlagen
            </h1>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              marginBottom: '2rem'
            }}>
              {errorMessage}
            </p>

            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem'
              }}
            >
              Zurück zur Anmeldung
            </button>
          </>
        )}

        {/* CSS for loading spinner animation */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
      </div>
    </div>
  );
};
