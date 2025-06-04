
import React from 'react';
import { Plus, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WorkflowCreate = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <Plus className="h-8 w-8" />
            <span>Create Workflow</span>
          </h1>
          <p className="text-slate-600">Build drag-and-drop workflows to automate sensor monitoring and alerting</p>
        </div>

        {/* Workflow Builder */}
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Node Palette */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Nodes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-blue-100 border border-blue-300 rounded p-3 cursor-pointer hover:bg-blue-200">
                    <div className="text-sm font-medium">Sensor Input</div>
                    <div className="text-xs text-slate-600">Read sensor data</div>
                  </div>
                  <div className="bg-green-100 border border-green-300 rounded p-3 cursor-pointer hover:bg-green-200">
                    <div className="text-sm font-medium">Condition</div>
                    <div className="text-xs text-slate-600">Check conditions</div>
                  </div>
                  <div className="bg-orange-100 border border-orange-300 rounded p-3 cursor-pointer hover:bg-orange-200">
                    <div className="text-sm font-medium">Alert</div>
                    <div className="text-xs text-slate-600">Send notifications</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 rounded p-3 cursor-pointer hover:bg-purple-200">
                    <div className="text-sm font-medium">Function</div>
                    <div className="text-xs text-slate-600">Execute function</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canvas */}
          <Card className="col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Test Workflow
                  </Button>
                  <Button size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Save Workflow
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 rounded-lg h-[500px] flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <div className="text-lg font-medium mb-2">Drag nodes here to build your workflow</div>
                  <div className="text-sm">Connect nodes to create automation logic</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCreate;
