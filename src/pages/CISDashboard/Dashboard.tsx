import React from 'react';
import { Users, UserPlus, AlertTriangle, UserCheck } from 'lucide-react';
import MetricCard from './MetricCard';
import {
  useTotalInactiveClients,
  useNewInLast30Days,
  useHighRiskClients,
  useTotalClient,
} from './hooks';
import { sampleClients } from './sampleData';
import styles from './Dashboard.module.scss';

function Dashboard() {
  const totalAllClients = useTotalInactiveClients(sampleClients);
  const newInLast30Days = useNewInLast30Days(sampleClients);
  const highRiskCount = useHighRiskClients(sampleClients);
  const totalActiveClients = useTotalClient(sampleClients);

  const totalClientsCount = totalAllClients;
  const activePercent =
    totalClientsCount > 0
      ? Math.round((totalActiveClients / totalClientsCount) * 100)
      : 0;

  return (
    <div className={styles.container}>
      <div className={styles.cardsGrid}>
        <MetricCard
          title="Total Clients"
          value={totalAllClients.toLocaleString()}
          icon={<Users size={24} />}
          subtext="+12% from last month"
          subtextVariant="blue"
        />
        <MetricCard
          title="New in Last 30 Days"
          value={newInLast30Days}
          icon={<UserPlus size={24} />}
          subtext="+5 since last week"
          subtextVariant="green"
        />
        <MetricCard
          title="High-Risk Clients"
          value={highRiskCount}
          icon={<AlertTriangle size={24} />}
          subtext="Requires immediate review"
          subtextVariant="red"
        />
        <MetricCard
          title="Active Clients"
          value={totalActiveClients}
          icon={<UserCheck size={24} />}
          subtext={`+${activePercent}% of total Clients`}
          subtextVariant="orange"
        />
      </div>
    </div>
  );
}

export default Dashboard;
