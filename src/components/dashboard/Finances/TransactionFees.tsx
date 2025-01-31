import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeeRange {
  from: number;
  to: number;
  fee: number;
}

interface TransactionFeesProps {
  sendingCharges: FeeRange[];
  withdrawalCharges: FeeRange[];
  savingsManagementFee: number;
  cardTransactionFee: number;
  projectFundingFee: number;
  onReturn?: () => void;
  className?: string;
}

const FeeRangeSection: React.FC<{
  ranges: FeeRange[];
  title: string;
}> = ({ ranges, title }) => (
  <div className="bg-white rounded-lg p-6">
    <h2 className="text-lg font-semibold mb-6">{title}</h2>
    <div className="space-y-6">
      {ranges.map((range, index) => (
        <div key={index} className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">From</label>
            <div className="relative">
              <input
                type="text"
                value={range.from.toLocaleString()}
                readOnly
                className="w-full pl-4 pr-12 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">XAF</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">To</label>
            <div className="relative">
              <input
                type="text"
                value={range.to.toLocaleString()}
                readOnly
                className="w-full pl-4 pr-12 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">XAF</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">Fees</label>
            <div className="relative">
              <button className="w-full flex items-center justify-between pl-4 pr-3 py-2 text-blue-500 bg-white border border-blue-200 rounded-md hover:bg-blue-50">
                <span>{range.fee.toFixed(2)} %</span>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SingleFeeSection: React.FC<{
  title: string;
  fee: number;
}> = ({ title, fee }) => (
  <div>
    <h3 className="text-lg text-blue-500 mb-3">{title}</h3>
    <button className="flex items-center justify-between pl-4 pr-3 py-2 text-blue-500 bg-white border border-blue-200 rounded-md hover:bg-blue-50 min-w-[120px]">
      <span>{fee.toFixed(2)} %</span>
      <ChevronDown className="size-4" />
    </button>
  </div>
);

const TransactionFees: React.FC<TransactionFeesProps> = ({
  sendingCharges,
  withdrawalCharges,
  savingsManagementFee,
  cardTransactionFee,
  projectFundingFee,
  onReturn,
  className,
}) => {
  return (
    <div className={cn("max-w-7xl mx-auto p-6", className)}>
      {/* Return Button */}
      <Button
        variant="ghost"
        onClick={onReturn}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="size-4 mr-2" />
        Return
      </Button>

      {/* Main Charges Sections */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <FeeRangeSection
          title="Sending charges"
          ranges={sendingCharges}
        />
        <FeeRangeSection
          title="Withdrawal charges"
          ranges={withdrawalCharges}
        />
      </div>

      {/* Other Fees Section */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-8">
        <SingleFeeSection
          title="Charges on savings management"
          fee={savingsManagementFee}
        />
        <SingleFeeSection
          title="Charges on Card transactions"
          fee={cardTransactionFee}
        />
        <SingleFeeSection
          title="Charges on Project Funding"
          fee={projectFundingFee}
        />
      </div>
    </div>
  );
};

// Sample Data
export const sampleFees = {
  sendingCharges: [
    { from: 0, to: 5000, fee: 0.25 },
    { from: 5001, to: 30000, fee: 0.20 },
    { from: 30001, to: 100000, fee: 0.15 },
    { from: 100001, to: 500000, fee: 0.10 },
    { from: 500001, to: 1000000, fee: 0.05 },
  ],
  withdrawalCharges: [
    { from: 0, to: 5000, fee: 1.50 },
    { from: 5001, to: 30000, fee: 1.30 },
    { from: 30001, to: 100000, fee: 1.20 },
    { from: 100001, to: 500000, fee: 1.00 },
    { from: 500001, to: 1000000, fee: 1.00 },
  ],
  savingsManagementFee: 1.50,
  cardTransactionFee: 1.50,
  projectFundingFee: 1.50,
};

export default TransactionFees;