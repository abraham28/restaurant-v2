export interface DatePickerProps {
  value: string; // Date in YYYY-MM-DD format
  onChange: (date: string) => void;
  className?: string;
  placeholder?: string;
}
