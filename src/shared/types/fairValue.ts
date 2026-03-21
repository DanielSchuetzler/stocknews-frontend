/**
 * Fair Value Type Definitions
 * Matches backend FairValueResult, FairValueDataPoint, FairValueExplanation DTOs
 */

// Single data point for chart rendering (one per fiscal year)
export interface FairValueDataPoint {
  date: string;               // ISO date string (e.g., "2023-09-30")
  fiscalYear: string;         // e.g., "2023"
  fairValueCombined: number | null;
  fairValueDcf: number | null;
  fairValueGraham: number | null;
  fairValueLynch: number | null;
  fairValueEarningsCap: number | null;
  // Per-year exclusion flags (set by frontend correction logic)
  dcfExcluded?: boolean;
  grahamExcluded?: boolean;
  lynchExcluded?: boolean;
  earningsCapExcluded?: boolean;
  lowConfidence?: boolean;
  stockPriceAtDate?: number | null;  // Reference stock price used for exclusion check
}

// Detailed breakdown of the current fair value calculation
export interface FairValueExplanation {
  // Combined result
  fairValueCombined: number | null;
  currentPrice: number | null;
  valuationVerdict: string | null;   // "unter Fair Value gehandelt" | "über Fair Value gehandelt" | "fair gehandelt"
  upsidePercent: number | null;

  // Input data
  eps: number | null;
  normalizedEps: number | null;    // Median EPS (smoothed over historical data)
  forwardEps: number | null;
  bookValuePerShare: number | null;
  freeCashFlow: number | null;
  sharesOutstanding: number | null;
  earningsGrowthRate: number | null;
  revenueGrowthRate: number | null;
  returnOnEquity: number | null;
  currency: string;
  latestFiscalYearEnd: string | null;

  // DCF model
  fairValueDcf: number | null;
  dcfGrowthRate: number | null;
  dcfDiscountRate: number | null;
  dcfTerminalGrowth: number | null;
  dcfProjectedFcf: number[] | null;
  dcfTerminalValue: number | null;
  dcfApplicable: boolean;
  dcfNote: string;

  // Graham model
  fairValueGraham: number | null;
  grahamBasePE: number | null;      // Sector-specific base P/E (e.g., 20 for Tech, 7 for Financials)
  grahamMaxPE: number | null;       // Sector-specific max P/E cap (e.g., 35 for Tech, 14 for Financials)
  grahamGrowthRate: number | null;  // Growth rate actually used (capped, whole number %)
  grahamSector: string | null;      // German sector name (e.g., "Technologie")
  grahamApplicable: boolean;
  grahamNote: string;

  // Lynch model
  fairValueLynch: number | null;
  lynchGrowthRate: number | null;
  lynchPEGTarget: number | null;
  lynchApplicable: boolean;
  lynchNote: string;

  // Earnings Capitalization (Gordon Growth) model
  fairValueEarningsCap: number | null;
  earningsCapGrowthRate: number | null;
  earningsCapCostOfEquity: number | null;
  earningsCapApplicable: boolean;
  earningsCapNote: string;

  // Weights
  weightDcf: number | null;
  weightGraham: number | null;
  weightLynch: number | null;
  weightEarningsCap: number | null;
  modelsUsed: number;

  // Exclusion flags (model value >2x or <0.5x of current price)
  dcfExcluded: boolean;
  grahamExcluded: boolean;
  lynchExcluded: boolean;
  earningsCapExcluded: boolean;

  // Low confidence flag (all models were extreme, used closest-to-price as fallback)
  lowConfidence: boolean;
}

// Complete API response
export interface FairValueResult {
  ticker: string;
  currency: string;
  dataPoints: FairValueDataPoint[];
  explanation: FairValueExplanation;
}
