"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Users,
  BadgeCheck,
  AlertCircle,
  Filter,
  ChevronDown,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface OverviewStat {
  label: string;
  value: number;
  change: {
    type: "up" | "down";
    value: number;
    period: string;
  };
  icon: React.ReactNode;
  iconClassName?:string
}

interface Transaction {
  id: string;
  transId: string;
  date: string;
  amount: number;
  source: {
    name: string;
    avatar: string;
    accountId: string;
  };
  destination: string;
  status: "Pending" | "Failed" | "Completed";
}

const StatCard: React.FC<{ stat: OverviewStat }> = ({ stat }) => {
  return (
    <div className="bg-white rounded-lg p-6 gap-4 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">{stat.label}</div>
          <div className="text-2xl font-bold">
            {stat.value.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2 bg-gray-100 rounded-lg",stat.iconClassName)}>{stat.icon}</div>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-1 text-sm mt-4",
          stat.change.type === "up" ? "text-emerald-500" : "text-red-500"
        )}
      >
        {stat.change.type === "up" ? (
          <TrendingUp className="size-4" />
        ) : (
          <TrendingDown className="size-4" />
        )}
        {stat.change.value}% {stat.change.type} from {stat.change.period}
      </div>
    </div>
  );
};

const TrackInvestmentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilters] = React.useState({
    name: "",
    date: "",
    town: "",
    type: "",
    status: "",
  });

  const stats: OverviewStat[] = [
    {
      label: "Total User",
      value: 4068,
      change: { type: "up", value: 8.5, period: "last week" },
      icon: <Users className="size-5 text-primary" />,
      iconClassName:"rounded-xl bg-primary/20"
    },
    {
      label: "Verified users",
      value: 1568,
      change: { type: "down", value: 4.3, period: "last week" },
      icon: <BadgeCheck className="size-5 text-emerald-500" />,
      iconClassName:"rounded-xl bg-emerald-100"
    },
    {
      label: "Needs attention",
      value: 453,
      change: { type: "up", value: 1.1, period: "last week" },
      icon: <AlertCircle className="size-5 text-red-500" />,
      iconClassName:"rounded-xl bg-red-100"
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      transId: "CM5836hjG7",
      date: "Tue-12-11-24",
      amount: 20000,
      source: {
        name: "Nguh fabs demo",
        avatar: "/images/img2.svg",
        accountId: "Account ID",
      },
      destination: "PJT-432D",
      status: "Pending",
    },
    // Add more sample transactions
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Overview Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="search user ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-8">
            Search
          </Button>
        </div>

        <div className="flex items-center justify-between p-2 bg-white rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-500" />
              <span className="text-gray-600">Filter By</span>
            </div>

            <div className="flex items-center gap-3">
              {["Name", "Date", "Town", "Type", "Status"].map((filter) => (
                <Button
                  key={filter}
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => {}}
                >
                  {filter}
                  <ChevronDown className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          <Button variant="ghost" className="text-red-500">
            <RotateCcw className="size-4 mr-2" />
            Reset Filter
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-primary/10 py-3 px-4 text-left text-sm text-primary font-semibold">
                  Trans ID
                </th>
                <th className="bg-primary/10 py-3 px-4 text-left text-sm text-primary font-semibold">
                  Date/Time
                </th>
                <th className="bg-primary/10 py-3 px-4 text-left text-sm text-primary font-semibold">
                  Amount/xaf
                </th>
                <th className="bg-primary/10 py-3 px-4 text-left text-sm text-primary font-semibold">
                  Source
                </th>
                <th className="bg-primary/10 py-3 px-4 text-left text-sm text-primary font-semibold">
                  Destination
                </th>
                <th className="bg-primary/10 py-3 px-4 text-left text-sm text-primary font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <Link href={`/dashboard/projects/track-investments/${transaction.id}`}>#{transaction.transId}</Link>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={transaction.source.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
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
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.destination}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        "flex w-fit items-center gap-1.5 text-sm",
                        transaction.status === "Completed" && "text-green-500",
                        transaction.status === "Failed" && "text-red-500",
                        transaction.status === "Pending" && "text-yellow-500"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackInvestmentPage;
