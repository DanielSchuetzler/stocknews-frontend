/**
 * Authentication Type Definitions
 * These types match the backend DTOs exactly
 */

// Matches AuthResponse from backend
export interface AuthResponse {
  id: number;
  username?: string; // Deprecated, kept for backwards compatibility
  email: string;
  message?: string;
}

// Matches LoginRequest from backend
export interface LoginRequest {
  email: string;
  password: string;
}

// Matches RegisterRequest from backend
export interface RegisterRequest {
  email: string;
  password: string;
}

// User state for frontend store
export interface User {
  id: number;
  email: string;
}
