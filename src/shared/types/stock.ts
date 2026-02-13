/**
 * Stock Data Type Definitions
 * Matches backend StockData and StockPrice DTOs
 */

// Matches StockPrice from backend
export interface StockPrice {
  date: string; // ISO date string (YYYY-MM-DD)
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Matches StockData from backend
export interface StockData {
  ticker: string;
  name: string;
  currency: string;
  exchange: string;
  prices: StockPrice[];
  // Additional fields from Yahoo Finance
  longName?: string;
  shortName?: string;
}

// Time range options for chart filtering
export type TimeRange = 1 | 3 | 5 | 10 | 'all';
