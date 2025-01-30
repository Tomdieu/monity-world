"use client";

import React from "react";
import {
  ArrowLeft,
  Copy,
  ChevronLeft,
  ChevronRight,
  Verified,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface CardInfo {
  cardId: string;
  cardNumber: string;
  cardType: string;
  status: "Active" | "Inactive" | "Suspended";
  cardHolder: {
    name: string;
    image: string;
    id: string;
  };
}

interface BalanceInfo {
  currentBalance: number;
  maxLimit: number;
  dailyLimit: number;
}

interface ExtraInfo {
  verificationNumber: string;
  expirationDate: string;
}

interface Transaction {
  type: string;
  dateTime: string;
  amount: number;
  to: string;
  status: "Completed" | "Pending" | "Failed";
  remark: string;
}

interface HeaderProps {
  onReturn?: () => void;
  className?: string;
}

interface ExtraInfoSectionProps {
  info: ExtraInfo;
  onExtend?: () => void;
  className?: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onPageChange?: (page: number) => void;
  onSort?: (column: string) => void;
  itemsPerPage?: number;
  currentPage?: number;
  totalItems?: number;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ onReturn, className }) => (
  <div className={cn("flex items-center mb-6", className)}>
    <button 
      className="flex items-center text-gray-600"
      onClick={onReturn}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Return
    </button>
  </div>
);

