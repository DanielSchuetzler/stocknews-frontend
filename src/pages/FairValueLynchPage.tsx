/**
 * Fair Value Lynch Page
 * In-depth educational page about Peter Lynch's PEG-Ratio Fair Value method
 * SEO-optimized for: PEG Ratio, Peter Lynch Bewertung, Wachstumsaktien Bewertung
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const FairValueLynchPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Peter Lynch Fair Value – PEG-Ratio einfach erklärt",
    "description": "Lerne, wie du mit Peter Lynchs PEG-Ratio den fairen Wert von Wachstumsaktien bestimmst. Formel, Beispielrechnung und praktische Anwendung.",
    "url": "https://brainytrader.info/fair-value/lynch",
    "inLanguage": "de",
    "author": { "@type": "Organization", "name": "BrainyTrader" },
    "publisher": { "@type": "Organization", "name": "BrainyTrader", "url": "https://brainytrader.info" },
    "mainEntityOfPage": "https://brainytrader.info/fair-value/lynch"
  };

  const sectionStyle = {
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: '2.5rem',
    border: '1px solid var(--border-color)',
    marginBottom: '2rem',
    boxShadow: 'var(--shadow-md)'
  } as const;

  const h2Style = {
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '1.5rem'
  } as const;

  const pStyle = {
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    marginBottom: '1rem'
  } as const;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Helmet>
        <title>Peter Lynch Fair Value & PEG-Ratio – Wachstumsaktien richtig bewerten | BrainyTrader</title>
        <meta name="description" content="PEG-Ratio nach Peter Lynch: Lerne die Bewertungsmethode für Wachstumsaktien. Formel, Berechnung, Beispiel und wann das PEG-Ratio sinnvoll ist. Ausführlich erklärt." />
        <meta name="keywords" content="PEG Ratio, Peter Lynch, Wachstumsaktien Bewertung, PEG Ratio Formel, Fair Value Wachstumsaktien, KGV Gewinnwachstum, Peter Lynch Strategie, One Up on Wall Street" />
        <link rel="canonical" href="https://brainytrader.info/fair-value/lynch" />
        <meta property="og:url" content="https://brainytrader.info/fair-value/lynch" />
        <meta property="og:title" content="PEG-Ratio nach Peter Lynch – Wachstumsaktien bewerten" />
        <meta property="og:description" content="Die PEG-Ratio Methode von Peter Lynch: Formel, Berechnung und praktische Anwendung für Wachstumsaktien." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-color)', padding: '0.75rem 0' }}>
        <div className="app-container" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link to="/fair-value" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Fair Value</Link>
          {' / '}
          <span style={{ color: 'var(--text-primary)' }}>PEG-Ratio (Peter Lynch)</span>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div style={{
        background: 'rgba(251, 146, 60, 0.08)',
        borderBottom: '1px solid rgba(251, 146, 60, 0.2)',
        padding: '0.75rem 0'
      }}>
        <div className="app-container" style={{ textAlign: 'center' }}>
          <p style={{ color: '#ea580c', fontWeight: 500, fontSize: '0.85rem', margin: 0 }}>
            <strong>Bildungsinhalte</strong> – Keine Anlageberatung. Alle Berechnungen dienen nur zur Illustration.
          </p>
        </div>
      </div>

      <div className="app-container" style={{ padding: '3rem var(--spacing-md)' }}>
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '6px',
            padding: '0.4rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#a855f7'
          }}>
            Bewertungsmethode 3 von 4
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.3
          }}>
            PEG-Ratio nach Peter Lynch
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Die elegante Methode, um Wachstumsaktien fair zu bewerten – durch das Verhältnis von KGV zu Gewinnwachstum
          </p>
        </header>

        {/* Wer war Peter Lynch */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Wer war Peter Lynch?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <p style={pStyle}>
                <strong style={{ color: 'var(--text-primary)' }}>Peter Lynch</strong> (geb. 1944) ist einer der
                erfolgreichsten Fondsmanager aller Zeiten. Als Manager des Fidelity Magellan Fund von 1977 bis 1990
                erzielte er eine durchschnittliche jährliche Rendite von 29,2% und machte den Fonds zum größten
                Aktienfonds der Welt.
              </p>
              <p style={pStyle}>
                Lynch vertritt die Philosophie, dass Privatanleger gegenüber institutionellen Investoren Vorteile haben,
                weil sie in ihrem Alltag Trends und erfolgreiche Unternehmen früher entdecken können. Sein Buch
                "One Up on Wall Street" wurde zum Klassiker der Anlageliteratur.
              </p>
              <p style={pStyle}>
                Sein berühmtester Beitrag zur Aktienanalyse ist die <strong style={{ color: 'var(--text-primary)' }}>PEG-Ratio</strong> –
                eine einfache, aber wirkungsvolle Kennzahl, die das Kurs-Gewinn-Verhältnis ins Verhältnis zum
                Gewinnwachstum setzt.
              </p>
            </div>
            <div style={{
              background: 'rgba(168, 85, 247, 0.05)',
              borderRadius: '10px',
              padding: '2rem',
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Lynchs Investment-Prinzipien
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  '"Investiere in das, was du verstehst"',
                  'Suche Unternehmen mit starkem Gewinnwachstum',
                  'Achte auf ein faires KGV im Verhältnis zum Wachstum',
                  'Ein PEG unter 1 signalisiert eine Kaufgelegenheit',
                  'Langfristiges Denken schlägt kurzfristige Spekulation'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#a855f7', flexShrink: 0 }}>●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Was ist das PEG-Ratio */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Was ist das PEG-Ratio?</h2>
          <p style={pStyle}>
            Das <strong style={{ color: 'var(--text-primary)' }}>PEG-Ratio</strong> (Price/Earnings to Growth) setzt das
            Kurs-Gewinn-Verhältnis (KGV) einer Aktie ins Verhältnis zu ihrem erwarteten Gewinnwachstum. Die Grundidee:
            Ein hohes KGV ist nur dann gerechtfertigt, wenn das Unternehmen auch entsprechend stark wächst.
          </p>
          <p style={pStyle}>
            Das klassische KGV allein hat ein großes Problem: Ein KGV von 30 kann für ein Unternehmen mit 5% Wachstum
            teuer sein, aber für eines mit 40% Wachstum günstig. Das PEG-Ratio löst dieses Problem, indem es
            das Wachstum in die Bewertung einbezieht.
          </p>
        </section>

        {/* Die Formel */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Die PEG-Ratio Formel</h2>

          {/* Formula Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            borderRadius: '12px',
            padding: '2.5rem',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>PEG-Ratio Formel</p>
            <div style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              marginBottom: '1.5rem'
            }}>
              PEG = KGV / Gewinnwachstum (%)
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Fair Value Ableitung:
            </p>
            <div style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: '#a855f7',
              fontFamily: 'monospace'
            }}>
              Fair Value = EPS × Gewinnwachstum (%)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              (Entspricht dem Preis bei PEG = 1)
            </p>
          </div>

          {/* Variable Explanations */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Die Variablen im Detail
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                variable: 'KGV (P/E)',
                fullName: 'Kurs-Gewinn-Verhältnis',
                explanation: 'Aktueller Aktienkurs geteilt durch den Gewinn pro Aktie (EPS). Zeigt, das Wievielfache des Gewinns der Markt bereit ist zu zahlen.',
                example: 'Kurs 150€ / EPS 5€ = KGV 30',
                color: '#3b82f6'
              },
              {
                variable: 'g (%)',
                fullName: 'Erwartetes Gewinnwachstum p.a.',
                explanation: 'Die prognostizierte jährliche Wachstumsrate des Gewinns pro Aktie, typischerweise über die nächsten 3-5 Jahre. Wird oft aus Analystenprognosen abgeleitet.',
                example: 'Erwartetes Wachstum: 25% p.a.',
                color: '#10b981'
              },
              {
                variable: 'EPS',
                fullName: 'Earnings per Share',
                explanation: 'Gewinn pro Aktie – der Jahresüberschuss des Unternehmens geteilt durch die Anzahl der ausgegebenen Aktien. Basis für die Bewertung.',
                example: 'Gewinn 500 Mio. / 100 Mio. Aktien = 5€ EPS',
                color: '#a855f7'
              }
            ].map((item) => (
              <div key={item.variable} style={{
                background: `${item.color}0d`,
                padding: '1.5rem',
                borderRadius: '10px',
                border: `1px solid ${item.color}33`
              }}>
                <div style={{
                  fontSize: '1.5rem', fontWeight: 800, color: item.color, marginBottom: '0.25rem', fontFamily: 'monospace'
                }}>
                  {item.variable}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {item.fullName}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {item.explanation}
                </p>
                <div style={{
                  background: 'var(--background)', padding: '0.5rem 0.75rem',
                  borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)', fontFamily: 'monospace'
                }}>
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interpretation */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>PEG-Ratio interpretieren</h2>
          <p style={pStyle}>
            Peter Lynch formulierte eine einfache Faustregel: Eine Aktie ist fair bewertet, wenn ihr KGV ungefähr
            der erwarteten Gewinnwachstumsrate entspricht – also ein PEG von etwa 1.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>PEG &lt; 1</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Unterbewertet</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Das Gewinnwachstum ist höher als das KGV vermuten lässt. Die Aktie ist möglicherweise ein Schnäppchen
                – der Markt hat das Wachstumspotenzial noch nicht vollständig eingepreist.
              </p>
            </div>
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6', marginBottom: '0.5rem' }}>PEG = 1</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Fair bewertet</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                KGV und Wachstumsrate sind im Gleichgewicht. Der Markt bewertet das Unternehmen angemessen
                im Verhältnis zu seinem Wachstumspotenzial.
              </p>
            </div>
            <div style={{
              background: 'rgba(239, 68, 68, 0.08)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.5rem' }}>PEG &gt; 1</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Überbewertet</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Das KGV ist zu hoch im Verhältnis zum Wachstum. Der Markt bezahlt einen Aufpreis, der durch
                das Gewinnwachstum allein nicht gerechtfertigt ist.
              </p>
            </div>
          </div>
        </section>

        {/* Beispielrechnung */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Beispielrechnung</h2>
          <p style={pStyle}>
            Betrachten wir ein fiktives Technologieunternehmen "TechGrow AG" mit folgenden Kennzahlen:
          </p>

          {/* Input Data */}
          <div style={{
            background: 'var(--background)', borderRadius: '10px', padding: '1.5rem',
            border: '1px solid var(--border-color)', marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Ausgangsdaten – TechGrow AG
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Aktueller Kurs', value: '120,00 €' },
                { label: 'Gewinn pro Aktie (EPS)', value: '4,00 €' },
                { label: 'Aktuelles KGV', value: '30,0x' },
                { label: 'Erw. Gewinnwachstum (5J)', value: '25% p.a.' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'var(--surface)', padding: '1rem', borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculation Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(168, 85, 247, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}>
              <h4 style={{ color: '#a855f7', fontWeight: 700, marginBottom: '0.75rem' }}>Schritt 1: PEG-Ratio berechnen</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                PEG = KGV / Gewinnwachstum = 30 / 25 = <strong>1,20</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Ein PEG von 1,20 bedeutet: Die Aktie ist leicht überbewertet im Verhältnis zum Wachstum.
              </p>
            </div>

            <div style={{
              background: 'rgba(168, 85, 247, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}>
              <h4 style={{ color: '#a855f7', fontWeight: 700, marginBottom: '0.75rem' }}>Schritt 2: Fair Value berechnen (PEG = 1)</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Faires KGV = Gewinnwachstum = 25<br />
                Fair Value = EPS × faires KGV = 4,00 × 25 = <strong>100,00 €</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Bei einem fairen PEG von 1 wäre die Aktie 100 € wert.
              </p>
            </div>

            <div style={{
              background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <h4 style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.75rem' }}>Ergebnis: Überbewertung</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Marktpreis: 120,00 € | Fair Value: 100,00 € | Abweichung: <strong style={{ color: '#ef4444' }}>+20% überbewertet</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Nach der PEG-Methode ist die Aktie aktuell 20% überbewertet. Der Markt zahlt einen Aufpreis
                gegenüber dem wachstumsbasierten fairen Wert.
              </p>
            </div>
          </div>
        </section>

        {/* Wann PEG sinnvoll */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Wann ist das PEG-Ratio sinnvoll?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginBottom: '1rem' }}>
                Gut geeignet für:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Wachstumsaktien mit steigendem Gewinn (Tech, Biotech, SaaS)',
                  'Vergleich von Unternehmen innerhalb einer Branche',
                  'Schnelle Ersteinschätzung, ob ein hohes KGV gerechtfertigt ist',
                  'Unternehmen mit positivem und wachsendem EPS',
                  'Screening-Tool zum Finden unterbewerteter Wachstumsaktien'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444', marginBottom: '1rem' }}>
                Weniger geeignet für:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Unternehmen mit negativem Gewinn (Startups, Turnaround-Fälle)',
                  'Zyklische Branchen mit stark schwankenden Gewinnen',
                  'Sehr reife Unternehmen mit minimalem Wachstum',
                  'Unternehmen mit einmaligen Sondereffekten im Gewinn',
                  'Sektoren wie Versorger oder Immobilien (REITs)'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stärken und Schwächen */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Stärken und Schwächen der PEG-Ratio Methode</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginBottom: '1rem' }}>Stärken</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Einfach und intuitiv verständlich – auch für Anfänger',
                  'Berücksichtigt Wachstum, was das reine KGV nicht tut',
                  'Ideal zum schnellen Vergleich von Wachstumsaktien',
                  'Klare Interpretation: PEG < 1 = günstig, PEG > 1 = teuer',
                  'Wenige Eingabedaten nötig (KGV + Wachstumsrate)'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#10b981', flexShrink: 0 }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444', marginBottom: '1rem' }}>Schwächen</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Wachstumsprognosen sind oft ungenau',
                  'Funktioniert nicht bei negativem Gewinn oder Wachstum',
                  'Berücksichtigt kein Risiko, Verschuldung oder Cashflow',
                  'Annahme linearer Beziehung zwischen KGV und Wachstum',
                  'Unterschiedliche Branchen haben unterschiedlich "faire" PEG-Werte'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>−</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BrainyTrader Integration */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: '12px', padding: '2.5rem', border: '1px solid rgba(168, 85, 247, 0.2)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            So nutzt BrainyTrader die PEG-Ratio Methode
          </h2>
          <p style={pStyle}>
            BrainyTrader berechnet das PEG-Ratio automatisch für jede Aktie und leitet daraus einen fairen Wert ab.
            Die Gewichtung erfolgt sektorspezifisch und dynamisch: Weicht der Lynch-Wert stark vom Median
            aller Modelle ab, wird sein Einfluss automatisch reduziert (Outlier-Dampening). Kombiniert mit DCF,
            Graham und Ertragswert entsteht eine konsensbasierte, robuste Bewertung.
          </p>
          <Link to="/" style={{
            display: 'inline-block', background: 'var(--primary-color)', color: 'white',
            padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600
          }}>
            Jetzt Aktie analysieren
          </Link>
        </section>

        {/* Other Methods */}
        <section style={sectionStyle}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Weitere Fair Value Methoden
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Übersicht', link: '/fair-value', color: '#6366f1' },
              { title: 'DCF-Verfahren', link: '/fair-value/dcf', color: '#3b82f6' },
              { title: 'Graham-Formel', link: '/fair-value/graham', color: '#10b981' },
              { title: 'Ertragswert', link: '/fair-value/ertragswert', color: '#f59e0b' },
            ].map((m) => (
              <Link key={m.title} to={m.link} style={{
                display: 'block', padding: '1rem', borderRadius: '8px', textDecoration: 'none',
                background: `${m.color}0d`, border: `1px solid ${m.color}33`,
                color: m.color, fontWeight: 600, textAlign: 'center', transition: 'transform 0.2s'
              }}>
                {m.title} →
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
