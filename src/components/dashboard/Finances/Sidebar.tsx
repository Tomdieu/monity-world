"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiCard, BiTransfer } from "react-icons/bi";
import { CiCreditCard1 } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { IoReload } from "react-icons/io5";

type SidebarLink = {
  href: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
};

function FinancesSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const sidebarLinks: SidebarLink[] = [
    {
      href: "/dashboard/finances",
      label: "Financial overview",
      icon: (isActive) => (
        <RefreshCcw
          className={cn(
            "size-4",
            isActive ? "text-white" : "text-primary group-hover:text-white"
          )}
        />
      ),
    },
    {
      href: "/dashboard/finances/fees",
      label: "Transaction Fees",
      icon: (isActive) => (
        <BiTransfer
          className={cn(
            "size-4",
            isActive ? "text-white" : "text-primary group-hover:text-white"
          )}
        />
      ),
    },
    {
      href: "/dashboard/finances/international-fees",
      label: "Internation Fees",
      icon: (isActive) => (
        <CiCreditCard1
          className={cn(
            "size-4",
            isActive
              ? "text-primary"
              : "text-primary group-hover:text-white transition-colors group-hover:[&>g>path:first-child]:fill-white group-hover:[&>g>path:last-child]:stroke-white"
          )}
        />
      ),
    },
    {
      href: "/dashboard/finances/statistics",
      label: "Statistics",
      icon: (isActive) => (
        <Search
          className={cn(
            "size-4",
            isActive
              ? "text-primary"
              : "text-primary group-hover:text-white transition-colors group-hover:[&>g>path:first-child]:fill-white group-hover:[&>g>path:last-child]:stroke-white"
          )}
        />
      ),
    },
    {
      href: "/dashboard/finances/simulation",
      label: "Simulation",
      icon: (isActive) => (
        <Search
          className={cn(
            "size-4",
            isActive
              ? "text-primary"
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
        <h2 className="text-base text-neutral-600 font-semibold">Finances</h2>
      </div>

      {/* Navigation Links */}
      <nav className="grid gap-2">
        {sidebarLinks.map(({ href, label, icon }) => {
          const isActiveLink = (url: string) => {
            // Exact match for dashboard
            if (url === "/dashboard/finances") {
              return pathname === "/dashboard/finances";
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

export default FinancesSidebar;
