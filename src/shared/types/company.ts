/**
 * Company Type Definitions
 * Matches backend Company entity
 */

export interface Company {
  id: number;
  ticker: string;
  isin?: string;
  name: string;
  country?: string;
  exchange?: string;
  description?: string;
  businessModel?: string;
  products?: string;
  lastUpdatedAt?: string;
  createdAt: string;
}

// Autocomplete result from backend
export interface AutocompleteResult {
  ticker: string;
  companyName: string;
  country: string;
  exchange: string;
}
