import React, { useState } from 'react';
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

  // Comprehensive sensor list with more specific options
  const sensors = [
    // Engine sensors
    { id: 'engine_main_temp', name: 'Main Engine Temperature', unit: '°C', color: '#ff6b6b', category: 'Engine' },
    { id: 'engine_aux_temp', name: 'Auxiliary Engine Temperature', unit: '°C', color: '#ff8e8e', category: 'Engine' },
    { id: 'engine_coolant_temp', name: 'Engine Coolant Temperature', unit: '°C', color: '#ffb3b3', category: 'Engine' },
    { id: 'engine_oil_pressure', name: 'Engine Oil Pressure', unit: 'bar', color: '#ff4757', category: 'Engine' },
    { id: 'engine_oil_temp', name: 'Engine Oil Temperature', unit: '°C', color: '#c44569', category: 'Engine' },
    { id: 'engine_rpm', name: 'Engine RPM', unit: 'rpm', color: '#f8b500', category: 'Engine' },
    { id: 'turbo_pressure', name: 'Turbocharger Pressure', unit: 'bar', color: '#ffa726', category: 'Engine' },
    
    // Fuel system
    { id: 'fuel_flow_rate', name: 'Fuel Flow Rate', unit: 'L/h', color: '#4ecdc4', category: 'Fuel' },
    { id: 'fuel_tank_level_1', name: 'Fuel Tank 1 Level', unit: '%', color: '#26d0ce', category: 'Fuel' },
    { id: 'fuel_tank_level_2', name: 'Fuel Tank 2 Level', unit: '%', color: '#1dd1a1', category: 'Fuel' },
    { id: 'fuel_pressure', name: 'Fuel Pressure', unit: 'bar', color: '#00d2d3', category: 'Fuel' },
    { id: 'fuel_temperature', name: 'Fuel Temperature', unit: '°C', color: '#55a3ff', category: 'Fuel' },
    
    // Navigation & positioning
    { id: 'vessel_speed', name: 'Vessel Speed Over Ground', unit: 'knots', color: '#45b7d1', category: 'Navigation' },
    { id: 'vessel_heading', name: 'Vessel Heading', unit: '°', color: '#96ceb4', category: 'Navigation' },
    { id: 'gps_lat', name: 'GPS Latitude', unit: '°', color: '#74b9ff', category: 'Navigation' },
    { id: 'gps_lon', name: 'GPS Longitude', unit: '°', color: '#0984e3', category: 'Navigation' },
    { id: 'water_depth', name: 'Water Depth', unit: 'm', color: '#6c5ce7', category: 'Navigation' },
    
    // Environmental
    { id: 'wind_speed', name: 'Wind Speed', unit: 'm/s', color: '#a29bfe', category: 'Environmental' },
    { id: 'wind_direction', name: 'Wind Direction', unit: '°', color: '#fd79a8', category: 'Environmental' },
    { id: 'wave_height', name: 'Significant Wave Height', unit: 'm', color: '#feca57', category: 'Environmental' },
    { id: 'wave_period', name: 'Wave Period', unit: 's', color: '#ff9ff3', category: 'Environmental' },
    { id: 'air_temp', name: 'Air Temperature', unit: '°C', color: '#48dbfb', category: 'Environmental' },
    { id: 'water_temp', name: 'Water Temperature', unit: '°C', color: '#0abde3', category: 'Environmental' },
    { id: 'barometric_pressure', name: 'Barometric Pressure', unit: 'mbar', color: '#006ba6', category: 'Environmental' },
    
    // Electrical
    { id: 'battery_voltage_main', name: 'Main Battery Voltage', unit: 'V', color: '#ff9f43', category: 'Electrical' },
    { id: 'battery_voltage_aux', name: 'Auxiliary Battery Voltage', unit: 'V', color: '#ffa502', category: 'Electrical' },
    { id: 'generator_voltage', name: 'Generator Voltage', unit: 'V', color: '#ff6348', category: 'Electrical' },
    { id: 'shore_power_voltage', name: 'Shore Power Voltage', unit: 'V', color: '#ff4757', category: 'Electrical' },
    { id: 'power_consumption', name: 'Total Power Consumption', unit: 'kW', color: '#ff3838', category: 'Electrical' },
    
    // Hydraulics
    { id: 'hydraulic_pressure_main', name: 'Main Hydraulic Pressure', unit: 'bar', color: '#7bed9f', category: 'Hydraulics' },
    { id: 'hydraulic_pressure_aux', name: 'Auxiliary Hydraulic Pressure', unit: 'bar', color: '#70a1ff', category: 'Hydraulics' },
    { id: 'hydraulic_oil_temp', name: 'Hydraulic Oil Temperature', unit: '°C', color: '#5f27cd', category: 'Hydraulics' },
    
    // Dynamic Positioning
    { id: 'dp_power_consumption', name: 'DP Power Consumption', unit: 'kW', color: '#00d8d6', category: 'DP System' },
    { id: 'thruster_1_power', name: 'Thruster 1 Power', unit: '%', color: '#0fb9b1', category: 'DP System' },
    { id: 'thruster_2_power', name: 'Thruster 2 Power', unit: '%', color: '#006ba6', category: 'DP System' },
    { id: 'thruster_3_power', name: 'Thruster 3 Power', unit: '%', color: '#045de9', category: 'DP System' },
    { id: 'thruster_4_power', name: 'Thruster 4 Power', unit: '%', color: '#3742fa', category: 'DP System' },
  ];

  // Operating modes with time periods and solid colors (no gradients)
  const operatingModes = [
    { mode: 'Transit', start: 0, end: 20, color: '#3b82f6' },
    { mode: 'DP Operations', start: 20, end: 60, color: '#ef4444' },
    { mode: 'Anchor', start: 60, end: 80, color: '#22c55e' },
    { mode: 'Transit', start: 80, end: 100, color: '#3b82f6' },
  ];

  // Generate sample sensor data with actual timestamps
  const generateSensorData = () => {
    const data = [];
    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    const timeDiff = endDate.getTime() - startDate.getTime();
    
    for (let i = 0; i <= 100; i++) {
      const currentTime = new Date(startDate.getTime() + (i / 100) * timeDiff);
      const dataPoint: any = {
        timestamp: currentTime.getTime(), // Use timestamp for X-axis
        time_percent: i,
        formatted_time: currentTime.toISOString(),
      };

      // Add normalized sensor values based on operating modes
      const currentMode = operatingModes.find(mode => i >= mode.start && i < mode.end)?.mode || 'Transit';
      
      sensors.forEach(sensor => {
        let baseValue = 50;
        const noise = (Math.random() - 0.5) * 10;
        
        // Adjust base values based on operating mode and sensor type
        switch (currentMode) {
          case 'DP Operations':
            if (sensor.category === 'Engine') baseValue = 80;
            else if (sensor.category === 'Fuel') baseValue = 90;
            else if (sensor.category === 'DP System') baseValue = 85;
            else if (sensor.id === 'vessel_speed') baseValue = 5;
            else baseValue = 60;
            break;
          case 'Transit':
            if (sensor.id === 'vessel_speed') baseValue = 75;
            else if (sensor.category === 'Fuel') baseValue = 70;
            else if (sensor.category === 'Engine') baseValue = 65;
            else if (sensor.category === 'DP System') baseValue = 10;
            else baseValue = 55;
            break;
          case 'Anchor':
            if (sensor.id === 'vessel_speed') baseValue = 5;
            else if (sensor.category === 'Engine') baseValue = 40;
            else if (sensor.category === 'DP System') baseValue = 5;
            else baseValue = 30;
            break;
        }
        
        dataPoint[sensor.id] = Math.max(0, Math.min(100, baseValue + noise));
      });

      data.push(dataPoint);
    }
    return data;
  };

  const sensorData = generateSensorData();

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
      label: "Normalized Value",
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
                    <span className="text-sm text-slate-700">{sensor.name}</span>
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

        {/* Sensor Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              Sensor Data Comparison - {selectedVessels.map(id => vessels.find(v => v.id === id)?.name).join(', ')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[600px]">
              <LineChart 
                data={sensorData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                width={800}
                height={600}
              >
                {/* Background areas for operating modes */}
                {operatingModes.map((mode, index) => {
                  const startDate = new Date(dateRange.from);
                  const endDate = new Date(dateRange.to);
                  const timeDiff = endDate.getTime() - startDate.getTime();
                  const startTime = startDate.getTime() + (mode.start / 100) * timeDiff;
                  const endTime = startDate.getTime() + (mode.end / 100) * timeDiff;
                  
                  return (
                    <ReferenceArea
                      key={index}
                      x1={startTime}
                      x2={endTime}
                      fill={mode.color}
                      fillOpacity={0.2}
                    />
                  );
                })}
                
                <XAxis 
                  dataKey="timestamp" 
                  type="number"
                  scale="time"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorData;
