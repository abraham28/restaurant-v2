import { useMemo } from 'react';
import type { DashboardClient } from '../types';
import type { ClientLoan } from '../types';
import { INACTIVE_THRESHOLD_MS, THIRTY_DAYS_MS } from '../types';

/**
 * Total count of all clients (inactive + active). Default 0 if no clients.
 */
export function useTotalInactiveClients(clients: DashboardClient[]): number {
  return useMemo(() => {
    if (!clients?.length) return 0;
    return clients.length;
  }, [clients]);
}

/**
 * Total count of clients created in the past 30 days (createdAt >= today - 30 days). Default 0.
 */
export function useNewInLast30Days(clients: DashboardClient[]): number {
  return useMemo(() => {
    if (!clients?.length) return 0;
    const cutoff = Date.now() - THIRTY_DAYS_MS;
    return clients.filter((c) => (c.createdAt ?? 0) >= cutoff).length;
  }, [clients]);
}

/**
 * Count of clients tagged as high risk (RiskRating === 'High'). Default 0.
 */
export function useHighRiskClients(clients: DashboardClient[]): number {
  return useMemo(() => {
    if (!clients?.length) return 0;
    return clients.filter((c) => c.RiskRating?.toLowerCase() === 'high').length;
  }, [clients]);
}

/**
 * Total count of clients with effective active status: ClientStatus === 'Active'
 * and LastClientUpdate within the last 1 year. If inactive for 1 year, not counted here. Default 0.
 */
export function useTotalClient(clients: DashboardClient[]): number {
  return useMemo(() => {
    if (!clients?.length) return 0;
    const cutoff = Date.now() - INACTIVE_THRESHOLD_MS;
    return clients.filter((c) => {
      const isActiveStatus = c.ClientStatus?.toLowerCase() === 'active';
      const lastUpdate = c.LastClientUpdate
        ? new Date(c.LastClientUpdate).getTime()
        : (c.updatedAt ?? c.createdAt ?? 0);
      const activeWithinYear = lastUpdate >= cutoff;
      return isActiveStatus && activeWithinYear;
    }).length;
  }, [clients]);
}

/**
 * Sum of outstanding loan amounts for all client accounts (inactive or active). Default 0.
 */
export function useOutStandingLoanAmount(loans: ClientLoan[]): number {
  return useMemo(() => {
    if (!loans?.length) return 0;
    return loans.reduce((sum, loan) => sum + (loan.amount ?? 0), 0);
  }, [loans]);
}
