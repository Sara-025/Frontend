import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { Component } from "@/components/pie-chart"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RevenueCard } from '@/components/cards';
import { NewUsersCard } from '@/components/cards';
import { ActiveUsersCard } from '@/components/cards';
import { ActiveTeamsCard } from '@/components/cards';
const Home = () => {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 lg:px-6 ">

            <RevenueCard
              amount="$1,250.00"
              percentage="+12.5%"
              isUp={true}
              trendLabel="Trending up this month"
            />
            <NewUsersCard
              amount="1,234"
              percentage="-20%"
              isUp={false}
              trendLabel="Down 20% this period"
              subtitle="Acquisition needs attention"
            />
            <ActiveUsersCard
              amount="45,678"
              percentage="+12.5%"
              isUp={true}
              trendLabel="Strong user retention"
              subtitle="Engagement exceeds targets"
            />
            <ActiveTeamsCard
              percentage="4.5%"
              trendLabel="Steady performance"
              subtitle="Meets growth projections"
              isUp={true}
            />
            </div>
            <div className="max-w-7xl mx-auto px-4">
                <ChartAreaInteractive />
            </div>
            <div style={{ width: '500px' }}>
              <Component  />
            </div>
            <div>
            <Table>
              <TableCaption>A list of your recent projects</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Manager</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">llll</TableCell>
                  <TableCell>2025-01-01</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">xxxxx</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">xxxxx</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">xxxxx</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">xxxxx</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">xxxxx</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">xxxxx</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">xxxxx</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell className="text-right">$2500.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
