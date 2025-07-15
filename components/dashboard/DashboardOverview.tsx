"use client"

import React, { useEffect, useState } from "react";
import {TrendingUp} from "lucide-react"
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"

interface ChartData {
    month: string;
    checkins: number; // Changed from 'desktop' to 'checkins'
}

const chartConfig = {
    checkins: {
        label: "Check-ins",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartAreaDefault() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await fetch('/api/dashboard/attendance');
                const data = await response.json();
                if (data && data.length > 0) {
                    setChartData(data);
                } else {
                    // Fallback data when no data is available
                    setChartData([
                        { month: "January", checkins: 0 },
                        { month: "February", checkins: 0 },
                        { month: "March", checkins: 0 },
                        { month: "April", checkins: 0 },
                        { month: "May", checkins: 0 },
                        { month: "June", checkins: 0 },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                // Fallback data on error
                setChartData([
                    { month: "January", checkins: 0 },
                    { month: "February", checkins: 0 },
                    { month: "March", checkins: 0 },
                    { month: "April", checkins: 0 },
                    { month: "May", checkins: 0 },
                    { month: "June", checkins: 0 },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Overview</CardTitle>
                    <CardDescription>
                        Showing attendance for the last 6 months
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px] w-full bg-gray-100 animate-pulse rounded"></div>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>
                    Monthly check-in records from ActivityLog for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        height={100}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <Area
                            dataKey="checkins"
                            type="natural"
                            fill="var(--color-checkins)"
                            fillOpacity={0.4}
                            stroke="var(--color-checkins)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Last 6 months attendance data
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
