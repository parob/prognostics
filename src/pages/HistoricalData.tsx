
import React, { useState } from 'react';
import { ArrowLeft, Calendar, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HistoricalData = () => {
  const [selectedVessels, setSelectedVessels] = useState<string[]>(['ARMADA 7801']);
  const [selectedSensors, setSelectedSensors] = useState<string[]>(['fuel_consumption']);
  const [timeframe, setTimeframe] = useState('7d');

  const vessels = [
    'ARMADA 7801', 'ARMADA 7802', 'ARMADA 7803', 'ARMADA 7804',
    'ARMADA 7805', 'ARMADA 7806', 'ARMADA 7807', 'ARMADA 7808'
  ];

  const sensors = [
    { id: 'fuel_consumption', name: 'Fuel Consumption', unit: 'L/h' },
    { id: 'engine_temp', name: 'Engine Temperature', unit: '°C' },
    { id: 'speed', name: 'Speed', unit: 'knots' },
    { id: 'engine_load', name: 'Engine Load', unit: '%' },
    { id: 'emissions', name: 'CO2 Emissions', unit: 'kg/h' }
  ];

  const vesselModes = {
    'steaming': { color: '#22c55e', label: 'Steaming', opacity: 0.1 },
    'fishing': { color: '#3b82f6', label: 'Fishing', opacity: 0.1 },
    'anchored': { color: '#ef4444', label: 'Anchored', opacity: 0.1 },
    'maneuvering': { color: '#f59e0b', label: 'Maneuvering', opacity: 0.1 }
  };

  // Generate sample historical data with vessel modes
  const generateHistoricalData = () => {
    const data = [];
    const now = new Date();
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dataPoint: any = {
        date: date.toISOString().split('T')[0],
        time: date.getTime()
      };

      selectedVessels.forEach(vessel => {
        const vesselId = vessel.replace('ARMADA ', '');
        // Simulate vessel mode changes throughout the day
        const hour = date.getHours();
        let mode = 'steaming';
        if (hour >= 6 && hour <= 18) mode = 'fishing';
        else if (hour >= 0 && hour <= 6) mode = 'anchored';
        else mode = 'maneuvering';

        dataPoint[`${vesselId}_mode`] = mode;

        selectedSensors.forEach(sensor => {
          let baseValue = 0;
          switch (sensor) {
            case 'fuel_consumption':
              baseValue = mode === 'fishing' ? 120 : mode === 'steaming' ? 80 : 20;
              break;
            case 'engine_temp':
              baseValue = mode === 'fishing' ? 85 : mode === 'steaming' ? 75 : 45;
              break;
            case 'speed':
              baseValue = mode === 'fishing' ? 3 : mode === 'steaming' ? 12 : 0;
              break;
            case 'engine_load':
              baseValue = mode === 'fishing' ? 75 : mode === 'steaming' ? 60 : 10;
              break;
            case 'emissions':
              baseValue = mode === 'fishing' ? 45 : mode === 'steaming' ? 30 : 8;
              break;
          }
          
          // Add some random variation
          const variation = (Math.random() - 0.5) * 0.2 * baseValue;
          dataPoint[`${vesselId}_${sensor}`] = Math.max(0, baseValue + variation);
        });
      });

      data.push(dataPoint);
    }
    return data;
  };

  const chartData = generateHistoricalData();

  // Generate mode backgrounds for charts
  const generateModeBackgrounds = (data: any[]) => {
    const backgrounds: any[] = [];
    let currentMode = null;
    let modeStart = 0;

    data.forEach((dataPoint, index) => {
      // Use the first selected vessel's mode for background
      const vesselId = selectedVessels[0]?.replace('ARMADA ', '');
      const mode = dataPoint[`${vesselId}_mode`];

      if (mode !== currentMode) {
        if (currentMode !== null && index > 0) {
          // End previous mode section
          backgrounds.push({
            mode: currentMode,
            start: modeStart,
            end: index - 1,
            color: vesselModes[currentMode as keyof typeof vesselModes]?.color || '#e5e7eb'
          });
        }
        currentMode = mode;
        modeStart = index;
      }

      // Handle last section
      if (index === data.length - 1) {
        backgrounds.push({
          mode: currentMode,
          start: modeStart,
          end: index,
          color: vesselModes[currentMode as keyof typeof vesselModes]?.color || '#e5e7eb'
        });
      }
    });

    return backgrounds;
  };

  // Normalize data for comparison
  const normalizeData = (data: any[], sensor: string) => {
    const values = data.map(d => {
      const sensorValues = selectedVessels.map(vessel => 
        d[`${vessel.replace('ARMADA ', '')}_${sensor}`]
      ).filter(v => v !== undefined);
      return Math.max(...sensorValues);
    }).filter(v => !isNaN(v));
    
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    return data.map(d => {
      const normalized = { ...d };
      selectedVessels.forEach(vessel => {
        const vesselId = vessel.replace('ARMADA ', '');
        const value = d[`${vesselId}_${sensor}`];
        if (value !== undefined) {
          normalized[`${vesselId}_${sensor}_normalized`] = ((value - min) / (max - min)) * 100;
        }
      });
      return normalized;
    });
  };

  // Custom background component for vessel modes
  const CustomizedBackground = (props: any) => {
    const { payload, ...rest } = props;
    
    // Get mode backgrounds
    const normalizedData = normalizeData(chartData, selectedSensors[0] || 'fuel_consumption');
    const modeBackgrounds = generateModeBackgrounds(normalizedData);
    
    return (
      <g>
        {modeBackgrounds.map((bg: any, index: number) => {
          // Calculate positions based on data indices
          const chartWidth = props.width || 0;
          const chartHeight = props.height || 0;
          const dataLength = normalizedData.length;
          
          if (dataLength <= 1) return null;
          
          const startX = (bg.start / (dataLength - 1)) * chartWidth;
          const endX = (bg.end / (dataLength - 1)) * chartWidth;
          const width = endX - startX;
          
          return (
            <rect
              key={`mode-bg-${index}`}
              x={startX}
              y={0}
              width={width}
              height={chartHeight}
              fill={bg.color}
              fillOpacity={0.15}
            />
          );
        })}
      </g>
    );
  };

  const handleVesselToggle = (vessel: string) => {
    setSelectedVessels(prev => 
      prev.includes(vessel) 
        ? prev.filter(v => v !== vessel)
        : [...prev, vessel]
    );
  };

  const handleSensorToggle = (sensor: string) => {
    setSelectedSensors(prev => 
      prev.includes(sensor)
        ? prev.filter(s => s !== sensor)
        : [...prev, sensor]
    );
  };

  const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Fleet
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Historical Data Analysis</h1>
              <p className="text-slate-600 mt-1">Compare sensor data across vessels and timeframes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Vessels</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {vessels.map((vessel) => (
                  <div key={vessel} className="flex items-center space-x-2">
                    <Checkbox
                      id={vessel}
                      checked={selectedVessels.includes(vessel)}
                      onCheckedChange={() => handleVesselToggle(vessel)}
                    />
                    <label htmlFor={vessel} className="text-sm cursor-pointer">
                      {vessel}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Sensors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sensors.map((sensor) => (
                  <div key={sensor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={sensor.id}
                      checked={selectedSensors.includes(sensor.id)}
                      onCheckedChange={() => handleSensorToggle(sensor.id)}
                    />
                    <label htmlFor={sensor.id} className="text-sm cursor-pointer">
                      {sensor.name}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vessel Modes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(vesselModes).map(([mode, config]) => (
                  <div key={mode} className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-sm capitalize">{config.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="lg:col-span-3 space-y-6">
            {selectedSensors.map((sensor) => {
              const sensorInfo = sensors.find(s => s.id === sensor);
              const normalizedData = normalizeData(chartData, sensor);
              
              return (
                <Card key={sensor}>
                  <CardHeader>
                    <CardTitle>{sensorInfo?.name} - Normalized Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{}}
                      className="h-80"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={normalizedData}>
                          <defs>
                            <pattern id="modeBackground" patternUnits="userSpaceOnUse" width="100%" height="100%">
                              <CustomizedBackground />
                            </pattern>
                          </defs>
                          
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="date" 
                            stroke="#64748b"
                            fontSize={12}
                          />
                          <YAxis 
                            stroke="#64748b"
                            fontSize={12}
                            label={{ value: 'Normalized %', angle: -90, position: 'insideLeft' }}
                          />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            formatter={(value: any, name: string) => [
                              `${Number(value).toFixed(1)}%`,
                              name.includes('_normalized') 
                                ? `ARMADA ${name.split('_')[0]} (Normalized)`
                                : name
                            ]}
                          />
                          
                          {selectedVessels.map((vessel, vesselIndex) => {
                            const vesselId = vessel.replace('ARMADA ', '');
                            return (
                              <Line
                                key={`${vessel}_${sensor}`}
                                type="monotone"
                                dataKey={`${vesselId}_${sensor}_normalized`}
                                stroke={colors[vesselIndex % colors.length]}
                                strokeWidth={2}
                                dot={false}
                                name={vessel}
                              />
                            );
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;
