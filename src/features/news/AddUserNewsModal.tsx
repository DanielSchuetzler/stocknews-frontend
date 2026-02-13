/**
 * Add User News Modal
 * EXACT design from original frontend with dark theme
 */

import { useState } from 'react';

interface AddUserNewsModalProps {
  ticker: string;
  onClose: () => void;
  onSubmit: (data: {
    date: string;
    headline: string;
    summary: string;
    sentiment: number;
    url?: string;
  }) => void;
  isSubmitting: boolean;
  initialData?: {
    id?: number;
    date: string;
    headline: string;
    summary: string;
    sentiment: number;
    url?: string;
  };
}

export const AddUserNewsModal: React.FC<AddUserNewsModalProps> = ({
  onClose,
  onSubmit,
  isSubmitting,
  initialData
}) => {
  const [formData, setFormData] = useState({
    date: initialData?.date || new Date().toISOString().split('T')[0],
    headline: initialData?.headline || '',
    summary: initialData?.summary || '',
    sentiment: initialData?.sentiment !== undefined ? initialData.sentiment : 0, // Default to 0 (negativ)
    url: initialData?.url || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            {initialData ? 'News bearbeiten' : 'Eigene News hinzufügen'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Date */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Datum <span style={{ color: 'var(--danger-color)' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="input"
              style={{ width: '100%' }}
            />
          </div>

          {/* Headline */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Überschrift <span style={{ color: 'var(--danger-color)' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              required
              placeholder="z.B. Quartalszahlen übertreffen Erwartungen"
              autoComplete="off"
              name="news-headline"
              className="input"
              style={{ width: '100%' }}
            />
          </div>

          {/* Summary */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Zusammenfassung <span style={{ color: 'var(--danger-color)' }}>*</span>
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              required
              placeholder="Kurze Beschreibung des Events..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--background)',
                border: '2px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Sentiment */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              Sentiment <span style={{ color: 'var(--danger-color)' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, sentiment: 1 })}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: formData.sentiment === 1 ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface)',
                  border: `2px solid ${formData.sentiment === 1 ? 'var(--success-color)' : 'var(--border-color)'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  color: formData.sentiment === 1 ? 'var(--success-color)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                {formData.sentiment === 1 && '✓ '}+ Positiv
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, sentiment: 0 })}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: formData.sentiment === 0 ? 'rgba(239, 68, 68, 0.15)' : 'var(--surface)',
                  border: `2px solid ${formData.sentiment === 0 ? 'var(--danger-color)' : 'var(--border-color)'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  color: formData.sentiment === 0 ? 'var(--danger-color)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                {formData.sentiment === 0 && '✓ '}- Negativ
              </button>
            </div>
          </div>

          {/* URL (optional) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              URL (optional)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
              autoComplete="url"
              name="news-url"
              className="input"
              style={{ width: '100%' }}
            />
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? (initialData ? 'Wird aktualisiert...' : 'Wird hinzugefügt...')
                : (initialData ? 'News aktualisieren' : 'News hinzufügen')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
