/**
 * Login Page
 * Full page wrapper for login form
 */

import { LoginForm } from '@/features/auth/LoginForm';
import { Helmet } from 'react-helmet-async';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Login – Jetzt einloggen | BrainyTrader</title>
      </Helmet>
      <LoginForm />
    </div>
  );
};
