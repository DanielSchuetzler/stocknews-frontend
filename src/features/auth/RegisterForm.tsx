/**
 * Register Form Component
 * Handles new user registration
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@/shared/components';
import { useAuth } from '@/shared/hooks/useAuth';
import { getErrorMessage } from '@/shared/api/client';
import { GoogleLoginButton } from './GoogleLoginButton';

export const RegisterForm: React.FC = () => {
  const { register, isRegistering, registerError } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
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
    } else if (password.length < 6) {
      errors.password = 'Passwort muss mindestens 6 Zeichen lang sein';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Passwort-Bestätigung ist erforderlich';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwörter stimmen nicht überein';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Call register mutation
    register({
      email: email.trim(),
      password,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Konto erstellen
          </h1>
          <p className="text-gray-600">
            Registriere dich kostenlos bei StockNewsPulse
          </p>
        </div>

        {/* Error message from backend */}
        {registerError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Fehler:</strong> {getErrorMessage(registerError)}
            </p>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            name="register-email"
            label="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={validationErrors.email}
            placeholder="deine@email.com"
            autoComplete="email"
            disabled={isRegistering}
            required
          />

          <Input
            type="password"
            name="register-password"
            label="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={validationErrors.password}
            placeholder="Mindestens 6 Zeichen"
            autoComplete="new-password"
            disabled={isRegistering}
            required
          />

          <Input
            type="password"
            name="register-password-confirm"
            label="Passwort bestätigen"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={validationErrors.confirmPassword}
            placeholder="Passwort erneut eingeben"
            autoComplete="new-password"
            disabled={isRegistering}
            required
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isRegistering}
            className="w-full"
          >
            Registrieren
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">oder</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <GoogleLoginButton variant="register" fullWidth />

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Bereits ein Konto?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Jetzt anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
