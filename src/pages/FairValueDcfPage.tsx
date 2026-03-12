/**
 * Fair Value DCF Page
 * In-depth educational page about the Discounted Cash Flow method
 * SEO-optimized for: DCF Berechnung Aktie, Discounted Cash Flow Methode, DCF Bewertung
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const FairValueDcfPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Discounted Cash Flow (DCF) – Aktienbewertung mit dem DCF-Verfahren",
    "description": "Umfassende Anleitung zur DCF-Bewertung von Aktien: Formel, Schritt-für-Schritt Berechnung, Terminal Value, WACC und praktische Beispiele. Lerne das wichtigste Bewertungsmodell der Finanzwelt.",
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
      "@id": "https://brainytrader.info/fair-value/dcf"
    },
    "inLanguage": "de",
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-11",
    "keywords": "DCF, Discounted Cash Flow, DCF Berechnung, Aktienbewertung, Fair Value, WACC, Terminal Value, Free Cash Flow, Unternehmensbewertung"
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://brainytrader.info"
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
        "name": "DCF-Verfahren",
        "item": "https://brainytrader.info/fair-value/dcf"
      }
    ]
  };

  /* ---- shared inline-style fragments ---- */
  const sectionStyle: React.CSSProperties = {
    background: 'var(--surface)',
    borderRadius: '12px',
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-md)',
    marginBottom: '2.5rem'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '1.5rem',
    lineHeight: 1.3
  };

  const paragraphStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
    lineHeight: 1.8,
    marginBottom: '1.25rem'
  };

  const formulaBoxStyle: React.CSSProperties = {
    background: 'rgba(59, 130, 246, 0.06)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '10px',
    padding: '1.5rem 2rem',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
    color: 'var(--text-primary)',
    overflowX: 'auto',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
    lineHeight: 1.9
  };

  const variableStyle: React.CSSProperties = {
    background: 'rgba(59, 130, 246, 0.08)',
    padding: '0.15rem 0.5rem',
    borderRadius: '4px',
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#3b82f6'
  };

  const calcStepStyle: React.CSSProperties = {
    background: 'rgba(16, 185, 129, 0.05)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '10px',
    padding: '1.5rem',
    marginBottom: '1.25rem'
  };

  const calcResultStyle: React.CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    background: 'rgba(16, 185, 129, 0.08)',
    padding: '0.75rem 1.25rem',
    borderRadius: '6px',
    color: 'var(--text-primary)',
    fontWeight: 600,
    marginTop: '0.75rem',
    overflowX: 'auto'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Helmet>
        <title>DCF-Verfahren (Discounted Cash Flow) erkl&auml;rt | Aktienbewertung | BrainyTrader</title>
        <meta name="description" content="Lerne das DCF-Verfahren zur Aktienbewertung: Formel, Schritt-f&uuml;r-Schritt Berechnung mit Beispiel, Terminal Value, WACC. Das wichtigste Modell der Unternehmensbewertung verst&auml;ndlich erkl&auml;rt." />
        <meta name="keywords" content="DCF Berechnung Aktie, Discounted Cash Flow Methode, DCF Bewertung, Fair Value berechnen, WACC, Terminal Value, Free Cash Flow, Unternehmensbewertung, Aktienbewertung DCF" />
        <link rel="canonical" href="https://brainytrader.info/fair-value/dcf" />
        <meta property="og:url" content="https://brainytrader.info/fair-value/dcf" />
        <meta property="og:title" content="DCF-Verfahren (Discounted Cash Flow) erkl&auml;rt | BrainyTrader" />
        <meta property="og:description" content="Das DCF-Verfahren ist das wichtigste Modell zur Aktienbewertung. Formel, Berechnung mit konkretem Zahlenbeispiel, Terminal Value und WACC &ndash; alles verst&auml;ndlich erkl&auml;rt." />
        <meta property="og:type" content="article" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Disclaimer Banner */}
      <div style={{
        background: 'rgba(251, 146, 60, 0.08)',
        borderBottom: '1px solid rgba(251, 146, 60, 0.2)',
        padding: '1rem 0'
      }}>
        <div className="app-container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '20px', height: '20px', color: '#f97316', flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p style={{ color: '#ea580c', fontWeight: 500, fontSize: '0.875rem', margin: 0 }}>
            <strong>Wichtiger Hinweis:</strong> Alle Inhalte dienen ausschlie&szlig;lich der Bildung. Keine Anlageberatung.
          </p>
        </div>
      </div>

      <div className="app-container" style={{ padding: '2rem var(--spacing-md) 4rem' }}>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
          <ol style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: '0.9rem',
            flexWrap: 'wrap'
          }}>
            <li>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ color: 'var(--text-muted)' }}>/</li>
            <li>
              <Link to="/fair-value" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Fair Value</Link>
            </li>
            <li style={{ color: 'var(--text-muted)' }}>/</li>
            <li style={{ color: 'var(--primary-color)', fontWeight: 600 }}>DCF-Verfahren</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '999px',
            padding: '0.4rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#3b82f6'
          }}>
            Fair Value Methode
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            lineHeight: 1.2
          }}>
            Discounted Cash Flow (DCF)
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-muted)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Das DCF-Verfahren gilt als das theoretisch fundierteste Bewertungsmodell der Finanzwelt.
            Es berechnet den inneren Wert eines Unternehmens, indem es alle zuk&uuml;nftigen Cashflows
            auf den heutigen Zeitpunkt abzinst. Professionelle Analysten, Investmentbanker und
            Fondsmanager weltweit nutzen dieses Verfahren als zentrales Werkzeug der Unternehmensbewertung.
          </p>
        </header>

        {/* ================================================================
            SECTION 1 - Was ist das DCF-Verfahren?
            ================================================================ */}
        <section style={sectionStyle} id="was-ist-dcf">
          <h2 style={sectionTitleStyle}>Was ist das DCF-Verfahren?</h2>

          <p style={paragraphStyle}>
            Das <strong>Discounted Cash Flow-Verfahren</strong> (abgek&uuml;rzt DCF) ist eine fundamentale Methode
            der Unternehmensbewertung, die auf einem der wichtigsten Prinzipien der Finanztheorie basiert:
            dem <strong>Zeitwert des Geldes</strong> (englisch: Time Value of Money). Dieses Prinzip besagt,
            dass ein Euro heute mehr wert ist als ein Euro in der Zukunft &ndash; und zwar aus drei
            wesentlichen Gr&uuml;nden:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                title: 'Opportunit\u00e4tskosten',
                desc: 'Geld, das du heute besitzt, kann investiert werden und Rendite erwirtschaften. Ein Euro heute kann in einem Jahr beispielsweise 1,08 Euro wert sein, wenn er zu 8\u00A0% angelegt wird.',
                color: '#3b82f6'
              },
              {
                title: 'Inflation',
                desc: 'Die Kaufkraft des Geldes sinkt im Laufe der Zeit. Was du heute f\u00fcr 100\u00A0Euro kaufen kannst, kostet in zehn Jahren voraussichtlich deutlich mehr.',
                color: '#a855f7'
              },
              {
                title: 'Unsicherheit',
                desc: 'Zuk\u00fcnftige Zahlungen sind nie garantiert. Je weiter sie in der Zukunft liegen, desto gr\u00f6\u00dfer ist das Risiko, dass sie nicht oder nicht in voller H\u00f6he eintreffen.',
                color: '#f59e0b'
              }
            ].map((item) => (
              <div key={item.title} style={{
                background: `${item.color}0D`,
                border: `1px solid ${item.color}33`,
                borderRadius: '10px',
                padding: '1.25rem'
              }}>
                <h3 style={{ color: item.color, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={paragraphStyle}>
            Aus diesem Grundprinzip folgt das Konzept des <strong>Barwerts</strong> (Present Value): Um den heutigen
            Wert einer zuk&uuml;nftigen Zahlung zu ermitteln, muss diese mit einem passenden Zinssatz &ndash; dem
            sogenannten <strong>Diskontierungssatz</strong> &ndash; abgezinst werden. Die DCF-Methode wendet dieses
            Prinzip auf ein ganzes Unternehmen an: Sie sch&auml;tzt die zuk&uuml;nftigen freien Cashflows (Free Cash
            Flows), die das Unternehmen erwirtschaften wird, und berechnet deren heutigen Wert.
          </p>

          <p style={paragraphStyle}>
            Die Grundidee l&auml;sst sich so zusammenfassen: <strong>Der faire Wert eines Unternehmens entspricht
            der Summe aller zuk&uuml;nftigen Geldfl&uuml;sse, die es generieren wird &ndash; abgezinst auf ihren
            heutigen Wert.</strong> Dieser Ansatz ist zukunftsorientiert, da er nicht vergangene Gewinne, sondern
            erwartete k&uuml;nftige Cashflows als Ma&szlig;stab verwendet. Genau das macht ihn zum bevorzugten
            Werkzeug f&uuml;r Bewertungen bei &Uuml;bernahmen, B&ouml;rseng&auml;ngen und professionellen
            Aktienanalysen.
          </p>

          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '10px',
            padding: '1.25rem',
            marginTop: '0.5rem'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Merke:</strong> Ein Unternehmen ist genau so viel wert, wie die Summe aller zuk&uuml;nftigen
              Cashflows, die es generiert &ndash; abgezinst auf den heutigen Tag. Das ist der Kern jeder
              DCF-Bewertung.
            </p>
          </div>
        </section>

        {/* ================================================================
            SECTION 2 - Die DCF-Formel
            ================================================================ */}
        <section style={sectionStyle} id="dcf-formel">
          <h2 style={sectionTitleStyle}>Die DCF-Formel</h2>

          <p style={paragraphStyle}>
            Die mathematische Formel des DCF-Verfahrens setzt sich aus zwei Komponenten zusammen: der Summe
            der abgezinsten Cashflows w&auml;hrend der <strong>Prognoseperiode</strong> (typischerweise 5&ndash;10
            Jahre) und dem <strong>Terminal Value</strong> (Endwert), der den Wert aller Cashflows jenseits der
            Prognoseperiode repr&auml;sentiert:
          </p>

          <div style={formulaBoxStyle}>
            <div style={{ marginBottom: '0.5rem', fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}>
              n
            </div>
            <div style={{ fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}>
              Fair Value = &Sigma; &nbsp;FCF<sub>t</sub> / (1 + r)<sup>t</sup> &nbsp;+&nbsp; Terminal Value / (1 + r)<sup>n</sup>
            </div>
            <div style={{ marginTop: '0.25rem', fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}>
              t=1
            </div>
          </div>

          <p style={paragraphStyle}>
            Diese Formel sieht auf den ersten Blick komplex aus, ist aber logisch aufgebaut. Gehen wir die
            einzelnen Variablen systematisch durch:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              {
                variable: 'FCFt',
                name: 'Free Cash Flow im Jahr t',
                explanation: 'Der freie Cashflow ist der Geldbetrag, den ein Unternehmen nach Abzug aller operativen Ausgaben und Investitionen tats\u00e4chlich frei zur Verf\u00fcgung hat. Er berechnet sich als: Operativer Cashflow minus Investitionsausgaben (Capital Expenditures). Der FCF ist die entscheidende Kennzahl, weil er zeigt, wie viel Geld ein Unternehmen an seine Eigent\u00fcmer aussch\u00fctten k\u00f6nnte, ohne das Gesch\u00e4ft zu gef\u00e4hrden.'
              },
              {
                variable: 'r',
                name: 'Diskontierungssatz (WACC)',
                explanation: 'Der Diskontierungssatz repr\u00e4sentiert die geforderte Mindestrendite der Kapitalgeber. In der Praxis wird meist der WACC (Weighted Average Cost of Capital) verwendet \u2013 ein gewichteter Durchschnitt aus Eigen- und Fremdkapitalkosten. Er spiegelt sowohl das Risiko des Unternehmens als auch das allgemeine Zinsniveau wider. Je h\u00f6her der WACC, desto st\u00e4rker werden zuk\u00fcnftige Cashflows abgezinst und desto niedriger f\u00e4llt die Bewertung aus.'
              },
              {
                variable: 't',
                name: 'Zeitperiode (Jahr)',
                explanation: 'Die laufende Nummer des Jahres in der Prognoseperiode. Wenn wir eine 5-Jahres-Prognose erstellen, l\u00e4uft t von 1 bis 5. Der Exponent t bewirkt, dass weiter in der Zukunft liegende Cashflows st\u00e4rker abgezinst werden \u2013 ein Euro in Jahr 5 ist weniger wert als ein Euro in Jahr 1.'
              },
              {
                variable: 'n',
                name: 'L\u00e4nge der Prognoseperiode',
                explanation: 'Die Anzahl der Jahre, f\u00fcr die detaillierte Cashflow-Prognosen erstellt werden. \u00dcblicherweise w\u00e4hlt man 5 bis 10 Jahre. F\u00fcr die Zeit danach greift man auf den Terminal Value zur\u00fcck, da eine detaillierte Prognose \u00fcber einen l\u00e4ngeren Zeitraum zu unsicher w\u00e4re.'
              },
              {
                variable: 'Terminal Value',
                name: 'Endwert (Restwert)',
                explanation: 'Der Terminal Value repr\u00e4sentiert den Wert aller Cashflows, die das Unternehmen nach Ende der Prognoseperiode erwirtschaftet \u2013 also theoretisch bis in die Ewigkeit. In vielen DCF-Bewertungen macht der Terminal Value 60\u201380\u00A0% des gesamten Unternehmenswerts aus. Deshalb ist seine Berechnung besonders kritisch. Zwei g\u00e4ngige Methoden sind das Gordon Growth Model und der Exit-Multiple-Ansatz.'
              }
            ].map((item) => (
              <div key={item.variable} style={{
                background: 'var(--background)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '1.25rem 1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={variableStyle}>{item.variable}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{item.name}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            SECTION 3 - Schritt-f&uuml;r-Schritt Berechnung
            ================================================================ */}
        <section style={sectionStyle} id="berechnung">
          <h2 style={sectionTitleStyle}>Schritt-f&uuml;r-Schritt Berechnung</h2>

          <p style={paragraphStyle}>
            Um das DCF-Verfahren greifbar zu machen, rechnen wir ein vollst&auml;ndiges Beispiel mit einem
            fiktiven Unternehmen &ndash; der <strong>&bdquo;TechVision AG&ldquo;</strong> &ndash; durch. Wir gehen
            dabei von folgenden Ausgangsdaten aus:
          </p>

          <div style={{
            background: 'rgba(168, 85, 247, 0.06)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '10px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#a855f7', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
              Ausgangsdaten der TechVision AG
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {[
                { label: 'Aktueller FCF', value: '5,0 Mrd. EUR' },
                { label: 'Erwartetes FCF-Wachstum (Jahr 1\u20135)', value: '8\u00A0% p.a.' },
                { label: 'WACC (Diskontierungssatz)', value: '10\u00A0%' },
                { label: 'Ewige Wachstumsrate (g)', value: '2,5\u00A0%' },
                { label: 'Prognoseperiode', value: '5 Jahre' },
                { label: 'Ausstehende Aktien', value: '2,0 Mrd. St\u00fcck' }
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'rgba(168, 85, 247, 0.06)',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem'
                }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.05rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 */}
          <div style={calcStepStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                background: '#10b981', color: 'white', width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0
              }}>1</div>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>
                Zuk&uuml;nftige Free Cash Flows prognostizieren
              </h3>
            </div>
            <p style={{ ...paragraphStyle, marginBottom: '1rem' }}>
              Ausgehend vom aktuellen FCF von 5,0&nbsp;Mrd.&nbsp;EUR berechnen wir die FCFs f&uuml;r die n&auml;chsten
              5&nbsp;Jahre mit einer j&auml;hrlichen Wachstumsrate von 8&nbsp;%:
            </p>
            <div style={{
              overflowX: 'auto',
              marginBottom: '0.5rem'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.95rem',
                minWidth: '500px'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>Jahr</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>Berechnung</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>FCF (Mrd. EUR)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: 1, calc: '5,00 \u00d7 1,08', fcf: '5,40' },
                    { year: 2, calc: '5,40 \u00d7 1,08', fcf: '5,83' },
                    { year: 3, calc: '5,83 \u00d7 1,08', fcf: '6,30' },
                    { year: 4, calc: '6,30 \u00d7 1,08', fcf: '6,80' },
                    { year: 5, calc: '6,80 \u00d7 1,08', fcf: '7,35' }
                  ].map((row) => (
                    <tr key={row.year} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Jahr {row.year}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-secondary)', fontFamily: "'Courier New', monospace" }}>{row.calc}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{row.fcf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step 2 */}
          <div style={calcStepStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                background: '#10b981', color: 'white', width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0
              }}>2</div>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>
                Free Cash Flows auf heute abzinsen
              </h3>
            </div>
            <p style={{ ...paragraphStyle, marginBottom: '1rem' }}>
              Jeder zuk&uuml;nftige FCF wird mit dem WACC von 10&nbsp;% auf seinen heutigen Barwert abgezinst.
              Die Formel lautet: <span style={variableStyle}>Barwert = FCF / (1 + r)^t</span>
            </p>
            <div style={{
              overflowX: 'auto',
              marginBottom: '0.5rem'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.95rem',
                minWidth: '600px'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>Jahr</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>FCF (Mrd.)</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>Diskontfaktor</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>Barwert (Mrd.)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: 1, fcf: '5,40', factor: '1 / 1,10\u00b9 = 0,9091', pv: '4,91' },
                    { year: 2, fcf: '5,83', factor: '1 / 1,10\u00b2 = 0,8264', pv: '4,82' },
                    { year: 3, fcf: '6,30', factor: '1 / 1,10\u00b3 = 0,7513', pv: '4,73' },
                    { year: 4, fcf: '6,80', factor: '1 / 1,10\u2074 = 0,6830', pv: '4,64' },
                    { year: 5, fcf: '7,35', factor: '1 / 1,10\u2075 = 0,6209', pv: '4,56' }
                  ].map((row) => (
                    <tr key={row.year} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Jahr {row.year}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-secondary)', fontFamily: "'Courier New', monospace" }}>{row.fcf}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-secondary)', fontFamily: "'Courier New', monospace", fontSize: '0.85rem' }}>{row.factor}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{row.pv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={calcResultStyle}>
              Summe der Barwerte (Prognoseperiode) = 4,91 + 4,82 + 4,73 + 4,64 + 4,56 = <strong>23,66 Mrd. EUR</strong>
            </div>
          </div>

          {/* Step 3 */}
          <div style={calcStepStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                background: '#10b981', color: 'white', width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0
              }}>3</div>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>
                Terminal Value berechnen und abzinsen
              </h3>
            </div>
            <p style={{ ...paragraphStyle, marginBottom: '1rem' }}>
              Der Terminal Value wird mit dem Gordon Growth Model berechnet (Details im n&auml;chsten Abschnitt).
              Wir verwenden den FCF des letzten Prognosejahres (7,35&nbsp;Mrd.), wachsen ihn um die ewige
              Wachstumsrate (2,5&nbsp;%) und teilen durch (WACC &minus; g):
            </p>
            <div style={formulaBoxStyle}>
              <div>TV = FCF<sub>n</sub> &times; (1 + g) / (r &minus; g)</div>
              <div style={{ marginTop: '0.5rem' }}>TV = 7,35 &times; 1,025 / (0,10 &minus; 0,025)</div>
              <div style={{ marginTop: '0.5rem' }}>TV = 7,534 / 0,075</div>
              <div style={{ marginTop: '0.5rem', fontWeight: 700, color: '#3b82f6' }}>TV = 100,45 Mrd. EUR</div>
            </div>
            <p style={{ ...paragraphStyle, marginBottom: '1rem' }}>
              Diesen Terminal Value m&uuml;ssen wir noch auf den heutigen Zeitpunkt abzinsen:
            </p>
            <div style={calcResultStyle}>
              Barwert TV = 100,45 / (1,10)<sup>5</sup> = 100,45 &times; 0,6209 = <strong>62,37 Mrd. EUR</strong>
            </div>
          </div>

          {/* Step 4 */}
          <div style={calcStepStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                background: '#10b981', color: 'white', width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0
              }}>4</div>
              <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>
                Unternehmenswert und fairen Aktienkurs ermitteln
              </h3>
            </div>
            <p style={{ ...paragraphStyle, marginBottom: '1rem' }}>
              Der gesamte Unternehmenswert (Enterprise Value) ergibt sich aus der Summe der abgezinsten FCFs
              und dem abgezinsten Terminal Value. F&uuml;r den fairen Aktienkurs teilen wir durch die Anzahl
              ausstehender Aktien:
            </p>
            <div style={{
              ...formulaBoxStyle,
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div>Enterprise Value = 23,66 + 62,37 = <strong>86,03 Mrd. EUR</strong></div>
              <div style={{ marginTop: '0.75rem', borderTop: '1px dashed rgba(16, 185, 129, 0.3)', paddingTop: '0.75rem' }}>
                Fairer Aktienkurs = 86,03 Mrd. / 2,0 Mrd. Aktien = <strong style={{ color: '#10b981', fontSize: '1.3em' }}>43,02 EUR</strong>
              </div>
            </div>
            <p style={paragraphStyle}>
              <strong>Interpretation:</strong> Laut unserer DCF-Analyse ist die TechVision AG fair mit etwa
              43&nbsp;Euro je Aktie bewertet. Liegt der aktuelle B&ouml;rsenkurs deutlich unter diesem Wert,
              k&ouml;nnte die Aktie unterbewertet sein. Liegt er deutlich dar&uuml;ber, k&ouml;nnte eine
              &Uuml;berbewertung vorliegen. Beachte jedoch, dass die Ergebnisse stark von den gew&auml;hlten
              Annahmen abh&auml;ngen &ndash; insbesondere der Wachstumsrate und dem WACC.
            </p>
          </div>

          {/* Anteil Terminal Value Hinweis */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Beachte:</strong> In unserem Beispiel macht der Terminal Value rund 72,5&nbsp;% des
              gesamten Unternehmenswerts aus (62,37 von 86,03&nbsp;Mrd.). Das ist typisch f&uuml;r
              DCF-Bewertungen und zeigt, wie wichtig die Annahmen f&uuml;r die ewige Wachstumsrate und den
              WACC sind. Kleine &Auml;nderungen an diesen Parametern k&ouml;nnen das Ergebnis erheblich
              ver&auml;ndern.
            </p>
          </div>
        </section>

        {/* ================================================================
            SECTION 4 - Terminal Value berechnen
            ================================================================ */}
        <section style={sectionStyle} id="terminal-value">
          <h2 style={sectionTitleStyle}>Terminal Value berechnen</h2>

          <p style={paragraphStyle}>
            Der <strong>Terminal Value</strong> (auch Endwert oder Restwert genannt) ist einer der wichtigsten
            und gleichzeitig sensibelsten Bestandteile einer DCF-Bewertung. Er repr&auml;sentiert den Wert
            aller Cashflows, die nach der expliziten Prognoseperiode anfallen. Da kein Analyst die
            Cashflows f&uuml;r 20, 30 oder 50 Jahre zuverl&auml;ssig prognostizieren kann, nutzt man
            vereinfachende Annahmen, um diesen Endwert zu berechnen.
          </p>

          <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem', marginTop: '1.5rem' }}>
            Das Gordon Growth Model (Perpetuity Growth Method)
          </h3>

          <p style={paragraphStyle}>
            Das am h&auml;ufigsten verwendete Verfahren zur Berechnung des Terminal Value ist das
            <strong> Gordon Growth Model</strong> (benannt nach dem &Ouml;konomen Myron Gordon). Es geht davon
            aus, dass die Cashflows nach der Prognoseperiode mit einer konstanten Rate &bdquo;g&ldquo; bis in
            die Ewigkeit wachsen. Diese Annahme mag unrealistisch klingen, bildet aber eine solide
            mathematische Grundlage, wenn g konservativ gew&auml;hlt wird.
          </p>

          <div style={formulaBoxStyle}>
            <div style={{ fontWeight: 700, fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)' }}>
              Terminal Value = FCF<sub>n+1</sub> / (r &minus; g)
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'inherit' }}>
              wobei FCF<sub>n+1</sub> = FCF<sub>n</sub> &times; (1 + g)
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--background)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={variableStyle}>g</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Ewige Wachstumsrate (Perpetuity Growth Rate)</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Diese Rate sollte das langfristige, nachhaltige Wachstum des Unternehmens widerspiegeln.
                Als Faustregel gilt: g sollte nicht h&ouml;her sein als das langfristige Wachstum der
                Gesamtwirtschaft (typischerweise 2&ndash;3&nbsp;%). Ein g &uuml;ber 3&nbsp;% w&uuml;rde
                implizieren, dass das Unternehmen langfristig schneller w&auml;chst als die gesamte
                Volkswirtschaft &ndash; was auf Dauer mathematisch unm&ouml;glich ist.
              </p>
            </div>

            <div style={{ background: 'var(--background)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={variableStyle}>r &minus; g</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Spread zwischen WACC und Wachstumsrate</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                Der Nenner (r&nbsp;&minus;&nbsp;g) muss positiv sein, damit die Formel funktioniert. Wenn
                g&nbsp;&ge;&nbsp;r w&auml;re, w&uuml;rde der Terminal Value unendlich gro&szlig; (oder negativ),
                was keinen &ouml;konomischen Sinn ergibt. Je kleiner der Spread (r&nbsp;&minus;&nbsp;g), desto
                h&ouml;her f&auml;llt der Terminal Value aus. Ein WACC von 10&nbsp;% und ein g von 2,5&nbsp;%
                ergeben einen Spread von 7,5&nbsp;%, was als solide gilt.
              </p>
            </div>
          </div>

          <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem', marginTop: '1.5rem' }}>
            Sensitivit&auml;t des Terminal Value
          </h3>

          <p style={paragraphStyle}>
            Um zu veranschaulichen, wie sensitiv der Terminal Value auf die Eingabeparameter reagiert, zeigt
            die folgende Tabelle den Unternehmenswert je Aktie f&uuml;r verschiedene Kombinationen von WACC
            und ewiger Wachstumsrate (bei sonst gleichen Annahmen):
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
              minWidth: '450px'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600 }}>WACC \ g</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>1,5 %</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>2,0 %</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: '#3b82f6', fontWeight: 700 }}>2,5 %</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 600 }}>3,0 %</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { wacc: '8 %', vals: ['64,10', '72,30', '83,20', '98,50'] },
                  { wacc: '9 %', vals: ['49,80', '54,90', '61,40', '69,90'] },
                  { wacc: '10 %', vals: ['39,70', '43,00', '47,10', '52,30'], highlight: true },
                  { wacc: '11 %', vals: ['32,50', '34,80', '37,60', '41,10'] },
                  { wacc: '12 %', vals: ['27,20', '28,80', '30,80', '33,20'] }
                ].map((row) => (
                  <tr key={row.wacc} style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: row.highlight ? 'rgba(59, 130, 246, 0.04)' : 'transparent'
                  }}>
                    <td style={{ padding: '0.75rem', color: 'var(--text-primary)', fontWeight: row.highlight ? 700 : 600 }}>{row.wacc}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} style={{
                        padding: '0.75rem', textAlign: 'right',
                        fontFamily: "'Courier New', monospace",
                        fontWeight: (row.highlight && i === 2) ? 700 : 400,
                        color: (row.highlight && i === 2) ? '#3b82f6' : 'var(--text-secondary)'
                      }}>
                        {v} &euro;
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Erkenntnis:</strong> Bei einem WACC von 8&nbsp;% und g&nbsp;=&nbsp;3&nbsp;% ergibt sich
              ein fairer Kurs von 98,50&nbsp;&euro; &ndash; mehr als das Dreifache des Werts bei
              WACC&nbsp;=&nbsp;12&nbsp;% und g&nbsp;=&nbsp;1,5&nbsp;%. Das zeigt, warum erfahrene Analysten
              stets mit Bandbreiten arbeiten und niemals nur einen einzelnen Punkt-Wert angeben.
            </p>
          </div>
        </section>

        {/* ================================================================
            SECTION 5 - WACC
            ================================================================ */}
        <section style={sectionStyle} id="wacc">
          <h2 style={sectionTitleStyle}>WACC (Weighted Average Cost of Capital)</h2>

          <p style={paragraphStyle}>
            Der <strong>WACC</strong> &ndash; die gewichteten durchschnittlichen Kapitalkosten &ndash; ist der
            Diskontierungssatz, der in der DCF-Bewertung verwendet wird. Er repr&auml;sentiert die Rendite,
            die alle Kapitalgeber (Eigen- und Fremdkapitalgeber) f&uuml;r ihr investiertes Kapital erwarten.
            Der WACC ist somit die &bdquo;H&uuml;rde&ldquo;, die ein Unternehmen &uuml;berspringen muss, um
            Wert f&uuml;r seine Investoren zu schaffen.
          </p>

          <div style={formulaBoxStyle}>
            <div style={{ fontWeight: 700, fontSize: 'clamp(0.9rem, 2vw, 1.15rem)' }}>
              WACC = (E/V) &times; r<sub>E</sub> + (D/V) &times; r<sub>D</sub> &times; (1 &minus; T)
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {[
              { var: 'E/V', label: 'Eigenkapitalanteil', desc: 'Marktwert des Eigenkapitals geteilt durch den Gesamtunternehmenswert (Eigen- + Fremdkapital).' },
              { var: 'D/V', label: 'Fremdkapitalanteil', desc: 'Marktwert des Fremdkapitals geteilt durch den Gesamtunternehmenswert.' },
              { var: 'rE', label: 'Eigenkapitalkosten', desc: 'Die erwartete Rendite der Aktion\u00e4re. Wird h\u00e4ufig \u00fcber das Capital Asset Pricing Model (CAPM) ermittelt: rE = risikofreier Zins + Beta \u00d7 Marktrisiko\u00adpr\u00e4mie.' },
              { var: 'rD', label: 'Fremdkapitalkosten', desc: 'Der durchschnittliche Zinssatz, den das Unternehmen auf seine Schulden zahlt.' },
              { var: 'T', label: 'Steuersatz', desc: 'Der Unternehmenssteuersatz. Fremdkapitalzinsen sind steuerlich absetzbar (Tax Shield), daher wird rD mit (1 \u2212 T) multipliziert.' }
            ].map((item) => (
              <div key={item.var} style={{
                background: 'var(--background)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1rem 1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={variableStyle}>{item.var}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.label}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={paragraphStyle}>
            In der Praxis liegt der WACC f&uuml;r gro&szlig;e, stabile Unternehmen typischerweise zwischen
            7&nbsp;% und 12&nbsp;%. Wachstumsunternehmen und kleinere Firmen haben h&auml;ufig einen h&ouml;heren
            WACC (12&ndash;15&nbsp;%), da sie als risikoreicher gelten. Unternehmen in Schwellenl&auml;ndern
            k&ouml;nnen sogar WACCs von 15&ndash;20&nbsp;% aufweisen.
          </p>

          <div style={{
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '10px',
            padding: '1.25rem'
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              <strong>Praxis-Tipp:</strong> Wenn du den WACC nicht selbst berechnen m&ouml;chtest, kannst du
              als Faustregel 10&nbsp;% f&uuml;r stabile Gro&szlig;unternehmen, 12&nbsp;% f&uuml;r
              Wachstumsunternehmen und 8&nbsp;% f&uuml;r Versorger oder &auml;hnlich defensive Branchen
              verwenden. Es empfiehlt sich jedoch immer, eine Sensitivit&auml;tsanalyse durchzuf&uuml;hren.
            </p>
          </div>
        </section>

        {/* ================================================================
            SECTION 6 - St&auml;rken und Schw&auml;chen
            ================================================================ */}
        <section style={sectionStyle} id="staerken-schwaechen">
          <h2 style={sectionTitleStyle}>St&auml;rken und Schw&auml;chen des DCF-Verfahrens</h2>

          <p style={paragraphStyle}>
            Wie jedes Bewertungsmodell hat auch das DCF-Verfahren seine Vorz&uuml;ge und Grenzen. Ein guter
            Analyst kennt beide Seiten und ber&uuml;cksichtigt sie bei der Interpretation seiner Ergebnisse.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem'
          }}>
            {/* St&auml;rken */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#10b981', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem' }}>
                St&auml;rken
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  {
                    title: 'Theoretisch fundiert',
                    desc: 'Das DCF-Verfahren basiert auf dem soliden Fundament der Finanztheorie. Der Wert eines Assets entspricht dem Barwert seiner zuk\u00fcnftigen Cashflows \u2013 dieses Prinzip ist universell anerkannt.'
                  },
                  {
                    title: 'Zukunftsorientiert',
                    desc: 'Im Gegensatz zu Multiplikator-Methoden (KGV, KBV) blickt DCF nicht in die Vergangenheit, sondern sch\u00e4tzt den zuk\u00fcnftigen Wert. Das ist besonders bei Wachstumsunternehmen relevant.'
                  },
                  {
                    title: 'Unabh\u00e4ngig vom Markt',
                    desc: 'DCF bewertet ein Unternehmen auf Basis seiner eigenen Fundamentaldaten, nicht anhand von Vergleichsunternehmen. Das macht es robust gegen\u00fcber Marktblasen oder -panik.'
                  },
                  {
                    title: 'Flexibel und anpassbar',
                    desc: 'Man kann unterschiedliche Wachstumsszenarien (optimistisch, realistisch, pessimistisch) durchrechnen und so eine Bandbreite fairer Werte ermitteln.'
                  },
                  {
                    title: 'F\u00f6rdert tiefes Verst\u00e4ndnis',
                    desc: 'Wer ein DCF-Modell baut, muss sich intensiv mit dem Gesch\u00e4ftsmodell, den Werttreibern und den Risiken des Unternehmens auseinandersetzen.'
                  }
                ].map((item) => (
                  <li key={item.title} style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.5, flexShrink: 0 }}>+</span>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.title}:</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}> {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schw&auml;chen */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '10px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1rem' }}>
                Schw&auml;chen
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  {
                    title: 'Hohe Sensitivit\u00e4t',
                    desc: 'Kleine \u00c4nderungen an Wachstumsrate, WACC oder Terminal Value k\u00f6nnen den Unternehmenswert um 30\u201350\u00A0% verschieben. Das macht das Ergebnis sehr empfindlich gegen\u00fcber den getroffenen Annahmen.'
                  },
                  {
                    title: 'Prognosen sind unsicher',
                    desc: 'Niemand kann die Zukunft vorhersagen. Cashflow-Prognosen f\u00fcr 5\u201310 Jahre sind zwangsl\u00e4ufig mit gro\u00dfer Unsicherheit behaftet, besonders bei jungen oder zyklischen Unternehmen.'
                  },
                  {
                    title: 'Terminal Value dominiert',
                    desc: 'In den meisten DCF-Modellen macht der Terminal Value 60\u201380\u00A0% des Gesamtwerts aus. Da der Terminal Value auf einer vereinfachten Ewigkeitsannahme basiert, ist dies eine strukturelle Schw\u00e4che.'
                  },
                  {
                    title: 'Schwierig bei Verlustunternehmen',
                    desc: 'Unternehmen ohne positive Cashflows oder mit stark schwankenden Ergebnissen sind kaum sinnvoll mit DCF zu bewerten, da die Cashflow-Prognose auf t\u00f6nernen F\u00fc\u00dfen steht.'
                  },
                  {
                    title: 'Manipulierbar',
                    desc: 'Da das Modell auf vielen Annahmen basiert, kann ein Analyst durch geschickte Wahl der Parameter fast jedes gew\u00fcnschte Ergebnis \u201erechtfertigen\u201c. Objektivit\u00e4t erfordert Disziplin.'
                  }
                ].map((item) => (
                  <li key={item.title} style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.5, flexShrink: 0 }}>&minus;</span>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.title}:</strong>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}> {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 7 - Wann ist DCF sinnvoll?
            ================================================================ */}
        <section style={sectionStyle} id="wann-sinnvoll">
          <h2 style={sectionTitleStyle}>Wann ist DCF sinnvoll?</h2>

          <p style={paragraphStyle}>
            Das DCF-Verfahren ist nicht f&uuml;r jedes Unternehmen gleicherma&szlig;en geeignet. Es entfaltet
            seine St&auml;rken vor allem dann, wenn bestimmte Voraussetzungen erf&uuml;llt sind. Die folgende
            &Uuml;bersicht hilft dir einzusch&auml;tzen, wann DCF besonders gut passt und wann du lieber
            erg&auml;nzende Methoden hinzuziehen solltest.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem'
          }}>
            {/* Gut geeignet */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#10b981', fontWeight: 700, fontSize: '1.05rem', marginBottom: '1rem' }}>
                DCF ist besonders geeignet f&uuml;r:
              </h3>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0 }}>
                <li>Reife, profitable Unternehmen mit stabilen Cashflows</li>
                <li>Unternehmen mit vorhersehbarem Gesch&auml;ftsmodell (z.&nbsp;B. Versorger, Konsumg&uuml;ter)</li>
                <li>Langfristige Investmentanalysen (Buy-and-Hold-Strategie)</li>
                <li>&Uuml;bernahme- und Fusionsbewertungen (M&amp;A)</li>
                <li>Unternehmen in wenig zyklischen Branchen</li>
                <li>Bewertungen, bei denen keine guten Vergleichsunternehmen existieren</li>
              </ul>
            </div>

            {/* Weniger geeignet */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '10px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.05rem', marginBottom: '1rem' }}>
                DCF ist weniger geeignet f&uuml;r:
              </h3>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0 }}>
                <li>Start-ups und Unternehmen ohne positive Cashflows</li>
                <li>Stark zyklische Unternehmen (Rohstoffe, Halbleiter)</li>
                <li>Banken und Versicherungen (spezielle Bewertungsmodelle n&ouml;tig)</li>
                <li>Unternehmen in disruptiven Branchen mit hoher Unsicherheit</li>
                <li>Kurzfristige Trading-Entscheidungen</li>
                <li>Unternehmen mit gro&szlig;en Restrukturierungsprogrammen</li>
              </ul>
            </div>
          </div>

          <p style={{ ...paragraphStyle, marginTop: '1.5rem', marginBottom: 0 }}>
            <strong>Empfehlung:</strong> Kombiniere das DCF-Verfahren immer mit mindestens einem weiteren
            Bewertungsansatz (z.&nbsp;B. der Graham-Formel oder einer Multiplikator-Analyse), um ein
            ausgewogenes Bild zu erhalten. Wenn mehrere Methoden unabh&auml;ngig voneinander zu einem &auml;hnlichen
            fairen Wert kommen, steigt die Zuverl&auml;ssigkeit der Bewertung deutlich.
          </p>
        </section>

        {/* ================================================================
            SECTION 8 - So nutzt BrainyTrader das DCF-Verfahren
            ================================================================ */}
        <section style={{
          ...sectionStyle,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(168, 85, 247, 0.06) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }} id="brainytrader-dcf">
          <h2 style={sectionTitleStyle}>So nutzt BrainyTrader das DCF-Verfahren</h2>

          <p style={paragraphStyle}>
            BrainyTrader wendet das DCF-Verfahren automatisiert auf &uuml;ber 15.000 Aktien weltweit an. Dabei
            werden die aktuellen Finanzkennzahlen jedes Unternehmens herangezogen, um einen fairen Wert je
            Aktie zu berechnen. Folgende Schritte erfolgen dabei automatisch:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {[
              {
                step: '1',
                title: 'Datenerhebung',
                desc: 'Aktuelle Free Cash Flows, Umsatzwachstum, Margen und Kapitalstruktur werden aus Finanzdatenbanken bezogen.'
              },
              {
                step: '2',
                title: 'Cashflow-Prognose',
                desc: 'Basierend auf historischen Wachstumsraten und Branchendurchschnitten werden die zuk\u00fcnftigen FCFs f\u00fcr die n\u00e4chsten Jahre projiziert.'
              },
              {
                step: '3',
                title: 'Diskontierung',
                desc: 'Die prognostizierten Cashflows und der Terminal Value werden mit einem unternehmensspezifischen Diskontierungssatz auf den heutigen Wert abgezinst.'
              },
              {
                step: '4',
                title: 'Fair Value Anzeige',
                desc: 'Der berechnete faire Wert wird auf der Aktien-Detailseite angezeigt und mit dem aktuellen B\u00f6rsenkurs verglichen \u2013 f\u00fcr eine schnelle Einsch\u00e4tzung.'
              }
            ].map((item) => (
              <div key={item.step} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '1.25rem'
              }}>
                <div style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '0.75rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={paragraphStyle}>
            Neben dem DCF-Verfahren setzt BrainyTrader drei weitere Bewertungsmodelle ein &ndash; die
            Graham-Formel, die PEG-Ratio (Peter Lynch) und das Ertragswertverfahren. Alle vier Methoden
            werden zu einem gewichteten Gesamturteil zusammengef&uuml;hrt, damit du auf einen Blick
            erkennen kannst, ob eine Aktie m&ouml;glicherweise unter- oder &uuml;berbewertet ist.
          </p>
        </section>

        {/* ================================================================
            Links to other methods
            ================================================================ */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ ...sectionTitleStyle, textAlign: 'center', marginBottom: '1.5rem' }}>
            Weitere Bewertungsmethoden
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            {[
              {
                title: 'Graham-Formel',
                subtitle: 'Benjamin Graham',
                desc: 'Die klassische Value-Investing-Formel.',
                color: '#10b981',
                link: '/fair-value/graham'
              },
              {
                title: 'PEG-Ratio',
                subtitle: 'Peter Lynch',
                desc: 'Bewertung von Wachstumsaktien.',
                color: '#a855f7',
                link: '/fair-value/lynch'
              },
              {
                title: 'Ertragswert',
                subtitle: 'Gordon Growth Model',
                desc: 'Nachhaltiger Wert basierend auf Eigenkapitalrendite.',
                color: '#f59e0b',
                link: '/fair-value/ertragswert'
              }
            ].map((method) => (
              <Link
                key={method.title}
                to={method.link}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${method.color}33`,
                  borderRadius: '10px',
                  padding: '1.25rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ color: method.color, fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                  {method.title}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  {method.subtitle}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {method.desc}
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <Link
              to="/fair-value"
              style={{
                color: 'var(--primary-color)',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none'
              }}
            >
              Alle Methoden im &Uuml;berblick &rarr;
            </Link>
          </div>
        </section>

        {/* ================================================================
            Disclaimer
            ================================================================ */}
        <section style={{
          background: 'rgba(251, 146, 60, 0.06)',
          border: '1px solid rgba(251, 146, 60, 0.2)',
          borderRadius: '10px',
          padding: '1.5rem 2rem',
          marginBottom: '1rem'
        }}>
          <h3 style={{ color: '#ea580c', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>
            Haftungsausschluss
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
            Die auf dieser Seite dargestellten Inhalte dienen ausschlie&szlig;lich der allgemeinen
            Information und Bildung. Sie stellen keine Anlageberatung, Empfehlung oder Aufforderung zum
            Kauf oder Verkauf von Wertpapieren dar. BrainyTrader &uuml;bernimmt keine Haftung f&uuml;r
            Entscheidungen, die auf Basis dieser Informationen getroffen werden. Jede Investition birgt
            Risiken, einschlie&szlig;lich des m&ouml;glichen Verlusts des eingesetzten Kapitals. Bitte
            konsultiere bei Bedarf einen qualifizierten Finanzberater.
          </p>
        </section>

      </div>
    </div>
  );
};
