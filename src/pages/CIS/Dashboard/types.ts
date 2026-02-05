import type { CifClientDocument } from 'types/cifClient';

/** Client record with id for dashboard/listing */
export interface DashboardClient extends CifClientDocument {
  /** Client unique identifier */
  id: string;
}

/** Loan record for a client account */
export interface ClientLoan {
  /** Client id this loan belongs to */
  clientId: string;
  /** Outstanding loan amount */
  amount: number;
}

/** One year in milliseconds (for inactive validation) */
export const INACTIVE_THRESHOLD_MS = 365 * 24 * 60 * 60 * 1000;

/** Thirty days in milliseconds */
export const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
