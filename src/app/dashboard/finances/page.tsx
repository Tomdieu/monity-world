"use client"
import FinancialOverview, { sampleData } from '@/components/dashboard/Finances/FinancialOverview'
import React from 'react'

export default function FinancePage() {
  return (
    <div className='w-full'>
        <FinancialOverview accountSummary={sampleData.accountSummary}  monthlyReports={sampleData.monthlyReports} transactionOverview={sampleData.transactionOverview}/>
    </div>
  )
}
