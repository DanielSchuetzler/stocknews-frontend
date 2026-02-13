/**
 * Favorites API
 * Handles favorite stock management
 */

import { apiClient } from '@/shared/api/client';
import type { FavoriteStats, FavoriteCheckResponse } from '@/shared/types/favorite';

/**
 * Get all favorites for authenticated user
 */
export const getFavorites = async (): Promise<FavoriteStats[]> => {
  const response = await apiClient.get('/favorites');
  return response.data;
};

/**
 * Check if a stock is favorited
 */
export const checkFavorite = async (ticker: string): Promise<FavoriteCheckResponse> => {
  const response = await apiClient.get(`/favorites/check/${ticker}`);
  return response.data;
};

/**
 * Add stock to favorites
 */
export const addFavorite = async (ticker: string): Promise<void> => {
  await apiClient.post(`/favorites/${ticker}`);
};

/**
 * Remove stock from favorites
 */
export const removeFavorite = async (ticker: string): Promise<void> => {
  await apiClient.delete(`/favorites/${ticker}`);
};
