/**
 * Homepage Query Hooks
 * TanStack Query hook for homepage showcase data with 12h cache
 */

import { useQuery } from '@tanstack/react-query';
import { fetchHomepageShowcase } from './api';

export const homepageKeys = {
  all: ['homepage'] as const,
  showcase: () => [...homepageKeys.all, 'showcase'] as const,
};

/**
 * Hook to fetch homepage showcase data.
 * Cached for 12 hours (backend also caches for 12h).
 */
export const useHomepageShowcase = () => {
  return useQuery({
    queryKey: homepageKeys.showcase(),
    queryFn: fetchHomepageShowcase,
    staleTime: 12 * 60 * 60 * 1000,  // 12 hours
    gcTime: 24 * 60 * 60 * 1000,     // 24 hours garbage collection
    retry: 2,
  });
};
