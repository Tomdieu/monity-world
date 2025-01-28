"use client";

import GroupSavingsDetail from "@/components/dashboard/Savings/GroupSavingDetail";
import { useRouter } from "next/navigation";
import React from "react";

function GroupSavingsDetailPage() {
  const sampleGroupSavingsDetail = {
    groupInfo: {
      name: "Cotisation veterans 30k",
      groupId: "#CM5722GR",
      startDate: "17-09-2025",
      members: 12,
      frequency: "Monthly" as const,
      endDate: "17-09-2025",
      status: "Locked",
    },
    balance: {
      currentBalance: 70000,
      targetAmount: 350000,
      round: 7,
      paid:3,
      paidTotal: 12,
      nextRecipient: {
        name: "Nguh Fabrice",
        avatar: "/images/img2.svg",
        accountId:"Account Id"
      },
    },
    transactions: [
      {
        id: "1",
        type: "Savings",
        date: "Tue-12-11-24",
        amount: 30000,
        to: "Cotisation veterans 3",
        status: "Completed",
        remark: "Good",
      },
      {
        id: "2",
        type: "Withdrawal",
        date: "Tue-12-11-24",
        amount: 350000,
        to: "Bertrand Ngujo",
        status: "Completed",
        remark: "Good",
      },
      {
        id: "3",
        type: "Savings",
        date: "Tue-12-11-24",
        amount: 30000,
        to: "Cotisation veterans 3",
        status: "Completed",
        remark: "Good",
      },
    ],
  };
  const router = useRouter()
  return (
    <div>
      <GroupSavingsDetail
        groupInfo={sampleGroupSavingsDetail.groupInfo}
        balance={sampleGroupSavingsDetail.balance}
        transactions={sampleGroupSavingsDetail.transactions}
        onReturn={()=>router.back()}
      />
    </div>
  );
}

export default GroupSavingsDetailPage;
