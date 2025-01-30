"use client"
import InternationalFees, { sampleFees } from '@/components/dashboard/Finances/InternationalFee'
import React from 'react'

function internationalFees() {
  return (
    <div className='w-full h-full'>
      <InternationalFees initialFees={sampleFees} onSave={()=>{}} onDiscard={()=>{}} onReturn={()=>{}}/>
    </div>

  )
}

export default internationalFees