"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FilterDropdown from "./FilterDropdown";
import Image from "next/image";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  name: string;
  options: FilterOption[];
}

interface TransactionFilterProps {
  filters: FilterConfig[];
  onFilterChange: (filterName: string, value: string) => void;
  onReset: () => void;
  className?: string;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-2 bg-white rounded-lg border border-gray-100",
        className
      )}
    >
      {/* Filter Icon and Label */}
      <div className="flex items-center gap-2">
        <Image
          src={"/icons/filter.svg"}
          alt={"finance icon"}
          width={"24"}
          height={24}
          className="size-6"
        />
        <span className="text-sm text-gray-600 font-medium">Filter By</span>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex-1 flex items-center gap-4">
        {filters.map((filter, index) => (
          <React.Fragment key={index}>
            <div className="w-1 h-6 border-r"></div>
            <FilterDropdown
              key={filter.name}
              name={filter.name}
              options={filter.options}
              onSelect={(value) => onFilterChange(filter.name, value)}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Reset Button */}
      <Button
        variant="ghost"
        onClick={onReset}
        className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <RotateCcw className="size-4" />
        <span className="text-sm font-medium">Reset Filter</span>
      </Button>
    </div>
  );
};

export default TransactionFilter;
