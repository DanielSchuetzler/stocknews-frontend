/**
 * Company API
 * Handles company search, autocomplete, and company details
 */

import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { AutocompleteResult, Company } from '@/shared/types';

/**
 * Autocomplete search for companies
 * Returns top 10 matches ranked by relevance
 * @param query - Search term (min 2 characters)
 */
export const autocompleteCompanies = async (
  query: string
): Promise<AutocompleteResult[]> => {
  const response = await apiClient.get<AutocompleteResult[]>(
    ENDPOINTS.COMPANIES.AUTOCOMPLETE(query)
  );
  return response.data;
};

/**
 * Get company details by ticker
 * @param ticker - Company ticker symbol
 */
export const getCompanyByTicker = async (ticker: string): Promise<Company> => {
  const response = await apiClient.get<Company>(
    ENDPOINTS.COMPANIES.GET_BY_TICKER(ticker)
  );
  return response.data;
};

/**
 * Search companies by name or ticker
 * Returns up to 50 results
 * @param query - Search term
 */
export const searchCompanies = async (query: string): Promise<Company[]> => {
  const response = await apiClient.get<Company[]>(
    ENDPOINTS.COMPANIES.SEARCH(query)
  );
  return response.data;
};
