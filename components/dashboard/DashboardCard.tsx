"use client"

import React, { useEffect, useState } from "react";
import {MapPinPlus, ShieldCheck, Users} from "lucide-react";

interface DashboardStats {
    totalUsers: number;
    totalLocations: number;
    currentActiveUsers: number;
}

function DashboardCard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalLocations: 0,
        currentActiveUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/dashboard/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cardsData = [
        {
            title: "Total Users",
            description: "Active users (excluding admins)",
            value: stats.totalUsers,
            color: "#9b59b6",
            icon: Users
        },
        {
            title: "Total Locations",
            description: "Total available service locations",
            value: stats.totalLocations,
            color: "#f1c40f",
            icon: MapPinPlus
        },
        {
            title: "Currently Checked In",
            description: "Active users checked in today",
            value: stats.currentActiveUsers,
            color: "#2ecc71",
            icon: ShieldCheck
        },
    ];

    if (loading) {
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg bg-gray-50 p-4 animate-pulse">
                    <div className="flex gap-4 my-3">
                        <div className="bg-gray-200 rounded-full w-9 h-9"></div>
                        <div className="flex-1">
                            <div className="bg-gray-200 h-4 rounded mb-2"></div>
                            <div className="bg-gray-200 h-6 rounded w-16"></div>
                        </div>
                    </div>
                    <div className="bg-gray-200 h-[2px]"></div>
                    <div className="bg-gray-200 h-3 rounded mt-2"></div>
                </div>
            ))}
        </div>;
    }

    return <div>
        {/*cards*/}
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
            {
                cardsData?.map((card, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4 flex flex-col">
                        <div className={'flex gap-4 my-3'}>
                            <div className={"bg-white rounded-full w-9 h-9 flex justify-center items-center"}>
                                <card.icon style={{color: card?.color}} size={"28"}/>
                            </div>
                            <div>
                                <p className="text-[14px] text-gray-600 font-semibold">{card?.title || ""}</p>
                                <h6 className="text-gray-900 text-[20px] font-bold">{card?.value || 0}</h6>
                            </div>
                        </div>
                        <div className={"bg-white h-[2px]"}/>
                        <p className={"mt-2 text-gray-500 text-[12px]"}>
                            {card?.description || ""}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>;
}

export default DashboardCard;
