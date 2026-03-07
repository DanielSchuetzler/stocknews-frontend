/**
 * Stock Data Query Hooks
 * TanStack Query hooks for fetching and caching stock data
 */

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchStockData, fetchFairValue } from './api';
import type { TimeRange, StockPrice } from '@/shared/types';

// Query keys for cache management
export const stockKeys = {
  all: ['stock'] as const,
  detail: (ticker: string) => [...stockKeys.all, ticker] as const,
  fairValue: (ticker: string) => [...stockKeys.all, 'fairValue', ticker] as const,
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
 * Hook to fetch Fair Value data for a ticker
 * Caches data for 30 minutes (backend has 24h cache)
 * @param ticker - Stock ticker symbol
 */
export const useFairValue = (ticker: string) => {
  return useQuery({
    queryKey: stockKeys.fairValue(ticker),
    queryFn: () => fetchFairValue(ticker),
    enabled: !!ticker,
    staleTime: 30 * 60 * 1000, // 30 minutes
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
  return useMemo(() => {
    if (!prices || prices.length === 0) return [];
    if (timeRange === 'all') return prices;

    // Start from January 1st of the cutoff year so the chart always
    // begins at a full year boundary — this ensures Fair Value annual
    // data points align with the visible price range.
    const today = new Date();
    const cutoffYear = today.getFullYear() - timeRange;
    const cutoffDate = new Date(cutoffYear, 0, 1); // Jan 1st

    return prices.filter((price) => {
      const priceDate = new Date(price.date);
      return priceDate >= cutoffDate;
    });
  }, [prices, timeRange]);
};
