/**
 * Favorite Button Component
 * EXACT design from original frontend with dark theme
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useFavoriteCheck, useToggleFavorite } from '@/entities/favorite/queries';

interface FavoriteButtonProps {
  ticker: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ ticker }) => {
  const { isAuthenticated } = useAuth();
  const { data: favoriteCheck, isLoading: checkLoading, refetch } = useFavoriteCheck(ticker);
  const { toggleFavorite, isLoading: toggleLoading } = useToggleFavorite();
  const [optimisticFavorite, setOptimisticFavorite] = useState<boolean | null>(null);

  // Sync optimistic state with actual server state when data changes
  useEffect(() => {
    setOptimisticFavorite(null);
  }, [favoriteCheck?.isFavorite]);

  const isFavorite = optimisticFavorite !== null ? optimisticFavorite : (favoriteCheck?.isFavorite ?? false);
  const isLoading = checkLoading || toggleLoading;

  if (!isAuthenticated) {
    return null;
  }

  const handleClick = async () => {

    // Optimistic update
    const newFavoriteState = !isFavorite;
    setOptimisticFavorite(newFavoriteState);

    try {
      await toggleFavorite(ticker, isFavorite);
      // Query will be invalidated by the mutation, which triggers refetch
    } catch (error) {
      // On error, refetch to get actual server state instead of reverting blindly
      console.error('Failed to toggle favorite:', error);
      await refetch();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.5rem 0.875rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        border: '1px solid',
        borderRadius: '6px',
        borderColor: 'var(--border-color)',
        background: 'transparent',
        color: 'var(--text-secondary)',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: isLoading ? 0.5 : 1
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.background = 'var(--surface-light)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      <svg
        style={{
          width: '16px',
          height: '16px',
          fill: isFavorite ? 'currentColor' : 'none',
          stroke: 'currentColor',
          transition: 'all 0.2s'
        }}
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {isLoading ? (
        'Lädt...'
      ) : isFavorite ? (
        'Aus Favoriten entfernen'
      ) : (
        'Zu Favoriten hinzufügen'
      )}
    </button>
  );
};
