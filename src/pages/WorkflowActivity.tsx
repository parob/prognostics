
import React from 'react';
import { Database, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WorkflowActivity = () => {
  const activities = [
    {
      id: '1',
      workflow: 'Engine Temperature Alert',
      status: 'success',
      trigger: 'Webhook',
      startTime: '2024-01-15 14:30:22',
      duration: '2.3s',
      message: 'Alert sent successfully - Engine temperature exceeded 85°C'
    },
    {
      id: '2',
      workflow: 'Predictive Maintenance',
      status: 'success',
      trigger: 'Schedule',
      startTime: '2024-01-15 14:25:00',
      duration: '15.7s',
      message: 'Maintenance prediction completed for 3 vessels'
    },
    {
      id: '3',
      workflow: 'Engine Temperature Alert',
      status: 'failed',
      trigger: 'Webhook',
      startTime: '2024-01-15 14:20:15',
      duration: '1.1s',
      message: 'Failed to send email notification - SMTP connection timeout'
    },
    {
      id: '4',
      workflow: 'Fuel Efficiency Monitor',
      status: 'success',
      trigger: 'Schedule',
      startTime: '2024-01-15 14:15:00',
      duration: '8.2s',
      message: 'Fuel efficiency report generated for Fleet Alpha'
    },
    {
      id: '5',
      workflow: 'Engine Temperature Alert',
      status: 'running',
      trigger: 'Webhook',
      startTime: '2024-01-15 14:10:30',
      duration: '45.3s',
      message: 'Processing temperature anomaly detection...'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'running':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <Database className="h-8 w-8" />
            <span>Workflow Activity</span>
          </h1>
          <p className="text-slate-600">Audit log of all workflow executions</p>
        </div>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 border border-slate-200 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-sm font-semibold text-slate-900">{activity.workflow}</h4>
                      <Badge variant={getStatusColor(activity.status) as any}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{activity.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>Triggered by: {activity.trigger}</span>
                      <span>Started: {activity.startTime}</span>
                      <span>Duration: {activity.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowActivity;
