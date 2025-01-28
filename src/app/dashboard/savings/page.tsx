"use client"
import SavingsTable from "@/components/dashboard/Savings/IndividualSavings";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const sampleSavings = [
    {
      id: "1",
      savingId: "#CM5836hjG7",
      user: {
        name: "Nguh fabs demo",
        accountId: "Account ID",
        avatar: "/images/img2.svg",
      },
      balance: 300000,
      target: 146500,
      startDate: "17-09-2025",
      endDate: "17-09-2025",
      status: "Active",
      recents: 5000,
    },
    // Add more sample data as needed
  ];
  const router = useRouter()

  return (
    <div className="flex flex-col w-full h-full p-5">
      <SavingsTable
        savings={sampleSavings}
        currentPage={0}
        totalItems={0}
        onPageChange={() => {}}
        onManage={(id) => router.push(`/dashboard/savings/${id}/`)}
      />
    </div>
  );
}

export default page;
