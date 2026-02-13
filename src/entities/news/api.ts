/**
 * News API
 * Handles AI-generated news and user news
 */

import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { StockNews, UserNews, UserNewsRequest } from '@/shared/types';

/**
 * Get all AI-generated news for a ticker
 * @param ticker - Stock ticker symbol
 */
export const getNewsByTicker = async (ticker: string): Promise<StockNews[]> => {
  const response = await apiClient.get<StockNews[]>(
    ENDPOINTS.NEWS.GET_BY_TICKER(ticker)
  );
  return response.data;
};

/**
 * Get all user-created news for a ticker (requires authentication)
 * @param ticker - Stock ticker symbol
 */
export const getUserNewsByTicker = async (ticker: string): Promise<UserNews[]> => {
  const response = await apiClient.get<UserNews[]>(
    ENDPOINTS.USER_NEWS.GET_BY_TICKER(ticker)
  );
  return response.data;
};

/**
 * Create user news (requires authentication)
 * @param newsData - News data to create
 */
export const createUserNews = async (newsData: UserNewsRequest): Promise<UserNews> => {
  const response = await apiClient.post<UserNews>(
    ENDPOINTS.USER_NEWS.CREATE,
    newsData
  );
  return response.data;
};

/**
 * Update user news (requires authentication)
 * @param id - News ID to update
 * @param newsData - News data to update
 */
export const updateUserNews = async (id: number, newsData: UserNewsRequest): Promise<UserNews> => {
  const response = await apiClient.put<UserNews>(
    ENDPOINTS.USER_NEWS.UPDATE(id),
    newsData
  );
  return response.data;
};

/**
 * Delete user news (requires authentication)
 * @param id - News ID to delete
 */
export const deleteUserNews = async (id: number): Promise<void> => {
  await apiClient.delete(ENDPOINTS.USER_NEWS.DELETE(id));
};
