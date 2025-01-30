"use client"
import TrackInvestmentDetail, { sampleTransaction } from '@/components/dashboard/Projects/TrackInvestmentDetail'
import React from 'react'

function page() {
  return (
    <div>
        <TrackInvestmentDetail transaction={sampleTransaction}/>
    </div>
  )
}

export default page