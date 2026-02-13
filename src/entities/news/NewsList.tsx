/**
 * News List Component
 * EXACT design from original frontend with dark theme
 */

import type { NewsItem } from '@/shared/types';
import { formatDate, formatPercentage } from '@/shared/utils/formatters';

interface NewsListProps {
  news: NewsItem[];
  onNewsClick?: (newsId: number) => void;
  onDelete?: (newsId: number) => void;
  canDelete?: boolean;
  highlightedId?: number | null;
}

export const NewsList: React.FC<NewsListProps> = ({ news, onNewsClick, onDelete, canDelete, highlightedId }) => {
  if (news.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 0',
        color: 'var(--text-secondary)'
      }}>
        Keine News verfügbar
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {news.map((newsItem, index) => {
        const isPositive = newsItem.sentiment > 0;
        const isHighlighted = highlightedId === newsItem.id;

        return (
          <div
            key={newsItem.id}
            id={`news-${newsItem.id}`}
            style={{
              background: isHighlighted ? 'var(--surface-light)' : 'var(--surface)',
              borderRadius: '8px',
              padding: '1.25rem',
              borderLeft: `4px solid ${isPositive ? 'var(--success-color)' : 'var(--danger-color)'}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: isHighlighted ? '0 0 0 2px var(--primary-color), var(--shadow-lg)' : 'var(--shadow-md)',
              transform: isHighlighted ? 'scale(1.01)' : 'scale(1)'
            }}
            onClick={() => onNewsClick?.(newsItem.id)}
            onMouseEnter={(e) => {
              if (!isHighlighted) {
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isHighlighted) {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {/* News Header */}
            <div style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isPositive ? 'var(--success-color)' : 'var(--danger-color)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}>
                  {index + 1}
                </span>
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  {formatDate(newsItem.newsDate)}
                </span>
              </div>
              <span style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                background: isPositive
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
                color: isPositive ? 'var(--success-color)' : 'var(--danger-color)',
                border: `1px solid ${isPositive
                  ? 'rgba(16, 185, 129, 0.3)'
                  : 'rgba(239, 68, 68, 0.3)'}`
              }}>
                {isPositive ? '+ Positiv' : '- Negativ'}
              </span>
            </div>

            {/* Headline */}
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              lineHeight: '1.4'
            }}>
              {newsItem.headline}
            </h3>

            {/* Summary */}
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: '0.75rem',
              lineHeight: '1.6'
            }}>
              {newsItem.summary}
            </p>

            {/* Price Change */}
            {newsItem.priceChange !== null && newsItem.priceChange !== undefined && (
              <div style={{
                display: 'inline-block',
                padding: '0.375rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
                background: newsItem.priceChange >= 0
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
                color: newsItem.priceChange >= 0
                  ? 'var(--success-color)'
                  : 'var(--danger-color)',
                border: `1px solid ${newsItem.priceChange >= 0
                  ? 'rgba(16, 185, 129, 0.3)'
                  : 'rgba(239, 68, 68, 0.3)'}`
              }}>
                {newsItem.priceChange >= 0 ? 'Kursanstieg' : 'Kursrückgang'}:{' '}
                {formatPercentage(newsItem.priceChange)}
              </div>
            )}

            {/* Meta Info and Actions */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <span>📰 {newsItem.source || 'KI'}</span>
                {newsItem.url && (
                  <a
                    href={newsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--primary-color)',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary-light)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--primary-color)';
                    }}
                  >
                    🔗 Link
                  </a>
                )}
              </div>

              {/* Delete Button for User News */}
              {canDelete && onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(newsItem.id);
                  }}
                  className="btn-danger"
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.75rem'
                  }}
                >
                  🗑️ Löschen
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
