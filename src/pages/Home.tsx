import { useEffect, useState } from "react";
import axios from "axios";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Component } from "@/components/pie-chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TotalReport,
  PendingReports,
  ResolvedReports,
  NumberOfTeams,
} from "@/components/cards";

interface Report {
  id: number;
  createdAt: string;
  status: "DUPLICATE" | "INPROGRESS" | "FINISHED";
}

interface Team {
  id: number;
  createdAt: string;
  phonenumber: string;
  assignedreport: number | null;
}

interface DashboardData {
  reports: Report[];
  teams: Team[];
  reportslen: number;
  duplicatereports: number;
  assignedreports: number;
  finishedreports: number;
  teamslen: number;
  workingteams: number;
}

const Home = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

useEffect(() => {
  const fetchDashboardData = async () => {
    const token = localStorage.getItem("adminToken"); 

    if (!token) {
      console.error("Admin token not found.");
      return;
    }

    try {
      const response = await  axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  fetchDashboardData();
}, []);



  if (!dashboardData) return <div className="p-4">Loading dashboard...</div>;

  const {
    reportslen,
    assignedreports,
    finishedreports,
    teamslen,
    workingteams,
  } = dashboardData;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 lg:px-6">
            <TotalReport
              total={reportslen.toString()}
            />
            <PendingReports
              number={assignedreports.toString()}
            />
            <ResolvedReports
              number={finishedreports.toString()}
            />
            <NumberOfTeams
              number={teamslen.toString()}
            />
          </div>

          
          <div className="max-w-7xl mx-auto px-4" id="overview">
            <ChartAreaInteractive  />
          </div>
          
          <div className="max-w-7xl mx-auto px-4" id="teams">
            <Component />
          </div>
          <div>
            <Table className="max-w-7xl mx-auto px-4" id="resolved">
              <TableCaption>A list of recent reports</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{report.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
