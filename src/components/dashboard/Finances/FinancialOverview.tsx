import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface AccountSummary {
  totalBalances: number;
  savingsAccounts: number;
  pendingTransactions: number;
  cardBalance: number;
}

interface TransactionOverview {
  totalProcessed: number;
  currentRevenue: number;
  operationalCosts: number;
  netBalance: number;
}

interface MonthlyReport {
  month: string;
  processed: number;
  transactionFees: number;
  savingsFees: number;
  projectsFees: number;
  operationalCost: number;
  balance: number;
}

interface FinancialOverviewProps {
  accountSummary: AccountSummary;
  transactionOverview: TransactionOverview;
  monthlyReports: MonthlyReport[];
  className?: string;
}

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="bg-white rounded-lg p-4">
    <h3 className="text-sm text-gray-500 mb-2">{label}</h3>
    <p className="text-xl font-semibold">
      {value.toLocaleString()} XAF
    </p>
  </div>
);

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  accountSummary,
  transactionOverview,
  monthlyReports,
  className,
}) => {
  return (
    <div className={cn("p-6 space-y-6", className)}>
      {/* User Account Section */}
      <div>
        <h2 className="text-xl text-blue-400 mb-4">User Account</h2>
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Balances" value={accountSummary.totalBalances} />
          <StatCard label="Savings Accounts" value={accountSummary.savingsAccounts} />
          <StatCard label="Pending Transactions" value={accountSummary.pendingTransactions} />
          <StatCard label="Card Balance" value={accountSummary.cardBalance} />
        </div>
      </div>

      {/* Transactions Overview */}
      <div>
        <h2 className="text-xl text-blue-400 mb-4">Transactions Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-2">Total Processed</h3>
            <p className="text-xl font-semibold">{transactionOverview.totalProcessed.toLocaleString()} XAF</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-2">Current Revenue</h3>
            <p className="text-xl font-semibold">{transactionOverview.currentRevenue.toLocaleString()} XAF</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-2">Operational costs</h3>
            <p className="text-xl font-semibold">{transactionOverview.operationalCosts.toLocaleString()} XAF</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-2">Net Balance</h3>
            <p className="text-xl font-semibold">{transactionOverview.netBalance.toLocaleString()} XAF</p>
          </div>
        </div>
      </div>

      {/* Financial Details Report */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-blue-400">Financial details Report</h2>
          <div className="flex items-center gap-4">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Printer className="size-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Month</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Processed</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Transaction Fees</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Savings Fees</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Projects Fees</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500 font-medium">Operational Cost</th>
                  <th className="text-right py-3 px-4 text-sm text-gray-500 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthlyReports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="text-sm text-blue-500">{report.month}</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {report.processed.toLocaleString()} XAF
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-emerald-500">{report.transactionFees.toLocaleString()} XAF</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-emerald-500">{report.savingsFees.toLocaleString()} XAF</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-emerald-500">{report.projectsFees.toLocaleString()} XAF</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-red-500">{report.operationalCost.toLocaleString()} XAF</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm text-blue-500">{report.balance.toLocaleString()} XAF</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample Data
export const sampleData = {
  accountSummary: {
    totalBalances: 25230500,
    savingsAccounts: 2200000,
    pendingTransactions: 2250000,
    cardBalance: 3250000
  },
  transactionOverview: {
    totalProcessed: 25230500,
    currentRevenue: 4200000,
    operationalCosts: 1250000,
    netBalance: 3250000
  },
  monthlyReports: [
    {
      month: "January",
      processed: 25230500,
      transactionFees: 25230500,
      savingsFees: 25230500,
      projectsFees: 2230500,
      operationalCost: 7230500,
      balance: 2230500
    },
    {
      month: "February",
      processed: 25230500,
      transactionFees: 25230500,
      savingsFees: 25230500,
      projectsFees: 2230500,
      operationalCost: 7230500,
      balance: 2230500
    },
    // Add more months as needed
  ]
};

export default FinancialOverview;