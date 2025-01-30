"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Trash2,
  Info,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface Message {
  id: string;
  sender: string;
  subject: string;
  category?: "Financial" | "Account" | "Security" | "Others";
  timestamp: string;
  isStarred: boolean;
}

interface FilterState {
  financial: boolean;
  account: boolean;
  security: boolean;
  others: boolean;
}

interface TabProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

// Tab Component
const Tab: React.FC<TabProps> = ({ icon, label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg space-x-2 select-none ${
      isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className={`${isActive ? "text-primary" : "text-gray-600"}`}>
      {label}
    </span>
    <span className="text-gray-500 text-sm">{count}</span>
  </button>
);

// Search Component
const SearchBar: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search transaction"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  </div>
);

// Filter Section Component
const FilterSection: React.FC<{
  filters: FilterState;
  onFilterChange: (key: keyof FilterState) => void;
  onReset: () => void;
}> = ({ filters, onFilterChange, onReset }) => (
  <div className="flex items-center space-x-4 p-4 border rounded-lg">
    <div className="flex items-center space-x-2">
      <Filter className="w-5 h-5 text-gray-600" />
      <span className="text-gray-600">Filter By</span>
    </div>
    {Object.entries(filters).map(([key, value]) => (
      <label key={key} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={value}
          onChange={() => onFilterChange(key as keyof FilterState)}
          className="rounded text-blue-500 focus:ring-blue-500"
        />
        <span className="capitalize">{key}</span>
      </label>
    ))}
    <button
      onClick={onReset}
      className="text-red-500 hover:text-red-600 ml-auto"
    >
      Reset Filter
    </button>
  </div>
);

// Message Row Component
const MessageRow: React.FC<{
  message: Message;
  onStarToggle: (id: string) => void;
  onSenderClick?: (id: string) => void;
}> = ({ message, onStarToggle, onSenderClick }) => (
  <div className="flex items-center p-4 hover:bg-gray-50 border-b">
    <input type="checkbox" className="mr-4 rounded" />
    <button onClick={() => onStarToggle(message.id)} className="mr-4">
      <Star
        className={`w-5 h-5 ${
          message.isStarred
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-400"
        }`}
      />
    </button>
    <div className="flex-1">
      <div className="flex items-center">
        <span
          className="font-medium mr-4 cursor-pointer"
          onClick={() => {
            if (onSenderClick) {
              onSenderClick(message.id);
            }
          }}
        >
          {message.sender}
        </span>
        {message.category && (
          <span
            className={`px-2 py-1 rounded-lg text-xs mr-4 ${
              message.category === "Financial"
                ? "bg-purple-100 text-purple-600"
                : message.category === "Account"
                ? "bg-blue-100 text-blue-600"
                : message.category === "Security"
                ? "bg-green-100 text-green-600"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {message.category}
          </span>
        )}
      </div>
      <p className="text-gray-600">{message.subject}</p>
    </div>
    <span className="text-gray-500 text-sm">{message.timestamp}</span>
  </div>
);

// Main Component
const MessageInterface: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    financial: false,
    account: false,
    security: false,
    others: false,
  });
  const [activeTab, setActiveTab] = useState("inbox");

  // Sample data
  const messages: Message[] = [
    {
      id: "1",
      sender: "Jullu Jalal",
      subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
      category: "Others",
      timestamp: "8:38 AM",
      isStarred: false,
    },
    // Add more messages as needed
  ];

  const handleFilterChange = (key: keyof FilterState) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterReset = () => {
    setFilters({
      financial: false,
      account: false,
      security: false,
      others: false,
    });
  };

  const handleStarToggle = (id: string) => {
    // Implementation for starring messages
  };

  const router = useRouter()

  return (
    <div className="w-full mx-auto p-6">
      <div className="space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleFilterReset}
        />

        <div className="flex space-x-4 border-b pb-1">
          <Tab
            icon={<Mail className="w-5 h-5" />}
            label="Inbox"
            count={45}
            isActive={activeTab === "inbox"}
            onClick={() => setActiveTab("inbox")}
          />
          {/* Add more tabs as needed */}
        </div>

        <div className="border rounded-lg">
          {messages.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              onStarToggle={handleStarToggle}
              onSenderClick={(id)=>router.push(`/dashboard/support/${id}/`)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500 text-sm">Showing 1-13 of 78</span>
          <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInterface;
