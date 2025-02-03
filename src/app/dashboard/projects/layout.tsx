import ProjectSidebar from '@/components/dashboard/Projects/Sidebar'
import React, { PropsWithChildren } from 'react'

function ProjectLayout({children}:PropsWithChildren) {
  return (
    <div className='flex gap-2 w-full h-full'>
        <ProjectSidebar className='w-2/12'/>
        <div className='w-10/12 flex flex-1 pb-20 flex-col overflow-y-auto bg-slate-50'>
            {children}
        </div>
    </div>
  )
}

export default ProjectLayout