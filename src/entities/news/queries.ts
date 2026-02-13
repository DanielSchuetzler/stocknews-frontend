/**
 * News Query Hooks
 * TanStack Query hooks for fetching and managing news
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNewsByTicker, getUserNewsByTicker, createUserNews, updateUserNews, deleteUserNews } from './api';
import type { UserNewsRequest } from '@/shared/types';

// Query keys
export const newsKeys = {
  all: ['news'] as const,
  byTicker: (ticker: string) => [...newsKeys.all, 'ticker', ticker] as const,
  userByTicker: (ticker: string) => [...newsKeys.all, 'user', ticker] as const,
};

/**
 * Hook to get AI-generated news for a ticker
 * @param ticker - Stock ticker symbol
 */
export const useNews = (ticker: string) => {
  return useQuery({
    queryKey: newsKeys.byTicker(ticker),
    queryFn: () => getNewsByTicker(ticker),
    enabled: !!ticker,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to get user-created news for a ticker
 * Requires authentication
 * @param ticker - Stock ticker symbol
 * @param options - Additional query options
 */
export const useUserNews = (ticker: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: newsKeys.userByTicker(ticker),
    queryFn: () => getUserNewsByTicker(ticker),
    enabled: !!ticker && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry if not authenticated
  });
};

/**
 * Hook to create user news
 * Invalidates news cache after creation
 */
export const useCreateUserNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserNewsRequest) => createUserNews(data),
    onSuccess: (_, variables) => {
      // Invalidate user news cache for this ticker
      queryClient.invalidateQueries({
        queryKey: newsKeys.userByTicker(variables.ticker),
      });
      // Update userNewsCount on dashboard
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

/**
 * Hook to update user news
 * Invalidates news cache after update
 */
export const useUpdateUserNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserNewsRequest }) => updateUserNews(id, data),
    onSuccess: (_, variables) => {
      // Invalidate user news cache for this ticker
      queryClient.invalidateQueries({
        queryKey: newsKeys.userByTicker(variables.data.ticker),
      });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

/**
 * Hook to delete user news
 * Invalidates news cache after deletion
 */
export const useDeleteUserNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserNews(id),
    onSuccess: () => {
      // Invalidate all user news caches
      queryClient.invalidateQueries({
        queryKey: newsKeys.all,
      });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
