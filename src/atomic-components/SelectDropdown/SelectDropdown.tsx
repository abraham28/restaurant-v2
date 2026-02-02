import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from 'hooks/useClickOutside';
import styles from './SelectDropdown.module.scss';
import { SelectDropdownProps } from './types';

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  value,
  onChange,
  options,
  className = '',
  disabled = false,
  placeholder = 'Select an option',
  width = '100%',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const displayValue = value || placeholder;

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ width }}
    >
      <div
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${
          disabled ? styles.disabled : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={disabled ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
      >
        <span
          className={`${styles.displayValue} ${
            !value ? styles.placeholder : ''
          }`}
        >
          {displayValue}
        </span>
        <ChevronDown
          size={18}
          className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
        />
      </div>

      {isOpen && !disabled && (
        <div className={styles.dropdown}>
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`${styles.dropdownOption} ${
                  isSelected ? styles.selected : ''
                }`}
              >
                <span className={styles.dropdownText}>{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
