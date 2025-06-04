
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
