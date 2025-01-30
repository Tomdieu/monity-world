"use client";
import React from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { IoReload } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import Link from "next/link";

// Types
type CardStatus = "Active" | "Inactive" | "Suspended";

interface CardData {
  id: string;
  cardType: "NFC" | "Visa Card";
  cardNumber: string;
  cardHolder: {
    name: string;
    accountId: string;
  };
  balance: number;
  status: CardStatus;
  created: string;
  expiring: string;
}

interface StatCardProps {
  title: string;
  value: number;
  change: {
    value: number;
    type: "up" | "down";
    timeFrame: string;
  };
  variant?: "default" | "success" | "warning" | "danger";
}

// Reusable Components
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
}) => {
  const getIcon = () => {
    switch (title) {
      case "Total Cards":
        return <div className="rounded-xl p-2 bg-purple-100"><CiCreditCard1 className="size-6 text-purple-600"/></div>
      case "Active Cards":
        return <div className="rounded-xl p-2 bg-green-100"><RiVerifiedBadgeFill className="size-6 text-green-500"/></div>
      case "Inactive Cards":
        return <div className="rounded-xl p-2 bg-slate-100"><RiVerifiedBadgeFill className="size-6 text-slate-500"/></div>
      case "Suspended Cards":
        return <div className="rounded-xl p-2 bg-red-100"><AlertCircle className="size-6 text-red-500"/></div>
      default:
        break;
    }
  }

  return (
    <div className={`p-4 rounded-lg bg-white`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-600">{title}</h3>
          <div className="mt-2">
            <span className="text-2xl font-semibold">
              {value.toLocaleString()}
            </span>
          </div>
        </div>
        {getIcon()}
      </div>
      <div className="mt-2 text-sm flex items-center">
        <span
          className={`flex gap-1 ${
            change.type === "up" ? "text-green-600" : "text-purple-600"
          }`}
        >
          {change.type === "up" ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}{" "}
          {change.value}%
        </span>
        <span className="text-gray-600 ml-1 text-xs">{change.timeFrame}</span>
      </div>
    </div>
  );
};

const SearchBar: React.FC = () => (
  <div className="relative flex items-center">
    <input
      type="text"
      placeholder="Search user ID or Name"
      className="w-full p-2 pl-8 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    <Search className="absolute left-2 h-5 w-5 text-gray-400" />
    <button className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-full font-medium">
      Search
    </button>
  </div>
);

const FilterBar: React.FC = () => (
  <div className="flex items-center gap-4 py-2 px-3 bg-white border rounded-3xl">
    <div className="flex items-center">
      <Filter className="h-5 w-5 text-gray-600" />
      <span className="ml-2">Filter By</span>
    </div>
    {["Card Type", "Status", "Date Added", "Balance", "Expiration Date"].map(
      (filter) => (
        <button
          key={filter}
          className="px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          {filter}
        </button>
      )
    )}
    <button className="ml-auto text-purple-600 flex items-center gap-1 font-semibold select-none"><IoReload className=""/> Reset Filter</button>
  </div>
);

const CardTable: React.FC<{ data: CardData[] }> = ({ data }) => (
  <div className="mt-4 bg-white rounded-lg overflow-hidden">
    <table className="w-full border-separate border-spacing-2">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">ID</th>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">
            Card Type
          </th>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">
            Card Number
          </th>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">
            Card Holder
          </th>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">
            Card Balance
          </th>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">
            Card Status
          </th>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">Created</th>
          <th className="px-4 py-3 text-left text-sm text-primary font-medium bg-primary/10 rounded-md">
            Expiring
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data.map((card) => (
          <tr key={card.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 text-sm"><Link href={`/dashboard/cards/${card.id}`}>{card.id}</Link></td>
            <td className="px-4 py-3 text-sm">{card.cardType}</td>
            <td className="px-4 py-3 text-sm">{card.cardNumber}</td>
            <td className="px-4 py-3 text-sm flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2" />
              <div>
                <div>{card.cardHolder.name}</div>
                <div className="text-gray-500 text-xs">
                  {card.cardHolder.accountId}
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm">
              {card.balance.toLocaleString()}
            </td>
            <td className="px-4 py-3 text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs
                ${
                  card.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : card.status === "Suspended"
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {card.status}
              </span>
            </td>
            <td className="px-4 py-3 text-sm">{card.created}</td>
            <td className="px-4 py-3 text-sm">{card.expiring}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="px-4 py-3 flex items-center justify-end border-t">
      <div className="text-sm text-gray-600">Showing 1-13 of 78</div>
      <div className="flex gap-2">
        <button className="p-2 rounded hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const CardDashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Cards",
      value: 512,
      change: { value: 8.5, type: "up" as const, timeFrame: "from last week" },
    },
    {
      title: "Active Cards",
      value: 1568,
      change: {
        value: 4.3,
        type: "down" as const,
        timeFrame: "from last week",
      },
      variant: "success",
    },
    {
      title: "Inactive Cards",
      value: 1568,
      change: {
        value: 4.3,
        type: "down" as const,
        timeFrame: "from last week",
      },
      variant: "warning",
    },
    {
      title: "Suspended Cards",
      value: 453,
      change: { value: 1.1, type: "up" as const, timeFrame: "from last week" },
      variant: "danger",
    },
  ];

  const sampleData: CardData[] = [
    {
      id: "#CM5836h",
      cardType: "NFC",
      cardNumber: "************2456",
      cardHolder: { name: "Ngeh Han demo", accountId: "Account ID" },
      balance: 300000,
      status: "Active",
      created: "20-05-2024",
      expiring: "20-05-2024",
    },
    // Add more sample data as needed
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <SearchBar />
      <FilterBar />
      <CardTable data={sampleData} />
    </div>
  );
};

export default CardDashboard;
