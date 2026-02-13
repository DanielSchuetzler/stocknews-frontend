/**
 * useAuth Hook
 * Convenience hook to access authentication state and actions
 * This is the main hook components should use for auth
 */

import { useAuthStore } from '@/entities/auth/store';
import { useLogin, useLogout, useRegister } from '@/entities/auth/queries';

/**
 * Main auth hook that provides everything needed for authentication
 *
 * Usage:
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 *
 * if (isAuthenticated) {
 *   return <div>Welcome {user.username}</div>;
 * }
 * ```
 */
export const useAuth = () => {
  // Get user state from store
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Get mutation hooks
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  return {
    // State
    user,
    isAuthenticated,

    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,

    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
