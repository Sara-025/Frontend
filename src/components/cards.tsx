
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface totalreport {
  total: string;

}

export const TotalReport: React.FC<totalreport> = ({ total }) => {
  return (
    <Card className="@container/card bg-blue-200  cursor-pointer">
      <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
        <CardDescription>Total reports</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums text-center">
          {total}
        </CardTitle>
        
      </CardHeader>
      
      <CardFooter className="flex flex-col items-center gap-1 text-sm">
             <div className="line-clamp-1 flex gap-2 font-medium"> Collected report statistics</div>
       
        
        <div className="text-muted-foreground">
          <a href="#overview" className="cursor-pointer ">Report activity overview</a>
        </div>
      </CardFooter>
    </Card>
  );
};
interface PendingReports {
    number: string;
  }
  
  export const PendingReports: React.FC<PendingReports> = ({ number }) => {
    return (
      <Card className="@container/card bg-blue-200  cursor-pointer">
        <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
          <CardDescription>Pending Reports</CardDescription> 
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {number}
          </CardTitle>
          <div className="absolute right-4 top-4 z-10">
            
          </div>
        </CardHeader>
        
        <CardFooter className="flex flex-col items-center gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Reports currently awaiting review </div>
          
          <div className="text-muted-foreground">
            Pending reports status 
          </div>
        </CardFooter>
        
      </Card>
    );
  };
 
interface ResolvedReports {
  number: string;
}

export const ResolvedReports: React.FC<ResolvedReports> = ({ number }) => {
  return (
    <Card className="@container/card bg-blue-200  cursor-pointer">
      <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
        <CardDescription>Resolved Reports</CardDescription> 
        <CardTitle className="text-2xl font-semibold tabular-nums text-center">
          {number}
        </CardTitle>
     
      </CardHeader>
      <CardFooter className="flex flex-col items-center gap-1 text-sm">
         <div className="line-clamp-1 flex gap-2 font-medium">Reports resolved in the recent period</div>
        
        <div className="text-muted-foreground">
          <a href="#resolved" className="cursor-pointer ">Resolution overview</a>
        </div>
      </CardFooter>
    </Card>
  );
};

interface NumberOfTeams {
  number: string;
}

export const NumberOfTeams: React.FC<NumberOfTeams> = ({ number}) => {
  return (
    <Card className="@container/card bg-blue-200  cursor-pointer">
      <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
        <CardDescription>Number Of Teams</CardDescription> 
        <CardTitle className="text-2xl font-semibold tabular-nums text-center">
          {number}
        </CardTitle>
       
      </CardHeader>
      <CardFooter className="flex flex-col items-center gap-1 text-sm">
         <div className="line-clamp-1 flex gap-2 font-medium">All registered teams</div>
      
        <div className="text-muted-foreground">
          <a href="#teams" className="cursor-pointer ">teams status overview</a>
        </div>
      </CardFooter>
    </Card>
  );
};


  