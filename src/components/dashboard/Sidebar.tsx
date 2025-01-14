"use client";

import React, { useState } from 'react';
import { sidebarUrls } from "@/constants/sidebar_urls";
import Link from "next/link";
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import {usePathname} from "next/navigation";

function DashboardSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname()

    return (
        // Main sidebar container - full height
        <div className={`flex h-full transition-all duration-300 ${isCollapsed ? 'w-0.5/12' : 'w-1/12'}`}>
            <div className="relative h-full mb-20 flex items-center">
                <div className="w-2 absolute top-5 bottom-5 bg-primary rounded-l-lg"></div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="-left-0 absolute bg-primary p-1 border-2 border-white rounded-full hover:bg-primary/90 transition-colors"
                >
                    {isCollapsed ? (
                        <ChevronsRight className="size-3 text-white"/>
                    ) : (
                        <ChevronsLeft className="size-3 text-white"/>
                    )}
                </button>
            </div>

            <div className="flex-1 flex flex-col h-full p-1 bg-white shadow-lg">
                <div className="flex flex-col gap-2 mt-8 items-center">
                    {sidebarUrls.map((item, index) => (
                        <Link
                            href={item.url}
                            key={index}
                            className={ `w-fit ${isCollapsed ? "ml-2":""} ${pathname==item.url ? "bg-primary":""} flex flex-col items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg transition-colors`}
                        >
                            <div className="p-2 rounded-full bg-neutral-100">
                                <item.icon className="size-5 text-primary" />
                            </div>
                            {!isCollapsed && (
                                <span className={`${pathname==item.url ? "text-white":""} text-xs text-primary whitespace-nowrap transition-all duration-300`}>
                                    {item.title}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardSidebar;
