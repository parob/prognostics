
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { vessels, sensors, type Vessel, type Sensor } from '@/data/sensorDefinitions';

interface SensorControlsProps {
  selectedVessel: string;
  selectedSensors: string[];
  dateRange: { from: string; to: string };
  onVesselChange: (vesselId: string) => void;
  onSensorToggle: (sensorId: string) => void;
  onDateRangeChange: (range: { from: string; to: string }) => void;
  onSensorClick: (sensorId: string) => void;
}

const SensorControls: React.FC<SensorControlsProps> = ({
  selectedVessel,
  selectedSensors,
  dateRange,
  onVesselChange,
  onSensorToggle,
  onDateRangeChange,
  onSensorClick
}) => {
  // Group sensors by category for better organization
  const sensorsByCategory = sensors.reduce((acc, sensor) => {
    if (!acc[sensor.category]) {
      acc[sensor.category] = [];
    }
    acc[sensor.category].push(sensor);
    return acc;
  }, {} as Record<string, Sensor[]>);

  const handlePredefinedRangeChange = (value: string) => {
    const now = new Date();
    let startDate: Date;

    switch (value) {
      case 'last-6-hours':
        startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case 'last-1-day':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'last-7-days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'last-30-days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return;
    }

    onDateRangeChange({
      from: startDate.toISOString().split('T')[0],
      to: now.toISOString().split('T')[0]
    });
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600">From</span>
            <input 
              type="date" 
              value={dateRange.from}
              onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
            <span className="text-sm text-slate-600">To</span>
            <input 
              type="date" 
              value={dateRange.to}
              onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
          
          {/* Predefined Date Range Dropdown */}
          <div className="w-48">
            <Select onValueChange={handlePredefinedRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Quick date ranges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-6-hours">Last 6 hours</SelectItem>
                <SelectItem value="last-1-day">Last 1 day</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Vessel Selection */}
          <div className="w-48">
            <Select value={selectedVessel} onValueChange={onVesselChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a vessel" />
              </SelectTrigger>
              <SelectContent>
                {vessels.map(vessel => (
                  <SelectItem key={vessel.id} value={vessel.id}>
                    {vessel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sensor Selection Dropdown */}
          <div className="w-64">
            <Select onValueChange={(value) => onSensorToggle(value)}>
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

      {/* Selected Sensors Display */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Sensors</label>
        <div className="flex flex-wrap gap-2">
          {selectedSensors.map(sensorId => {
            const sensor = sensors.find(s => s.id === sensorId);
            return sensor ? (
              <button
                key={sensorId}
                onClick={() => onSensorClick(sensorId)}
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
                    onSensorToggle(sensorId);
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
  );
};

export default SensorControls;
