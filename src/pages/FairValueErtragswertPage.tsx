/**
 * Fair Value Ertragswert Page
 * In-depth educational page about the Earnings Value / Gordon Growth Model method
 * SEO-optimized for: Ertragswertverfahren, Gordon Growth Model, Dividendenaktien Bewertung
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const FairValueErtragswertPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Ertragswertverfahren & Gordon Growth Model – Fair Value berechnen",
    "description": "Das Ertragswertverfahren (Gordon Growth Model) erklärt: Formel, Berechnung und Anwendung für Dividendenaktien und reife Unternehmen.",
    "url": "https://brainytrader.info/fair-value/ertragswert",
    "inLanguage": "de",
    "author": { "@type": "Organization", "name": "BrainyTrader" },
    "publisher": { "@type": "Organization", "name": "BrainyTrader", "url": "https://brainytrader.info" },
    "mainEntityOfPage": "https://brainytrader.info/fair-value/ertragswert"
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
        <title>Ertragswertverfahren & Gordon Growth Model – Aktien bewerten | BrainyTrader</title>
        <meta name="description" content="Ertragswertverfahren (Gordon Growth Model) erklärt: So berechnest du den fairen Wert von Dividendenaktien. Formel, Herleitung, Beispielrechnung und praktische Anwendung." />
        <meta name="keywords" content="Ertragswertverfahren, Gordon Growth Model, Dividenden Bewertung, Aktie fairer Wert, Eigenkapitalrendite, ROE, nachhaltige Wachstumsrate, Dividend Discount Model" />
        <link rel="canonical" href="https://brainytrader.info/fair-value/ertragswert" />
        <meta property="og:url" content="https://brainytrader.info/fair-value/ertragswert" />
        <meta property="og:title" content="Ertragswertverfahren – Dividendenaktien fair bewerten" />
        <meta property="og:description" content="Gordon Growth Model und Ertragswertverfahren: Formel, Herleitung und Anwendung für die Bewertung von Dividendenaktien." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-color)', padding: '0.75rem 0' }}>
        <div className="app-container" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link to="/fair-value" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Fair Value</Link>
          {' / '}
          <span style={{ color: 'var(--text-primary)' }}>Ertragswertverfahren</span>
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
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '6px',
            padding: '0.4rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#f59e0b'
          }}>
            Bewertungsmethode 4 von 4
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.3
          }}>
            Ertragswertverfahren
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Der nachhaltige Wert einer Aktie, basierend auf Eigenkapitalrendite, Gewinnwachstum
            und dem Gordon Growth Model – die Methode für langfristige Investoren
          </p>
        </header>

        {/* Was ist das Ertragswertverfahren */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Was ist das Ertragswertverfahren?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <p style={pStyle}>
                Das <strong style={{ color: 'var(--text-primary)' }}>Ertragswertverfahren</strong> berechnet den
                inneren Wert einer Aktie basierend auf den nachhaltigen Erträgen, die ein Unternehmen erwirtschaften
                kann. Im Kern beantwortet es die Frage: "Was ist ein Unternehmen wert, das dauerhaft einen bestimmten
                Gewinn erzielt und diesen nachhaltig steigern kann?"
              </p>
              <p style={pStyle}>
                Die Methode basiert auf dem <strong style={{ color: 'var(--text-primary)' }}>Gordon Growth Model</strong>
                (auch Dividend Discount Model genannt), entwickelt von Myron J. Gordon und Eli Shapiro in den 1950er Jahren.
                Es ist eines der fundamentalsten Modelle der Finanztheorie und wird weltweit in der Unternehmensbewertung eingesetzt.
              </p>
              <p style={pStyle}>
                Anders als das DCF-Verfahren, das detaillierte Cashflow-Projektionen erfordert, nutzt das Ertragswertverfahren
                vereinfachte Annahmen über nachhaltiges Wachstum – und ist damit robuster gegenüber Prognosefehlern.
              </p>
            </div>
            <div style={{
              background: 'rgba(245, 158, 11, 0.05)',
              borderRadius: '10px',
              padding: '2rem',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Kernkonzepte
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { term: 'ROE (Return on Equity)', desc: 'Eigenkapitalrendite – wie effizient nutzt das Unternehmen sein Eigenkapital?' },
                  { term: 'Retention Rate', desc: 'Thesaurierungsquote – welcher Anteil des Gewinns wird reinvestiert?' },
                  { term: 'Sustainable Growth', desc: 'Nachhaltige Wachstumsrate = ROE × Retention Rate' },
                  { term: 'Cost of Equity', desc: 'Eigenkapitalkosten – die vom Markt geforderte Rendite' },
                ].map((item, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <strong style={{ color: '#f59e0b' }}>{item.term}:</strong> {item.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Die Formel */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Die Formel des Gordon Growth Model</h2>

          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
            borderRadius: '12px',
            padding: '2.5rem',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Gordon Growth Model</p>
            <div style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              marginBottom: '1rem'
            }}>
              Fair Value = EPS × (1 - b) / (r - g)
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Alternativ über nachhaltige Wachstumsrate:
            </p>
            <div style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: '#f59e0b',
              fontFamily: 'monospace'
            }}>
              g = ROE × b
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Wobei g die nachhaltige Wachstumsrate, ROE die Eigenkapitalrendite und b die Thesaurierungsquote ist
            </p>
          </div>

          {/* Variable Explanations */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Die Variablen im Detail
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                variable: 'EPS',
                fullName: 'Gewinn pro Aktie',
                explanation: 'Aktueller Jahresgewinn pro Aktie. Basis für die Bewertung der Ertragskraft des Unternehmens.',
                color: '#3b82f6'
              },
              {
                variable: 'b',
                fullName: 'Thesaurierungsquote (Retention Rate)',
                explanation: 'Anteil des Gewinns, der im Unternehmen reinvestiert wird. b = 1 − Ausschüttungsquote. Ein Unternehmen mit 40% Dividendenquote hat b = 0,60.',
                color: '#10b981'
              },
              {
                variable: 'r',
                fullName: 'Eigenkapitalkosten (Cost of Equity)',
                explanation: 'Die Renditeforderung der Aktionäre, oft via CAPM berechnet: r = risikofreier Zins + Beta × Marktrisikoprämie. Typisch 8-12%.',
                color: '#ef4444'
              },
              {
                variable: 'g',
                fullName: 'Nachhaltige Wachstumsrate',
                explanation: 'g = ROE × b. Gibt an, wie schnell das Unternehmen nachhaltig wachsen kann, ohne neues Kapital aufzunehmen. Muss kleiner als r sein.',
                color: '#f59e0b'
              },
              {
                variable: 'ROE',
                fullName: 'Eigenkapitalrendite (Return on Equity)',
                explanation: 'Jahresüberschuss / Eigenkapital. Misst die Profitabilität des eingesetzten Eigenkapitals. Höherer ROE = effizienteres Unternehmen.',
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
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Herleitung */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Die logische Herleitung</h2>
          <p style={pStyle}>
            Die Idee hinter dem Gordon Growth Model ist elegant: Der Wert einer Aktie entspricht dem Barwert aller
            zukünftigen Ausschüttungen (Dividenden). Wenn diese Ausschüttungen mit einer konstanten Rate g wachsen,
            lässt sich die unendliche Summe zu einer einfachen Formel vereinfachen:
          </p>
          <div style={{
            background: 'var(--background)', borderRadius: '10px', padding: '1.5rem',
            border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '0.95rem',
            color: 'var(--text-primary)', lineHeight: 2
          }}>
            V = D₁/(1+r)¹ + D₂/(1+r)² + D₃/(1+r)³ + ...<br />
            V = D₁/(1+r) + D₁(1+g)/(1+r)² + D₁(1+g)²/(1+r)³ + ...<br />
            <strong>V = D₁ / (r - g)</strong> &nbsp;&nbsp;(geometrische Reihe, falls r &gt; g)
          </div>
          <p style={pStyle}>
            Dabei ist D₁ die erwartete Dividende pro Aktie im nächsten Jahr. Da D₁ = EPS × (1 - b), ergibt sich
            die finale Formel: <strong style={{ color: 'var(--text-primary)' }}>Fair Value = EPS × (1 - b) / (r - g)</strong>.
          </p>
          <p style={pStyle}>
            <strong style={{ color: '#f59e0b' }}>Wichtig:</strong> Die Formel funktioniert nur, wenn die
            Eigenkapitalkosten (r) höher sind als die Wachstumsrate (g). Andernfalls wird der Wert unendlich
            oder negativ – was ökonomisch keinen Sinn ergibt.
          </p>
        </section>

        {/* Beispielrechnung */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Beispielrechnung</h2>
          <p style={pStyle}>
            Betrachten wir einen fiktiven Industriekonzern "IndustrieWert AG":
          </p>

          <div style={{
            background: 'var(--background)', borderRadius: '10px', padding: '1.5rem',
            border: '1px solid var(--border-color)', marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Ausgangsdaten – IndustrieWert AG
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Aktueller Kurs', value: '85,00 €' },
                { label: 'EPS', value: '6,00 €' },
                { label: 'ROE', value: '15%' },
                { label: 'Ausschüttungsquote', value: '40%' },
                { label: 'Eigenkapitalkosten (r)', value: '10%' },
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <h4 style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.75rem' }}>Schritt 1: Thesaurierungsquote (b)</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                b = 1 − Ausschüttungsquote = 1 − 0,40 = <strong>0,60</strong>
              </div>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <h4 style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.75rem' }}>Schritt 2: Nachhaltige Wachstumsrate (g)</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                g = ROE × b = 0,15 × 0,60 = <strong>0,09 (9%)</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                Das Unternehmen kann nachhaltig mit 9% p.a. wachsen, ohne neues Kapital aufzunehmen.
              </p>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <h4 style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.75rem' }}>Schritt 3: Fair Value berechnen</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Dividende = EPS × (1 - b) = 6,00 × 0,40 = 2,40 €<br />
                Fair Value = D / (r - g) = 2,40 / (0,10 - 0,09) = 2,40 / 0,01 = <strong>240,00 €</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Achtung: Da r und g sehr nah beieinander liegen (r - g = 1%), wird der Fair Value sehr hoch.
                Dies zeigt eine Sensitivität des Modells bei kleinen Differenzen.
              </p>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <h4 style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.75rem' }}>Schritt 3b: Mit konservativer Anpassung</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                g (konservativ, gedeckelt auf 6%) = 6%<br />
                Fair Value = 2,40 / (0,10 - 0,06) = 2,40 / 0,04 = <strong>60,00 €</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                BrainyTrader deckelt g automatisch und nutzt historische Durchschnittswerte für robustere Ergebnisse.
              </p>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <h4 style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.75rem' }}>Ergebnis</h4>
              <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                Marktpreis: 85,00 € | Fair Value (konservativ): 60,00 € | <strong style={{ color: '#ef4444' }}>+42% überbewertet</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Sensitivitätsanalyse */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Sensitivität des Modells</h2>
          <p style={pStyle}>
            Das Ertragswertverfahren reagiert sehr sensibel auf kleine Änderungen der Parameter, insbesondere
            wenn die Differenz (r - g) klein ist. Dies ist gleichzeitig eine Stärke (zeigt, wie wichtig präzise
            Annahmen sind) und eine Schwäche (kleine Fehler in den Annahmen führen zu großen Abweichungen im Ergebnis).
          </p>

          <div style={{
            overflowX: 'auto', marginTop: '1.5rem',
            background: 'var(--background)', borderRadius: '10px', padding: '1rem',
            border: '1px solid var(--border-color)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>r - g</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)' }}>Fair Value (D=2,40€)</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)' }}>Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { diff: '1%', fv: '240,00 €', interp: 'Extrem hoher Wert (r und g fast gleich)' },
                  { diff: '2%', fv: '120,00 €', interp: 'Hoher Wert' },
                  { diff: '4%', fv: '60,00 €', interp: 'Moderate Bewertung' },
                  { diff: '6%', fv: '40,00 €', interp: 'Konservative Bewertung' },
                  { diff: '8%', fv: '30,00 €', interp: 'Sehr konservativ' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>{row.diff}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{row.fv}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-secondary)' }}>{row.interp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stärken und Schwächen */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Stärken und Schwächen</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginBottom: '1rem' }}>Stärken</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Theoretisch fundiert (Barwert zukünftiger Cashflows)',
                  'Berücksichtigt nachhaltiges Wachstum statt kurzfristiger Prognosen',
                  'Verbindet Profitabilität (ROE) mit Bewertung',
                  'Ideal für reife, dividendenzahlende Unternehmen',
                  'Einfache Formel mit wenigen Eingabegrößen'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#10b981', flexShrink: 0 }}>+</span> {item}
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
                  'Hohe Sensitivität bei kleiner Differenz (r - g)',
                  'Annahme konstanten Wachstums unrealistisch',
                  'Funktioniert nicht, wenn g > r (Modell bricht zusammen)',
                  'Nicht geeignet für Unternehmen ohne Dividende / negatives EPS',
                  'Eigenkapitalkosten (r) schwer exakt zu bestimmen'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>−</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BrainyTrader Integration */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: '12px', padding: '2.5rem', border: '1px solid rgba(245, 158, 11, 0.2)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            So nutzt BrainyTrader das Ertragswertverfahren
          </h2>
          <p style={pStyle}>
            BrainyTrader berechnet den Ertragswert automatisch mit mehreren Sicherheitsmechanismen: Die Wachstumsrate
            wird auf maximal 2/3 der Eigenkapitalkosten gedeckelt, um unrealistische Bewertungen zu vermeiden.
            Die Gewichtung im Gesamt-Fair-Value ist dynamisch: Weicht der Ertragswert stark vom Median
            aller Modelle ab, wird sein Einfluss automatisch reduziert (Outlier-Dampening) — so wie
            Investmentbanken bei Konsensus-Schätzungen Ausreißer identifizieren und heruntergewichten.
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
              { title: 'PEG-Ratio (Lynch)', link: '/fair-value/lynch', color: '#a855f7' },
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
