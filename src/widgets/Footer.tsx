/**
 * Footer Component with Disclaimer and Links
 * Displayed on every page
 */

export const Footer = () => {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto'
    }}>
      {/* Disclaimer Section */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.1)',
        borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
        padding: '3rem 0'
      }}>
        <div className="app-container">
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <h3 id="hinweise" style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              scrollMarginTop: '80px'
            }}>
              ⚖️ Rechtlicher Hinweis & Haftungsausschluss
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7
            }}>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Keine Anlageberatung:</strong> Die auf dieser Plattform bereitgestellten Informationen, Analysen und Visualisierungen dienen ausschließlich zu allgemeinen Informationszwecken und stellen keine Anlageberatung, Finanzberatung oder Empfehlung zum Kauf oder Verkauf von Wertpapieren dar.
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Eigenverantwortung:</strong> Jede Investitionsentscheidung erfolgt auf eigenes Risiko. Der Betreiber übernimmt keinerlei Haftung für Verluste oder Schäden, die sich aus der Nutzung dieser Informationen ergeben. Vergangene Wertentwicklungen sind kein verlässlicher Indikator für zukünftige Ergebnisse.
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Keine Gewähr:</strong> Trotz sorgfältiger Recherche wird keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Daten übernommen. Kursinformationen können verzögert sein.
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>Professionelle Beratung:</strong> Vor jeder Anlageentscheidung sollten Sie einen zugelassenen Finanzberater konsultieren und Ihre individuelle Situation, Risikobereitschaft und Anlageziele berücksichtigen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div style={{
        padding: '3rem 0'
      }}>
        <div className="app-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* About Section */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Über BrainyTrader
              </h4>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                fontSize: '0.95rem'
              }}>
                AI-native Aktienanalyse-Plattform. Berechnet den fairen Wert von Aktien mit KI und wissenschaftlichen Bewertungsmodellen.
                Entwickelt für smarte Investoren.
              </p>
            </div>

            {/* Legal Section */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Rechtliches
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li>
                  <a
                    href="#disclaimer"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Haftungsausschluss
                  </a>
                </li>
                <li>
                  <a
                    href="/datenschutz"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a
                    href="/impressum"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="/quellen"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Quellennachweise
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Ressourcen
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li>
                  <a
                    href="https://www.bafin.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    BaFin - Finanzaufsicht
                  </a>
                </li>
                <li>
                  <a
                    href="https://finance.yahoo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    Yahoo Finance
                  </a>
                </li>
                <li>
                  <span
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.95rem'
                    }}
                  >
                    API Dokumentation (in Arbeit)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                margin: '0 0 0.25rem 0'
              }}>
                © 2026 BrainyTrader. Alle Rechte vorbehalten.
              </p>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                margin: 0
              }}>
                Powered by AI, React & Spring Boot | v2.0.0
              </p>
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '6px',
              color: 'var(--primary-color)',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              🚀 Beta Version
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
