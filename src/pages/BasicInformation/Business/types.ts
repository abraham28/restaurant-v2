/**
 * Business form data - used by Add Business modal and field components.
 */
export interface BusinessFormData {
  companyEmployerName: string;
  tin: string;
  updatedDateTime: string;
  ownerLease: string;
  occupiedSince: string;
  primaryAddress: string;
  secondaryAddress: string;
  primaryContact: string;
  secondaryContact: string;
}

export const initialBusinessFormData: BusinessFormData = {
  companyEmployerName: '',
  tin: '',
  updatedDateTime: '',
  ownerLease: '',
  occupiedSince: '',
  primaryAddress: '',
  secondaryAddress: '',
  primaryContact: '',
  secondaryContact: '',
};

export interface BusinessFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}
