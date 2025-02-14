"use client";
import TransactionFilter from "@/components/dashboard/Transactions/TransactionFilter";
import TransactionTable from "@/components/dashboard/Transactions/TransactionTable";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function TransactionsPage() {
  const [selectedFilters, setSelectedFilters] = React.useState<
    Record<string, string>
  >({});
  const filterConfigs = [
    {
      name: "Date",
      options: [
        { label: "Last 7 days", value: "7days" },
        { label: "Last 30 days", value: "30days" },
        { label: "Last 90 days", value: "90days" },
      ],
    },
    {
      name: "Trans type",
      options: [
        { label: "All", value: "all" },
        { label: "Deposit", value: "deposit" },
        { label: "Withdrawal", value: "withdrawal" },
      ],
    },
    {
      name: "Trans Status",
      options: [
        { label: "All", value: "all" },
        { label: "Completed", value: "completed" },
        { label: "Pending", value: "pending" },
        { label: "Failed", value: "failed" },
      ],
    },
    {
      name: "Remark",
      options: [
        { label: "All", value: "all" },
        { label: "Good", value: "good" },
        { label: "Warning", value: "warning" },
      ],
    },
  ];

  const handleFilterChange = (name: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const transactions = [
    {
      id: '1',
      type: 'Transfer',
      transId: '#CM5836hjG7',
      dateTime: 'Tue-12-11-24',
      amount: 20000,
      source: {
        name: 'Nguh fabs demo',
        accountId: 'Account ID',
        avatar: '/images/img2.svg'
      },
      destination: {
        name: 'Nguh fabs demo',
        accountId: 'Account ID',
        avatar: '/images/img2.svg'
      },
      status: 'Pending' as TransactionStatus,
      remark: 'Processing' as RemarkStatus
    },
    // Add more sample transactions
  ];

  const router = useRouter()

  const handleReset = () => {
    setSelectedFilters({});
  };
  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="w-full flex">
          <form className="flex items-center gap-4 w-8/12">
            <div className="flex items-center p-3 py-2 gap-2 border rounded-full flex-1">
              <Search className="size-5 text-muted-foreground" />
              <input
                className="border-none outline-none flex-1 bg-transparent"
                placeholder="Search transactions"
                type="search"
              />
            </div>
            <button className="rounded-full bg-primary p-2 h-full px-20 font-medium text-white">
              Search
            </button>
          </form>
        </div>
        <TransactionFilter
          filters={filterConfigs}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>
      <div className="bg-white rounded-lg p-0">

      <TransactionTable onIdClick={(id)=>{
        router.push(`/dashboard/transactions/uncompleted/${id}`)
      }} transactions={transactions} className="border-spacing-1" />
      </div>
    </div>
  );
}

export default TransactionsPage;
