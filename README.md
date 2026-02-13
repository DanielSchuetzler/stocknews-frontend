# StockNewsPulse React Frontend

Modernes React Frontend mit TypeScript, Vite, und TanStack Query für die StockNewsPulse Anwendung.

## 🎯 Projektübersicht

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (Blitzschnell!)
- **State Management**: Zustand (leichtgewichtig)
- **Data Fetching**: TanStack Query (Caching + Server State)
- **Routing**: React Router v6
- **Charts**: Chart.js + react-chartjs-2
- **SEO**: React Helmet Async (Dynamic Meta Tags)

## 🏗️ Architektur - Feature-Sliced Design

```
src/
├── app/                     # App-Setup & Provider
├── shared/                  # Wiederverwendbare Basis
│   ├── api/                # Axios Client + Endpoints
│   ├── types/              # TypeScript Types (matchen Backend DTOs)
│   ├── hooks/              # Custom Hooks (useDebounce, etc.)
│   ├── components/         # Basis UI Components
│   └── utils/              # Formatters, Helpers
├── entities/               # Business Entities
│   ├── auth/              # Auth API + Store
│   ├── stock/             # Stock Data + Chart Component
│   ├── company/           # Company API + Components
│   ├── news/              # News API + Components
│   ├── favorite/          # Favorites API + Components
│   └── userNews/          # User News API + Components
├── features/              # Feature-spezifische Logik
│   ├── auth/             # Login/Register Forms
│   ├── company-search/   # Autocomplete Search
│   ├── stock-detail/     # Stock Detail Sections
│   └── favorites-dashboard/  # Favorites Table
└── pages/                # Page Components
    ├── HomePage.tsx
    ├── StockDetailPage.tsx
    ├── DashboardPage.tsx
    └── ...
```

## 📦 Erstellte Dateien

### ✅ Basis-Setup
- `package.json` - Dependencies (React, Vite, TanStack Query, Chart.js, etc.)
- `tsconfig.json` - TypeScript Konfiguration
- `vite.config.ts` - Vite Config mit Proxy zu Spring Backend
- `.env.development` - Dev Environment Variables
- `.env.production` - Prod Environment Variables

### ✅ TypeScript Types (matchen Backend DTOs exakt)
- `shared/types/auth.ts` - AuthResponse, LoginRequest, RegisterRequest
- `shared/types/stock.ts` - StockData, StockPrice
- `shared/types/company.ts` - Company, AutocompleteResult
- `shared/types/news.ts` - StockNews, UserNews, UserNewsRequest
- `shared/types/favorite.ts` - FavoriteStats

### ✅ API Client
- `shared/api/client.ts` - Axios mit Session-Handling + Interceptors
- `shared/api/endpoints.ts` - Alle Backend-Endpunkte als Konstanten

### ✅ Utilities
- `shared/utils/formatters.ts` - Date, Currency, Percentage Formatter
- `shared/hooks/useDebounce.ts` - Debounce Hook für Autocomplete

## 🚀 Installation & Start

```bash
cd react-frontend

# Dependencies installieren
npm install

# Development Server starten (Port 5173)
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

## 🔗 Backend-Integration

Der Vite Dev Server proxied alle `/api/*` Requests zu deinem Spring Boot Backend auf Port 8080.

**Development**: `http://localhost:5173` → `/api/*` → `http://localhost:8080/api/*`

**Production**: React Build wird statisch gehostet, API Calls gehen direkt an `/api`

## 🎨 SEO-Strategie für Stock Detail Pages

### Problem
- SPAs haben kein initiales HTML → Google sieht leere Seite
- Stock-Detail-Pages sollen in Google gefunden werden

### Lösung
**React Helmet Async** + **Dynamic Meta Tags**

```tsx
// In StockDetailPage.tsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>{companyName} ({ticker}) - Aktienkurs & News | StockNewsPulse</title>
  <meta name="description" content={`Analyse von ${companyName} (${ticker}): Aktueller Kurs, historische News-Events und deren Einfluss auf den Aktienkurs.`} />

  {/* Open Graph für Social Media */}
  <meta property="og:title" content={`${companyName} Aktienanalyse`} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://stocknewspulse.com/stocks/${ticker}`} />
