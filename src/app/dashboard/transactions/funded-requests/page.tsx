"use client";
import {
  FilterBar,
  SearchBar,
  TransactionTable,
} from "@/components/dashboard/Transactions/FundedRequest";
import { sampleTransactionsFunds } from "@/constants/data";
import React from "react";

function FundedRequestsTransactionsPage() {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto p-5">
      <SearchBar onSearch={(query) => console.log("Search:", query)} />

      <FilterBar
        dateOptions={[
          { label: "Today", value: "today" },
          { label: "This Week", value: "week" },
          { label: "This Month", value: "month" },
        ]}
        typeOptions={[
          { label: "All", value: "all" },
          { label: "Transfer", value: "transfer" },
          { label: "Card recharge", value: "card_recharge" },
        ]}
        statusOptions={[
          { label: "All", value: "all" },
          { label: "Pending", value: "pending" },
          { label: "Completed", value: "completed" },
          { label: "Failed", value: "failed" },
        ]}
        remarkOptions={[
          { label: "All", value: "all" },
          { label: "Processing", value: "processing" },
          { label: "Good", value: "good" },
          { label: "Declined", value: "declined" },
        ]}
        onFilterChange={(type, value) => console.log(`${type}:`, value)}
        onReset={() => console.log("Reset filters")}
      />

      <div className="bg-white">
        <TransactionTable
          transactions={
            sampleTransactionsFunds
          }
          currentPage={1}
          totalItems={78}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  );
}

export default FundedRequestsTransactionsPage;
