
import { useState, useMemo } from 'react';
import { sensors, type Sensor } from '@/data/sensorDefinitions';
import { generateSensorData, type SensorDataPoint } from '@/utils/sensorDataGeneration';

interface UnitGroup {
  sensors: Sensor[];
  yAxisId: string;
  position: 'left' | 'right';
  offset?: number;
}

export const useSensorData = (selectedSensors: string[], dateRange: { from: string; to: string }) => {
  const sensorData = useMemo(() => generateSensorData(dateRange), [dateRange]);

  // Group sensors by unit and assign Y-axis positions
  const unitGroups = useMemo(() => {
    const groups: Record<string, UnitGroup> = {};
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
  const getAxisDomain = (unit: string): [number, number] => {
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

  return {
    sensorData,
    unitGroups,
    getAxisDomain
  };
};