// Card Information Component
const CardInformation: React.FC<{ info: CardInfo }> = ({ info }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border">
    <h2 className="text-emerald-500 text-lg font-semibold mb-4">
      Card Information
    </h2>
    <div className="grid grid-cols-5 gap-4">
      <div className="p-2 rounded-md border border-stone-100 flex flex-col gap-2">
        <p className="text-gray-500 text-sm mb-1">Card ID</p>
        <p className="text-primary font-semibold text-lg">{info.cardId}</p>
      </div>
      <div className="p-2 rounded-md border border-stone-100 flex flex-col gap-2">
        <p className="text-gray-500 text-sm mb-1">Card Number</p>
        <div className="flex items-center justify-between">
          <p className="font-semibold mr-2 text-lg text-primary">
            {info.cardNumber}
          </p>
          <button>
            <Copy className="w-4 h-4 text-gray-400 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="p-2 rounded-md border border-stone-100 flex flex-col gap-2">
        <p className="text-gray-500 text-sm mb-1">Card Type</p>
        <p className="text-primary text-lg font-semibold">{info.cardType}</p>
      </div>
      <div className="p-2 rounded-md border border-stone-100 flex flex-col gap-2">
        <p className="text-gray-500 text-sm mb-1">Status</p>
        <span className="inline-flex gap-1 items-center px-2 py-1 rounded-full  text-green-600 text-lg">
          <Verified className="size-4" />
          {info.status}
        </span>
      </div>
      <div className="p-2 rounded-md border-2 border-primary">
        <p className="text-gray-500 text-sm mb-1">Card Holder</p>
        <div className="flex items-center bg-gray-50 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <Image
              src={info.cardHolder.image}
              alt="Card holder"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <div className="">
              <p className="text-xs font-medium">{info.cardHolder.name}</p>
              <span className="text-xs/3">{info.cardHolder.id}</span>
            </div>
          </div>

          <Button
            variant={"secondary"}
            size={"sm"}
            className="text-xs text-gray-500"
          >
            See Account
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Balance Information Component
const BalanceSection: React.FC<{
  balance: BalanceInfo;
  className?: string;
}> = ({ balance, className }) => (
  <div className={cn("bg-primary/5 p-6 rounded-xl mb-6 border", className)}>
    <h2 className="text-gray-400 text-xl font-semibold mb-4">Balance</h2>
    <div className="grid grid-cols-3 gap-6">
      <div className="p-2 rounded-xl border bg-green-50">
        <p className="text-gray-500 text-sm mb-1">Current Balance</p>
        <p className="text-xl font-semibold">
          {balance.currentBalance.toLocaleString()} XAF
        </p>
      </div>
      <div className="bg-purple-50 rounded-xl p-2 border">
        <p className="text-gray-500 text-sm mb-1">Max Limits</p>
        <p className="text-xl font-semibold">
          {balance.maxLimit.toLocaleString()} XAF
        </p>
      </div>
      <div className="bg-red-50 rounded-xl p-2 border">
        <p className="text-gray-500 text-sm mb-1">Daily Limit</p>
        <p className="text-xl font-semibold">
          {balance.dailyLimit.toLocaleString()} XAF
        </p>
      </div>
    </div>
  </div>
);

// Extra Information Component
export const ExtraInfoSection: React.FC<ExtraInfoSectionProps> = ({
  info,
  onExtend,
  className
}) => (
  <div className={cn("bg-white p-6 rounded-xl border shadow-sm mb-6", className)}>
    <h2 className="text-emerald-500 text-xl font-semibold mb-4">Extra info</h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="p-2 rounded-md border">
        <p className="text-gray-500 text-sm mb-1">Verification number</p>
        <p className="text-primary font-semibold text-lg">
          {info.verificationNumber}
        </p>
      </div>
      <div className="p-2 rounded-md border">
        <p className="text-gray-500 text-sm mb-1">Expiration Date</p>
        <div className="flex items-center justify-between">
          <p className="mr-2 text-primary">{info.expirationDate}</p>
          <Button
            variant="secondary"
            size="sm"
            className="px-3 py-1 rounded-md text-white bg-stone-300 text-sm"
            onClick={onExtend}
          >
            Extend
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Transactions Table Component
export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onPageChange,
  onSort,
  itemsPerPage = 10,
  currentPage = 1,
  totalItems,
  className
}) => {
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;

  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-sm mb-6", className)}>
      <h2 className="text-gray-600 text-xl mb-4 font-semibold">
        Recent Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-2">
          <thead className="bg-blue-50">
            <tr>
              {["Trans type", "Date/Time", "Amount/xaf", "To", "Status", "Remark"].map((header) => (
                <th
                  key={header}
                  className="text-left p-3 text-sm text-gray-600 cursor-pointer"
                  onClick={() => onSort?.(header.toLowerCase())}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="size-4 text-primary" />
                    {header}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction,index) => (
              <tr key={index}>
                <td className="p-3">{transaction.type}</td>
                <td className="p-3">{transaction.dateTime}</td>
                <td className="p-3 text-red-500">
                  -{transaction.amount.toLocaleString()}
                </td>
                <td className="p-3">{transaction.to}</td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 text-sm">
                    {transaction.status}
                  </span>
                </td>
                <td className="p-3">{transaction.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems || 0)} of {totalItems}
        </p>
        <div className="flex gap-2">
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};


// Freeze Card Button Component
interface FreezeCardButtonProps {
  onFreeze?: () => void;
  className?: string;
}

export const FreezeCardButton: React.FC<FreezeCardButtonProps> = ({
  onFreeze,
  className
}) => (
  <div className={cn("bg-blue-50 p-6 rounded-lg flex items-center justify-center", className)}>
    <button
      className="w-fit bg-red-500 text-white py-3 px-2 rounded-lg hover:bg-red-600 transition"
      onClick={onFreeze}
    >
      Freeze card
    </button>
  </div>
);
// Main Card Detail Page Component
const CardDetailPage: React.FC = () => {
  const cardInfo: CardInfo = {
    cardId: "NFC235KI7L",
    cardNumber: "*********2456",
    cardType: "NFC Card",
    status: "Active",
    cardHolder: {
      name: "Ngeh Han demo",
      image: "/images/img2.svg",
      id: "Account Id",
    },
  };

  const balanceInfo: BalanceInfo = {
    currentBalance: 29000,
    maxLimit: 300000,
    dailyLimit: 30000,
  };

  const extraInfo: ExtraInfo = {
    verificationNumber: "+237 6500749592",
    expirationDate: "17-09-2025",
  };

  const transactions: Transaction[] = [
    {
      type: "Shopping",
      dateTime: "Tue-12-11-24",
      amount: 30000,
      to: "Cotisation veterans 3",
      status: "Completed",
      remark: "Good",
    },
    // Add more transactions as needed
  ];

  return (
    <div className="mx-auto p-6">
      <Header />
      <CardInformation info={cardInfo} />
      <div className="grid grid-cols-12 gap-6">
        <BalanceSection balance={balanceInfo} className="col-span-7" />
        <ExtraInfoSection info={extraInfo} className="col-span-5" />
      </div>
      <TransactionsTable transactions={transactions} />
      <FreezeCardButton />
    </div>
  );
};

export default CardDetailPage;
