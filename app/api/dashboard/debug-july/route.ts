import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get ALL ActivityLog records to see what's in the database
        const allLogs = await prisma.activityLog.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        department: true,
                        role: true,
                        status: true,
                        isDeleted: true,
                    },
                },
            },
            orderBy: {
                checkedInTime: 'desc',
            },
        });

        // Group ALL data by month and year
        const allMonthlyData = allLogs.reduce((acc, log) => {
            const date = new Date(log.checkedInTime);
            const month = date.toLocaleDateString('en-US', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;
            
            if (!acc[key]) {
                acc[key] = [];
            }
            
            acc[key].push({
                id: log.id,
                checkedInTime: log.checkedInTime,
                action: log.action,
                userName: log.user.name,
                userRole: log.user.role,
                userStatus: log.user.status,
                isDeleted: log.user.isDeleted,
            });
            
            return acc;
        }, {} as Record<string, any[]>);

        // Count by month
        const monthCounts = Object.entries(allMonthlyData).reduce((acc, [key, logs]) => {
            acc[key] = logs.length;
            return acc;
        }, {} as Record<string, number>);

        // Specifically check July 2025
        const july2025Logs = allLogs.filter(log => {
            const date = new Date(log.checkedInTime);
            return date.getMonth() === 6 && date.getFullYear() === 2025; // July is month 6 (0-indexed)
        });

        return NextResponse.json({
            totalRecords: allLogs.length,
            monthCounts: monthCounts,
            july2025Count: july2025Logs.length,
            july2025Data: july2025Logs.map(log => ({
                id: log.id,
                checkedInTime: log.checkedInTime,
                action: log.action,
                userName: log.user.name,
                userRole: log.user.role,
                userStatus: log.user.status,
                isDeleted: log.user.isDeleted,
            })),
            sampleData: allLogs.slice(0, 5).map(log => ({
                id: log.id,
                checkedInTime: log.checkedInTime,
                action: log.action,
                userName: log.user.name,
                userRole: log.user.role,
                userStatus: log.user.status,
                isDeleted: log.user.isDeleted,
            })),
        });
    } catch (error) {
        console.error('Error fetching debug data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch debug data', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
