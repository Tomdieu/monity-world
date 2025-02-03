import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, Copy, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface TrackInvestmentDetailProps {
  transaction: {
    general: {
      id: string;
      type: string;
      status: "Pending" | "Failed" | "Completed";
      currency: string;
      date: string;
      time: string;
    };
    amount: {
      transactionAmount: number;
      transactionFees: number;
      totalDebited: number;
      reference?: string;
    };
    parties: {
      sender: {
        name: string;
        accountId: string;
        avatar: string;
      };
      paymentMethod: string;
      recipient: {
        id: string;
      };
    };
  };
  onReturn?: () => void;
  className?: string;
}

const TrackInvestmentDetail: React.FC<TrackInvestmentDetailProps> = ({
  transaction,
  onReturn,
  className,
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={cn("p-6 space-y-6", className)}>
      {/* Return Button */}
      <Button
        onClick={onReturn}
        className="text-gray-600 hover:bg-gray-100 bg-transparent hover:bg-transparent shadow-none"
      >
        <div className="p-2 rounded-full bg-primary/10">
        <ArrowLeft className="size-4 text-primary" />
        </div>
        Return
      </Button>

      {/* General Information */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">General Information</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Transaction ID</label>
            <div className="flex items-center justify-between gap-2">
              <span className="text-primary font-bold">{transaction.general.id}</span>
              <button 
                onClick={() => handleCopy(transaction.general.id)}
                className="hover:bg-gray-100 p-1 rounded-md transition-colors"
              >
                <Copy className="size-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Transaction Type</label>
            <span className="text-primary font-bold">{transaction.general.type}</span>
          </div>

          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Transaction Status</label>
            <span className={cn(
              "flex items-center gap-1.5 text-sm",
              transaction.general.status === "Completed" && "text-green-500",
              transaction.general.status === "Failed" && "text-red-500",
              transaction.general.status === "Pending" && "text-yellow-500"
            )}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {transaction.general.status}
            </span>
          </div>

          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Currency</label>
            <span className="text-primary font-bold">{transaction.general.currency}</span>
          </div>

          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Date</label>
            <span className="text-primary font-bold">{transaction.general.date}</span>
          </div>

          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Time</label>
            <span className="text-primary font-bold">{transaction.general.time}</span>
          </div>
        </div>
      </div>

      {/* Amount Details */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Amount Details</h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Transaction Amount</label>
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold text-lg">
                {transaction.amount.transactionAmount.toLocaleString()}
              </span>
              <button 
                onClick={() => handleCopy(transaction.amount.transactionAmount.toString())}
                className="hover:bg-gray-100 p-1 rounded-md transition-colors"
              >
                <Copy className="size-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Transaction Fees</label>
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold text-lg">
                {transaction.amount.transactionFees.toLocaleString()}
              </span>
              <button 
                onClick={() => handleCopy(transaction.amount.transactionFees.toString())}
                className="hover:bg-gray-100 p-1 rounded-md transition-colors"
              >
                <Copy className="size-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="border rounded-md p-3">
            <label className="text-sm text-gray-500 mb-1 block">Total Debited</label>
            <span className="text-primary font-semibold text-lg">
              {transaction.amount.totalDebited.toLocaleString()}
            </span>
          </div>

          {transaction.amount.reference && (
            <div className="border rounded-md p-3">
              <label className="text-lg text-primary mb-1 block">Reference</label>
              <span className="text-sm text-gray-500">
                {transaction.amount.reference}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Involved Parties */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Involved Parties</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Sender */}
          <div className="border-2 border-primary rounded-lg p-4">
            <label className="text-sm text-gray-500 mb-3 block">Sender</label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-3">
              <Image
                src={transaction.parties.sender.avatar}
                alt={transaction.parties.sender.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{transaction.parties.sender.name}</p>
                <p className="text-xs text-gray-500">{transaction.parties.sender.accountId}</p>
              </div>
                </div>

              <Button className="w-fit bg-primary hover:bg-primary/90 text-white">
              See profil
            </Button>
            </div>
            
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <label className="text-sm text-gray-500 mb-2 block">Payment Method</label>
              <span className="text-primary">{transaction.parties.paymentMethod}</span>
            </div>
          </div>

          {/* Recipient */}
          <div className="border-2 border-emerald-500 rounded-lg p-4">
            <label className="text-sm text-gray-500 mb-3 block">Recipient</label>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{transaction.parties.recipient.id}</span>
              <Button className=" bg-primary hover:bg-primary/90 text-white">
                See project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample Data
export const sampleTransaction = {
  general: {
    id: "#CM5836hjGx",
    type: "Tranfer",
    status: "Pending" as const,
    currency: "XAF",
    date: "17-01-2024",
    time: "18:45"
  },
  amount: {
    transactionAmount: 78200,
    transactionFees: 750,
    totalDebited: 78950,
    reference: "Notes or purpose of the transaction here"
  },
  parties: {
    sender: {
      name: "Nguh fabs demo",
      accountId: "Account ID",
      avatar: "/images/img2.svg"
    },
    paymentMethod: "Digital wallet",
    recipient: {
      id: "PJT:432D"
    }
  }
};

export default TrackInvestmentDetail;