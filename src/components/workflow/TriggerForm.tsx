
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TriggerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trigger: any) => void;
}

const TriggerForm: React.FC<TriggerFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    workflow: '',
    schedule: '',
    webhookUrl: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      type: '',
      workflow: '',
      schedule: '',
      webhookUrl: '',
      description: ''
    });
    onClose();
  };

  const workflows = [
    'Engine Temperature Alert',
    'Predictive Maintenance',
    'Fuel Efficiency Monitor'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Trigger</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Trigger Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter trigger name"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Trigger Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select trigger type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="schedule">Schedule</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="sensor">Sensor Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="workflow">Workflow</Label>
            <Select value={formData.workflow} onValueChange={(value) => setFormData({ ...formData, workflow: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select workflow" />
              </SelectTrigger>
              <SelectContent>
                {workflows.map((workflow) => (
                  <SelectItem key={workflow} value={workflow}>
                    {workflow}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'schedule' && (
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                placeholder="e.g., Every day at 9:00 AM"
              />
            </div>
          )}

          {formData.type === 'webhook' && (
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={formData.webhookUrl}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                placeholder="https://api.example.com/webhook"
              />
            </div>
          )}

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this trigger does"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Trigger
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TriggerForm;
