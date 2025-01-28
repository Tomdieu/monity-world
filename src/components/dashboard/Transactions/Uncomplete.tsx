import React from "react";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface TransactionStatus {
  status: "Pending" | "Completed" | "Failed";
  color: string;
}

interface GeneralInfoProps {
  transactionId: string;
  transactionType: string;
  status: TransactionStatus;
  currency: string;
  date: string;
  time: string;
  className?: string;
}

const GeneralInformation: React.FC<GeneralInfoProps> = ({
  transactionId,
  transactionType,
  status,
  currency,
  date,
  time,
  className,
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={cn("w-full bg-white rounded-lg p-6", className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        General Information
      </h2>

      <div className="grid grid-cols-6 gap-6">
        {/* Transaction ID */}
        <div className="col-span-6 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">
            Transaction ID
          </label>
          <div className="flex items-center gap-2">
            <span className="text-primary font-semibold">{transactionId}</span>
            <button
              onClick={() => handleCopy(transactionId)}
              className="hover:bg-gray-100 p-1 rounded-md transition-colors"
            >
              <Copy className="size-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Transaction Type */}
        <div className="col-span-6 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">
            Transaction Type
          </label>
          <span className="text-primary font-semibold">{transactionType}</span>
        </div>

        {/* Status */}
        <div className="col-span-6 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">
            Transaction Status
          </label>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                status.status === "Pending" && "bg-yellow-500",
                status.status === "Completed" && "bg-green-500",
                status.status === "Failed" && "bg-red-500"
              )}
            />
            <span
              className={cn(
                "text-sm",
                status.status === "Pending" && "text-yellow-500",
                status.status === "Completed" && "text-green-500",
                status.status === "Failed" && "text-red-500"
              )}
            >
              {status.status}
            </span>
          </div>
        </div>

        {/* Currency */}
        <div className="col-span-6 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">Currency</label>
          <span className="text-primary font-semibold">{currency}</span>
        </div>

        {/* Date */}
        <div className="col-span-6 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">Date</label>
          <span className="text-primary font-semibold">{date}</span>
        </div>

        {/* Time */}
        <div className="col-span-6 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">Time</label>
          <span className="text-primary font-semibold">{time}</span>
        </div>
      </div>
    </div>
  );
};

interface AmountDetailsProps {
  transactionAmount: number;
  transactionFees: number;
  totalDebited: number;
  reference?: string;
  className?: string;
}

const AmountDetails: React.FC<AmountDetailsProps> = ({
  transactionAmount,
  transactionFees,
  totalDebited,
  reference,
  className,
}) => {
  return (
    <div className={cn("w-full bg-white rounded-lg p-6", className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Amount Details
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {/* Transaction Amount */}
        <div className="col-span-4 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">
            Transaction Amount
          </label>
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium">
              {transactionAmount.toLocaleString()}
            </span>
            <button className="hover:bg-gray-100 p-1 rounded-md transition-colors">
              <Copy className="size-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Transaction Fees */}
        <div className="col-span-4 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">
            Transaction Fees
          </label>
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium">
              {transactionFees.toLocaleString()}
            </span>
            <button className="hover:bg-gray-100 p-1 rounded-md transition-colors">
              <Copy className="size-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Total Debited */}
        <div className="col-span-4 sm:col-span-1 rounded-lg border p-5">
          <label className="block text-sm text-gray-500 mb-1">
            Total Debited
          </label>
          <span className="text-primary font-medium">{totalDebited.toLocaleString()}</span>
        </div>

        {/* Reference */}
        {reference && (
          <div className="col-span-4 sm:col-span-1 rounded-lg border p-5">
            <label className="block text-sm text-primary font-semibold mb-1">
              Reference
            </label>
            <span className="text-sm text-gray-500">{reference}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface PartyInfo {
  name: string;
  accountId: string;
  avatar: string;
}

interface InvolvedPartiesProps {
  sender: PartyInfo;
  recipient: PartyInfo;
  paymentMethod: string;
  onViewProfile?: (party: "sender" | "recipient") => void;
  className?: string;
}

const InvolvedParties: React.FC<InvolvedPartiesProps> = ({
  sender,
  recipient,
  paymentMethod,
  onViewProfile,
  className,
}) => {
  return (
    <div className={cn("w-full bg-white rounded-lg p-6", className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Involved Parties
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Sender */}
        <div className="col-span-1">
          <div className="border-2 border-primary rounded-lg p-4">
            <label className="block text-sm text-gray-500 mb-3">Sender</label>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex flex-1 items-center justify-between">
                <Image
                  src={sender.avatar}
                  alt={sender.name}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {sender.name}
                  </p>
                  <p className="text-xs text-gray-500">{sender.accountId}</p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                className="w-fit bg-primary hover:bg-primary/90 text-white"
                onClick={() => onViewProfile?.("sender")}
              >
                See profil
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="col-span-1 flex items-center justify-center">
          <div className="text-center border p-5 rounded-sm">
            <label className="block text-sm text-gray-500 mb-2">
              Payment Method
            </label>
            <span className="text-primary font-semibold">{paymentMethod}</span>
          </div>
        </div>

        {/* Recipient */}
        <div className="col-span-1">
          <div className="border-2 border-green-400 rounded-lg p-4">
            <label className="block text-sm text-gray-500 mb-3">
              Recipient
            </label>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex flex-1 items-center justify-between">
                <Image
                  src={recipient.avatar}
                  alt={recipient.name}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {recipient.name}
                  </p>
                  <p className="text-xs text-gray-500">{recipient.accountId}</p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                className="w-fit bg-primary hover:bg-primary/90 text-white"
                onClick={() => onViewProfile?.("recipient")}
              >
                See profil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GeneralInformation, AmountDetails, InvolvedParties };
