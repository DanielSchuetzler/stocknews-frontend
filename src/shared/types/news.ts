/**
 * News Type Definitions
 * Matches backend StockNews and UserNews entities
 */

// Sentiment values matching backend
export type Sentiment = -1 | 0 | 1; // -1 = negative, 0 = neutral, 1 = positive

// Base news interface (common fields)
interface BaseNews {
  id: number;
  newsDate: string; // ISO date-time string
  headline: string;
  summary: string;
  source?: string;
  url?: string;
  sentiment: Sentiment;
  priceChange?: number; // Percentage change
}

// Matches StockNews entity from backend
export interface StockNews extends BaseNews {
  companyId: number;
}

// Matches UserNews entity from backend
export interface UserNews extends BaseNews {
  userId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

// Request DTO for creating user news (matches UserNewsRequest)
export interface UserNewsRequest {
  ticker: string;
  newsDate: string;
  headline: string;
  summary: string;
  source?: string;
  url?: string;
  sentiment: number; // Backend expects Integer: 0 (negative) or 1 (positive)
  priceChange?: number;
}

// Frontend display type (union of both news types)
export type NewsItem = StockNews | UserNews;
