"use client"
import Statistics, { sampleData } from '@/components/dashboard/Finances/Statistic'
import React from 'react'

function StatisticsPage() {
  return (
    <div className='h-full'>
      <Statistics data={sampleData}/>
    </div>
  )
}

export default StatisticsPage