/**
 * API Endpoint Constants
 * Centralized location for all API routes matching backend controllers
 */

export const ENDPOINTS = {
  // Authentication endpoints (/api/auth)
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me', // Get current user
    UPDATE_PROFILE: '/auth/profile', // PUT - Update username/email
    CHANGE_PASSWORD: '/auth/password', // PUT - Change password
    DELETE_ACCOUNT: '/auth/account', // DELETE - Delete account
    EXPORT_DATA: '/auth/export', // GET - Export user data
  },

  // Stock data endpoints (/api/stocks)
  STOCKS: {
    GET_BY_TICKER: (ticker: string, refresh?: boolean) =>
      `/stocks/${ticker}${refresh ? '?refresh=true' : ''}`,
  },

  // Company endpoints (/api/companies)
  COMPANIES: {
    AUTOCOMPLETE: (query: string) => `/companies/autocomplete?query=${encodeURIComponent(query)}`,
    GET_BY_TICKER: (ticker: string) => `/companies/ticker/${ticker}`,
    GET_BY_ISIN: (isin: string) => `/companies/isin/${isin}`,
    SEARCH: (query: string) => `/companies/search?q=${encodeURIComponent(query)}`,
  },

  // News endpoints (/api/news)
  NEWS: {
    GET_ALL: '/news',
    GET_BY_TICKER: (ticker: string) => `/news/ticker/${ticker}`,
    GET_BY_TICKER_RANGE: (ticker: string, startDate: string, endDate: string) =>
      `/news/ticker/${ticker}/range?startDate=${startDate}&endDate=${endDate}`,
    CREATE: '/news',
    UPDATE: (id: number) => `/news/${id}`,
    DELETE: (id: number) => `/news/${id}`,
  },

  // User news endpoints (/api/user-news) - Requires authentication
  USER_NEWS: {
    GET_ALL: '/user-news',
    GET_BY_TICKER: (ticker: string) => `/user-news/ticker/${ticker}`,
    CREATE: '/user-news',
    UPDATE: (id: number) => `/user-news/${id}`,
    DELETE: (id: number) => `/user-news/${id}`,
  },

  // Favorites endpoints (/api/favorites) - Requires authentication
  FAVORITES: {
    GET_ALL: '/favorites',
    ADD: (ticker: string) => `/favorites/${ticker}`,
    REMOVE: (ticker: string) => `/favorites/${ticker}`,
    CHECK: (ticker: string) => `/favorites/check/${ticker}`,
  },

  // Admin endpoints (/api/admin) - Requires admin role
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    COMPANIES: '/admin/companies',
    COMPANY_BY_ID: (id: number) => `/admin/companies/${id}`,
    CREATE_COMPANY: '/admin/companies',
    UPDATE_COMPANY: (id: number) => `/admin/companies/${id}`,
    DELETE_COMPANY: (id: number) => `/admin/companies/${id}`,
    ADD_NEWS_TO_COMPANY: (companyId: number) => `/admin/companies/${companyId}/news`,
    UPDATE_NEWS: (id: number) => `/admin/news/${id}`,
    DELETE_NEWS: (id: number) => `/admin/news/${id}`,
  },
} as const;
