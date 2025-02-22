import { LayoutDashboard, ArrowRightLeft, Key } from 'lucide-react'
import { LuUsersRound } from "react-icons/lu";
import { BsPiggyBank } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
const ProjectIcon = ({ className }: { className?: string }) => <Image src={"/icons/project-icon.svg"} alt={"project icon"} width={"24"} height={24} className={className} />

const FinanceIcon = ({ className }: { className?: string }) => <Image src={"/icons/finance-icon.svg"} alt={"finance icon"} width={"24"} height={24} className={className} />

export const sidebarUrls = [
    {
        "title": "Dashboard",
        "icon": LayoutDashboard,
        "url": "/dashboard"
    },
    {
        "title": "Control",
        "icon": Key,
        "url": "/dashboard/control",
        "isViewBy": (userType: 'manager' | 'staff_manager' | 'super_admin') => userType == 'staff_manager' || userType == 'super_admin'
    },
    {
        "title": "Users",
        "icon": LuUsersRound,
        "url": "/dashboard/users"
    },
    {
        "title": "Transactions",
        "icon": ArrowRightLeft,
        "url": "/dashboard/transactions"
    },
    {
        "title": "Savings",
        "icon": BsPiggyBank,
        "url": "/dashboard/savings"
    },
    {
        "title": "Cards",
        "icon": CiCreditCard1,
        "url": "/dashboard/cards"
    },
    {
        "title": "Projects",
        "icon": ProjectIcon,
        "url": "/dashboard/projects"
    },
    {
        "title": "Finance",
        "icon": FinanceIcon,
        "url": "/dashboard/finances"
    },
    {
        "title": "Support",
        "icon": BiSupport,
        "url": "/dashboard/support"
    }
]