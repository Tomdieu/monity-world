import React from 'react'
import { MdPeopleAlt, MdVerified } from "react-icons/md";
import { Ban, TrendingDown, TrendingUp } from "lucide-react";
import { PiPackageDuotone } from "react-icons/pi";
import Image from "next/image";
import { UserGrowth } from '@/components/dashboard/UserGrowth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Leaderboard from '@/components/dashboard/Users/Leaderboard';
import { usersLeaderBoard } from '@/constants/data';

function page() {
    return (
        <div className='flex flex-col gap-4 px-5'>
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
                            <span className={"text-muted-foreground font-light"}>Affiliated users</span>
                            <span className={"font-bold text-lg"}>453</span>
                        </div>
                        <div className={"bg-neutral-400/25 rounded-2xl p-2"}>

                            {/* <BiSolidWine className={"size-8 text-neutral-500"} /> */}
                            <Image src={"/icons/linked.svg"} alt={"finance icon"} width={"24"} height={24} className={"size-8"} />
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
                            <span className={"text-muted-foreground font-light"}>Banned users</span>
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
            <div>
                <Leaderboard users={usersLeaderBoard} />
            </div>
        </div>
    )
}

export default page