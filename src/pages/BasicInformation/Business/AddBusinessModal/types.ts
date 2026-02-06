import { BusinessFormData } from '../types';

export interface AddBusinessModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: (data: BusinessFormData) => void;
  onError?: (message: string) => void;
  /** When set, modal opens in edit mode with this data pre-filled */
  initialData?: BusinessFormData | null;
}

export interface BusinessFormErrors {
  companyEmployerName?: string;
  tin?: string;
  primaryAddress?: string;
  primaryContact?: string;
}
