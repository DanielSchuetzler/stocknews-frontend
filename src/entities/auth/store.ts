/**
 * Authentication Store (Zustand)
 * Global state management for user authentication
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/shared/types';

interface AuthState {
  user: User | null; // Currently logged in user
  isAuthenticated: boolean; // Quick check if user is logged in

  // Actions
  setUser: (user: User | null) => void; // Set user after login
  clearUser: () => void; // Clear user after logout
}

/**
 * Auth Store with persistence
 * User data is stored in localStorage to survive page refreshes
 * Session cookie handling is done automatically by the browser
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Set user and mark as authenticated
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user, // Convert to boolean
        }),

      // Clear user on logout
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // localStorage key
      // Only persist user data, not the entire state
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Listen for unauthorized events from API interceptor
 * When session expires (401), clear local auth state
 */
if (typeof window !== 'undefined') {
  window.addEventListener('auth:unauthorized', () => {
    useAuthStore.getState().clearUser();
  });
}
