import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import Image from "next/image";

interface FilterOption {
  label: string;
  value: string;
}

interface StaffFilterProps {
  nameOptions: FilterOption[];
  departmentOptions: FilterOption[];
  roleOptions: FilterOption[];
  statusOptions: FilterOption[];
  dateOptions: FilterOption[];
  onFilterChange: (key: string, value: string) => void;
}

const StaffFilter = ({
  nameOptions,
  departmentOptions,
  roleOptions,
  statusOptions,
  dateOptions,
  onFilterChange,
}: StaffFilterProps) => {
  return (
    <div className="flex items-center gap-3 border rounded-2xl">
      <div className="flex items-center gap-3 text-neutral-500">
        <div className="px-2 py-4 ml-2">
          <Image
            src={"/icons/filter.svg"}
            alt={"finance icon"}
            width={"24"}
            height={24}
            className="size-6"
          />
        </div>
        <div className="w-2 h-10 border-r"></div>
        <span className="text-sm font-bold">Filter By</span>
        <div className="w-2 h-10 border-r"></div>
      </div>
      <div className="flex items-center gap-2">
        <Select onValueChange={(value) => onFilterChange("name", value)}>
          <SelectTrigger className="w-[140px] border-none shadow-none text-muted-foreground font-bold">
            <SelectValue placeholder="Sort by name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {nameOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-2 h-10 border-r"></div>
        <Select onValueChange={(value) => onFilterChange("startDate", value)}>
          <SelectTrigger className="w-[140px] border-none shadow-none text-muted-foreground font-bold">
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dateOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-2 h-10 border-r"></div>
        <Select onValueChange={(value) => onFilterChange("department", value)}>
          <SelectTrigger className="w-[140px] border-none shadow-none text-muted-foreground font-bold">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {departmentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-2 h-10 border-r"></div>
        <Select onValueChange={(value) => onFilterChange("role", value)}>
          <SelectTrigger className="w-[140px] border-none shadow-none text-muted-foreground font-bold">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-2 h-10 border-r"></div>
        <Select onValueChange={(value) => onFilterChange("status", value)}>
          <SelectTrigger className="w-[140px] border-none shadow-none text-muted-foreground font-bold">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-2 h-10 border-r"></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-md font-bold">
          <RotateCcw className="w-5 h-5" />
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default StaffFilter;
