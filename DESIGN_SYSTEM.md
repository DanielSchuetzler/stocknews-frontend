# StockNewsPulse Design System

Globales Design-System basierend auf dem Original-Design mit Dark Theme.

## 🎨 CSS Variables (CSS Custom Properties)

Alle Farben, Abstände und andere Design-Tokens sind als CSS Variables definiert und können überall verwendet werden.

### Colors

```css
/* Primary Colors (Blue Theme) */
--primary-color: #2563eb
--primary-hover: #1d4ed8
--primary-light: #3b82f6
--primary-dark: #1e40af

/* Sentiment Colors */
--success-color: #10b981  /* Green for positive news */
--danger-color: #ef4444   /* Red for negative news */
--warning-color: #f59e0b  /* Amber for warnings */

/* Background (Dark Theme) */
--background: #0f172a
--surface: #1e293b        /* Cards, surfaces */
--surface-light: #334155
--surface-hover: #475569

/* Text */
--text-primary: #f1f5f9   /* Main text */
--text-secondary: #cbd5e1 /* Secondary text */
--text-muted: #94a3b8     /* Muted/disabled text */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)
```

### Spacing

```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
```

### Border Radius

```css
--radius-sm: 0.375rem   /* 6px */
--radius-md: 0.5rem     /* 8px */
--radius-lg: 0.75rem    /* 12px */
--radius-xl: 1rem       /* 16px */
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.5)
```

## 📦 Vordefinierte Component Classes

### Cards

```tsx
// Basic card
<div className="card">Content</div>

// Card with hover effect
<div className="card-hover">Content</div>

// Using CSS variables directly
<div style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-lg)' }}>
  Content
</div>
```

### Buttons

```tsx
// Primary button (blue)
<button className="btn-primary">Speichern</button>

// Secondary button (gray)
<button className="btn-secondary">Abbrechen</button>

// Success button (green)
<button className="btn-success">Bestätigen</button>

// Danger button (red)
<button className="btn-danger">Löschen</button>
```

### Inputs

```tsx
// Input with dark theme styling
<input className="input" placeholder="Text eingeben..." />

// Input with CSS variable colors
<input
  style={{
    background: 'var(--background)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-primary)'
  }}
/>
```

### Badges

```tsx
// Success badge (green)
<span className="badge-success">Positiv</span>

// Danger badge (red)
<span className="badge-danger">Negativ</span>

// Info badge (blue)
<span className="badge-info">Info</span>
```

## 🎭 Utility Classes

### Gradient Text

```tsx
<h1 className="gradient-text">StockNewsPulse</h1>
```

### Glass Effect

```tsx
<div className="glass">Glassmorphism effect</div>
```

### Animations

```tsx
<div className="fade-in">Fades in on mount</div>
<div className="slide-in">Slides in from right</div>
```

### Container

```tsx
<div className="app-container">
  Centered content with max-width 1400px
</div>
```

## 📱 Responsive Breakpoints

```css
/* Mobile (< 640px) */
@media (max-width: 639px) { }

/* Tablet (640px - 1023px) */
@media (min-width: 640px) and (max-width: 1023px) { }

/* Desktop (>= 1024px) */
@media (min-width: 1024px) { }
```

### Responsive Helper Classes (Tailwind)

```tsx
// Hidden on mobile, visible on desktop
<div className="hidden md:block">Desktop only</div>

// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Different padding on different screen sizes
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

## 🎯 Usage Examples

### Example: News Card mit Sentiment

```tsx
const NewsCard = ({ news }) => {
  const isPositive = news.sentiment > 0;

  return (
    <div className="card-hover">
      {/* Sentiment Badge */}
      <span className={isPositive ? 'badge-success' : 'badge-danger'}>
        {isPositive ? '+ Positiv' : '- Negativ'}
      </span>

      {/* Headline */}
      <h3 style={{ color: 'var(--text-primary)' }}>
        {news.headline}
      </h3>

      {/* Summary */}
      <p style={{ color: 'var(--text-secondary)' }}>
        {news.summary}
      </p>
    </div>
  );
};
```

### Example: Button mit Loading State

```tsx
const SubmitButton = ({ isLoading }) => (
  <button
    className="btn-primary"
    disabled={isLoading}
    style={{
      background: isLoading ? 'var(--secondary-color)' : 'var(--primary-color)'
    }}
  >
    {isLoading ? 'Lädt...' : 'Speichern'}
  </button>
);
```

### Example: Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="card">Item 1</div>
  <div className="card">Item 2</div>
  <div className="card">Item 3</div>
</div>
```

## 🌈 Color Usage Guidelines

- **Primary Blue**: Hauptaktionen, Links, wichtige Buttons
- **Success Green**: Positive News, Erfolgs-Meldungen, Kursanstiege
- **Danger Red**: Negative News, Fehler, Kursrückgänge
- **Secondary Gray**: Sekundäre Aktionen, deaktivierte Zustände
- **Text Colors**:
  - `--text-primary`: Haupttext
  - `--text-secondary`: Weniger wichtiger Text
  - `--text-muted`: Platzhalter, deaktivierter Text

## 🎨 Chart.js Theme

Charts verwenden automatisch das Dark Theme:

```typescript
{
  backgroundColor: 'rgba(30, 41, 59, 0.95)', // --surface
  borderColor: '#475569',                     // --border-color
  titleColor: '#f1f5f9',                      // --text-primary
  bodyColor: '#cbd5e1',                       // --text-secondary
}
```

## 📝 Best Practices

1. **Verwende CSS Variables** für Farben statt Hardcoded Hex-Werte
2. **Nutze vordefinierte Classes** (.btn-primary, .card, etc.)
3. **Mobile First**: Schreibe Basis-Styles für Mobile, erweitere für Desktop
4. **Konsistente Abstände**: Verwende --spacing-* Variables
5. **Dark Theme**: Alle Components müssen auf dunklem Hintergrund gut aussehen

## 🔄 Migration von alten Components

```tsx
// ❌ Alt (Hardcoded Colors)
<button style={{ background: '#2563eb', color: 'white' }}>
  Click me
</button>

// ✅ Neu (CSS Variables & Classes)
<button className="btn-primary">
  Click me
</button>
```

---

**Wichtig**: Alle neuen Components sollten diese Design-Tokens verwenden für konsistentes Aussehen!
