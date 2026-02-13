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
  sector?: string;
  industry?: string;
  marketCap?: string;
  employees?: number;
  founded?: string;
  ceo?: string;
  website?: string;
  isActive: boolean;
  lastUpdatedAt?: string;
  createdAt: string;
  yahooTickerValidated?: boolean;

  // Company metadata
  description?: string;
  businessModel?: string;
  products?: string;
  foundedYear?: number;
  headquarters?: string;
  keyFacts?: string;
}

// Autocomplete result from backend
export interface AutocompleteResult {
  ticker: string;
  companyName: string;
  country: string;
  exchange: string;
}
