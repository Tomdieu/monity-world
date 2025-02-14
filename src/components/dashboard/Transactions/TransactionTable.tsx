"use client";

import React from "react";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type TransactionStatus = "Pending" | "Failed" | "Completed" | "Flagged";
type RemarkStatus = "Processing" | "Declined" | "Good" | "Scam attempt";

interface User {
  name: string;
  accountId: string;
  avatar: string;
}

interface Transaction {
  id: string;
  type: string;
  transId: string;
  dateTime: string;
  amount: number;
  source: User;
  destination: User | { type: "card"; cardId: string };
  status: TransactionStatus;
  remark: RemarkStatus;
}

interface TransactionTableProps {
  transactions: Transaction[];
  className?: string;
  onIdClick?: (transactionId: string) => void;
}

const getStatusStyle = (status: TransactionStatus) => {
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

const getRemarkStyle = (remark: RemarkStatus) => {
  switch (remark) {
    case "Good":
      return "text-green-700";
    case "Processing":
    case "Declined":
      return "text-gray-700";
    case "Scam attempt":
      return "text-red-700";
    default:
      return "text-gray-700";
  }
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  className,
  onIdClick,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn("w-full border-separate border-spacing-3", className)}
      >
        <thead>
          <tr>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              Trans type
            </th>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              Trans ID
            </th>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              Date/Time
            </th>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              Amount/xaf
            </th>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              Source
            </th>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              Destination
            </th>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              Status
            </th>
            <th className="bg-blue-50 rounded-md py-3 px-4 text-left text-sm text-blue-400 font-medium">
              <div className="flex items-center gap-2">
                <Settings className="size-2.5" />
                Remark
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-700">
                {transaction.type}
              </td>
              <td
                className="py-3 px-4 text-sm text-gray-700 cursor-pointer hover:text-primary"
                onClick={() => {
                  if (onIdClick) {
                    onIdClick(transaction.id.replace("#", ""));
                  }
                }}
              >
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
                  <Image
                    src={transaction.source.avatar}
                    alt={transaction.source.name}
                    className="w-6 h-6 rounded-full"
                    width={24}
                    height={24}
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
                  <div className="text-sm text-gray-700">
                    Card: {transaction.destination.cardId}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={transaction.destination.avatar}
                      alt={transaction.destination.name}
                      className="w-6 h-6 rounded-full"
                      width={24}
                      height={24}
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
                  className={cn(
                    "flex items-center gap-1.5",
                    getStatusStyle(transaction.status)
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span className="text-sm">{transaction.status}</span>
                </div>
              </td>
              <td
                className={cn(
                  "py-3 px-4 text-sm",
                  getRemarkStyle(transaction.remark)
                )}
              >
                {transaction.remark}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
