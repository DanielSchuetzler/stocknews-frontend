/**
 * Homepage with Hero Section and Examples
 * BrainyTrader – AI-native Aktienanalyse & Fair Value
 */

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CompanyAutocomplete } from '@/features/search/CompanyAutocomplete';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountDeleted = searchParams.get('deleted') === 'true';

  const handleExampleClick = (ticker: string) => {
    navigate(`/stocks/${ticker}`);
  };

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "BrainyTrader – AI-native Aktienanalyse & Fair Value",
    "description": "KI-gestützte Fair Value Berechnung für Aktien. Erfahre mit wissenschaftlichen Modellen (DCF, Graham, Lynch, Ertragswert), ob eine Aktie über- oder unterbewertet ist.",
    "url": "https://brainytrader.info",
    "inLanguage": "de",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".hero-description"]
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {accountDeleted && (
        <div style={{
          background: '#f0fdf4',
          borderBottom: '1px solid #bbf7d0',
          padding: '1rem',
          textAlign: 'center',
          color: '#166534',
          fontSize: '0.95rem',
          fontWeight: 500
        }}>
          Dein Konto wurde erfolgreich gelöscht.
        </div>
      )}

      <Helmet>
        <title>BrainyTrader – Was ist eine Aktie wirklich wert? | AI-native Fair Value Analyse</title>
        <meta name="description" content="BrainyTrader berechnet den fairen Wert von Aktien mit KI und wissenschaftlichen Modellen (DCF, Graham, Lynch, Ertragswert). Erkenne Über- und Unterbewertungen – kostenlos, für 15.000+ Aktien." />
        <link rel="canonical" href="https://brainytrader.info/" />
        <meta property="og:url" content="https://brainytrader.info/" />
        <meta property="og:title" content="BrainyTrader – AI-native Aktienanalyse & Fair Value" />
        <meta property="og:description" content="Was ist eine Aktie wirklich wert? KI-gestützte Fair Value Analyse mit 4 wissenschaftlichen Bewertungsmodellen. 15.000+ Aktien, kostenlos." />
        <script type="application/ld+json">{JSON.stringify(homeJsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <section style={{
        background: 'var(--background-gradient)',
        padding: '4rem 0 3rem',
        textAlign: 'center'
      }}>
        <div className="app-container">
          {/* AI Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '999px',
            padding: '0.4rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#22d3ee'
          }}>
            <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: '14px', height: '14px' }}>
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2.5a1 1 0 011 1v3a1 1 0 01-2 0v-3a1 1 0 011-1zm2.5 4.5l-2 2-1.5-1.5" />
            </svg>
            AI-native Aktienanalyse
          </div>

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
            Was ist eine Aktie wirklich wert?
          </h1>

          <p className="hero-description" style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            BrainyTrader berechnet den fairen Wert jeder Aktie mit KI und wissenschaftlichen Modellen.
            Erkenne auf einen Blick, ob eine Aktie über- oder unterbewertet ist.
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-primary)',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            Jetzt Aktie analysieren:
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
                    Gib einen Ticker ein und erhalte sofort eine umfassende Analyse
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
                    Fair Value berechnen lassen
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    KI analysiert mit DCF, Graham, Lynch & Ertragswert den fairen Wert
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
                    Über- oder Unterbewertung erkennen
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    Sieh sofort, ob der Marktpreis über oder unter dem fairen Wert liegt
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Animated Chart Mockup with Fair Value Line */}
            <div className="homepage-chart-mockup" style={{
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
                {/* Chart Line (Market Price) */}
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
                {/* Fair Value Line (horizontal, dashed) */}
                <line x1="10" y1="100" x2="285" y2="100" stroke="rgba(139, 92, 246, 1)" strokeWidth="2" strokeDasharray="6,4" />
                {/* Fair Value Label */}
                <text x="147" y="95" textAnchor="middle" fill="rgba(139, 92, 246, 1)" fontSize="10" fontWeight="600">Fair Value</text>
                {/* Overvalued zone marker */}
                <text x="225" y="35" fill="#ef4444" fontSize="9" fontWeight="500">Überbewertet</text>
                {/* Undervalued zone marker */}
                <text x="100" y="155" fill="#10b981" fontSize="9" fontWeight="500">Unterbewertet</text>
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
                    background: '#3b82f6'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Marktpreis
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '24px',
                    height: '2px',
                    borderTop: '2px dashed rgba(139, 92, 246, 1)'
                  }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Fair Value
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            Fundierte Analyse statt Bauchgefühl
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            BrainyTrader kombiniert KI mit bewährten Bewertungsmethoden aus der Finanzwissenschaft
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Feature 1 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px', margin: '0 auto' }}>
                  <path d="M24 4C18 4 14 7 13 11c-3 .6-5 3.4-5 6 0 3 1.6 5.6 4 7-.4 1-.6 2-.6 3 0 4.4 3.6 8 8 8h1c1 2.4 3.4 4 6 4s5-1.6 6-4h1c4.4 0 8-3.6 8-8 0-1-.2-2-.6-3 2.4-1.4 4-4 4-7 0-3.6-3-6.4-6-7-1-4-5-7-10-7z" fill="#6366f1" opacity="0.2"/>
                  <path d="M14 26l4-5 3.5 3.5 5-7 4 4L34 17" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                KI-gestützte Bewertung
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                Unsere KI kombiniert 4 wissenschaftliche Bewertungsmodelle und gewichtet sie sektorspezifisch für ein präzises Ergebnis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px', margin: '0 auto' }}>
                  <rect x="6" y="6" width="36" height="36" rx="4" fill="#10b981" opacity="0.2"/>
                  <path d="M14 34V22m6 12V18m6 16V14m6 20V10" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="10" y1="24" x2="38" y2="24" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Fair Value Analyse
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                DCF, Graham, Peter Lynch & Ertragswert – 4 bewährte Methoden kombiniert zu einem gewichteten fairen Wert.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px', margin: '0 auto' }}>
                  <rect x="4" y="10" width="40" height="28" rx="3" fill="#f59e0b" opacity="0.2"/>
                  <path d="M12 30l6-8 4 4 6-10 4 6 4-4" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="18" cy="22" r="2" fill="#10b981"/>
                  <circle cx="32" cy="18" r="2" fill="#ef4444"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                News-Impact Analyse
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                Historische News-Events direkt im Chart – verstehe, welche Nachrichten den Kurs beeinflusst haben.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Value Methods Preview */}
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
            marginBottom: '1rem'
          }}>
            4 wissenschaftliche Bewertungsmodelle
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontSize: '1.1rem'
          }}>
            Jedes Modell beleuchtet den Wert einer Aktie aus einem anderen Blickwinkel
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                title: 'DCF-Verfahren',
                subtitle: 'Discounted Cash Flow',
                desc: 'Projiziert zukünftige Cashflows und diskontiert sie auf den heutigen Wert',
                color: '#3b82f6',
                link: '/fair-value/dcf'
              },
              {
                title: 'Graham-Formel',
                subtitle: 'Benjamin Graham',
                desc: 'Die klassische Value-Investing-Formel aus "The Intelligent Investor"',
                color: '#10b981',
                link: '/fair-value/graham'
              },
              {
                title: 'PEG-Ratio',
                subtitle: 'Peter Lynch',
                desc: 'Bewertet Wachstumsaktien anhand des Verhältnisses von KGV zu Gewinnwachstum',
                color: '#a855f7',
                link: '/fair-value/lynch'
              },
              {
                title: 'Ertragswert',
                subtitle: 'Gordon Growth Model',
                desc: 'Berechnet den nachhaltigen Wert basierend auf Eigenkapitalrendite und Wachstum',
                color: '#f59e0b',
                link: '/fair-value/ertragswert'
              }
            ].map((method) => (
              <Link
                key={method.title}
                to={method.link}
                style={{ textDecoration: 'none' }}
              >
                <div className="card-hover" style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  borderLeft: `3px solid ${method.color}`
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem'
                  }}>
                    {method.title}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: method.color,
                    fontWeight: 600,
                    marginBottom: '0.75rem'
                  }}>
                    {method.subtitle}
                  </p>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5
                  }}>
                    {method.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link
              to="/fair-value"
              style={{
                color: 'var(--primary-color)',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none'
              }}
            >
              Alle Fair Value Methoden im Detail kennenlernen →
            </Link>
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
            Fair Value & News-Analyse für die beliebtesten Aktien weltweit
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
            Bereit für smartere Anlageentscheidungen?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            Registriere dich kostenlos und nutze KI-gestützte Fair Value Analysen für deine Investments.
          </p>
          <Link to="/register">
            <button className="btn-primary" style={{
              padding: '1rem 2.5rem',
              fontSize: '1.2rem'
            }}>
              Kostenlos starten
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

          /* Chart mockup: edge-to-edge on mobile */
          .homepage-chart-mockup {
            border-radius: 0 !important;
            padding: 1rem 0.5rem !important;
            border-left: none !important;
            border-right: none !important;
            margin-left: calc(-1 * var(--spacing-md, 1rem)) !important;
            margin-right: calc(-1 * var(--spacing-md, 1rem)) !important;
            box-shadow: none !important;
          }
        }
      `}} />
    </div>
  );
};
