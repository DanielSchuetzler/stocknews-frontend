/**
 * Login Form Component
 * Handles user authentication
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@/shared/components';
import { useAuth } from '@/shared/hooks/useAuth';
import { getErrorMessage } from '@/shared/api/client';
import { GoogleLoginButton } from './GoogleLoginButton';

export const LoginForm: React.FC = () => {
  const { login, isLoggingIn, loginError } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous validation errors
    setValidationErrors({});

    // Client-side validation
    const errors: typeof validationErrors = {};
    if (!email.trim()) {
      errors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!password) {
      errors.password = 'Passwort ist erforderlich';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Call login mutation
    login({ email: email.trim(), password });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Anmelden</h1>
          <p className="text-gray-600">
            Willkommen zurück bei StockNewsPulse
          </p>
        </div>

        {/* Error message from backend */}
        {loginError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Fehler:</strong> {getErrorMessage(loginError)}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            name="login-email"
            label="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={validationErrors.email}
            placeholder="deine@email.com"
            autoComplete="email"
            disabled={isLoggingIn}
            required
          />

          <Input
            type="password"
            name="login-password"
            label="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={validationErrors.password}
            placeholder="Dein Passwort"
            autoComplete="current-password"
            disabled={isLoggingIn}
            required
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoggingIn}
            className="w-full"
          >
            Anmelden
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">oder</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <GoogleLoginButton variant="login" fullWidth />

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Noch kein Konto?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Jetzt registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
