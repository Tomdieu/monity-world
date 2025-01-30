"use client"
import Statistics, { sampleData } from '@/components/dashboard/Finances/Statistic'
import React from 'react'

function StatisticsPage() {
  return (
    <div>
      <Statistics data={sampleData}/>
    </div>
  )
}

export default StatisticsPage