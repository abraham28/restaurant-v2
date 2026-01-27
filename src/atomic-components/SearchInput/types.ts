export interface SearchInputItem {
  id: string;
}

export interface SearchInputProps<T extends SearchInputItem> {
  items: T[];
  value: string;
  onChange: (itemId: string) => void;
  getDisplayValue: (item: T) => string;
  getSearchText?: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  excludeIds?: string[];
  filter?: (item: T) => boolean;
  emptyMessage?: string;
}
