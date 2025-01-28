// components/DetailsSection.tsx
import { ReactNode } from 'react';

interface DetailsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const DetailsSection = ({
  title,
  children,
  className = ''
}: DetailsSectionProps) => {
  return (
    <div className={`border-b border-gray-200 pb-6 mb-6 ${className}`}>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};