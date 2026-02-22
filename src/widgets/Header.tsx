/**
 * Navigation Header Component
 * EXACT design from original frontend with dark theme
 */

import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { CompanyAutocomplete } from '@/features/search/CompanyAutocomplete';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    // Just call logout - navigation is handled inside useLogout hook
    // No need for navigate('/') here, it would cause a double navigation
    logout();
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem var(--spacing-md)',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        {/* Logo / Brand - navigates to dashboard when logged in, homepage when not */}
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          {/* Logo Icon - Lightning Bolt */}
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              width: '32px',
              height: '32px',
              color: 'var(--primary-color)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          >
            <path
              d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Brand Name */}
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            StockNewsPulse
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div style={{
          flex: '1',
          maxWidth: '500px',
          display: 'none'
        }} className="desktop-search">
          <CompanyAutocomplete placeholder="Suche nach Aktien..." />
        </div>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {/* Home link only for non-authenticated users */}
          {!isAuthenticated && (
            <Link
              to="/"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Home
            </Link>
          )}

          {!isAuthenticated && (
            <Link
              to="/erklarung"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Erklärung
            </Link>
          )}

          {/* Auth Section */}
          {isAuthenticated && user ? (
            <>
              <Link
                to="/dashboard"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Dashboard
              </Link>

              <Link
                to="/erklarung"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Erklärung
              </Link>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <Link
                  to="/settings"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                  title={user.email}
                >
                  ⚙️ Einstellungen
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem'
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem'
                  }}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="btn-primary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem'
                  }}
                >
                  Registrieren
                </button>
              </Link>
            </>
          )}
        </nav>

        {/* Search Bar - Mobile (Full Width) */}
        <div style={{
          width: '100%',
          display: 'block'
        }} className="mobile-search">
          <CompanyAutocomplete placeholder="Suche nach Aktien..." />
        </div>
      </div>

      {/* Responsive CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .desktop-search {
            display: block !important;
          }
          .mobile-search {
            display: none !important;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.05);
          }
        }
      `}} />
    </header>
  );
};
