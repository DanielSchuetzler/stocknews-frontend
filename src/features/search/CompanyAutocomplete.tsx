/**
 * Company Autocomplete Search Component
 * EXACT design from original frontend with dark theme
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompanyAutocomplete } from '@/entities/company/queries';

interface CompanyAutocompleteProps {
  placeholder?: string;
  onSelect?: (ticker: string) => void;
  autoFocus?: boolean;
}

export const CompanyAutocomplete: React.FC<CompanyAutocompleteProps> = ({
  placeholder = 'Suche nach Aktien...',
  onSelect,
  autoFocus = false
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch autocomplete results with 300ms debounce
  const { data: results = [], isLoading } = useCompanyAutocomplete(query);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle selection
  const handleSelect = (ticker: string) => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);

    if (onSelect) {
      onSelect(ticker);
    } else {
      navigate(`/stocks/${ticker}`);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        // Submit query as ticker directly
        handleSelect(query.trim().toUpperCase());
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex].ticker);
        } else if (results.length > 0) {
          handleSelect(results[0].ticker);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Update input and show dropdown
  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length >= 2);
    setSelectedIndex(-1);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Search Input */}
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        name="company-search"
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          paddingRight: '2.5rem',
          fontSize: '1rem',
          background: 'var(--background)',
          border: '2px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          outline: 'none',
          transition: 'all 0.2s'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--primary-color)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
          query.length >= 2 && setIsOpen(true);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {/* Search Icon */}
      <svg
        style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '20px',
          height: '20px',
          color: 'var(--text-muted)',
          pointerEvents: 'none'
        }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" strokeWidth="2"/>
        <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Loading Indicator */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          right: '2.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          border: '2px solid var(--surface-light)',
          borderTop: '2px solid var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      )}

      {/* Autocomplete Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-xl)',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          {results.map((result, index) => (
            <div
              key={result.ticker}
              onClick={() => handleSelect(result.ticker)}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                background: selectedIndex === index
                  ? 'var(--surface-hover)'
                  : 'transparent',
                transition: 'background 0.15s',
                borderBottom: index < results.length - 1
                  ? '1px solid var(--border-color)'
                  : 'none'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div>
                  <div style={{
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}>
                    {result.companyName}{' '}
                    <span style={{
                      fontWeight: 400,
                      color: 'var(--text-muted)',
                      fontSize: '0.875rem'
                    }}>
                      ({result.ticker})
                    </span>
                  </div>
                </div>
                {result.exchange && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    padding: '0.25rem 0.5rem',
                    background: 'var(--background)',
                    borderRadius: '4px',
                    flexShrink: 0
                  }}>
                    {result.exchange}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && !isLoading && results.length === 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-xl)',
            padding: '1rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            zIndex: 1000
          }}
        >
          Keine Ergebnisse für "{query}"
        </div>
      )}
    </div>
  );
};
