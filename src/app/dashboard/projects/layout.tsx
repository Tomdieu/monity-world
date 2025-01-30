import ProjectSidebar from '@/components/dashboard/Projects/Sidebar'
import React, { PropsWithChildren } from 'react'

function SavingsLayout({children}:PropsWithChildren) {
  return (
    <div className='flex gap-2 w-full h-full'>
        <ProjectSidebar className='w-2/12'/>
        <div className='w-10/12 flex flex-col h-full overflow-y-auto'>
            {children}
        </div>
    </div>
  )
}

export default SavingsLayout