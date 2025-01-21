"use client"
import UserDataTable from '@/components/dashboard/Users/UserDataTable'
import UserFilter from '@/components/dashboard/Users/UserFilter'
import { users } from '@/constants/data'
import { Search } from 'lucide-react'
import React from 'react'

function UserProfilesPage() {
    return (
        <div className='flex flex-1 flex-col gap-5 w-full px-5'>
            <div className='w-full flex'>
                <form className='flex items-center gap-4 w-8/12'>
                    <div className='flex items-center p-3 py-2 gap-2 border rounded-full flex-1'>
                        <Search className='size-5 text-muted-foreground' />
                        <input className='border-none outline-none' placeholder='Search user ID or Name' type='search' />

                    </div>
                    <button className='rounded-full bg-primary p-2 h-full px-20 font-medium text-white'>Search</button>
                </form>
            </div>
            <UserFilter nameOptions={[
                { label: 'A-Z', value: 'asc' },
                { label: 'Z-A', value: 'desc' },
            ]}
                dateOptions={[
                    { label: 'Newest', value: 'newest' },
                    { label: 'Oldest', value: 'oldest' },
                ]}
                townOptions={[
                    { label: 'All', value: 'all' },
                    { label: 'Buea', value: 'buea' },
                    { label: 'Douala', value: 'douala' },
                ]}
                typeOptions={[
                    { label: 'All', value: 'all' },
                    { label: 'Type A', value: 'a' },
                    { label: 'Type B', value: 'b' },
                ]}
                statusOptions={[
                    { label: 'All', value: 'all' },
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                ]} />
            <UserDataTable
                users={users}
                totalUsers={78}
                currentPage={1}
                onPageChange={(page) => console.log('Page changed:', page)}
            />
        </div>
    )
}

export default UserProfilesPage
