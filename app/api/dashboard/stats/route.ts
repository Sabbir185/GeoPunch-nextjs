import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get total users count (exclude admin users)
        const totalUsers = await prisma.user.count({
            where: {
                isDeleted: false,
                role: 'USER', // Only count regular users, not admins
            },
        });

        // Get total locations count
        const totalLocations = await prisma.location.count({
            where: {
                isDeleted: false,
            },
        });

        // Get current active users (users who are currently checked in and have ACTIVE status)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const currentActiveUsers = await prisma.activityLog.count({
            where: {
                checkedInTime: {
                    gte: todayStart,
                    lte: todayEnd,
                },
                checkedOutTime: null,
                user: {
                    status: 'ACTIVE',
                    isDeleted: false,
                    role: 'USER', // Only count regular users
                },
            },
        });

        return NextResponse.json({
            totalUsers,
            totalLocations,
            currentActiveUsers,
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard stats' },
            { status: 500 }
        );
    }
}
