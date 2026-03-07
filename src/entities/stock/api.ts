/**
 * Stock Data API
 * Handles fetching stock price data from Yahoo Finance via backend
 */

import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { StockData, FairValueResult } from '@/shared/types';

/**
 * Fetch stock data for a given ticker
 * @param ticker - Stock ticker symbol (e.g., 'AAPL', 'TSLA')
 * @param refresh - Force refresh from Yahoo Finance (bypass backend cache)
 */
export const fetchStockData = async (
  ticker: string,
  refresh: boolean = false
): Promise<StockData> => {
  const response = await apiClient.get<StockData>(
    ENDPOINTS.STOCKS.GET_BY_TICKER(ticker, refresh)
  );
  return response.data;
};

/**
 * Fetch Fair Value calculation for a given ticker
 * Returns intrinsic value estimates using DCF, Graham, and Lynch models
 * @param ticker - Stock ticker symbol (e.g., 'AAPL', 'TSLA')
 */
export const fetchFairValue = async (
  ticker: string
): Promise<FairValueResult> => {
  const response = await apiClient.get<FairValueResult>(
    ENDPOINTS.STOCKS.FAIR_VALUE(ticker)
  );
  return response.data;
};
