import React from 'react';
import styles from './DateFilter.module.scss';
import { DateFilterProps, DateFilterOption, dateFilterLabels } from './types';

function DateFilter({
  dateFilter,
  orderCountsByDate,
  onDateChange,
  className,
  hasUndeliveredOrders,
}: DateFilterProps) {
  const dateOptions: DateFilterOption[] = ['today', 'yesterday', 'all'];

  return (
    <div className={`${styles.filterGroup} ${className || ''}`}>
      <span className={styles.filterLabel}>Date</span>
      <div className={styles.pills}>
        {dateOptions.map((value) => {
          const isActive = dateFilter === value;
          const hasUndelivered = hasUndeliveredOrders?.[value] ?? false;

          return (
            <button
              key={value}
              type="button"
              className={`${styles.pill} ${isActive ? styles.pillActive : ''} ${
                hasUndelivered && !isActive ? styles.pillWarning : ''
              }`}
              onClick={() => onDateChange(value)}
            >
              <span>{dateFilterLabels[value]}</span>
              <span className={styles.pillCount}>
                {orderCountsByDate[value]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DateFilter;
