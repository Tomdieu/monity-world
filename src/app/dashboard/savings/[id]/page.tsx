"use client"
import IndividualSavingsDetail from "@/components/dashboard/Savings/IndividualSavingDetail";
import { useRouter } from "next/navigation";
import React from "react";

function IndividualSavingsDetailPage() {
    const sampleSavingsDetail = {
        savingsInfo: {
          name: "Christmas savings",
          groupId: "#CM5722GR",
          startDate: "17-09-2025",
          endDate: "17-09-2025",
          status: "Locked",
          motive: "Notes or purpose of the savings here"
        },
        balance: {
          amountSaved: 70000,
          targetAmount: 850000,
          frequency: "monthly",
          user: {
            name: "Nguh fabs demo",
            avatar: "/images/img2.svg"
          }
        },
        transactions: [
          {
            id: "1",
            type: "Savings",
            date: "Tue-12-11-24",
            amount: 20000,
            to: "Christmas savings",
            status: "Completed",
            remark: "Good"
          },
          {
            id: "2",
            type: "Savings",
            date: "Tue-12-11-24",
            amount: 20000,
            to: "Christmas savings",
            status: "Completed",
            remark: "Good"
          },
          {
            id: "3",
            type: "Savings",
            date: "Tue-12-11-24",
            amount: 20000,
            to: "Christmas savings",
            status: "Completed",
            remark: "Good"
          }
        ]
      };
      const router = useRouter()
  return (
    <div className="flex flex-col w-full h-full p-5">
      <IndividualSavingsDetail
        savingsInfo={sampleSavingsDetail.savingsInfo}
        balance={sampleSavingsDetail.balance}   
        transactions={sampleSavingsDetail.transactions}
        onReturn={()=>router.back()}
      />
    </div>
  );
}

export default IndividualSavingsDetailPage;
