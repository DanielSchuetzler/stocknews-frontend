/**
 * Register Page
 * Full page wrapper for register form
 */

import { RegisterForm } from '@/features/auth/RegisterForm';
import { Helmet } from 'react-helmet-async';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Kostenlos registrieren – AI-Aktienanalyse | BrainyTrader</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
};
