"use client";
import { TransactionDetails } from "@/components/dashboard/Transactions/TransactionDetails";
import {
  AmountDetails,
  GeneralInformation,
  InvolvedParties,
} from "@/components/dashboard/Transactions/Uncomplete";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

function UncompletedTransactionsPage() {
  const transactionData = {
    id: "CM5836hjGx",
    type: "Transfer",
    status: "Pending",
    currency: "XAF",
    date: "17-01-2024",
    time: "18:45",
    amount: "78,200",
    fees: "750",
    total: "78 950",
    reference: "Notes or purpose of the transaction here",
  };

  return (
    <div className="flex flex-col gap-5 overflow-y-auto p-5">
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          className="rounded-full bg-primary/10 hover:bg-primary/20"
        >
          <ArrowLeft className="size-4 text-primary" />
        </Button>
        <span className="font-semibold text-muted-foreground">Return</span>
      </div>
      <div className="space-y-6 p-6">
        <GeneralInformation
          transactionId="#CM5836hjGx"
          transactionType="Tranfer"
          status={{ status: "Pending", color: "yellow" }}
          currency="XAF"
          date="17-01-2024"
          time="18:45"
        />

        <AmountDetails
          transactionAmount={78200}
          transactionFees={750}
          totalDebited={78950}
          reference="Notes or purpose of the transaction here"
        />
        <InvolvedParties
          sender={{
            name: "Nguh fabs demo",
            accountId: "Account ID",
            avatar: "/images/img1.png",
          }}
          recipient={{
            name: "Nguh fabs demo",
            accountId: "Account ID",
            avatar: "/images/img1.png",
          }}
          paymentMethod="Digital wallet"
          onViewProfile={() => {}}
        />
        <div className="flex items-center w-full justify-center gap-5 bg-primary/5 p-5 rounded-lg">
          <Button variant={"destructive"} size={"lg"}>Abort transaction</Button>
          <Button className="bg-success hover:bg-success/90 text-white" size={"lg"}>Confirm transaction</Button>

        </div>

      </div>
    </div>
  );
}

export default UncompletedTransactionsPage;
