import React from 'react'
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <div className={"w-full h-full flex flex-col bg-neutral-50 font-inter relative overflow-hidden"}>
            <DashboardHeader/>
            <main className={"flex h-full w-full relative"}>
                <DashboardSidebar/>
                <div className={"w-full overflow-y-scroll"}>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
