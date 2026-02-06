import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './DateInput.module.scss';
import { DateInputProps } from './types';
import {
  MONTH_NAMES,
  parseDateInput,
  formatDisplayDate,
  formatISODate,
  generateDateSuggestions,
} from './dateSearchUtils';

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'YYYY-MM-DD',
  disabled = false,
  initialView = 'calendar',
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get today's date (maximum date)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get minimum date (120 years ago)
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 120);
  minDate.setHours(0, 0, 0, 0);

  // Sync input value when prop value changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Sync calendar month with selected date when value changes
  useEffect(() => {
    if (value) {
      // Parse YYYY-MM-DD format to avoid timezone issues
      const [year, month, day] = value.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day); // month is 0-indexed
      if (!isNaN(selectedDate.getTime())) {
        setCalendarMonth(selectedDate);
      }
    } else {
      setCalendarMonth(new Date());
    }
  }, [value]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
        setShowMonthPicker(false);
        setShowYearPicker(false);
        setIsTyping(false);
      }
    };

    if (isDatePickerOpen || isTyping) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDatePickerOpen, isTyping]);

  // Validate date string format (YYYY-MM-DD)
  const isValidDateString = (dateString: string): boolean => {
    if (!dateString) return false;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    // Check if date is valid and matches input
    if (
      isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false;
    }

    // Check if date is within valid range
    date.setHours(0, 0, 0, 0);
    return date >= minDate && date <= today;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    if (rawValue.trim().length > 0) {
      setIsTyping(true);
      setIsDatePickerOpen(false);
    } else {
      setIsTyping(false);
      setIsDatePickerOpen(true);
      onChange('');
      if (initialView === 'year') {
        setShowYearPicker(true);
        setShowMonthPicker(false);
      } else if (initialView === 'month') {
        setShowMonthPicker(true);
        setShowYearPicker(false);
      }
    }
  };

  // Handle input blur - auto-format to YYYY-MM-DD if valid
  const handleInputBlur = () => {
    setIsTyping(false);
    setIsFocused(false);
    if (!inputValue || inputValue.trim() === '') return;

    // If already valid YYYY-MM-DD, keep it
    if (isValidDateString(inputValue)) return;

    // Try to parse and auto-format
    const parsed = parseDateInput(inputValue);
    if (parsed.year && parsed.month && parsed.day) {
      const candidate = new Date(parsed.year, parsed.month - 1, parsed.day);
      candidate.setHours(0, 0, 0, 0);
      if (
        !isNaN(candidate.getTime()) &&
        candidate >= minDate &&
        candidate <= today &&
        candidate.getFullYear() === parsed.year &&
        candidate.getMonth() === parsed.month - 1 &&
        candidate.getDate() === parsed.day
      ) {
        const iso = formatISODate(candidate);
        setInputValue(iso);
        onChange(iso);
        return;
      }
    }

    // If can't parse, revert to last valid value
    setInputValue(value || '');
  };

  // Handle input focus/click - show calendar
  const handleInputFocus = () => {
    setIsFocused(true);
    if (!disabled) {
      if (!isTyping) {
        setIsDatePickerOpen(true);
        if (initialView === 'year') {
          setShowYearPicker(true);
          setShowMonthPicker(false);
        } else if (initialView === 'month') {
          setShowMonthPicker(true);
          setShowYearPicker(false);
        }
      }
    }
  };

  // Select month
  const selectMonth = (monthIndex: number) => {
    setCalendarMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(monthIndex);
      return newDate;
    });
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  // Select year
  const selectYear = (year: number) => {
    setCalendarMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearPicker(false);
    setShowMonthPicker(true);
  };

  // Get year range for picker (from minDate to today)
  const getYearRange = () => {
    const minYear = minDate.getFullYear();
    const maxYear = today.getFullYear();
    const years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }
    return years.reverse(); // Show years from current to past
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Navigate calendar month (with min/max restrictions)
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCalendarMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      // Clamp to min/max dates
      if (newDate > today) {
        return new Date(today);
      }
      if (newDate < minDate) {
        return new Date(minDate);
      }
      return newDate;
    });
  };

  // Check if date is within valid range
  const isDateValid = (day: number): boolean => {
    const cellDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    cellDate.setHours(0, 0, 0, 0);
    return cellDate >= minDate && cellDate <= today;
  };

  // Select date
  const selectDate = (day: number) => {
    if (!isDateValid(day)) return;

    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth() + 1; // getMonth() returns 0-11
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(dateString);
    setInputValue(dateString);
    setIsDatePickerOpen(false);
  };

  // Get calendar days
  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarMonth);
    const days: (number | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Check if date is today
  const isToday = (day: number): boolean => {
    const cellDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    cellDate.setHours(0, 0, 0, 0);
    return today.getTime() === cellDate.getTime();
  };

  // Check if date is selected
  const isSelected = (day: number): boolean => {
    if (!value) return false;
    // Parse YYYY-MM-DD format to avoid timezone issues
    const [year, month, dayFromValue] = value.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, dayFromValue); // month is 0-indexed
    selectedDate.setHours(0, 0, 0, 0);
    const cellDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    cellDate.setHours(0, 0, 0, 0);
    return selectedDate.getTime() === cellDate.getTime();
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate date suggestions based on flexible input
  const dateSuggestions = useMemo(
    () =>
      isTyping && inputValue
        ? generateDateSuggestions(inputValue, minDate, today)
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputValue, isTyping],
  );

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [dateSuggestions]);

  // Select a suggestion
  const selectSuggestion = (iso: string) => {
    onChange(iso);
    setInputValue(iso);
    setIsTyping(false);
    setIsDatePickerOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsTyping(false);
      setIsDatePickerOpen(false);
      setShowMonthPicker(false);
      setShowYearPicker(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
      return;
    }

    if (!isTyping || dateSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < dateSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : dateSuggestions.length - 1,
      );
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (highlightedIndex >= 0 && highlightedIndex < dateSuggestions.length) {
        e.preventDefault();
        selectSuggestion(dateSuggestions[highlightedIndex].iso);
      }
    }
  };

  // Check if navigation buttons should be disabled
  const canNavigatePrev = () => {
    const prevMonth = new Date(calendarMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth >= minDate;
  };

  const canNavigateNext = () => {
    const nextMonth = new Date(calendarMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth <= today;
  };

  return (
    <div
      className={`${styles.dateInputWrapper} ${className}`}
      ref={datePickerRef}
    >
      <div className={styles.customDateInput}>
        <input
          ref={inputRef}
          type="text"
          value={
            !isFocused && value && isValidDateString(value)
              ? (() => {
                  const [y, m, d] = value.split('-').map(Number);
                  return formatDisplayDate(new Date(y, m - 1, d));
                })()
              : inputValue
          }
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          onClick={() => {
            if (!disabled && !isTyping) {
              setIsDatePickerOpen(true);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.dateInput}
          autoComplete="off"
        />
      </div>

      {isTyping && dateSuggestions.length > 0 && !disabled && (
        <div className={styles.suggestionsDropdown}>
          {dateSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.iso}
              className={`${styles.suggestionItem} ${index === highlightedIndex ? styles.suggestionItemActive : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(suggestion.iso);
              }}
            >
              <span className={styles.suggestionDate}>
                {suggestion.display}
              </span>
              <span className={styles.suggestionRaw}>{suggestion.iso}</span>
            </div>
          ))}
        </div>
      )}

      {isDatePickerOpen && !isTyping && !disabled && (
        <div className={styles.datePickerDropdown}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.calendarNavButton}
              onClick={() => navigateMonth('prev')}
              disabled={!canNavigatePrev()}
              aria-label="Previous month"
              style={
                !canNavigatePrev()
                  ? { opacity: 0.5, cursor: 'not-allowed' }
                  : {}
              }
            >
              <ChevronLeft size={14} />
            </button>
            <div className={styles.calendarMonthYearWrapper}>
              <button
                type="button"
                className={styles.calendarMonthYear}
                onClick={() => {
                  setShowMonthPicker(!showMonthPicker);
                  setShowYearPicker(false);
                }}
              >
                {MONTH_NAMES[calendarMonth.getMonth()]}
              </button>
              <button
                type="button"
                className={styles.calendarMonthYear}
                onClick={() => {
                  setShowYearPicker(!showYearPicker);
                  setShowMonthPicker(false);
                }}
              >
                {calendarMonth.getFullYear()}
              </button>
            </div>
            <button
              type="button"
              className={styles.calendarNavButton}
              onClick={() => navigateMonth('next')}
              disabled={!canNavigateNext()}
              aria-label="Next month"
              style={
                !canNavigateNext()
                  ? { opacity: 0.5, cursor: 'not-allowed' }
                  : {}
              }
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {showMonthPicker && (
            <div className={styles.monthPicker}>
              {MONTH_NAMES.map((month, index) => {
                const testDate = new Date(
                  calendarMonth.getFullYear(),
                  index,
                  1,
                );
                const isDisabled = testDate < minDate || testDate > today;
                return (
                  <button
                    key={month}
                    type="button"
                    className={`${styles.monthPickerItem} ${
                      index === calendarMonth.getMonth()
                        ? styles.monthPickerItemActive
                        : ''
                    } ${isDisabled ? styles.disabled : ''}`}
                    onClick={() => !isDisabled && selectMonth(index)}
                    disabled={isDisabled}
                  >
                    {month.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          )}

          {showYearPicker && (
            <div className={styles.yearPicker}>
              {getYearRange().map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`${styles.yearPickerItem} ${
                    year === calendarMonth.getFullYear()
                      ? styles.yearPickerItemActive
                      : ''
                  }`}
                  onClick={() => selectYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          <div className={styles.calendarWeekdays}>
            {weekDays.map((day) => (
              <div key={day} className={styles.weekday}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {getCalendarDays().map((day, index) => {
              const isValid = day !== null && isDateValid(day);
              return (
                <div
                  key={index}
                  className={`${styles.calendarDay} ${
                    day === null ? styles.emptyDay : ''
                  } ${day !== null && isToday(day) ? styles.today : ''} ${
                    day !== null && isSelected(day) ? styles.selected : ''
                  } ${day !== null && !isValid ? styles.disabled : ''}`}
                  onClick={() => day !== null && isValid && selectDate(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;
