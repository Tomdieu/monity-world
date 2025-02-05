"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
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


interface Permission {
    id: string;
    label: string;
    activated: boolean;
}

interface SuperAdminDashboardState {
    userPermissions: Permission[];
    staffPermissions: Permission[];
    internationalTransactions: Permission[];
}

const initialData: SuperAdminDashboardState = {
    userPermissions: [
        { id: "login", label: "Login/ Access app", activated: true },
        { id: "fund-transfer", label: "Fund transfer", activated: true },
        { id: "fund-request", label: "Fund request", activated: false },
        { id: "consult", label: "Consult account", activated: true },
        { id: "support", label: "Request support", activated: true },
        { id: "saving", label: "Saving section", activated: true },
        { id: "cards", label: "Use cards", activated: true },
        { id: "withdrawal", label: "Withdrawal", activated: false },
    ],
    staffPermissions: [
        { id: "platform", label: "Access platform", activated: true },
        { id: "new-user", label: "Create new user", activated: true },
        { id: "support", label: "Customer support", activated: false },
        { id: "confirm", label: "Confirm transaction", activated: false },
        { id: "new-card", label: "Create new card", activated: true },
        { id: "projects", label: "Access projects", activated: false },
    ],
    internationalTransactions: [
        { id: "transfer", label: "Transfer", activated: true },
        { id: "request", label: "Request", activated: false },
        { id: "japan", label: "日本", activated: false },
    ],
};

interface Zone {
    id: string;
    name: string;
    countries: string[];
    activated: boolean;
    selected?: boolean;
}

const SuperAdminDashboard = () => {
    const [state, setState] = useState<SuperAdminDashboardState | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<Set<string>>(new Set());

    useEffect(() => {
        setTimeout(() => {
            setState(initialData);
            setLoading(false);
        }, 1000);
    }, []);


    const [zones, setZones] = useState<Zone[]>([
        { id: '1', name: 'Zone A', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '2', name: 'Zone B', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '3', name: 'Zone C', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '4', name: 'Zone A', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '5', name: 'Zone A', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '6', name: 'Zone A', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '7', name: 'Zone A', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '8', name: 'Zone A', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true },
        { id: '9', name: 'Zone A', countries: ['Cameroon', 'DR Congo', 'RDC'], activated: true }
    ]);

    const handleToggle = (index: number) => {
        setZones(prev => prev.map((zone, i) =>
            i === index ? { ...zone, activated: !zone.activated } : zone
        ));
    };

    return (
        <div className={"flex flex-col w-full h-full mx-auto py-10 px-10"}>
            <div className='w-full h-full flex gap-5'>
                <div className='w-9/12 flex flex-col gap-5 overflow-y-auto'>
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
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {zones.map((zone, index) => (
                            <Card
                                key={zone.id}
                                className={`p-4 ${index === 8 ? 'border-2 border-purple-500' : ''}`}
                            >
                                <div className="space-y-1">
                                    <h3 className="text-blue-500">{zone.name}</h3>
                                    <p className="text-gray-500 text-sm">
                                        ({zone.countries.join(', ')})
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-gray-700">
                                        {zone.activated ? 'Activated' : 'De-activated'}
                                    </span>
                                    <Switch
                                        checked={zone.activated}
                                        onCheckedChange={() => handleToggle(index)}
                                    />
                                </div>
                            </Card>
                        ))}
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
};

export default SuperAdminDashboard;