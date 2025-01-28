import React from "react";
import { cn } from "@/lib/utils";
import { Copy, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SavingsTransaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  to: string;
  status: 'Completed' | 'Failed' | 'Pending';
  remark: string;
}

interface IndividualSavingsDetailProps {
  savingsInfo: {
    name: string;
    groupId: string;
    startDate: string;
    endDate: string;
    status: string;
    motive?: string;
  };
  balance: {
    amountSaved: number;
    targetAmount: number;
    frequency: string;
    user: {
      name: string;
      avatar: string;
    };
  };
  transactions: SavingsTransaction[];
  onReturn?: () => void;
  className?: string;
}

const IndividualSavingsDetail: React.FC<IndividualSavingsDetailProps> = ({
  savingsInfo,
  balance,
  transactions,
  onReturn,
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header - Savings Info */}
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
          <h2 className="text-xl font-semibold">Return</h2>
        </div>

        <div className="grid grid-cols-5 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{savingsInfo.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{savingsInfo.groupId}</span>
              <button className="hover:bg-gray-100 p-1 rounded-md transition-colors">
                <Copy className="size-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">Start Date</label>
            <p className="text-sm text-gray-700">{savingsInfo.startDate}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">End Date</label>
            <p className="text-sm text-gray-700">{savingsInfo.endDate}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">Status</label>
            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
              {savingsInfo.status}
            </span>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">Motive</label>
            <p className="text-sm text-gray-500">{savingsInfo.motive}</p>
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">Balance</h3>
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-3 gap-16">
            <div>
              <label className="text-sm text-gray-500 mb-2 block">Amount Saved</label>
              <p className="text-xl font-semibold">{balance.amountSaved.toLocaleString()} XAF</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-2 block">Target Amount</label>
              <p className="text-xl font-semibold">{balance.targetAmount.toLocaleString()} XAF</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-2 block">Frequency</label>
              <p className="text-xl font-semibold">{balance.frequency}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
            <label className="text-sm text-gray-500">User Information</label>
            <div className="flex items-center gap-2">
              <Image
                src={balance.user.avatar}
                alt={balance.user.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <Button variant="secondary" size="sm">
                See profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  Trans type
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  Date/Time
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  Amount/xaf
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  To
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  Status
                </th>
                <th className="bg-blue-50 py-3 px-4 text-left text-sm text-blue-400 font-medium rounded-md">
                  Remark
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.type}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.to}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        transaction.status === 'Completed' && "bg-green-500",
                        transaction.status === 'Failed' && "bg-red-500",
                        transaction.status === 'Pending' && "bg-yellow-500"
                      )}></span>
                      <span className={cn(
                        "text-sm",
                        transaction.status === 'Completed' && "text-green-500",
                        transaction.status === 'Failed' && "text-red-500",
                        transaction.status === 'Pending' && "text-yellow-500"
                      )}>
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
      </div>
    </div>
  );
};

// Sample data
export const sampleSavingsDetail = {
  savingsInfo: {
    name: "Christmas savings",
    groupId: "#CM5722GR",
    startDate: "17-09-2025",
    endDate: "17-09-2025",
    status: "Locked",
    motive: "Notes or purpose of the savings here"
  },
  balance: {
    amountSaved: 70000,
    targetAmount: 850000,
    frequency: "monthly",
    user: {
      name: "Nguh fabs demo",
      avatar: "/path/to/avatar.jpg"
    }
  },
  transactions: [
    {
      id: "1",
      type: "Savings",
      date: "Tue-12-11-24",
      amount: 20000,
      to: "Christmas savings",
      status: "Completed",
      remark: "Good"
    },
    {
      id: "2",
      type: "Savings",
      date: "Tue-12-11-24",
      amount: 20000,
      to: "Christmas savings",
      status: "Completed",
      remark: "Good"
    },
    {
      id: "3",
      type: "Savings",
      date: "Tue-12-11-24",
      amount: 20000,
      to: "Christmas savings",
      status: "Completed",
      remark: "Good"
    }
  ]
};

export default IndividualSavingsDetail;