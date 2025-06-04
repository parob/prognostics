
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { sensors, vessels, type Sensor } from '@/data/sensorDefinitions';
import { type SensorDataPoint } from '@/utils/sensorDataGeneration';

interface UnitGroup {
  sensors: Sensor[];
  yAxisId: string;
  position: 'left' | 'right';
  offset?: number;
}

interface SensorChartProps {
  sensorData: SensorDataPoint[];
  selectedSensors: string[];
  selectedVessels: string[];
  unitGroups: Record<string, UnitGroup>;
  dateRange: { from: string; to: string };
  getAxisDomain: (unit: string) => [number, number];
}

const SensorChart: React.FC<SensorChartProps> = ({
  sensorData,
  selectedSensors,
  selectedVessels,
  unitGroups,
  dateRange,
  getAxisDomain
}) => {
  const chartMargin = { top: 20, right: 80, left: 80, bottom: 60 };

  const chartConfig = {
    value: {
      label: "Sensor Value",
      color: "hsl(var(--chart-1))",
    },
  };

  // Dynamically determine operating modes from the time range
  const generateOperatingModes = () => {
    const startDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    const totalHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    
    if (totalHours <= 6) {
      return [
        { mode: 'DP Operations', start: 0, end: 100, color: '#ef4444' }
      ];
    } else if (totalHours <= 24) {
      return [
        { mode: 'Transit', start: 0, end: 25, color: '#3b82f6' },
        { mode: 'DP Operations', start: 25, end: 70, color: '#ef4444' },
        { mode: 'Transit', start: 70, end: 100, color: '#3b82f6' }
      ];
    } else if (totalHours <= 168) {
      return [
        { mode: 'Transit', start: 0, end: 15, color: '#3b82f6' },
        { mode: 'DP Operations', start: 15, end: 35, color: '#ef4444' },
        { mode: 'Anchor', start: 35, end: 45, color: '#22c55e' },
        { mode: 'DP Operations', start: 45, end: 70, color: '#ef4444' },
        { mode: 'Anchor', start: 70, end: 80, color: '#22c55e' },
        { mode: 'Transit', start: 80, end: 100, color: '#3b82f6' }
      ];
    } else {
      return [
        { mode: 'Transit', start: 0, end: 10, color: '#3b82f6' },
        { mode: 'DP Operations', start: 10, end: 30, color: '#ef4444' },
        { mode: 'Anchor', start: 30, end: 40, color: '#22c55e' },
        { mode: 'DP Operations', start: 40, end: 60, color: '#ef4444' },
        { mode: 'Anchor', start: 60, end: 70, color: '#22c55e' },
        { mode: 'DP Operations', start: 70, end: 85, color: '#ef4444' },
        { mode: 'Transit', start: 85, end: 100, color: '#3b82f6' }
      ];
    }
  };

  const currentOperatingModes = generateOperatingModes();

  // Enhance sensor data with operating mode information
  const enhancedSensorData = sensorData.map(dataPoint => {
    const enhancedPoint = { ...dataPoint };
    
    // Find which operating mode this time point belongs to
    const currentMode = currentOperatingModes.find(mode => 
      dataPoint.time_percent >= mode.start && dataPoint.time_percent < mode.end
    );
    
    // Add operating mode data for background areas
    currentOperatingModes.forEach(mode => {
      enhancedPoint[`mode_${mode.mode.replace(/\s+/g, '_')}`] = 
        currentMode?.mode === mode.mode ? 1000 : 0;
    });
    
    return enhancedPoint;
  });

  // Get the first available yAxisId for operating mode backgrounds
  const firstYAxisId = Object.values(unitGroups)[0]?.yAxisId || 'yAxis-default';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sensor Data Comparison - {selectedVessels.map(id => vessels.find(v => v.id === id)?.name).join(', ')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legends positioned side by side */}
        <div className="flex flex-wrap gap-6 mb-6">
          {/* Y-Axis Units Legend */}
          {Object.keys(unitGroups).length > 0 && (
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-700 mb-3">Y-Axis Units</h4>
              <div className="flex flex-wrap items-center gap-4">
                {Object.entries(unitGroups).map(([unit, group]) => (
                  <div key={unit} className="flex items-center space-x-2">
                    <div className="text-xs font-medium text-slate-600">
                      {unit} ({group.position === 'left' ? 'L' : 'R'})
                    </div>
                    <div className="flex items-center space-x-1">
                      {group.sensors.map((sensor) => (
                        <div key={sensor.id} className="flex items-center space-x-1">
                          <div 
                            className="w-2 h-2 rounded"
                            style={{ backgroundColor: sensor.color }}
                          />
                          <span className="text-xs text-slate-500">{sensor.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operating Modes Legend */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Operating Modes</h4>
            <div className="flex items-center space-x-4">
              {currentOperatingModes.map((mode, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: mode.color }}
                  />
                  <span className="text-xs text-slate-600">{mode.mode}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={600}>
            <ComposedChart 
              data={enhancedSensorData} 
              margin={chartMargin}
            >
              {/* Operating Mode Background Areas */}
              {currentOperatingModes.map((mode, index) => (
                <Area
                  key={`mode-${index}`}
                  type="stepAfter"
                  dataKey={`mode_${mode.mode.replace(/\s+/g, '_')}`}
                  fill={mode.color}
                  fillOpacity={0.2}
                  stroke="none"
                  isAnimationActive={false}
                  yAxisId={firstYAxisId}
                />
              ))}
              
              <XAxis 
                dataKey="time_percent"
                type="number"
                domain={[0, 100]}
                tickFormatter={(value) => {
                  const startDate = new Date(dateRange.from);
                  const endDate = new Date(dateRange.to);
                  const timeDiff = endDate.getTime() - startDate.getTime();
                  const currentTime = new Date(startDate.getTime() + (value / 100) * timeDiff);
                  return `${currentTime.getMonth() + 1}/${currentTime.getDate()}`;
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
                    tickFormatter={(value) => `${Math.round(value)}`}
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
                    const timePercent = Number(label);
                    const startDate = new Date(dateRange.from);
                    const endDate = new Date(dateRange.to);
                    const timeDiff = endDate.getTime() - startDate.getTime();
                    const currentTime = new Date(startDate.getTime() + (timePercent / 100) * timeDiff);
                    const currentMode = currentOperatingModes.find(mode => 
                      timePercent >= mode.start && timePercent < mode.end
                    )?.mode || 'Unknown';
                    
                    return (
                      <div className="bg-white p-3 border rounded shadow-lg">
                        <p className="font-medium text-slate-900">
                          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-slate-600 mb-2">Mode: {currentMode}</p>
                        {payload
                          .filter(entry => !entry.dataKey?.toString().startsWith('mode_'))
                          .map((entry, index) => {
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
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SensorChart;
