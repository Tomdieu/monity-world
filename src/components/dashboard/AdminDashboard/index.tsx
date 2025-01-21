"use client"
import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { Check, Flag, TrendingDown, TrendingUp } from "lucide-react";
import { PiPackageDuotone } from "react-icons/pi";
import Image from "next/image";
import { BiSolidWine } from "react-icons/bi";
import { Separator } from '@/components/ui/separator';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserGrowth } from '../UserGrowth';
import TopActiveUsers from '../TopActiveUsers';
import TaskNotification from '../TaskNotification';
import { sampleNotifications } from '@/constants/notifications';
import Notes from '../Notes';
import AlertsPanel from '../AlertsPanel';
import { alerts, transactions } from '@/constants/data';
import RecentTransactions from '../RecentTransactions';

function AdminDashboardPage() {
    const users = [
        { id: 1, name: "Nguh Fabrice", points: 143, avatar: "/images/img1.png" },
        { id: 2, name: "Meghan Jess", points: 60, avatar: "/avatar2.png" },
        { id: 3, name: "Alex Turner", points: 28, avatar: "/avatar3.png" },
    ];
    return (
        <div className={"flex flex-col w-full h-full mx-auto py-10 px-10"}>
            <div className='w-full h-full flex gap-5'>
                <div className='w-9/12 flex flex-col gap-5 overflow-auto'>
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
                                    <span className={"text-muted-foreground font-light"}>Active user</span>
                                    <span className={"font-bold text-lg"}>1,568</span>
                                </div>
                                <div className={"bg-orange-400/25 rounded-2xl p-2"}>

                                    <PiPackageDuotone className={"size-8 text-orange-500"} />
                                </div>
                            </div>
                            <div className={"flex text-sm items-center gap-2"}>
                                <TrendingUp className={"text-green-500 size-4"} />
                                <p className={"text-muted-foreground"}><span className={"text-green-500"}>1.1% </span>Up from
                                    last week</p>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-3 bg-white shadow-md rounded-lg p-3 w-full"}>
                            <div className={"flex gap-10 items-center justify-between"}>
                                <div className={"flex flex-col gap-2"}>
                                    <span className={"text-muted-foreground font-light"}>Completed</span>
                                    <span className={"font-bold text-lg"}>453</span>
                                </div>
                                <div className={"bg-green-400/25 rounded-2xl p-2"}>

                                    <Check className={"size-8 text-green-500"} />
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
                                    <span className={"text-muted-foreground font-light"}>Projects</span>
                                    <span className={"font-bold text-lg"}>453</span>
                                </div>
                                <div className={"bg-neutral-400/25 rounded-2xl p-2"}>

                                    <BiSolidWine className={"size-8 text-neutral-500"} />
                                </div>
                            </div>
                            <div className={"flex text-sm items-center gap-2"}>
                                <TrendingUp className={"text-green-500 size-4"} />
                                <p className={"text-muted-foreground"}><span className={"text-green-500"}>15.1% </span>Up from
                                    last week</p>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-3 bg-white shadow-md rounded-lg p-3 w-full"}>
                            <div className={"flex gap-10 items-center justify-between"}>
                                <div className={"flex flex-col gap-2"}>
                                    <span className={"text-muted-foreground font-light"}>Flagged</span>
                                    <span className={"font-bold text-lg"}>453</span>
                                </div>
                                <div className={"bg-red-400/25 rounded-2xl p-2"}>

                                    <Flag className={"size-8 text-red-500"} />
                                </div>
                            </div>
                            <div className={"flex text-sm items-center gap-2"}>
                                <TrendingUp className={"text-green-500 size-4"} />
                                <p className={"text-muted-foreground"}><span className={"text-green-500"}>3.2% </span>Up from
                                    last week</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 gap-8'>
                        <div className='p-4 gap-5 h-full flex flex-col col-span-7 bg-white rounded-lg'>
                            <div className='flex items-center justify-between'>
                                <h5 className='text-2xl font-bold'>User Growth</h5>
                                <Select>
                                    <SelectTrigger className="w-[100px] font-light text-muted-foreground rounded-full">
                                        <SelectValue placeholder="Yearly" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="alltime">All time</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                            <UserGrowth />

                        </div>
                        <div className='flex w-full h-full flex-col col-span-5'>
                            <TopActiveUsers title="Top 5 Active Users"
                                users={users}
                                onLeaderboardClick={() => { }} />
                        </div>
                    </div>
                    <div className=''>

                        <RecentTransactions transactions={transactions}
                            totalTransactions={1253}
                            currentPage={1}
                            onPageChange={(page) => console.log('Page changed:', page)} />
                    </div>

                </div>

                <Separator orientation='vertical' />
                <div className='h-full w-3/12 flex flex-col gap-2 overflow-auto scr'>
                    <TaskNotification title='Task Notication' groups={sampleNotifications} />
                    <Notes onSave={() => { }} notificationCount={3} />
                    <AlertsPanel alerts={alerts} unreadCount={3} onLoadMore={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage
