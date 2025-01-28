import React from "react";
import {
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Types
interface User {
  name: string;
  accountId: string;
  avatar: string;
}

interface Transaction {
  id: string;
  transType: string;
  transId: string;
  dateTime: string;
  amount: number;
  source: User;
  destination: User | { type: "card"; cardId: string };
  status: "Pending" | "Failed" | "Completed" | "Flagged";
  remark: string;
}

// Search Component
interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
        <input
          type="text"
          placeholder="search transaction"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">
        Search
      </Button>
    </div>
  );
};

// Filter Component
interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  dateOptions: FilterOption[];
  typeOptions: FilterOption[];
  statusOptions: FilterOption[];
  remarkOptions: FilterOption[];
  onFilterChange: (type: string, value: string) => void;
  onReset: () => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
    dateOptions,
    typeOptions,
    statusOptions,
    remarkOptions,
    onFilterChange,
    onReset,
    className
  }) => {
    const [selectedFilters, setSelectedFilters] = React.useState({
      date: '',
      type: '',
      status: '',
      remark: ''
    });
  
    const handleFilterChange = (filterType: string, value: string) => {
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
      onFilterChange(filterType, value);
    };
  
    const handleReset = () => {
      setSelectedFilters({
        date: '',
        type: '',
        status: '',
        remark: ''
      });
      onReset();
    };
  
    return (
      <div className={cn("flex items-center justify-between p-4 bg-white rounded-lg", className)}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500">
            <Filter className="size-4" />
            <span>Filter By</span>
          </div>
          
          <div className="flex items-center gap-4">
            <FilterDropdown 
              label="Date"
              options={dateOptions}
              value={selectedFilters.date}
              onChange={(value) => handleFilterChange('date', value)}
            />
            <FilterDropdown
              label="Trans type"
              options={typeOptions}
              value={selectedFilters.type}
              onChange={(value) => handleFilterChange('type', value)}
            />
            <FilterDropdown
              label="Trans Status"
              options={statusOptions}
              value={selectedFilters.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            <FilterDropdown
              label="Remark"
              options={remarkOptions}
              value={selectedFilters.remark}
              onChange={(value) => handleFilterChange('remark', value)}
            />
          </div>
        </div>
  
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <RotateCcw className="size-4 mr-2" />
          Reset Filter
        </Button>
      </div>
    );
  };
// Filter Dropdown Component
interface FilterDropdownProps {
    label: string;
    options: FilterOption[];
    value?: string; // Add selected value prop
    onChange: (value: string) => void;
  }
  

// Add this improved FilterDropdown component
const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
    label, 
    options, 
    value,
    onChange 
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
  
    // Find selected option label
    const selectedOption = options.find(opt => opt.value === value);
  
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
  
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
  
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md min-w-[120px]",
            "hover:bg-gray-50 transition-colors",
            selectedOption ? "text-gray-900" : "text-gray-500"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex-1 text-left">
            {selectedOption?.label || label}
          </span>
          <ChevronDown className={cn(
            "size-4 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} />
        </button>
  
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
            {options.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm",
                  "hover:bg-gray-50 transition-colors",
                  option.value === value && "bg-blue-50 text-blue-600"
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
  


// Transaction Table Component
interface TransactionTableProps {
  transactions: Transaction[];
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Update the TransactionTable component
const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentPage,
  totalItems,
  onPageChange,
  className,
}) => {
  const getStatusStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Failed":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      case "Flagged":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Trans type
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Trans ID
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Date/Time
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Amount/xaf
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Source
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Destination
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Status
              </th>
              <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                Remark
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={cn(
                  "hover:bg-gray-50",
                  index !== transactions.length - 1 &&
                    "border-b border-gray-200"
                )}
              >
                <td className="py-3 px-4 text-sm text-gray-700">
                  {transaction.transType}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {transaction.transId}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {transaction.dateTime}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {transaction.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={transaction.source.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <p className="text-sm text-gray-700">
                        {transaction.source.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.source.accountId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {"type" in transaction.destination ? (
                    <span className="text-sm text-gray-700">
                      Card: {transaction.destination.cardId}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <img
                        src={transaction.destination.avatar}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      <div>
                        <p className="text-sm text-gray-700">
                          {transaction.destination.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.destination.accountId}
                        </p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div
                    className={`flex items-center gap-1.5 ${getStatusStyle(
                      transaction.status
                    )}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span className="text-sm">{transaction.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {transaction.remark}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between px-4">
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
  );
};

export { SearchBar, FilterBar, TransactionTable };
