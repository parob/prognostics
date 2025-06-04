import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Settings, TrendingUp, Fuel, AlertTriangle, CheckCircle } from 'lucide-react';

const Index = () => {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);

  // Individual vessel data
  const vessels = [
    {
      id: 'vessel-a',
      name: 'Vessel A',
      type: 'Supply Vessel',
      status: 'active',
      efficiency: 87,
      emissions: 75,
      maintenance: 90,
      operations: 85,
      lastUpdate: '2 hours ago',
      data: [
        { metric: 'Engine', value: 85, fullMark: 100 },
        { metric: 'Fuel', value: 90, fullMark: 100 },
        { metric: 'Emissions', value: 75, fullMark: 100 },
        { metric: 'Navigation', value: 95, fullMark: 100 },
        { metric: 'Safety', value: 88, fullMark: 100 },
        { metric: 'Maintenance', value: 82, fullMark: 100 },
      ]
    },
    {
      id: 'vessel-b',
      name: 'Vessel B',
      type: 'Platform Supply',
      status: 'maintenance',
      efficiency: 72,
      emissions: 68,
      maintenance: 45,
      operations: 0,
      lastUpdate: '1 day ago',
      data: [
        { metric: 'Engine', value: 60, fullMark: 100 },
        { metric: 'Fuel', value: 72, fullMark: 100 },
        { metric: 'Emissions', value: 68, fullMark: 100 },
        { metric: 'Navigation', value: 85, fullMark: 100 },
        { metric: 'Safety', value: 75, fullMark: 100 },
        { metric: 'Maintenance', value: 45, fullMark: 100 },
      ]
    },
    {
      id: 'vessel-c',
      name: 'Vessel C',
      type: 'Anchor Handler',
      status: 'active',
      efficiency: 91,
      emissions: 88,
      maintenance: 95,
      operations: 92,
      lastUpdate: '30 minutes ago',
      data: [
        { metric: 'Engine', value: 95, fullMark: 100 },
        { metric: 'Fuel', value: 91, fullMark: 100 },
        { metric: 'Emissions', value: 88, fullMark: 100 },
        { metric: 'Navigation', value: 92, fullMark: 100 },
        { metric: 'Safety', value: 94, fullMark: 100 },
        { metric: 'Maintenance', value: 89, fullMark: 100 },
      ]
    },
    {
      id: 'vessel-d',
      name: 'Vessel D',
      type: 'Supply Vessel',
      status: 'active',
      efficiency: 79,
      emissions: 82,
      maintenance: 88,
      operations: 78,
      lastUpdate: '4 hours ago',
      data: [
        { metric: 'Engine', value: 82, fullMark: 100 },
        { metric: 'Fuel', value: 79, fullMark: 100 },
        { metric: 'Emissions', value: 82, fullMark: 100 },
        { metric: 'Navigation', value: 87, fullMark: 100 },
        { metric: 'Safety', value: 85, fullMark: 100 },
        { metric: 'Maintenance', value: 88, fullMark: 100 },
      ]
    },
    {
      id: 'vessel-e',
      name: 'Vessel E',
      type: 'Platform Supply',
      status: 'idle',
      efficiency: 0,
      emissions: 95,
      maintenance: 92,
      operations: 0,
      lastUpdate: '6 hours ago',
      data: [
        { metric: 'Engine', value: 85, fullMark: 100 },
        { metric: 'Fuel', value: 0, fullMark: 100 },
        { metric: 'Emissions', value: 95, fullMark: 100 },
        { metric: 'Navigation', value: 90, fullMark: 100 },
        { metric: 'Safety', value: 92, fullMark: 100 },
        { metric: 'Maintenance', value: 88, fullMark: 100 },
      ]
    },
    {
      id: 'vessel-f',
      name: 'Vessel F',
      type: 'Anchor Handler',
      status: 'active',
      efficiency: 84,
      emissions: 79,
      maintenance: 87,
      operations: 89,
      lastUpdate: '1 hour ago',
      data: [
        { metric: 'Engine', value: 88, fullMark: 100 },
        { metric: 'Fuel', value: 84, fullMark: 100 },
        { metric: 'Emissions', value: 79, fullMark: 100 },
        { metric: 'Navigation', value: 91, fullMark: 100 },
        { metric: 'Safety', value: 86, fullMark: 100 },
        { metric: 'Maintenance', value: 87, fullMark: 100 },
      ]
    },
  ];

  // Fleet overview data for spider chart - showing all vessels
  const fleetOverviewData = vessels.map(vessel => ({
    metric: vessel.name,
    value: Math.round((vessel.efficiency + vessel.emissions + vessel.maintenance + vessel.operations) / 4),
    fullMark: 100
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Settings className="h-4 w-4" />;
      case 'idle': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const chartConfig = {
    value: {
      label: "Performance",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Digital Fleet Platform</h1>
          <p className="text-slate-600">Monitor your fleet performance, optimize fuel efficiency, and reduce emissions</p>
        </div>

        {/* Fleet Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Fleet Performance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={fleetOverviewData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" className="text-xs" />
                    <PolarRadiusAxis domain={[0, 100]} className="text-xs" />
                    <Radar
                      name="Fleet Performance"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Fleet Summary card */}
          <Card>
            <CardHeader>
              <CardTitle>Fleet Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Vessels</span>
                <span className="font-semibold">{vessels.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Active</span>
                <span className="font-semibold text-green-600">{vessels.filter(v => v.status === 'active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">In Maintenance</span>
                <span className="font-semibold text-orange-600">{vessels.filter(v => v.status === 'maintenance').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Idle</span>
                <span className="font-semibold text-gray-600">{vessels.filter(v => v.status === 'idle').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Avg. Efficiency</span>
                  <span className="font-semibold">
                    {Math.round(vessels.reduce((acc, v) => acc + v.efficiency, 0) / vessels.length)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fleet Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Fleet Status</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vessels.map((vessel) => (
            <Card key={vessel.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{vessel.name}</CardTitle>
                    <p className="text-sm text-slate-600">{vessel.type}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(vessel.status)}`}>
                    {getStatusIcon(vessel.status)}
                    <span className="capitalize">{vessel.status}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <ChartContainer config={chartConfig} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={vessel.data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" className="text-xs" />
                        <PolarRadiusAxis domain={[0, 100]} className="text-xs" />
                        <Radar
                          name={vessel.name}
                          dataKey="value"
                          stroke="hsl(var(--chart-2))"
                          fill="hsl(var(--chart-2))"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Fuel Efficiency</span>
                    <span className="font-medium">{vessel.efficiency}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Emissions Score</span>
                    <span className="font-medium">{vessel.emissions}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Maintenance</span>
                    <span className="font-medium">{vessel.maintenance}%</span>
                  </div>
                  <div className="text-xs text-slate-500 pt-2 border-t">
                    Last update: {vessel.lastUpdate}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Fuel className="h-4 w-4" />
            <span>Fuel Report</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Emissions Report</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Maintenance Schedule</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
