"use client"
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fillColor?: string;
  strokeColor?: string;
  size?: number;
}

const ChatIcon: React.FC<ChatIconProps> = ({ 
  className, 
  fillColor = "#B1D3EC",
  strokeColor = "#4094D1",
  size = 24,
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-4', className)}
      {...props}
    >
      <g clipPath="url(#clip0_6804_9670)">
        {/* Background shape with dynamic fill */}
        <path 
          d="M0.856934 2.74051C0.856934 2.10933 1.36861 1.59766 1.99979 1.59766H7.71408C8.34526 1.59766 8.85693 2.10933 8.85693 2.74051V6.16908C8.85693 6.80027 8.34526 7.31194 7.71408 7.31194H5.42836L3.47738 9.26292L3.14265 9.59766V7.31194H1.99979C1.36861 7.31194 0.856934 6.80027 0.856934 6.16908V2.74051Z" 
          fill={fillColor}
        />
        {/* Outline with transparent background and dynamic stroke */}
        <path 
          d="M8.85693 3.88337H9.99979C10.631 3.88337 11.1426 4.39504 11.1426 5.02623V8.4548C11.1426 9.08598 10.631 9.59766 9.99979 9.59766H8.85693V11.8834L6.57122 9.59766H4.2855C3.96991 9.59766 3.6842 9.46974 3.47738 9.26292M3.47738 9.26292L5.42836 7.31194H7.71408C8.34526 7.31194 8.85693 6.80027 8.85693 6.16908V2.74051C8.85693 2.10933 8.34526 1.59766 7.71408 1.59766H1.99979C1.36861 1.59766 0.856934 2.10933 0.856934 2.74051V6.16908C0.856934 6.80027 1.36861 7.31194 1.99979 7.31194H3.14265V9.59766L3.47738 9.26292Z" 
          stroke={strokeColor}
          strokeWidth="0.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="transparent"
        />
      </g>
      <defs>
        <clipPath id="clip0_6804_9670">
          <rect width="12" height="12" fill="white" transform="translate(0 0.240234)"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChatIcon;