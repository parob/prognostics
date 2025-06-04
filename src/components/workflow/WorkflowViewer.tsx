
import React from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SensorInputNode from './SensorInputNode';
import ConditionNode from './ConditionNode';
import AlertNode from './AlertNode';
import FunctionNode from './FunctionNode';

const nodeTypes = {
  sensorInput: SensorInputNode,
  condition: ConditionNode,
  alert: AlertNode,
  function: FunctionNode,
};

interface WorkflowViewerProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: {
    id: string;
    name: string;
    nodes: Node[];
    edges: Edge[];
  } | null;
}

const WorkflowViewer: React.FC<WorkflowViewerProps> = ({ isOpen, onClose, workflow }) => {
  if (!workflow) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{workflow.name}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full">
          <ReactFlow
            nodes={workflow.nodes}
            edges={workflow.edges}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowViewer;
