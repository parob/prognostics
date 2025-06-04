
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { sensors, operatingModes, vessels, type Sensor } from '@/data/sensorDefinitions';
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

  // Prepare operating mode data for area charts
  const operatingModeData = sensorData.map(dataPoint => {
    const modeData: any = { time_percent: dataPoint.time_percent };
    
    // Find which operating mode this time point belongs to
    const currentMode = operatingModes.find(mode => 
      dataPoint.time_percent >= mode.start && dataPoint.time_percent < mode.end
    );
    
    // Set values for area charts - use a high value to fill the background
    operatingModes.forEach(mode => {
      modeData[`mode_${mode.mode.replace(/\s+/g, '_')}`] = 
        currentMode?.mode === mode.mode ? 1000 : 0;
    });
    
    return modeData;
  });

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
              {operatingModes.map((mode, index) => (
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
              data={sensorData} 
              margin={chartMargin}
            >
              {/* Operating Mode Background Areas */}
              {operatingModes.map((mode, index) => (
                <Area
                  key={`mode-${index}`}
                  type="stepAfter"
                  dataKey={`mode_${mode.mode.replace(/\s+/g, '_')}`}
                  data={operatingModeData}
                  fill={mode.color}
                  fillOpacity={0.2}
                  stroke="none"
                  isAnimationActive={false}
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
                    const timePercent = Number(label);
                    const startDate = new Date(dateRange.from);
                    const endDate = new Date(dateRange.to);
                    const timeDiff = endDate.getTime() - startDate.getTime();
                    const currentTime = new Date(startDate.getTime() + (timePercent / 100) * timeDiff);
                    const currentMode = operatingModes.find(mode => 
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
