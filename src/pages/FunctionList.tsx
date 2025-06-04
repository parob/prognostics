
import React from 'react';
import { List, Code, Play, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FunctionList = () => {
  const functions = [
    {
      id: '1',
      name: 'analyze-sensor-data',
      runtime: 'Python 3.9',
      description: 'Analyzes sensor data for anomalies',
      status: 'active',
      lastModified: '2 hours ago'
    },
    {
      id: '2',
      name: 'generate-report',
      runtime: 'Node.js 18',
      description: 'Generates fleet performance reports',
      status: 'active',
      lastModified: '1 day ago'
    },
    {
      id: '3',
      name: 'predict-maintenance',
      runtime: 'Python 3.9',
      description: 'Predicts maintenance needs based on sensor data',
      status: 'inactive',
      lastModified: '3 days ago'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <List className="h-8 w-8" />
            <span>Functions</span>
          </h1>
          <p className="text-slate-600">Manage your cloud functions</p>
        </div>

        {/* Functions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {functions.map((func) => (
            <Card key={func.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{func.name}</CardTitle>
                  </div>
                  <Badge variant={func.status === 'active' ? 'default' : 'secondary'}>
                    {func.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">{func.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Runtime:</span>
                      <span>{func.runtime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Last modified:</span>
                      <span>{func.lastModified}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunctionList;
