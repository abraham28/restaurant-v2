export interface SelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  width?: string;
}
