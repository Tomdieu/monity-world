"use client";
import ChatIcon from "@/components/icons/ChatIcon";
import UserOverviewIcon from "@/components/icons/UserOverViewIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Dot, IdCard, UserPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GoDotFill } from "react-icons/go";

type SidebarLink = {
  href: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
};

function TransactionSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const sidebarLinks: SidebarLink[] = [
    {
      href: "/dashboard/transactions",
      label: "All Transactions",
      icon: (isActive) => (
        <GoDotFill
          className={cn(
            "size-4",
            isActive ? "text-white" : "text-primary group-hover:text-white"
          )}
        />
      ),
    },
    {
      href: "/dashboard/transactions/uncompleted",
      label: "Uncompleted",
      icon: (isActive) => (
        <GoDotFill
          className={cn(
            "size-4",
            isActive ? "text-white" : "text-primary group-hover:text-white"
          )}
        />
      ),
    },
    {
      href: "/dashboard/transactions/funded-requests",
      label: "Fund Requests",
      icon: (isActive) => (
        <GoDotFill
          className={cn(
            "size-4",
            isActive ? "text-white" : "text-black "
          )}
        />
      ),
    },
    {
      href: "/dashboard/transactions/chats",
      label: "Chats",
      icon: (isActive) => (
        <ChatIcon
          className={cn(
            "size-4",
            isActive
              ? "text-white"
              : "text-primary group-hover:text-white transition-colors group-hover:[&>g>path:first-child]:fill-white group-hover:[&>g>path:last-child]:stroke-white"
          )}
        />
      ),
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col gap-5 p-5 rounded-r-lg border-l-2 border-r-neutral-300 bg-white shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={"/dashboard"}>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-1 bg-primary/10 hover:bg-primary/20"
          >
            <ArrowLeft className="size-4 text-primary" />
          </Button>
        </Link>
        <h2 className="text-lg text-neutral-600 font-semibold">Transactions</h2>
      </div>

      {/* Navigation Links */}
      <nav className="grid gap-2">
        {sidebarLinks.map(({ href, label, icon }) => {
          const isActiveLink = (url: string) => {
            // Exact match for dashboard
            if (url === "/dashboard/users") {
              return pathname === "/dashboard/users";
            }
            // For other routes, check if the pathname starts with the URL
            // This prevents partial matches like /dashboard matching /dashboard-settings
            return pathname.startsWith(url);
          };

          const isActive = isActiveLink(href);

          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "group px-4 p-2 rounded-lg flex items-center gap-3 transition-colors duration-200",
                  "hover:bg-primary hover:text-white",
                  isActive
                    ? "bg-primary text-white"
                    : "text-neutral-700 bg-neutral-100"
                )}
              >
                {icon(isActive)}
                <span className="text-xs lg:text-sm font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default TransactionSidebar;
