/**
 * Homepage – BrainyTrader
 * Modern fintech landing page with AI-native stock valuation showcase
 */

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CompanyAutocomplete } from '@/features/search/CompanyAutocomplete';
import { useHomepageShowcase } from '@/entities/homepage/queries';
import type { HomepageShowcaseItem } from '@/shared/types';

/* ── helpers ───────────────────────────────────────────────── */

const fmt = (v: number | null | undefined, currency?: string) => {
  if (v == null) return '—';
  const sym = currency === 'EUR' ? '€' : '$';
  return `${sym}${v.toFixed(2)}`;
};

const pct = (price: number, fv: number) =>
  (((price - fv) / fv) * 100).toFixed(1);

const signalColor = (price: number, fv: number) =>
  price > fv * 1.05 ? '#ef4444' : price < fv * 0.95 ? '#10b981' : '#f59e0b';

const signalLabel = (price: number, fv: number) =>
  price > fv * 1.05 ? 'Überbewertet' : price < fv * 0.95 ? 'Unterbewertet' : 'Fair bewertet';

const signalBg = (price: number, fv: number) =>
  price > fv * 1.05
    ? 'rgba(239, 68, 68, 0.12)'
    : price < fv * 0.95
      ? 'rgba(16, 185, 129, 0.12)'
      : 'rgba(245, 158, 11, 0.12)';

const heroMethods = (item: HomepageShowcaseItem) => [
  { name: 'DCF', value: item.fairValueDcf, color: '#3b82f6' },
  { name: 'Graham', value: item.fairValueGraham, color: '#10b981' },
  { name: 'Lynch', value: item.fairValueLynch, color: '#a855f7' },
  { name: 'Ertragswert', value: item.fairValueEarningsCap, color: '#f59e0b' },
].filter((m) => m.value != null) as { name: string; value: number; color: string }[];

