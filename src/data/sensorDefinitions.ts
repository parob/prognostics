
export interface Sensor {
  id: string;
  name: string;
  unit: string;
  color: string;
  category: string;
  min: number;
  max: number;
  optimal: number;
}

export interface Vessel {
  id: string;
  name: string;
}

export interface OperatingMode {
  mode: string;
  start: number;
  end: number;
  color: string;
}

export const vessels: Vessel[] = [
  { id: 'armada-7801', name: 'ARMADA 7801' },
  { id: 'armada-7802', name: 'ARMADA 7802' },
  { id: 'armada-7803', name: 'ARMADA 7803' },
  { id: 'armada-7804', name: 'ARMADA 7804' },
  { id: 'armada-7805', name: 'ARMADA 7805' },
];

export const sensors: Sensor[] = [
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

export const operatingModes: OperatingMode[] = [
  { mode: 'Transit', start: 0, end: 20, color: '#3b82f6' },
  { mode: 'DP Operations', start: 20, end: 60, color: '#ef4444' },
  { mode: 'Anchor', start: 60, end: 80, color: '#22c55e' },
  { mode: 'Transit', start: 80, end: 100, color: '#3b82f6' },
];
