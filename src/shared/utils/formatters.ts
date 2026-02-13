/**
 * Formatting Utilities
 * Functions for formatting dates, currencies, numbers, etc.
 */

import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

/**
 * Format date to German locale (DD.MM.YYYY)
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy', { locale: de });
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return dateString;
  }
};

/**
 * Format date with time (DD.MM.YYYY HH:mm)
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd.MM.yyyy HH:mm', { locale: de });
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return dateString;
  }
};

/**
 * Format currency with symbol
 * @param value - Numeric value
 * @param currency - Currency code (USD, EUR, etc.)
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CHF: 'Fr',
    CNY: '¥',
  };

  const symbol = currencySymbols[currency] || currency;
  return `${value.toFixed(2)} ${symbol}`;
};

/**
 * Format percentage with sign
 */
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

/**
 * Format large numbers with abbreviations (K, M, B)
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toFixed(2);
};

/**
 * Format market cap in billions
 */
export const formatMarketCap = (marketCap: number): string => {
  const billions = marketCap / 1_000_000_000;
  return `$${billions.toFixed(2)} Mrd.`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Convert sentiment number to German text
 */
export const formatSentiment = (sentiment: number): string => {
  if (sentiment > 0) return 'Positiv';
  if (sentiment < 0) return 'Negativ';
  return 'Neutral';
};

/**
 * Get sentiment color class
 */
export const getSentimentClass = (sentiment: number): string => {
  if (sentiment > 0) return 'positive';
  if (sentiment < 0) return 'negative';
  return 'neutral';
};
