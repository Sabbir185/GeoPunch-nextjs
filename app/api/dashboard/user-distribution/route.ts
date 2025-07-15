import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get user distribution by department (excluding admins)
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

        // Format data for pie chart
        const chartData = usersByDepartment.map((item, index) => ({
            browser: item.department || 'Unknown',
            visitors: item._count._all,
            fill: `var(--chart-${(index % 5) + 1})`,
        }));

        // If no department data, show user status distribution
        if (chartData.length === 0) {
            const usersByStatus = await prisma.user.groupBy({
                by: ['status'],
                where: {
                    isDeleted: false,
                    role: 'USER', // Only count regular users
                },
                _count: {
                    _all: true,
                },
            });

            const statusData = usersByStatus.map((item, index) => ({
                browser: item.status,
                visitors: item._count._all,
                fill: `var(--chart-${(index % 5) + 1})`,
            }));

            return NextResponse.json(statusData);
        }

        return NextResponse.json(chartData);
    } catch (error) {
        console.error('Error fetching user distribution data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user distribution data' },
            { status: 500 }
        );
    }
}
