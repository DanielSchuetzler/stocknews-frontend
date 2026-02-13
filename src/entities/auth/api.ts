/**
 * Authentication API
 * Handles all authentication-related HTTP requests to the backend
 */

import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@/shared/types';

/**
 * Register a new user account
 * POST /api/auth/register
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

/**
 * Login with username and password
 * POST /api/auth/login
 * Creates a session cookie that is automatically stored by the browser
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

/**
 * Logout the current user
 * POST /api/auth/logout
 * Invalidates the session on the backend
 */
export const logout = async (): Promise<void> => {
  await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
};

/**
 * Get current authenticated user
 * GET /api/auth/me
 * Uses session cookie to identify user
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<AuthResponse>(ENDPOINTS.AUTH.ME);
  // Map AuthResponse to User (remove message field)
  return {
    id: response.data.id,
    email: response.data.email,
  };
};

/**
 * Update user profile (username and/or email)
 * PUT /api/auth/profile
 */
export interface UpdateProfileRequest {
  email: string;
}

export const updateProfile = async (data: UpdateProfileRequest): Promise<AuthResponse> => {
  const response = await apiClient.put<AuthResponse>(ENDPOINTS.AUTH.UPDATE_PROFILE, data);
  return response.data;
};

/**
 * Change user password
 * PUT /api/auth/password
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordRequest): Promise<{ message: string }> => {
  const response = await apiClient.put<{ message: string }>(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  return response.data;
};

/**
 * Delete user account permanently
 * DELETE /api/auth/account
 */
export interface DeleteAccountRequest {
  password: string;
}

export const deleteAccount = async (data: DeleteAccountRequest): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(ENDPOINTS.AUTH.DELETE_ACCOUNT, {
    data, // axios DELETE requests send body as 'data' property
  });
  return response.data;
};

/**
 * Export user data (GDPR Article 15)
 * GET /api/auth/export
 */
export const exportUserData = async (): Promise<Record<string, unknown>> => {
  const response = await apiClient.get<Record<string, unknown>>(ENDPOINTS.AUTH.EXPORT_DATA);
  return response.data;
};
