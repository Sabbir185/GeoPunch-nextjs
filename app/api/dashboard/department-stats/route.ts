import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get users by department (excluding admins)
        const usersByDepartment = await prisma.user.groupBy({
            by: ['department'],
            where: {
                isDeleted: false,
                role: 'USER', // Only count regular users
                status: 'ACTIVE',
                department: {
                    not: null,
                },
            },
            _count: {
                _all: true,
            },
        });

        // Get current active users by department
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const activeUsersByDepartment = await prisma.activityLog.groupBy({
            by: ['userId'],
            where: {
                checkedInTime: {
                    gte: todayStart,
                    lte: todayEnd,
                },
                checkedOutTime: null,
                user: {
                    status: 'ACTIVE',
                    isDeleted: false,
                    role: 'USER',
                    department: {
                        not: null,
                    },
                },
            },
            _count: {
                _all: true,
            },
        });

        // Get user departments for active users
        const activeUserIds = activeUsersByDepartment.map(item => item.userId);
        const activeUsersWithDepartments = await prisma.user.findMany({
            where: {
                id: {
                    in: activeUserIds,
                },
                isDeleted: false,
                role: 'USER',
            },
            select: {
                id: true,
                department: true,
            },
        });

        // Count active users by department
        const activeByDepartment = activeUsersWithDepartments.reduce((acc, user) => {
            if (user.department) {
                acc[user.department] = (acc[user.department] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        // Format data for frontend
        const departmentStats = usersByDepartment.map(dept => ({
            department: dept.department || 'Unknown',
            totalUsers: dept._count._all,
            activeUsers: activeByDepartment[dept.department || ''] || 0,
        }));

        return NextResponse.json(departmentStats);
    } catch (error) {
        console.error('Error fetching department stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch department stats' },
            { status: 500 }
        );
    }
}