/* ── component ────────────────────────────────────────────── */

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accountDeleted = searchParams.get('deleted') === 'true';
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);

  const { data: showcase, isLoading: showcaseLoading } = useHomepageShowcase();
  const hero = showcase?.hero;
  const stocks = showcase?.stocks ?? [];

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "BrainyTrader – AI-native Aktienanalyse & Fair Value",
    "description": "KI-gestützte Fair Value Berechnung für Aktien. Erfahre mit wissenschaftlichen Modellen (DCF, Graham, Lynch, Ertragswert), ob eine Aktie über- oder unterbewertet ist.",
    "url": "https://brainytrader.info",
    "inLanguage": "de",
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {accountDeleted && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '1rem',
          textAlign: 'center',
          color: '#10b981',
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

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="hp-hero">
        {/* Animated mesh background */}
        <div className="hp-hero-bg" aria-hidden="true">
          <div className="hp-orb hp-orb--1" />
          <div className="hp-orb hp-orb--2" />
          <div className="hp-orb hp-orb--3" />
          <div className="hp-grid-overlay" />
        </div>

        <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div className="hp-badge">
            <span className="hp-badge-dot" />
            AI-native Aktienanalyse
          </div>

          {/* Headline */}
          <h1 className="hp-headline">
            Investmentbank-Wissen.
            <br />
            <span className="gradient-text">Für alle.</span>
          </h1>

          <p className="hp-subheadline hero-description">
            Unsere KI berechnet den fairen Wert jeder Aktie — mit den gleichen Modellen,
            die Goldman Sachs und Morgan Stanley nutzen. Kostenlos. Für 15.000+ Aktien.
          </p>

          {/* Search — must sit above trust bar + showcase section */}
          <div style={{ maxWidth: '640px', margin: '0 auto 2rem', position: 'relative', zIndex: 1000 }}>
            <CompanyAutocomplete placeholder="Aktie suchen — z.B. Apple, Tesla, SAP …" />
          </div>

          {/* Trust bar */}
          <div className="hp-trust-bar">
            <div className="hp-trust-item">
              <span className="hp-trust-number">15.000+</span>
              <span className="hp-trust-label">Aktien</span>
            </div>
            <div className="hp-trust-divider" />
            <div className="hp-trust-item">
              <span className="hp-trust-number">4</span>
              <span className="hp-trust-label">Fair-Value-Verfahren</span>
            </div>
            <div className="hp-trust-divider" />
            <div className="hp-trust-item">
              <span className="hp-trust-number">KI</span>
              <span className="hp-trust-label">gestützt</span>
            </div>
            <div className="hp-trust-divider" />
            <div className="hp-trust-item">
              <span className="hp-trust-number">100%</span>
              <span className="hp-trust-label">kostenlos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED STOCK SHOWCASE ═══════════════════ */}
      <section className="hp-showcase-section">
        <div className="app-container">
          <p className="hp-section-eyebrow">Live-Beispiel</p>
          <h2 className="hp-section-title">
            Ist Apple gerade über- oder unterbewertet?
          </h2>
          <p className="hp-section-subtitle">
            So sieht eine BrainyTrader-Bewertung aus — in Sekunden, statt in Stunden.
          </p>

          {/* Apple showcase card */}
          {showcaseLoading && (
            <div className="hp-showcase-card" style={{ textAlign: 'center', padding: '3rem', cursor: 'default' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Lade Bewertungsdaten...</div>
            </div>
          )}
          {hero && hero.currentPrice != null && hero.fairValueCombined != null && (
            <div
              className="hp-showcase-card"
              onClick={() => navigate(`/stocks/${hero.ticker}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/stocks/${hero.ticker}`)}
            >
              {/* Header row */}
              <div className="hp-showcase-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {hero.ticker}
                    </span>
                    <span style={{
                      background: signalBg(hero.currentPrice, hero.fairValueCombined),
                      color: signalColor(hero.currentPrice, hero.fairValueCombined),
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      border: `1px solid ${signalColor(hero.currentPrice, hero.fairValueCombined)}33`,
                    }}>
                      {signalLabel(hero.currentPrice, hero.fairValueCombined)} ({pct(hero.currentPrice, hero.fairValueCombined)}%)
                    </span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{hero.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Aktueller Kurs</div>
                  <div style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {fmt(hero.currentPrice, hero.currency)}
                  </div>
                </div>
              </div>

              {/* Visual bar: Price vs Fair Value */}
              <div className="hp-valuation-visual">
                <div className="hp-val-row">
                  <span className="hp-val-label">Fair Value</span>
                  <div className="hp-val-bar-track">
                    <div
                      className="hp-val-bar hp-val-bar--fv"
                      style={{ width: `${(hero.fairValueCombined / hero.currentPrice) * 80}%` }}
                    />
                  </div>
                  <span className="hp-val-amount" style={{ color: '#10b981' }}>
                    {fmt(hero.fairValueCombined, hero.currency)}
                  </span>
                </div>
                <div className="hp-val-row">
                  <span className="hp-val-label">Kurs</span>
                  <div className="hp-val-bar-track">
                    <div className="hp-val-bar hp-val-bar--price" style={{ width: '80%' }} />
                  </div>
                  <span className="hp-val-amount" style={{ color: '#ef4444' }}>
                    {fmt(hero.currentPrice, hero.currency)}
                  </span>
                </div>
              </div>

              {/* Method breakdown */}
              <div className="hp-methods-grid">
                {heroMethods(hero).map((m) => (
                  <div key={m.name} className="hp-method-chip">
                    <div className="hp-method-dot" style={{ background: m.color }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.name}</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                        {fmt(m.value, hero.currency)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hp-showcase-cta">
                Vollständige Analyse ansehen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6.5 3.5L11 8l-4.5 4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ BIG STATEMENT ═══════════════════ */}
      <section className="hp-statement-section">
        <div className="app-container">
          <h2 className="hp-big-statement">
            Privatanleger treffen Entscheidungen
            <br />
            <span style={{ color: 'var(--text-muted)' }}>nach Bauchgefühl.</span>
          </h2>
          <h2 className="hp-big-statement" style={{ marginTop: '0.5rem' }}>
            BrainyTrader-Nutzer
            <br />
            <span className="gradient-text">nach Daten.</span>
          </h2>
        </div>
      </section>

      {/* ═══════════════════ STOCK GRID ═══════════════════ */}
      <section className="hp-grid-section">
        <div className="app-container">
          <p className="hp-section-eyebrow">Entdecken</p>
          <h2 className="hp-section-title">
            Bewertungen auf einen Blick
          </h2>
          <p className="hp-section-subtitle">
            Klick auf eine Aktie und erhalte sofort die vollständige Fair-Value-Analyse.
          </p>

          <div className="hp-stock-grid">
            {stocks.filter((s) => s.currentPrice != null && s.fairValueCombined != null).map((stock) => {
              const price = stock.currentPrice!;
              const fv = stock.fairValueCombined!;
              const color = signalColor(price, fv);
              const label = signalLabel(price, fv);
              const delta = pct(price, fv);
              const isHovered = hoveredTicker === stock.ticker;
              return (
                <Link
                  key={stock.ticker}
                  to={`/stocks/${stock.ticker}`}
                  className="hp-stock-card"
                  onMouseEnter={() => setHoveredTicker(stock.ticker)}
                  onMouseLeave={() => setHoveredTicker(null)}
                  style={{
                    borderColor: isHovered ? `${color}66` : undefined,
                    boxShadow: isHovered ? `0 0 30px ${color}15` : undefined,
                  }}
                >
                  <div className="hp-stock-card-top">
                    <div>
                      <div className="hp-stock-ticker">{stock.ticker}</div>
                      <div className="hp-stock-name">{stock.name}</div>
                    </div>
                    {stock.sector && (
                      <span
                        className="hp-stock-sector"
                        style={{ color, background: `${color}15`, borderColor: `${color}33` }}
                      >
                        {stock.sector}
                      </span>
                    )}
                  </div>

                  <div className="hp-stock-card-bottom">
                    <div>
                      <div className="hp-stock-price-label">Kurs</div>
                      <div className="hp-stock-price">{fmt(price, stock.currency)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="hp-stock-price-label">Fair Value</div>
                      <div className="hp-stock-price" style={{ color: '#10b981' }}>
                        {fmt(fv, stock.currency)}
                      </div>
                    </div>
                  </div>

                  <div className="hp-stock-signal" style={{ color, background: `${color}10` }}>
                    {label} · {Number(delta) > 0 ? '+' : ''}{delta}%
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="hp-how-section">
        <div className="app-container">
          <p className="hp-section-eyebrow">So funktioniert's</p>
          <h2 className="hp-section-title">
            In 10 Sekunden zur Profi-Bewertung
          </h2>

          <div className="hp-steps">
            {[
              {
                step: '01',
                title: 'Aktie eingeben',
                desc: 'Tippe den Namen oder Ticker ein — von Apple bis Zalando.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                    <circle cx="11" cy="11" r="7" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M16 16l4.5 4.5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'KI analysiert',
                desc: '4 Bewertungsmodelle laufen parallel — DCF, Graham, Lynch & Ertragswert.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Ergebnis erhalten',
                desc: 'Fair Value, Über-/Unterbewertung und alle Details auf einen Blick.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                    <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2" />
                  </svg>
                ),
              },
            ].map((s) => (
              <div key={s.step} className="hp-step">
                <div className="hp-step-icon">{s.icon}</div>
                <div className="hp-step-number">{s.step}</div>
                <h3 className="hp-step-title">{s.title}</h3>
                <p className="hp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ METHODS ═══════════════════ */}
      <section className="hp-methods-section">
        <div className="app-container">
          <p className="hp-section-eyebrow">Methoden</p>
          <h2 className="hp-section-title">
            4 Modelle. 1 gewichteter Fair Value.
          </h2>
          <p className="hp-section-subtitle">
            Jedes Modell beleuchtet den Wert aus einem anderen Blickwinkel —
            kombiniert ergibt sich ein fundiertes Gesamtbild.
          </p>

          <div className="hp-methods-cards">
            {[
              { title: 'DCF', sub: 'Discounted Cash Flow', desc: 'Projiziert zukünftige Cashflows und diskontiert sie auf den heutigen Wert.', color: '#3b82f6', link: '/fair-value/dcf' },
              { title: 'Graham', sub: 'Benjamin Graham', desc: 'Die klassische Value-Investing-Formel aus „The Intelligent Investor".', color: '#10b981', link: '/fair-value/graham' },
              { title: 'PEG-Ratio', sub: 'Peter Lynch', desc: 'Bewertet Wachstumsaktien anhand KGV zu Gewinnwachstum.', color: '#a855f7', link: '/fair-value/lynch' },
              { title: 'Ertragswert', sub: 'Gordon Growth', desc: 'Nachhaltiger Wert basierend auf Eigenkapitalrendite und Wachstum.', color: '#f59e0b', link: '/fair-value/ertragswert' },
            ].map((m) => (
              <Link key={m.title} to={m.link} className="hp-method-card" style={{ '--accent': m.color } as React.CSSProperties}>
                <div className="hp-method-card-bar" style={{ background: m.color }} />
                <h3 className="hp-method-card-title">{m.title}</h3>
                <p className="hp-method-card-sub" style={{ color: m.color }}>{m.sub}</p>
                <p className="hp-method-card-desc">{m.desc}</p>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/fair-value" className="hp-text-link">
              Alle Methoden im Detail kennenlernen →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="hp-cta-section">
        <div className="app-container" style={{ textAlign: 'center' }}>
          <h2 className="hp-cta-headline">
            Bereit, zu investieren wie die Profis?
          </h2>
          <p className="hp-cta-sub">
            Kostenlos registrieren. Fair Values berechnen. Smarter anlegen.
          </p>
          <div className="hp-cta-buttons">
            <Link to="/register" className="hp-btn-primary">
              Kostenlos starten
            </Link>
            <Link to="/fair-value" className="hp-btn-secondary">
              Methoden ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ STYLES ═══════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Hero ─────────────────────────── */
        .hp-hero {
          position: relative;
          overflow: visible;
          padding: clamp(4rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem);
          text-align: center;
        }

        .hp-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          border-radius: inherit;
        }

        .hp-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.35;
          animation: hp-float 12s ease-in-out infinite;
        }
        .hp-orb--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
          top: -200px; left: -100px;
          animation-delay: 0s;
        }
        .hp-orb--2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
          top: 50%; right: -150px;
          animation-delay: -4s;
          animation-duration: 15s;
        }
        .hp-orb--3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
          bottom: -150px; left: 40%;
          animation-delay: -8s;
          animation-duration: 18s;
        }

        @keyframes hp-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }

        .hp-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Badge */
        .hp-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(34, 211, 238, 0.08);
          border: 1px solid rgba(34, 211, 238, 0.25);
          border-radius: 999px;
          padding: 0.4rem 1.2rem;
          margin-bottom: 2rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #22d3ee;
          letter-spacing: 0.02em;
        }
        .hp-badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22d3ee;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        /* Headlines */
        .hp-headline {
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
        }

        .hp-subheadline {
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: var(--text-secondary);
          max-width: 680px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }

        /* Trust bar */
        .hp-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }
        .hp-trust-item { text-align: center; }
        .hp-trust-number {
          display: block;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .hp-trust-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .hp-trust-divider {
          width: 1px;
          height: 32px;
          background: var(--border-color);
        }

        /* ── Section helpers ──────────── */
        .hp-section-eyebrow {
          text-align: center;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #3b82f6;
          margin-bottom: 0.75rem;
        }
        .hp-section-title {
          text-align: center;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .hp-section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        /* ── Showcase ─────────────────── */
        .hp-showcase-section {
          position: relative;
          padding: clamp(3rem, 6vw, 5rem) 0;
          background: var(--surface);
        }

        .hp-showcase-card {
          max-width: 720px;
          margin: 0 auto;
          background: var(--background);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .hp-showcase-card:hover {
          border-color: var(--primary-color);
          box-shadow: 0 8px 60px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .hp-showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* Valuation visual bars */
        .hp-valuation-visual {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .hp-val-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .hp-val-label {
          width: 70px;
          font-size: 0.85rem;
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .hp-val-bar-track {
          flex: 1;
          height: 10px;
          background: rgba(255,255,255,0.05);
          border-radius: 999px;
          overflow: hidden;
        }
        .hp-val-bar {
          height: 100%;
          border-radius: 999px;
          transition: width 1s ease-out;
        }
        .hp-val-bar--fv {
          background: linear-gradient(90deg, #10b981, #34d399);
        }
        .hp-val-bar--price {
          background: linear-gradient(90deg, #ef4444, #f87171);
        }
        .hp-val-amount {
          width: 80px;
          text-align: right;
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        /* Methods grid inside showcase */
        .hp-methods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .hp-method-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 0.6rem 0.75rem;
        }
        .hp-method-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .hp-showcase-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--primary-light);
          font-weight: 600;
          font-size: 0.95rem;
        }

        /* ── Big statement ─────────────── */
        .hp-statement-section {
          padding: clamp(4rem, 8vw, 7rem) 0;
          background: var(--background);
          text-align: center;
        }
        .hp-big-statement {
          font-size: clamp(1.75rem, 5vw, 3.25rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: -0.03em;
        }

        /* ── Stock grid ──────────────── */
        .hp-grid-section {
          padding: clamp(3rem, 6vw, 5rem) 0;
          background: var(--surface);
        }

        .hp-stock-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }

        .hp-stock-card {
          display: block;
          text-decoration: none;
          background: var(--background);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          transition: all 0.25s ease;
        }
        .hp-stock-card:hover {
          transform: translateY(-3px);
        }

        .hp-stock-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .hp-stock-ticker {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .hp-stock-name {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .hp-stock-sector {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .hp-stock-card-bottom {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .hp-stock-price-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.15rem;
        }
        .hp-stock-price {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .hp-stock-signal {
          text-align: center;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.35rem;
          border-radius: 8px;
          letter-spacing: 0.01em;
        }

        /* ── How it works ────────────── */
        .hp-how-section {
          padding: clamp(3rem, 6vw, 5rem) 0;
          background: var(--background);
        }
        .hp-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          max-width: 960px;
          margin: 0 auto;
        }
        .hp-step {
          text-align: center;
          padding: 2rem 1.5rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          background: var(--surface);
          transition: all 0.25s ease;
        }
        .hp-step:hover {
          border-color: var(--primary-color);
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.08);
        }
        .hp-step-icon {
          margin-bottom: 1rem;
        }
        .hp-step-number {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-light);
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }
        .hp-step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .hp-step-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ── Methods ─────────────────── */
        .hp-methods-section {
          padding: clamp(3rem, 6vw, 5rem) 0;
          background: var(--surface);
        }
        .hp-methods-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .hp-method-card {
          display: block;
          text-decoration: none;
          background: var(--background);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1.75rem;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .hp-method-card:hover {
          border-color: var(--accent, var(--primary-color));
          transform: translateY(-3px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.3);
        }
        .hp-method-card-bar {
          width: 40px; height: 4px;
          border-radius: 2px;
          margin-bottom: 1.25rem;
        }
        .hp-method-card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .hp-method-card-sub {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .hp-method-card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .hp-text-link {
          color: var(--primary-light);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .hp-text-link:hover {
          color: var(--primary-color);
        }

        /* ── CTA ─────────────────────── */
        .hp-cta-section {
          padding: clamp(4rem, 8vw, 7rem) 0;
          background: var(--background);
          position: relative;
          overflow: hidden;
        }
        .hp-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hp-cta-headline {
          font-size: clamp(1.75rem, 4.5vw, 3rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          position: relative;
        }
        .hp-cta-sub {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          position: relative;
        }
        .hp-cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }

        .hp-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.9rem 2.25rem;
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          background: var(--gradient-primary);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }
        .hp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
        }

        .hp-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.9rem 2.25rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .hp-btn-secondary:hover {
          border-color: var(--primary-color);
          background: rgba(59, 130, 246, 0.05);
        }

        /* ── Responsive ──────────────── */
        @media (max-width: 768px) {
          .hp-methods-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hp-showcase-header {
            flex-direction: column;
          }
          .hp-trust-divider {
            display: none;
          }
          .hp-trust-bar {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hp-methods-grid {
            grid-template-columns: 1fr !important;
          }
          .hp-stock-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
};
