import React from 'react';
import { ChevronDown, Filter, RotateCcw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

type FilterOption = {
  label: string;
  value: string;
};

type UserFilterProps = {
  onFilterChange?: (filterType: string, value: string) => void;
  onResetFilters?: () => void;
  nameOptions?: FilterOption[];
  dateOptions?: FilterOption[];
  townOptions?: FilterOption[];
  typeOptions?: FilterOption[];
  statusOptions?: FilterOption[];
};

const UserFilter: React.FC<UserFilterProps> = ({
  onFilterChange,
  onResetFilters,
  nameOptions = [],
  dateOptions = [],
  townOptions = [],
  typeOptions = [],
  statusOptions = [],
}) => {
  return (
    <div className="w-full h-fit px-3 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        {/* Filter Icon and Text */}
        <div className="flex items-center gap-2 p-3 text-neutral-500">
          <Image src={"/icons/filter.svg"} alt={"finance icon"} width={"24"} height={24} className='size-6'/>
          <div className='w-2 h-10 border-r'></div>
          <span className="text-sm font-bold">Filter By</span>
        </div>

        {/* Filter Options */}
        <div className="flex-1 flex items-center space-x-4">
          {/* Name Filter */}
          <div className="relative py-2">
            <button className="flex items-center font-bold gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:bg-gray-50 rounded-md">
              Name
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <div className='w-2 h-10 border-r'></div>

          {/* Date Filter */}
          <div className="relative py-2">
            <button className="flex items-center font-bold gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:bg-gray-50 rounded-md">
              Date
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <div className='w-2 h-10 border-r'></div>


          {/* Town Filter */}
          <div className="relative py-2">
            <button className="flex items-center font-bold gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:bg-gray-50 rounded-md">
              Town
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <div className='w-2 h-10 border-r'></div>


          {/* Type Filter */}
          <div className="relative py-2">
            <button className="flex items-center font-bold gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:bg-gray-50 rounded-md">
              Type
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <div className='w-2 h-10 border-r'></div>


          {/* Status Filter */}
          <div className="relative py-2">
            <button className="flex items-center font-bold gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:bg-gray-50 rounded-md">
              Status
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-md"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default UserFilter