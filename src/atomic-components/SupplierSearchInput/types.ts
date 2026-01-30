export interface BaseSupplier {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface SupplierSearchInputProps {
  suppliers: BaseSupplier[];
  value: string;
  onChange: (supplierId: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
