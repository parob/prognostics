
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gauge, Info, Settings } from 'lucide-react';

const SensorDetails = () => {
  const { sensorId } = useParams<{ sensorId: string }>();
  const navigate = useNavigate();

  // Same sensor data as in SensorData page
  const sensors = [
    // Engine sensors
    { id: 'engine_main_temp', name: 'Main Engine Temperature', unit: '°C', color: '#ff6b6b', category: 'Engine', 
      description: 'Primary engine coolant temperature sensor monitoring the main propulsion engine.',
      location: 'Engine Room - Main Engine Block',
      normalRange: '75-85°C',
      criticalRange: '>95°C',
      manufacturer: 'Kongsberg Maritime',
      model: 'TempSense Pro 2000'
    },
    { id: 'engine_aux_temp', name: 'Auxiliary Engine Temperature', unit: '°C', color: '#ff8e8e', category: 'Engine',
      description: 'Auxiliary engine temperature monitoring for backup power generation.',
      location: 'Engine Room - Auxiliary Engine',
      normalRange: '70-80°C',
      criticalRange: '>90°C',
      manufacturer: 'Wärtsilä',
      model: 'AUX-Temp-400'
    },
    { id: 'fuel_flow_rate', name: 'Fuel Flow Rate', unit: 'L/h', color: '#4ecdc4', category: 'Fuel',
      description: 'Real-time fuel consumption measurement for main propulsion system.',
      location: 'Fuel System - Main Feed Line',
      normalRange: '200-800 L/h',
      criticalRange: '>1200 L/h',
      manufacturer: 'Emerson',
      model: 'FlowMaster 5000'
    },
    { id: 'vessel_speed', name: 'Vessel Speed Over Ground', unit: 'knots', color: '#45b7d1', category: 'Navigation',
      description: 'GPS-derived vessel speed measurement over ground.',
      location: 'Bridge - Navigation System',
      normalRange: '0-12 knots',
      criticalRange: '>15 knots',
      manufacturer: 'Furuno',
      model: 'NavSpeed GPS-200'
    },
    // Add more sensors as needed...
  ];

  const sensor = sensors.find(s => s.id === sensorId);

  if (!sensor) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Sensor Not Found</h1>
            <Button onClick={() => navigate('/sensor-data')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sensor Data
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" onClick={() => navigate('/sensor-data')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sensor Data
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div 
              className="w-8 h-8 rounded-lg"
              style={{ backgroundColor: sensor.color }}
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{sensor.name}</h1>
              <p className="text-slate-600">{sensor.category} Sensor • {sensor.unit}</p>
            </div>
          </div>
        </div>

        {/* Sensor Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Description</label>
                <p className="text-sm text-slate-600 mt-1">{sensor.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Location</label>
                <p className="text-sm text-slate-600 mt-1">{sensor.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Category</label>
                <p className="text-sm text-slate-600 mt-1">{sensor.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Unit of Measurement</label>
                <p className="text-sm text-slate-600 mt-1">{sensor.unit}</p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Technical Specifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Manufacturer</label>
                <p className="text-sm text-slate-600 mt-1">{sensor.manufacturer}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Model</label>
                <p className="text-sm text-slate-600 mt-1">{sensor.model}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Normal Operating Range</label>
                <p className="text-sm text-green-600 mt-1">{sensor.normalRange}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Critical Range</label>
                <p className="text-sm text-red-600 mt-1">{sensor.criticalRange}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gauge className="h-5 w-5" />
              <span>Current Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">75.2</div>
                <div className="text-sm text-slate-600">{sensor.unit}</div>
                <div className="text-xs text-green-600 mt-1">Normal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">98.5%</div>
                <div className="text-sm text-slate-600">Uptime (24h)</div>
                <div className="text-xs text-green-600 mt-1">Excellent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">2 min</div>
                <div className="text-sm text-slate-600">Last Update</div>
                <div className="text-xs text-green-600 mt-1">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorDetails;
