"use client"

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';

interface ActivityLogData {
    id: number;
    checkedInTime: string;
    checkedOutTime?: string;
    action: string;
    user: {
        id: number;
        name: string;
        email: string;
        department?: string;
        designation?: string;
        role: string;
        status: string;
        isDeleted: boolean;
    };
    checkedInPlace: any;
    checkedOutPlace?: any;
    createdAt: string;
    updatedAt: string;
}

interface ActivityLogResponse {
    total: number;
    data: ActivityLogData[];
}

const ActivityLogViewer: React.FC = () => {
    const [activityLogs, setActivityLogs] = useState<ActivityLogResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivityLogs = async () => {
            try {
                const response = await fetch('/api/dashboard/activity-logs');
                const data = await response.json();
                setActivityLogs(data);
            } catch (error) {
                console.error('Error fetching activity logs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivityLogs();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Latest Activity Logs</h3>
                <div className="animate-pulse">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className="mb-3 p-4 bg-gray-100 rounded">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!activityLogs || activityLogs.data.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Latest Activity Logs</h3>
                <p className="text-gray-500">No activity logs found</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
                Latest Activity Logs ({activityLogs.total} records)
            </h3>
            <div className="space-y-3">
                {activityLogs.data.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{log.user.name}</span>
                                <span className="text-sm text-gray-500">({log.user.email})</span>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                log.action === 'Checked-In' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {log.action}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>Check-in: {new Date(log.checkedInTime).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{new Date(log.checkedInTime).toLocaleTimeString()}</span>
                            </div>
                        </div>

                        {log.checkedOutTime && (
                            <div className="grid grid-cols-2 gap-4 text-sm mt-1">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>Check-out: {new Date(log.checkedOutTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span>{new Date(log.checkedOutTime).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        )}

                        <div className="mt-2 text-xs text-gray-500">
                            <div className="flex justify-between">
                                <span>Department: {log.user.department || 'N/A'}</span>
                                <span className='border px-2 py-1 border-teal-500 rounded bg-teal-50 text-teal-700'>
                                    {log.user.designation || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLogViewer;
