
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sensors, operatingModes, type Sensor } from '@/data/sensorDefinitions';

interface UnitGroup {
  sensors: Sensor[];
  yAxisId: string;
  position: 'left' | 'right';
  offset?: number;
}

interface SensorLegendsProps {
  unitGroups: Record<string, UnitGroup>;
}

const SensorLegends: React.FC<SensorLegendsProps> = ({ unitGroups }) => {
  return (
    <>
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
    </>
  );
};

export default SensorLegends;
