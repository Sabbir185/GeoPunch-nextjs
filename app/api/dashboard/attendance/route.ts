import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Get ALL ActivityLog records (no filters first to see what's in the database)
        const allLogs = await prisma.activityLog.findMany({
            include: {
                user: {
                    select: {
                        department: true,
                        role: true,
                        isDeleted: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                checkedInTime: 'asc',
            },
        });

        // Group by month and count all records
        const monthlyData = allLogs.reduce((acc, log) => {
            const month = log.checkedInTime.toLocaleDateString('en-US', { month: 'long' });
            
            if (!acc[month]) {
                acc[month] = 0;
            }
            
            // Count all records first (remove filters to see what's happening)
            acc[month]++;
            
            return acc;
        }, {} as Record<string, number>);

        // Create array of last 6 months
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push(date.toLocaleDateString('en-US', { month: 'long' }));
        }

        // Format data for chart, ensuring all months are represented
        const chartData = months.map(month => ({
            month,
            checkins: monthlyData[month] || 0,
        }));

        return NextResponse.json(chartData);
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch attendance data' },
            { status: 500 }
        );
    }
}
