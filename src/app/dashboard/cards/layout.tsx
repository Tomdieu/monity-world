import CardsSidebar from '@/components/dashboard/cards/Sidebar'
import React, { PropsWithChildren } from 'react'

function CardsPage({children}:PropsWithChildren) {
  return (
    <div className='flex gap-2 w-full h-full'>
        <CardsSidebar className='w-2/12'/>
        <div className='w-10/12 flex flex-col h-full overflow-y-auto'>
            {children}
        </div>
    </div>
  )
}

export default CardsPage