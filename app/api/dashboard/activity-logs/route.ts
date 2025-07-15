import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get all activity logs with user information
        const activityLogs = await prisma.activityLog.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        department: true,
                        role: true,
                        status: true,
                        isDeleted: true,
                        designation: true
                    },
                },
            },
            orderBy: {
                checkedInTime: 'desc',
            },
            take: 10, // Limit to last 10 records
        });

        // Format the data for better readability
        const formattedLogs = activityLogs.map(log => ({
            id: log.id,
            checkedInTime: log.checkedInTime,
            checkedOutTime: log.checkedOutTime,
            action: log.action,
            user: {
                id: log.user.id,
                name: log.user.name,
                email: log.user.email,
                department: log.user.department,
                designation: log.user.designation,
                role: log.user.role,
                status: log.user.status,
                isDeleted: log.user.isDeleted,
            },
            checkedInPlace: log.checkedInPlace,
            checkedOutPlace: log.checkedOutPlace,
            createdAt: log.createdAt,
            updatedAt: log.updatedAt,
        }));

        return NextResponse.json({
            total: activityLogs.length,
            data: formattedLogs,
        });
    } catch (error) {
        console.error('Error fetching activity logs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch activity logs' },
            { status: 500 }
        );
    }
}
