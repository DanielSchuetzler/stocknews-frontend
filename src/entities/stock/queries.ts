/**
 * Stock Data Query Hooks
 * TanStack Query hooks for fetching and caching stock data
 */

import { useQuery } from '@tanstack/react-query';
import { fetchStockData } from './api';
import type { TimeRange, StockPrice } from '@/shared/types';

// Query keys for cache management
export const stockKeys = {
  all: ['stock'] as const,
  detail: (ticker: string) => [...stockKeys.all, ticker] as const,
};

/**
 * Hook to fetch stock data for a ticker
 * Caches data for 5 minutes (backend has 6h cache)
 * @param ticker - Stock ticker symbol
 * @param refresh - Force refresh from Yahoo Finance
 */
export const useStockData = (ticker: string, refresh: boolean = false) => {
  return useQuery({
    queryKey: [...stockKeys.detail(ticker), refresh],
    queryFn: () => fetchStockData(ticker, refresh),
    enabled: !!ticker, // Only fetch if ticker is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to filter stock prices by time range
 * Pure client-side filtering (no API call)
 */
export const useFilteredPrices = (
  prices: StockPrice[] | undefined,
  timeRange: TimeRange
) => {
  if (!prices || prices.length === 0) return [];

  if (timeRange === 'all') return prices;

  const today = new Date();
  const cutoffDate = new Date();
  cutoffDate.setFullYear(today.getFullYear() - timeRange);

  return prices.filter((price) => {
    const priceDate = new Date(price.date);
    return priceDate >= cutoffDate;
  });
};
