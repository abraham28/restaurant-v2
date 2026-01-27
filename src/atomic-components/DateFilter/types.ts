export interface DateFilterProps {
  dateFilter: DateFilterOption;
  orderCountsByDate: Record<DateFilterOption, number>;
  onDateChange: (date: DateFilterOption) => void;
  className?: string;
  hasUndeliveredOrders?: Record<DateFilterOption, boolean>;
}
export type DateFilterOption = 'today' | 'yesterday' | 'all';

export const dateFilterLabels: Record<DateFilterOption, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  all: 'All time',
};
