
import React from 'react';
import { Node } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface NodeConfigPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, newData: any) => void;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ node, onUpdateNode }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdateNode(node.id, { [field]: value });
  };

  const renderNodeConfig = () => {
    switch (node.type) {
      case 'sensorInput':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="sensorType">Sensor Type</Label>
              <Select onValueChange={(value) => handleInputChange('sensorType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sensor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="pressure">Pressure</SelectItem>
                  <SelectItem value="vibration">Vibration</SelectItem>
                  <SelectItem value="fuel">Fuel Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sensorId">Sensor ID</Label>
              <Input
                id="sensorId"
                placeholder="Enter sensor ID"
                onChange={(e) => handleInputChange('sensorId', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Textarea
                id="condition"
                placeholder="e.g., temperature > 80"
                onChange={(e) => handleInputChange('condition', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="operator">Operator</Label>
              <Select onValueChange={(value) => handleInputChange('operator', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater_than">Greater than</SelectItem>
                  <SelectItem value="less_than">Less than</SelectItem>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="between">Between</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'alert':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="alertType">Alert Type</Label>
              <Select onValueChange={(value) => handleInputChange('alertType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select alert type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="slack">Slack</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter alert message"
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'function':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="functionName">Function Name</Label>
              <Input
                id="functionName"
                placeholder="Enter function name"
                onChange={(e) => handleInputChange('functionName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="parameters">Parameters</Label>
              <Textarea
                id="parameters"
                placeholder="Enter function parameters (JSON)"
                onChange={(e) => handleInputChange('parameters', e.target.value)}
              />
            </div>
          </div>
        );
      
      default:
        return <div>No configuration available for this node type.</div>;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nodeLabel">Node Label</Label>
        <Input
          id="nodeLabel"
          value={node.data.label || ''}
          onChange={(e) => handleInputChange('label', e.target.value)}
        />
      </div>
      
      {renderNodeConfig()}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={() => console.log('Node configured:', node)}
      >
        Apply Changes
      </Button>
    </div>
  );
};

export default NodeConfigPanel;
