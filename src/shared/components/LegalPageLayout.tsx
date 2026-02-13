/**
 * Reusable Legal Page Layout
 * Used for Datenschutz, Impressum, Quellennachweise, etc.
 */

import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export const LegalPageLayout = ({ title, lastUpdated, children }: LegalPageLayoutProps) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)'
    }}>
      <div className="app-container" style={{
        maxWidth: '900px',
        padding: '3rem var(--spacing-md)'
      }}>
        <div style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '3rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
            fontStyle: 'italic'
          }}>
            Stand: {lastUpdated}
          </p>

          {children}

          <div style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/"
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              ← Zurück zur Startseite
            </Link>
            <Link
              to="/impressum"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Zum Impressum
            </Link>
          </div>
        </div>
      </div>

      {/* Styles for legal content */}
      <style dangerouslySetInnerHTML={{ __html: `
        .legal-section {
          margin-bottom: 2.5rem;
        }

        .legal-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          margin-top: 2rem;
        }

        .legal-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }

        .legal-section h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }

        .legal-section p {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .legal-section ul, .legal-section ol {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .legal-section li {
          margin-bottom: 0.5rem;
        }

        .legal-section a {
          color: var(--primary-color);
          text-decoration: underline;
          transition: opacity 0.2s;
        }

        .legal-section a:hover {
          opacity: 0.8;
        }

        .legal-section strong {
          color: var(--text-primary);
          font-weight: 600;
        }
      `}} />
    </div>
  );
};
