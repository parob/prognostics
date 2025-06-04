
import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const SensorCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    unit: '',
    description: '',
    vessel: '',
    location: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating sensor:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <Plus className="h-8 w-8" />
            <span>Create New Sensor</span>
          </h1>
          <p className="text-slate-600">Add a new sensor to the fleet monitoring system</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sensor Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Sensor Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Engine Temperature Sensor"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Sensor Type</Label>
                  <Select onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sensor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="pressure">Pressure</SelectItem>
                      <SelectItem value="flow">Flow Rate</SelectItem>
                      <SelectItem value="level">Level</SelectItem>
                      <SelectItem value="vibration">Vibration</SelectItem>
                      <SelectItem value="speed">Speed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit of Measurement</Label>
                  <Select onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="°C">°C (Celsius)</SelectItem>
                      <SelectItem value="bar">bar (Pressure)</SelectItem>
                      <SelectItem value="L/h">L/h (Liters per hour)</SelectItem>
                      <SelectItem value="m">m (Meters)</SelectItem>
                      <SelectItem value="RPM">RPM (Revolutions per minute)</SelectItem>
                      <SelectItem value="kW">kW (Kilowatts)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vessel">Vessel</Label>
                  <Select onValueChange={(value) => handleInputChange('vessel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vessel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="armada-7801">Armada Endurance</SelectItem>
                      <SelectItem value="armada-7802">Armada Intrepid</SelectItem>
                      <SelectItem value="armada-7803">Armada Pioneer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Installation Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Engine Room, Deck 3, Port Side"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter a detailed description of the sensor's purpose and specifications"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Create Sensor</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorCreate;
