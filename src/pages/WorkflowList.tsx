
import React from 'react';
import { List, Play, Edit, Trash, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const WorkflowList = () => {
  const workflows = [
    {
      id: '1',
      name: 'Engine Temperature Alert',
      description: 'Monitors engine temperature and sends alerts when thresholds are exceeded',
      status: 'active',
      nodes: 4,
      lastRun: '2 minutes ago',
      triggers: 2
    },
    {
      id: '2',
      name: 'Predictive Maintenance',
      description: 'Analyzes sensor patterns to predict maintenance needs',
      status: 'active',
      nodes: 6,
      lastRun: '1 hour ago',
      triggers: 1
    },
    {
      id: '3',
      name: 'Fuel Efficiency Monitor',
      description: 'Tracks fuel consumption and identifies optimization opportunities',
      status: 'paused',
      nodes: 5,
      lastRun: '2 days ago',
      triggers: 3
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <List className="h-8 w-8" />
            <span>Workflows</span>
          </h1>
          <p className="text-slate-600">View and manage your automated workflows</p>
        </div>

        {/* Workflows List */}
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{workflow.name}</h3>
                      <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-3">{workflow.description}</p>
                    <div className="flex space-x-6 text-sm text-slate-500">
                      <span>{workflow.nodes} nodes</span>
                      <span>{workflow.triggers} triggers</span>
                      <span>Last run: {workflow.lastRun}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
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

export default WorkflowList;
