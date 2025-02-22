"use client"
import React from 'react'
import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { IoMdSettings } from "react-icons/io";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    User,
    Key,
    Activity,
    Globe,
    LogOut
} from 'lucide-react';

function DashboardHeader() {
    const pathName = usePathname()
    const router = useRouter()
    const routeSections = pathName.split('/')
    const menuItems = [
        { icon: <User className="mr-2 h-4 w-4 text-blue-500" />, label: "Manage Account" },
        { icon: <Key className="mr-2 h-4 w-4 text-blue-500" />, label: "Change Password" },
        { icon: <Activity className="mr-2 h-4 w-4 text-blue-500" />, label: "Login Activities" },
        { icon: <Globe className="mr-2 h-4 w-4 text-blue-500" />, label: "Change country" },
        { icon: <LogOut className="mr-2 h-4 w-4 text-red-500" />, label: "Log out", className: "text-red-500" }
    ];

    const handleLogout = ()=>{
        router.push('/login')
    }

    const handleMenuItemClick = (label:string) => {
        if (label === "Log out") {
            handleLogout();
        } else {
            console.log(`${label} clicked`);
        }
    }

    return (
        <div className={"w-full flex items-center space-x-28 p-2 bg-white"}>
            <Link href={"/dashboard"} className={"px-5"}>
                <Image src={"/icons/dashboard-logo.png"} alt={"Monity world"} width={"154"} height={"35"} />
            </Link>
            <div className={"w-full flex items-center flex-1 space-x-60 py-5"}>
                <div className={"flex flex-col gap-1"}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard" className={"text-xs font-semibold"}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            {routeSections.length > 2 && (
                                <>
                                    <BreadcrumbSeparator>
                                        /
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/users" className={"text-black text-sm capitalize"}>{routeSections[2]}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            )}

                        </BreadcrumbList>
                    </Breadcrumb>
                    <span className={"font-bold text-sm capitalize"}>{routeSections[2]}</span>
                </div>
                <div className={"w-full flex flex-1 items-center space-x-20"}>
                    <form className={"w-full"}>
                        <div className={"rounded-md border flex items-center gap-0.5 space-x-1 p-1 w-full"}>
                            <SearchIcon className={"w-5 h-5 text-muted-foreground"} />
                            <input className={"w-full outline-0 border-0"} placeholder={"exp projects"} />
                            <Button size={"icon"} className={"size-8 px-3 bg-gray-500"}>
                                <SearchIcon className={"size-5"} />
                            </Button>
                        </div>
                    </form>
                    <div className={"flex items-center gap-4"}>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-lg focus:outline-none">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 rounded-2xl">
                                {menuItems.map((item, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        className={`flex items-center cursor-pointer ${item.className || ''}`}
                                        onClick={() => handleMenuItemClick(item.label)}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Select>
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button size={"icon"} className={"rounded-full bg-primary/15 hover:bg-primary/15"}>
                            <IoMdSettings className={"text-primary"} />
                        </Button>
                        <Button size={"icon"} className={"rounded-full bg-primary/15 hover:bg-primary/15"}>
                            <Bell className={"text-primary"} />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardHeader
