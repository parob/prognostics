
import { sensors, operatingModes, type Sensor, type OperatingMode } from '@/data/sensorDefinitions';

export interface SensorDataPoint {
  timestamp: number;
  time_percent: number;
  formatted_time: string;
  [key: string]: any;
}

export const generateSensorData = (dateRange: { from: string; to: string }): SensorDataPoint[] => {
  const data = [];
  const startDate = new Date(dateRange.from);
  const endDate = new Date(dateRange.to);
  const timeDiff = endDate.getTime() - startDate.getTime();
  
  // Generate more realistic operating mode transitions based on time range
  const generateOperatingModes = (totalHours: number): OperatingMode[] => {
    if (totalHours <= 6) {
      // Short periods - likely single operation
      return [
        { mode: 'DP Operations', start: 0, end: 100, color: '#ef4444' }
      ];
    } else if (totalHours <= 24) {
      // Daily operations
      return [
        { mode: 'Transit', start: 0, end: 25, color: '#3b82f6' },
        { mode: 'DP Operations', start: 25, end: 70, color: '#ef4444' },
        { mode: 'Transit', start: 70, end: 100, color: '#3b82f6' }
      ];
    } else if (totalHours <= 168) {
      // Weekly operations
      return [
        { mode: 'Transit', start: 0, end: 15, color: '#3b82f6' },
        { mode: 'DP Operations', start: 15, end: 35, color: '#ef4444' },
        { mode: 'Anchor', start: 35, end: 45, color: '#22c55e' },
        { mode: 'DP Operations', start: 45, end: 70, color: '#ef4444' },
        { mode: 'Anchor', start: 70, end: 80, color: '#22c55e' },
        { mode: 'Transit', start: 80, end: 100, color: '#3b82f6' }
      ];
    } else {
      // Monthly operations
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

  const totalHours = timeDiff / (1000 * 60 * 60);
  const currentOperatingModes = generateOperatingModes(totalHours);
  
  for (let i = 0; i <= 100; i++) {
    const currentTime = new Date(startDate.getTime() + (i / 100) * timeDiff);
    const dataPoint: any = {
      timestamp: currentTime.getTime(),
      time_percent: i,
      formatted_time: currentTime.toISOString(),
    };

    const currentMode = currentOperatingModes.find(mode => i >= mode.start && i < mode.end)?.mode || 'Transit';
    
    sensors.forEach(sensor => {
      const { min, max, optimal } = sensor;
      let baseValue = optimal;
      
      // Add time-based variations
      const timeVariation = Math.sin((i / 100) * Math.PI * 2) * 0.1;
      const noise = (Math.random() - 0.5) * (max - min) * 0.05; // Reduced noise for more realistic data
      
      // Adjust base values based on operating mode
      switch (currentMode) {
        case 'DP Operations':
          if (sensor.category === 'Engine') baseValue = optimal + (max - optimal) * 0.4;
          else if (sensor.category === 'Fuel') baseValue = optimal + (max - optimal) * 0.5;
          else if (sensor.id === 'vessel_speed') baseValue = min + (max - min) * 0.1;
          else if (sensor.category === 'Electrical') baseValue = optimal + (max - optimal) * 0.3;
          else if (sensor.category === 'Hydraulics') baseValue = optimal + (max - optimal) * 0.4;
          break;
        case 'Transit':
          if (sensor.id === 'vessel_speed') baseValue = optimal + (max - optimal) * 0.6;
          else if (sensor.category === 'Fuel') baseValue = optimal + (max - optimal) * 0.3;
          else if (sensor.category === 'Engine') baseValue = optimal + (max - optimal) * 0.2;
          else if (sensor.category === 'Hydraulics') baseValue = min + (optimal - min) * 0.5;
          break;
        case 'Anchor':
          if (sensor.id === 'vessel_speed') baseValue = min;
          else if (sensor.category === 'Engine') baseValue = min + (optimal - min) * 0.6;
          else if (sensor.category === 'Fuel') baseValue = min + (optimal - min) * 0.4;
          else if (sensor.category === 'Hydraulics') baseValue = min + (optimal - min) * 0.3;
          else baseValue = optimal - (optimal - min) * 0.2;
          break;
      }
      
      // Apply variations
      baseValue += timeVariation * (max - min);
      
      dataPoint[sensor.id] = Math.max(min, Math.min(max, baseValue + noise));
    });

    data.push(dataPoint);
  }
  return data;
};
