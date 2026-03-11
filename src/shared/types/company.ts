/**
 * Company Type Definitions
 * Matches backend Company entity
 */

export interface Company {
  id: number;
  ticker: string;
  name: string;
  country?: string;
  exchange?: string;
  description?: string;
  businessModel?: string;
  products?: string;
  sector?: string;              // Enum name: TECHNOLOGY, FINANCIALS, etc.
  sectorDisplayName?: string;   // German display: Technologie, Finanzen, etc.
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
