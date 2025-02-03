"use client";
import {
  ConfirmPasscodeDialog,
  DiscardDialog,
  ExitDialog,
} from "@/components/dashboard/Finances/FinanceDialogs";
import TransactionFees, {
  sampleFees,
} from "@/components/dashboard/Finances/TransactionFees";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function FinanceFeesPage() {
  const router = useRouter();
  const [isExitOpen, setIsExit] = useState(false);
  return (
    <div className="w-full h-full">
      <TransactionFees
        cardTransactionFee={sampleFees.cardTransactionFee}
        projectFundingFee={sampleFees.projectFundingFee}
        withdrawalCharges={sampleFees.withdrawalCharges}
        sendingCharges={sampleFees.sendingCharges}
        savingsManagementFee={sampleFees.savingsManagementFee}
        onReturn={() => setIsExit(true)}
      />
      {/* <ConfirmPasscodeDialog open onCancel={()=>{}} onConfirm={()=>{}}/> */}
      <ExitDialog
        open={isExitOpen}
        onCancel={() => setIsExit(false)}
        onConfirm={()=>router.back()}
      />
      <div className="pb-20"></div>
    </div>
  );
}

export default FinanceFeesPage;
