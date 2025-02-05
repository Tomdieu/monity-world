"use client"
import React from 'react'
import AdminDashboard from "@/components/dashboard/ManagerDashboard";
import ManagerDashboard from "@/components/dashboard/StaffManagerDashboard";
import { useUserTypeStore } from '@/store/use-user-store';
import SuperAdminDashboard from '@/components/dashboard/SuperAdminDashboard';

function DashboardPage() {

    const {userType} = useUserTypeStore()

    const user_role = userType;
    const DashboardComponents = {
        manager: AdminDashboard,
        staff_manager: ManagerDashboard,
        super_admin:SuperAdminDashboard
    };

    const DashboardComponent = DashboardComponents[user_role] || null;

    return DashboardComponent ? <DashboardComponent/> : <div>Invalid role</div>;

}

export default DashboardPage
