# E2E Tests mit Playwright

Diese End-to-End-Tests validieren kritische User Flows in echten Browsern.

## Test-Architektur

Basierend auf Best Practices 2026:

- **Vitest**: Unit & Component Tests (schnelles Feedback während Entwicklung)
- **Playwright**: E2E Tests (vollständige User Flows in echten Browsern)

## Test-Suites

### 01-auth.spec.ts
Authentifizierungs-Flow:
- Registrierung neuer User
- Login mit bestehenden Credentials
- Fehlerbehandlung bei falschen Login-Daten
- Logout-Funktionalität
- Session-Persistenz nach Page Refresh

### 02-stock-search.spec.ts
Aktiensuche & Detail-Ansicht:
- Autocomplete-Suche
- Navigation zur Stock-Detail-Seite
- Chart-Darstellung
- News-Anzeige
- Zeitraum-Umschaltung

### 03-user-news.spec.ts
User News Management (CSRF-Validierung!):
- Erstellen von User News mit CSRF-Token
- Bearbeiten bestehender News
- Löschen von News
- Validierung der Backend-Integration

### 04-favorites.spec.ts
Favoriten-Verwaltung:
- Hinzufügen von Aktien zu Favoriten
- Entfernen von Favoriten
- Persistenz nach Logout/Login

## Tests ausführen

```bash
# Alle Tests ausführen (headless)
npm run test:e2e

# Tests mit UI Mode (interaktiv)
npm run test:e2e:ui

# Tests mit sichtbarem Browser
npm run test:e2e:headed

# Debug Mode (Schritt-für-Schritt)
npm run test:e2e:debug
```

## Voraussetzungen

1. Backend muss laufen: `http://localhost:8080`
2. Frontend Dev-Server wird automatisch gestartet

## CI/CD Integration

In der Pipeline:
- Tests laufen headless
- 2 Retries bei Fehlern
- HTML-Report wird generiert
- Screenshots bei Fehlern

## Test-Daten

Tests verwenden dynamische User-Credentials mit Timestamps, um Konflikte zu vermeiden:
```typescript
const testUser = {
  username: `testuser_${Date.now()}`,
  email: `testuser_${Date.now()}@example.com`,
  password: 'TestPassword123!',
};
```

## Debugging

Bei Fehlern:
1. `npm run test:e2e:headed` - Browser sichtbar
2. `npm run test:e2e:debug` - Schritt-für-Schritt
3. Check Screenshots in `test-results/`
4. Check Traces in `test-results/` (bei Retries)

## Best Practices befolgt

✅ Playwright für E2E (echte Browser)
✅ TypeScript für Type-Safety
✅ Parallele Ausführung für Geschwindigkeit
✅ Klare Trennung: E2E testet User Flows, nicht Component-Details
✅ Vermeidung von Duplikation zwischen Unit- und E2E-Tests

## Quellen

- [Vitest vs Playwright - BrowserStack](https://www.browserstack.com/guide/vitest-vs-playwright)
- [Modern Frontend Testing - Defined Networking](https://www.defined.net/blog/modern-frontend-testing/)
- [NextJS Testing Guide - Strapi](https://strapi.io/blog/nextjs-testing-guide-unit-and-e2e-tests-with-vitest-and-playwright)
