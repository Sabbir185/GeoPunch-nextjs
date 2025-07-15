"use client"

import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardGraph from "@/components/dashboard/DashboardGraph";
import DepartmentStats from "@/components/dashboard/DepartmentStats";
import ActivityLogViewer from "@/components/dashboard/ActivityLogViewer";

function Dashboard() {
    return <div className={"p-4 space-y-5"}>
        <DashboardCard/>
        <DashboardGraph/>
        <DepartmentStats/>
        <ActivityLogViewer/>
    </div>;
}

export default Dashboard;
