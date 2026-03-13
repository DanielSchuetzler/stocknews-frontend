/**
 * Cookie Banner Component
 * DSGVO/TDDDG-compliant cookie consent for Google AdSense
 * - Link to Datenschutz page
 * - Clear accept/decline options
 * - Consent stored in localStorage
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'cookie_consent';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      loadGoogleAdSense();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setIsVisible(false);
    loadGoogleAdSense();
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setIsVisible(false);
  };

  const loadGoogleAdSense = () => {
    if (!document.querySelector('script[data-ad-client]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXX'); // Replace with your AdSense publisher ID
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className="cookie-banner"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: '900px',
          margin: '0 auto',
          background: 'var(--surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px 8px 0 0',
          padding: '1rem 1.5rem',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '0.875rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>&#x1F36A;</span>
          <p style={{
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Wir verwenden optionale Cookies f&uuml;r Werbung (Google AdSense).
            Technisch notwendige Cookies (Session, CSRF-Schutz) werden immer gesetzt.{' '}
            <Link to="/datenschutz" style={{ color: 'var(--primary-color)' }}>
              Mehr erfahren
            </Link>
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexShrink: 0
        }}>
          <button
            onClick={handleDecline}
            className="btn-secondary"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem'
            }}
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="btn-primary"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem'
            }}
          >
            Akzeptieren
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .cookie-banner {
            flex-direction: column !important;
            gap: 0.75rem !important;
            padding: 0.75rem 1rem !important;
            border-radius: 0 !important;
            font-size: 0.8rem !important;
          }
          .cookie-banner p {
            font-size: 0.8rem !important;
            line-height: 1.35 !important;
          }
          .cookie-banner > div:last-child {
            width: 100%;
            justify-content: stretch;
          }
          .cookie-banner > div:last-child button {
            flex: 1;
            padding: 0.6rem 0.75rem !important;
            font-size: 0.85rem !important;
          }
        }
      `}} />
    </>
  );
};
