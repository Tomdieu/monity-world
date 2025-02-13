"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Search, ChevronDown, RotateCcw } from "lucide-react";
import React, { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StaffDataTable from "@/components/dashboard/Control/StaffDataTable";
import StaffFilter from "@/components/dashboard/Control/StaffFilter";
import Link from "next/link";

// Types for our data
type Staff = {
  id: string;
  name: string;
  startDate: string;
  department: string;
  role: string;
  lastActivity: string;
};

// Types for our filters
type Filters = {
  name: string;
  date: string;
  role: string;
  department: string;
};

const Item = ({
  className,
  label,
  value,
}: {
  className?: string;
  label: string;
  value: number;
}) => (
  <div
    className={cn(
      "border rounded-md p-3 flex flex-col items-center justify-center gap-1",
      className
    )}
  >
    <span className="block text-base text-muted-foreground font-light">
      {label}
    </span>
    <span className="font-bold block text-base">
      {value < 10 ? `0${value}` : value}
    </span>
  </div>
);

const FilterButton = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-[140px] bg-white border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{label}</span>
      </div>
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// Sample data
const SAMPLE_STAFF_DATA: Staff[] = [
  {
    id: "CM5722GR",
    name: "Jame Patrick",
    startDate: "17-09-2024",
    department: "User Control",
    role: "Role here",
    lastActivity: "30mins ago",
  },
  {
    id: "CM5752GR",
    name: "Atem Joel",
    startDate: "17-09-2024",
    department: "Statistics&C",
    role: "Role here",
    lastActivity: "30mins ago",
  },
  // Add more sample data as needed
];

function ManageStaffPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    name: "",
    date: "",
    role: "",
    department: "",
  });

  const filterOptions = {
    nameOptions: [
      { label: "A to Z", value: "asc" },
      { label: "Z to A", value: "desc" },
    ],
    dateOptions: [
      { label: "Newest", value: "newest" },
      { label: "Oldest", value: "oldest" },
    ],
    departmentOptions: [
      { label: "All Departments", value: "all" },
      { label: "User Control", value: "user_control" },
      { label: "Statistics&C", value: "statistics" },
      { label: "Finance", value: "finance" },
      { label: "Technical Service", value: "technical" },
      { label: "Customer Service", value: "customer" },
    ],
    roleOptions: [
      { label: "All Roles", value: "all" },
      { label: "Admin", value: "admin" },
      { label: "Manager", value: "manager" },
      { label: "Staff", value: "staff" },
      { label: "Support", value: "support" },
    ],
    statusOptions: [
      { label: "All Status", value: "all" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  };

  // Handle filter changes
  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      name: "",
      date: "",
      role: "",
      department: "",
    });
    setSearchQuery("");
  }, []);

  return (
    <div className="p-6 w-full mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-black">Overview</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Item label="Total Staff" value={23} />
            <Item label="Active users" value={18} />
            <Item label="Finance dept" value={3} />
            <Item label="Technical service" value={5} />
            <Item label="Customer service" value={9} />
          </div>
          <Link href={`/dashboard/control/add-staff`}>
          <Button
            variant="success"
            size="lg"
            className="flex items-center gap-2"
            >
            <Plus className="size-5" />
            Add Staff
          </Button>
            </Link>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <form className="flex items-center gap-4 w-8/12">
            <div className="flex items-center p-3 py-2 gap-2 border rounded-full flex-1">
              <Search className="size-5 text-muted-foreground" />
              <input
                className="border-none outline-none w-full bg-transparent"
                placeholder="Search user ID or Name"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="rounded-full px-20">
              Search
            </Button>
          </form>
        </div>

        <StaffFilter
          nameOptions={filterOptions.nameOptions}
          dateOptions={filterOptions.dateOptions}
          departmentOptions={filterOptions.departmentOptions}
          roleOptions={filterOptions.roleOptions}
          statusOptions={filterOptions.statusOptions}
          onFilterChange={()=>{}}
        />
        <StaffDataTable
          currentPage={1}
          staff={SAMPLE_STAFF_DATA}
          totalStaff={SAMPLE_STAFF_DATA.length}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}

export default ManageStaffPage;
