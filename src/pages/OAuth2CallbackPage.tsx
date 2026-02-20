/**
 * OAuth2 Callback Page
 * Google redirects the user HERE (frontend) with code + state.
 *
 * Flow:
 * 1. Google redirects to /oauth2/callback/google?code=XXX&state=YYY (THIS page)
 * 2. Page validates state (CSRF protection)
 * 3. Page calls backend /api/auth/oauth2/callback/google?code=...&state=... via Axios (withCredentials)
 * 4. Backend exchanges code for token, creates user, sets JSESSIONID cookie in response
 * 5. Axios receives the cookie → browser stores it (same-origin, no redirect involved)
 * 6. Page navigates to /dashboard via React Router (cookie already set)
 *
 * Why this works: The backend call is a direct fetch (not a browser redirect),
 * so Set-Cookie is reliably stored before navigation happens.
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

      if (!code || !state) {
        setStatus('error');
        setErrorMessage('Ungültige OAuth-Parameter.');
        return;
      }

      // CSRF: Validate state against sessionStorage
      const storedState = sessionStorage.getItem('oauth_state');
      if (!storedState || storedState !== state) {
        console.error('[OAuth] State mismatch - possible CSRF attack');
        setStatus('error');
        setErrorMessage('Sicherheitsfehler: OAuth-State stimmt nicht überein. Bitte versuche es erneut.');
        sessionStorage.removeItem('oauth_state');
        return;
      }
      sessionStorage.removeItem('oauth_state');

      try {
        // Call backend via Axios (withCredentials=true → Set-Cookie is stored by browser)
        // Backend exchanges code for token, creates/finds user, sets JSESSIONID cookie
        const response = await apiClient.get(
          `/auth/oauth2/callback/google?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
        );

        const data = response.data;

        // Store user in auth store
        const user: User = {
          id: data.userId,
          email: data.email
        };
        setUser(user);

        setStatus('success');

        // Small delay to ensure cookie is persisted before navigation
        await new Promise(resolve => setTimeout(resolve, 100));

        const welcomeParam = data.isNewUser ? '?welcome=true' : '';
        navigate(`/dashboard${welcomeParam}`, { replace: true });

      } catch (err: unknown) {
        console.error('[OAuth] Callback error:', err);

        // Try to extract error message from backend response
        const axiosError = err as { response?: { data?: { error?: string; message?: string } } };
        const backendMsg = axiosError?.response?.data?.error || axiosError?.response?.data?.message;

        setStatus('error');
        setErrorMessage(backendMsg || 'Google-Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {(status === 'loading' || status === 'success') && (
          <>
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
            >
              Zurück zur Anmeldung
            </button>
          </>
        )}

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
