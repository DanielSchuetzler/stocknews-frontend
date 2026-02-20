/**
 * Main App Component
 * Sets up routing and global app structure with Header and Footer
 *
 * Session Management:
 * - useSessionKeepAlive() automatically manages session heartbeat
 * - Starts heartbeat when user logs in
 * - Sends periodic requests to keep session alive
 * - Redirects to login on session expiry
 */

import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { StockDetailPage } from '@/pages/StockDetailPage';
import { DatenschutzPage } from '@/pages/DatenschutzPage';
import { ImpressumPage } from '@/pages/ImpressumPage';
import { QuellenPage } from '@/pages/QuellenPage';
import { ErklärungPage } from '@/pages/ErklärungPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { OAuth2CallbackPage } from '@/pages/OAuth2CallbackPage';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { CookieBanner } from '@/widgets/CookieBanner';
import { useSessionKeepAlive } from '@/shared/hooks/useSessionKeepAlive';
import { useCurrentUser } from '@/entities/auth/queries';

function App() {
  // CRITICAL: Initialize auth state and CSRF token on app startup
  // This query will:
  // 1. Restore user session if valid (sets auth store)
  // 2. Fetch CSRF token cookie from backend (required for POST/PUT/DELETE requests)
  // 3. Return null if not authenticated (expected for public pages)
  useCurrentUser();

  // Automatically manage session keep-alive (heartbeat)
  // This ensures user stays logged in as long as they use the app
  useSessionKeepAlive();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stocks/:ticker" element={<StockDetailPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/quellen" element={<QuellenPage />} />
          <Route path="/erklarung" element={<ErklärungPage />} />
          <Route path="/oauth2/callback/google" element={<OAuth2CallbackPage />} />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App;
