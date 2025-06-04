
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface NodeConfigPanelProps {
  selectedNode: any;
  onUpdateNode: (nodeId: string, data: any) => void;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ selectedNode, onUpdateNode }) => {
  if (!selectedNode) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Node Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Select a node to configure its properties</p>
        </CardContent>
      </Card>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      [field]: value
    });
  };

  const renderNodeConfig = () => {
    switch (selectedNode.type) {
      case 'sensorInput':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={selectedNode.data?.label || ''}
                onChange={(e) => handleInputChange('label', e.target.value)}
                placeholder="Sensor name"
              />
            </div>
            <div>
              <Label htmlFor="sensorType">Sensor Type</Label>
              <Input
                id="sensorType"
                value={selectedNode.data?.sensorType || ''}
                onChange={(e) => handleInputChange('sensorType', e.target.value)}
                placeholder="Temperature, Pressure, etc."
              />
            </div>
          </div>
        );
      
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={selectedNode.data?.label || ''}
                onChange={(e) => handleInputChange('label', e.target.value)}
                placeholder="Condition name"
              />
            </div>
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Textarea
                id="condition"
                value={selectedNode.data?.condition || ''}
                onChange={(e) => handleInputChange('condition', e.target.value)}
                placeholder="temperature > 80"
              />
            </div>
          </div>
        );
      
      case 'alert':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={selectedNode.data?.label || ''}
                onChange={(e) => handleInputChange('label', e.target.value)}
                placeholder="Alert name"
              />
            </div>
            <div>
              <Label htmlFor="alertType">Alert Type</Label>
              <Input
                id="alertType"
                value={selectedNode.data?.alertType || ''}
                onChange={(e) => handleInputChange('alertType', e.target.value)}
                placeholder="Email, SMS, Webhook"
              />
            </div>
          </div>
        );
      
      case 'function':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={selectedNode.data?.label || ''}
                onChange={(e) => handleInputChange('label', e.target.value)}
                placeholder="Function name"
              />
            </div>
            <div>
              <Label htmlFor="functionName">Function</Label>
              <Input
                id="functionName"
                value={selectedNode.data?.functionName || ''}
                onChange={(e) => handleInputChange('functionName', e.target.value)}
                placeholder="analyze-sensor-data"
              />
            </div>
          </div>
        );
      
      default:
        return <p>No configuration available for this node type.</p>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{selectedNode.type} Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        {renderNodeConfig()}
        <div className="mt-6">
          <Button className="w-full">Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeConfigPanel;
