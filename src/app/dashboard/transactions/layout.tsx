import TransactionSidebar from '@/components/dashboard/Transactions/SIdebar'
import UserSidebar from '@/components/dashboard/Users/Sidebar'
import React, { PropsWithChildren } from 'react'

function TransactionsLayout({children}:PropsWithChildren) {
  return (
    <div className='flex gap-2 w-full h-full'>
        <TransactionSidebar className='w-2/12'/>
        <div className='w-10/12 flex flex-col h-full overflow-y-auto'>
            {children}
        </div>
    </div>
  )
}

export default TransactionsLayout