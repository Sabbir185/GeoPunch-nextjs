"use client"

import * as React from "react"
import {TrendingUp} from "lucide-react"
import {Label, Pie, PieChart} from "recharts"

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

export const description = "A donut chart with text"

interface ChartData {
    browser: string;
    visitors: number;
    fill: string;
}

const chartConfig = {
    visitors: {
        label: "Users",
    },
    chrome: {
        label: "Department 1",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Department 2",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Department 3",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Department 4",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ChartPieDonutText() {
    const [chartData, setChartData] = React.useState<ChartData[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserDistribution = async () => {
            try {
                const response = await fetch('/api/dashboard/user-distribution');
                const data = await response.json();
                if (data && data.length > 0) {
                    setChartData(data);
                } else {
                    // Fallback data when no data is available
                    setChartData([
                        { browser: "No Data", visitors: 1, fill: "var(--chart-1)" }
                    ]);
                }
            } catch (error) {
                console.error('Error fetching user distribution data:', error);
                // Fallback data on error
                setChartData([
                    { browser: "No Data", visitors: 1, fill: "var(--chart-1)" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDistribution();
    }, []);

    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [chartData]);

    if (loading) {
        return (
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>User Distribution</CardTitle>
                    <CardDescription>By Department</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <div className="mx-auto aspect-square max-h-[250px] bg-gray-100 animate-pulse rounded-full"></div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>By Department</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Users
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing user distribution by department
                </div>
            </CardFooter>
        </Card>
    )
}
