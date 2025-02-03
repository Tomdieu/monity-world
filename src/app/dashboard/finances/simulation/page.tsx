"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface ChartData {
  month: string;
  value: number;
}

interface StatProps {
  label: string;
  value: string;
  valueColor?: string;
}

// Mock data for the charts
const monthlyData: ChartData[] = [
  { month: 'Feb', value: 1000 },
  { month: 'Mar', value: 2000 },
  { month: 'Apr', value: 3000 },
  { month: 'May', value: 8000 },
  { month: 'June', value: 12000 },
  { month: 'July', value: 15000 },
  { month: 'Aug', value: 8000 },
  { month: 'Sept', value: 10000 },
  { month: 'Oct', value: 12000 },
  { month: 'Nov', value: 15000 },
  { month: 'Dec', value: 20000 },
];

// Stat Component
const Stat: React.FC<StatProps> = ({ label, value, valueColor = 'text-gray-900' }) => (
  <div className="flex items-center space-x-2">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className={`text-sm font-medium ${valueColor}`}>{value}</span>
  </div>
);

// Chart Component
const ChartSection: React.FC<{
  title: string;
  data: ChartData[];
  areaColor: string;
  gradientId: string;
}> = ({ title, data, areaColor, gradientId }) => (
  <Card className="w-full mb-6">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <Select defaultValue="monthly">
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="daily">Daily</SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={areaColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} XAF`, 'Value']}
            />
            <Area
              type="linear"
              dataKey="value"
              stroke={areaColor}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-500">Total Saving Groups</span>
          </div>
          <span className="text-sm font-medium">5.000 %</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Revenue:</span>
          <span className="text-sm text-blue-500">0.00</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main Demo Page Component
const SimulationPage: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-red-500 text-lg font-medium mb-4">Demo mode</h1>
      </div>

      {/* Funds Request Chart */}
      <ChartSection
        title="Funds Request"
        data={monthlyData}
        areaColor="#9333EA"
        gradientId="purpleGradient"
      />

      <div className="flex justify-end mb-4 space-x-6">
        <Stat label="Total transactions:" value="2359" />
        <Stat label="Total Revenue:" value="0.00 XAF" valueColor="text-emerald-500" />
      </div>

      {/* Funds Received Chart */}
      <ChartSection
        title="Funds Recieved"
        data={monthlyData}
        areaColor="#3B82F6"
        gradientId="blueGradient"
      />
    </div>
  );
};

export default SimulationPage;