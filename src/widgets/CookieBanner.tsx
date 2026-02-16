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
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '900px',
        width: 'calc(100% - 2rem)',
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '1rem 1.5rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        fontSize: '0.875rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
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
  );
};
