"use client";
import TrackInvestmentDetail, {
  sampleTransaction,
} from "@/components/dashboard/Projects/TrackInvestmentDetail";
import { useRouter } from "next/navigation";
import React from "react";

function TrackInvestmentDetailPage() {
  const router = useRouter();
  return (
    <div className="w-full">
      <TrackInvestmentDetail
        onReturn={() => router.back()}
        transaction={sampleTransaction}
      />
    </div>
  );
}

export default TrackInvestmentDetailPage;
