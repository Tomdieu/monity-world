import React from "react";
import { cn } from "@/lib/utils";
import { Filter, ChevronLeft, ChevronRight, RotateCcw, ChevronDown, Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type SavingStatus = "Active" | "Inactive" | "Withdrawn" | "Completed";

interface Saving {
  id: string;
  savingId: string;
  user: {
    name: string;
    accountId: string;
    avatar: string;
  };
  balance: number;
  target: number;
  startDate: string;
  endDate: string;
  status: SavingStatus;
  recents: number;
}

interface SavingsTableProps {
  savings: Saving[];
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onManage: (savingId: string) => void;
  className?: string;
}

const getStatusStyle = (status: SavingStatus) => {
  switch (status) {
    case "Active":
      return "text-yellow-500";
    case "Inactive":
      return "text-gray-500";
    case "Withdrawn":
      return "text-red-500";
    case "Completed":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const FilterDropdown: React.FC<{ label: string }> = ({ label }) => (
  <Button
    variant="ghost"
    className="flex items-center gap-2 text-gray-600 hover:bg-gray-50"
  >
    {label}
    <ChevronDown className="size-4" />
  </Button>
);

const SavingsTable: React.FC<SavingsTableProps> = ({
  savings,
  currentPage,
  totalItems,
  onPageChange,
  onManage,
  className,
}) => {
  return (
    <div className={cn("w-full bg-white rounded-lg", className)}>
      {/* Search and Filters */}
      <div className="p-4 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="search savings"
              className="w-full pl-4 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">
            Search
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-500" />
              <span className="text-gray-600">Filter By</span>
            </div>
            <div className="flex items-center gap-3">
              <FilterDropdown label="Start Date" />
              <FilterDropdown label="End Date" />
              <FilterDropdown label="Recent" />
              <FilterDropdown label="Status" />
            </div>
          </div>

          <Button variant="ghost" className="text-red-500">
            <RotateCcw className="size-4 mr-2" />
            Reset Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Saving ID
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                User
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Balance/XAF
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Target/XAF
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Start Date
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                End Date
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Status
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Recents/XAF
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
              <div className="flex items-center gap-1">
                <Settings className="size-3"/>
                Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {savings.map((saving) => (
              <tr key={saving.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">
                {saving.savingId}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={saving.user.avatar}
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm text-gray-700">{saving.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {saving.user.accountId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {saving.balance.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {saving.target.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {saving.startDate}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {saving.endDate}
                </td>
                <td className="py-3 px-4">
                  <div className={`flex items-center gap-1.5 ${getStatusStyle(saving.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span className="text-sm">{saving.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  +{saving.recents.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onManage(saving.id)}
                    className="w-full text-gray-600 hover:bg-gray-50"
                  >
                    Manage
                    <ChevronRight className="size-2" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex items-center justify-end border-t border-gray-100">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Showing {(currentPage - 1) * 10 + 1}-
            {Math.min(currentPage * 10, totalItems)} of {totalItems}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage * 10 >= totalItems}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample data
export const sampleSavings: Saving[] = [
  {
    id: "1",
    savingId: "#CM5836hjG7",
    user: {
      name: "Nguh fabs demo",
      accountId: "Account ID",
      avatar: "/path/to/avatar.jpg",
    },
    balance: 300000,
    target: 146500,
    startDate: "17-09-2025",
    endDate: "17-09-2025",
    status: "Active",
    recents: 5000,
  },
  // Add more sample data as needed
];

export default SavingsTable;