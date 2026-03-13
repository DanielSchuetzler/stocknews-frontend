/**
 * Fair Value Explanation Component
 *
 * Displays a transparent, detailed breakdown of the Fair Value calculation.
 * Shows which models were used, the input data, formulas, and results.
 * Designed to be placed directly below the stock chart.
 */

import { useState } from 'react';
import type { FairValueExplanation as FairValueExplanationType, FairValueDataPoint } from '@/shared/types';

interface FairValueExplanationProps {
  explanation: FairValueExplanationType;
  dataPoints?: FairValueDataPoint[];
  showOnChart?: boolean;
  onToggleChart?: () => void;
}

const formatNumber = (value: number | null | undefined, decimals = 2): string => {
  if (value == null) return '–';
  return value.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const formatCurrency = (value: number | null | undefined, currency: string): string => {
  if (value == null) return '–';
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '\u20AC' : currency;
  return `${formatNumber(value)} ${symbol}`;
};

const formatPercent = (value: number | null | undefined): string => {
  if (value == null) return '–';
  return `${formatNumber(value * 100, 1)}%`;
};

const formatLargeNumber = (value: number | null | undefined): string => {
  if (value == null) return '–';
  const abs = Math.abs(value);
  if (abs >= 1e12) return `${(value / 1e12).toFixed(2)} Bio.`;
  if (abs >= 1e9) return `${(value / 1e9).toFixed(2)} Mrd.`;
  if (abs >= 1e6) return `${(value / 1e6).toFixed(2)} Mio.`;
  return formatNumber(value, 0);
};

export const FairValueExplanation: React.FC<FairValueExplanationProps> = ({ explanation, dataPoints, showOnChart = true, onToggleChart }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const ex = explanation;

  const isUnder = ex.valuationVerdict === 'unter Fair Value gehandelt';
  const isOver = ex.valuationVerdict === '\u00fcber Fair Value gehandelt';
  const verdictColor = isUnder
    ? 'var(--success-color, #10b981)'
    : isOver
      ? 'var(--danger-color, #ef4444)'
      : '#8b5cf6';
  const verdictTextColor = '#fff';

  return (
    <div className="fair-value-explanation-box" style={{
      background: 'var(--surface, #1f2937)',
      borderRadius: '8px',
      border: '1px solid var(--border-color, #374151)',
      marginTop: '20px',
      overflow: 'hidden',
    }}>
      {/* Header - always visible */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsExpanded(!isExpanded); } }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-primary, #f3f4f6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
              Fair Value Analyse
            </h3>
            {onToggleChart && (
              <button
                onClick={(e) => { e.stopPropagation(); onToggleChart(); }}
                title={showOnChart ? 'Fair Value im Chart ausblenden' : 'Fair Value im Chart einblenden'}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color, #374151)',
                  borderRadius: '6px',
                  padding: '0.3rem 0.5rem',
                  cursor: 'pointer',
                  color: showOnChart ? 'var(--text-primary, #f3f4f6)' : 'var(--text-muted, #6b7280)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  opacity: showOnChart ? 1 : 0.5,
                  transition: 'all 0.2s',
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showOnChart ? (
                    <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878l4.242 4.242M21 21l-4.879-4.879" />
                  )}
                </svg>
                Chart
              </button>
            )}
          </div>

          {ex.fairValueCombined != null && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.95rem',
            }}>
              <span style={{ color: 'var(--text-secondary, #9ca3af)' }}>
                Fair Value: <strong style={{ color: 'rgba(139, 92, 246, 1)' }}>{formatCurrency(ex.fairValueCombined, ex.currency)}</strong>
              </span>
              {ex.currentPrice != null && (
                <span style={{ color: 'var(--text-secondary, #9ca3af)' }}>
                  vs. Kurs: <strong>{formatCurrency(ex.currentPrice, ex.currency)}</strong>
                </span>
              )}
              {ex.valuationVerdict && ex.upsidePercent != null && (
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: verdictTextColor,
                  background: verdictColor,
                }}>
                  {ex.valuationVerdict} ({ex.upsidePercent > 0 ? '+' : ''}{ex.upsidePercent}%{isUnder ? ' Potential' : isOver ? ' Risiko' : ''})
                </span>
              )}
            </div>
          )}
        </div>

        <svg
          style={{
            width: '20px', height: '20px',
            color: 'var(--text-secondary, #9ca3af)',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          {/* Input Data Table */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              color: 'var(--text-primary, #f3f4f6)',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Eingabedaten der aktuellen Fair-Value-Berechnung ({new Date().getFullYear()})
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--background, #111827)',
              borderRadius: '6px',
            }}>
              <DataItem label="EPS (trailing)" value={formatCurrency(ex.eps, ex.currency)} />
              <DataItem label="EPS (forward)" value={formatCurrency(ex.forwardEps, ex.currency)} />
              <DataItem label="Buchwert/Aktie" value={formatCurrency(ex.bookValuePerShare, ex.currency)} />
              <DataItem label="Free Cash Flow" value={formatLargeNumber(ex.freeCashFlow)} />
              <DataItem label="Aktien im Umlauf" value={formatLargeNumber(ex.sharesOutstanding)} />
              <DataItem label="Gewinnwachstum" value={formatPercent(ex.earningsGrowthRate)} />
              <DataItem label="Umsatzwachstum" value={formatPercent(ex.revenueGrowthRate)} />
              <DataItem label="Eigenkapitalrendite" value={formatPercent(ex.returnOnEquity)} />
              {ex.latestFiscalYearEnd && (
                <DataItem label="Geschäftsjahresende" value={ex.latestFiscalYearEnd} />
              )}
            </div>
          </div>

          {/* Model Results */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}>
            {/* DCF Model */}
            <ModelCard
              title="DCF (Discounted Cash Flow)"
              weight={ex.weightDcf}
              result={ex.fairValueDcf}
              currency={ex.currency}
              applicable={ex.dcfApplicable}
              note={ex.dcfNote}
            >
              <p style={{ color: 'var(--text-secondary, #9ca3af)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0.5rem 0' }}>
                Projiziert den Free Cash Flow für 5 Jahre in die Zukunft und diskontiert
                alle zukünftigen Zahlungsströme auf den heutigen Wert.
                {ex.grahamSector
                  ? ` Diskontierungssatz und terminales Wachstum sind an die Branche "${ex.grahamSector}" angepasst, um das branchenspezifische Risikoprofil und Wachstumspotenzial widerzuspiegeln.`
                  : ' Es werden die Standard-Parameter (10% Diskontierung, 2,5% terminales Wachstum) verwendet.'}
              </p>
              <FormulaBox formula="Fair Value = (Σ FCF_n / (1+r)^n + TV / (1+r)^5) / Aktien" />
              {ex.dcfApplicable && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted, #6b7280)' }}>
                  <div>Wachstumsrate: {formatPercent(ex.dcfGrowthRate)}</div>
                  <div>
                    Diskontierungssatz (r): {formatPercent(ex.dcfDiscountRate)}
                    {ex.grahamSector && <> — <strong style={{ color: 'rgba(139, 92, 246, 1)' }}>{ex.grahamSector}</strong></>}
                  </div>
                  <div>
                    Terminales Wachstum: {formatPercent(ex.dcfTerminalGrowth)}
                    {ex.grahamSector && <> — <strong style={{ color: 'rgba(139, 92, 246, 1)' }}>{ex.grahamSector}</strong></>}
                  </div>
                  {ex.dcfTerminalValue != null && (
                    <div>Terminal Value: {formatLargeNumber(ex.dcfTerminalValue)}</div>
                  )}
                </div>
              )}
              {dataPoints && dataPoints.some(dp => dp.fairValueDcf != null) && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color, #374151)', paddingTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted, #6b7280)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fair Value pro Geschäftsjahr
                  </div>
                  <table style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-secondary, #9ca3af)', borderCollapse: 'collapse' }}>
                    <tbody>
                      {dataPoints.filter(dp => dp.fairValueDcf != null).map(dp => (
                        <tr key={dp.date}>
                          <td style={{ padding: '0.1rem 0', color: 'var(--text-muted, #6b7280)' }}>GJ {dp.fiscalYear}</td>
                          <td style={{ padding: '0.1rem 0', textAlign: 'right', fontWeight: 500 }}>{formatCurrency(dp.fairValueDcf, ex.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ModelCard>

            {/* Graham Fair Value Model */}
            <ModelCard
              title="Graham Fair Value"
              weight={ex.weightGraham}
              result={ex.fairValueGraham}
              currency={ex.currency}
              applicable={ex.grahamApplicable}
              note={ex.grahamNote}
            >
              <p style={{ color: 'var(--text-secondary, #9ca3af)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0.5rem 0' }}>
                Benjamin Grahams Intrinsic-Value-Formel aus "The Intelligent Investor".
                Bewertet eine Aktie basierend auf dem aktuellen Gewinn und der erwarteten Wachstumsrate.
                {ex.grahamSector
                  ? ` Das Basis-KGV wurde an die Branche "${ex.grahamSector}" angepasst, da verschiedene Branchen unterschiedliche typische Bewertungsmultiplikatoren aufweisen.`
                  : ' Es wird das Standard-KGV von 8,5 (Grahams Original) verwendet, da keine Branche zugewiesen ist.'}
              </p>
              <FormulaBox formula={`Fair Value = EPS × (${ex.grahamBasePE != null ? formatNumber(ex.grahamBasePE, 1).replace('.', ',') : '8,5'} + 2 × g)`} />
              {ex.grahamApplicable && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted, #6b7280)' }}>
                  <div>EPS: {formatCurrency(ex.eps, ex.currency)}</div>
                  <div>Wachstumsrate (g): {formatPercent(ex.earningsGrowthRate)}</div>
                  <div>
                    {ex.grahamBasePE != null ? formatNumber(ex.grahamBasePE, 1) : '8,5'} = Basis-KGV
                    {ex.grahamSector
                      ? <> für Branche <strong style={{ color: 'rgba(139, 92, 246, 1)' }}>{ex.grahamSector}</strong></>
                      : ' bei 0% Wachstum (Grahams Benchmark)'}
                  </div>
                </div>
              )}
              {dataPoints && dataPoints.some(dp => dp.fairValueGraham != null) && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color, #374151)', paddingTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted, #6b7280)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fair Value pro Geschäftsjahr
                  </div>
                  <table style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-secondary, #9ca3af)', borderCollapse: 'collapse' }}>
                    <tbody>
                      {dataPoints.filter(dp => dp.fairValueGraham != null).map(dp => (
                        <tr key={dp.date}>
                          <td style={{ padding: '0.1rem 0', color: 'var(--text-muted, #6b7280)' }}>GJ {dp.fiscalYear}</td>
                          <td style={{ padding: '0.1rem 0', textAlign: 'right', fontWeight: 500 }}>{formatCurrency(dp.fairValueGraham, ex.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ModelCard>

            {/* Lynch Model */}
            <ModelCard
              title="Peter Lynch Fair Value"
              weight={ex.weightLynch}
              result={ex.fairValueLynch}
              currency={ex.currency}
              applicable={ex.lynchApplicable}
              note={ex.lynchNote}
            >
              <p style={{ color: 'var(--text-secondary, #9ca3af)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0.5rem 0' }}>
                Peter Lynchs PEG-basierte Bewertung aus "One Up on Wall Street".
                Ein fair gehandeltes Unternehmen hat ein KGV gleich seiner Wachstumsrate.
                Dieses Modell ist nur bei Wachstumsunternehmen mit mindestens 8% Gewinnwachstum aussagekräftig — bei niedrigerem Wachstum liefert die Formel unrealistisch niedrige Werte.
              </p>
              <FormulaBox formula="Fair Value = EPS × Wachstumsrate (%)" />
              {ex.lynchApplicable && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted, #6b7280)' }}>
                  <div>EPS: {formatCurrency(ex.eps, ex.currency)}</div>
                  <div>Verwendete Wachstumsrate: {formatNumber(ex.lynchGrowthRate, 1)}%</div>
                  <div>PEG = 1 bedeutet fair gehandelt</div>
                </div>
              )}
              {dataPoints && dataPoints.some(dp => dp.fairValueLynch != null) && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color, #374151)', paddingTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted, #6b7280)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fair Value pro Geschäftsjahr
                  </div>
                  <table style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-secondary, #9ca3af)', borderCollapse: 'collapse' }}>
                    <tbody>
                      {dataPoints.filter(dp => dp.fairValueLynch != null).map(dp => (
                        <tr key={dp.date}>
                          <td style={{ padding: '0.1rem 0', color: 'var(--text-muted, #6b7280)' }}>GJ {dp.fiscalYear}</td>
                          <td style={{ padding: '0.1rem 0', textAlign: 'right', fontWeight: 500 }}>{formatCurrency(dp.fairValueLynch, ex.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ModelCard>

            {/* Earnings Capitalization Model */}
            <ModelCard
              title="Gewinnkapitalisierung"
              weight={ex.weightEarningsCap}
              result={ex.fairValueEarningsCap}
              currency={ex.currency}
              applicable={ex.earningsCapApplicable}
              note={ex.earningsCapNote}
            >
              <p style={{ color: 'var(--text-secondary, #9ca3af)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0.5rem 0' }}>
                Gordon-Growth-Modell: Bewertet eine Aktie anhand der nachhaltigen Gewinnwachstumsrate
                und der geforderten Eigenkapitalrendite (Cost of Equity).
              </p>
              <FormulaBox formula="Fair Value = EPS × (1 + g) / (r - g)" />
              {ex.earningsCapApplicable && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted, #6b7280)' }}>
                  <div>EPS: {formatCurrency(ex.eps, ex.currency)}</div>
                  <div>Nachhaltiges Wachstum (g): {formatPercent(ex.earningsCapGrowthRate)}</div>
                  <div>Cost of Equity (r): {formatPercent(ex.earningsCapCostOfEquity)}</div>
                  <div>g = min(Wachstumsrate × 50%, 6%) – konservativ gedämpft</div>
                </div>
              )}
              {dataPoints && dataPoints.some(dp => dp.fairValueEarningsCap != null) && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color, #374151)', paddingTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted, #6b7280)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fair Value pro Geschäftsjahr
                  </div>
                  <table style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-secondary, #9ca3af)', borderCollapse: 'collapse' }}>
                    <tbody>
                      {dataPoints.filter(dp => dp.fairValueEarningsCap != null).map(dp => (
                        <tr key={dp.date}>
                          <td style={{ padding: '0.1rem 0', color: 'var(--text-muted, #6b7280)' }}>GJ {dp.fiscalYear}</td>
                          <td style={{ padding: '0.1rem 0', textAlign: 'right', fontWeight: 500 }}>{formatCurrency(dp.fairValueEarningsCap, ex.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ModelCard>
          </div>

          {/* === Combined Fair Value Result Box === */}
          {ex.modelsUsed > 0 && ex.fairValueCombined != null && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.02))',
              border: '2px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '8px',
            }}>
              {/* Headline */}
              <h4 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'rgba(139, 92, 246, 1)',
              }}>
                Fair Value
              </h4>

              <p style={{
                margin: '0 0 1rem 0',
                fontSize: '0.85rem',
                color: 'var(--text-secondary, #9ca3af)',
                lineHeight: 1.6,
              }}>
                Der Fair Value ist der gewichtete Mittelwert der oben berechneten Bewertungsmodelle.
                {ex.modelsUsed === 4 && ' Alle vier Modelle (DCF, Graham Fair Value, Lynch, Gewinnkapitalisierung) konnten angewendet werden – das gibt die höchste Aussagekraft.'}
                {ex.modelsUsed === 3 && ' Drei von vier Modellen waren anwendbar – eine solide Berechnungsgrundlage.'}
                {ex.modelsUsed === 2 && ' Zwei von vier Modellen waren anwendbar. Je mehr Modelle übereinstimmen, desto belastbarer ist das Ergebnis.'}
                {ex.modelsUsed === 1 && ' Nur ein Modell war anwendbar – das Ergebnis ist daher mit Vorsicht zu interpretieren.'}
              </p>

              {/* Fair Value result row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                    Berechneter Fair Value
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'rgba(139, 92, 246, 1)' }}>
                    {formatCurrency(ex.fairValueCombined, ex.currency)}
                  </div>
                </div>

                {ex.currentPrice != null && (
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                      Aktueller Kurs
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary, #f3f4f6)' }}>
                      {formatCurrency(ex.currentPrice, ex.currency)}
                    </div>
                  </div>
                )}

                {ex.upsidePercent != null && ex.valuationVerdict && (
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                      Bewertung
                    </div>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: verdictTextColor,
                      background: verdictColor,
                    }}>
                      {ex.valuationVerdict} ({ex.upsidePercent > 0 ? '+' : ''}{ex.upsidePercent}%{isUnder ? ' Potential' : isOver ? ' Risiko' : ''})
                    </span>
                  </div>
                )}
              </div>

              {/* Weights breakdown */}
              <div style={{
                padding: '0.75rem 1rem',
                background: 'var(--background, #111827)',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary, #9ca3af)',
                lineHeight: 1.6,
              }}>
                <strong style={{ color: 'var(--text-primary, #f3f4f6)' }}>Gewichtung:</strong>{' '}

                {/* Build a readable formula */}
                {(() => {
                  const parts: string[] = [];
                  if (ex.weightDcf != null && ex.weightDcf > 0 && ex.fairValueDcf != null)
                    parts.push(`DCF (${formatCurrency(ex.fairValueDcf, ex.currency)}) × ${Math.round(ex.weightDcf * 100)}%`);
                  if (ex.weightGraham != null && ex.weightGraham > 0 && ex.fairValueGraham != null)
                    parts.push(`Graham FV (${formatCurrency(ex.fairValueGraham, ex.currency)}) × ${Math.round(ex.weightGraham * 100)}%`);
                  if (ex.weightLynch != null && ex.weightLynch > 0 && ex.fairValueLynch != null)
                    parts.push(`Lynch (${formatCurrency(ex.fairValueLynch, ex.currency)}) × ${Math.round(ex.weightLynch * 100)}%`);
                  if (ex.weightEarningsCap != null && ex.weightEarningsCap > 0 && ex.fairValueEarningsCap != null)
                    parts.push(`Gewinnkap. (${formatCurrency(ex.fairValueEarningsCap, ex.currency)}) × ${Math.round(ex.weightEarningsCap * 100)}%`);
                  return parts.join(' + ');
                })()}

                <br />
                <span style={{ color: 'var(--text-muted, #6b7280)' }}>
                  = <strong style={{ color: 'rgba(139, 92, 246, 1)' }}>{formatCurrency(ex.fairValueCombined, ex.currency)}</strong>
                  {' '}— {ex.modelsUsed} von 4 Modellen anwendbar
                </span>
              </div>

              {/* Combined Fair Value per fiscal year */}
              {dataPoints && dataPoints.some(dp => dp.fairValueCombined != null) && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(139, 92, 246, 0.2)', paddingTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted, #6b7280)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Gewichteter Fair Value pro Geschäftsjahr
                  </div>
                  <table style={{ width: '100%', fontSize: '0.75rem', color: 'var(--text-secondary, #9ca3af)', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color, #374151)' }}>
                        <th style={{ padding: '0.2rem 0', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted, #6b7280)', fontSize: '0.7rem' }}>GJ</th>
                        <th style={{ padding: '0.2rem 0', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted, #6b7280)', fontSize: '0.7rem' }}>DCF</th>
                        <th style={{ padding: '0.2rem 0', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted, #6b7280)', fontSize: '0.7rem' }}>Graham FV</th>
                        <th style={{ padding: '0.2rem 0', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted, #6b7280)', fontSize: '0.7rem' }}>Lynch</th>
                        <th style={{ padding: '0.2rem 0', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted, #6b7280)', fontSize: '0.7rem' }}>Gewinnkap.</th>
                        <th style={{ padding: '0.2rem 0', textAlign: 'right', fontWeight: 700, color: 'rgba(139, 92, 246, 0.9)', fontSize: '0.7rem' }}>Ø Fair Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPoints.filter(dp => dp.fairValueCombined != null).map(dp => (
                        <tr key={dp.date}>
                          <td style={{ padding: '0.15rem 0', color: 'var(--text-muted, #6b7280)' }}>{dp.fiscalYear}</td>
                          <td style={{ padding: '0.15rem 0', textAlign: 'right' }}>{dp.fairValueDcf != null ? formatNumber(dp.fairValueDcf) : '–'}</td>
                          <td style={{ padding: '0.15rem 0', textAlign: 'right' }}>{dp.fairValueGraham != null ? formatNumber(dp.fairValueGraham) : '–'}</td>
                          <td style={{ padding: '0.15rem 0', textAlign: 'right' }}>{dp.fairValueLynch != null ? formatNumber(dp.fairValueLynch) : '–'}</td>
                          <td style={{ padding: '0.15rem 0', textAlign: 'right' }}>{dp.fairValueEarningsCap != null ? formatNumber(dp.fairValueEarningsCap) : '–'}</td>
                          <td style={{ padding: '0.15rem 0', textAlign: 'right', fontWeight: 600, color: 'rgba(139, 92, 246, 1)' }}>{formatCurrency(dp.fairValueCombined, ex.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* No models applicable */}
          {ex.modelsUsed === 0 && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem 1.5rem',
              background: 'var(--background, #111827)',
              borderRadius: '8px',
              border: '1px solid var(--border-color, #374151)',
              fontSize: '0.9rem',
              color: 'var(--text-secondary, #9ca3af)',
            }}>
              <strong style={{ color: 'var(--text-primary, #f3f4f6)' }}>Fair Value nicht berechenbar</strong>
              <p style={{ margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
                Für dieses Unternehmen konnte keines der vier Bewertungsmodelle angewendet werden.
                Das kann an fehlenden Fundamentaldaten, negativem EPS oder negativem Free Cash Flow liegen.
              </p>
            </div>
          )}

          {/* Explanation & Disclaimer */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '6px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary, #9ca3af)',
            lineHeight: 1.6,
          }}>
            <strong style={{ color: 'rgba(139, 92, 246, 1)' }}>Was bedeuten die Bewertungen?</strong>
            <ul style={{ margin: '0.4rem 0 0.6rem 1.2rem', padding: 0 }}>
              <li><strong style={{ color: '#10b981' }}>Unter Fair Value gehandelt:</strong> Der aktuelle Aktienkurs liegt mehr als 10% unter dem berechneten Fair Value — die Aktie wird günstiger gehandelt, als es die Fundamentaldaten nahelegen.</li>
              <li><strong style={{ color: '#ef4444' }}>Über Fair Value gehandelt:</strong> Der Kurs liegt mehr als 10% über dem Fair Value — der Markt preist mehr ein, als die Kennzahlen rechtfertigen.</li>
              <li><strong style={{ color: '#8b5cf6' }}>Fair gehandelt:</strong> Kurs und Fair Value liegen nah beieinander (±10%) — die Aktie wird in etwa zu ihrem inneren Wert gehandelt.</li>
            </ul>
            <strong style={{ color: 'rgba(139, 92, 246, 1)' }}>Hinweis:</strong>{' '}
            Diese Fair-Value-Berechnung basiert auf vereinfachten Bewertungsmodellen und
            öffentlich verfügbaren Finanzdaten. Das Graham-Modell verwendet branchenspezifische
            Basis-KGV-Werte, da verschiedene Sektoren (z.B. Technologie vs. Finanzen) unterschiedliche
            typische Bewertungsniveaus aufweisen. Sie ersetzt keine professionelle Aktienanalyse
            und stellt keine Anlageempfehlung dar.
          </div>

          {/* Data Source Attribution */}
          <div style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--background, #111827)',
            border: '1px solid var(--border-color, #374151)',
            borderRadius: '6px',
            fontSize: '0.75rem',
            color: 'var(--text-muted, #6b7280)',
            lineHeight: 1.7,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <strong style={{ color: 'var(--text-secondary, #9ca3af)', fontSize: '0.8rem' }}>Datenquellen</strong>
            </div>
            <div style={{ marginLeft: '0.25rem' }}>
              <div style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--text-secondary, #9ca3af)' }}>Fundamentaldaten &amp; Aktienkurse:</strong>{' '}
                <a
                  href="https://finance.yahoo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(139, 92, 246, 0.8)', textDecoration: 'underline' }}
                >
                  Yahoo Finance
                </a>{' '}
                — bereitgestellt über die Yahoo Finance API.
              </div>
              <div style={{ marginBottom: '0.35rem' }}>
                Die Daten (EPS, Free Cash Flow, Wachstumsraten, Aktienkurse etc.) werden bei jedem Seitenaufruf
                automatisch abgerufen und zwischengespeichert. Aktienkurse werden alle 6 Stunden, Fair-Value-Berechnungen
                alle 24 Stunden aktualisiert.
              </div>
              <div style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: 'var(--text-secondary, #9ca3af)' }}>Lizenz:</strong>{' '}
                Die Daten unterliegen den{' '}
                <a
                  href="https://legal.yahoo.com/us/en/yahoo/terms/otos/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(139, 92, 246, 0.8)', textDecoration: 'underline' }}
                >
                  Yahoo Terms of Service
                </a>.
                Die Nutzung erfolgt ausschließlich zu informativen Zwecken.
                Alle Daten werden ohne Gewähr bereitgestellt ("as is").
              </div>
              <div>
                <strong style={{ color: 'var(--text-secondary, #9ca3af)' }}>Letzter Abruf:</strong>{' '}
                {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================
// Sub-components
// ========================

const DataItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #6b7280)', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {label}
    </div>
    <div style={{ color: 'var(--text-primary, #f3f4f6)', fontWeight: 600, fontSize: '0.9rem' }}>
      {value}
    </div>
  </div>
);

const FormulaBox: React.FC<{ formula: string }> = ({ formula }) => (
  <div style={{
    padding: '0.5rem 0.75rem',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: 'rgba(147, 197, 253, 1)',
    marginTop: '0.5rem',
  }}>
    {formula}
  </div>
);

const ModelCard: React.FC<{
  title: string;
  weight: number | null;
  result: number | null;
  currency: string;
  applicable: boolean;
  note: string;
  children: React.ReactNode;
}> = ({ title, weight, result, currency, applicable, note, children }) => (
  <div style={{
    padding: '1rem',
    background: 'var(--background, #111827)',
    borderRadius: '6px',
    border: applicable
      ? '1px solid rgba(139, 92, 246, 0.3)'
      : '1px solid var(--border-color, #374151)',
    opacity: applicable ? 1 : 0.7,
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
      <h5 style={{
        margin: 0,
        fontSize: '0.95rem',
        fontWeight: 700,
        color: applicable ? 'rgba(139, 92, 246, 1)' : 'var(--text-secondary, #9ca3af)',
      }}>
        {title}
      </h5>
      {applicable && weight != null && weight > 0 && (
        <span style={{
          fontSize: '0.75rem',
          padding: '0.15rem 0.5rem',
          borderRadius: '4px',
          background: 'rgba(139, 92, 246, 0.15)',
          color: 'rgba(139, 92, 246, 1)',
          fontWeight: 600,
        }}>
          {Math.round(weight * 100)}%
        </span>
      )}
    </div>

    {applicable && result != null && (
      <div style={{
        fontSize: '1.2rem',
        fontWeight: 700,
        color: 'var(--text-primary, #f3f4f6)',
        marginBottom: '0.25rem',
      }}>
        {formatCurrency(result, currency)}
      </div>
    )}

    {!applicable && (
      <div style={{
        fontSize: '0.85rem',
        color: 'var(--text-muted, #6b7280)',
        fontStyle: 'italic',
        marginBottom: '0.5rem',
      }}>
        {note}
      </div>
    )}

    {children}
  </div>
);
