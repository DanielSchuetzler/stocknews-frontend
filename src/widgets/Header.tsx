/**
 * Navigation Header Component
 * Responsive with burger menu for mobile
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { CompanyAutocomplete } from '@/features/search/CompanyAutocomplete';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinkStyle = {
    color: 'var(--text-secondary)',
    textDecoration: 'none' as const,
    fontWeight: 500,
    fontSize: '0.95rem',
    transition: 'color 0.2s'
  };

  const mobileNavLinkStyle = {
    color: 'var(--text-primary)',
    textDecoration: 'none' as const,
    fontWeight: 500,
    fontSize: '1.1rem',
    padding: '0.875rem 1.5rem',
    display: 'block' as const,
    borderBottom: '1px solid var(--border-color)',
    transition: 'background 0.15s'
  };

  return (
    <header ref={menuRef} style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Main header bar */}
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem var(--spacing-md)',
        gap: '1rem'
      }}>
        {/* Burger button - mobile only */}
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            flexShrink: 0
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ width: '24px', height: '24px' }}>
            <line x1="4" y1="7" x2="20" y2="7" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="12" x2="20" y2="12" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="17" x2="20" y2="17" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Logo / Brand */}
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          {/* Logo Icon */}
          <svg
            className="logo-icon"
            viewBox="11 6 42 44"
            fill="none"
            style={{ width: '37px', height: '37px' }}
          >
            <path
              d="M32 8 C28 8 25 9 23 11 C20 11.5 17 14 16 18 C14.5 19 13 22 13 25 C13 28 14 30.5 16 32 C15 34 15 36 16 38 C17 41 19 43.5 22 45 C24 46.5 27 48 30 48.5 L32 49 L34 48.5 C37 48 40 46.5 42 45 C45 43.5 47 41 48 38 C49 36 49 34 48 32 C50 30.5 51 28 51 25 C51 22 49.5 19 48 18 C47 14 44 11.5 41 11 C39 9 36 8 32 8Z"
              fill="#818cf8" opacity="0.9"
            />
            <path
              d="M32 8 C28 8 25 9 23 11 C20 11.5 17 14 16 18 C14.5 19 13 22 13 25 C13 28 14 30.5 16 32 C15 34 15 36 16 38 C17 41 19 43.5 22 45 C24 46.5 27 48 30 48.5 L32 49 V8Z"
              fill="#6366f1" opacity="0.35"
            />
            <path d="M32 10 C31 16 33 22 31 28 C33 34 31 40 32 47" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
            <path d="M17 22 C20 20 24 22 28 19 C30 18 31 19 31 20" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M15 28 C18 26 21 29 25 26 C28 25 30 27 31 28" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M16 34 C19 33 22 35 26 33 C28 32 30 34 31 35" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M18 40 C21 39 24 41 28 39 C30 38.5 31 40 31.5 41" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
            <path d="M47 22 C44 20 40 22 36 19 C34 18 33 19 33 20" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M49 28 C46 26 43 29 39 26 C36 25 34 27 33 28" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
            <path d="M48 34 C45 33 42 35 38 33 C36 32 34 34 33 35" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
            <path d="M46 40 C43 39 40 41 36 39 C34 38.5 33 40 32.5 41" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
            <circle cx="22" cy="21" r="2" fill="#22d3ee" opacity="0.85"/>
            <circle cx="42" cy="21" r="2" fill="#22d3ee" opacity="0.85"/>
            <circle cx="32" cy="26" r="2.2" fill="#22d3ee" opacity="0.95"/>
            <circle cx="20" cy="33" r="1.8" fill="#22d3ee" opacity="0.75"/>
            <circle cx="44" cy="33" r="1.8" fill="#22d3ee" opacity="0.75"/>
            <line x1="22" y1="21" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.9" opacity="0.45"/>
            <line x1="42" y1="21" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.9" opacity="0.45"/>
            <line x1="20" y1="33" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.7" opacity="0.35"/>
            <line x1="44" y1="33" x2="32" y2="26" stroke="#22d3ee" strokeWidth="0.7" opacity="0.35"/>
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

        {/* Search Bar - Desktop only */}
        <div className="desktop-search" style={{
          flex: '1',
          maxWidth: '500px',
          display: 'none'
        }}>
          <CompanyAutocomplete placeholder="Suche nach Aktien..." />
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="desktop-nav" style={{
          display: 'none',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {isAuthenticated && user ? (
            <>
              <Link to="/dashboard" style={navLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Dashboard
              </Link>
              <Link to="/fair-value" style={navLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Fair Value
              </Link>
              <Link to="/erklarung" style={navLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                News-Analyse
              </Link>
              <Link to="/settings" style={navLinkStyle} title={user.email}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Einstellungen
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" style={navLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Home
              </Link>
              <Link to="/fair-value" style={navLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                Fair Value
              </Link>
              <Link to="/erklarung" style={navLinkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                News-Analyse
              </Link>
              <Link to="/login">
                <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  Registrieren
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Search Bar - Mobile only, always visible below header bar */}
      <div className="mobile-search" style={{
        display: 'block',
        padding: '0 var(--spacing-md) 0.75rem'
      }}>
        <CompanyAutocomplete placeholder="Suche nach Aktien..." />
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 99
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className="mobile-menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          maxWidth: '80vw',
          background: 'var(--surface)',
          borderRight: '1px solid var(--border-color)',
          boxShadow: menuOpen ? 'var(--shadow-lg)' : 'none',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease-in-out',
          zIndex: 101,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Menu header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            Menü
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Menü schließen"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '22px', height: '22px' }}>
              <line x1="6" y1="6" x2="18" y2="18" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18" y1="6" x2="6" y2="18" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Menu links */}
        <div style={{ flex: 1 }}>
          {isAuthenticated && user ? (
            <>
              <Link to="/dashboard" style={mobileNavLinkStyle}>Dashboard</Link>
              <Link to="/fair-value" style={mobileNavLinkStyle}>Fair Value</Link>
              <Link to="/erklarung" style={mobileNavLinkStyle}>News-Analyse</Link>
              <Link to="/settings" style={mobileNavLinkStyle}>Einstellungen</Link>
            </>
          ) : (
            <>
              <Link to="/" style={mobileNavLinkStyle}>Home</Link>
              <Link to="/fair-value" style={mobileNavLinkStyle}>Fair Value</Link>
              <Link to="/erklarung" style={mobileNavLinkStyle}>News-Analyse</Link>
            </>
          )}
        </div>

        {/* Menu footer - auth actions */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {isAuthenticated && user ? (
            <>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '0.25rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: '0.625rem 1rem', fontSize: '0.9rem', width: '100%' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary" style={{ padding: '0.625rem 1rem', fontSize: '0.9rem', width: '100%' }}>
                  Login
                </button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '0.625rem 1rem', fontSize: '0.9rem', width: '100%' }}>
                  Kostenlos registrieren
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Responsive CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Mobile: show burger + mobile search, hide desktop nav + desktop search */
        .burger-btn {
          display: flex !important;
        }
        .desktop-nav {
          display: none !important;
        }
        .desktop-search {
          display: none !important;
        }
        .mobile-search {
          display: block !important;
        }
        .mobile-search .company-search-input {
          padding: 0.5rem 0.75rem !important;
          padding-right: 2.25rem !important;
          font-size: 0.875rem !important;
          border-width: 1.5px !important;
        }

        /* Desktop: hide burger + mobile menu + mobile search, show desktop nav + search */
        @media (min-width: 768px) {
          .burger-btn {
            display: none !important;
          }
          .desktop-nav {
            display: flex !important;
          }
          .desktop-search {
            display: block !important;
          }
          .mobile-search {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
          .mobile-overlay {
            display: none !important;
          }
        }
      `}} />
    </header>
  );
};
