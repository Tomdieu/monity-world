"use client"
import GroupSavingsTable from "@/components/dashboard/Savings/GroupingSavings";
import { useRouter } from "next/navigation";
import React from "react";

function GroupSavingsPage() {
  const sampleGroupSavings = [
    {
      id: "1",
      groupId: "#CM5722GR",
      groupName: "Cotisation Val...",
      balance: 355000,
      target: 755500,
      startDate: "17-09-2024",
      endDate: "17-09-2025",
      rounds: 12,
      recents: 35000,
    },
    {
      id: "2",
      groupId: "#CM5722GR",
      groupName: "Cotisation Val...",
      balance: 255000,
      target: 505000,
      startDate: "17-09-2024",
      endDate: "17-09-2025",
      rounds: 7,
      recents: 25000,
    },
    {
      id: "3",
      groupId: "#CM5722GR",
      groupName: "Cotisation Val...",
      balance: 25000,
      target: 125000,
      startDate: "17-09-2024",
      endDate: "17-09-2024",
      rounds: 5,
      recents: -10500,
    },
    // Add more sample data as needed
  ];
  const router = useRouter();
  return (
    <div>
      <GroupSavingsTable
        groupSavings={sampleGroupSavings}
        currentPage={1}
        totalItems={12}
        onPageChange={() => {}}
        onManage={(id) => router.push(`/dashboard/savings/group/${id}`) }
      />
    </div>
  );
}

export default GroupSavingsPage;
