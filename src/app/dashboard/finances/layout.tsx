import FinancesSidebar from '@/components/dashboard/Finances/Sidebar'
import React, { PropsWithChildren } from 'react'

function SavingsLayout({children}:PropsWithChildren) {
  return (
    <div className='flex gap-2 w-full h-full'>
        <FinancesSidebar className='w-2/12'/>
        <div className='w-10/12 flex flex-1 flex-col h-full overflow-y-auto pb-50'>
            {children}
        </div>
    </div>
  )
}

export default SavingsLayout