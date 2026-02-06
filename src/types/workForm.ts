/**
 * Work / Financial Information form data
 */
export interface WorkFormData {
  occupation: string;
  occupationStatus: string;
  positionJobTitle: string;
  dateEmployedBusinessStartedRetired: string;
  employerName: string;
  tin: string;
  address: string;
  contactPerson: string;
  employerBusinessActivity: string;
  employerIndustry: string;
  contactNo: string;
  salaryIndicator: string;
  sourceOfFundWealth: string;
  salary: string;
  grossIncome: string;
  otherIncome: string;
  otherIncomeSource: string;
  otherIncomeSourceAmount: string;
}

/**
 * Saved work entry (one row in the list)
 */
export interface WorkEntry extends WorkFormData {
  id: string;
}

export const initialWorkFormData: WorkFormData = {
  occupation: '',
  occupationStatus: '',
  positionJobTitle: '',
  dateEmployedBusinessStartedRetired: '',
  employerName: '',
  tin: '',
  address: '',
  contactPerson: '',
  employerBusinessActivity: '',
  employerIndustry: '',
  contactNo: '',
  salaryIndicator: '',
  sourceOfFundWealth: '',
  salary: '',
  grossIncome: '',
  otherIncome: '',
  otherIncomeSource: '',
  otherIncomeSourceAmount: '',
};
