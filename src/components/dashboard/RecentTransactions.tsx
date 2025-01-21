"use client"
import React from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import Image from 'next/image';

type TransactionStatus = 'Completed' | 'Failed' | 'Flagged' | 'Cancelled';

type Transaction = {
  id: string;
  transType: string;
  transID: string;
  dateTime: string;
  amount: number;
  receiver: {
    name: string;
    accountId: string;
    avatar: string;
  };
  status: TransactionStatus;
  remark: string;
};

type RecentTransactionsProps = {
  transactions: Transaction[];
  totalTransactions: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
};

const getStatusStyle = (status: TransactionStatus) => {
  switch (status) {
    case 'Completed':
      return 'text-green-500';
    case 'Failed':
      return 'text-red-500';
    case 'Flagged':
      return 'text-red-500';
    case 'Cancelled':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
};

const getRemarkStyle = (remark: string) => {
  return remark === 'Danger Alert' ? 'text-red-500' : 'text-gray-700';
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  totalTransactions,
  currentPage,
  onPageChange,
}) => {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent transactions</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="size-3" />
                  Trans type
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="size-3" />
                  Trans ID
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="size-3" />
                  Date/Time
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="size-3" />
                  Amount/xaf
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="size-3" />
                  Receiver
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="size-3" />
                  Status
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="size-3" />
                  Remark
                </div>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{transaction.transType}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{transaction.transID}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{transaction.dateTime}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{transaction.amount.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Image 
                      src={transaction.receiver.avatar} 
                      alt={transaction.receiver.name}
                      className="w-6 h-6 rounded-full"
                      width={24}
                      height={24}
                    />
                    <div>
                      <p className="text-sm text-gray-700">{transaction.receiver.name}</p>
                      <p className="text-xs text-gray-500">{transaction.receiver.accountId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-sm flex items-center gap-1 ${getStatusStyle(transaction.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-500' :
                      transaction.status === 'Failed' ? 'bg-red-500' :
                      transaction.status === 'Flagged' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}></span>
                    {transaction.status}
                  </span>
                </td>
                <td className={`py-3 px-4 text-sm ${getRemarkStyle(transaction.remark)}`}>
                  {transaction.remark}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalTransactions)} of {totalTransactions}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;