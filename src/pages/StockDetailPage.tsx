/**
 * Stock Detail Page
 * EXACT design from original frontend with dark theme
 */

import { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStockData, useFilteredPrices, useFairValue } from '@/entities/stock/queries';
import { useCompany } from '@/entities/company/queries';
import { useNews, useUserNews, useCreateUserNews, useUpdateUserNews, useDeleteUserNews } from '@/entities/news/queries';
import { StockChart } from '@/entities/stock/StockChart';
import { FairValueExplanation } from '@/entities/stock/FairValueExplanation';
import { NewsList } from '@/entities/news/NewsList';
import { FavoriteButton } from '@/features/favorites/FavoriteButton';
import { AddUserNewsModal } from '@/features/news/AddUserNewsModal';
import { useAuth } from '@/shared/hooks/useAuth';
import type { TimeRange } from '@/shared/types';

type NewsType = 'ai' | 'user';

export const StockDetailPage = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState<TimeRange>(3);
  const [newsType, setNewsType] = useState<NewsType>('ai');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<{
    id: number;
    date: string;
    headline: string;
    summary: string;
    sentiment: number;
    source?: string;
    url?: string;
  } | null>(null);
  const [highlightedNewsId, setHighlightedNewsId] = useState<number | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [showNewsOnChart, setShowNewsOnChart] = useState(!isMobile);
  const [showFairValueOnChart, setShowFairValueOnChart] = useState(true);
  const [activeTab, setActiveTab] = useState<'fairvalue' | 'news'>('fairvalue');

  // Fetch data
  const { data: stockData, isLoading: stockLoading, error: stockError } = useStockData(ticker || '');
  const { data: company } = useCompany(ticker || '');
  const { data: aiNewsData = [] } = useNews(ticker || '');
  const { data: userNewsData = [] } = useUserNews(ticker || '', { enabled: isAuthenticated });
  const { data: fairValueData } = useFairValue(ticker || '');

  // Mutations for user news
  const createUserNews = useCreateUserNews();
  const updateUserNews = useUpdateUserNews();
  const deleteUserNews = useDeleteUserNews();

  // Select news based on type
  const newsData = newsType === 'ai' ? aiNewsData : userNewsData;

  // Filter prices by time range
  const filteredPrices = useFilteredPrices(stockData?.prices, timeRange);

  // Get current price (latest price from filtered data)
  const currentPrice = filteredPrices && filteredPrices.length > 0
    ? filteredPrices[filteredPrices.length - 1].close
    : null;

  // Per-year exclusion: For each fiscal year, find the closest stock price and
  // exclude models that deviate >2x or <0.5x from that year's stock price.
  // When ALL models are extreme for a year → use only the closest model (low confidence).
  const correctedFairValueDataPoints = useMemo(() => {
    if (!fairValueData?.dataPoints) return fairValueData?.dataPoints;
    const prices = stockData?.prices;
    if (!prices || prices.length === 0) return fairValueData.dataPoints;

    // Helper: find closest stock price for a given date
    const findClosestPrice = (dateStr: string): number | null => {
      const target = new Date(dateStr).getTime();
      let closest: number | null = null;
      let minDist = Infinity;
      for (const p of prices) {
        const dist = Math.abs(new Date(p.date).getTime() - target);
        if (dist < minDist) { minDist = dist; closest = p.close; }
      }
      return closest;
    };

    return fairValueData.dataPoints.map(dp => {
      const price = findClosestPrice(dp.date);
      if (price == null || price <= 0) return dp;

      const upperBound = price * 2;
      const lowerBound = price * 0.5;

      // Collect available models with their values
      const models: { key: 'dcf' | 'graham' | 'lynch' | 'earningsCap'; value: number }[] = [];
      if (dp.fairValueDcf != null) models.push({ key: 'dcf', value: dp.fairValueDcf });
      if (dp.fairValueGraham != null) models.push({ key: 'graham', value: dp.fairValueGraham });
      if (dp.fairValueLynch != null) models.push({ key: 'lynch', value: dp.fairValueLynch });
      if (dp.fairValueEarningsCap != null) models.push({ key: 'earningsCap', value: dp.fairValueEarningsCap });

      if (models.length === 0) return dp;

      // Check which models are extreme
      const excluded: Record<string, boolean> = { dcf: false, graham: false, lynch: false, earningsCap: false };
      let extremeCount = 0;
      for (const m of models) {
        if (m.value > upperBound || m.value < lowerBound) {
          excluded[m.key] = true;
          extremeCount++;
        }
      }

      let lowConfidence = false;

      if (extremeCount === 0) {
        // No exclusions needed for this year
        return { ...dp, dcfExcluded: false, grahamExcluded: false, lynchExcluded: false, earningsCapExcluded: false, lowConfidence: false, stockPriceAtDate: price };
      }

      if (extremeCount === models.length) {
        // ALL models extreme → use only closest to price (low confidence)
        lowConfidence = true;
        let closestModel = models[0];
        let minDist = Math.abs(models[0].value - price);
        for (let i = 1; i < models.length; i++) {
          const dist = Math.abs(models[i].value - price);
          if (dist < minDist) { minDist = dist; closestModel = models[i]; }
        }
        // Exclude all except closest
        for (const m of models) {
          excluded[m.key] = m.key !== closestModel.key;
        }
      }

      // Recalculate combined from non-excluded models
      const included = models.filter(m => !excluded[m.key]).map(m => m.value);
      const newCombined = included.length > 0
        ? Math.round(included.reduce((a, b) => a + b, 0) / included.length * 100) / 100
        : dp.fairValueCombined;

      return {
        ...dp,
        fairValueCombined: newCombined,
        dcfExcluded: excluded.dcf,
        grahamExcluded: excluded.graham,
        lynchExcluded: excluded.lynch,
        earningsCapExcluded: excluded.earningsCap,
        lowConfidence,
        stockPriceAtDate: price,
      };
    });
  }, [fairValueData, stockData?.prices]);

  // Scroll to news when clicked - scroll page to H1, scroll news item within news box
  const handleNewsClick = useCallback((newsId: number) => {
    // Highlight the clicked news item
    setHighlightedNewsId(newsId);
    setActiveTab('news');

    const newsElement = document.getElementById(`news-${newsId}`);
    const pageHeader = document.querySelector('.stock-page-header');
    const newsSection = document.querySelector('.news-section');

    if (pageHeader) {
      // Scroll page to H1 header with offset for sticky header
      const headerOffset = 100; // Account for sticky navigation header
      const elementPosition = pageHeader.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    }

    if (newsElement && newsSection) {
      // Scroll within news box to the specific news item
      setTimeout(() => {
        const newsSectionRect = newsSection.getBoundingClientRect();
        const newsElementRect = newsElement.getBoundingClientRect();
        const scrollTop = newsSection.scrollTop + (newsElementRect.top - newsSectionRect.top) - (newsSectionRect.height / 2) + (newsElementRect.height / 2);
        newsSection.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }, 100); // Small delay to let page scroll happen first
    }
  }, []);

  // Handle add/update user news
  const handleAddUserNews = async (data: {
    date: string;
    headline: string;
    summary: string;
    sentiment: number;
    source?: string;
    url?: string;
  }) => {
    try {
      if (editingNews) {
        // Update existing news
        await updateUserNews.mutateAsync({
          id: editingNews.id,
          data: {
            ticker: ticker || '',
            newsDate: data.date,
            headline: data.headline,
            summary: data.summary,
            sentiment: data.sentiment, // Send as number (0 or 1) to match backend
            source: data.source,
            url: data.url
          }
        });
      } else {
        // Create new news (backend automatically adds to favorites)
        await createUserNews.mutateAsync({
          ticker: ticker || '',
          newsDate: data.date,
          headline: data.headline,
          summary: data.summary,
          sentiment: data.sentiment, // Send as number (0 or 1) to match backend
          source: data.source,
          url: data.url
        });

        // Switch to user news to see the new entry
        setNewsType('user');
      }
      setIsAddModalOpen(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Failed to save user news:', error);
      alert(editingNews ? 'Fehler beim Aktualisieren der News' : 'Fehler beim Hinzufügen der News');
    }
  };

  // Handle edit user news
  const handleEditUserNews = (newsId: number) => {
    const news = userNewsData.find(n => n.id === newsId);
    if (news) {
      // Convert newsDate to YYYY-MM-DD format if needed
      let dateString = news.newsDate;
      if (dateString.includes('T')) {
        dateString = dateString.split('T')[0];
      }

      setEditingNews({
        id: news.id,
        date: dateString,
        headline: news.headline,
        summary: news.summary,
        sentiment: news.sentiment,
        source: news.source,
        url: news.url
      });
      setIsAddModalOpen(true);
    }
  };

  // Handle delete user news
  const handleDeleteUserNews = async (newsId: number) => {
    if (window.confirm('Möchtest du diese News wirklich löschen?')) {
      try {
        await deleteUserNews.mutateAsync(newsId);
      } catch (error) {
        console.error('Failed to delete user news:', error);
        alert('Fehler beim Löschen der News');
      }
    }
  };

  // Loading state
  if (stockLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{
            width: '64px',
            height: '64px',
            border: '4px solid var(--surface-light)',
            borderTop: '4px solid var(--primary-color)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Lade Daten...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (stockError || !stockData) {
    return (
      <div className="app-container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Aktie nicht gefunden
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Die Aktie mit dem Ticker "{ticker}" konnte nicht geladen werden.
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Zurück zur Startseite
        </button>
      </div>
    );
  }

  const companyName = company?.name || stockData.name || ticker;
  const latestPrice = stockData.prices[stockData.prices.length - 1].close.toFixed(2);
  const currencySymbol = stockData.currency === 'USD' ? '$' : stockData.currency === 'EUR' ? '€' : stockData.currency;
  const exchange = company?.exchange || stockData.exchange || '';

  // SEO: Catchy Meta-Texte mit echten Fair Value Zahlen
  const fairValue = fairValueData?.explanation?.fairValueCombined;
  const fairValuePrice = fairValueData?.explanation?.currentPrice;
  const verdict = fairValueData?.explanation?.valuationVerdict;
  const upsidePercent = fairValueData?.explanation?.upsidePercent;

  // Dynamic catchy description – "Fair Value" immer am Anfang für SEO-Ranking
  let metaDescription: string;
  if (fairValue && fairValuePrice && verdict && upsidePercent !== null && upsidePercent !== undefined) {
    const fvFormatted = fairValue.toFixed(2);
    const priceFormatted = fairValuePrice.toFixed(2);
    const absUpside = Math.abs(upsidePercent).toFixed(0);
    if (verdict.includes('unter')) {
      metaDescription = `Fair Value ${companyName} (${ticker}): ${fvFormatted} ${currencySymbol} – aktueller Kurs nur ${priceFormatted} ${currencySymbol}. ${absUpside}% unterbewertet laut KI-Analyse! Jetzt kostenlos prüfen auf BrainyTrader.`;
    } else if (verdict.includes('über')) {
      metaDescription = `Fair Value ${companyName} (${ticker}): ${fvFormatted} ${currencySymbol} – Kurs ${priceFormatted} ${currencySymbol} liegt ${absUpside}% über dem fairen Wert. KI-gestützte Analyse auf BrainyTrader.`;
    } else {
      metaDescription = `Fair Value ${companyName} (${ticker}): ${fvFormatted} ${currencySymbol} – Kurs ${priceFormatted} ${currencySymbol}. Aktie ist fair bewertet. KI-Analyse mit DCF, Graham & mehr auf BrainyTrader.`;
    }
  } else {
    metaDescription = `Fair Value ${companyName} (${ticker}): Aktueller Kurs ${latestPrice} ${currencySymbol} – über- oder unterbewertet? KI-gestützte Analyse mit 4 Modellen. Kostenlos auf BrainyTrader.`;
  }

  // Title: "Fair Value" vorne für SEO-Ranking bei "[Company] Fair Value" Suchen
  const pageTitle = `${companyName} (${ticker}) Fair Value – KI-Aktienanalyse | BrainyTrader`;
  const ogTitle = `${companyName} Fair Value – Über- oder unterbewertet? | BrainyTrader`;
  const ogDescription = fairValue && fairValuePrice
    ? `Fair Value ${companyName}: ${fairValue.toFixed(2)} ${currencySymbol} vs. Kurs ${fairValuePrice.toFixed(2)} ${currencySymbol}. KI-Bewertung mit DCF, Graham, Lynch & Ertragswert – kostenlos auf BrainyTrader.`
    : `Fair Value ${companyName} – über- oder unterbewertet? KI-gestützte Analyse mit 4 wissenschaftlichen Modellen. Kostenlos auf BrainyTrader.`;
  const canonicalUrl = `https://brainytrader.info/stocks/${ticker}`;

  // JSON-LD: Strukturierte Daten für die Stock-Seite
  const stockJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${companyName} (${ticker}) Fair Value – KI-Aktienanalyse`,
    "description": metaDescription,
    "url": canonicalUrl,
    "inLanguage": "de",
    "dateModified": new Date().toISOString().split('T')[0],
    "publisher": {
      "@type": "Organization",
      "name": "BrainyTrader",
      "url": "https://brainytrader.info",
      "logo": "https://brainytrader.info/logo.png"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "BrainyTrader",
      "url": "https://brainytrader.info"
    },
    "about": {
      "@type": "Corporation",
      "name": companyName,
      "tickerSymbol": ticker,
      "exchange": exchange || undefined,
      "url": canonicalUrl
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "BrainyTrader",
          "item": "https://brainytrader.info"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `${companyName} (${ticker})`,
          "item": canonicalUrl
        }
      ]
    }
  };

  // Add FAQPage schema for rich snippets in Google
  const faqJsonLd = fairValue && fairValuePrice ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Was ist der Fair Value von ${companyName} (${ticker})?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Der KI-berechnete Fair Value von ${companyName} (${ticker}) liegt bei ${fairValue.toFixed(2)} ${currencySymbol}. Der aktuelle Kurs beträgt ${fairValuePrice.toFixed(2)} ${currencySymbol}. Die Aktie wird laut BrainyTrader als ${verdict || 'bewertet'} eingestuft.`
        }
      },
      {
        "@type": "Question",
        "name": `Ist ${companyName} (${ticker}) über- oder unterbewertet?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${companyName} wird aktuell ${verdict || 'bewertet'}. ${upsidePercent !== null && upsidePercent !== undefined ? (upsidePercent > 0 ? `Es besteht ein Upside-Potenzial von ${Math.abs(upsidePercent).toFixed(0)}%.` : `Die Aktie liegt ${Math.abs(upsidePercent).toFixed(0)}% über dem fairen Wert.`) : ''} BrainyTrader nutzt 4 Modelle: DCF, Graham, Lynch und Ertragswert.`
        }
      }
    ]
  } : null;

  // Valuation indicator JSX (shared between mobile header and desktop tab panel)
  const valuationIndicatorJsx = currentPrice != null ? (() => {
    const hasFV = fairValueData?.explanation?.fairValueCombined != null;
    const fv = hasFV ? fairValueData!.explanation.fairValueCombined! : null;
    const fvVerdict = fairValueData?.explanation?.valuationVerdict;
    const upside = fairValueData?.explanation?.upsidePercent;
    const isUnder = fvVerdict?.includes('unter Fair Value');
    const isOver = fvVerdict?.includes('über Fair Value');
    const isExtremeDeviation = fvVerdict?.includes('Datenqualität prüfen');
    const isFair = !isUnder && !isOver;
    const accentColor = isExtremeDeviation ? '#f59e0b' : isUnder ? '#10b981' : isOver ? '#ef4444' : '#8b5cf6';
    const accentRgb = isExtremeDeviation ? '245,158,11' : isUnder ? '16,185,129' : isOver ? '239,68,68' : '139,92,246';
    const currSym = stockData.currency === 'USD' ? '$' : stockData.currency;

    if (!hasFV) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '0.75rem 1.25rem',
          background: 'var(--surface)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Aktueller Kurs:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>
              {currentPrice.toFixed(2)} {currSym}
            </span>
          </div>
        </div>
      );
    }

    const absUpside = upside != null ? Math.abs(upside) : 0;
    const fvFormatted = `${fv!.toFixed(2)} ${currSym}`;
    const priceFormatted = `${currentPrice.toFixed(2)} ${currSym}`;
    const isLowConf = fairValueData?.explanation?.lowConfidence;

    // Bold numbers for seoText
    const b = (txt: string, color?: string) => (
      <strong style={{ fontWeight: 700, color: color || 'var(--text-primary)' }}>{txt}</strong>
    );
    let seoTextJsx: React.ReactNode;
    if (isUnder && isExtremeDeviation) {
      seoTextJsx = <>{companyName} wird deutlich unter dem berechneten Fair Value von {b(fvFormatted, accentColor)} gehandelt. Beim aktuellen Kurs von {b(priceFormatted)} ergibt sich ein rechnerisches Kurspotential von {b(`${absUpside}%`, accentColor)}.</>;
    } else if (isOver && isExtremeDeviation) {
      seoTextJsx = <>{companyName} wird deutlich über dem berechneten Fair Value von {b(fvFormatted, accentColor)} gehandelt. Beim aktuellen Kurs von {b(priceFormatted)} besteht ein rechnerisches Kursrückfallrisiko von {b(`${absUpside}%`, accentColor)}.</>;
    } else if (isUnder) {
      seoTextJsx = <>{companyName} wird unter Fair Value gehandelt. Beim aktuellen Kurs von {b(priceFormatted)} ergibt sich ein Kurspotential von {b(`${absUpside}%`, accentColor)} zum berechneten Fair Value von {b(fvFormatted, accentColor)}.</>;
    } else if (isOver) {
      seoTextJsx = <>{companyName} wird über Fair Value gehandelt. Beim aktuellen Kurs von {b(priceFormatted)} besteht ein Kursrückfallrisiko von {b(`${absUpside}%`, accentColor)} zum berechneten Fair Value von {b(fvFormatted, accentColor)}.</>;
    } else {
      seoTextJsx = <>{companyName} wird nahe dem berechneten Fair Value von {b(fvFormatted, accentColor)} gehandelt. Der aktuelle Kurs von {b(priceFormatted)} weicht nur {b(`${absUpside}%`, accentColor)} ab — die Aktie erscheint fair bewertet.</>;
    }

    return (
      <div className="valuation-indicator" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '0.5rem 1rem',
        background: `linear-gradient(135deg, rgba(${accentRgb}, 0.06), rgba(${accentRgb}, 0.02))`,
        borderRadius: '12px',
        border: `1px solid rgba(${accentRgb}, 0.2)`,
        flexShrink: 0,
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ textAlign: 'center', minWidth: '65px' }}>
            <div className="vi-label" style={{ fontSize: '0.6rem', color: 'var(--text-muted, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.1rem' }}>Kurs</div>
            <div className="vi-value" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary, #f3f4f6)' }}>{currentPrice.toFixed(2)}</div>
            <div className="vi-currency" style={{ fontSize: '0.6rem', color: 'var(--text-muted, #6b7280)' }}>{currSym}</div>
          </div>
          <div className="vi-arrow-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0.6rem', minWidth: '70px', flex: '0 1 auto' }}>
            <div className="vi-pill" style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, color: isFair ? '#111827' : '#fff', background: accentColor, whiteSpace: 'nowrap', marginBottom: '0.25rem', lineHeight: 1.4 }}>
              {upside != null && (upside > 0 ? '+' : '')}{upside}%
            </div>
            <div style={{ width: '100%', height: '2px', background: `linear-gradient(90deg, var(--text-muted, #6b7280), ${accentColor})`, position: 'relative', borderRadius: '1px' }}>
              <div style={{ position: 'absolute', left: '-2px', top: '-2px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted, #6b7280)' }} />
              <div style={{ position: 'absolute', right: '-1px', top: '-3px', width: '0', height: '0', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${accentColor}` }} />
            </div>
          </div>
          <div style={{ textAlign: 'center', minWidth: '65px' }}>
            <div className="vi-label" style={{ fontSize: '0.6rem', color: isLowConf ? 'rgba(245, 158, 11, 0.8)' : 'var(--text-muted, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.1rem' }}>
              {isLowConf ? 'Fair Value ~' : 'Fair Value'}
            </div>
            <div className="vi-value" style={{ fontSize: '1.05rem', fontWeight: 700, color: accentColor }}>{fv!.toFixed(2)}</div>
            <div className="vi-currency" style={{ fontSize: '0.6rem', color: 'var(--text-muted, #6b7280)' }}>{currSym}</div>
          </div>
        </div>
        <p className="valuation-seo-text" style={{ margin: '0.4rem 0 0 0', fontSize: '0.7rem', color: 'var(--text-secondary, #9ca3af)', lineHeight: 1.5, textAlign: 'center', maxWidth: '380px' }}>
          {seoTextJsx}
          {isLowConf && <span style={{ display: 'block', marginTop: '0.2rem', color: 'rgba(245, 158, 11, 0.8)', fontSize: '0.72rem' }}>Eingeschränkte Konfidenz — alle Modelle weichen stark vom Kurs ab.</span>}
          {isExtremeDeviation && !isLowConf && <span style={{ display: 'block', marginTop: '0.2rem', color: 'rgba(245, 158, 11, 0.8)', fontSize: '0.72rem' }}>Hohe Abweichung vom Marktpreis — Datenqualität und Modelleignung prüfen.</span>}
        </p>
      </div>
    );
  })() : null;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="BrainyTrader" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content="https://brainytrader.info/og-image.png" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content="https://brainytrader.info/og-image.png" />

        {/* Structured Data  */}
        <script type="application/ld+json">{JSON.stringify(stockJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      {/* Container - Max 1400px like original */}
      <div className="app-container stock-detail-page" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Header: Company Name + Stock Info + Favorite Button - all inline */}
        <div className="stock-page-header" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'nowrap',
        }}>
          {/* Company Name + Favorite Button inline */}
          <div className="company-name-row" style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.75rem',
            minWidth: 0,
            flexShrink: 1,
          }}>
            <h1 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
              whiteSpace: 'normal',
              lineHeight: 1.2,
              minWidth: 0,
            }}>
              {companyName}
            </h1>
            <div className="favorite-desktop" style={{ fontSize: '0.75rem', flexShrink: 0 }}>
              <FavoriteButton ticker={ticker || ''} />
            </div>
          </div>

          {/* Stock Info - Horizontal Compact */}
          <div className="stock-info-box" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--surface)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '0.875rem',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Ticker:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                {stockData.ticker}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Währung:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                {stockData.currency}
              </span>
            </div>
            {company?.sectorDisplayName && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Branche:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                  {company.sectorDisplayName}
                </span>
              </div>
            )}
          </div>

          {/* Valuation Indicator — mobile: in header; desktop: in Fair Value tab */}
          <div className="valuation-header-wrapper">
            {valuationIndicatorJsx}
          </div>

          {/* Favorite Button - mobile only (desktop version is next to company name) */}
          <div className="favorite-mobile" style={{ marginLeft: 'auto' }}>
            <FavoriteButton ticker={ticker || ''} />
          </div>
        </div>

        {/* Main Content - Grid Layout: Chart left, Tab Panel right (on desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px',
          marginTop: '20px'
        }} className="main-content-wrapper">
          {/* Chart Section */}
          <div className="chart-section card">
            {/* Chart Header with Title and Time Range Selector */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <h2 style={{
                color: 'var(--text-primary)',
                margin: 0,
                flex: '1',
                fontSize: '1.5rem',
                lineHeight: '1.4',
                textAlign: 'center'
              }}>
                {companyName}
                <span style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  opacity: 0.85
                }}>
                  Kursverlauf mit Fair Value & News-Events
                </span>
              </h2>

              {/* Time Range Selector - Exact original design */}
              <div style={{
                display: 'flex',
                gap: '8px',
                background: 'var(--background)',
                padding: '4px',
                borderRadius: '8px',
                flexShrink: 0
              }}>
                {([1, 3, 5, 10] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '6px',
                      background: timeRange === range ? 'var(--primary-color)' : 'transparent',
                      color: timeRange === range ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (timeRange !== range) {
                        e.currentTarget.style.background = 'var(--surface-light)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (timeRange !== range) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    {range} Jahr{typeof range === 'number' && range > 1 ? 'e' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Container - Exact original styling */}
            <div style={{
              position: 'relative',
              height: '400px',
              background: 'var(--background)',
              padding: '20px',
              borderRadius: '8px',
              cursor: 'grab'
            }}>
              <StockChart
                prices={filteredPrices}
                news={newsData}
                currency={stockData.currency}
                onNewsClick={handleNewsClick}
                highlightedNewsId={highlightedNewsId}
                fairValueData={correctedFairValueDataPoints}
                showNews={showNewsOnChart}
                showFairValue={showFairValueOnChart}
              />
            </div>

            {/* Stock price data source attribution + disclaimer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.35rem 0.5rem 0',
              fontSize: '0.65rem',
              color: 'var(--text-muted, #6b7280)',
              opacity: 0.7,
              flexWrap: 'wrap',
              gap: '0.25rem',
            }}>
              <span>
                Keine Anlageberatung, nur zum Zwecke der Information!{' '}
                <a
                  href="#hinweise"
                  style={{ color: 'var(--text-muted, #6b7280)', textDecoration: 'underline' }}
                >
                  Siehe Hinweise
                </a>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>Kursdaten:</span>
                <a
                  href="https://finance.yahoo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(139, 92, 246, 0.7)', textDecoration: 'none' }}
                >
                  Yahoo Finance
                </a>
                <span>·</span>
                <span>Abruf: {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
              </span>
            </div>

            {/* Fair Value Explanation - always below chart */}
            {fairValueData?.explanation && (
              <FairValueExplanation
                explanation={fairValueData.explanation}
                dataPoints={correctedFairValueDataPoints || fairValueData.dataPoints}
                showOnChart={showFairValueOnChart}
                onToggleChart={() => setShowFairValueOnChart(v => !v)}
              />
            )}

          </div>

          {/* Right Panel: Tab Panel with Fair Value and News (desktop) */}
          <div className="right-panel card" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>

            {/* Tab Buttons - large modern segmented control */}
            <div className="right-panel-tabs" style={{
              display: 'flex',
              background: 'var(--background)',
              borderRadius: '12px',
              padding: '5px',
              marginBottom: '1.5rem',
              gap: '5px',
            }}>
              <button
                onClick={() => setActiveTab('fairvalue')}
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '9px',
                  background: activeTab === 'fairvalue'
                    ? 'linear-gradient(135deg, var(--primary-color), #7c3aed)'
                    : 'transparent',
                  color: activeTab === 'fairvalue' ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: activeTab === 'fairvalue' ? '0 2px 12px rgba(139,92,246,0.35)' : 'none',
                  letterSpacing: '0.01em',
                }}
              >
                Fair Value
              </button>
              <button
                onClick={() => setActiveTab('news')}
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '9px',
                  background: activeTab === 'news'
                    ? 'linear-gradient(135deg, var(--primary-color), #7c3aed)'
                    : 'transparent',
                  color: activeTab === 'news' ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: activeTab === 'news' ? '0 2px 12px rgba(139,92,246,0.35)' : 'none',
                  letterSpacing: '0.01em',
                }}
              >
                News & Events
              </button>
            </div>

            {/* Tab Content: Fair Value */}
            <div className="tab-content-fairvalue" style={{ display: activeTab === 'fairvalue' ? 'block' : 'none' }}>
              {valuationIndicatorJsx ?? (
                <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 1rem' }}>
                  Keine Fair Value Daten verfügbar
                </div>
              )}
            </div>

            {/* Tab Content: News & Events */}
            <div className="tab-content-news" style={{ display: activeTab === 'news' ? 'block' : 'none' }}>
              <div className="news-section" style={{ flex: 1, overflowY: 'auto' }}>
                {/* Header with News Type Toggle and Add Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>
                      News & Events
                    </h2>
                    <button
                      onClick={() => setShowNewsOnChart(v => !v)}
                      title={showNewsOnChart ? 'News im Chart ausblenden' : 'News im Chart einblenden'}
                      style={{
                        background: 'none',
                        border: '1px solid var(--border-color, #374151)',
                        borderRadius: '6px',
                        padding: '0.3rem 0.5rem',
                        cursor: 'pointer',
                        color: showNewsOnChart ? 'var(--text-primary, #f3f4f6)' : 'var(--text-muted, #6b7280)',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        opacity: showNewsOnChart ? 1 : 0.5,
                        transition: 'all 0.2s',
                      }}
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showNewsOnChart ? (
                          <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878l4.242 4.242M21 21l-4.879-4.879" />
                        )}
                      </svg>
                      Chart
                    </button>
                  </div>

                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        setEditingNews(null);
                        setIsAddModalOpen(true);
                      }}
                      className="btn-primary"
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</span>
                      News hinzufügen
                    </button>
                  )}
                </div>

                {/* News Type Toggle - Only show if authenticated */}
                {isAuthenticated && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    background: 'var(--background)',
                    padding: '0.25rem',
                    borderRadius: '8px',
                    width: 'fit-content'
                  }}>
                    <button
                      onClick={() => setNewsType('ai')}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '6px',
                        background: newsType === 'ai' ? 'var(--primary-color)' : 'transparent',
                        color: newsType === 'ai' ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (newsType !== 'ai') {
                          e.currentTarget.style.background = 'var(--surface-light)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (newsType !== 'ai') {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }
                      }}
                    >
                      🤖 AI News ({aiNewsData.length})
                    </button>
                    <button
                      onClick={() => setNewsType('user')}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '6px',
                        background: newsType === 'user' ? 'var(--primary-color)' : 'transparent',
                        color: newsType === 'user' ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (newsType !== 'user') {
                          e.currentTarget.style.background = 'var(--surface-light)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (newsType !== 'user') {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }
                      }}
                    >
                      👤 Meine News ({userNewsData.length})
                    </button>
                  </div>
                )}

                {/* AI Disclaimer */}
                {newsType === 'ai' && (
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    marginBottom: '1rem',
                    marginTop: '-1rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    display: 'inline-block'
                  }}>
                    ℹ️ AI-generiert, keine Anlageberatung
                  </div>
                )}

                {/* News List */}
                <NewsList
                  news={newsData}
                  onNewsClick={newsType === 'user' ? handleEditUserNews : handleNewsClick}
                  onDelete={newsType === 'user' ? handleDeleteUserNews : undefined}
                  canDelete={newsType === 'user'}
                  highlightedId={highlightedNewsId}
                />

                {/* Disclaimer */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  marginTop: '20px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'start'
                }}>
                  <svg
                    style={{ width: '16px', height: '16px', color: 'var(--danger-color)', flexShrink: 0, marginTop: '2px' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Hinweis:</strong> Diese Informationen dienen ausschließlich zu Bildungszwecken und stellen keine Anlageberatung dar. Alle Investitionsentscheidungen erfolgen auf eigene Verantwortung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Profile Section - Full width below grid - Enhanced with all company data */}
        {company && (
          <div className="card" style={{ marginTop: '30px' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '1.5rem' }}>
              Über das Unternehmen
            </h2>

            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {/* Description */}
              {company.description && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '1rem', lineHeight: '1.7' }}>{company.description}</p>
                </div>
              )}

              {/* Company Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginTop: '1.5rem',
                padding: '1.5rem',
                background: 'var(--background)',
                borderRadius: '8px'
              }}>
                {company.country && (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Land
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {company.country}
                    </div>
                  </div>
                )}

                {company.exchange && (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Börse
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {company.exchange}
                    </div>
                  </div>
                )}
              </div>

              {/* Business Model */}
              {company.businessModel && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Geschäftsmodell
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{company.businessModel}</p>
                </div>
              )}

              {/* Products */}
              {company.products && (
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Produkte & Services
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{company.products}</p>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Add User News Modal - Outside container */}
      {isAddModalOpen && (
        <AddUserNewsModal
          ticker={ticker || ''}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingNews(null);
          }}
          onSubmit={handleAddUserNews}
          isSubmitting={editingNews ? updateUserNews.isPending : createUserNews.isPending}
          initialData={editingNews || undefined}
        />
      )}

      {/* CSS for responsive grid + mobile optimization */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Favorite button visibility: desktop inline, mobile absolute */
        .favorite-mobile { display: none; }
        .favorite-desktop { display: flex; align-items: center; }
        .favorite-desktop .favorite-button {
          font-size: 0.75rem !important;
          padding: 0.3rem 0.6rem !important;
          gap: 0.25rem !important;
        }
        .favorite-desktop .favorite-button svg {
          width: 13px !important;
          height: 13px !important;
        }

        /* Desktop: 2-column grid, column header, valuation in tab not header */
        @media (min-width: 768px) {
          .stock-detail-page .main-content-wrapper {
            grid-template-columns: 1.15fr 1fr !important;
            align-items: start;
          }
          .stock-detail-page .stock-page-header {
            flex-direction: column !important;
            align-items: center !important;
            gap: 0.4rem !important;
          }
          .stock-detail-page .valuation-header-wrapper {
            display: none !important;
          }
          .stock-detail-page .right-panel {
            position: sticky;
            top: 80px;
          }
          /* Stock info: plain inline row, no box, same as mobile */
          .stock-detail-page .stock-info-box {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            gap: 1.25rem !important;
            justify-content: center !important;
          }
          .stock-detail-page .stock-info-box > div {
            flex-direction: row !important;
            gap: 0.3rem !important;
            align-items: baseline !important;
          }
          .stock-detail-page .stock-info-box span {
            font-size: 0.85rem !important;
          }
        }

        /* ===== MOBILE: Full-width charts, no padding ===== */
        @media (max-width: 767px) {
          .favorite-desktop { display: none !important; }
          .favorite-mobile { display: block !important; }
          .stock-detail-page {
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
            overflow-x: hidden;
          }

          .stock-detail-page .stock-page-header {
            padding: 0 0.75rem;
            gap: 0.5rem;
            flex-direction: column !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            text-align: center;
            margin-bottom: 1.25rem !important;
          }
          .stock-detail-page .valuation-indicator {
            width: 100% !important;
            flex-shrink: 1 !important;
          }
          .stock-detail-page .valuation-seo-text {
            max-width: 100% !important;
          }

          .stock-detail-page .stock-page-header h1 {
            font-size: 1.5rem !important;
            text-align: center;
            margin-bottom: -0.7rem !important;
          }
          .stock-detail-page .company-name-row {
            width: 100%;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
          }
          .stock-detail-page .company-name-row h1 {
            text-align: center !important;
          }

          /* Stock info box: single-line, compact, subtle, directly under name */
          .stock-detail-page .stock-page-header > div:nth-child(2) {
            gap: 1rem !important;
            padding: 0 !important;
            font-size: 0.75rem !important;
            justify-content: center !important;
            flex-wrap: nowrap !important;
            border: none !important;
            background: transparent !important;
            margin-top: -0.2rem !important;
          }
          .stock-detail-page .stock-page-header > div:nth-child(2) > div {
            flex-direction: row !important;
            gap: 0.3rem !important;
            align-items: baseline !important;
          }
          .stock-detail-page .stock-page-header > div:nth-child(2) span {
            font-size: 0.8rem !important;
          }

          /* Other header child divs */
          .stock-detail-page .stock-page-header > div {
            justify-content: center !important;
          }

          /* Favorite button mobile: small star in top-right corner */
          .stock-detail-page .stock-page-header .favorite-mobile {
            margin-left: 0 !important;
            position: absolute;
            right: 0.75rem;
            top: 0;
          }
          .stock-detail-page .stock-page-header {
            position: relative;
          }
          .stock-detail-page .favorite-button {
            padding: 0.35rem !important;
            border: none !important;
            background: transparent !important;
          }
          .stock-detail-page .favorite-button .favorite-button-text {
            display: none !important;
          }
          .stock-detail-page .favorite-button[data-favorite="true"] {
            color: #facc15 !important;
          }

          /* Fair Value Analyse box: no border on mobile */
          .stock-detail-page .fair-value-explanation-box {
            border: none !important;
            border-radius: 0 !important;
          }

          /* Main grid: no gap on mobile, allow children to shrink */
          .stock-detail-page .main-content-wrapper {
            gap: 12px !important;
            margin-top: 12px !important;
          }

          /* Card sections: zero horizontal padding, allow shrinking */
          .stock-detail-page .card {
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            padding: 0.75rem 0 !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }

          /* Chart header: keep some padding, allow shrinking */
          .stock-detail-page .chart-section > div:first-child {
            padding: 0 0.75rem;
            flex-wrap: wrap !important;
          }
          /* Chart title: shrinkable */
          .stock-detail-page .chart-section > div:first-child > h2 {
            min-width: 0 !important;
            flex: 1 1 100% !important;
          }

          /* Chart container: zero padding, full width */
          .stock-detail-page .chart-section > div:nth-child(2) {
            padding: 8px 0 0 0 !important;
            border-radius: 0 !important;
            height: 300px !important;
            margin: 0 !important;
          }

          /* Chart.js canvas wrapper: match container height */
          .stock-detail-page .chart-section > div:nth-child(2) > div {
            height: 100% !important;
          }

          /* Source/disclaimer line below chart */
          .stock-detail-page .chart-section > div:nth-child(3) {
            padding: 0.35rem 0.75rem 0 !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          /* Time range selector: full width, scrollable on mobile */
          .stock-detail-page .chart-section > div:first-child > div:last-child {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            flex-shrink: 1 !important;
            min-width: 0;
            max-width: 100% !important;
            width: 100% !important;
            justify-content: center;
          }
          .stock-detail-page .chart-section > div:first-child > div:last-child button {
            padding: 6px 10px !important;
            font-size: 0.75rem !important;
            white-space: nowrap;
          }

          /* Chart title: smaller on mobile */
          .stock-detail-page .chart-section h2 {
            font-size: 1.15rem !important;
          }
          .stock-detail-page .chart-section h2 span {
            font-size: 0.9rem !important;
          }

          /* News section: padding for text content only */
          .stock-detail-page .news-section > div {
            padding: 0 0.75rem;
          }
          .stock-detail-page .news-section > div:last-child {
            margin: 12px 0.75rem 0 !important;
          }

          /* FairValue explanation box */
          .stock-detail-page .fair-value-explanation {
            padding: 0 0.75rem;
          }

          /* Company profile card */
          .stock-detail-page > .card {
            margin-top: 12px !important;
            padding: 0.75rem !important;
          }
          .stock-detail-page > .card > div {
            padding: 0.5rem !important;
          }
          .stock-detail-page > .card .company-details-grid {
            padding: 0.75rem !important;
          }

          /* Valuation indicator: prominent on mobile — eye-catching! */
          .stock-detail-page .valuation-indicator {
            padding: 0.75rem 1.25rem !important;
            width: 100% !important;
            max-width: 340px;
            justify-content: center !important;
            border-radius: 12px !important;
            border: none !important;
          }
          .stock-detail-page .valuation-indicator > div:first-child,
          .stock-detail-page .valuation-indicator > div:last-child {
            min-width: 75px !important;
          }
          .stock-detail-page .valuation-indicator > div:first-child > div:nth-child(2),
          .stock-detail-page .valuation-indicator > div:last-child > div:nth-child(2) {
            font-size: 1.25rem !important;
          }
          .stock-detail-page .valuation-indicator > div:nth-child(2) {
            padding: 0 0.5rem !important;
            min-width: 90px !important;
            flex: 1 !important;
          }
          .stock-detail-page .valuation-indicator > div:nth-child(2) > div:first-child {
            font-size: 0.95rem !important;
            padding: 0.25rem 0.75rem !important;
          }
        }

        /* ===== SMALL MOBILE: Extra compact ===== */
        @media (max-width: 400px) {
          .stock-detail-page .stock-page-header h1 {
            font-size: 1.25rem !important;
          }
          .stock-detail-page .chart-section > div:nth-child(2) {
            height: 260px !important;
          }
        }

        /* ===== TABLET / DESKTOP ===== */
        @media (min-width: 768px) {
          .stock-detail-page .card {
            padding: 1.5rem;
          }

          /* Large, prominent valuation indicator in desktop tab panel */
          .stock-detail-page .tab-content-fairvalue .valuation-indicator {
            padding: 2rem 2rem 1.5rem !important;
            border-radius: 16px !important;
            border-width: 1.5px !important;
            gap: 0.5rem;
          }
          .stock-detail-page .tab-content-fairvalue .vi-label {
            font-size: 0.75rem !important;
            letter-spacing: 0.1em !important;
            margin-bottom: 0.5rem !important;
          }
          .stock-detail-page .tab-content-fairvalue .vi-value {
            font-size: 2.6rem !important;
            line-height: 1 !important;
            margin-bottom: 0.15rem !important;
          }
          .stock-detail-page .tab-content-fairvalue .vi-currency {
            font-size: 1rem !important;
            margin-top: 0.15rem !important;
          }
          .stock-detail-page .tab-content-fairvalue .vi-arrow-area {
            padding: 0 1.5rem !important;
            min-width: 100px !important;
          }
          .stock-detail-page .tab-content-fairvalue .vi-pill {
            font-size: 1.15rem !important;
            padding: 0.4rem 1.1rem !important;
            margin-bottom: 0.6rem !important;
            border-radius: 999px !important;
          }
          .stock-detail-page .tab-content-fairvalue .valuation-seo-text {
            font-size: 0.9rem !important;
            max-width: 100% !important;
            margin-top: 1.25rem !important;
            line-height: 1.6 !important;
            text-align: center !important;
          }
        }

        @media (min-width: 1200px) {
          .stock-detail-page .main-content-wrapper {
            grid-template-columns: 1.2fr 1fr !important;
          }
          .stock-detail-page .news-section {
            max-height: calc(100vh - 200px);
            overflow-y: auto;
          }
        }

        @media (min-width: 1400px) {
          .stock-detail-page .main-content-wrapper {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }

        /* Mobile: hide tab buttons in right-panel, always show news content */
        @media (max-width: 767px) {
          .stock-detail-page .right-panel .right-panel-tabs {
            display: none !important;
          }
          .stock-detail-page .right-panel .tab-content-fairvalue {
            display: none !important;
          }
          .stock-detail-page .right-panel .tab-content-news {
            display: block !important;
          }
          /* Valuation indicator: full width in mobile header */
          .stock-detail-page .valuation-header-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .btn-small {
          padding: 8px 16px !important;
          font-size: 0.875rem !important;
        }
      `}} />
    </>
  );
};
