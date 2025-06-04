
import React, { useState } from 'react';
import { List, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

interface SensorItem {
  id: string;
  name: string;
  type: string;
  unit: string;
  vessel: string;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastReading: string;
  value: number;
}

const mockSensors: SensorItem[] = [
  {
    id: 'engine_main_temp',
    name: 'Main Engine Temperature',
    type: 'Temperature',
    unit: '°C',
    vessel: 'Armada Endurance',
    location: 'Engine Room',
    status: 'active',
    lastReading: '2024-01-15 14:30:00',
    value: 82.5
  },
  {
    id: 'fuel_flow_rate',
    name: 'Fuel Flow Rate',
    type: 'Flow',
    unit: 'L/h',
    vessel: 'Armada Endurance',
    location: 'Fuel System',
    status: 'active',
    lastReading: '2024-01-15 14:29:45',
    value: 156.2
  },
  {
    id: 'hydraulic_pressure',
    name: 'Hydraulic System Pressure',
    type: 'Pressure',
    unit: 'bar',
    vessel: 'Armada Intrepid',
    location: 'Hydraulic Bay',
    status: 'maintenance',
    lastReading: '2024-01-15 12:15:22',
    value: 0
  },
  {
    id: 'generator_power',
    name: 'Generator Power Output',
    type: 'Power',
    unit: 'kW',
    vessel: 'Armada Pioneer',
    location: 'Generator Room',
    status: 'active',
    lastReading: '2024-01-15 14:31:12',
    value: 2240
  }
];

const SensorList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVessel, setFilterVessel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSensors = mockSensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sensor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVessel = filterVessel === 'all' || sensor.vessel.includes(filterVessel);
    const matchesStatus = filterStatus === 'all' || sensor.status === filterStatus;
    
    return matchesSearch && matchesVessel && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (sensorId: string) => {
    navigate(`/sensor-details/${sensorId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <List className="h-8 w-8" />
            <span>Sensor List</span>
          </h1>
          <p className="text-slate-600">Manage and monitor all fleet sensors</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search sensors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterVessel} onValueChange={setFilterVessel}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by vessel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vessels</SelectItem>
                  <SelectItem value="Endurance">Armada Endurance</SelectItem>
                  <SelectItem value="Intrepid">Armada Intrepid</SelectItem>
                  <SelectItem value="Pioneer">Armada Pioneer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sensor List */}
        <Card>
          <CardHeader>
            <CardTitle>Sensors ({filteredSensors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Vessel</th>
                    <th className="text-left py-3 px-4 font-medium">Location</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Last Reading</th>
                    <th className="text-left py-3 px-4 font-medium">Current Value</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSensors.map((sensor) => (
                    <tr key={sensor.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">{sensor.name}</td>
                      <td className="py-3 px-4">{sensor.type}</td>
                      <td className="py-3 px-4">{sensor.vessel}</td>
                      <td className="py-3 px-4">{sensor.location}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(sensor.status)}>
                          {sensor.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{sensor.lastReading}</td>
                      <td className="py-3 px-4">
                        {sensor.status === 'maintenance' ? '-' : `${sensor.value} ${sensor.unit}`}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(sensor.id)}
                            className="flex items-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSensors.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No sensors found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorList;
