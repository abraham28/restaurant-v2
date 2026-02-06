import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './DatePicker.module.scss';
import { DatePickerProps } from './types';

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Select date',
  disabled = false,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Sync calendar month with selected date when value changes
  useEffect(() => {
    if (value) {
      setCalendarMonth(new Date(value));
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
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
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

  // Get year range for picker
  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Navigate calendar month
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCalendarMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Select date
  const selectDate = (day: number) => {
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
    const today = new Date();
    const cellDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    return today.toDateString() === cellDate.toDateString();
  };

  // Check if date is selected
  const isSelected = (day: number): boolean => {
    if (!value) return false;
    const selectedDate = new Date(value);
    const cellDate = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    return selectedDate.toDateString() === cellDate.toDateString();
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

  return (
    <div
      className={`${styles.dateInputWrapper} ${className}`}
      ref={datePickerRef}
    >
      <div
        className={`${styles.customDateInput} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsDatePickerOpen(!isDatePickerOpen)}
      >
        <Calendar size={18} className={styles.calendarIcon} />
        <span className={styles.dateDisplay}>
          {value ? formatDate(value) : placeholder}
        </span>
      </div>

      {!disabled && isDatePickerOpen && (
        <div className={styles.datePickerDropdown}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.calendarNavButton}
              onClick={() => navigateMonth('prev')}
              aria-label="Previous month"
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
              aria-label="Next month"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {showMonthPicker && (
            <div className={styles.monthPicker}>
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  className={`${styles.monthPickerItem} ${
                    index === calendarMonth.getMonth()
                      ? styles.monthPickerItemActive
                      : ''
                  }`}
                  onClick={() => selectMonth(index)}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
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
            {getCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`${styles.calendarDay} ${
                  day === null ? styles.emptyDay : ''
                } ${day !== null && isToday(day) ? styles.today : ''} ${
                  day !== null && isSelected(day) ? styles.selected : ''
                }`}
                onClick={() => day !== null && selectDate(day)}
              >
                {day}
              </div>
            ))}
          </div>

          <div className={styles.calendarQuickActions}>
            <button
              type="button"
              className={styles.quickActionButton}
              onClick={() => {
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth() + 1; // getMonth() returns 0-11
                const day = today.getDate();
                const todayString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                onChange(todayString);
                setCalendarMonth(today);
                setIsDatePickerOpen(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
