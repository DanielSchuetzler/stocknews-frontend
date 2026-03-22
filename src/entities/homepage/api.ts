/**
 * Homepage API
 * Fetches pre-aggregated showcase data for the landing page
 */

import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { HomepageShowcaseResponse } from '@/shared/types';

export const fetchHomepageShowcase = async (): Promise<HomepageShowcaseResponse> => {
  const response = await apiClient.get<HomepageShowcaseResponse>(
    ENDPOINTS.HOMEPAGE.SHOWCASE
  );
  return response.data;
};
