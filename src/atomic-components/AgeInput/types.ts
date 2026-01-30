export interface AgeInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  /** The age value (number) */
  value: number | undefined;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS class name */
  className?: string;
}
