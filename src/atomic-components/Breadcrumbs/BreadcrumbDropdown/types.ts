import { BreadcrumbItem } from '../types';

export interface BreadcrumbDropdownProps {
  items: BreadcrumbItem[];
  onItemClick?: () => void;
}
