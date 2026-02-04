import type { ReactNode } from 'react';

export interface MetricCardProps {
  /** Card title (e.g. "Total Inactive Clients") */
  title: string;
  /** Main value to display (e.g. count or formatted amount) */
  value: string | number;
  /** Icon element (e.g. lucide-react icon) */
  icon: ReactNode;
  /** Optional subtext/trend (e.g. "+12% from last month") */
  subtext?: string;
  /** Subtext variant for color (blue, green, red, orange) */
  subtextVariant?: 'blue' | 'green' | 'red' | 'orange';
  /** Optional className for the card container */
  className?: string;
}
