/**
 * Fair Value Overview Page
 * Comprehensive, SEO-optimized educational page about Fair Value methods (German)
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const FairValueOverviewPage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Was ist der Fair Value einer Aktie? – 4 Bewertungsmodelle erklärt",
    "description": "Erfahre, was der Fair Value (innerer Wert) einer Aktie ist und wie du ihn mit DCF, Graham-Formel, Peter Lynch und Ertragswertverfahren berechnen kannst.",
    "author": {
      "@type": "Organization",
      "name": "BrainyTrader",
      "url": "https://brainytrader.info"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrainyTrader",
      "url": "https://brainytrader.info"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://brainytrader.info/fair-value"
    },
    "url": "https://brainytrader.info/fair-value",
    "inLanguage": "de",
    "keywords": "Fair Value Aktie, innerer Wert Aktie berechnen, Aktie Bewertung, Fundamentalanalyse, DCF Verfahren, Graham Formel, Peter Lynch, Ertragswertverfahren"
  };

  const methods = [
    {
      title: 'DCF-Verfahren',
      subtitle: 'Discounted Cash Flow',
      link: '/fair-value/dcf',
      color: '#3b82f6',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px' }}>
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#3b82f6" opacity="0.15" />
          <path d="M14 34V22m6 12V18m6 16V14m6 20V10" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 16l6-4 6 2 6-4 6 2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      ),
      description: 'Das DCF-Verfahren projiziert die zukünftigen freien Cashflows eines Unternehmens und diskontiert sie auf den heutigen Wert. Es gilt als das theoretisch fundierteste Bewertungsmodell und wird von institutionellen Investoren weltweit eingesetzt.',
      ideal: 'Unternehmen mit stabilen, vorhersehbaren Cashflows'
    },
    {
      title: 'Graham-Formel',
      subtitle: 'Benjamin Graham',
      link: '/fair-value/graham',
      color: '#10b981',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px' }}>
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#10b981" opacity="0.15" />
          <path d="M16 34V20h4v14m4 0V14h4v20m4 0V24h4v10" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="26" x2="38" y2="26" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
        </svg>
      ),
      description: 'Die Graham-Formel stammt vom Vater des Value Investing, Benjamin Graham. Sie bewertet Aktien anhand von Gewinn pro Aktie (EPS) und Gewinnwachstum. Konservativ und sicherheitsorientiert, ideal für Einsteiger in die Fundamentalanalyse.',
      ideal: 'Etablierte Unternehmen mit soliden Gewinnen'
    },
    {
      title: 'Peter Lynch Fair Value',
      subtitle: 'PEG-Ratio',
      link: '/fair-value/lynch',
      color: '#a855f7',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px' }}>
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#a855f7" opacity="0.15" />
          <path d="M12 32l8-10 6 6 10-16" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="36" cy="12" r="3" fill="#a855f7" />
        </svg>
      ),
      description: 'Peter Lynchs Ansatz setzt das Kurs-Gewinn-Verhältnis (KGV) ins Verhältnis zum Gewinnwachstum. Die PEG-Ratio zeigt, ob das Wachstum einer Aktie im aktuellen Kurs fair eingepreist ist oder ob Potenzial besteht.',
      ideal: 'Wachstumsstarke Unternehmen mit steigenden Gewinnen'
    },
    {
      title: 'Ertragswertverfahren',
      subtitle: 'Gordon Growth Model',
      link: '/fair-value/ertragswert',
      color: '#f59e0b',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px' }}>
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#f59e0b" opacity="0.15" />
          <circle cx="24" cy="24" r="12" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M24 16v8l5 5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description: 'Das Ertragswertverfahren (Gordon Growth Model) berechnet den fairen Wert basierend auf der nachhaltigen Ertragskraft eines Unternehmens. Es nutzt Eigenkapitalrendite, Kapitalkosten und erwartetes Wachstum für eine langfristige Bewertung.',
      ideal: 'Dividendenstarke, reife Unternehmen'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Helmet>
        <title>Was ist der Fair Value einer Aktie? – Inneren Wert berechnen | BrainyTrader</title>
        <meta name="description" content="Was ist der Fair Value einer Aktie? Lerne 4 wissenschaftliche Bewertungsmodelle kennen: DCF, Graham-Formel, Peter Lynch (PEG-Ratio) und Ertragswertverfahren. Inneren Wert berechnen und Unter- oder Überbewertungen erkennen." />
        <link rel="canonical" href="https://brainytrader.info/fair-value" />
        <meta property="og:url" content="https://brainytrader.info/fair-value" />
        <meta property="og:title" content="Was ist der Fair Value einer Aktie? – 4 Bewertungsmodelle erklärt" />
        <meta property="og:description" content="Erfahre, wie du den inneren Wert einer Aktie mit DCF, Graham, Lynch und Ertragswert berechnen kannst. KI-gestützte Fundamentalanalyse für 15.000+ Aktien." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="BrainyTrader" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <section style={{
        background: 'var(--background-gradient)',
        padding: '4rem 0 3rem',
        textAlign: 'center'
      }}>
        <div className="app-container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '999px',
            padding: '0.4rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#10b981'
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Fundamentalanalyse
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.3
          }}>
            Was ist der Fair Value einer Aktie?
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: 1.7
          }}>
            Der Fair Value (fairer Wert) beschreibt den inneren, fundamentalen Wert einer Aktie –
            unabhängig vom aktuellen Börsenkurs. Wer den Fair Value kennt, kann fundiert beurteilen,
            ob eine Aktie gerade günstig oder teuer ist. Erfahre hier, wie du den inneren Wert einer
            Aktie mit vier wissenschaftlichen Modellen berechnen kannst.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '0.85rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}>
                Jetzt Aktie analysieren
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Was ist der Fair Value? */}
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
            Den inneren Wert einer Aktie verstehen
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            Die Grundlage jeder fundierten Investmententscheidung
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Definition */}
            <div style={{
              background: 'var(--background)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4m0-4h.01" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Was bedeutet Fair Value?
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontSize: '0.95rem'
              }}>
                Der Fair Value (auch: innerer Wert oder intrinsischer Wert) ist der berechnete, fundamentale Wert einer Aktie.
                Er basiert auf den wirtschaftlichen Kennzahlen eines Unternehmens – wie Gewinne, Cashflows, Wachstum und
                Eigenkapitalrendite. Im Gegensatz zum Börsenkurs, der von Angebot und Nachfrage bestimmt wird, zeigt der
                Fair Value, was eine Aktie aus finanzmathematischer Sicht tatsächlich wert sein sollte.
              </p>
            </div>

            {/* Marktwert vs Fair Value */}
            <div style={{
              background: 'var(--background)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                background: 'rgba(168, 85, 247, 0.1)',
                color: '#a855f7',
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Marktwert vs. Fair Value
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontSize: '0.95rem'
              }}>
                Der Marktwert (Börsenkurs) wird täglich durch Käufer und Verkäufer bestimmt und schwankt
                oft aufgrund von Emotionen, Hype oder Panik. Der Fair Value hingegen ist eine rein rechnerische Größe,
                die auf fundamentalen Unternehmensdaten basiert. Wenn der Börsenkurs deutlich unter dem Fair Value liegt,
                spricht man von einer Unterbewertung – ein potenzielles Kaufsignal. Liegt er darüber, könnte die
                Aktie überbewertet sein.
              </p>
            </div>

            {/* Warum ist der innere Wert wichtig? */}
            <div style={{
              background: 'var(--background)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Warum ist der innere Wert wichtig?
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontSize: '0.95rem'
              }}>
                Value Investing, die von Warren Buffett und Benjamin Graham geprägte Anlagestrategie, basiert
                auf einem einfachen Prinzip: Kaufe Aktien, die unter ihrem inneren Wert gehandelt werden. Wer den
                Fair Value kennt, hat eine objektive Entscheidungsgrundlage und ist weniger anfällig für emotionale
                Fehlentscheidungen. Die Fair Value Analyse ist damit das Fundament einer disziplinierten Anlagestrategie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Warum Fair Value Analyse? */}
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
            Warum Fair Value Analyse?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto 3rem'
          }}>
            Vier gute Gründe, warum jeder Anleger den fairen Wert seiner Aktien kennen sollte
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                num: '01',
                title: 'Über- und Unterbewertungen erkennen',
                color: '#3b82f6',
                text: 'Der Vergleich von Börsenkurs und Fair Value zeigt dir auf einen Blick, ob eine Aktie aktuell günstig oder teuer bewertet ist. Das ist die Grundlage für jeden klugen Kauf- oder Verkaufsentscheid.'
              },
              {
                num: '02',
                title: 'Emotionale Fehlentscheidungen vermeiden',
                color: '#10b981',
                text: 'Märkte werden von Angst und Gier getrieben. Wer den inneren Wert einer Aktie kennt, lässt sich nicht von kurzfristigen Kursschwankungen oder Hypes verunsichern und trifft rationalere Entscheidungen.'
              },
              {
                num: '03',
                title: 'Sicherheitsmarge einbauen',
                color: '#a855f7',
                text: 'Benjamin Graham prägte das Konzept der Margin of Safety: Kaufe nur, wenn der Kurs deutlich unter dem Fair Value liegt. Diese Sicherheitsmarge schützt vor Bewertungsfehlern und unvorhergesehenen Risiken.'
              },
              {
                num: '04',
                title: 'Verschiedene Perspektiven nutzen',
                color: '#f59e0b',
                text: 'Kein einzelnes Bewertungsmodell ist perfekt. Durch die Kombination mehrerer Methoden – wie DCF, Graham und Lynch – erhältst du ein ausgewogeneres und zuverlässigeres Bild vom wahren Wert einer Aktie.'
              }
            ].map((reason) => (
              <div key={reason.num} style={{
                background: 'var(--surface)',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: reason.color,
                  opacity: 0.3,
                  marginBottom: '0.5rem',
                  lineHeight: 1
                }}>
                  {reason.num}
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  {reason.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: '0.95rem'
                }}>
                  {reason.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: 4 Bewertungsmodelle im Überblick */}
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
            4 Bewertungsmodelle im Überblick
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            maxWidth: '750px',
            margin: '0 auto 3rem'
          }}>
            Jedes Modell beleuchtet den Wert einer Aktie aus einem anderen Blickwinkel.
            BrainyTrader nutzt alle vier Modelle gemeinsam für eine umfassende Bewertung.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {methods.map((method) => (
              <Link
                key={method.title}
                to={method.link}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="card-hover"
                  style={{
                    padding: '2rem',
                    borderLeft: `4px solid ${method.color}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    {method.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.35rem',
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
                    marginBottom: '1rem'
                  }}>
                    {method.subtitle}
                  </p>
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    flex: 1,
                    marginBottom: '1rem'
                  }}>
                    {method.description}
                  </p>
                  <div style={{
                    background: `${method.color}11`,
                    border: `1px solid ${method.color}33`,
                    borderRadius: '6px',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Ideal für:</strong> {method.ideal}
                  </div>
                  <div style={{
                    marginTop: '1.25rem',
                    color: method.color,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    Mehr erfahren
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Der BrainyTrader-Ansatz */}
      <section style={{
        padding: '4rem 0',
        background: 'var(--background)'
      }}>
        <div className="app-container">
          <div style={{
            background: 'var(--surface)',
            borderRadius: '12px',
            padding: '3rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2.5rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Der BrainyTrader-Ansatz
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                Wie unsere KI alle vier Bewertungsmodelle zu einer präzisen Gesamtbewertung kombiniert
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '2.5rem'
            }}>
              {/* Step 1 */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                padding: '1.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.15)'
              }}>
                <div style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}>
                  1
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  Vier Modelle berechnen
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: '0.95rem'
                }}>
                  Für jede Aktie berechnet BrainyTrader den Fair Value mit allen vier Methoden gleichzeitig:
                  DCF, Graham, Lynch und Ertragswert. Dabei wird normalisiertes EPS (Median der historischen Gewinne)
                  verwendet, um Sondereffekte und zyklische Spitzen zu glätten. So entsteht ein vielschichtiges Bild des inneren Werts.
                </p>
              </div>

              {/* Step 2 */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.05)',
                padding: '1.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(16, 185, 129, 0.15)'
              }}>
                <div style={{
                  background: '#10b981',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}>
                  2
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  KI-gestützte Gewichtung
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: '0.95rem'
                }}>
                  Nicht jedes Modell eignet sich gleich gut für jedes Unternehmen. BrainyTrader erkennt den
                  Sektor und die Eigenschaften der Aktie und gewichtet die Modelle sektorspezifisch. Für
                  eine Bank wird anders gewichtet als für ein Tech-Startup. KGV-Multiplikatoren werden
                  durch branchenspezifische Obergrenzen (Graham: z.B. max. 14 fuer Finanzen, 35 fuer Tech; Gewinnkapitalisierung: max. 35) vor extremen Werten geschützt.
                  Zusätzlich werden Ausreißer automatisch heruntergewichtet: Liefert ein Modell einen Wert,
                  der stark vom Median aller Modelle abweicht, wird sein Einfluss reduziert (Outlier-Dampening).
                </p>
              </div>

              {/* Step 3 */}
              <div style={{
                background: 'rgba(168, 85, 247, 0.05)',
                padding: '1.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(168, 85, 247, 0.15)'
              }}>
                <div style={{
                  background: '#a855f7',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}>
                  3
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  Gewichteter Fair Value
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: '0.95rem'
                }}>
                  Das Ergebnis ist ein konsensbasierter Gesamt-Fair-Value, der robuster ist als jedes einzelne
                  Modell allein. Durch die dynamische Gewichtung — bei der jedes Modell nach seiner Nähe zum
                  Konsens gewichtet wird — liegt der Fair Value für über 90% der Aktien nah am tatsächlichen
                  Marktkurs. Du siehst auf einen Blick: Ist die Aktie aktuell überbewertet, fair bewertet
                  oder unterbewertet – und wie groß die Abweichung ist.
                </p>
              </div>
            </div>

            {/* Visual summary */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
              padding: '2rem',
              borderRadius: '10px',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                {[
                  { label: 'DCF', color: '#3b82f6' },
                  { label: 'Graham', color: '#10b981' },
                  { label: 'Lynch', color: '#a855f7' },
                  { label: 'Ertragswert', color: '#f59e0b' }
                ].map((m, i) => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      background: m.color,
                      color: 'white',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {m.label}
                    </div>
                    {i < 3 && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>+</span>
                    )}
                  </div>
                ))}
                <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: '0 0.25rem' }}>=</span>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #10b981)',
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}>
                  Gewichteter Fair Value
                </div>
              </div>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                margin: 0
              }}>
                Konsensbasierte Gewichtung mit Outlier-Dampening für maximale Aussagekraft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section style={{
        padding: '2rem 0'
      }}>
        <div className="app-container">
          <div style={{
            background: 'rgba(251, 146, 60, 0.08)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(251, 146, 60, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                style={{
                  width: '24px',
                  height: '24px',
                  color: '#f97316',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#ea580c',
                  marginBottom: '0.5rem'
                }}>
                  Wichtiger Hinweis – Keine Anlageberatung
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  Alle auf BrainyTrader bereitgestellten Fair Value Berechnungen, Analysen und Bewertungen dienen
                  ausschließlich zu allgemeinen Informations- und Bildungszwecken. Sie stellen keine Anlageberatung,
                  Finanzberatung oder Empfehlung zum Kauf oder Verkauf von Wertpapieren dar. Fair Value Berechnungen
                  basieren auf Modellen und Annahmen, die von den tatsächlichen Entwicklungen abweichen können.
                  Vergangene Wertentwicklungen sind kein verlässlicher Indikator für zukünftige Ergebnisse.
                  Investitionsentscheidungen sollten stets auf Basis eigener Recherche und gegebenenfalls unter
                  Konsultation eines qualifizierten Finanzberaters getroffen werden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 0 5rem',
        background: 'var(--background)'
      }}>
        <div className="app-container">
          <div style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            padding: '3rem 2rem',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Fair Value deiner Aktie berechnen
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Gib eine beliebige Aktie ein und erhalte sofort eine KI-gestützte Fair Value Analyse
              mit allen vier Bewertungsmodellen – kostenlos für über 15.000 Aktien weltweit.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-block',
                  background: 'var(--primary-color)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  Jetzt Aktie analysieren
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
