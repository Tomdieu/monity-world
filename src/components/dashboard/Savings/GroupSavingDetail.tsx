import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Copy,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GroupTransaction {
  id: string;
  type: "Savings" | "Withdrawal";
  date: string;
  amount: number;
  to: string;
  status: "Completed" | "Failed" | "Pending";
  remark: string;
}

interface GroupSavingsDetailProps {
  groupInfo: {
    name: string;
    groupId: string;
    startDate: string;
    members: number;
    frequency: "Monthly" | "Weekly" | "Daily";
    endDate: string;
    status: string;
  };
  balance: {
    currentBalance: number;
    targetAmount: number;
    round: number;
    paid: number;
    paidTotal: number;
    nextRecipient: {
      name: string;
      avatar: string;
      accountId: string;
    };
  };
  transactions: GroupTransaction[];
  onReturn?: () => void;
  onSeeAllMembers?: () => void;
  onSeeList?:()=>void;
  className?: string;
  itemsPerPage?: number;
}

const GroupSavingsDetail: React.FC<GroupSavingsDetailProps> = ({
  groupInfo,
  balance,
  transactions,
  onReturn,
  onSeeAllMembers,
  onSeeList,
  className,
  itemsPerPage = 3,
}) => {

    const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Get current transactions to display
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Handle pagination button clicks
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header - Group Info */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReturn}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="size-5 text-gray-500" />
          </Button>
          <h2 className="text-lg font-semibold text-muted-foreground">
            Return
          </h2>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-success">
            {groupInfo.name}
          </h3>
          <div className="grid grid-cols-6 gap-6">
            <div className="border rounded-md p-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Group ID
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary font-semibold">
                  {groupInfo.groupId}
                </span>
                <button className="hover:bg-gray-100 p-1 rounded-md transition-colors">
                  <Copy className="size-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="border rounded-md p-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Start Date
              </label>
              <p className="text-sm text-primary font-semibold">
                {groupInfo.startDate}
              </p>
            </div>

            <div className="border rounded-md p-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Members
              </label>
              <div className="flex items-center gap-2">
                {/* <Users className="size-4 text-gray-500" /> */}
                <span className="text-sm text-primary font-semibold">
                  {groupInfo.members}
                </span>
              </div>
            </div>

            <div className="border rounded-md p-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Frequency
              </label>
              <p className="text-sm text-blue-500">{groupInfo.frequency}</p>
            </div>

            <div className="border rounded-md p-2">
              <label className="text-sm text-gray-500 mb-2 block">
                End Date
              </label>
              <p className="text-sm text-primary font-semibold">
                {groupInfo.endDate}
              </p>
            </div>

            <div className="border rounded-md p-2">
              <label className="text-sm text-gray-500 mb-2 block">Status</label>
              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                {groupInfo.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Balance</h3>
        <div className="flex items-center justify-between">
          <div className="flex  gap-5">
            <div className="border rounded-md bg-gray-50 px-5 py-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Current Balance
              </label>
              <p className="text-xl font-semibold">
                {balance.currentBalance.toLocaleString()} XAF
              </p>
            </div>

            <div className="border rounded-md bg-gray-50 px-5 py-2">
              <label className="text-sm text-gray-500 mb-2 block">
                Target Amount
              </label>
              <p className="text-xl font-semibold">
                {balance.targetAmount.toLocaleString()} XAF
              </p>
            </div>

            <div className="border rounded-md bg-gray-50 px-5 py-2">
              <label className="text-sm text-gray-500 mb-2 block">Round</label>
              <div className="flex items-baseline gap-1">
                <p className="text-xl font-semibold">
                  {balance.round < 10 ? `0${balance.round}` : balance.round}
                </p>
              </div>
            </div>
            <div className="border rounded-md bg-gray-50 px-5 py-2">
              <label className="text-sm text-gray-500 mb-2 block">Paid</label>
              <div className="flex items-baseline gap-1">
                <p className="text-xl font-semibold">{balance.paid}</p>
                <span className="text-xl font-semibold">
                  /{balance.paidTotal}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-2 rounded-md border-primary bg-gray-50 px-2 py-2">
              <div>
                <label className="text-sm text-gray-500 mb-2 block">
                  Next Recipient
                </label>
                <div className="flex items-center gap-5 bg-gray-50 rounded-lg px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <Image
                      src={balance.nextRecipient.avatar}
                      alt={balance.nextRecipient.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-700">
                        {balance.nextRecipient.name}
                      </span>
                      <span className="text-xs/3 text-muted-foreground">
                        {balance.nextRecipient.accountId}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={onSeeList}
                    className="bg-slate-500 text-white hover:bg-slate-600"
                  >
                    See List
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-2 rounded-md bg-slate-100 px-5 pr-10">
              <span className="text-muted-foreground text-sm">
                See all members
              </span>
              <Button
                size={"sm"}
                onClick={onSeeAllMembers}
                className="bg-primary text-white font-semibold"
              >
                Members
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6 text-muted-foreground">
          Recent Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  <div className="flex items-center gap-1">
                    <Settings className="size-3" />
                    Trans type
                  </div>
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  <div className="flex items-center gap-1">
                    <Settings className="size-3" />
                    Date/Time
                  </div>
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  <div className="flex items-center gap-1">
                    <Settings className="size-3" />
                    Amount/xaf
                  </div>
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  <div className="flex items-center gap-1">
                    <Settings className="size-3" />
                    To
                  </div>
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  <div className="flex items-center gap-1">
                    <Settings className="size-3" />
                    Status
                  </div>
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  <div className="flex items-center gap-1">
                    <Settings className="size-3" />
                    Remark
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.type}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={cn(
                        transaction.type === "Savings"
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {transaction.type === "Savings" ? "+" : "-"}
                      {transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.to}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          transaction.status === "Completed" && "bg-green-500",
                          transaction.status === "Failed" && "bg-red-500",
                          transaction.status === "Pending" && "bg-yellow-500"
                        )}
                      ></span>
                      <span
                        className={cn(
                          "text-sm",
                          transaction.status === "Completed" &&
                            "text-green-500",
                          transaction.status === "Failed" && "text-red-500",
                          transaction.status === "Pending" && "text-yellow-500"
                        )}
                      >
                        {transaction.status}
                      </span>
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

        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            Showing {indexOfFirstTransaction + 1}-{Math.min(indexOfLastTransaction, transactions.length)} of {transactions.length}
          </div>
          <div>
            <Button variant={"secondary"} size={"icon"} onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="size-4 text-muted-foreground" />
            </Button>
            <Button variant={"secondary"} size={"icon"} onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample data
export const sampleGroupSavingsDetail = {
  groupInfo: {
    name: "Cotisation veterans 30k",
    groupId: "#CM5722GR",
    startDate: "17-09-2025",
    members: 12,
    frequency: "Monthly" as const,
    endDate: "17-09-2025",
    status: "Locked",
  },
  balance: {
    currentBalance: 70000,
    targetAmount: 350000,
    round: 7,
    roundTotal: 12,
    nextRecipient: {
      name: "Nguh Fabrice",
      avatar: "/path/to/avatar.jpg",
    },
  },
  transactions: [
    {
      id: "1",
      type: "Savings",
      date: "Tue-12-11-24",
      amount: 30000,
      to: "Cotisation veterans 3",
      status: "Completed",
      remark: "Good",
    },
    {
      id: "2",
      type: "Withdrawal",
      date: "Tue-12-11-24",
      amount: 350000,
      to: "Bertrand Ngujo",
      status: "Completed",
      remark: "Good",
    },
    {
      id: "3",
      type: "Savings",
      date: "Tue-12-11-24",
      amount: 30000,
      to: "Cotisation veterans 3",
      status: "Completed",
      remark: "Good",
    },
  ],
};

export default GroupSavingsDetail;
