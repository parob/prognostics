
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowLeft, Calendar, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SensorData = () => {
  const navigate = useNavigate();
  const [selectedVessel, setSelectedVessel] = useState('armada-7801');
  const [selectedSensors, setSelectedSensors] = useState<string[]>(['engine_temp', 'fuel_flow']);
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-01-07' });

  // Available vessels
  const vessels = [
    { id: 'armada-7801', name: 'ARMADA 7801' },
    { id: 'armada-7802', name: 'ARMADA 7802' },
    { id: 'armada-7803', name: 'ARMADA 7803' },
  ];

  // Available sensors
  const sensors = [
    { id: 'engine_temp', name: 'Engine Temperature', unit: '°C', color: '#ff6b6b' },
    { id: 'fuel_flow', name: 'Fuel Flow Rate', unit: 'L/h', color: '#4ecdc4' },
    { id: 'speed', name: 'Vessel Speed', unit: 'knots', color: '#45b7d1' },
    { id: 'wind_speed', name: 'Wind Speed', unit: 'm/s', color: '#96ceb4' },
    { id: 'wave_height', name: 'Wave Height', unit: 'm', color: '#feca57' },
    { id: 'battery_voltage', name: 'Battery Voltage', unit: 'V', color: '#ff9ff3' },
  ];

  // Operating modes with time periods and colors
  const operatingModes = [
    { mode: 'Transit', start: 0, end: 20, color: '#3b82f6', opacity: 0.2 },
    { mode: 'DP Operations', start: 20, end: 60, color: '#ef4444', opacity: 0.2 },
    { mode: 'Anchor', start: 60, end: 80, color: '#22c55e', opacity: 0.2 },
    { mode: 'Transit', start: 80, end: 100, color: '#3b82f6', opacity: 0.2 },
  ];

  // Generate sample sensor data with normalized values (0-100)
  const generateSensorData = () => {
    const data = [];
    for (let i = 0; i <= 100; i++) {
      const timestamp = new Date(2024, 0, 1 + (i / 100) * 6).toISOString();
      const dataPoint: any = {
        timestamp,
        time_percent: i,
      };

      // Add normalized sensor values based on operating modes
      const currentMode = operatingModes.find(mode => i >= mode.start && i < mode.end)?.mode || 'Transit';
      
      sensors.forEach(sensor => {
        let baseValue = 50;
        const noise = (Math.random() - 0.5) * 10;
        
        // Adjust base values based on operating mode
        switch (currentMode) {
          case 'DP Operations':
            baseValue = sensor.id === 'engine_temp' ? 80 : sensor.id === 'fuel_flow' ? 90 : 60;
            break;
          case 'Transit':
            baseValue = sensor.id === 'speed' ? 75 : sensor.id === 'fuel_flow' ? 70 : 55;
            break;
          case 'Anchor':
            baseValue = sensor.id === 'speed' ? 5 : sensor.id === 'engine_temp' ? 40 : 30;
            break;
        }
        
        dataPoint[sensor.id] = Math.max(0, Math.min(100, baseValue + noise));
      });

      data.push(dataPoint);
    }
    return data;
  };

  const sensorData = generateSensorData();

  const handleSensorToggle = (sensorId: string) => {
    setSelectedSensors(prev => 
      prev.includes(sensorId) 
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const chartConfig = {
    value: {
      label: "Normalized Value",
      color: "hsl(var(--chart-1))",
    },
  };

  // Custom background component for operating modes
  const ModeBackground = ({ data }: { data: any[] }) => {
    return (
      <g>
        {operatingModes.map((mode, index) => {
          const startX = (mode.start / 100) * 100; // Convert to chart percentage
          const width = ((mode.end - mode.start) / 100) * 100;
          
          return (
            <rect
              key={index}
              x={`${startX}%`}
              y="0"
              width={`${width}%`}
              height="100%"
              fill={mode.color}
              fillOpacity={mode.opacity}
            />
          );
        })}
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Fleet
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
                  <Database className="h-8 w-8" />
                  <span>Sensor Data</span>
                </h1>
                <p className="text-slate-600">Real-time and historical sensor monitoring</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Select Vessel</label>
                <Select value={selectedVessel} onValueChange={setSelectedVessel}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {vessels.map(vessel => (
                      <SelectItem key={vessel.id} value={vessel.id}>
                        {vessel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">From</span>
                <input 
                  type="date" 
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="border border-slate-300 rounded px-3 py-2 text-sm"
                />
                <span className="text-sm text-slate-600">To</span>
                <input 
                  type="date" 
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="border border-slate-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sensor Selection */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Select Sensors to Compare</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sensors.map(sensor => (
                <div key={sensor.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={sensor.id}
                    checked={selectedSensors.includes(sensor.id)}
                    onCheckedChange={() => handleSensorToggle(sensor.id)}
                  />
                  <label
                    htmlFor={sensor.id}
                    className="text-sm text-slate-700 cursor-pointer flex items-center space-x-2"
                  >
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: sensor.color }}
                    />
                    <span>{sensor.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operating Mode Legend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Operating Modes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              {operatingModes.map((mode, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: mode.color, opacity: mode.opacity * 5 }}
                  />
                  <span className="text-sm text-slate-700">{mode.mode}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sensor Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sensor Data Comparison - {vessels.find(v => v.id === selectedVessel)?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    {operatingModes.map((mode, index) => (
                      <pattern
                        key={index}
                        id={`mode-${index}`}
                        patternUnits="userSpaceOnUse"
                        width="100%"
                        height="100%"
                      >
                        <rect
                          width="100%"
                          height="100%"
                          fill={mode.color}
                          fillOpacity={mode.opacity}
                        />
                      </pattern>
                    ))}
                  </defs>
                  
                  {/* Background rectangles for operating modes */}
                  {operatingModes.map((mode, index) => (
                    <ReferenceLine
                      key={index}
                      segment={[
                        { x: mode.start, y: 0 },
                        { x: mode.end, y: 100 }
                      ]}
                      stroke="none"
                    />
                  ))}
                  
                  <XAxis 
                    dataKey="time_percent" 
                    type="number"
                    scale="linear"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  
                  {selectedSensors.map(sensorId => {
                    const sensor = sensors.find(s => s.id === sensorId);
                    return sensor ? (
                      <Line
                        key={sensorId}
                        type="monotone"
                        dataKey={sensorId}
                        stroke={sensor.color}
                        strokeWidth={2}
                        dot={false}
                        name={sensor.name}
                      />
                    ) : null;
                  })}
                  
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const currentMode = operatingModes.find(mode => 
                          label >= mode.start && label < mode.end
                        )?.mode || 'Unknown';
                        
                        return (
                          <div className="bg-white p-3 border rounded shadow-lg">
                            <p className="font-medium text-slate-900">Time: {label}%</p>
                            <p className="text-sm text-slate-600 mb-2">Mode: {currentMode}</p>
                            {payload.map((entry, index) => {
                              const sensor = sensors.find(s => s.id === entry.dataKey);
                              return sensor ? (
                                <div key={index} className="flex items-center space-x-2">
                                  <div 
                                    className="w-3 h-3 rounded"
                                    style={{ backgroundColor: sensor.color }}
                                  />
                                  <span className="text-sm">
                                    {sensor.name}: {Math.round(entry.value as number)}% ({sensor.unit})
                                  </span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorData;
