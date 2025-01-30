import ProjectsList, { sampleProjects } from '@/components/dashboard/Projects/ProjectsList'
import React from 'react'

function ApprovedProjects() {

  return (
    <div className='flex flex-col gap-5 p-5'>
        <ProjectsList projects={sampleProjects}/>
    </div>
  )
}

export default ApprovedProjects