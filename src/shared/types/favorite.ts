/**
 * Favorite Type Definitions
 * Matches backend FavoriteStatsDTO
 */

export interface FavoriteStats {
  favoriteId: number;
  ticker: string;
  companyName: string;
  sector?: string;
  exchange?: string;
  aiNewsCount: number; // Count of AI-generated news
  userNewsCount: number; // Count of user-created news
  createdAt: string; // Formatted date string
}

// Response for checking if a stock is favorited
export interface FavoriteCheckResponse {
  isFavorite: boolean;
}
