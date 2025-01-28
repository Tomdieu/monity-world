// components/KeyValueRow.tsx
import { ReactNode } from 'react';

interface KeyValueRowProps {
  label: string;
  value: ReactNode;
  className?: string;
  valueClassName?: string;
}

export const KeyValueRow = ({
  label,
  value,
  className = '',
  valueClassName = ''
}: KeyValueRowProps) => {
  return (
    <div className={`flex justify-between py-3 ${className}`}>
      <span className="text-gray-600 font-medium">{label}</span>
      <span className={`text-gray-900 ${valueClassName}`}>{value}</span>
    </div>
  );
};