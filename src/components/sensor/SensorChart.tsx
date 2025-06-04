
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import OperatingModeBackground from '@/components/OperatingModeBackground';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sensor Data Comparison - {selectedVessels.map(id => vessels.find(v => v.id === id)?.name).join(', ')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={600}>
            <LineChart 
              data={sensorData} 
              margin={chartMargin}
            >
              {/* Operating Mode Background - positioned correctly within chart area */}
              <OperatingModeBackground
                modes={operatingModes}
                width={1200} // Approximate chart width
                height={600}
                xScale={(value: number) => (value / 100) * (1200 - chartMargin.left - chartMargin.right)}
                margin={chartMargin}
              />
              
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SensorChart;
