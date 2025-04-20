import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RevenueCardProps {
  amount: string;
  percentage: string;
  isUp: boolean;
  trendLabel: string;
}

export const RevenueCard: React.FC<RevenueCardProps> = ({ amount, percentage, isUp, trendLabel }) => {
  return (
    <Card className="@container/card bg-sky-100 hover:bg-sky-200 active:bg-sky-300 transition-colors duration-300 cursor-pointer">
      <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums text-center">
          {amount}
        </CardTitle>
        <div className="absolute right-4 top-4 z-10">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {isUp ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {percentage}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-center gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {trendLabel}{" "}
          {isUp ? (
            <TrendingUpIcon className="size-4" />
          ) : (
            <TrendingDownIcon className="size-4" />
          )}
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months {/* Static subtitle */}
        </div>
      </CardFooter>
    </Card>
  );
};
interface NewUsersCardProps {
    amount: string;
    percentage: string;
    isUp: boolean;
    trendLabel: string;
    subtitle: string;
  }
  
  export const NewUsersCard: React.FC<NewUsersCardProps> = ({ amount, percentage, isUp, trendLabel, subtitle }) => {
    return (
      <Card className="@container/card bg-sky-100 hover:bg-sky-200 active:bg-sky-300 transition-colors duration-300 cursor-pointer">
        <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
          <CardDescription>New Users</CardDescription> 
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {amount}
          </CardTitle>
          <div className="absolute right-4 top-4 z-10">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {isUp ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {percentage}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col items-center gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {trendLabel}{" "}
            {isUp ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {subtitle} 
          </div>
        </CardFooter>
      </Card>
    );
  };
 
interface ActiveUsersCardProps {
  amount: string;
  percentage: string;
  isUp: boolean;
  trendLabel: string;
  subtitle: string;
}

export const ActiveUsersCard: React.FC<ActiveUsersCardProps> = ({ amount, percentage, isUp, trendLabel, subtitle }) => {
  return (
    <Card className="@container/card bg-sky-100 hover:bg-sky-200 active:bg-sky-300 transition-colors duration-300 cursor-pointer">
      <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
        <CardDescription>Active Users</CardDescription> 
        <CardTitle className="text-2xl font-semibold tabular-nums text-center">
          {amount}
        </CardTitle>
        <div className="absolute right-4 top-4 z-10">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {isUp ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {percentage}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-center gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {trendLabel}{" "}
          {isUp ? (
            <TrendingUpIcon className="size-4" />
          ) : (
            <TrendingDownIcon className="size-4" />
          )}
        </div>
        <div className="text-muted-foreground">
          {subtitle}
        </div>
      </CardFooter>
    </Card>
  );
};

interface ActiveTeamsCardProps {
  percentage: string;
  trendLabel: string;
  subtitle: string;
  isUp: boolean;
}

export const ActiveTeamsCard: React.FC<ActiveTeamsCardProps> = ({ percentage, trendLabel, subtitle, isUp }) => {
  return (
    <Card className="@container/card bg-sky-100 hover:bg-sky-200 active:bg-sky-300 transition-colors duration-300 cursor-pointer">
      <CardHeader className="flex items-center justify-start space-x-4 relative left-4 top-2">
        <CardDescription>Active Teams</CardDescription> {/* Static title */}
        <CardTitle className="text-2xl font-semibold tabular-nums text-center">
          {percentage}
        </CardTitle>
        <div className="absolute right-4 top-4 z-10">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {isUp ? (
              <TrendingUpIcon className="size-3" />
            ) : (
              <TrendingDownIcon className="size-3" />
            )}
            {percentage}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-center gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {trendLabel}{" "}
          {isUp ? (
            <TrendingUpIcon className="size-4" />
          ) : (
            <TrendingDownIcon className="size-4" />
          )}
        </div>
        <div className="text-muted-foreground">
          {subtitle}
        </div>
      </CardFooter>
    </Card>
  );
};


  