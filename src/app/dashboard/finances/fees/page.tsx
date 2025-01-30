import TransactionFees, {
  sampleFees,
} from "@/components/dashboard/Finances/TransactionFees";
import React from "react";

function page() {
  return (
    <div>
      <TransactionFees
        cardTransactionFee={sampleFees.cardTransactionFee}
        projectFundingFee={sampleFees.projectFundingFee}
        withdrawalCharges={sampleFees.withdrawalCharges}
        sendingCharges={sampleFees.sendingCharges}
        savingsManagementFee={sampleFees.savingsManagementFee}
      />
    </div>
  );
}

export default page;
