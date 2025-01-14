import React from 'react'
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";

function DashboardPage() {

    const user_role = 'admin'
    const DashboardComponents = {
        admin: AdminDashboard,
        manager: ManagerDashboard,
    };

    const DashboardComponent = DashboardComponents[user_role] || null;

    return DashboardComponent ? <DashboardComponent/> : <div>Invalid role</div>;

}

export default DashboardPage
