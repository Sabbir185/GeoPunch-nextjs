"use client";
import React, {useState} from 'react';
import Table, {TableImage} from "@/components/common/table";
import {useFetch} from "@/hooks/userAction";
import {fetchUserActivityList} from "@/utils/backend_helper";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    image: string;
    createdAt: string;
    status: 'active' | 'inactive';
}

export default function ActivityPage() {
    const [data, getData, {error, loading}] = useFetch(fetchUserActivityList)
    const colors: any = {
        'Checked-Out': 'text-yellow-600',
        'Checked-In': 'text-teal-600',
    }
    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (d: string) => (
                <TableImage url={d}/>
            )
        },
        {text: "Name", dataField: "name"},
        {text: "Email", dataField: "email"},
        // {text: "Phone", dataField: "phone"},
        {text: "Department", dataField: "department"},
        {text: "Designation", dataField: "designation"},
        {
            text: "Activity",
            dataField: "activityStatus",
            formatter: (value: string) => <span className={`capitalize ${colors[value]}`}>{value}</span>
        },
        {
            text: "Active Place",
            dataField: "activityPlace",
            formatter: (value: string) => <span className={`capitalize border px-2 py-1 rounded-md`}>{value || "N/A"}</span>
        },
        {
            text: "Last Online",
            dataField: "lastActivity",
            formatter: (value: string) => new Date(value).toLocaleString() ?? "--"
        },
    ];

    console.log(data)

    const activeUsers = data?.docs?.filter((user: any) => user?.status === 'ACTIVE').length;
    const inactiveUsers = data?.docs?.filter((user: any) => (user?.status === 'INACTIVE' || user?.status === 'SUSPENDED')).length;
    const totalUsers = data?.docs?.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Activity Dashboard</h1>
                    <p className="text-gray-600">Monitor user activities and system logs</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3-4a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total User</p>
                                <p className="text-2xl font-semibold text-gray-800">{totalUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Activity</p>
                                <p className="text-2xl font-semibold text-gray-800">{activeUsers}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Inactivity</p>
                                <p className="text-2xl font-semibold text-gray-800">{inactiveUsers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-xl font-semibold text-gray-800">User Activity</h3>
                    </div>
                    <Table
                        columns={columns}
                        data={data}
                        indexed
                        pagination
                        noActions={true}
                        onReload={getData}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
