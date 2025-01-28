import React from "react";
import { cn } from "@/lib/utils";
import { Filter, ChevronLeft, ChevronRight, RotateCcw, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GroupSaving {
  id: string;
  groupId: string;
  groupName: string;
  balance: number;
  target: number;
  startDate: string;
  endDate: string;
  rounds: number;
  recents: number;
}

interface GroupSavingsTableProps {
  groupSavings: GroupSaving[];
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onManage: (groupId: string) => void;
  className?: string;
}

const FilterDropdown: React.FC<{ label: string }> = ({ label }) => (
  <Button
    variant="ghost"
    className="flex items-center gap-2 text-gray-600 hover:bg-gray-50"
  >
    {label}
    <ChevronDown className="size-4" />
  </Button>
);

const GroupSavingsTable: React.FC<GroupSavingsTableProps> = ({
  groupSavings,
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
              placeholder="search Savings group"
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
                Group ID
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Group Name
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
                Rounds
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
            {groupSavings.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">
                  {group.groupId}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {group.groupName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {group.balance.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {group.target.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {group.startDate}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {group.endDate}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-700">{group.rounds}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-green-500">
                  +{group.recents.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onManage(group.id)}
                    className="text-gray-600 hover:bg-gray-50"
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
export const sampleGroupSavings: GroupSaving[] = [
  {
    id: "1",
    groupId: "#CM5722GR",
    groupName: "Cotisation Val...",
    balance: 355000,
    target: 755500,
    startDate: "17-09-2024",
    endDate: "17-09-2025",
    rounds: 12,
    recents: 35000
  },
  {
    id: "2",
    groupId: "#CM5722GR",
    groupName: "Cotisation Val...",
    balance: 255000,
    target: 505000,
    startDate: "17-09-2024",
    endDate: "17-09-2025",
    rounds: 7,
    recents: 25000
  },
  {
    id: "3",
    groupId: "#CM5722GR",
    groupName: "Cotisation Val...",
    balance: 25000,
    target: 125000,
    startDate: "17-09-2024",
    endDate: "17-09-2024",
    rounds: 5,
    recents: -10500
  }
  // Add more sample data as needed
];

export default GroupSavingsTable;