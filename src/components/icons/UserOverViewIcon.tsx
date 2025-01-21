"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface UserOverviewIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const UserOverviewIcon: React.FC<UserOverviewIconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-4', className)}
      {...props}
    >
      <path
        d="M9.69092 3.38379V8.88379M6.94092 5.44629V8.88379M4.19092 7.50879V8.88379M2.81592 11.6338H11.0659C11.8253 11.6338 12.4409 11.0182 12.4409 10.2588V2.00879C12.4409 1.2494 11.8253 0.633789 11.0659 0.633789H2.81592C2.05653 0.633789 1.44092 1.2494 1.44092 2.00879V10.2588C1.44092 11.0182 2.05653 11.6338 2.81592 11.6338Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserOverviewIcon;

// const UserOverViewIcon = ({ width = "24", height = "24", className }: { color?: string, className?: string, width?: string, height?: string }) => {
//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         d="M9.69092 3.38379V8.88379M6.94092 5.44629V8.88379M4.19092 7.50879V8.88379M2.81592 11.6338H11.0659C11.8253 11.6338 12.4409 11.0182 12.4409 10.2588V2.00879C12.4409 1.2494 11.8253 0.633789 11.0659 0.633789H2.81592C2.05653 0.633789 1.44092 1.2494 1.44092 2.00879V10.2588C1.44092 11.0182 2.05653 11.6338 2.81592 11.6338Z"
//         stroke={"currentColor"}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };
// export default UserOverViewIcon;