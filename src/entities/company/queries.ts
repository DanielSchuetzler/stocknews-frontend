/**
 * Company Query Hooks
 * TanStack Query hooks for company search and details
 */

import { useQuery } from '@tanstack/react-query';
import { autocompleteCompanies, getCompanyByTicker } from './api';

// Query keys
export const companyKeys = {
  all: ['company'] as const,
  autocomplete: (query: string) => [...companyKeys.all, 'autocomplete', query] as const,
  detail: (ticker: string) => [...companyKeys.all, 'detail', ticker] as const,
};

/**
 * Hook for company autocomplete search
 * Only runs if query is at least 2 characters
 * @param query - Search term
 */
export const useCompanyAutocomplete = (query: string) => {
  return useQuery({
    queryKey: companyKeys.autocomplete(query),
    queryFn: () => autocompleteCompanies(query),
    enabled: query.length >= 2, // Only fetch for 2+ characters
    staleTime: 10 * 60 * 1000, // 10 minutes (company data doesn't change often)
  });
};

/**
 * Hook to get company details by ticker
 * @param ticker - Company ticker symbol
 */
export const useCompany = (ticker: string) => {
  return useQuery({
    queryKey: companyKeys.detail(ticker),
    queryFn: () => getCompanyByTicker(ticker),
    enabled: !!ticker,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
