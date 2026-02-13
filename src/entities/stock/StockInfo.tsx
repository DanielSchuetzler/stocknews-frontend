/**
 * Stock Info Header Component
 * EXACT compact inline design from original frontend with dark theme
 */

import type { StockData } from '@/shared/types';
import { formatCurrency } from '@/shared/utils/formatters';

interface StockInfoProps {
  stockData: StockData;
  newsCount: number;
}

export const StockInfo: React.FC<StockInfoProps> = ({ stockData, newsCount }) => {
  const lastPrice = stockData.prices[stockData.prices.length - 1];

  return (
    <div className="card" style={{ padding: '0.875rem 1.25rem' }}>
      {/* Ultra-compact inline layout - all in one line */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem 1.5rem',
        alignItems: 'center',
        fontSize: '0.9rem'
      }}>
        {/* Name */}
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Name: </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {stockData.name || stockData.ticker}
          </span>
        </div>

        <span style={{ color: 'var(--border-color)' }}>•</span>

        {/* Ticker */}
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ticker: </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {stockData.ticker}
          </span>
        </div>

        {/* Exchange */}
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Börse: </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {stockData.exchange || 'N/A'}
          </span>
        </div>

        {/* Currency */}
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Währung: </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {stockData.currency}
          </span>
        </div>

        {/* Current Price - highlighted */}
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Kurs: </span>
          <span style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '1.1rem' }}>
            {formatCurrency(lastPrice.close, stockData.currency)}
          </span>
        </div>

        {/* News Count */}
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>News: </span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {newsCount}
          </span>
        </div>
      </div>
    </div>
  );
};
