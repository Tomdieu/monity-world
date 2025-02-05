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

interface ManagerDashboardState {
    userPermissions: Permission[];
    staffPermissions: Permission[];
    internationalTransactions: Permission[];
}

const initialData: ManagerDashboardState = {
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

const ManagerDashboard = () => {
    const [state, setState] = useState<ManagerDashboardState | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<Set<string>>(new Set());

    useEffect(() => {
        setTimeout(() => {
            setState(initialData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleToggle = async (section: keyof ManagerDashboardState, index: number) => {
        if (!state) return;

        const permission = state[section][index];
        const toggleId = `${section}-${permission.id}`;

        setUpdating(prev => new Set(prev).add(toggleId));

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setState(prev => prev && ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, activated: !item.activated } : item
            )
        }));

        setUpdating(prev => {
            const next = new Set(prev);
            next.delete(toggleId);
            return next;
        });
    };

    const PermissionSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-10" />
                    </div>
                </div>
            ))}
        </div>
    );

    const renderPermissionGrid = (permissions: Permission[], section: keyof ManagerDashboardState) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {permissions.map((permission, index) => {
                const toggleId = `${section}-${permission.id}`;
                const isUpdating = updating.has(toggleId);

                return (
                    <div key={permission.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-2">{permission.label}</div>
                        <div className="flex items-center justify-between">
                            <span className={`text-sm ${permission.activated ? 'text-gray-900' : 'text-red-500'}`}>
                                {permission.activated ? 'Activated' : 'De-activated'}
                            </span>
                            <Switch
                                checked={permission.activated}
                                onCheckedChange={() => handleToggle(section, index)}
                                disabled={isUpdating}
                                className={`ml-2 ${isUpdating ? 'opacity-50' : ''}`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
    const users = [
        { id: 1, name: "Nguh Fabrice", points: 143, avatar: "/images/img1.png" },
        { id: 2, name: "Meghan Jess", points: 60, avatar: "/avatar2.png" },
        { id: 3, name: "Alex Turner", points: 28, avatar: "/avatar3.png" },
    ];
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
                    <div className="w-full h-full pb-40">
                            <div>
                                <h1 className="text-2xl font-bold text-red-500">Control Panel</h1>
                            </div>
                            <div className="space-y-8">
                                {loading ? (
                                    <>
                                        <div className="space-y-4">
                                            <Skeleton className="h-6 w-32" />
                                            <PermissionSkeleton />
                                        </div>
                                        <div className="space-y-4">
                                            <Skeleton className="h-6 w-32" />
                                            <PermissionSkeleton />
                                        </div>
                                        <div className="space-y-4">
                                            <Skeleton className="h-6 w-32" />
                                            <PermissionSkeleton />
                                        </div>
                                    </>
                                ) : state && (
                                    <>
                                        <div className="space-y-4">
                                            <h2 className="text-blue-500 text-lg font-medium">User permissions</h2>
                                            {renderPermissionGrid(state.userPermissions, 'userPermissions')}
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-blue-500 text-lg font-medium">Staff permissions</h2>
                                            {renderPermissionGrid(state.staffPermissions, 'staffPermissions')}
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-blue-500 text-lg font-medium">International transactions</h2>
                                            {renderPermissionGrid(state.internationalTransactions, 'internationalTransactions')}
                                        </div>
                                    </>
                                )}
                            </div>
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

export default ManagerDashboard;