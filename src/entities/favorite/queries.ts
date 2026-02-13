/**
 * Favorites TanStack Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, checkFavorite, addFavorite, removeFavorite } from './api';
import type { FavoriteStats } from '@/shared/types/favorite';

/**
 * Get all favorites
 */
export const useFavorites = () => {
  return useQuery<FavoriteStats[]>({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Check if a stock is favorited
 */
export const useFavoriteCheck = (ticker: string) => {
  return useQuery({
    queryKey: ['favorite-check', ticker],
    queryFn: () => checkFavorite(ticker),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!ticker,
  });
};

/**
 * Add favorite mutation
 */
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSettled: (_, __, ticker) => {
      // Always invalidate on success or error to sync with server state
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorite-check', ticker] });
    },
  });
};

/**
 * Remove favorite mutation
 */
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,
    onSettled: (_, __, ticker) => {
      // Always invalidate on success or error to sync with server state
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorite-check', ticker] });
    },
  });
};

/**
 * Toggle favorite (add if not favorited, remove if favorited)
 */
export const useToggleFavorite = () => {
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  return {
    toggleFavorite: async (ticker: string, isFavorite: boolean) => {
      if (isFavorite) {
        await removeMutation.mutateAsync(ticker);
      } else {
        await addMutation.mutateAsync(ticker);
      }
    },
    isLoading: addMutation.isPending || removeMutation.isPending,
  };
};
