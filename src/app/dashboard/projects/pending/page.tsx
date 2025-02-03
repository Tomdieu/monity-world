import ProjectsList, { sampleProjects } from '@/components/dashboard/Projects/ProjectsList'
import React from 'react'

function PendingProjects() {

  return (
    <div className='flex flex-col flex-1 gap-5 p-5'>
        <ProjectsList isApprove={false} projects={sampleProjects}/>
    </div>
  )
}

export default PendingProjects