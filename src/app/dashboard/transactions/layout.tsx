import TransactionSidebar from '@/components/dashboard/Transactions/SIdebar'
import UserSidebar from '@/components/dashboard/Users/Sidebar'
import React, { PropsWithChildren } from 'react'

function TransactionsLayout({children}:PropsWithChildren) {
  return (
    <div className='flex gap-2 w-full h-full'>
        <TransactionSidebar className='w-2/12'/>
        <div className='w-10/12 flex flex-1 h-full flex-col overflow-y-auto pb-32'>
            {children}
        </div>
    </div>
  )
}

export default TransactionsLayout