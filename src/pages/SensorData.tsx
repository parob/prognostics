import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceArea } from 'recharts';
import { ArrowLeft, Calendar, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SensorData = () => {
  const navigate = useNavigate();
  const [selectedVessels, setSelectedVessels] = useState<string[]>(['armada-7801']);
  const [selectedSensors, setSelectedSensors] = useState<string[]>(['engine_main_temp', 'fuel_flow_rate']);
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-01-07' });

  // Available vessels
  const vessels = [
    { id: 'armada-7801', name: 'ARMADA 7801' },
    { id: 'armada-7802', name: 'ARMADA 7802' },
    { id: 'armada-7803', name: 'ARMADA 7803' },
    { id: 'armada-7804', name: 'ARMADA 7804' },
    { id: 'armada-7805', name: 'ARMADA 7805' },
  ];

  // Enhanced sensor definitions with realistic value ranges
  const sensors = [
    // Engine sensors
    { id: 'engine_main_temp', name: 'Main Engine Temperature', unit: '°C', color: '#ff6b6b', category: 'Engine', min: 60, max: 95, optimal: 80 },
    { id: 'engine_aux_temp', name: 'Auxiliary Engine Temperature', unit: '°C', color: '#ff8e8e', category: 'Engine', min: 55, max: 90, optimal: 75 },
    { id: 'engine_coolant_temp', name: 'Engine Coolant Temperature', unit: '°C', color: '#ffb3b3', category: 'Engine', min: 70, max: 95, optimal: 82 },
    { id: 'engine_oil_pressure', name: 'Engine Oil Pressure', unit: 'bar', color: '#ff4757', category: 'Engine', min: 2.5, max: 6.0, optimal: 4.0 },
    { id: 'engine_oil_temp', name: 'Engine Oil Temperature', unit: '°C', color: '#c44569', category: 'Engine', min: 50, max: 85, optimal: 70 },
    { id: 'engine_rpm', name: 'Engine RPM', unit: 'rpm', color: '#f8b500', category: 'Engine', min: 500, max: 2000, optimal: 1200 },
    { id: 'turbo_pressure', name: 'Turbocharger Pressure', unit: 'bar', color: '#ffa726', category: 'Engine', min: 0.8, max: 2.5, optimal: 1.5 },
    
    // Fuel system
    { id: 'fuel_flow_rate', name: 'Fuel Flow Rate', unit: 'L/h', color: '#4ecdc4', category: 'Fuel', min: 50, max: 300, optimal: 150 },
    { id: 'fuel_tank_level_1', name: 'Fuel Tank 1 Level', unit: '%', color: '#26d0ce', category: 'Fuel', min: 10, max: 100, optimal: 75 },
    { id: 'fuel_tank_level_2', name: 'Fuel Tank 2 Level', unit: '%', color: '#1dd1a1', category: 'Fuel', min: 10, max: 100, optimal: 75 },
    { id: 'fuel_pressure', name: 'Fuel Pressure', unit: 'bar', color: '#00d2d3', category: 'Fuel', min: 1.5, max: 8.0, optimal: 4.5 },
    { id: 'fuel_temperature', name: 'Fuel Temperature', unit: '°C', color: '#55a3ff', category: 'Fuel', min: 15, max: 45, optimal: 25 },
    
    // Navigation & positioning
    { id: 'vessel_speed', name: 'Vessel Speed Over Ground', unit: 'knots', color: '#45b7d1', category: 'Navigation', min: 0, max: 15, optimal: 8 },
    { id: 'vessel_heading', name: 'Vessel Heading', unit: '°', color: '#96ceb4', category: 'Navigation', min: 0, max: 360, optimal: 180 },
    { id: 'water_depth', name: 'Water Depth', unit: 'm', color: '#6c5ce7', category: 'Navigation', min: 50, max: 200, optimal: 120 },
    
    // Environmental
    { id: 'wind_speed', name: 'Wind Speed', unit: 'm/s', color: '#a29bfe', category: 'Environmental', min: 0, max: 25, optimal: 8 },
    { id: 'wind_direction', name: 'Wind Direction', unit: '°', color: '#fd79a8', category: 'Environmental', min: 0, max: 360, optimal: 180 },
    { id: 'wave_height', name: 'Significant Wave Height', unit: 'm', color: '#feca57', category: 'Environmental', min: 0, max: 6, optimal: 2 },
    { id: 'air_temp', name: 'Air Temperature', unit: '°C', color: '#48dbfb', category: 'Environmental', min: 5, max: 35, optimal: 20 },
    { id: 'water_temp', name: 'Water Temperature', unit: '°C', color: '#0abde3', category: 'Environmental', min: 8, max: 28, optimal: 18 },
    { id: 'barometric_pressure', name: 'Barometric Pressure', unit: 'mbar', color: '#006ba6', category: 'Environmental', min: 980, max: 1040, optimal: 1013 },
    
    // Electrical
    { id: 'battery_voltage_main', name: 'Main Battery Voltage', unit: 'V', color: '#ff9f43', category: 'Electrical', min: 22, max: 28, optimal: 24 },
    { id: 'battery_voltage_aux', name: 'Auxiliary Battery Voltage', unit: 'V', color: '#ffa502', category: 'Electrical', min: 11, max: 14, optimal: 12 },
    { id: 'power_consumption', name: 'Total Power Consumption', unit: 'kW', color: '#ff3838', category: 'Electrical', min: 50, max: 500, optimal: 200 },
    
    // Hydraulics
    { id: 'hydraulic_pressure_main', name: 'Main Hydraulic Pressure', unit: 'bar', color: '#7bed9f', category: 'Hydraulics', min: 100, max: 350, optimal: 200 },
    { id: 'hydraulic_oil_temp', name: 'Hydraulic Oil Temperature', unit: '°C', color: '#5f27cd', category: 'Hydraulics', min: 40, max: 80, optimal: 60 },
  ];

  // Operating modes with time periods and solid colors (no gradients)
  const operatingModes = [
    { mode: 'Transit', start: 0, end: 20, color: '#3b82f6' },
    { mode: 'DP Operations', start: 20, end: 60, color: '#ef4444' },
    { mode: 'Anchor', start: 60, end: 80, color: '#22c55e' },
    { mode: 'Transit', start: 80, end: 100, color: '#3b82f6' },
  ];

  // Generate realistic sensor data with actual units
  const generateSensorData = () => {
    const data = [];
    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    const timeDiff = endDate.getTime() - startDate.getTime();
    
    for (let i = 0; i <= 100; i++) {
      const currentTime = new Date(startDate.getTime() + (i / 100) * timeDiff);
      const dataPoint: any = {
        timestamp: currentTime.getTime(),
        time_percent: i,
        formatted_time: currentTime.toISOString(),
      };

      const currentMode = operatingModes.find(mode => i >= mode.start && i < mode.end)?.mode || 'Transit';
      
      sensors.forEach(sensor => {
        const { min, max, optimal } = sensor;
        let baseValue = optimal;
        const noise = (Math.random() - 0.5) * (max - min) * 0.1; // 10% noise
        
        // Adjust base values based on operating mode
        switch (currentMode) {
          case 'DP Operations':
            if (sensor.category === 'Engine') baseValue = optimal + (max - optimal) * 0.4;
            else if (sensor.category === 'Fuel') baseValue = optimal + (max - optimal) * 0.5;
            else if (sensor.id === 'vessel_speed') baseValue = min + (max - min) * 0.1;
            else if (sensor.category === 'Electrical') baseValue = optimal + (max - optimal) * 0.3;
            break;
          case 'Transit':
            if (sensor.id === 'vessel_speed') baseValue = optimal + (max - optimal) * 0.6;
            else if (sensor.category === 'Fuel') baseValue = optimal + (max - optimal) * 0.3;
            else if (sensor.category === 'Engine') baseValue = optimal + (max - optimal) * 0.2;
            break;
          case 'Anchor':
            if (sensor.id === 'vessel_speed') baseValue = min;
            else if (sensor.category === 'Engine') baseValue = min + (optimal - min) * 0.8;
            else baseValue = optimal - (optimal - min) * 0.3;
            break;
        }
        
        dataPoint[sensor.id] = Math.max(min, Math.min(max, baseValue + noise));
      });

      data.push(dataPoint);
    }
    return data;
  };

  const sensorData = generateSensorData();

  // Calculate timestamp ranges for operating modes
  const operatingModeRanges = useMemo(() => {
    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    const timeDiff = endDate.getTime() - startDate.getTime();
    
    return operatingModes.map(mode => ({
      ...mode,
      startTime: startDate.getTime() + (mode.start / 100) * timeDiff,
      endTime: startDate.getTime() + (mode.end / 100) * timeDiff,
    }));
  }, [dateRange]);

  // Group sensors by unit and assign Y-axis positions
  const unitGroups = useMemo(() => {
    const groups: Record<string, { sensors: typeof sensors, yAxisId: string, position: 'left' | 'right', offset?: number }> = {};
    const selectedSensorObjects = sensors.filter(s => selectedSensors.includes(s.id));
    
    selectedSensorObjects.forEach(sensor => {
      if (!groups[sensor.unit]) {
        groups[sensor.unit] = {
          sensors: [],
          yAxisId: `yAxis-${sensor.unit}`,
          position: 'left',
          offset: 0
        };
      }
      groups[sensor.unit].sensors.push(sensor);
    });

    // Assign positions: first unit on left, second on right, rest with offsets
    const unitKeys = Object.keys(groups);
    unitKeys.forEach((unit, index) => {
      if (index === 0) {
        groups[unit].position = 'left';
      } else if (index === 1) {
        groups[unit].position = 'right';
      } else {
        groups[unit].position = index % 2 === 0 ? 'left' : 'right';
        groups[unit].offset = Math.floor((index - 2) / 2 + 1) * 60;
      }
    });

    return groups;
  }, [selectedSensors]);

  // Calculate Y-axis domains for each unit group
  const getAxisDomain = (unit: string) => {
    const groupSensors = unitGroups[unit]?.sensors || [];
    if (groupSensors.length === 0) return [0, 100];
    
    const allValues = groupSensors.flatMap(sensor => 
      sensorData.map(d => d[sensor.id]).filter(v => v !== undefined)
    );
    
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    
    return [Math.max(0, min - padding), max + padding];
  };

  const handleVesselToggle = (vesselId: string) => {
    setSelectedVessels(prev => 
      prev.includes(vesselId) 
        ? prev.filter(id => id !== vesselId)
        : [...prev, vesselId]
    );
  };

  const handleSensorToggle = (sensorId: string) => {
    setSelectedSensors(prev => 
      prev.includes(sensorId) 
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const handleSensorClick = (sensorId: string) => {
    navigate(`/sensor-details/${sensorId}`);
  };

  const chartConfig = {
    value: {
      label: "Sensor Value",
      color: "hsl(var(--chart-1))",
    },
  };

  // Group sensors by category for better organization
  const sensorsByCategory = sensors.reduce((acc, sensor) => {
    if (!acc[sensor.category]) {
      acc[sensor.category] = [];
    }
    acc[sensor.category].push(sensor);
    return acc;
  }, {} as Record<string, typeof sensors>);

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
            
            {/* Sensor Selection Dropdown */}
            <div className="w-64">
              <Select onValueChange={(value) => handleSensorToggle(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Add sensor to chart" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sensorsByCategory).map(([category, categorySensors]) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {category}
                      </div>
                      {categorySensors.map(sensor => (
                        <SelectItem key={sensor.id} value={sensor.id}>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: sensor.color }}
                            />
                            <span>{sensor.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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

          {/* Vessel Selection */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Select Vessels for Comparison</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {vessels.map(vessel => (
                <div key={vessel.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={vessel.id}
                    checked={selectedVessels.includes(vessel.id)}
                    onCheckedChange={() => handleVesselToggle(vessel.id)}
                  />
                  <label
                    htmlFor={vessel.id}
                    className="text-sm text-slate-700 cursor-pointer"
                  >
                    {vessel.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Sensors Display */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Selected Sensors (Click to view details)</label>
            <div className="flex flex-wrap gap-2">
              {selectedSensors.map(sensorId => {
                const sensor = sensors.find(s => s.id === sensorId);
                return sensor ? (
                  <button
                    key={sensorId}
                    onClick={() => handleSensorClick(sensorId)}
                    className="flex items-center space-x-2 bg-white border border-slate-300 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: sensor.color }}
                    />
                    <span className="text-sm text-slate-700">{sensor.name} ({sensor.unit})</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSensorToggle(sensorId);
                      }}
                      className="ml-2 text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  </button>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Unit Groups Legend */}
        {Object.keys(unitGroups).length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Y-Axis Units</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-6">
                {Object.entries(unitGroups).map(([unit, group]) => (
                  <div key={unit} className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-slate-700">
                      {unit} ({group.position === 'left' ? 'Left' : 'Right'} axis)
                    </div>
                    <div className="flex items-center space-x-2">
                      {group.sensors.map((sensor) => (
                        <div key={sensor.id} className="flex items-center space-x-1">
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: sensor.color }}
                          />
                          <span className="text-xs text-slate-600">{sensor.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
                    style={{ backgroundColor: mode.color }}
                  />
                  <span className="text-sm text-slate-700">{mode.mode}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Multi-Axis Sensor Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              Sensor Data Comparison - {selectedVessels.map(id => vessels.find(v => v.id === id)?.name).join(', ')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={600}>
              <LineChart 
                data={sensorData} 
                margin={{ top: 20, right: 80, left: 80, bottom: 60 }}
              >
                {/* Background areas for operating modes - render first so they appear behind lines */}
                {operatingModeRanges.map((mode, index) => (
                  <ReferenceArea
                    key={`${mode.mode}-${index}`}
                    x1={mode.startTime}
                    x2={mode.endTime}
                    fill={mode.color}
                    fillOpacity={0.15}
                    stroke="none"
                  />
                ))}
                
                <XAxis 
                  dataKey="timestamp" 
                  type="number"
                  scale="time"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                
                {/* Generate Y-axes for each unit group */}
                {Object.entries(unitGroups).map(([unit, group]) => {
                  const [minDomain, maxDomain] = getAxisDomain(unit);
                  return (
                    <YAxis
                      key={group.yAxisId}
                      yAxisId={group.yAxisId}
                      orientation={group.position}
                      domain={[minDomain, maxDomain]}
                      tickFormatter={(value) => `${Math.round(value)} ${unit}`}
                      label={{ 
                        value: unit, 
                        angle: group.position === 'left' ? -90 : 90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }}
                      dx={group.offset ? (group.position === 'left' ? -group.offset : group.offset) : 0}
                    />
                  );
                })}
                
                {/* Generate lines for each selected sensor */}
                {selectedSensors.map(sensorId => {
                  const sensor = sensors.find(s => s.id === sensorId);
                  if (!sensor) return null;
                  
                  const yAxisId = unitGroups[sensor.unit]?.yAxisId;
                  if (!yAxisId) return null;
                  
                  return (
                    <Line
                      key={sensorId}
                      type="monotone"
                      dataKey={sensorId}
                      stroke={sensor.color}
                      strokeWidth={2}
                      dot={false}
                      name={sensor.name}
                      yAxisId={yAxisId}
                    />
                  );
                })}
                
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const timestamp = Number(label);
                      const date = new Date(timestamp);
                      const timePercent = ((timestamp - new Date(dateRange.from).getTime()) / 
                        (new Date(dateRange.to).getTime() - new Date(dateRange.from).getTime())) * 100;
                      const currentMode = operatingModes.find(mode => 
                        timePercent >= mode.start && timePercent < mode.end
                      )?.mode || 'Unknown';
                      
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-medium text-slate-900">
                            {date.toLocaleDateString()} {date.toLocaleTimeString()}
                          </p>
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
                                  {sensor.name}: {(entry.value as number).toFixed(1)} {sensor.unit}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorData;
