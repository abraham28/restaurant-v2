import { LucideIcon } from 'lucide-react';

export interface ListButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}
