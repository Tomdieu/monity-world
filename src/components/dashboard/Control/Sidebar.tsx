"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Plus, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiCreditCard2 } from "react-icons/ci";
import { IoCard } from "react-icons/io5";

type SidebarLink = {
  href: string;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
};

function ControlSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const sidebarLinks: SidebarLink[] = [
    {
      href: "/dashboard/control",
      label: "Manage staff",
      icon: (isActive) => (
        <UserCircle
          className={cn(
            "size-4",
            isActive ? "text-white" : "text-primary group-hover:text-white"
          )}
        />
      ),
    },
    {
      href: "/dashboard/control/add-staff",
      label: "Add users",
      icon: (isActive) => (
        <Plus
          className={cn(
            "size-4",
            isActive ? "text-white" : "text-primary group-hover:text-white"
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
        <h2 className="text-base text-neutral-600 font-semibold">Control</h2>
      </div>

      {/* Navigation Links */}
      <nav className="grid gap-2">
        {sidebarLinks.map(({ href, label, icon }) => {
          const isActiveLink = (url: string) => {
            // Exact match for dashboard
            if (url === "/dashboard/control") {
              return pathname === "/dashboard/control";
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

export default ControlSidebar;
