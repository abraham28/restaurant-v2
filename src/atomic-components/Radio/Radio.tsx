import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Radio.module.scss';
import { RadioProps } from './types';

const Radio: React.FC<RadioProps> = ({
  value,
  onChange,
  options,
  className = '',
  disabled = false,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const displayValue = value || placeholder;

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
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
                className={`${styles.radioOption} ${
                  isSelected ? styles.selected : ''
                }`}
              >
                <span className={styles.radioText}>{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Radio;
