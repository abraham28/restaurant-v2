import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './BirthdateInput.module.scss';

export interface BirthdateInputProps {
  value: string; // Date in YYYY-MM-DD format
  onChange: (date: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const BirthdateInput: React.FC<BirthdateInputProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Select birthdate',
  disabled = false,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Get today's date (maximum date)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get minimum date (120 years ago)
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 120);
  minDate.setHours(0, 0, 0, 0);

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
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDatePickerOpen]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    // Parse YYYY-MM-DD format to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Select month
  const selectMonth = (monthIndex: number) => {
    setCalendarMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(monthIndex);
      return newDate;
    });
    setShowMonthPicker(false);
  };

  // Select year
  const selectYear = (year: number) => {
    setCalendarMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearPicker(false);
  };

  // Get year range for picker (from minDate to today)
  const getYearRange = () => {
    const minYear = minDate.getFullYear();
    const maxYear = today.getFullYear();
    const years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }
    return years; // Show years from lowest to highest
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

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      <div
        className={styles.customDateInput}
        onClick={() => !disabled && setIsDatePickerOpen(!isDatePickerOpen)}
        style={disabled ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
      >
        <Calendar size={18} className={styles.calendarIcon} />
        <span className={styles.dateDisplay}>
          {value ? formatDate(value) : placeholder}
        </span>
      </div>

      {isDatePickerOpen && !disabled && (
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
                {monthNames[calendarMonth.getMonth()]}
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
              {monthNames.map((month, index) => {
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

export default BirthdateInput;
