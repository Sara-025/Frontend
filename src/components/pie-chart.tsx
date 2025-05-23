import * as React from "react"
import axios from "axios"
import { TrendingUp } from "lucide-react"
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


interface Team {
  id: string
  createdAt: string
  phonenumber: string
  assignedreport: string | null
}

interface DashboardData {
  reports: Report[]
  teams: Team[]
  reportslen: number
  duplicatereports: number
  assignedreports: number
  finishedreports: number
  teamslen: number
  workingteams: number
}
 
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
    color: "blue-900",
  },
 
} satisfies ChartConfig

export function Component() {
  const [dashboardData, setDashboardData] = React.useState<DashboardData | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken") 
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDashboardData(res.data)
      } catch (err) {
        console.error("Failed to fetch dashboard data", err)
      }
    }

    fetchData()
  }, [])

  const chartData = React.useMemo(() => {
    if (!dashboardData) return []

    const assigned = dashboardData.workingteams
    const total = dashboardData.teamslen
    const available = total - assigned
    

    return [
      { activity: "assigned", teams: assigned, fill: "#3b82f6" },
      { activity: "available", teams: available, fill: "#2563eb" },
     
    ]
  }, [dashboardData])

  const totalTeams = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.teams, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col relative p-6 gap-4">
      <CardHeader className="relative left-4 top-4">
        <CardTitle>Teams Activity Status</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-center py-4">
        <ChartContainer config={chartConfig} className="aspect-square max-h-[250px] w-full">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="teams" nameKey="activity" innerRadius={60} strokeWidth={5}>
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
        
        <div className="leading-none text-muted-foreground">
          Showing total teams and their status
        </div>
      </CardFooter>
    </Card>
  )
}
