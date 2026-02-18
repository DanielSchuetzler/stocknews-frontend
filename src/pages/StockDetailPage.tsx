/**
 * Stock Detail Page
 * EXACT design from original frontend with dark theme
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStockData, useFilteredPrices } from '@/entities/stock/queries';
import { useCompany } from '@/entities/company/queries';
import { useNews, useUserNews, useCreateUserNews, useUpdateUserNews, useDeleteUserNews } from '@/entities/news/queries';
import { StockChart } from '@/entities/stock/StockChart';
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

  // Fetch data
  const { data: stockData, isLoading: stockLoading, error: stockError } = useStockData(ticker || '');
  const { data: company } = useCompany(ticker || '');
  const { data: aiNewsData = [] } = useNews(ticker || '');
  const { data: userNewsData = [] } = useUserNews(ticker || '', { enabled: isAuthenticated });

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

  // Scroll to news when clicked - scroll page to H1, scroll news item within news box
  const handleNewsClick = (newsId: number) => {
    // Highlight the clicked news item
    setHighlightedNewsId(newsId);

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
  };

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

  // SEO: Einprägsame, informative Meta-Texte
  const pageTitle = `${companyName} (${ticker}) Aktie – News & Kursverlauf | StockNewsPulse`;
  const metaDescription = `${companyName} (${ticker}): Aktueller Kurs ${latestPrice} ${currencySymbol}. Sieh welche News den ${ticker}-Kurs bewegt haben – historisch visualisiert auf StockNewsPulse. Kostenlos, ohne Anmeldung.`;
  const ogTitle = `${companyName} (${ticker}) – Warum bewegt sich der Kurs?`;
  const ogDescription = `Entdecke, wie News den ${companyName}-Aktienkurs beeinflusst haben. Interaktiver Chart mit historischen Ereignissen – sofort verständlich für private & institutionelle Investoren.`;
  const canonicalUrl = `https://stocknewspulse.info/stocks/${ticker}`;

  // JSON-LD: Strukturierte Daten für die Stock-Seite
  const stockJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${companyName} (${ticker}) Aktienanalyse`,
    "description": metaDescription,
    "url": canonicalUrl,
    "inLanguage": "de",
    "isPartOf": {
      "@type": "WebSite",
      "name": "StockNewsPulse",
      "url": "https://stocknewspulse.info"
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
          "name": "StockNewsPulse",
          "item": "https://stocknewspulse.info"
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
        <meta property="og:site_name" content="StockNewsPulse" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content="https://stocknewspulse.info/og-image.png" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content="https://stocknewspulse.info/og-image.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(stockJsonLd)}</script>
      </Helmet>

      {/* Container - Max 1400px like original */}
      <div className="app-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Header: Company Name + Stock Info + Favorite Button - all inline */}
        <div className="stock-page-header" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            {companyName}
          </h1>

          {/* Stock Info - Horizontal Compact Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '0.75rem 1.25rem',
            background: 'var(--surface)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '0.875rem',
            flexWrap: 'wrap'
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Aktueller Kurs:</span>
              <span style={{ color: 'var(--success-color)', fontWeight: 700, fontSize: '1.1rem' }}>
                {currentPrice ? `${currentPrice.toFixed(2)} ${stockData.currency === 'USD' ? '$' : stockData.currency}` : 'N/A'}
              </span>
            </div>
            {company?.lastUpdatedAt && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Aktualisiert:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                  {new Date(company.lastUpdatedAt).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Favorite Button - small and subtle */}
          <div style={{ marginLeft: 'auto' }}>
            <FavoriteButton ticker={ticker || ''} />
          </div>
        </div>

        {/* Main Content - Grid Layout: Chart left, News right (on desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px',
          marginTop: '20px'
        }} className="main-content-wrapper">
          {/* Chart Section - Sticky on desktop */}
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
                  Kursverlauf mit News-Events
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
              height: '500px',
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
              />
            </div>

            {/* Chart Controls - Original styling */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '15px',
              padding: '10px',
              background: 'var(--background)',
              borderRadius: '6px'
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                💡 Scrollen zum Zoomen, Ziehen zum Verschieben
              </span>
            </div>

            {/* Disclaimer - Directly under chart */}
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '1rem 1.5rem',
              marginTop: '20px',
              display: 'flex',
              gap: '12px',
              alignItems: 'start'
            }}>
              <svg
                style={{ width: '20px', height: '20px', color: 'var(--danger-color)', flexShrink: 0, marginTop: '2px' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Wichtiger Hinweis:
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                  Diese Informationen dienen ausschließlich zu Bildungszwecken und stellen keine
                  Anlageberatung dar. Alle Investitionsentscheidungen erfolgen auf eigene Verantwortung.
                </p>
              </div>
            </div>
          </div>

          {/* News Section - Scrollable on desktop */}
          <div className="news-section card">
            {/* Header with News Type Toggle and Add Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>
                News & Events
              </h2>

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

      {/* CSS for responsive grid */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1200px) {
          .main-content-wrapper {
            grid-template-columns: 1fr 450px !important;
            align-items: start;
          }

          .chart-section {
            position: sticky;
            top: 20px;
            max-height: calc(100vh - 40px);
            overflow: hidden;
          }

          .news-section {
            max-height: calc(100vh - 40px);
            overflow-y: auto;
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
