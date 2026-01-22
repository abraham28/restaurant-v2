import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SupplierSearchInput.module.scss';

interface BaseSupplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface SupplierSearchInputProps {
  suppliers: BaseSupplier[];
  value: string;
  onChange: (supplierId: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function SupplierSearchInput({
  suppliers,
  value,
  onChange,
  placeholder = 'Search for a supplier...',
  required = false,
  disabled = false,
  loading = false,
}: SupplierSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Find selected supplier
  const selectedSupplier = suppliers.find((s) => s.id === value);

  // Filter suppliers
  const filteredSuppliers = suppliers.filter((supplier) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        supplier.name.toLowerCase().includes(query) ||
        (supplier.email && supplier.email.toLowerCase().includes(query)) ||
        (supplier.phone && supplier.phone.toLowerCase().includes(query))
      );
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
    if (value && query !== selectedSupplier?.name) {
      onChange('');
    }
  };

  // Handle supplier selection
  const handleSelect = (supplierId: string) => {
    onChange(supplierId);
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
    if (!isOpen || filteredSuppliers.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuppliers.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredSuppliers.length
        ) {
          handleSelect(filteredSuppliers[highlightedIndex].id);
        } else if (filteredSuppliers.length === 1) {
          handleSelect(filteredSuppliers[0].id);
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

  // Display value: show supplier name if selected, otherwise show search query
  const displayValue = selectedSupplier ? selectedSupplier.name : searchQuery;

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
      {isOpen && loading && (
        <div className={styles.loadingState}>
          <span className={styles.loadingSpinner} aria-hidden />
          <span>Loading suppliers...</span>
        </div>
      )}
      {isOpen && !loading && filteredSuppliers.length > 0 && (
        <div className={styles.suggestions}>
          {filteredSuppliers.map((supplier, index) => (
            <button
              key={supplier.id}
              type="button"
              onClick={() => handleSelect(supplier.id)}
              className={`${styles.suggestionItem} ${
                index === highlightedIndex ? styles.highlighted : ''
              }`}
            >
              <div className={styles.supplierInfo}>
                <span className={styles.supplierName}>{supplier.name}</span>
                {(supplier.email || supplier.phone) && (
                  <span className={styles.supplierContact}>
                    {supplier.email || supplier.phone}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SupplierSearchInput;
