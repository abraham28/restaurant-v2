import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useClickOutside } from 'hooks/useClickOutside';
import { useDropdownNavigation } from 'hooks/useDropdownNavigation';
import { minSubstringDistance } from 'utils/fuzzySearch';
import styles from './AutocompleteInput.module.scss';
import { AutocompleteInputProps } from './types';

function AutocompleteInput({
  value,
  onChange,
  suggestions,
  placeholder = 'Type to search...',
  required = false,
  disabled = false,
  onBlur,
  width = '100%',
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuzzy filter and sort suggestions based on search query
  const filteredSuggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return suggestions;

    // Allow 1 typo per 4 characters, minimum 1
    const maxDistance = Math.max(1, Math.floor(query.length / 4));

    return suggestions
      .map((suggestion) => {
        const target = suggestion.toLowerCase();
        const exactContains = target.includes(query);
        const distance = exactContains
          ? 0
          : minSubstringDistance(query, target);
        return { suggestion, distance, exactContains };
      })
      .filter(({ distance }) => distance <= maxDistance)
      .sort((a, b) => {
        // Exact contains first, then by distance
        if (a.exactContains !== b.exactContains)
          return a.exactContains ? -1 : 1;
        return a.distance - b.distance;
      })
      .map(({ suggestion }) => suggestion);
  }, [searchQuery, suggestions]);

  // Handle suggestion selection
  const handleSelect = useCallback(
    (suggestion: string) => {
      onChange(suggestion);
      setSearchQuery('');
      setIsOpen(false);
      inputRef.current?.blur();
    },
    [onChange],
  );

  // Close dropdown when clicking outside
  useClickOutside(
    containerRef,
    () => {
      setIsOpen(false);
    },
    isOpen,
  );

  // Handle dropdown navigation
  const {
    highlightedIndex,
    handleKeyDown: handleDropdownKeyDown,
    resetHighlight,
  } = useDropdownNavigation({
    itemCount: filteredSuggestions.length,
    isOpen,
    onSelect: (index) => {
      handleSelect(filteredSuggestions[index]);
    },
    onClose: () => {
      setIsOpen(false);
      inputRef.current?.blur();
    },
  });

  // Handle input focus
  const handleFocus = () => {
    setIsOpen(true);
    setSearchQuery(value);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onChange(newValue);
    setIsOpen(true);
    resetHighlight();
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
    setIsOpen(false);
    resetHighlight();
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleDropdownKeyDown(e);
  };

  // Handle blur
  const handleBlur = () => {
    // Delay to allow click events on suggestions to fire
    setTimeout(() => {
      setIsOpen(false);
      resetHighlight();
      setSearchQuery('');
      onBlur?.();
    }, 200);
  };

  const displayValue = isOpen ? searchQuery : value;

  return (
    <div ref={containerRef} className={styles.container} style={{ width }}>
      <div className={styles.inputWrapper}>
        <Search size={16} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={styles.input}
          autoComplete="off"
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear selection"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {isOpen && filteredSuggestions.length > 0 && (
        <div className={styles.suggestions}>
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className={`${styles.suggestionItem} ${
                index === highlightedIndex ? styles.highlighted : ''
              }`}
            >
              <span className={styles.itemText}>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteInput;
