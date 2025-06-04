import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Settings, TrendingUp, Fuel, AlertTriangle, CheckCircle, Gauge, Activity, Shield } from 'lucide-react';
import RadialGauge from '@/components/ui/radial-gauge';

const Index = () => {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [vesselFilter, setVesselFilter] = useState<string>('all');

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

  // Filter vessels based on selection
  const filteredVessels = vesselFilter === 'all' ? vessels : vessels.filter(vessel => vessel.id === vesselFilter);

  // Fleet overview data - changes based on number of vessels selected
  const getFleetOverviewData = () => {
    if (filteredVessels.length === 1) {
      // For single vessel, show overall performance score
      const vessel = filteredVessels[0];
      return [{
        metric: vessel.name,
        value: Math.round((vessel.efficiency + vessel.emissions + vessel.maintenance + vessel.operations) / 4),
        fullMark: 100
      }];
    } else if (filteredVessels.length === 2) {
      // For 2 vessels, show their overall scores
      return filteredVessels.map(vessel => ({
        metric: vessel.name,
        value: Math.round((vessel.efficiency + vessel.emissions + vessel.maintenance + vessel.operations) / 4),
        fullMark: 100
      }));
    } else {
      // For 3+ vessels, show vessel overview
      return filteredVessels.map(vessel => ({
        metric: vessel.name,
        value: Math.round((vessel.efficiency + vessel.emissions + vessel.maintenance + vessel.operations) / 4),
        fullMark: 100
      }));
    }
  };

  const fleetOverviewData = getFleetOverviewData();

  const getOverviewTitle = () => {
    if (filteredVessels.length === 1) {
      return `${filteredVessels[0].name} - Overall Performance`;
    } else if (filteredVessels.length === 2) {
      return `${filteredVessels[0].name} & ${filteredVessels[1].name} - Performance Comparison`;
    } else {
      return 'Fleet Performance Overview';
    }
  };

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

  // Single vessel overview component
  const SingleVesselOverview = ({ vessel }: { vessel: typeof vessels[0] }) => {
    const overallScore = Math.round((vessel.efficiency + vessel.emissions + vessel.maintenance + vessel.operations) / 4);
    
    const getScoreColor = (score: number) => {
      if (score >= 85) return 'text-green-600';
      if (score >= 70) return 'text-yellow-600';
      return 'text-red-600';
    };

    const getScoreBgColor = (score: number) => {
      if (score >= 85) return 'bg-green-100';
      if (score >= 70) return 'bg-yellow-100';
      return 'bg-red-100';
    };

    return (
      <div className="space-y-6">
        {/* Vessel Header */}
        <div className="text-center space-y-2">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(vessel.status)}`}>
            {getStatusIcon(vessel.status)}
            <span className="capitalize">{vessel.status}</span>
          </div>
          <p className="text-slate-600">{vessel.type}</p>
          <p className="text-xs text-slate-500">Last update: {vessel.lastUpdate}</p>
        </div>

        {/* Overall Performance Score */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(overallScore)} mb-2`}>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</div>
              <div className="text-xs text-slate-600">Overall</div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Fuel className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-blue-900">{vessel.efficiency}%</div>
            <div className="text-sm text-blue-700">Fuel Efficiency</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Activity className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-green-900">{vessel.emissions}%</div>
            <div className="text-sm text-green-700">Emissions Score</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <Settings className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-orange-900">{vessel.maintenance}%</div>
            <div className="text-sm text-orange-700">Maintenance</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <Gauge className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-semibold text-purple-900">{vessel.operations}%</div>
            <div className="text-sm text-purple-700">Operations</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Digital Fleet Platform</h1>
          <p className="text-slate-600">Monitor your fleet performance, optimize fuel efficiency, and reduce emissions</p>
        </div>

        {/* Vessel Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-slate-700">Filter Vessels:</label>
            <Select value={vesselFilter} onValueChange={setVesselFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select vessels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vessels</SelectItem>
                {vessels.map((vessel) => (
                  <SelectItem key={vessel.id} value={vessel.id}>
                    {vessel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Fleet Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>{getOverviewTitle()}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredVessels.length <= 2 ? (
                <RadialGauge data={fleetOverviewData} className="h-[300px]" />
              ) : (
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={fleetOverviewData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" className="text-xs" />
                      <PolarRadiusAxis domain={[0, 100]} className="text-xs" />
                      <Radar
                        name="Performance"
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
              )}
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
                <span className="font-semibold">{filteredVessels.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Active</span>
                <span className="font-semibold text-green-600">{filteredVessels.filter(v => v.status === 'active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">In Maintenance</span>
                <span className="font-semibold text-orange-600">{filteredVessels.filter(v => v.status === 'maintenance').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Idle</span>
                <span className="font-semibold text-gray-600">{filteredVessels.filter(v => v.status === 'idle').length}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Avg. Efficiency</span>
                  <span className="font-semibold">
                    {filteredVessels.length > 0 ? Math.round(filteredVessels.reduce((acc, v) => acc + v.efficiency, 0) / filteredVessels.length) : 0}%
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
          {filteredVessels.map((vessel) => (
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
