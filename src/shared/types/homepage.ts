/**
 * Homepage Showcase Types
 * Matches backend HomepageShowcaseItem and HomepageShowcaseResponse DTOs
 */

export interface HomepageShowcaseItem {
  ticker: string;
  name: string;
  currency: string;
  sector: string | null;
  currentPrice: number | null;
  fairValueCombined: number | null;
  fairValueDcf: number | null;
  fairValueGraham: number | null;
  fairValueLynch: number | null;
  fairValueEarningsCap: number | null;
  valuationVerdict: string | null;
  upsidePercent: number | null;
  modelsUsed: number;
}

export interface HomepageShowcaseResponse {
  hero: HomepageShowcaseItem | null;
  stocks: HomepageShowcaseItem[];
  generatedAt: string;
}
