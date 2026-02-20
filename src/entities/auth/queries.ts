/**
 * Authentication Query Hooks (TanStack Query)
 * React hooks for authentication operations with caching and state management
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  login,
  logout,
  register,
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
  exportUserData,
  type UpdateProfileRequest,
  type ChangePasswordRequest,
  type DeleteAccountRequest,
} from './api';
import { useAuthStore } from './store';
import type { LoginRequest, RegisterRequest } from '@/shared/types';
import { getErrorMessage } from '@/shared/api/client';

// Query keys for cache invalidation
export const authKeys = {
  currentUser: ['auth', 'currentUser'] as const,
};

/**
 * Hook to get current authenticated user
 * Runs on app initialization to restore session
 *
 * CRITICAL: Implements silent re-authentication with smart retry logic
 * - Retries on network errors (backend down, connection issues)
 * - Does NOT retry on 401 (user not authenticated - expected)
 * - Does NOT retry on 403 (forbidden)
 */
export const useCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const query = useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getCurrentUser,
    // CRITICAL: Only fetch if user might be authenticated (localStorage says so)
    // After logout, isAuthenticated is false → query is disabled → no GET /auth/me
    // On page reload (F5), isAuthenticated is restored from localStorage → query fires
    enabled: isAuthenticated,
    // Smart retry logic: Only retry on transient network errors, not auth failures
    retry: (failureCount, error: any) => {
      // Don't retry auth errors (401 = not logged in, 403 = forbidden)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }

      // Retry up to 3 times for network errors (500, timeout, connection failed)
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s
      return Math.min(1000 * 2 ** attemptIndex, 5000);
    },
    staleTime: Infinity, // User data doesn't change frequently
  });

  // Update store based on query status (React Query v5 pattern)
  if (query.isSuccess && query.data) {
    setUser(query.data);
  } else if (query.isError) {
    setUser(null);
  }

  return query;
};

/**
 * Hook for user login
 * Returns mutation function and loading/error states
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    // On successful login
    onSuccess: async (response) => {
      // Update auth store
      setUser({
        id: response.id,
        email: response.email,
      });

      // Update query cache
      queryClient.setQueryData(authKeys.currentUser, {
        id: response.id,
        email: response.email,
      });

      // CRITICAL FIX: Wait for store to be persisted to localStorage
      // This prevents race condition where navigation happens before isAuthenticated is true
      // Increased delay for E2E tests where timing is more critical
      await new Promise(resolve => setTimeout(resolve, 200));

      // Navigate to dashboard - now guaranteed that store is updated
      navigate('/dashboard');
    },
    // Error handling
    onError: (error) => {
      console.error('Login failed:', getErrorMessage(error));
    },
  });
};

/**
 * Hook for user registration
 * Returns mutation function and loading/error states
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    // On successful registration
    onSuccess: async (response) => {
      // Update auth store
      setUser({
        id: response.id,
        email: response.email,
      });

      // Update query cache
      queryClient.setQueryData(authKeys.currentUser, {
        id: response.id,
        email: response.email,
      });

      // CRITICAL FIX: Wait for store to be persisted to localStorage
      // This prevents race condition where navigation happens before isAuthenticated is true
      // Increased delay for E2E tests where timing is more critical
      await new Promise(resolve => setTimeout(resolve, 200));

      // Navigate to dashboard with welcome banner for new registrations
      navigate('/dashboard?welcome=true');
    },
    // Error handling
    onError: (error) => {
      console.error('Registration failed:', getErrorMessage(error));
    },
  });
};

/**
 * Hook for user logout
 * Returns mutation function and loading state
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    // On successful logout
    onSuccess: () => {
      // STEP 1: Clear auth store FIRST (sets isAuthenticated = false)
      // This disables useCurrentUser query (enabled: isAuthenticated)
      // so it won't fire GET /auth/me after logout
      clearUser();

      // STEP 2: Cancel any in-flight auth queries
      queryClient.cancelQueries({ queryKey: authKeys.currentUser });

      // STEP 3: Remove cached auth data
      queryClient.removeQueries({ queryKey: authKeys.currentUser });
      queryClient.removeQueries({ queryKey: ['auth'] });

      // STEP 4: Navigate to home
      navigate('/');
    },
    // Even on error, clear local state (session might be expired)
    onError: () => {
      clearUser();
      queryClient.cancelQueries({ queryKey: authKeys.currentUser });
      queryClient.removeQueries({ queryKey: authKeys.currentUser });
      queryClient.removeQueries({ queryKey: ['auth'] });
      navigate('/');
    },
  });
};

/**
 * Hook for updating user profile (username/email)
 * Updates both query cache and auth store on success
 */
export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: (response) => {
      // Update auth store
      setUser({
        id: response.id,
        email: response.email,
      });

      // Update query cache
      queryClient.setQueryData(authKeys.currentUser, {
        id: response.id,
        email: response.email,
      });
    },
  });
};

/**
 * Hook for changing user password
 * No cache/store updates needed for password changes
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
  });
};

/**
 * Hook for deleting user account
 * Clears all local state and redirects to home on success
 */
export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteAccountRequest) => deleteAccount(data),
    onSuccess: () => {
      // Clear auth store and cached queries
      clearUser();
      queryClient.clear();

      // Navigate to home page with success flag (no auth guard there)
      navigate('/?deleted=true', { replace: true });
    },
  });
};

/**
 * Hook for exporting user data (GDPR)
 * Downloads the data as a JSON file
 */
export const useExportUserData = () => {
  return useMutation({
    mutationFn: exportUserData,
    onSuccess: (data) => {
      // Create a downloadable JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `user-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  });
};
