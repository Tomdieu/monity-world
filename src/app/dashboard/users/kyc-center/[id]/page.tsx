"use client"
import KycCustomerProfile from '@/components/dashboard/Users/KycCustomerProfile'
import ActivityTimeline from '@/components/dashboard/Users/TimelineItem'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { customerData, timelineData } from '@/constants/data'
import React, { useState } from 'react'
import { PiFilesLight, PiWallet } from 'react-icons/pi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeclineKycModal from '@/components/dashboard/Users/modals/DeclineKycModal'


function KycUserDetail() {
    const [openKycModal,setOpenKycModal] = useState(false)
    return (
        <div className='flex flex-1 flex-col gap-6 w-full px-5 pb-20 overflow-y-auto'>
            <KycCustomerProfile customer={customerData} />
            <div className='flex flex-col gap-4 p-3'>
                <Separator />
                <Tabs defaultValue="timeline" className="flex flex-col gap-2">
                    <TabsList className='flex items-center justify-start bg-transparent gap-2'>
                        <TabsTrigger value="timeline" className='flex p-3 gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow'>
                            <span>Timeline</span>
                            <PiWallet className='size-4' />
                        </TabsTrigger>
                        <TabsTrigger value="files" className='flex p-3 gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow' ><span>Files</span> <PiFilesLight className='size-4' /></TabsTrigger>
                    </TabsList>
                    <TabsContent value="timeline">
                        <ActivityTimeline items={timelineData} />
                    </TabsContent>
                    <TabsContent value="files">Files here</TabsContent>
                </Tabs>
                <DeclineKycModal open={openKycModal} onOpenChange={setOpenKycModal} />


                <div className='flex items-center justify-center gap-5 py-5'>
                    <Button size={"lg"} variant={"destructive"} onClick={()=>setOpenKycModal(true)}>Decline KYC</Button>
                    <Button size={"lg"} className='bg-success text-white hover:bg-success/90 hover:text-white'>Confirm KYC</Button>
                </div>
            </div>
        </div>
    )
}

export default KycUserDetail