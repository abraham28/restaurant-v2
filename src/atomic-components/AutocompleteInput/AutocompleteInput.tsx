import React, { useState, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useClickOutside } from 'hooks/useClickOutside';
import { useDropdownNavigation } from 'hooks/useDropdownNavigation';
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

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter((suggestion) => {
    if (!searchQuery.trim()) return true;
    return suggestion.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