</Helmet>
```

### Alternative: Pre-rendering (Optional)
Wenn du besseres SEO brauchst, können wir `vite-plugin-ssr` nutzen um statische HTML-Seiten für Top-Aktien zu generieren.

## 📋 Nächste Schritte

### 1. Auth System implementieren (Priorität: Hoch)
```bash
# Erstelle:
- src/entities/auth/api.ts          # Login/Register/Logout API Calls
- src/entities/auth/store.ts        # Zustand Store für User State
- src/entities/auth/queries.ts      # TanStack Query Hooks
- src/features/auth/LoginForm.tsx   # Login Form Component
- src/features/auth/RegisterForm.tsx # Register Form
- src/features/auth/ProtectedRoute.tsx # Route Guard
```

### 2. Stock Detail Page (Priorität: Hoch)
```bash
# Erstelle:
- src/entities/stock/api.ts         # Stock Data API
- src/entities/stock/queries.ts     # useStockData Hook
- src/entities/stock/StockChart.tsx # Chart.js Integration
- src/pages/StockDetailPage.tsx     # Hauptseite mit SEO
```

### 3. Autocomplete Search (Priorität: Mittel)
```bash
- src/entities/company/api.ts       # Autocomplete API
- src/entities/company/queries.ts   # useAutocomplete Hook
- src/features/company-search/CompanyAutocomplete.tsx
```

### 4. Dashboard & Favorites (Priorität: Mittel)
```bash
- src/entities/favorite/api.ts
- src/entities/favorite/queries.ts
- src/features/favorites-dashboard/FavoritesList.tsx
- src/pages/DashboardPage.tsx
```

### 5. Shared Components (Parallel)
```bash
- src/shared/components/Button.tsx
- src/shared/components/Input.tsx
- src/shared/components/Card.tsx
- src/shared/components/LoadingSpinner.tsx
- src/shared/components/Modal.tsx
```

## 🎯 Features aus altem Frontend

### ✅ Müssen migriert werden:
1. **Homepage** mit Hero, Stats, Social Proof
2. **Stock Search** mit Autocomplete
3. **Stock Detail Page**:
   - Stock Info Header
   - Chart mit News Markers
   - Time Range Filter (1J, 3J, 5J, 10J)
   - Zoom/Pan Funktionalität
   - News List mit Sentiment
   - News hinzufügen (Modal)
   - Favorite Toggle
   - Company Profile Section
4. **Authentication**:
   - Login/Register
   - Session-basiert
   - Protected Routes
5. **Dashboard**:
   - Favorites Table
   - Search/Filter
6. **Admin Panel** (später)

## 🔧 Technische Details

### Session-Based Auth
```typescript
// API Client sendet automatisch Cookies
const apiClient = axios.create({
  withCredentials: true // Wichtig!
});

// Backend erstellt HttpSession, Browser speichert Cookie
// Alle weiteren Requests senden Cookie automatisch mit
```

### TanStack Query Caching
```typescript
// Automatisches Caching + Background Refetch
const { data } = useQuery({
  queryKey: ['stock', ticker],
  queryFn: () => fetchStock(ticker),
  staleTime: 5 * 60 * 1000, // 5 Minuten Cache
});

// Backend hat 6h Cache, Frontend 5min Cache
// = Optimale Performance!
```

### Chart.js Integration
```typescript
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register plugins
Chart.register(...registerables, annotationPlugin, zoomPlugin);
```

## 🎨 Styling

Nutze das bestehende CSS aus `/frontend/css/styles.css` als Basis oder migriere zu:
- **Tailwind CSS** (empfohlen für schnelle Entwicklung)
- **CSS Modules** (scoped styles)
- **Styled Components** (CSS-in-JS)

## 📝 Code-Kommentare Best Practices

✅ **Gute Comments** (erklärt WARUM):
```typescript
// Use debounce to prevent API spam during typing
const debouncedQuery = useDebounce(searchQuery, 300);

// Backend returns sentiment as -1/0/1, convert to string for display
const sentimentText = sentiment === 1 ? 'Positiv' : 'Negativ';
```

❌ **Schlechte Comments** (erklärt WAS - ist offensichtlich):
```typescript
// Set loading to true
setLoading(true);

// Call API
await api.get('/stocks');
```

## 🐛 Debugging

```bash
# React DevTools
# TanStack Query DevTools (automatisch in Dev Mode)
# Redux DevTools (für Zustand Store)

# API Requests werden in Console geloggt:
# [API Request] GET /stocks/AAPL
# [API Response] /stocks/AAPL 200
```

## 📚 Weitere Ressourcen

- [Vite Docs](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Chart.js](https://www.chartjs.org/)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

**Status**: ✅ Basis-Setup komplett | 🚧 Features werden migriert

**Nächster Schritt**: `npm install` und dann Auth-System implementieren!
