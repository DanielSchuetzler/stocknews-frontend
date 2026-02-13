/**
 * Homepage with Hero Section and Examples
 * EXACT design from original frontend with dark theme
 */

import { Link, useNavigate } from 'react-router-dom';
import { CompanyAutocomplete } from '@/features/search/CompanyAutocomplete';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleExampleClick = (ticker: string) => {
    navigate(`/stocks/${ticker}`);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'var(--background-gradient)',
        padding: '4rem 0 3rem',
        textAlign: 'center'
      }}>
        <div className="app-container">
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.3
          }}>
            Verstehe, wie News Aktienkurse bewegen
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Sieh auf einen Blick, wie sich positive und negative Nachrichten in der Vergangenheit auf den Kurs ausgewirkt haben
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-primary)',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            Probiere es jetzt aus:
          </p>

          {/* Search Box */}
          <div style={{
            maxWidth: '700px',
            margin: '0 auto 1.5rem'
          }}>
            <CompanyAutocomplete placeholder="Gib eine Aktie ein (z.B. Apple, Tesla, SAP)" />
          </div>

          {/* Example Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}>
              Beliebte Beispiele:
            </span>
            {[
              { ticker: 'AAPL', name: 'Apple' },
              { ticker: 'TSLA', name: 'Tesla' },
              { ticker: 'NVDA', name: 'NVIDIA' },
              { ticker: 'SAP', name: 'SAP' }
            ].map((stock) => (
              <button
                key={stock.ticker}
                onClick={() => handleExampleClick(stock.ticker)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--primary-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
              >
                {stock.name}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            padding: '2rem',
            background: 'rgba(59, 130, 246, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--primary-color)',
                marginBottom: '0.5rem'
              }}>
                &gt;30,000,000
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                fontWeight: 500
              }}>
                Analysierte News-Events
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--primary-color)',
                marginBottom: '0.5rem'
              }}>
                15,000+
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                fontWeight: 500
              }}>
                Verfügbare Aktien
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--primary-color)',
                marginBottom: '0.5rem'
              }}>
                100%
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                fontWeight: 500
              }}>
                Kostenlos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '4rem 0',
        background: 'var(--surface)'
      }}>
        <div className="app-container">
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            textAlign: 'center',
            color: 'var(--text-primary)',
            marginBottom: '3rem'
          }}>
            So funktioniert es
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }} className="how-it-works-grid">
            {/* Left: Steps */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              {/* Step 1 */}
              <div style={{
                display: 'flex',
                gap: '1.5rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Aktie auswählen
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    Gib einen Ticker ein und erhalte historische Kursdaten
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{
                display: 'flex',
                gap: '1.5rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    News im Chart sehen
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    Positive und negative Events direkt visualisiert
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{
                display: 'flex',
                gap: '1.5rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Muster erkennen
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    Verstehe Kursreaktionen auf verschiedene Event-Typen
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Animated Chart Mockup */}
            <div style={{
              background: 'var(--background)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <svg viewBox="0 0 300 200" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                {/* Chart Line */}
                <polyline
                  points="10,120 30,118 50,115 70,113 90,110 100,111 115,130 130,140 150,138 170,135 190,133 210,100 230,85 250,65 270,50 285,40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                {/* Fill under line */}
                <polygon
                  points="10,120 30,118 50,115 70,113 90,110 100,111 115,130 130,140 150,138 170,135 190,133 210,100 230,85 250,65 270,50 285,40 285,190 10,190"
                  fill="url(#chartGradient)"
                />
                {/* Negative News Marker */}
                <circle cx="100" cy="111" r="6" fill="#ef4444" className="pulse-marker" />
                <line x1="100" y1="111" x2="100" y2="30" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                {/* Positive News Marker - positioned at upper right of uptrend */}
                <circle cx="250" cy="65" r="6" fill="#10b981" className="pulse-marker" />
                <line x1="250" y1="65" x2="250" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
              </svg>
              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                marginTop: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#ef4444'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Negative News
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#10b981'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Positive News
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event-Driven Trading Section */}
      <section style={{
        padding: '4rem 0',
        background: 'var(--background)'
      }}>
        <div className="app-container">
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            textAlign: 'center',
            color: 'var(--text-primary)',
            marginBottom: '3rem'
          }}>
            Event-Driven Trading
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Feature 1 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                📈
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Historische Analyse
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                Betrachte vergangene News-Events und deren direkten Einfluss auf Aktienkurse.
                Lerne aus historischen Mustern.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                📰
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                News-Sentiment
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                Alle News werden mit Sentiment-Analyse versehen (positiv/negativ) und
                direkt im Chart visualisiert.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Eigene News
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                Füge deine eigenen News-Events hinzu und verfolge deren Auswirkungen
                auf die Kursentwicklung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Stocks Section */}
      <section style={{
        padding: '4rem 0',
        background: 'var(--background)'
      }}>
        <div className="app-container">
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            textAlign: 'center',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Beliebte Aktien analysieren
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontSize: '1.1rem'
          }}>
            Starte mit einer dieser populären Aktien
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { ticker: 'AAPL', name: 'Apple Inc.', emoji: '🍎' },
              { ticker: 'TSLA', name: 'Tesla Inc.', emoji: '🚗' },
              { ticker: 'NVDA', name: 'NVIDIA Corp.', emoji: '🎮' },
              { ticker: 'MSFT', name: 'Microsoft Corp.', emoji: '💻' },
              { ticker: 'GOOGL', name: 'Alphabet Inc.', emoji: '🔍' },
              { ticker: 'AMZN', name: 'Amazon.com Inc.', emoji: '📦' },
              { ticker: 'META', name: 'Meta Platforms', emoji: '📱' },
              { ticker: 'SAP', name: 'SAP SE', emoji: '🇩🇪' }
            ].map((stock) => (
              <Link
                key={stock.ticker}
                to={`/stocks/${stock.ticker}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card-hover" style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    {stock.emoji}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                  }}>
                    {stock.ticker}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {stock.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 0',
        background: 'var(--surface)',
        textAlign: 'center'
      }}>
        <div className="app-container">
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Bereit für datenbasierte Entscheidungen?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            Registriere dich kostenlos und starte mit der Analyse historischer News-Events.
          </p>
          <Link to="/register">
            <button className="btn-primary" style={{
              padding: '1rem 2.5rem',
              fontSize: '1.2rem'
            }}>
              Kostenlos registrieren
            </button>
          </Link>
        </div>
      </section>

      {/* Responsive CSS + Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-marker {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.3);
          }
        }

        .pulse-marker {
          animation: pulse-marker 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
};
