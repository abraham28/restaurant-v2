export interface RadioProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}
