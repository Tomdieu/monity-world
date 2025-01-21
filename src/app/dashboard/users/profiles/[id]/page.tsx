"use client"
import BalanceSummary from '@/components/dashboard/Users/BalanceSummary'
import FreezeAccountModal from '@/components/dashboard/Users/modals/FreezeAccountModal'
import RecentTransactions from '@/components/dashboard/Users/RecentTransactions'
import ProfileCard from '@/components/dashboard/Users/UserProfile'
import { Button } from '@/components/ui/button'
import { balanceData, userData, userTransactions } from '@/constants/data'
import { ArrowLeft, Cpu, Pen } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

function UserProfileDetailPage() {
    const [openFreezeAccountModal,setOpenFreezeAccountModal] = useState(false)
    return (
        <div className='flex flex-1 flex-col sm:flex-row gap-5 w-full h-full px-5 py-5'>
            <div className='w-3/12 flex flex-col gap-8 h-full'>
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-3 items-center'>
                        <Link href={"/dashboard/users/profiles"} className='flex items-center justify-center p-1 rounded-full bg-primary/15'>
                            <ArrowLeft className='size-5 text-primary' />
                        </Link>
                        <span className='text-muted-foreground text-lg font-medium'>Return</span>
                    </div>
                    <ProfileCard user={userData} />
                </div>
                <div className='border-t shadow-sm px-6 py-3 flex flex-col gap-5 rounded-lg'>
                    <Button size={"lg"} className='text-white bg-neutral-400 hover:bg-neutral-400/80'>
                        <Pen />
                        <span>Freeze account</span>
                    </Button>
                    <Button onClick={()=>setOpenFreezeAccountModal(true)} size={"lg"} className='text-white bg-red-500 hover:bg-red-500/80'>

                        <span>Freeze account</span>
                        <Cpu />
                    </Button>
                    <FreezeAccountModal open={openFreezeAccountModal} onOpenChange={setOpenFreezeAccountModal}/>
                </div>
            </div>
            <div className='w-9/12 flex flex-col gap-5 overflow-y-auto h-full'>
                <BalanceSummary sections={balanceData} />
                <RecentTransactions transactions={userTransactions}
                    totalTransactions={1253}
                    currentPage={1}
                    onPageChange={(page) => console.log('Page changed:', page)}
                    maxHeight="400px" />
            </div>
        </div>
    )
}

export default UserProfileDetailPage