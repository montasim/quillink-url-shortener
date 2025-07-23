"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Link click data for 15 days
const chartData = [
    { date: "Jul 11", clicks: 23 },
    { date: "Jul 12", clicks: 45 },
    { date: "Jul 13", clicks: 31 },
    { date: "Jul 14", clicks: 62 },
    { date: "Jul 15", clicks: 40 },
    { date: "Jul 16", clicks: 52 },
    { date: "Jul 17", clicks: 71 },
    { date: "Jul 18", clicks: 38 },
    { date: "Jul 19", clicks: 49 },
    { date: "Jul 20", clicks: 55 },
    { date: "Jul 21", clicks: 61 },
    { date: "Jul 22", clicks: 44 },
    { date: "Jul 23", clicks: 70 },
    { date: "Jul 24", clicks: 85 },
    { date: "Jul 25", clicks: 90 },
]

// Get total clicks
const totalClicks = chartData.reduce((sum, d) => sum + d.clicks, 0)

// Extract unique month names from date strings (e.g., "Jul")
const monthSet = new Set(chartData.map(item => item.date.split(" ")[0]))
const monthRange = [...monthSet].join(" - ") // "Jul" or "Jul - Aug"

// Extract day numbers for the X-axis
const transformedData = chartData.map(item => ({
    ...item,
    day: item.date.split(" ")[1], // e.g., "11" from "Jul 11"
}))

// Chart configuration for single line
const chartConfig = {
    clicks: {
        label: "Link Clicks",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function Chart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Clicks: {totalClicks}</CardTitle>
                <CardDescription>
                    Link click activity for the last 15 days [{monthRange}]
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart data={transformedData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={0}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-clicks)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-clicks)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="clicks"
                            type="natural"
                            fill="url(#fillClicks)"
                            fillOpacity={0.4}
                            stroke="var(--color-clicks)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
