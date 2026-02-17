/**
 * Dashboard Page (Protected)
 * EXACT design from original frontend with dark theme
 * Shows user's favorite stocks with statistics
 */

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/shared/hooks/useAuth';
import { useFavorites, useRemoveFavorite } from '@/entities/favorite/queries';
import { formatDate } from '@/shared/utils/formatters';

export const DashboardPage = () => {
  useAuth();
  const { data: favorites = [], isLoading, error } = useFavorites();
  const removeMutation = useRemoveFavorite();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(searchParams.get('welcome') === 'true');

  // Filter favorites based on search
  const filteredFavorites = favorites.filter(fav =>
    fav.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fav.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = async (ticker: string, companyName: string) => {
    if (window.confirm(`Möchtest du ${companyName} (${ticker}) wirklich aus deinen Favoriten entfernen?`)) {
      try {
        await removeMutation.mutateAsync(ticker);
      } catch (error) {
        console.error('Failed to remove favorite:', error);
        alert('Fehler beim Entfernen des Favoriten');
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Meine Favoriten | StockNewsPulse</title>
        <meta name="description" content="Verwalte deine Lieblings-Aktien und analysiere deren News-Events" />
      </Helmet>

      <div style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div className="app-container">
          {/* Header */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h1 style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  Dein Aktienwissen, dein Vorteil
                </h1>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.1rem'
                }}>
                  Verfolge News-Events und entdecke Kursmuster
                </p>
              </div>

              {/* Stats Badge */}
              <div style={{
                background: 'var(--background)',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--primary-color)',
                  marginBottom: '0.25rem'
                }}>
                  {favorites.length}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Favoriten
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Banner for new Google OAuth users */}
          {showWelcome && (
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <button
                onClick={() => {
                  setShowWelcome(false);
                  setSearchParams({});
                }}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ×
              </button>

              <div style={{ color: 'white' }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🎉 Willkommen bei StockNewsPulse!
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  marginBottom: '1.5rem',
                  opacity: 0.95
                }}>
                  Schön, dass du da bist! Hier sind deine ersten Schritte:
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                      Aktien suchen
                    </h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Nutze die Suchleiste im Header, um deine ersten Aktien zu finden
                    </p>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                      Favoriten speichern
                    </h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Klicke auf den Stern bei Aktien, die du beobachten möchtest
                    </p>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                      News analysieren
                    </h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      Verfolge News-Events und deren Einfluss auf Aktienkurse
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Favoriten durchsuchen..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                background: 'var(--surface)',
                border: '2px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid var(--surface-light)',
                borderTop: '4px solid var(--primary-color)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>Lade Favoriten...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="card" style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <p style={{ color: 'var(--danger-color)', fontSize: '1.1rem' }}>
                Fehler beim Laden der Favoriten
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredFavorites.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐</div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                {searchQuery ? 'Keine Ergebnisse gefunden' : 'Noch keine Favoriten'}
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                fontSize: '1.1rem'
              }}>
                {searchQuery
                  ? `Keine Favoriten gefunden für "${searchQuery}"`
                  : 'Füge Aktien zu deinen Favoriten hinzu, um sie hier zu sehen'}
              </p>
              {!searchQuery && (
                <Link to="/">
                  <button className="btn-primary">
                    Aktien durchsuchen
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* Favorites Table */}
          {!isLoading && !error && filteredFavorites.length > 0 && (
            <div className="card" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Ticker
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Unternehmen
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      AI News
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      User News
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Hinzugefügt
                    </th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'right',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFavorites.map((fav) => (
                    <tr
                      key={fav.favoriteId}
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--surface-light)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <Link
                          to={`/stocks/${fav.ticker}`}
                          style={{
                            color: 'var(--primary-color)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            textDecoration: 'none'
                          }}
                        >
                          {fav.ticker}
                        </Link>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'var(--text-primary)',
                        fontWeight: 500
                      }}>
                        {fav.companyName}
                      </td>
                      <td style={{
                        padding: '1rem',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: 600
                      }}>
                        {fav.aiNewsCount}
                      </td>
                      <td style={{
                        padding: '1rem',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: 600
                      }}>
                        {fav.userNewsCount}
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                      }}>
                        {formatDate(fav.createdAt)}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleRemove(fav.ticker, fav.companyName)}
                          disabled={removeMutation.isPending}
                          className="btn-danger"
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem'
                          }}
                        >
                          {removeMutation.isPending ? 'Entferne...' : 'Entfernen'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}} />
    </>
  );
};
