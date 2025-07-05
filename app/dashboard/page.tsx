import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardGraph from "@/components/dashboard/DashboardGraph";

function Dashboard() {
    return <div className={"p-4 space-y-5"}>
        <DashboardCard/>
        <DashboardGraph/>
    </div>;
}

export default Dashboard;
