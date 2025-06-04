import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MaintenanceProps {
  selectedVessels: string[];
}

const Maintenance: React.FC<MaintenanceProps> = ({ selectedVessels }) => {
  // Sample data for radar charts
  const engineData = [
    { subject: 'Vibration', A: 120, B: 110, fullMark: 150 },
    { subject: 'Temperature', A: 98, B: 130, fullMark: 150 },
    { subject: 'Oil Pressure', A: 86, B: 130, fullMark: 150 },
    { subject: 'RPM', A: 99, B: 100, fullMark: 150 },
    { subject: 'Load', A: 85, B: 90, fullMark: 150 },
    { subject: 'Fuel Rate', A: 65, B: 85, fullMark: 150 },
  ];

  const propulsionData = [
    { subject: 'Thrust', A: 120, B: 110, fullMark: 150 },
    { subject: 'Torque', A: 98, B: 130, fullMark: 150 },
    { subject: 'Efficiency', A: 86, B: 130, fullMark: 150 },
    { subject: 'Vibration', A: 99, B: 100, fullMark: 150 },
    { subject: 'Temperature', A: 85, B: 90, fullMark: 150 },
    { subject: 'Alignment', A: 65, B: 85, fullMark: 150 },
  ];

  const generatorData = [
    { subject: 'Output', A: 120, B: 110, fullMark: 150 },
    { subject: 'Frequency', A: 98, B: 130, fullMark: 150 },
    { subject: 'Voltage', A: 86, B: 130, fullMark: 150 },
    { subject: 'Temperature', A: 99, B: 100, fullMark: 150 },
    { subject: 'Vibration', A: 85, B: 90, fullMark: 150 },
    { subject: 'Efficiency', A: 65, B: 85, fullMark: 150 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-medium">{`${payload[0].name} : ${payload[0].value}`}</p>
          {payload.length > 1 && (
            <p className="text-sm font-medium">{`${payload[1].name} : ${payload[1].value}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Condition Based Maintenance</h1>
          <p className="text-gray-600">Monitor equipment health and predict maintenance needs</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Systems</SelectItem>
            <SelectItem value="critical">Critical Only</SelectItem>
            <SelectItem value="warnings">Warnings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedVessels.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-gray-500">Please select at least one vessel to view maintenance data</p>
          </CardContent>
        </Card>
      )}

      {selectedVessels.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Engine Health</CardTitle>
                <CardDescription>Overall condition: Good</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-green-600">92%</span>
                  <span className="text-sm text-gray-500">Next service: 240h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Propulsion System</CardTitle>
                <CardDescription>Overall condition: Warning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-amber-500">78%</span>
                  <span className="text-sm text-gray-500">Next service: 120h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Generator</CardTitle>
                <CardDescription>Overall condition: Attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-red-500">65%</span>
                  <span className="text-sm text-gray-500">Next service: 48h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="engine">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="engine">Engine</TabsTrigger>
                <TabsTrigger value="propulsion">Propulsion</TabsTrigger>
                <TabsTrigger value="generator">Generator</TabsTrigger>
              </TabsList>
              <Select defaultValue="current">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Data Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="engine">
              <Card>
                <CardHeader>
                  <CardTitle>Engine Performance Metrics</CardTitle>
                  <CardDescription>
                    Current readings compared to baseline values
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={engineData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar
                          name="Current"
                          dataKey="A"
                          stroke="#2563eb"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Baseline"
                          dataKey="B"
                          stroke="#059669"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="propulsion">
              <Card>
                <CardHeader>
                  <CardTitle>Propulsion System Metrics</CardTitle>
                  <CardDescription>
                    Current readings compared to baseline values
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={propulsionData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar
                          name="Current"
                          dataKey="A"
                          stroke="#2563eb"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Baseline"
                          dataKey="B"
                          stroke="#059669"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generator">
              <Card>
                <CardHeader>
                  <CardTitle>Generator Metrics</CardTitle>
                  <CardDescription>
                    Current readings compared to baseline values
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={generatorData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar
                          name="Current"
                          dataKey="A"
                          stroke="#2563eb"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Radar
                          name="Baseline"
                          dataKey="B"
                          stroke="#059669"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Alerts</CardTitle>
                <CardDescription>Recent issues requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500"></div>
                    <div>
                      <h4 className="font-medium text-red-800">Generator Bearing Vibration</h4>
                      <p className="text-sm text-red-600">Abnormal vibration detected in port generator bearing</p>
                      <div className="flex items-center mt-1 text-xs text-red-500">
                        <span>2 hours ago</span>
                        <span className="mx-2">•</span>
                        <span>High Priority</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500"></div>
                    <div>
                      <h4 className="font-medium text-amber-800">Propulsion Oil Temperature</h4>
                      <p className="text-sm text-amber-600">Oil temperature trending higher than normal</p>
                      <div className="flex items-center mt-1 text-xs text-amber-500">
                        <span>8 hours ago</span>
                        <span className="mx-2">•</span>
                        <span>Medium Priority</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                    <div>
                      <h4 className="font-medium text-blue-800">Engine Air Filter</h4>
                      <p className="text-sm text-blue-600">Air filter replacement due in 50 operating hours</p>
                      <div className="flex items-center mt-1 text-xs text-blue-500">
                        <span>1 day ago</span>
                        <span className="mx-2">•</span>
                        <span>Low Priority</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Upcoming maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div>
                      <h4 className="font-medium">Generator Service</h4>
                      <p className="text-sm text-gray-500">Complete overhaul of port generator</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-medium text-red-600">Aug 15</span>
                      <span className="text-xs text-gray-500">48 hours</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border-b">
                    <div>
                      <h4 className="font-medium">Propulsion System Check</h4>
                      <p className="text-sm text-gray-500">Inspection and oil change</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-medium text-amber-600">Aug 22</span>
                      <span className="text-xs text-gray-500">120 hours</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border-b">
                    <div>
                      <h4 className="font-medium">Engine Maintenance</h4>
                      <p className="text-sm text-gray-500">Regular service and filter replacement</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-medium text-green-600">Sep 5</span>
                      <span className="text-xs text-gray-500">240 hours</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3">
                    <div>
                      <h4 className="font-medium">Hull Inspection</h4>
                      <p className="text-sm text-gray-500">Underwater inspection and cleaning</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-medium text-green-600">Sep 15</span>
                      <span className="text-xs text-gray-500">360 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Maintenance;
