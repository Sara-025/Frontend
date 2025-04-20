

import * as React from "react"
import {  TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
const chartData = [
    { activity: "assigned", teams: 30, fill: "#3b82f6" }, 
    { activity: "available", teams: 35, fill: "#2563eb" }, 
    { activity: "offline", teams: 25, fill: "#1d4ed8" }, 
  ]
  


const chartConfig = {
  teams: {
    label: "teams",
  },
  assigned: {
    label: "assigned",
    color: "blue-500",
  },
  available: {
    label: "available",
    color: "blue-700",
  },
  offline: {
    label: "offline",
    color: "blue-900",
  },
 
} satisfies ChartConfig

export function Component() {
  const totalTeams = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.teams, 0)
  }, [])

  return (
    <Card className="flex flex-col relative p-6 gap-4"> 
  <CardHeader className="relative left-4 top-4">
    <CardTitle>Teams Activity Status</CardTitle>
    <CardDescription>January - June 2025</CardDescription>
  </CardHeader>

  <CardContent className="flex items-center justify-center py-4"> 
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[250px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="teams"
          nameKey="activity"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
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
                      {totalTeams.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      teams
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

  <CardFooter className="relative left-4 bottom-4 flex flex-col items-start gap-2 text-sm">

    <div className="flex items-center gap-2 font-medium leading-none">
      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
    </div>
    <div className="leading-none text-muted-foreground">
      Showing total teams for the last 6 months
    </div>
  </CardFooter>
</Card>

  )
}
