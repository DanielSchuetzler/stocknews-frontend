/**
 * Fair Value Graham Page
 * In-depth educational page about Benjamin Graham's Fair Value formula
 * SEO-optimized for: Graham Formel, Benjamin Graham Bewertung, Value Investing Formel
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const FairValueGrahamPage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Graham Fair Value Formel - Die Bewertungsmethode des Value Investing",
    "description": "Erfahre alles ueber Benjamin Grahams Fair Value Formel: Die Original-Formel V = EPS x (8.5 + 2g) x 4.4/Y, Sicherheitsmarge, Sektoranpassungen und praktische Beispielrechnungen.",
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
      "@id": "https://brainytrader.info/fair-value/graham"
    },
    "inLanguage": "de",
    "keywords": "Graham Formel, Benjamin Graham Bewertung, Value Investing Formel, Fair Value Berechnung, Sicherheitsmarge, Margin of Safety, innerer Wert Aktie"
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://brainytrader.info/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Fair Value",
        "item": "https://brainytrader.info/fair-value"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Graham Formel",
        "item": "https://brainytrader.info/fair-value/graham"
      }
    ]
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Helmet>
        <title>Graham Formel erklaert - Benjamin Grahams Fair Value Bewertung | BrainyTrader</title>
        <meta name="description" content="Die Graham Formel V = EPS x (8.5 + 2g) x 4.4/Y verstaendlich erklaert. Lerne Benjamin Grahams Value Investing Methode, Sicherheitsmarge und praktische Anwendung fuer Aktienbewertung." />
        <meta name="keywords" content="Graham Formel, Benjamin Graham Bewertung, Value Investing Formel, Fair Value Berechnung, Sicherheitsmarge, Margin of Safety, innerer Wert Aktie, KGV Bewertung" />
        <link rel="canonical" href="https://brainytrader.info/fair-value/graham" />
        <meta property="og:url" content="https://brainytrader.info/fair-value/graham" />
        <meta property="og:title" content="Graham Formel - Die Value Investing Bewertungsmethode | BrainyTrader" />
        <meta property="og:description" content="Benjamin Grahams Fair Value Formel verstaendlich erklaert: Original-Formel, modifizierte Variante, Sicherheitsmarge und Beispielrechnungen." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.75rem 0'
      }}>
        <div className="app-container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: 'var(--text-muted)'
        }}>
          <Link to="/" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/fair-value" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Fair Value</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>Graham Formel</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '3.5rem 0 3rem'
      }}>
        <div className="app-container" style={{ textAlign: 'center' }}>
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
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Value Investing Klassiker
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
            Graham Fair Value – Die Formel des Value Investing
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Benjamin Grahams Bewertungsformel ist seit Jahrzehnten das Fundament des Value Investing.
            Verstehe die Mathematik hinter der Methode, die Warren Buffett geformt hat, und
            lerne, wie du den inneren Wert einer Aktie systematisch bestimmst.
          </p>
        </div>
      </section>

      <div className="app-container" style={{ padding: '3rem var(--spacing-md)' }}>

        {/* ===== Section 1: Wer war Benjamin Graham? ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Wer war Benjamin Graham?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Benjamin Graham (1894-1976) gilt als der Vater des Value Investing und
                als einer der einflussreichsten Finanzanalysten des 20. Jahrhunderts.
                Als Professor an der Columbia University praegte er eine ganze Generation
                von Investoren, darunter seinen beruehmtesten Schueler: Warren Buffett.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Sein 1949 erschienenes Werk "The Intelligent Investor" revolutionierte
                die Art und Weise, wie Anleger ueber den Aktienmarkt nachdenken. Grahams
                zentrale These: Der Marktpreis einer Aktie schwankt um ihren inneren Wert
                (Intrinsic Value), und kluge Investoren kaufen, wenn der Preis deutlich
                unter diesem inneren Wert liegt.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontSize: '1rem'
              }}>
                Zusammen mit David Dodd verfasste er bereits 1934 "Security Analysis",
                das als Bibel der Fundamentalanalyse gilt. Graham entwickelte systematische
                Methoden zur Aktienbewertung, die auch heute noch die Grundlage moderner
                Bewertungsverfahren bilden.
              </p>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.05)',
              borderRadius: '10px',
              padding: '1.5rem',
              border: '1px solid rgba(16, 185, 129, 0.15)'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1.25rem'
              }}>
                Grahams Kernprinzipien
              </h3>
              {[
                { title: 'Innerer Wert', desc: 'Jede Aktie hat einen berechenbaren, fundamentalen Wert, der vom Marktpreis abweichen kann.' },
                { title: 'Sicherheitsmarge', desc: 'Kaufe nur, wenn der Marktpreis deutlich unter dem inneren Wert liegt, um Fehler abzufedern.' },
                { title: 'Mr. Market', desc: 'Der Markt ist kurzfristig emotional und irrational. Nutze das als Chance, nicht als Risiko.' },
                { title: 'Fundamentalanalyse', desc: 'Entscheidungen basieren auf Geschaeftszahlen, nicht auf Markttrends oder Spekulation.' }
              ].map((principle, index) => (
                <div key={index} style={{
                  marginBottom: index < 3 ? '1rem' : 0,
                  paddingBottom: index < 3 ? '1rem' : 0,
                  borderBottom: index < 3 ? '1px solid rgba(16, 185, 129, 0.1)' : 'none'
                }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {principle.title}:
                  </strong>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    margin: '0.25rem 0 0 0'
                  }}>
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 2: Die Original-Formel ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Die Original-Formel
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '1rem',
            marginBottom: '2rem'
          }}>
            Benjamin Graham veroeffentlichte seine Bewertungsformel in der Ausgabe von 1962
            seines Werkes "Security Analysis". Die Formel war darauf ausgelegt, den fairen Wert
            einer Wachstumsaktie unter Beruecksichtigung des aktuellen Gewinns, des erwarteten
            Wachstums und der Anleiherenditen zu bestimmen. Sie lautet:
          </p>

          {/* Formula Display */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            textAlign: 'center',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.02em',
              marginBottom: '0.75rem'
            }}>
              V = EPS x (8,5 + 2g) x 4,4 / Y
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              margin: 0
            }}>
              Graham's Intrinsic Value Formula (1962)
            </p>
          </div>

          {/* Variable Explanation */}
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Erlaeuterung der Variablen
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            {/* V */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(59, 130, 246, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  background: '#3b82f6',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  fontFamily: 'Georgia, serif'
                }}>V</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                  Innerer Wert (Intrinsic Value)
                </strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Das Ergebnis der Formel: Der berechnete faire Wert der Aktie pro Anteil.
                Liegt der aktuelle Kurs unter V, ist die Aktie laut Graham potenziell unterbewertet.
              </p>
            </div>

            {/* EPS */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  background: '#10b981',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}>EPS</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                  Gewinn pro Aktie (Earnings per Share)
                </strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Der aktuelle Jahresgewinn des Unternehmens geteilt durch die Anzahl ausstehender
                Aktien. Graham empfahl, den Durchschnitt der letzten drei Jahre zu verwenden (Trailing
                Twelve Months, TTM), um zyklische Schwankungen auszugleichen.
              </p>
            </div>

            {/* 8.5 */}
            <div style={{
              background: 'rgba(168, 85, 247, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(168, 85, 247, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  background: '#a855f7',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem'
                }}>8,5</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                  Basis-KGV (ohne Wachstum)
                </strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Das Kurs-Gewinn-Verhaeltnis (KGV), das Graham fuer ein Unternehmen ohne
                Gewinnwachstum als angemessen betrachtete. Bei einem EPS-Wachstum von 0 %
                ergibt sich also ein faires KGV von 8,5 -- ein konservativer Ansatz.
              </p>
            </div>

            {/* g */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  background: '#f59e0b',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic'
                }}>g</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                  Erwartetes Gewinnwachstum (Growth Rate)
                </strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Die erwartete jaehrliche Wachstumsrate des Gewinns pro Aktie ueber die naechsten
                7 bis 10 Jahre, angegeben in Prozent. Graham betonte, dass diese Schaetzung
                konservativ sein sollte. Typischerweise werden Analystenkonsens-Schaetzungen
                fuer die naechsten 5 Jahre herangezogen.
              </p>
            </div>

            {/* 4.4 */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  background: '#ef4444',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem'
                }}>4,4</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                  Historische AAA-Anleiherendite
                </strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Die durchschnittliche Rendite von AAA-bewerteten US-Unternehmensanleihen zu
                Grahams Zeiten (ca. 4,4 %). Dieser Wert dient als Referenzpunkt und wird
                im Verhaeltnis zur aktuellen Anleiherendite gesetzt, um das geaenderte
                Zinsumfeld zu beruecksichtigen.
              </p>
            </div>

            {/* Y */}
            <div style={{
              background: 'rgba(34, 211, 238, 0.05)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(34, 211, 238, 0.15)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{
                  background: '#22d3ee',
                  color: 'white',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic'
                }}>Y</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                  Aktuelle AAA-Anleiherendite
                </strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Die aktuelle Rendite von AAA-bewerteten Unternehmensanleihen. Der Faktor 4,4/Y
                passt die Bewertung an das heutige Zinsniveau an: Bei hoeheren Zinsen (Y &gt; 4,4)
                sinkt der faire Wert, bei niedrigeren Zinsen (Y &lt; 4,4) steigt er. Dies
                spiegelt die Opportunitaetskosten wider.
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            marginTop: '1rem'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Zusammengefasst:</strong> Die Formel multipliziert den Gewinn pro Aktie mit einem
              wachstumsabhaengigen KGV-Multiplikator und passt das Ergebnis an das aktuelle Zinsumfeld
              an. Je hoeher das Wachstum und je niedriger die Zinsen, desto hoeher der berechnete
              faire Wert.
            </p>
          </div>
        </section>

        {/* ===== Section 3: Die modifizierte Graham-Formel ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Die modifizierte Graham-Formel
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '1rem',
            marginBottom: '1.5rem'
          }}>
            Da sich die Marktbedingungen seit Grahams Zeiten erheblich veraendert haben,
            wurde die Original-Formel in der Praxis vielfach angepasst. Die gaengigste
            Modifikation fuehrt einen Sicherheitsabschlag ein und passt die Basisannahmen
            an moderne Verhaeltnisse an:
          </p>

          {/* Modified Formula Display */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.02em',
              marginBottom: '0.75rem'
            }}>
              V = [EPS x (7 + g) x 4,4 / Y] x MoS
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              margin: 0
            }}>
              Modifizierte Graham-Formel mit Sicherheitsmarge
            </p>
          </div>

          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Wesentliche Aenderungen
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              {
                title: 'Reduziertes Basis-KGV (7 statt 8,5)',
                desc: 'Viele Analysten verwenden einen konservativeren Basiswert von 7, um der heutigen hoeher bewerteten Marktumgebung Rechnung zu tragen. Graham selbst warnte davor, zu optimistische Annahmen zu verwenden.'
              },
              {
                title: 'Einfacher Wachstumsmultiplikator (1x statt 2x)',
                desc: 'In manchen Varianten wird der Wachstumsfaktor von 2g auf 1g reduziert, da die originale Formel dazu neigt, Wachstumsaktien zu aggressiv zu bewerten. Dies fuehrt zu realistischeren Schaetzungen fuer hoch wachsende Unternehmen.'
              },
              {
                title: 'Sicherheitsmarge (MoS)',
                desc: 'Ein expliziter Abschlag von typischerweise 25-35 % (MoS = 0,65 bis 0,75) wird eingebaut. Nur wenn der Marktpreis unter diesem reduzierten Wert liegt, gilt die Aktie als kaufenswert. Graham selbst empfahl stets einen solchen Puffer.'
              },
              {
                title: 'Alternative Zinsbasis',
                desc: 'Statt der AAA-Unternehmensanleihen verwenden manche Varianten die Rendite 10-jaehriger Staatsanleihen oder passen den historischen Referenzwert von 4,4 % auf einen realistischeren Wert an.'
              }
            ].map((change, index) => (
              <div key={index} style={{
                background: 'rgba(168, 85, 247, 0.04)',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid rgba(168, 85, 247, 0.1)',
                borderLeft: '4px solid #a855f7'
              }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem', display: 'block', marginBottom: '0.35rem' }}>
                  {change.title}
                </strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {change.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.06)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Wichtig:</strong> Es gibt keine einheitlich "richtige" modifizierte Formel.
              Die Anpassungen haengen vom jeweiligen Analysten, dem Sektor und den aktuellen
              Marktbedingungen ab. Entscheidend ist, dass die Grundidee erhalten bleibt:
              konservative Bewertung mit eingebauter Sicherheitsmarge.
            </p>
          </div>
        </section>

        {/* ===== Section 4: Sektoranpassungen ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Sektoranpassungen
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '1rem',
            marginBottom: '2rem'
          }}>
            Nicht jede Branche kann mit demselben Basis-KGV bewertet werden. Wachstumsstarke
            Technologieunternehmen haben historisch hoehere Bewertungen verdient als stabile
            Versorger. Eine sinnvolle Anwendung der Graham-Formel beruecksichtigt daher
            branchenspezifische Anpassungen:
          </p>

          <div style={{
            overflowX: 'auto',
            marginBottom: '1.5rem'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
              minWidth: '600px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-primary)', fontWeight: 700 }}>Sektor</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 1rem', color: 'var(--text-primary)', fontWeight: 700 }}>Basis-KGV</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 1rem', color: 'var(--text-primary)', fontWeight: 700 }}>Wachstumsfaktor</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-primary)', fontWeight: 700 }}>Begruendung</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sector: 'Technologie', kgv: '10-12', factor: '2,0x', reason: 'Hohes Wachstumspotenzial, Skalierbarkeit, aber auch hoehere Unsicherheit' },
                  { sector: 'Gesundheit / Pharma', kgv: '9-11', factor: '1,5-2,0x', reason: 'Stabile Nachfrage, Patentschutz, aber Regulierungsrisiken' },
                  { sector: 'Konsumgueter', kgv: '8-10', factor: '1,5x', reason: 'Planbare Cashflows, starke Marken, moderates Wachstum' },
                  { sector: 'Finanzen / Banken', kgv: '7-9', factor: '1,0-1,5x', reason: 'Zyklische Gewinne, Zinsabhaengigkeit, Regulierung' },
                  { sector: 'Energie / Rohstoffe', kgv: '6-8', factor: '1,0x', reason: 'Stark zyklisch, Rohstoffpreisabhaengigkeit, Kapitalbindung' },
                  { sector: 'Versorger', kgv: '7-8', factor: '0,5-1,0x', reason: 'Sehr stabile, aber langsam wachsende Geschaeftsmodelle' },
                  { sector: 'Immobilien (REITs)', kgv: '7-9', factor: '1,0x', reason: 'Abhaengig von Zinsentwicklung und Immobilienmarkt' }
                ].map((row, index) => (
                  <tr key={index} style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: index % 2 === 0 ? 'transparent' : 'rgba(59, 130, 246, 0.02)'
                  }}>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{row.sector}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{row.kgv}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{row.factor}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Praxis-Tipp:</strong> Die Sektoranpassung ersetzt den fixen Wert 8,5 in der
              Original-Formel. Ein Technologieunternehmen mit einem Basis-KGV von 11 und 15 %
              erwartetem Wachstum erhaelt beispielsweise einen wachstumsangepassten KGV-Multiplikator
              von 11 + 2 x 15 = 41 -- im Vergleich zu 8,5 + 2 x 15 = 38,5 bei der Standardformel.
            </p>
          </div>
        </section>

        {/* ===== Section 5: Beispielrechnung ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Beispielrechnung
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '1rem',
            marginBottom: '2rem'
          }}>
            Angenommen, wir moechten den fairen Wert eines fiktiven Unternehmens
            "TechCorp AG" berechnen, das im Technologiesektor taetig ist. Hier die
            relevanten Kennzahlen:
          </p>

          {/* Input Parameters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { label: 'EPS (TTM)', value: '4,50 EUR', color: '#10b981' },
              { label: 'Erwartetes Wachstum (g)', value: '12 %', color: '#f59e0b' },
              { label: 'Akt. AAA-Rendite (Y)', value: '5,2 %', color: '#22d3ee' },
              { label: 'Aktueller Aktienkurs', value: '98,00 EUR', color: '#ef4444' }
            ].map((param, index) => (
              <div key={index} style={{
                background: 'var(--background)',
                padding: '1.25rem',
                borderRadius: '10px',
                border: `1px solid var(--border-color)`,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600
                }}>{param.label}</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: param.color
                }}>{param.value}</div>
              </div>
            ))}
          </div>

          {/* Calculation Steps */}
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Schritt-fuer-Schritt-Berechnung
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {/* Step 1 */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.04)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  background: '#3b82f6',
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>1</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  Wachstumsbereinigtes KGV berechnen
                </strong>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                padding: '0.5rem 0 0 2.75rem'
              }}>
                8,5 + 2 x 12 = 8,5 + 24 = <strong>32,5</strong>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.04)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  background: '#3b82f6',
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>2</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  Zinsanpassungsfaktor berechnen
                </strong>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                padding: '0.5rem 0 0 2.75rem'
              }}>
                4,4 / 5,2 = <strong>0,846</strong>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.04)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  background: '#3b82f6',
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>3</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  Fairen Wert berechnen
                </strong>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                padding: '0.5rem 0 0 2.75rem'
              }}>
                V = 4,50 x 32,5 x 0,846 = <strong>123,74 EUR</strong>
              </div>
            </div>

            {/* Step 4 */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.04)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  background: '#3b82f6',
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>4</span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  Sicherheitsmarge anwenden (30 % Abschlag)
                </strong>
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                padding: '0.5rem 0 0 2.75rem'
              }}>
                Kaufkurs = 123,74 x 0,70 = <strong>86,62 EUR</strong>
              </div>
            </div>
          </div>

          {/* Result Summary */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem'
            }}>
              Ergebnis der Analyse
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                  FAIRER WERT
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>
                  123,74 EUR
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                  KAUFKURS (MIT MoS)
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#3b82f6' }}>
                  86,62 EUR
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                  AKTUELLER KURS
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ef4444' }}>
                  98,00 EUR
                </div>
              </div>
            </div>
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                <strong>Interpretation:</strong> Der faire Wert liegt bei 123,74 EUR, was auf eine
                Unterbewertung von ca. 21 % gegenueber dem aktuellen Kurs (98,00 EUR) hindeutet.
                Allerdings liegt der Kurs noch ueber dem Sicherheitsmarge-Kaufkurs von 86,62 EUR.
                Ein strenger Graham-Investor wuerde daher noch abwarten, bis der Kurs unter
                86,62 EUR faellt.
              </p>
            </div>
          </div>
        </section>

        {/* ===== Section 6: Sicherheitsmarge (Margin of Safety) ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Sicherheitsmarge (Margin of Safety)
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '1rem',
            marginBottom: '1.5rem'
          }}>
            Die Sicherheitsmarge ist das zentrale Konzept in Benjamin Grahams Anlagephilosophie.
            Die Idee ist einfach, aber wirkungsvoll: Da jede Bewertung auf Schaetzungen beruht
            und damit fehlerbehaftet sein kann, sollte ein Investor nur kaufen, wenn der
            Marktpreis deutlich unter dem berechneten fairen Wert liegt. Dieser Puffer schuetzt
            vor Analysefehlern, unerwarteten Ereignissen und Marktschwankungen.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Visual: Margin of Safety */}
            <div style={{
              background: 'var(--background)',
              borderRadius: '10px',
              padding: '1.75rem',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', textAlign: 'center' }}>
                Konzept der Sicherheitsmarge
              </h3>
              <svg viewBox="0 0 300 200" style={{ width: '100%', height: 'auto' }}>
                {/* Intrinsic Value Bar */}
                <rect x="30" y="20" width="240" height="40" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
                <text x="150" y="45" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="700">Fairer Wert: 123,74 EUR</text>

                {/* Safety Margin Zone */}
                <rect x="30" y="70" width="168" height="40" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="114" y="95" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="700">Kaufkurs: 86,62 EUR</text>

                {/* Margin of Safety Arrow */}
                <line x1="198" y1="55" x2="198" y2="75" stroke="#f59e0b" strokeWidth="2" />
                <line x1="270" y1="55" x2="270" y2="75" stroke="#f59e0b" strokeWidth="2" />
                <line x1="198" y1="65" x2="270" y2="65" stroke="#f59e0b" strokeWidth="2" />
                <text x="234" y="63" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="600">30% MoS</text>

                {/* Current Price */}
                <rect x="30" y="120" width="196" height="40" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" />
                <text x="128" y="145" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">Aktueller Kurs: 98,00 EUR</text>

                {/* Labels */}
                <text x="150" y="185" textAnchor="middle" fill="var(--text-muted)" fontSize="10">Kurs liegt zwischen Fair Value und Kaufkurs</text>
              </svg>
            </div>

            {/* Recommended Margins */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Empfohlene Sicherheitsmargen
              </h3>

              {[
                { type: 'Konservativ', margin: '30-50 %', desc: 'Fuer zyklische Branchen, unberechenbare Unternehmen oder unsichere Maerkte. Graham selbst bevorzugte diesen Bereich.', color: '#10b981' },
                { type: 'Moderat', margin: '20-30 %', desc: 'Fuer stabile Unternehmen mit vorhersagbaren Cashflows und solider Bilanz. Der gaengigste Ansatz in der Praxis.', color: '#3b82f6' },
                { type: 'Aggressiv', margin: '10-20 %', desc: 'Fuer erstklassige Unternehmen (Blue Chips) mit langer Erfolgsgeschichte und dominanter Marktstellung.', color: '#f59e0b' }
              ].map((level, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: index < 2 ? '1rem' : 0,
                  paddingBottom: index < 2 ? '1rem' : 0,
                  borderBottom: index < 2 ? '1px solid var(--border-color)' : 'none'
                }}>
                  <div style={{
                    width: '4px',
                    borderRadius: '2px',
                    background: level.color,
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{level.type}</strong>
                      <span style={{
                        background: `${level.color}20`,
                        color: level.color,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px'
                      }}>{level.margin}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                      {level.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.05)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.15)'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Graham's Denkweise:</strong> Die Sicherheitsmarge ist keine Garantie gegen Verluste,
              sondern eine Versicherung gegen Analysefehler. Da keine Bewertung perfekt sein kann,
              sorgt der Sicherheitspuffer dafuer, dass selbst bei ueberoptimistischen Annahmen
              der Investor noch einen angemessenen Schutz hat. Graham verglich dies mit dem
              Sicherheitsfaktor im Brueckenbau: Eine Bruecke wird fuer ein Vielfaches der erwarteten
              Last konstruiert.
            </p>
          </div>
        </section>

        {/* ===== Section 7: Staerken und Schwaechen ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            Staerken und Schwaechen der Graham-Formel
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Strengths */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.04)',
              borderRadius: '10px',
              padding: '1.75rem',
              border: '1px solid rgba(16, 185, 129, 0.15)'
            }}>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#10b981',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" style={{ width: '20px', height: '20px' }}>
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Staerken
              </h3>
              {[
                {
                  title: 'Einfach und transparent',
                  desc: 'Die Formel ist leicht verstaendlich und nachvollziehbar. Jeder Investor kann die Berechnung selbst nachrechnen und die Annahmen hinterfragen.'
                },
                {
                  title: 'Konservativer Ansatz',
                  desc: 'Die eingebaute Sicherheitsmarge schuetzt vor ueberoptimistischen Bewertungen und reduziert das Verlustrisiko bei Fehleinschaetzungen.'
                },
                {
                  title: 'Zinsbereinigung',
                  desc: 'Der Faktor 4,4/Y passt die Bewertung automatisch an das aktuelle Zinsumfeld an, was die Formel ueber verschiedene Marktphasen hinweg anwendbar macht.'
                },
                {
                  title: 'Bewaehrte Methode',
                  desc: 'Die Formel hat sich ueber Jahrzehnte bewaehrt und bildet die Basis fuer viele moderne Bewertungsansaetze. Sie zwingt den Investor zu diszipliniertem Denken.'
                },
                {
                  title: 'Wenige Inputdaten',
                  desc: 'Es werden nur drei Variablen benoetigt (EPS, Wachstumsrate, Anleiherendite), was die Anwendung auch fuer Privatanleger praxistauglich macht.'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  marginBottom: index < 4 ? '1rem' : 0,
                  paddingBottom: index < 4 ? '1rem' : 0,
                  borderBottom: index < 4 ? '1px solid rgba(16, 185, 129, 0.1)' : 'none'
                }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem' }}>
                    {item.title}
                  </strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Weaknesses */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.04)',
              borderRadius: '10px',
              padding: '1.75rem',
              border: '1px solid rgba(239, 68, 68, 0.15)'
            }}>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#ef4444',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" style={{ width: '20px', height: '20px' }}>
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Schwaechen
              </h3>
              {[
                {
                  title: 'Wachstumsschaetzung unsicher',
                  desc: 'Die Formel ist stark abhaengig von der geschaetzten Wachstumsrate g. Kleine Aenderungen in dieser Annahme fuehren zu grossen Unterschieden im Ergebnis.'
                },
                {
                  title: 'Nicht fuer alle Unternehmen geeignet',
                  desc: 'Unternehmen ohne Gewinne (z.B. Start-ups), mit negativem EPS oder stark schwankenden Ergebnissen koennen mit der Formel nicht sinnvoll bewertet werden.'
                },
                {
                  title: 'Vereinfachte Realitaet',
                  desc: 'Die Formel beruecksichtigt keine qualitativen Faktoren wie Managementqualitaet, Wettbewerbsvorteile (Moats), Bilanzstruktur oder Marktposition.'
                },
                {
                  title: 'Lineare Wachstumsannahme',
                  desc: 'Die Formel unterstellt ein konstantes Wachstum ueber Jahre hinweg, was in der Realitaet selten zutrifft. Wachstumsraten schwanken und nehmen typischerweise ab.'
                },
                {
                  title: 'Historische Kalibrierung',
                  desc: 'Der Basiswert 8,5 stammt aus den 1960er-Jahren. Die heutigen Maerkte mit Technologieunternehmen, globalem Handel und Algorithmen-Trading unterscheiden sich fundamental.'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  marginBottom: index < 4 ? '1rem' : 0,
                  paddingBottom: index < 4 ? '1rem' : 0,
                  borderBottom: index < 4 ? '1px solid rgba(239, 68, 68, 0.1)' : 'none'
                }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem' }}>
                    {item.title}
                  </strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            marginTop: '1.5rem'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Fazit:</strong> Die Graham-Formel ist ein hervorragender Ausgangspunkt fuer die
              Aktienbewertung, sollte aber nie isoliert verwendet werden. Die besten Ergebnisse
              erzielt man, wenn die Graham-Bewertung mit anderen Methoden wie DCF-Analyse,
              PEG-Ratio oder Ertragswertverfahren kombiniert wird.
            </p>
          </div>
        </section>

        {/* ===== Section 8: So nutzt BrainyTrader die Graham-Formel ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem'
          }}>
            So nutzt BrainyTrader die Graham-Formel
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '1rem',
            marginBottom: '2rem'
          }}>
            Bei BrainyTrader setzen wir die Graham-Formel als eines von vier wissenschaftlichen
            Bewertungsmodellen ein. Unsere Implementierung geht ueber die einfache Standardformel
            hinaus und beruecksichtigt moderne Anpassungen:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                title: 'Normalisiertes EPS',
                desc: 'Statt des aktuellen Trailing-EPS wird der Median der historischen Gewinne verwendet. So werden Sondereffekte, zyklische Spitzen und einmalige Gewinne automatisch geglaettet.',
                color: '#3b82f6',
                icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              },
              {
                title: 'Sektorspezifisches Basis-KGV',
                desc: 'Statt des pauschalen Wertes 8,5 verwenden wir branchenabhaengige Basiswerte, die auf historischen Durchschnittsbewertungen basieren.',
                color: '#10b981',
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              },
              {
                title: 'Branchenspezifischer KGV-Cap',
                desc: 'Der resultierende KGV-Multiplikator wird branchenspezifisch gedeckelt (z.B. max. 14 fuer Finanzen, 35 fuer Technologie). So werden branchengerechte Bewertungsobergrenzen eingehalten.',
                color: '#a855f7',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              },
              {
                title: 'Konsensbasierte Gewichtung',
                desc: 'Die Graham-Bewertung wird mit DCF, PEG-Ratio und Ertragswert kombiniert. Weicht ein Modell stark vom Konsens ab, wird es automatisch heruntergewichtet (Outlier-Dampening).',
                color: '#f59e0b',
                icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: `${feature.color}08`,
                padding: '1.5rem',
                borderRadius: '10px',
                border: `1px solid ${feature.color}20`
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={feature.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
                    <path d={feature.icon} />
                  </svg>
                </div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>
                  {feature.title}
                </strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                background: 'var(--primary-color)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
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
              Jetzt Aktien bewerten
            </Link>
          </div>
        </section>

        {/* ===== Section 9: Links to Other Methods ===== */}
        <section style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '2.5rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}>
            Weitere Bewertungsmethoden
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '1.5rem'
          }}>
            Fuer eine fundierte Aktienanalyse empfiehlt es sich, mehrere Bewertungsmodelle
            zu kombinieren. Jede Methode beleuchtet einen anderen Aspekt des Unternehmenswerts:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {[
              {
                title: 'DCF-Analyse',
                subtitle: 'Discounted Cash Flow',
                desc: 'Projiziert zukuenftige Cashflows und diskontiert sie auf den heutigen Wert. Besonders geeignet fuer Unternehmen mit stabilen, vorhersagbaren Cashflows.',
                link: '/fair-value/dcf',
                color: '#3b82f6'
              },
              {
                title: 'PEG-Ratio',
                subtitle: 'Peter Lynch Methode',
                desc: 'Bewertet Wachstumsaktien anhand des Verhaeltnisses von KGV zu Gewinnwachstum. Ideal fuer schnell wachsende Unternehmen.',
                link: '/fair-value/lynch',
                color: '#a855f7'
              },
              {
                title: 'Ertragswert',
                subtitle: 'Gordon Growth Model',
                desc: 'Berechnet den nachhaltigen Wert basierend auf Eigenkapitalrendite und nachhaltigem Wachstum. Gut geeignet fuer dividendenstarke Unternehmen.',
                link: '/fair-value/ertragswert',
                color: '#f59e0b'
              }
            ].map((method) => (
              <Link
                key={method.link}
                to={method.link}
                style={{
                  display: 'block',
                  background: `${method.color}08`,
                  padding: '1.5rem',
                  borderRadius: '10px',
                  border: `1px solid ${method.color}20`,
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: method.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.35rem'
                }}>{method.subtitle}</div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>{method.title}</h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  margin: 0
                }}>{method.desc}</p>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link
              to="/fair-value"
              style={{
                color: 'var(--primary-color)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}
            >
              Alle Bewertungsmethoden ansehen &rarr;
            </Link>
          </div>
        </section>

        {/* ===== Disclaimer ===== */}
        <section style={{
          background: 'rgba(239, 68, 68, 0.04)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid rgba(239, 68, 68, 0.15)',
          marginBottom: '2rem'
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
                width: '22px',
                height: '22px',
                color: '#ef4444',
                flexShrink: 0,
                marginTop: '2px'
              }}
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ef4444',
                marginBottom: '0.75rem'
              }}>
                Wichtiger Haftungsausschluss
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                marginBottom: '0.75rem'
              }}>
                Die auf dieser Seite dargestellten Informationen, Formeln und Berechnungen
                dienen ausschliesslich zu Bildungs- und Informationszwecken. Sie stellen
                keine Anlageberatung, Finanzberatung oder Empfehlung zum Kauf oder Verkauf
                von Wertpapieren dar.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                marginBottom: '0.75rem'
              }}>
                Die Graham-Formel ist ein vereinfachtes Bewertungsmodell und beruecksichtigt
                nicht alle Faktoren, die den Wert eines Unternehmens beeinflussen. Vergangene
                Wertentwicklungen und berechnete faire Werte sind kein verlaesslicher
                Indikator fuer zukuenftige Ergebnisse.
              </p>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                margin: 0
              }}>
                Investitionsentscheidungen sollten stets unter Beruecksichtigung der
                individuellen finanziellen Situation und nach Ruecksprache mit einem
                qualifizierten Finanzberater getroffen werden. BrainyTrader uebernimmt
                keine Haftung fuer finanzielle Verluste, die auf Grundlage der hier
                bereitgestellten Informationen entstehen.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
