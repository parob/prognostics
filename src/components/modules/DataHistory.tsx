
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface DataHistoryProps {
  selectedVessels: string[];
}

const DataHistory: React.FC<DataHistoryProps> = ({ selectedVessels }) => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['fuelConsumption']);
  const [timeRange, setTimeRange] = useState('24h');

  // Sample historical data with vessel modes
  const historicalData = [
    { 
      time: '00:00', 
      timestamp: new Date('2024-01-01T00:00:00').getTime(),
      fuelConsumption: 120, 
      speed: 14.5, 
      emissions: 45, 
      mode: 'transit',
      modeColor: '#3b82f6' // blue for transit
    },
    { 
      time: '04:00', 
      timestamp: new Date('2024-01-01T04:00:00').getTime(),
      fuelConsumption: 85, 
      speed: 8.2, 
      emissions: 32, 
      mode: 'operations',
      modeColor: '#10b981' // green for operations
    },
    { 
      time: '08:00', 
      timestamp: new Date('2024-01-01T08:00:00').getTime(),
      fuelConsumption: 45, 
      speed: 2.1, 
      emissions: 18, 
      mode: 'anchored',
      modeColor: '#f59e0b' // amber for anchored
    },
    { 
      time: '12:00', 
      timestamp: new Date('2024-01-01T12:00:00').getTime(),
      fuelConsumption: 95, 
      speed: 12.8, 
      emissions: 38, 
      mode: 'transit',
      modeColor: '#3b82f6'
    },
    { 
      time: '16:00', 
      timestamp: new Date('2024-01-01T16:00:00').getTime(),
      fuelConsumption: 110, 
      speed: 15.2, 
      emissions: 42, 
      mode: 'transit',
      modeColor: '#3b82f6'
    },
    { 
      time: '20:00', 
      timestamp: new Date('2024-01-01T20:00:00').getTime(),
      fuelConsumption: 75, 
      speed: 6.5, 
      emissions: 28, 
      mode: 'operations',
      modeColor: '#10b981'
    },
  ];

  const availableMetrics = [
    { id: 'fuelConsumption', name: 'Fuel Consumption (L/h)', color: '#3b82f6' },
    { id: 'speed', name: 'Speed (knots)', color: '#10b981' },
    { id: 'emissions', name: 'Emissions (kg/h)', color: '#f59e0b' },
  ];

  const handleMetricToggle = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  // Create mode change markers for background
  const modeChanges = historicalData.reduce((acc, curr, index) => {
    if (index === 0 || curr.mode !== historicalData[index - 1].mode) {
      acc.push({
        timestamp: curr.timestamp,
        mode: curr.mode,
        color: curr.modeColor,
        time: curr.time
      });
    }
    return acc;
  }, [] as any[]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = historicalData.find(d => d.time === label);
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium">{`Time: ${label}`}</p>
          <p className="text-sm text-gray-600 mb-2">{`Mode: ${dataPoint?.mode || 'Unknown'}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data History</h1>
          <p className="text-gray-600">Historical performance data for selected vessels</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedVessels.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-gray-500">Please select at least one vessel to view historical data</p>
          </CardContent>
        </Card>
      )}

      {selectedVessels.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Select Metrics to Display</CardTitle>
              <CardDescription>Choose which data points to plot on the timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {availableMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => handleMetricToggle(metric.id)}
                    />
                    <span className="text-sm font-medium" style={{ color: metric.color }}>
                      {metric.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historical Performance Data</CardTitle>
              <CardDescription>
                Performance metrics over time for {selectedVessels.join(', ')}. 
                Background colors indicate vessel operational modes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full relative">
                {/* Mode background indicators */}
                <div className="absolute inset-0 flex">
                  {modeChanges.map((change, index) => {
                    const nextChange = modeChanges[index + 1];
                    const width = nextChange 
                      ? `${((nextChange.timestamp - change.timestamp) / (historicalData[historicalData.length - 1].timestamp - historicalData[0].timestamp)) * 100}%`
                      : 'auto';
                    
                    return (
                      <div
                        key={index}
                        className="opacity-10 transition-opacity"
                        style={{
                          backgroundColor: change.color,
                          width: width,
                          minWidth: nextChange ? undefined : '100px'
                        }}
                        title={`Mode: ${change.mode}`}
                      />
                    );
                  })}
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                    />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    
                    {selectedMetrics.map((metricId) => {
                      const metric = availableMetrics.find(m => m.id === metricId);
                      return metric ? (
                        <Line
                          key={metricId}
                          type="monotone"
                          dataKey={metricId}
                          stroke={metric.color}
                          strokeWidth={2}
                          name={metric.name}
                          dot={{ fill: metric.color, strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, fill: metric.color }}
                        />
                      ) : null;
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Mode legend */}
              <div className="mt-4 flex items-center space-x-6 text-sm">
                <span className="font-medium text-gray-700">Vessel Modes:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-500 opacity-30 rounded"></div>
                  <span>Transit</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-green-500 opacity-30 rounded"></div>
                  <span>Operations</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-amber-500 opacity-30 rounded"></div>
                  <span>Anchored</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DataHistory;
