import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
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
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter((suggestion) => {
    if (!searchQuery.trim()) return true;
    return suggestion.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

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
    setHighlightedIndex(-1);
  };

  // Handle suggestion selection
  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setSearchQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredSuggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return;
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(filteredSuggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle blur
  const handleBlur = () => {
    // Delay to allow click events on suggestions to fire
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
      setSearchQuery('');
      onBlur?.();
    }, 200);
  };

  const displayValue = isOpen ? searchQuery : value;

  return (
    <div ref={containerRef} className={styles.container}>
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
