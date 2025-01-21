"use client"
import React from 'react'
import { MdPeopleAlt, MdVerified } from "react-icons/md";
import { Ban, Search, TrendingDown, TrendingUp } from "lucide-react";
import UserFilter from '@/components/dashboard/Users/UserFilter';
import KycUserTable from '@/components/dashboard/Users/KycUserTable';
import { userKycData } from '@/constants/data';

function KycCenterPage() {
    return (
        <div className='flex flex-1 flex-col gap-6 w-full px-5'>
            <div>
                <h1 className='text-xl font-bold '>Overview</h1>
                <div className={"grid grid-cols-5 items-center gap-6 "}>
                    <div className={"flex flex-col gap-3 bg-white shadow-md rounded-lg p-3 w-full"}>
                        <div className={"flex gap-10 items-center justify-between"}>
                            <div className={"flex flex-col gap-2"}>
                                <span className={"text-muted-foreground font-light"}>Total User</span>
                                <span className={"font-bold text-lg"}>4,068</span>
                            </div>
                            <div className={"bg-primary/30 rounded-2xl p-2"}>

                                <MdPeopleAlt className={"size-8 text-primary"} />
                            </div>
                        </div>
                        <div className={"flex text-sm items-center gap-2"}>
                            <TrendingUp className={"text-green-500 size-4"} />
                            <p className={"text-muted-foreground"}><span className={"text-green-500"}>8.5% </span>Up from
                                last week</p>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-3 bg-white shadow-md rounded-lg p-3 w-full"}>
                        <div className={"flex gap-10 items-center justify-between"}>
                            <div className={"flex flex-col gap-2"}>
                                <span className={"text-muted-foreground font-light"}>Verify User</span>
                                <span className={"font-bold text-lg"}>453</span>
                            </div>
                            <div className={"bg-green-400/25 rounded-2xl p-2"}>

                                <MdVerified className={"size-8 text-green-500"} />
                            </div>
                        </div>
                        <div className={"flex text-sm items-center gap-2"}>
                            <TrendingDown className={"text-red-500 size-4"} />
                            <p className={"text-muted-foreground"}><span className={"text-red-500"}>1.1% </span>Down from
                                last week</p>
                        </div>
                    </div>

                    <div className={"flex flex-col gap-3 bg-white shadow-md rounded-lg p-3 w-full"}>
                        <div className={"flex gap-10 items-center justify-between"}>
                            <div className={"flex flex-col gap-2"}>
                                <span className={"text-muted-foreground font-light"}>Need attention</span>
                                <span className={"font-bold text-lg"}>453</span>
                            </div>
                            <div className={"bg-red-400/25 rounded-2xl p-2"}>

                                <Ban className={"size-8 text-red-500"} />
                            </div>
                        </div>
                        <div className={"flex text-sm items-center gap-2"}>
                            <TrendingUp className={"text-green-500 size-4"} />
                            <p className={"text-muted-foreground"}><span className={"text-green-500"}>3.2% </span>Up from
                                last week</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-5'>
                <div className='w-full flex'>
                    <form className='flex items-center gap-4 flex-1'>
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
            </div>
            <KycUserTable requests={userKycData} currentPage={1} totalRequests={78} onPageChange={function (page: number): void {
                throw new Error('Function not implemented.');
            }} />
        </div>
    )
}

export default KycCenterPage