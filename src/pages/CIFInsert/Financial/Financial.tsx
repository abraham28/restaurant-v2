import React from 'react';
import { Info, Folder } from 'lucide-react';
import TextInput from 'atomic-components/TextInput/TextInput';
import Radio from 'atomic-components/Radio/Radio';
import Checkbox from 'atomic-components/Checkbox/Checkbox';
import NumberInput from 'atomic-components/NumberInput/NumberInput';
import Button from 'atomic-components/Button/Button';
import styles from '../CIFIndividual.module.scss';

interface FormData {
  salaryIndicator: string;
  fundSource: string;
  salary: number;
  grossIncome: number;
  otherIncome: number;
  otherIncomeSource: string;
  otherIncomeSourceAmount: number;
  monthlyAverageIncome: number;
  isLargeExposure: boolean;
  isMicrofinanceBorrower: boolean;
  isRegularLoanBorrower: boolean;
  isComaker: boolean;
  isSavingsAcctDepositor: boolean;
  isCurrentAcctDepositor: boolean;
  isTimeDepositDepositor: boolean;
  isSpecialSavingsDepositor: boolean;
  enforceCreditLimit: boolean;
  originalBalance: number;
  outstandingBalance: number;
  pesonet: number;
  instapay: number;
  mobileWallet: number;
}

interface FinancialTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
  onOpenModal: (title: string) => void;
  salaryIndicatorOptions: string[];
}

function FinancialTab({
  formData,
  onInputChange,
  onOpenModal,
  salaryIndicatorOptions,
}: FinancialTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.financialGrid}>
        {/* FINANCIAL INFORMATION Section - Left Column */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>FINANCIAL INFORMATION</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                Salary Indicator:
                <Info size={14} className={styles.infoIcon} />
              </label>
              <Radio
                value={formData.salaryIndicator}
                onChange={(value) => onInputChange('salaryIndicator', value)}
                options={salaryIndicatorOptions}
                placeholder="Select salary indicator"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Fund Source:</label>
              <div className={styles.inputWithIcons}>
                <TextInput
                  value={formData.fundSource}
                  onChange={(value) => onInputChange('fundSource', value)}
                  placeholder="Enter fund source"
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconOnly
                  onClick={() => onOpenModal('Fund Source List')}
                  aria-label="Open fund source list"
                >
                  <Folder size={14} />
                </Button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Salary:</label>
              <NumberInput
                value={formData.salary}
                onChange={(value) => onInputChange('salary', value)}
                placeholder="0.00"
                decimal
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Gross Income:</label>
              <NumberInput
                value={formData.grossIncome}
                onChange={(value) => onInputChange('grossIncome', value)}
                placeholder="0.00"
                decimal
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Other Income:</label>
              <NumberInput
                value={formData.otherIncome}
                onChange={(value) => onInputChange('otherIncome', value)}
                placeholder="0.00"
                decimal
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Other Income Source:</label>
              <TextInput
                value={formData.otherIncomeSource}
                onChange={(value) => onInputChange('otherIncomeSource', value)}
                placeholder="Enter other income source"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Other Income Source Amount:
              </label>
              <NumberInput
                value={formData.otherIncomeSourceAmount}
                onChange={(value) =>
                  onInputChange('otherIncomeSourceAmount', value)
                }
                placeholder="0.00"
                decimal
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Monthly Average Income:</label>
              <NumberInput
                value={formData.monthlyAverageIncome}
                onChange={(value) =>
                  onInputChange('monthlyAverageIncome', value)
                }
                placeholder="0.00"
                decimal
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                checked={formData.isLargeExposure}
                onChange={(checked) =>
                  onInputChange('isLargeExposure', checked)
                }
                label="Is Large Exposure?"
              />
            </div>
          </div>
        </div>

        {/* Middle Column: Loans, Savings, Time Deposit */}
        <div className={styles.section}>
          {/* Loans Section */}
          <h3 className={styles.sectionTitle}>Loans</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isMicrofinanceBorrower}
                onChange={(checked) =>
                  onInputChange('isMicrofinanceBorrower', checked)
                }
                label="Is Microfinance Borrower?"
                disabled
              />
            </div>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isRegularLoanBorrower}
                onChange={(checked) =>
                  onInputChange('isRegularLoanBorrower', checked)
                }
                label="Is Regular Loan Borrower?"
                disabled
              />
            </div>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isComaker}
                onChange={(checked) => onInputChange('isComaker', checked)}
                label="Is Comaker?"
                disabled
              />
            </div>
          </div>

          {/* Savings Section */}
          <h3 className={styles.sectionTitle}>Savings</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isSavingsAcctDepositor}
                onChange={(checked) =>
                  onInputChange('isSavingsAcctDepositor', checked)
                }
                label="Is Savings Acct Depositor?"
                disabled
              />
            </div>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isCurrentAcctDepositor}
                onChange={(checked) =>
                  onInputChange('isCurrentAcctDepositor', checked)
                }
                label="Is Current Acct Depositor?"
                disabled
              />
            </div>
          </div>

          {/* Time Deposit Section */}
          <h3 className={styles.sectionTitle}>Time Deposit</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isTimeDepositDepositor}
                onChange={(checked) =>
                  onInputChange('isTimeDepositDepositor', checked)
                }
                label="Is Time Deposit Depositor?"
                disabled
              />
            </div>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isSpecialSavingsDepositor}
                onChange={(checked) =>
                  onInputChange('isSpecialSavingsDepositor', checked)
                }
                label="Is Special Savings Depositor?"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Right Column: Credit Line, Daily OTC IBFT Limit Amount */}
        <div className={styles.section}>
          {/* Credit Line Section */}
          <h3 className={styles.sectionTitle}>Credit Line</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.enforceCreditLimit}
                onChange={(checked) =>
                  onInputChange('enforceCreditLimit', checked)
                }
                label="Enforce Credit Limit"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Original Balance:</label>
              <NumberInput
                value={formData.originalBalance}
                onChange={(value) => onInputChange('originalBalance', value)}
                placeholder="0.00"
                decimal
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Outstanding Balance:</label>
              <NumberInput
                value={formData.outstandingBalance}
                onChange={(value) => onInputChange('outstandingBalance', value)}
                placeholder="0.00"
                decimal
              />
            </div>
          </div>

          {/* Daily OTC IBFT Limit Amount Section */}
          <h3 className={styles.sectionTitle}>Daily OTC IBFT Limit Amount</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>PESONet:</label>
              <NumberInput
                value={formData.pesonet}
                onChange={(value) => onInputChange('pesonet', value)}
                placeholder=""
                decimal
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>InstaPay:</label>
              <NumberInput
                value={formData.instapay}
                onChange={(value) => onInputChange('instapay', value)}
                placeholder=""
                decimal
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Mobile Wallet:</label>
              <NumberInput
                value={formData.mobileWallet}
                onChange={(value) => onInputChange('mobileWallet', value)}
                placeholder=""
                decimal
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialTab;
