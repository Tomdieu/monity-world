"use client"
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type RecentTransactionsProps = {
  transactions: Transaction[];
  totalTransactions: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxHeight?: string;
};

const getStatusStyle = (status: TransactionStatus) => {
  switch (status) {
    case 'Completed':
      return 'text-green-500';
    case 'Failed':
      return 'text-red-400';
    default:
      return 'text-gray-500';
  }
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  totalTransactions,
  currentPage,
  onPageChange,
  maxHeight = '400px'
}) => {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Transactions</h2>
      
      <div className="relative">
        {/* Header */}
        <div className="bg-gray-50 rounded-t-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                  <div className="flex items-center gap-1">
                    Trans type
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                  <div className="flex items-center gap-1">
                    Date/Time
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                  <div className="flex items-center gap-1">
                    Amount/xaf
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                  <div className="flex items-center gap-1">
                    To
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                  <div className="flex items-center gap-1">
                    Status
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm text-blue-400 font-medium">
                  <div className="flex items-center gap-1">
                    Remart
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Body */}
        <div className={`overflow-y-auto`} style={{ maxHeight }}>
          <table className="w-full">
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction, index) => (
                <tr key={transaction.id || index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.type}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.dateTime}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {transaction.recipient.avatar ? (
                      <div className="flex items-center gap-2">
                        <img 
                          src={transaction.recipient.avatar} 
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-700">{transaction.recipient.name}</p>
                          <p className="text-xs text-gray-500">{transaction.recipient.accountId}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-700">{transaction.recipient.name}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm flex items-center gap-1 ${getStatusStyle(transaction.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        transaction.status === 'Completed' ? 'bg-green-500' : 'bg-red-400'
                      }`}></span>
                      {transaction.status}
                    </span>
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
      
      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalTransactions)} of {totalTransactions}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;