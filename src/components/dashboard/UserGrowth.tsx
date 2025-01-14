"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export function UserGrowth() {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={true} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis dataKey={"desktop"} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                    dataKey="desktop"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0.1}
                    stroke="var(--color-desktop)"
                />
            </AreaChart>
        </ChartContainer>
    )
}
