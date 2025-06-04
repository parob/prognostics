import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Settings, TrendingUp, Fuel, AlertTriangle, CheckCircle, Gauge, Activity, Shield, ChevronDown } from 'lucide-react';
import RadialGauge from '@/components/ui/radial-gauge';
import VesselDetailModal from '@/components/VesselDetailModal';

const Index = () => {
  const [selectedVessels, setSelectedVessels] = useState<string[]>(['armada-7801', 'armada-7802', 'armada-7803', 'armada-7804', 'armada-7805', 'armada-7806', 'armada-7807', 'armada-7808']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVesselForDetail, setSelectedVesselForDetail] = useState<string | null>(null);

  // Individual vessel data
  const vessels = [
    {
      id: 'armada-7801',
      name: 'ARMADA 7801',
      type: 'Multi Purpose Offshore Vessel',
      status: 'active',
      efficiency: 87,
      emissions: 75,
      maintenance: 90,
      operations: 85,
      lastUpdate: '2 minutes ago',
      location: 'North Sea',
      coordinates: { lat: 60.5, lng: 2.8 },
      imo: '9924247',
      mmsi: '563170800',
      callSign: '9V8449',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 0,
      course: 244,
      destination: 'BREIDABLIKK FIELD',
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
      id: 'armada-7802',
      name: 'ARMADA 7802',
      type: 'Platform Supply Vessel',
      status: 'maintenance',
      efficiency: 72,
      emissions: 68,
      maintenance: 45,
      operations: 0,
      lastUpdate: '1 day ago',
      location: 'Aberdeen',
      coordinates: { lat: 57.1497, lng: -2.0943 },
      imo: '9924248',
      mmsi: '563170801',
      callSign: '9V8450',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 0,
      course: 0,
      destination: 'ABERDEEN',
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
      id: 'armada-7803',
      name: 'ARMADA 7803',
      type: 'Anchor Handler',
      status: 'active',
      efficiency: 91,
      emissions: 88,
      maintenance: 95,
      operations: 92,
      lastUpdate: '30 minutes ago',
      location: 'Norwegian Sea',
      coordinates: { lat: 65.5, lng: 8.2 },
      imo: '9924249',
      mmsi: '563170802',
      callSign: '9V8451',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 12,
      course: 180,
      destination: 'KRISTIANSUND',
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
      id: 'armada-7804',
      name: 'ARMADA 7804',
      type: 'Supply Vessel',
      status: 'active',
      efficiency: 79,
      emissions: 82,
      maintenance: 88,
      operations: 78,
      lastUpdate: '4 hours ago',
      location: 'Baltic Sea',
      coordinates: { lat: 58.5, lng: 16.8 },
      imo: '9924250',
      mmsi: '563170803',
      callSign: '9V8452',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 8,
      course: 90,
      destination: 'STOCKHOLM',
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
      id: 'armada-7805',
      name: 'ARMADA 7805',
      type: 'Platform Supply Vessel',
      status: 'idle',
      efficiency: 0,
      emissions: 95,
      maintenance: 92,
      operations: 0,
      lastUpdate: '6 hours ago',
      location: 'Rotterdam',
      coordinates: { lat: 51.9244, lng: 4.4777 },
      imo: '9924251',
      mmsi: '563170804',
      callSign: '9V8453',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 0,
      course: 0,
      destination: 'ROTTERDAM',
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
      id: 'armada-7806',
      name: 'ARMADA 7806',
      type: 'Anchor Handler',
      status: 'active',
      efficiency: 84,
      emissions: 79,
      maintenance: 87,
      operations: 89,
      lastUpdate: '1 hour ago',
      location: 'Celtic Sea',
      coordinates: { lat: 51.0, lng: -8.0 },
      imo: '9924252',
      mmsi: '563170805',
      callSign: '9V8454',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 10,
      course: 270,
      destination: 'CORK',
      data: [
        { metric: 'Engine', value: 88, fullMark: 100 },
        { metric: 'Fuel', value: 84, fullMark: 100 },
        { metric: 'Emissions', value: 79, fullMark: 100 },
        { metric: 'Navigation', value: 91, fullMark: 100 },
        { metric: 'Safety', value: 86, fullMark: 100 },
        { metric: 'Maintenance', value: 87, fullMark: 100 },
      ]
    },
    {
      id: 'armada-7807',
      name: 'ARMADA 7807',
      type: 'Supply Vessel',
      status: 'active',
      efficiency: 88,
      emissions: 85,
      maintenance: 93,
      operations: 87,
      lastUpdate: '3 hours ago',
      location: 'Danish Strait',
      coordinates: { lat: 55.7, lng: 12.6 },
      imo: '9924253',
      mmsi: '563170806',
      callSign: '9V8455',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 6,
      course: 45,
      destination: 'COPENHAGEN',
      data: [
        { metric: 'Engine', value: 90, fullMark: 100 },
        { metric: 'Fuel', value: 88, fullMark: 100 },
        { metric: 'Emissions', value: 85, fullMark: 100 },
        { metric: 'Navigation', value: 93, fullMark: 100 },
        { metric: 'Safety', value: 89, fullMark: 100 },
        { metric: 'Maintenance', value: 93, fullMark: 100 },
      ]
    },
    {
      id: 'armada-7808',
      name: 'ARMADA 7808',
      type: 'Multi Purpose Offshore Vessel',
      status: 'active',
      efficiency: 86,
      emissions: 83,
      maintenance: 89,
      operations: 91,
      lastUpdate: '45 minutes ago',
      location: 'Barents Sea',
      coordinates: { lat: 71.0, lng: 25.0 },
      imo: '9924254',
      mmsi: '563170807',
      callSign: '9V8456',
      flag: 'Singapore',
      length: 78,
      width: 15.44,
      speed: 14,
      course: 330,
      destination: 'HAMMERFEST',
      data: [
        { metric: 'Engine', value: 89, fullMark: 100 },
        { metric: 'Fuel', value: 86, fullMark: 100 },
        { metric: 'Emissions', value: 83, fullMark: 100 },
        { metric: 'Navigation', value: 94, fullMark: 100 },
        { metric: 'Safety', value: 88, fullMark: 100 },
        { metric: 'Maintenance', value: 89, fullMark: 100 },
      ]
    },
  ];

  // Filter vessels based on selection
  const filteredVessels = vessels.filter(vessel => selectedVessels.includes(vessel.id));

  const handleVesselToggle = (vesselId: string) => {
    setSelectedVessels(prev => 
      prev.includes(vesselId) 
        ? prev.filter(id => id !== vesselId)
        : [...prev, vesselId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVessels.length === vessels.length) {
      setSelectedVessels([]);
    } else {
      setSelectedVessels(vessels.map(v => v.id));
    }
  };

  const handleVesselClick = (vesselId: string) => {
    setSelectedVesselForDetail(vesselId);
  };

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Armada Fleet</h1>
          <p className="text-slate-600">Monitor your fleet performance, optimize fuel efficiency, and reduce emissions</p>
        </div>

        {/* Vessel Filter Dropdown */}
        <div className="mb-6">
          <div className="flex items-start space-x-4">
            <label className="text-sm font-medium text-slate-700 mt-2">Filter Vessels:</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 min-w-[300px] flex items-center justify-between hover:bg-gray-50"
              >
                <span className="text-sm text-slate-700">
                  {selectedVessels.length === vessels.length 
                    ? 'All Vessels Selected' 
                    : `${selectedVessels.length} of ${vessels.length} vessels selected`}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[300px] max-h-80 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-700">Select Vessels ({selectedVessels.length}/{vessels.length})</span>
                      <button
                        onClick={handleSelectAll}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {selectedVessels.length === vessels.length ? 'Deselect All' : 'Select All'}
                      </button>
                    </div>
                  </div>
                  <div className="p-2">
                    {vessels.map((vessel) => (
                      <div key={vessel.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                        <Checkbox
                          id={vessel.id}
                          checked={selectedVessels.includes(vessel.id)}
                          onCheckedChange={() => handleVesselToggle(vessel.id)}
                        />
                        <label
                          htmlFor={vessel.id}
                          className="text-sm text-slate-700 cursor-pointer flex-1"
                        >
                          {vessel.name}
                        </label>
                        <div className={`w-2 h-2 rounded-full ${vessel.status === 'active' ? 'bg-green-500' : vessel.status === 'maintenance' ? 'bg-orange-500' : 'bg-gray-500'}`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
            <Card 
              key={vessel.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleVesselClick(vessel.id)}
            >
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
                    <span className="text-slate-600">Location</span>
                    <span className="font-medium">{vessel.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Speed</span>
                    <span className="font-medium">{vessel.speed} kn</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Course</span>
                    <span className="font-medium">{vessel.course}°</span>
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

      {/* Vessel Detail Modal */}
      {selectedVesselForDetail && (
        <VesselDetailModal
          vessel={vessels.find(v => v.id === selectedVesselForDetail)!}
          isOpen={!!selectedVesselForDetail}
          onClose={() => setSelectedVesselForDetail(null)}
        />
      )}
    </div>
  );
};

export default Index;
