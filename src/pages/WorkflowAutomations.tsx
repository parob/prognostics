
import React from 'react';
import { Settings, Clock, Globe, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const WorkflowAutomations = () => {
  const automations = [
    {
      id: '1',
      name: 'Daily Engine Check',
      type: 'schedule',
      schedule: 'Every day at 6:00 AM',
      workflow: 'Engine Temperature Alert',
      status: 'active',
      nextRun: 'Tomorrow at 6:00 AM'
    },
    {
      id: '2',
      name: 'Temperature Threshold Webhook',
      type: 'webhook',
      url: 'https://api.fleet.com/webhook/temp-alert',
      workflow: 'Engine Temperature Alert',
      status: 'active',
      lastTriggered: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Weekly Maintenance Report',
      type: 'schedule',
      schedule: 'Every Monday at 9:00 AM',
      workflow: 'Predictive Maintenance',
      status: 'paused',
      nextRun: 'Paused'
    }
  ];

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'schedule':
        return <Clock className="h-4 w-4" />;
      case 'webhook':
        return <Globe className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
                <Settings className="h-8 w-8" />
                <span>Automations</span>
              </h1>
              <p className="text-slate-600">Manage triggers that activate your workflows</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Trigger
            </Button>
          </div>
        </div>

        {/* Automations List */}
        <div className="space-y-4">
          {automations.map((automation) => (
            <Card key={automation.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getTriggerIcon(automation.type)}
                      <h3 className="text-lg font-semibold">{automation.name}</h3>
                      <Badge variant={automation.status === 'active' ? 'default' : 'secondary'}>
                        {automation.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-slate-500">Type:</span>
                        <span className="capitalize">{automation.type}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-slate-500">Workflow:</span>
                        <span>{automation.workflow}</span>
                      </div>
                      {automation.type === 'schedule' && (
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-slate-500">Schedule:</span>
                          <span>{automation.schedule}</span>
                        </div>
                      )}
                      {automation.type === 'webhook' && (
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-slate-500">Webhook URL:</span>
                          <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{automation.url}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-slate-500">
                          {automation.type === 'schedule' ? 'Next run:' : 'Last triggered:'}
                        </span>
                        <span>{automation.type === 'schedule' ? automation.nextRun : automation.lastTriggered}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      {automation.status === 'active' ? 'Pause' : 'Activate'}
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

export default WorkflowAutomations;
