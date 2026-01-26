export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  /** The numeric value */
  value: number | undefined;
  /** Callback when value changes, receives the parsed number */
  onChange: (value: number) => void;
  /** Whether to parse as decimal (float) or integer. Default: false (integer) */
  decimal?: boolean;
  /** Minimum value (for validation, not enforced on input) */
  min?: number;
  /** Maximum value (for validation, not enforced on input) */
  max?: number;
}
