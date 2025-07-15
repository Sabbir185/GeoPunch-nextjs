"use client"

import React, { useEffect, useState } from 'react';
import { Users, UserCheck } from 'lucide-react';

interface DepartmentStat {
    department: string;
    totalUsers: number;
    activeUsers: number;
}

const DepartmentStats: React.FC = () => {
    const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartmentStats = async () => {
            try {
                const response = await fetch('/api/dashboard/department-stats');
                const data = await response.json();
                setDepartmentStats(data);
            } catch (error) {
                console.error('Error fetching department stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartmentStats();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Department Statistics</h3>
                <div className="animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="mb-4 p-4 bg-gray-100 rounded">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="flex gap-4">
                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (departmentStats.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Department Statistics</h3>
                <p className="text-gray-500">No department data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Department Statistics</h3>
            <div className="space-y-4">
                {departmentStats.map((dept) => (
                    <div key={dept.department} className="border rounded-lg p-4 hover:bg-gray-50">
                        <h4 className="font-medium text-gray-900 mb-2">{dept.department}</h4>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>Total: {dept.totalUsers}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <UserCheck className="w-4 h-4" />
                                <span>Active: {dept.activeUsers}</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{ 
                                        width: `${dept.totalUsers > 0 ? (dept.activeUsers / dept.totalUsers) * 100 : 0}%` 
                                    }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {dept.totalUsers > 0 ? Math.round((dept.activeUsers / dept.totalUsers) * 100) : 0}% active
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentStats;
