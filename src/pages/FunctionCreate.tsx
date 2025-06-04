
import React, { useState } from 'react';
import { Plus, Save, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const FunctionCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    runtime: '',
    description: '',
    code: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating function:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <Plus className="h-8 w-8" />
            <span>Create New Function</span>
          </h1>
          <p className="text-slate-600">Create a new cloud function that can run Python or JavaScript code</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Function Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Function Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., analyze-sensor-data"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="runtime">Runtime</Label>
                  <Select onValueChange={(value) => handleInputChange('runtime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select runtime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python 3.9</SelectItem>
                      <SelectItem value="javascript">Node.js 18</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what this function does"
                    rows={3}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="code" className="flex items-center space-x-2">
                    <Code className="h-4 w-4" />
                    <span>Function Code</span>
                  </Label>
                  <Textarea
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    placeholder="Enter your function code here..."
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Create Function</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FunctionCreate;
