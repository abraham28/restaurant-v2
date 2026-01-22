import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchInput.module.scss';

export interface SearchInputItem {
  id: string;
}

export interface SearchInputProps<T extends SearchInputItem> {
  items: T[];
  value: string;
  onChange: (itemId: string) => void;
  getDisplayValue: (item: T) => string;
  getSearchText?: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  excludeIds?: string[];
  filter?: (item: T) => boolean;
  emptyMessage?: string;
}

function SearchInput<T extends SearchInputItem>({
  items,
  value,
  onChange,
  getDisplayValue,
  getSearchText,
  renderItem,
  placeholder = 'Search...',
  required = false,
  disabled = false,
  excludeIds = [],
  filter,
  emptyMessage = 'No results found',
}: SearchInputProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Find selected item
  const selectedItem = items.find((item) => item.id === value);

  // Filter items
  const filteredItems = items.filter((item) => {
    // Exclude items in excludeIds
    if (excludeIds.includes(item.id)) {
      return false;
    }

    // Apply custom filter if provided
    if (filter && !filter(item)) {
      return false;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchText = getSearchText
        ? getSearchText(item).toLowerCase()
        : getDisplayValue(item).toLowerCase();
      return searchText.includes(query);
    }

    return true;
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
    if (!value) {
      setSearchQuery('');
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpen(true);
    setHighlightedIndex(-1);

    // Clear selection if user is typing
    if (value && selectedItem && query !== getDisplayValue(selectedItem)) {
      onChange('');
    }
  };

  // Handle item selection
  const handleSelect = (itemId: string) => {
    onChange(itemId);
    setSearchQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle clear button
  const handleClear = () => {
    onChange('');
    setSearchQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredItems.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
          handleSelect(filteredItems[highlightedIndex].id);
        } else if (filteredItems.length === 1) {
          handleSelect(filteredItems[0].id);
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

  // Display value: show item display value if selected, otherwise show search query
  const displayValue = selectedItem
    ? getDisplayValue(selectedItem)
    : searchQuery;

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
      {isOpen && (
        <div className={styles.suggestions}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`${styles.suggestionItem} ${
                  index === highlightedIndex ? styles.highlighted : ''
                }`}
              >
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <span className={styles.itemText}>
                    {getDisplayValue(item)}
                  </span>
                )}
              </button>
            ))
          ) : (
            <div className={styles.emptyMessage}>{emptyMessage}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
