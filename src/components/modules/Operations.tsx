import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import RadialGauge from '@/components/ui/radial-gauge';

interface OperationsProps {
  selectedVessels: string[];
}

const Operations: React.FC<OperationsProps> = ({ selectedVessels }) => {
  
  const vesselPerformanceData = [
    { metric: 'Fuel Efficiency', value: 85, fullMark: 100 },
    { metric: 'Speed Optimization', value: 92, fullMark: 100 },
    { metric: 'Route Efficiency', value: 78, fullMark: 100 },
    { metric: 'Weather Routing', value: 88, fullMark: 100 },
  ];

  const operationalData = [
    { name: 'Engine Load', current: 75, optimal: 80 },
    { name: 'Fuel Rate', current: 120, optimal: 110 },
    { name: 'Speed', current: 14.5, optimal: 15.2 },
    { name: 'Efficiency', current: 85, optimal: 90 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Operations Overview</h1>
        <p className="text-gray-600">Real-time operational metrics for {selectedVessels.length} selected vessel(s)</p>
      </div>

      {selectedVessels.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-gray-500">Please select at least one vessel to view operations data</p>
          </CardContent>
        </Card>
      )}

      {selectedVessels.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vessel Performance</CardTitle>
              <CardDescription>Overall performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {selectedVessels.length <= 2 ? (
                  <RadialGauge 
                    data={vesselPerformanceData.slice(0, selectedVessels.length)}
                    className="h-full"
                  />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vesselPerformanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {vesselPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operational Metrics</CardTitle>
              <CardDescription>Current vs optimal performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={operationalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#8884d8" name="Current" />
                    <Bar dataKey="optimal" fill="#82ca9d" name="Optimal" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Operations;
