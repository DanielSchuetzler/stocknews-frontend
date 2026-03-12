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
          {/* Logo Icon - Realistic Brain with AI nodes & Chart */}
          <svg
            className="logo-icon"
            viewBox="11 6 42 44"
            fill="none"
            style={{
              width: '37px',
              height: '37px'
            }}
          >
            {/* Brain body – emoji-style silhouette in lila/indigo */}
            <path
              d="M32 8 C28 8 25 9 23 11 C20 11.5 17 14 16 18 C14.5 19 13 22 13 25 C13 28 14 30.5 16 32 C15 34 15 36 16 38 C17 41 19 43.5 22 45 C24 46.5 27 48 30 48.5 L32 49 L34 48.5 C37 48 40 46.5 42 45 C45 43.5 47 41 48 38 C49 36 49 34 48 32 C50 30.5 51 28 51 25 C51 22 49.5 19 48 18 C47 14 44 11.5 41 11 C39 9 36 8 32 8Z"
              fill="#818cf8" opacity="0.9"
            />
            {/* Left hemisphere darker */}
            <path
              d="M32 8 C28 8 25 9 23 11 C20 11.5 17 14 16 18 C14.5 19 13 22 13 25 C13 28 14 30.5 16 32 C15 34 15 36 16 38 C17 41 19 43.5 22 45 C24 46.5 27 48 30 48.5 L32 49 V8Z"
              fill="#6366f1" opacity="0.35"
            />
            {/* Central fissure */}
            <path d="M32 10 C31 16 33 22 31 28 C33 34 31 40 32 47" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
            {/* Brain folds LEFT – prominent sulci */}
            <path d="M17 22 C20 20 24 22 28 19 C30 18 31 19 31 20" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M15 28 C18 26 21 29 25 26 C28 25 30 27 31 28" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M16 34 C19 33 22 35 26 33 C28 32 30 34 31 35" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M18 40 C21 39 24 41 28 39 C30 38.5 31 40 31.5 41" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
            {/* Brain folds RIGHT – prominent sulci */}
            <path d="M47 22 C44 20 40 22 36 19 C34 18 33 19 33 20" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M49 28 C46 26 43 29 39 26 C36 25 34 27 33 28" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M48 34 C45 33 42 35 38 33 C36 32 34 34 33 35" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
            <path d="M46 40 C43 39 40 41 36 39 C34 38.5 33 40 32.5 41" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
            {/* AI neural network nodes */}
            <circle cx="22" cy="21" r="2" fill="#22d3ee" opacity="0.85"/>
            <circle cx="42" cy="21" r="2" fill="#22d3ee" opacity="0.85"/>
            <circle cx="32" cy="26" r="2.2" fill="#22d3ee" opacity="0.95"/>
            <circle cx="20" cy="33" r="1.8" fill="#22d3ee" opacity="0.75"/>
            <circle cx="44" cy="33" r="1.8" fill="#22d3ee" opacity="0.75"/>
            {/* Neural connections */}
            <line x1="22" y1="21" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.9" opacity="0.45"/>
            <line x1="42" y1="21" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.9" opacity="0.45"/>
            <line x1="20" y1="33" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.7" opacity="0.35"/>
            <line x1="44" y1="33" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.7" opacity="0.35"/>
            {/* Chart line overlay */}
            <path
              d="M10 44 L16 40 L22 42 L28 34 L34 37 L40 30 L46 26 L53 21"
              stroke="#34d399" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"
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
            BrainyTrader
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

          <Link
            to="/fair-value"
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
            Fair Value
          </Link>

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
              News-Analyse
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
                  transition: 'color 0.2s',
                  order: -1
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
                News-Analyse
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
