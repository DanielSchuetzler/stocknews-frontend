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
}

// Detailed breakdown of the current fair value calculation
export interface FairValueExplanation {
  // Combined result
  fairValueCombined: number | null;
  currentPrice: number | null;
  valuationVerdict: string | null;   // "unterbewertet" | "überbewertet" | "fair bewertet"
  upsidePercent: number | null;

  // Input data
  eps: number | null;
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
  grahamApplicable: boolean;
  grahamNote: string;

  // Lynch model
  fairValueLynch: number | null;
  lynchGrowthRate: number | null;
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
}

// Complete API response
export interface FairValueResult {
  ticker: string;
  currency: string;
  dataPoints: FairValueDataPoint[];
  explanation: FairValueExplanation;
}
