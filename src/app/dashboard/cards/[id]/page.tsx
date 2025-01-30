"use client"

import React from 'react';
import { ArrowLeft, Copy, ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface CardInfo {
  cardId: string;
  cardNumber: string;
  cardType: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  cardHolder: {
    name: string;
    image: string;
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
  status: 'Completed' | 'Pending' | 'Failed';
  remark: string;
}

// Header Component
const Header: React.FC = () => (
  <div className="flex items-center mb-6">
    <button className="flex items-center text-gray-600">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Return
    </button>
  </div>
);

// Card Information Component
const CardInformation: React.FC<{ info: CardInfo }> = ({ info }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
    <h2 className="text-emerald-500 text-lg font-semibold mb-4">Card Information</h2>
    <div className="grid grid-cols-4 gap-6">
      <div>
        <p className="text-gray-500 text-sm mb-1">Card ID</p>
        <p className="text-blue-500 font-medium">{info.cardId}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">Card Number</p>
        <div className="flex items-center">
          <p className="font-medium mr-2">{info.cardNumber}</p>
          <Copy className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">Card Type</p>
        <p className="text-blue-500">{info.cardType}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">Status</p>
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-600 text-sm">
          {info.status}
        </span>
      </div>
    </div>
    <div className="absolute top-6 right-6">
      <div className="flex items-center bg-gray-50 rounded-lg p-2">
        <img src={info.cardHolder.image} alt="Card holder" className="w-8 h-8 rounded-full" />
        <div className="ml-2">
          <p className="text-sm font-medium">{info.cardHolder.name}</p>
          <button className="text-xs text-gray-500">See Account</button>
        </div>
      </div>
    </div>
  </div>
);

// Balance Information Component
const BalanceSection: React.FC<{ balance: BalanceInfo }> = ({ balance }) => (
  <div className="bg-blue-50 p-6 rounded-lg mb-6">
    <h2 className="text-gray-600 text-lg mb-4">Balance</h2>
    <div className="grid grid-cols-3 gap-6">
      <div>
        <p className="text-gray-500 text-sm mb-1">Current Balance</p>
        <p className="text-xl font-semibold">{balance.currentBalance.toLocaleString()} XAF</p>
      </div>
      <div className="bg-pink-50 rounded-lg p-4">
        <p className="text-gray-500 text-sm mb-1">Max Limits</p>
        <p className="text-xl font-semibold">{balance.maxLimit.toLocaleString()} XAF</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-4">
        <p className="text-gray-500 text-sm mb-1">Daily Limit</p>
        <p className="text-xl font-semibold">{balance.dailyLimit.toLocaleString()} XAF</p>
      </div>
    </div>
  </div>
);

// Extra Information Component
const ExtraInfoSection: React.FC<{ info: ExtraInfo }> = ({ info }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
    <h2 className="text-emerald-500 text-lg font-semibold mb-4">Extra info</h2>
    <div className="grid grid-cols-2 gap-6">
      <div>
        <p className="text-gray-500 text-sm mb-1">Verification number</p>
        <p className="text-blue-500">{info.verificationNumber}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">Expiration Date</p>
        <div className="flex items-center">
          <p className="mr-2">{info.expirationDate}</p>
          <button className="px-3 py-1 bg-gray-200 rounded text-sm">Extend</button>
        </div>
      </div>
    </div>
  </div>
);

// Transactions Table Component
const TransactionsTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
    <h2 className="text-gray-600 text-lg mb-4">Recent Transactions</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-50">
          <tr>
            <th className="text-left p-3 text-sm text-gray-600">Trans type</th>
            <th className="text-left p-3 text-sm text-gray-600">Date/Time</th>
            <th className="text-left p-3 text-sm text-gray-600">Amount/xaf</th>
            <th className="text-left p-3 text-sm text-gray-600">To</th>
            <th className="text-left p-3 text-sm text-gray-600">Status</th>
            <th className="text-left p-3 text-sm text-gray-600">Remark</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="p-3">{transaction.type}</td>
              <td className="p-3">{transaction.dateTime}</td>
              <td className="p-3 text-red-500">-{transaction.amount.toLocaleString()}</td>
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
      <p className="text-sm text-gray-500">Showing 1-3 of 3</p>
      <div className="flex gap-2">
        <button className="p-2 rounded hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// Freeze Card Button Component
const FreezeCardButton: React.FC = () => (
  <div className="bg-blue-50 p-6 rounded-lg">
    <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
      Freeze card
    </button>
  </div>
);

// Main Card Detail Page Component
const CardDetailPage: React.FC = () => {
  const cardInfo: CardInfo = {
    cardId: 'NFC235KI7L',
    cardNumber: '*********2456',
    cardType: 'NFC Card',
    status: 'Active',
    cardHolder: {
      name: 'Ngeh Han demo',
      image: '/api/placeholder/32/32',
    },
  };

  const balanceInfo: BalanceInfo = {
    currentBalance: 29000,
    maxLimit: 300000,
    dailyLimit: 30000,
  };

  const extraInfo: ExtraInfo = {
    verificationNumber: '+237 6500749592',
    expirationDate: '17-09-2025',
  };

  const transactions: Transaction[] = [
    {
      type: 'Shopping',
      dateTime: 'Tue-12-11-24',
      amount: 30000,
      to: 'Cotisation veterans 3',
      status: 'Completed',
      remark: 'Good',
    },
    // Add more transactions as needed
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header />
      <CardInformation info={cardInfo} />
      <div className="grid grid-cols-2 gap-6">
        <BalanceSection balance={balanceInfo} />
        <ExtraInfoSection info={extraInfo} />
      </div>
      <TransactionsTable transactions={transactions} />
      <FreezeCardButton />
    </div>
  );
};

export default CardDetailPage;