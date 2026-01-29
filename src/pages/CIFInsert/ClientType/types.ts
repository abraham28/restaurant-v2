export interface ClientTypeProps {
  selectedTypes: {
    individual: boolean;
    company: boolean;
    government: boolean;
    organization: boolean;
  };
  onChange: (type: string, checked: boolean) => void;
}
