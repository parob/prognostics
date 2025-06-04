
import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SensorControls from '@/components/sensor/SensorControls';
import SensorChart from '@/components/sensor/SensorChart';
import { useSensorData } from '@/hooks/useSensorData';

const SensorData = () => {
  const navigate = useNavigate();
  const [selectedVessel, setSelectedVessel] = useState<string>('armada-7801');
  const [selectedSensors, setSelectedSensors] = useState<string[]>(['engine_main_temp', 'fuel_flow_rate']);
  const [visibleSensors, setVisibleSensors] = useState<string[]>(['engine_main_temp', 'fuel_flow_rate']);
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-01-07' });

  const { sensorData, unitGroups, getAxisDomain } = useSensorData(selectedSensors, dateRange);

  const handleVesselChange = (vesselId: string) => {
    setSelectedVessel(vesselId);
  };

  const handleSensorToggle = (sensorId: string) => {
    setSelectedSensors(prev => 
      prev.includes(sensorId) 
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
    // Auto-add to visible sensors when adding a new sensor
    setVisibleSensors(prev => 
      prev.includes(sensorId) 
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const handleSensorVisibilityToggle = (sensorId: string) => {
    setVisibleSensors(prev => 
      prev.includes(sensorId) 
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const handleSensorRemove = (sensorId: string) => {
    setSelectedSensors(prev => prev.filter(id => id !== sensorId));
    setVisibleSensors(prev => prev.filter(id => id !== sensorId));
  };

  const handleSensorClick = (sensorId: string) => {
    navigate(`/sensor-details/${sensorId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
              <Database className="h-8 w-8" />
              <span>Sensor Data</span>
            </h1>
            <p className="text-slate-600">Real-time and historical sensor monitoring</p>
          </div>
        </div>

        {/* Controls */}
        <SensorControls
          selectedSensors={selectedSensors}
          visibleSensors={visibleSensors}
          dateRange={dateRange}
          onVesselChange={handleVesselChange}
          onSensorToggle={handleSensorToggle}
          onSensorVisibilityToggle={handleSensorVisibilityToggle}
          onSensorRemove={handleSensorRemove}
          onDateRangeChange={setDateRange}
          onSensorClick={handleSensorClick}
        />

        {/* Chart with integrated legends */}
        <SensorChart
          sensorData={sensorData}
          selectedSensors={selectedSensors}
          visibleSensors={visibleSensors}
          selectedVessels={[selectedVessel]}
          unitGroups={unitGroups}
          dateRange={dateRange}
          getAxisDomain={getAxisDomain}
        />
      </div>
    </div>
  );
};

export default SensorData;
