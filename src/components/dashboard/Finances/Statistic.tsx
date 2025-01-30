import React from "react";
import { cn } from "@/lib/utils";
import { Filter, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatData {
  month: string;
  value: number;
}

interface StatisticsData {
  fundsRequested: {
    data: StatData[];
    totalTransactions: number;
    totalRevenue: number;
    savingGroups: number;
    fees: number;
    revenue: number;
  };
  fundsReceived: {
    data: StatData[];
    totalTransactions: number;
    totalRevenue: number;
    savingGroups: number;
    fees: number;
    revenue: number;
  };
}

interface StatisticsProps {
  data: StatisticsData;
  className?: string;
}

const StatChart: React.FC<{
  title: string;
  data: StatData[];
  stats: {
    savingGroups: number;
    fees: number;
    revenue: number;
    totalTransactions: number;
    totalRevenue: number;
  };
  color: string;
}> = ({ title, data, stats, color }) => (
  <div className="bg-white rounded-lg p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Select defaultValue="monthly">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="quarterly">Quarterly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Chart */}
    <div className="h-[300px] mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: '#666' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#666' }}
            ticks={[0, 100000, 200000, 300000, 400000, 500000]}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            formatter={(value: number) => `${value.toLocaleString()} XAF`}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`url(#gradient-${color})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Stats */}
    <div className="flex items-center text-sm space-x-6">
      <div>
        <span className="text-gray-500">Total Saving Groups:</span>{" "}
        <span className="font-medium">{stats.savingGroups}</span>
      </div>
      <div>
        <span className="text-gray-500">Fees:</span>{" "}
        <span className="font-medium">{stats.fees}%</span>
      </div>
      <div>
        <span className="text-gray-500">Revenue:</span>{" "}
        <span className="font-medium text-emerald-500">{stats.revenue.toFixed(2)}</span>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between border-t pt-4">
      <div className="flex items-center gap-2">
        <span className="bg-red-100 w-3 h-3 rounded-sm"></span>
        <span className="text-sm">
          Total transactions: {stats.totalTransactions.toLocaleString()}
        </span>
      </div>
      <div className="text-sm">
        Total Revenue: {stats.totalRevenue.toLocaleString()} XAF
      </div>
    </div>
  </div>
);

const Statistics: React.FC<StatisticsProps> = ({
  data,
  className,
}) => {
  return (
    <div className={cn("p-6 space-y-6", className)}>
      {/* Filters */}
      <div className="flex items-center justify-between p-2 bg-white rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-gray-500" />
            <span className="text-gray-600">Filter By</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="south">South</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="cameroon">Cameroon</SelectItem>
                <SelectItem value="nigeria">Nigeria</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="monthly">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button variant="ghost" className="text-red-500">
          <RotateCcw className="size-4 mr-2" />
          Reset Filter
        </Button>
      </div>

      {/* Charts */}
      <StatChart
        title="Funds Request"
        data={data.fundsRequested.data}
        stats={{
          savingGroups: data.fundsRequested.savingGroups,
          fees: data.fundsRequested.fees,
          revenue: data.fundsRequested.revenue,
          totalTransactions: data.fundsRequested.totalTransactions,
          totalRevenue: data.fundsRequested.totalRevenue,
        }}
        color="#6366f1"
      />

      <StatChart
        title="Funds Recieved"
        data={data.fundsReceived.data}
        stats={{
          savingGroups: data.fundsReceived.savingGroups,
          fees: data.fundsReceived.fees,
          revenue: data.fundsReceived.revenue,
          totalTransactions: data.fundsReceived.totalTransactions,
          totalRevenue: data.fundsReceived.totalRevenue,
        }}
        color="#3b82f6"
      />
    </div>
  );
};

// Sample Data
export const sampleData: StatisticsData = {
  fundsRequested: {
    data: [
      { month: "Jan", value: 150000 },
      { month: "Feb", value: 160000 },
      { month: "Mar", value: 190000 },
      { month: "Apr", value: 220000 },
      { month: "May", value: 280000 },
      { month: "Jun", value: 350000 },
      { month: "Jul", value: 320000 },
      { month: "Aug", value: 290000 },
      { month: "Sep", value: 310000 },
      { month: "Oct", value: 360000 },
      { month: "Nov", value: 420000 },
      { month: "Dec", value: 480000 },
    ],
    totalTransactions: 2359,
    totalRevenue: 0,
    savingGroups: 1035,
    fees: 3.00,
    revenue: 0.60,
  },
  fundsReceived: {
    data: [
      { month: "Jan", value: 140000 },
      { month: "Feb", value: 150000 },
      { month: "Mar", value: 180000 },
      { month: "Apr", value: 210000 },
      { month: "May", value: 270000 },
      { month: "Jun", value: 340000 },
      { month: "Jul", value: 300000 },
      { month: "Aug", value: 280000 },
      { month: "Sep", value: 300000 },
      { month: "Oct", value: 350000 },
      { month: "Nov", value: 410000 },
      { month: "Dec", value: 470000 },
    ],
    totalTransactions: 2359,
    totalRevenue: 0,
    savingGroups: 1035,
    fees: 1.00,
    revenue: 0.00,
  },
};

export default Statistics;