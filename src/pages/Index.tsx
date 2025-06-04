
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Ship, Fuel, Gauge, Activity, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RadialGauge from '@/components/ui/radial-gauge';

const Index = () => {
  const [selectedVessel, setSelectedVessel] = useState('7801');
  
  // Mock vessel data
  const vessels = [
    { id: '7801', name: 'Vessel 7801', status: 'Active', mode: 'DP', fuel: 85, efficiency: 92 },
    { id: '7802', name: 'Vessel 7802', status: 'Active', mode: 'Transit', fuel: 78, efficiency: 88 },
    { id: '7803', name: 'Vessel 7803', status: 'Standby', mode: 'Standby', fuel: 45, efficiency: 95 },
    { id: '7804', name: 'Vessel 7804', status: 'Active', mode: 'DP', fuel: 92, efficiency: 87 },
    { id: '7805', name: 'Vessel 7805', status: 'Active', mode: 'Transit', fuel: 73, efficiency: 91 },
    { id: '7806', name: 'Vessel 7806', status: 'Maintenance', mode: 'Offline', fuel: 0, efficiency: 0 },
    { id: '7807', name: 'Vessel 7807', status: 'Active', mode: 'DP', fuel: 89, efficiency: 89 },
    { id: '7808', name: 'Vessel 7808', status: 'Active', mode: 'Transit', fuel: 81, efficiency: 93 },
  ];

  const currentVessel = vessels.find(v => v.id === selectedVessel);

  const performanceData = [
    { metric: 'Fuel Efficiency', value: currentVessel?.efficiency || 0, fullMark: 100 },
    { metric: 'Engine Load', value: currentVessel?.fuel || 0, fullMark: 100 }
  ];

  const singleGaugeData = [
    { metric: 'Overall Performance', value: ((currentVessel?.efficiency || 0) + (currentVessel?.fuel || 0)) / 2, fullMark: 100 }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Armada Fleet</h1>
            <p className="text-slate-600 mt-1">Real-time vessel monitoring and analytics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/historical-data">
              <Button variant="outline" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Historical Data</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Vessel Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Select Vessel</h3>
          <div className="grid grid-cols-4 gap-4">
            {vessels.map((vessel) => (
              <button
                key={vessel.id}
                onClick={() => setSelectedVessel(vessel.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedVessel === vessel.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Ship className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium text-slate-900">{vessel.name}</div>
                    <div className="text-sm text-slate-600">{vessel.status}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Vessel Status */}
        {currentVessel && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentVessel.status}</div>
                <p className="text-xs text-muted-foreground">Current operational status</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mode</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentVessel.mode}</div>
                <p className="text-xs text-muted-foreground">Operation mode</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fuel Level</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentVessel.fuel}%</div>
                <p className="text-xs text-muted-foreground">Current fuel level</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentVessel.efficiency}%</div>
                <p className="text-xs text-muted-foreground">Operational efficiency</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Performance Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Dual gauge view for key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <RadialGauge data={performanceData} className="h-64" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall Performance</CardTitle>
              <CardDescription>Combined performance score</CardDescription>
            </CardHeader>
            <CardContent>
              <RadialGauge data={singleGaugeData} className="h-64" />
            </CardContent>
          </Card>
        </div>

        {/* Fleet Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Overview</CardTitle>
            <CardDescription>Current status of all vessels in the fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vessels.map((vessel) => (
                <div key={vessel.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{vessel.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      vessel.status === 'Active' ? 'bg-green-100 text-green-800' :
                      vessel.status === 'Standby' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vessel.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    <div>Mode: {vessel.mode}</div>
                    <div>Fuel: {vessel.fuel}%</div>
                    <div>Efficiency: {vessel.efficiency}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
